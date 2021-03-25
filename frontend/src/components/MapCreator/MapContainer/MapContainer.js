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
import ModeToggle from '../ModeToggle/ModeToggle';

const MapContainer = () => {
    // References to map
    const mapRef = useRef();
    let map = useRef();
    let onNode = useRef(null);

    // Context
    const { isAuthenticated } = useContext(AuthContext);
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

    return (
        <div className='map-container'>
            <LayerGrid></LayerGrid>
            <ModeToggle></ModeToggle>
            {isEditMode && workingLayer && <ToolBar map={map}></ToolBar>}
            <Map map={map} mapRef={mapRef}></Map>
            {selectedNode && <InfoBar></InfoBar>}
        </div>
    );
};

export default MapContainer;
