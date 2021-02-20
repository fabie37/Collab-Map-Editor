import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import './MapContainer.css';
import Map from '../Map/Map';
import ToolBar from '../ToolBar/ToolBar';
import InfoBar from '../InfoBar/InfoBar';
import Nodes from '../../../sample_data/nodes.json';
import { v4 as uuid } from 'uuid';
import { closestOnCircle } from 'ol/coordinate';
import { getUserProjection } from 'ol/proj';

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
        console.log(nodes);
    };

    // Node State
    let [nodes, setNodes] = useState(Nodes.items);
    let [currentNode, setCurrentNode] = useState(null);

    // Node Methods
    const addNode = (coords) => {
        const node = {
            uid: uuid(),
            coords: coords,
            title: 'New Event',
            text: 'What happen here?',
        };

        setNodes((oldlist) => [...oldlist, node]);
        setCurrentNode(node);
        return node;
    };

    const removeNode = (uid) => {
        setNodes((oldlist) =>
            oldlist.filter((node) => {
                return node.uid != uid;
            })
        );
        if (currentNode != null && currentNode.uid == uid) {
            setCurrentNode(null);
        }
    };

    const updateNode = (node) => {
        setNodes((oldlist) =>
            oldlist.filter((list_node) => {
                if (list_node.uid == node.uid) {
                    return node;
                } else {
                    return list_node;
                }
            })
        );
    };

    const updateNodeCoords = (uid, coords) => {
        setNodes((oldlist) =>
            oldlist.filter((node) => {
                if (node.uid == uid) {
                    let newNode = node;
                    newNode.coords = coords;
                    return newNode;
                } else {
                    return node;
                }
            })
        );
    };

    const selectNode = (uid) => {
        let selectedNode = nodes.filter((selectedNode) => {
            return selectedNode.uid == uid;
        });
        setCurrentNode(selectedNode[0]);
    };

    return (
        <div className='map-container'>
            <ToolBar
                setTool={setCurrentToolBar}
                map={map}
                toolBarState={toolBarState}
                addNode={addNode}
                removeNode={removeNode}
                selectNode={selectNode}
                updateNodeCoords={updateNodeCoords}
                nodes={nodes}
                onNode={onNode}
            ></ToolBar>
            <div className='storyboard'></div>
            <Map map={map} mapRef={mapRef} nodes={nodes}></Map>
            <InfoBar
                map={map}
                removeNode={removeNode}
                setCurrentNode={setCurrentNode}
                node={currentNode}
                updateNode={updateNode}
            ></InfoBar>
        </div>
    );
};

export default MapContainer;
