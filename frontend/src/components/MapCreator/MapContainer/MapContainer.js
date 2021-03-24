import React, { useRef, useContext } from 'react';
import './MapContainer.css';
import Map from '../Map/Map';
import ToolBar from '../ToolBar/ToolBar';
import InfoBar from '../InfoBar/InfoBar';
import LayerGrid from '../LayerGrid/LayerGrid';
import { AuthContext } from '../../../context/AuthState';
import { MapContext } from '../../../context/MapState';
import { MapModeContext } from '../../../context/MapModeState';
import { LayerGridContext } from '../../../context/LayerGridState';
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

    return (
        <div className='map-container'>
            <LayerGrid></LayerGrid>
            <ModeToggle></ModeToggle>
            {isEditMode && workingLayer && <ToolBar map={map}></ToolBar>}
            <Map map={map} mapRef={mapRef}></Map>
        </div>
    );
};

export default MapContainer;

/*
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

    const selectNode = (uid) => {
        let selectedNode = nodes.filter((selectedNode) => {
            return selectedNode.uid == uid;
        });

        setCurrentNode(selectedNode[0]);
    };

*/

/*            

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
            <map></map>
            <InfoBar
                map={map}
                removeNode={removeNode}
                setCurrentNode={setCurrentNode}
                node={currentNode}
                updateNode={updateNode}
            ></InfoBar>  */
