import React, { useEffect } from 'react';
import Tool from './Tool';

const SelectTool = ({ onClick, map, toolBarState, selectNode }) => {
    // Properties:
    let id = 'Select';

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
            console.log(feature.getId());
            selectNode(feature.getId());
        }
    };

    // When State of Toolbar Changes:
    useEffect(() => {
        if (map === null) {
            return;
        }
        if (toolBarState[id] === true) {
            selectClick();
        }
        return () => {
            removeSelectClick();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [toolBarState]);

    return <Tool id={id} onClick={onClick}></Tool>;
};

export default SelectTool;
