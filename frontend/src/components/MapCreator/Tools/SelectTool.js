import React, { useEffect, useContext } from 'react';
import { TOOLBAR_SELECT } from '../../../actions/types';
import { MapContext } from '../../../context/MapState';
import { LayerGridContext } from '../../../context/LayerGridState';
import { InfoBarContext } from '../../../context/InfoBarState';
import Tool from './Tool';

const SelectTool = ({ map, activeTool }) => {
    // API Calls
    const { workingMap } = useContext(MapContext);
    const { workingLayer } = useContext(LayerGridContext);
    const { setSelectedNode } = useContext(InfoBarContext);

    // Properties:
    const id = 'Select';
    const toolType = TOOLBAR_SELECT;

    // Listeners:
    const selectClick = () => {
        map.current.on('click', focusNode);
    };

    const removeSelectClick = () => {
        map.current.removeEventListener('click', focusNode);
    };

    // Main Tool Function:
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

    // When State of Toolbar Changes:
    useEffect(() => {
        if (map === null || map.curent === null) {
            return;
        }
        if (activeTool === toolType) {
            selectClick();
        }
        return () => {
            removeSelectClick();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeTool]);

    return <Tool id={id} toolType={toolType}></Tool>;
};

export default SelectTool;
