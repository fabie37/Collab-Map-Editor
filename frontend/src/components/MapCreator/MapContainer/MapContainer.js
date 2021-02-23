import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import './MapContainer.css';
import Map from '../Map/Map';
import ToolBar from '../ToolBar/ToolBar';
import InfoBar from '../InfoBar/InfoBar';
import Nodes from '../../../sample_data/nodes.json';
import { v4 as uuid } from 'uuid';
import { closestOnCircle } from 'ol/coordinate';
import { getUserProjection } from 'ol/proj';
import moment from 'moment';
import api from '../../../services/api';

const MapContainer = () => {
    // User fetching
    const user = localStorage.getItem('user');
    
    // Node properties
    let node_title = 'Map created test node'
    let node_layer_id = '...'
    let node_category = '...'
    let connected_nodes = []
    let node_coordinates = []
    let node_start_date = moment().toString();
    let node_end_date = moment().toString();
    let node_description = '...'


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
    const loadMapNodes = ()=>{
        let map_id = "600d7d1085dee931a87f080f"; // Map id hardcoded for now for testing purposes
        api.get(`/mapbrowser/${map_id}`, { headers: { user } }).then(map_response => {
            api.get(`/nodebylayer/${map_response.data.maps.map_layers}`, { headers: { user } }).then(node_response => {
                // setNodes(node_response.data.nodes)
                console.log("This keeps repeating for some reason!")
            })
        })
    }

    

    
    let [nodes, setNodes] = useState([]);
    useEffect(() => {
        let map_id = "600d7d1085dee931a87f080f"; // Map id hardcoded for now for testing purposes
        api.get(`/mapbrowser/${map_id}`, { headers: { user } }).then(map_response => {
            api.get(`/nodebylayer/${map_response.data.maps.map_layers}`, { headers: { user } }).then(node_response => {
                setNodes(node_response.data.nodes)
                console.log("node_response: " + node_response.data.nodes[0].node_title)
                console.log("node_response: " + node_response.data.nodes[1].node_title)
            })
        })
    }, [])
    // loadMapNodes();
    // let [nodes, setNodes] = useState(Nodes.items);
    let [currentNode, setCurrentNode] = useState(null);

    const [createdNodes, setCreatedNodes] = useState([])
    const [newNodeId, setNewNodeId] = useState('')

    // API CALLS *************************************************************************************************************************************

    // Api call to create node in DB
    const nodeApiCreate = async () => {
        let response = await api.post("/createnode", {node_title, node_layer_id, node_category, node_description, node_start_date, node_end_date}, { headers: { user } })
        //await setCreatedNodes([...createdNodes, response.data.node._id])
        await setNewNodeId(response.data.node._id)
        console.log("node id updated? : " + newNodeId == response.data.node._id)
        console.log("createdNodes(" + createdNodes.length + "): " + createdNodes);
        return response;
    };

    // Api call to create node in DB
    const nodeApiLoad = async (_id) => {
        console.log("nodeApiLoad being called with: " + _id)
        let response = await api.get(`/node/${_id}`, { headers: { user } })
        console.log("load node from db: " + response.data.node)
    };

    // ***********************************************************************************************************************************************

    // Node Methods
    const addNode = async (coords) => {
        await nodeApiCreate()

        const node = {
            uid: uuid(),
            _id: newNodeId,
            coords: coords,
            title: "New Node",
            text: ('What happen here?' + newNodeId),
        };

        console.log("New node in map created with id: " + node._id)

        await setNodes((oldlist) => [...oldlist, node]);
        await setCurrentNode(node);
        return node;

        // nodeApiCreate()


        // const node = {
        //     uid: uuid(),
        //     _id: newNodeId,
        //     coords: coords,
        //     title: 'NewNode',
        //     text: ('What happen here?' + newNodeId),
        // };

        // console.log("New node in map created with id: " + node._id)

        // setNodes((oldlist) => [...oldlist, node]);
        // setCurrentNode(node);
        // return node;
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

        console.log("Selected node id: " + selectedNode[0]._id)

        nodeApiLoad(selectedNode[0]._id)
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
