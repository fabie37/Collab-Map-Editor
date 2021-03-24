import React, { useEffect, useRef, useContext } from 'react';
import Tool from './Tool';
import Point from 'ol/geom/Point';
import { toLonLat } from 'ol/proj';
import { MapContext } from '../../../context/MapState';
import { LayerGridContext } from '../../../context/LayerGridState';
import { MAP_IS_LOADING, TOOLBAR_MOVE } from '../../../actions/types';

const MoveTool = ({ map, activeTool }) => {
    // API Calls
    const { updateNode, workingMap } = useContext(MapContext);
    const { workingLayer } = useContext(LayerGridContext);

    // Properties:
    const id = 'Move';
    const toolType = TOOLBAR_MOVE;

    // Reference of Currently moving node
    let onNode = useRef(null);

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
            const coordinates = toLonLat(
                onNode.current.getGeometry().getCoordinates()
            );
            updateNode(workingMap._id, workingLayer, onNode.current.getId(), {
                node_coordinates: coordinates,
            });
        }
        onNode.current = null;
    };

    // When State of Toolbar Changes:
    useEffect(() => {
        if (map == null || map.current == null) {
            return;
        }

        if (activeTool === toolType) {
            moveClick();
        }

        return () => {
            removeMoveClick();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeTool]);

    return <Tool id={id} toolType={toolType}></Tool>;
};

export default MoveTool;
