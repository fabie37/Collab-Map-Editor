import React, { useEffect } from 'react';
import Tool from './Tool';

const RemoveTool = ({ onClick, map, toolBarState, removeNode }) => {
    // Properties:
    let id = 'Remove';

    // Listeners:
    const removeClick = () => {
        map.current.on('click', clearNode);
    };

    const removeRemoveClick = () => {
        map.current.removeEventListener('click', clearNode);
    };

    // Main Tool Function:
    const clearNode = (event) => {
        var feature = event.map.forEachFeatureAtPixel(
            event.pixel,
            function (feature) {
                return feature;
            }
        );
        if (feature) {
            removeNode(feature.getId());
            map.current
                .getLayers()
                .array_[1].getSource()
                .removeFeature(feature);
        }
    };

    // When State of Toolbar Changes:
    useEffect(() => {
        if (map === null) {
            return;
        }

        if (toolBarState[id] === true) {
            removeClick();
        }

        return () => {
            removeRemoveClick();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [toolBarState]);

    return <Tool id={id} onClick={onClick}></Tool>;
};

export default RemoveTool;
