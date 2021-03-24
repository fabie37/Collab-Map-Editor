import React, { useEffect, useState, useContext } from 'react';
import Tool from './Tool';
import { toLonLat } from 'ol/proj';
import { easeIn } from 'ol/easing';
import { MapContext } from '../../../context/MapState';
import { LayerGridContext } from '../../../context/LayerGridState';
import { InfoBarContext } from '../../../context/InfoBarState';
import { TOOLBAR_ADD } from '../../../actions/types';

const AddTool = ({ map, activeTool }) => {
    // API Calls
    const { createNode, workingMap } = useContext(MapContext);
    const { workingLayer } = useContext(LayerGridContext);
    const { setSelectedNode, clearInfoBarContext, setEditMode } = useContext(
        InfoBarContext
    );

    // Tool ID
    const id = 'Add';
    const toolType = TOOLBAR_ADD;

    // Listeners:
    const addClick = () => {
        map.current.on('click', executeTool);
    };

    const removeAddClick = () => {
        map.current.removeEventListener('click', executeTool);
    };

    // Main Tool Function:
    const executeTool = async (event) => {
        const coordinates = toLonLat(event.coordinate);
        const node = await createNode(workingMap._id, workingLayer, {
            node_coordinates: coordinates,
        });
        if (node) {
            clearInfoBarContext();
            setSelectedNode(node._id);
            setEditMode();
        }
    };

    // When State of Toolbar Changes:
    useEffect(() => {
        if (map == null || map.current == null) {
            return;
        }

        if (activeTool === toolType) {
            addClick();
        }
        return () => {
            removeAddClick();
        };
    }, [activeTool]);

    return <Tool id={id} toolType={toolType}></Tool>;
};

export default AddTool;
