import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './MapContainer.css';
import Map from '../Map/Map';
import ToolBar from '../ToolBar/ToolBar';
import { v4 as uuid } from 'uuid';

const MapContainer = () => {
    // Toolbar Action State
    let [addTool, setAddTool] = useState(false);
    let [removeTool, setRemoveTool] = useState(false);
    let [moveTool, setMoveTool] = useState(false);

    // Toolbar Acttion Methods
    const setTool = (evt) => {
        setAddTool(false);
        setRemoveTool(false);
        setMoveTool(false);

        switch (evt.target.id) {
            case 'addTool':
                setAddTool(true);
                break;
            case 'removeTool':
                setRemoveTool(true);
                break;
            case 'moveTool':
                setMoveTool(true);
        }
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
            <ToolBar setTool={setTool}></ToolBar>
            <div className='storyboard'></div>
            <Map
                addTool={addTool}
                removeTool={removeTool}
                moveTool={moveTool}
                addNode={addNode}
                removeNode={removeNode}
                nodes={nodes}
            ></Map>
        </div>
    );
};

export default MapContainer;
