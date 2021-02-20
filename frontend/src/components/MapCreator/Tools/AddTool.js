import React, { useEffect } from 'react';
import Tool from './Tool';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { Icon, Style } from 'ol/style';
import marker from './node.png';
import { easeIn } from 'ol/easing';
import api from '../../../services/api';
import moment from 'moment';

const AddTool = ({ onClick, map, toolBarState, addNode }) => {
    // Node properties and user fetching
    const user = localStorage.getItem('user');
    
    let node_title = 'Map created test node'
    let node_layer_id = '...'
    let node_category = '...'
    let connected_nodes = []
    let node_coordinates = []
    let node_start_date = moment().toString();
    let node_end_date = moment().toString();
    let node_description = '...'

    // Properties:
    let id = 'Add';

    // Listeners:
    const addClick = () => {
        map.current.on('click', createNode);
    };

    const removeAddClick = () => {
        map.current.removeEventListener('click', createNode);
    };

    // Main Tool Function:
    const createNode = (event) => {
        const newNode = addNode(event.coordinate);
        nodeApiCall();

        var icon = new Feature({
            geometry: new Point(newNode.coords),
            id: newNode.uid,
        });

        icon.setId(newNode.uid);

        icon.setStyle(
            new Style({
                image: new Icon({
                    src: marker,
                    scale: 0.1,
                }),
                fill: 'white',
            })
        );

        map.current.getLayers().array_[1].getSource().addFeature(icon);
        event.map.getView().animate({
            center: event.coordinate,
            duration: 200,
            easing: easeIn,
        });
    };

    // Api call to create node in DB
    const nodeApiCall = async () => {
        console.log("Making api call to create node!")
        await api.post("/createnode", {node_title, node_layer_id, node_category, node_description, node_start_date, node_end_date}, { headers: { user } })
    };

    // When State of Toolbar Changes:
    useEffect(() => {
        if (map === null) {
            return;
        }
        if (toolBarState[id] === true) {
            addClick();
        }
        return () => {
            removeAddClick();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [toolBarState]);

    return <Tool id={id} onClick={onClick}></Tool>;
};

export default AddTool;
