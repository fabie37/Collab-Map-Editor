import React, { useRef, useContext, useEffect } from 'react';
import './MapContainer.css';
import Map from '../Map/Map';
import ToolBar from '../ToolBar/ToolBar';
import InfoBar from '../InfoBar/InfoBar';
import LayerGrid from '../LayerGrid/LayerGrid';
import { AuthContext } from '../../../context/AuthState';
import { MapContext } from '../../../context/MapState';
import { MapModeContext } from '../../../context/MapModeState';
import { LayerGridContext } from '../../../context/LayerGridState';
import { InfoBarContext } from '../../../context/InfoBarState';
import { ConcurrentUsersContext } from '../../../context/ConcurrentUsersState';
import ModeToggle from '../ModeToggle/ModeToggle';
import socket from '../../../services/socket';
import UserCursor from '../../UserCursor/UserCursor';

const MapContainer = () => {
    // References to map
    const mapRef = useRef();
    let map = useRef();
    let onNode = useRef(null);

    // Context
    const { isAuthenticated, user } = useContext(AuthContext);
    const {
        workingMap,
        createNode,
        updateNode,
        deleteNode,
        createLayer,
        updateLayer,
        deleteLayer,
    } = useContext(MapContext);
    const { isEditMode } = useContext(MapModeContext);
    const { workingLayer } = useContext(LayerGridContext);
    const { selectedNode, setSelectedNode } = useContext(InfoBarContext);
    const { connections, triggerConnectionRender } = useContext(
        ConcurrentUsersContext
    );

    // Code To Handle Viewing Nodes When in View Mode
    // Listeners:
    const selectClick = () => {
        map.current.on('click', focusNode);
    };

    const removeSelectClick = () => {
        map.current.removeEventListener('click', focusNode);
    };

    // Main View Function:
    const focusNode = (event) => {
        var feature = event.map.forEachFeatureAtPixel(
            event.pixel,
            function (feature) {
                return feature;
            }
        );

        if (feature) {
            setSelectedNode(feature.getId());
        }
    };

    // When Map Mode Changes
    useEffect(() => {
        if (map === null || map.curent === null) {
            return;
        }
        if (!isEditMode) {
            selectClick();
        }
        return () => {
            removeSelectClick();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isEditMode]);

    // Handle User Nodes which get caught
    const handleDrag = () => {
        triggerConnectionRender();
    };

    useEffect(() => {
        map.current.on('pointerdrag', handleDrag);
        map.current.on('moveend', handleDrag);
        console.log(map.current);
        return () => {
            map.current.un('pointerdrag', handleDrag);
            map.current.un('moveend', handleDrag);
        };
    }, [map]);

    // When mouse moves, emit x,y pos to server
    const getUserXY = (e) => {
        if (map && map.current) {
            const times = e.target.dataset.mouseovertimes || 0;
            if (times == 2) {
                const coordinates = map.current.getCoordinateFromPixel([
                    e.clientX,
                    e.clientY,
                ]);
                socket.emit(
                    'USER_MOVE',
                    { X: coordinates[0], Y: coordinates[1] },
                    { X: e.view.innerWidth, Y: e.view.innerHeight },
                    workingMap._id,
                    user._id
                );
                e.target.dataset.mouseovertimes = 0;
            } else {
                e.target.dataset.mouseovertimes = Number(times) + 1;
            }
        }
    };

    return (
        <div className='map-container' onMouseMove={getUserXY}>
            <LayerGrid></LayerGrid>
            <ModeToggle></ModeToggle>
            {connections.map((conn, index) => {
                return (
                    <UserCursor
                        map={map}
                        index={index}
                        connection={conn}
                    ></UserCursor>
                );
            })}
            {isEditMode && workingLayer && <ToolBar map={map}></ToolBar>}
            <Map map={map} mapRef={mapRef}></Map>
            {selectedNode && <InfoBar></InfoBar>}
        </div>
    );
};

export default MapContainer;
