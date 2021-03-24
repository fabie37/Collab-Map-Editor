import React, { useEffect, useContext } from 'react';
import Tool from './Tool';
import { MapContext } from '../../../context/MapState';
import { LayerGridContext } from '../../../context/LayerGridState';
import { TOOLBAR_REMOVE } from '../../../actions/types';

const RemoveTool = ({ map, activeTool }) => {
    // API Calls
    const { deleteNode, workingMap } = useContext(MapContext);
    const { workingLayer } = useContext(LayerGridContext);

    // Properties:
    const id = 'Remove';
    const toolType = TOOLBAR_REMOVE;

    // Listeners:
    const removeClick = () => {
        map.current.on('click', executeTool);
    };

    const removeRemoveClick = () => {
        map.current.removeEventListener('click', executeTool);
    };

    // Main Tool Function:
    const executeTool = async (event) => {
        var feature = event.map.forEachFeatureAtPixel(
            event.pixel,
            function (feature) {
                return feature;
            }
        );
        if (feature) {
            map.current
                .getLayers()
                .array_[1].getSource()
                .removeFeature(feature);
            deleteNode(workingMap._id, workingLayer, feature.getId());
        }
    };

    // When State of Toolbar Changes:
    useEffect(() => {
        if (map === null || map.current === null) {
            return;
        }

        if (activeTool === toolType) {
            removeClick();
        }

        return () => {
            removeRemoveClick();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeTool]);

    return <Tool id={id} toolType={toolType}></Tool>;
};

export default RemoveTool;
