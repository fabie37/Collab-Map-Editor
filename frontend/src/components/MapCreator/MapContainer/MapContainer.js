import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import './MapContainer.css';
import Map from '../Map/Map';
import ToolBar from '../ToolBar/ToolBar';
import { v4 as uuid } from 'uuid';

const MapContainer = () => {
    // References to map
    const mapRef = useRef();
    let map = useRef();
    let onNode = useRef(null);

    // Toolbar Action State
    let [toolBarState, setToolBarState] = useState({
        Add: false,
        Remove: false,
        Move: false,
    });

    // When a tool is clicked on
    const setCurrentToolBar = (evt) => {
        let toolBarStates = { Add: false, Remove: false, Move: false };
        let target = evt.target.id;
        toolBarStates[target] = true;
        setToolBarState(toolBarStates);
        console.log(toolBarStates);
    };

    // Node State
    let [nodes, setNodes] = useState([]);

    // Node Methods
    const addNode = (coords) => {
        const node = {
            uid: uuid(),
            coords: coords,
        };

        setNodes((oldlist) => [...oldlist, node]);
        return node;
    };

    const removeNode = (uid) => {
        setNodes((oldlist) =>
            oldlist.filter((node) => {
                return node.uid != uid;
            })
        );
    };

    return (
        <div className='map-container'>
            <ToolBar
                setTool={setCurrentToolBar}
                map={map}
                toolBarState={toolBarState}
                addNode={addNode}
                removeNode={removeNode}
                nodes={nodes}
                onNode={onNode}
            ></ToolBar>
            <div className='storyboard'></div>
            <Map map={map} mapRef={mapRef}></Map>
        </div>
    );
};

export default MapContainer;
