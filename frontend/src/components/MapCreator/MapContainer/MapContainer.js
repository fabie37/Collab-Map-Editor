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
    
    // Node properties for new nodes
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
    let [nodes, setNodes] = useState([]);

    let [currentNode, setCurrentNode] = useState(null);

    const [newNodeId, setNewNodeId] = useState('')

    useEffect(() => {
        mapInit()
    }, []);

    // API CALLS *************************************************************************************************************************************

    const mapInit = () => {
        let map_id = "600d7d1085dee931a87f080f"; // Map id hardcoded for now for testing purposes
        console.log("Loading map with map_id: " + map_id)
        const node = {
            uid: '',
            coords: '',
            title: '',
            category: '',
            text: ('What happen here?'),
        };
        api.get(`/mapbrowser/${map_id}`, { headers: { user } }).then(map_response => {
            api.get(`/nodebylayer/${map_response.data.maps.map_layers}`, { headers: { user } }).then(node_response => {
                console.log(node_response)
                // nodes = node_response.data.nodes
                for (var i = 0; i < node_response.data.nodes.length; i++){
                    node.title = node_response.data.nodes[i].node_title
                    node.category = node_response.data.nodes[i].node_category
                    node.coords = node_response.data.nodes[i].node_coordinates
                    node.text = 'node id from api: ' + node_response.data.nodes[i]._id
                    setNodes((oldlist) => [...oldlist, node]);
                }
            })
        })
    }
    

    // Api call to create node in DB
    const nodeApiCreate = async () => {
        let response = await api.post("/createnode", {node_title, node_layer_id, node_category, node_description, node_start_date, node_end_date}, { headers: { user } })
        await setNewNodeId(response.data.node._id)
        console.log("node id updated? : " + newNodeId == response.data.node._id)
        return response;
    };

    // ***********************************************************************************************************************************************

    // Node Methods
    const addNode = (node_coordinates) => {
        // node_title,
        //                 node_user_id: authData.user._id,
        //                 node_layer_id,
		// 				node_category,
		// 				connected_nodes,
        //                 node_coordinates,
        //                 node_start_date, 
        //                 node_end_date, 
        //                 node_description
        const node = {
            uid: '',
            coords: node_coordinates,
            title: 'NewNode',
            category: '',
            text: ('What happen here?'),
        };

        api.post("/createnode", {node_title, node_layer_id, node_category, node_description, node_coordinates, node_start_date, node_end_date}, { headers: { user } }).then(node_response => {
            setNewNodeId(node_response.data.node._id)
            console.log("node id updated? : " + newNodeId == node_response.data.node._id)

            node.title = node_response.data.node.node_title
            node.category = node_response.data.node.node_category
            node.text = 'node id from api: ' + node_response.data.node._id
    
            setNodes((oldlist) => [...oldlist, node]);
            setCurrentNode(node);
            
        })
        
        

        return node;
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
            <Map map={map} mapRef={mapRef} nodes={nodes} setNodes={setNodes}></Map>
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
