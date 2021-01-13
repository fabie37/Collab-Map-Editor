import React, { useEffect } from 'react';
import Tool from './Tool';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { Icon, Style } from 'ol/style';
import marker from './node.png';
import { easeIn } from 'ol/easing';

const AddTool = ({ onClick, map, toolBarState, addNode }) => {
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
