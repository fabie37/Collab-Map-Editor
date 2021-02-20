import React, { useEffect } from 'react';
import Tool from './Tool';
import Point from 'ol/geom/Point';

const MoveTool = ({ onClick, map, toolBarState, onNode, updateNodeCoords }) => {
    // Properties:
    let id = 'Move';

    // Listeners:
    const moveClick = () => {
        map.current.on('pointerdown', pointerMoveDown);
        map.current.on('pointerdrag', moveNode);
        map.current.on('pointerup', pointerMoveUp);
    };

    const removeMoveClick = () => {
        map.current.removeEventListener('pointerdown', pointerMoveDown);
        map.current.removeEventListener('pointerdrag', moveNode);
        map.current.removeEventListener('pointerup', pointerMoveUp);
    };

    // Main Tool Function:
    const moveNode = (event) => {
        if (onNode.current) {
            onNode.current.setGeometry(new Point(event.coordinate));
        }
    };

    const pointerMoveDown = (event) => {
        var feature = event.map.forEachFeatureAtPixel(
            event.pixel,
            function (feature) {
                return feature;
            }
        );
        if (feature) {
            event.preventDefault();
            onNode.current = feature;
        }
    };

    const pointerMoveUp = (event) => {
        if (onNode.current) {
            updateNodeCoords(
                onNode.current.getId(),
                onNode.current.getGeometry().getCoordinates()
            );
        }
        onNode.current = null;
    };

    // When State of Toolbar Changes:
    useEffect(() => {
        if (map == null) {
            return;
        }

        if (toolBarState[id] === true) {
            moveClick();
        }

        return () => {
            removeMoveClick();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [toolBarState]);

    return <Tool id={id} onClick={onClick}></Tool>;
};

export default MoveTool;
