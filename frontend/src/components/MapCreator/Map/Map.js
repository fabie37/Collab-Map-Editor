import React, { useRef, useState, useEffect } from 'react';
import './Map.css';
import * as ol from 'ol';
import XYZ from 'ol/source/XYZ.js';
import TileLayer from 'ol/layer/Tile.js';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Interaction from 'ol/interaction';
import Draw from 'ol/interaction/Draw';
import Circle from 'ol/geom/Circle';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { Icon, Style } from 'ol/style';
import { fromLonLat } from 'ol/proj';
import { set } from 'ol/transform';
import marker from './node.png';
import { easeIn, easeOut } from 'ol/easing';

const Map = ({
    addTool,
    removeTool,
    moveTool,
    addNode,
    removeNode,
    nodes,
    children,
}) => {
    const mapRef = useRef();
    let map = useRef();
    let onNode = useRef(null);

    // Map Listeners
    // Add Nodes
    const addClick = () => {
        map.current.on('click', createNode);
    };

    const removeAddClick = () => {
        map.current.removeEventListener('click', createNode);
    };

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

    // Remove nodes
    const removeClick = () => {
        map.current.on('click', clearNode);
    };

    const removeRemoveClick = () => {
        map.current.removeEventListener('click', clearNode);
    };

    const clearNode = (event) => {
        var feature = event.map.forEachFeatureAtPixel(
            event.pixel,
            function (feature) {
                return feature;
            }
        );
        console.log(map.current.getLayers().array_[1].getSource());
        if (feature) {
            removeNode(feature.getId());
            map.current
                .getLayers()
                .array_[1].getSource()
                .removeFeature(feature);
        }
    };

    // Move Nodes
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
        onNode.current = null;
    };

    // Select Nodes

    // Effect Hooks
    // Map Initialization: Runs only on initalisation
    useEffect(() => {
        let options = {
            target: mapRef.current,
            view: new ol.View({ zoom: 0, center: [0, 0] }),
            layers: [
                new TileLayer({
                    source: new XYZ({
                        crossOrigin: '',
                        url:
                            'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                    }),
                }),
                new VectorLayer({
                    source: new VectorSource({}),
                }),
            ],
            controls: [],
            overlays: [],
        };
        let mapObject = new ol.Map(options);
        map.current = mapObject;

        return () => {
            mapObject.setTarget(undefined);
        };
    }, []);

    // Find out what Tool is being used, if it changes, change the event listener
    useEffect(() => {
        console.log('addTool:' + addTool);
        console.log('removeTool:' + removeTool);
        console.log('moveTool:' + moveTool);

        if (map == null) {
            return;
        }
        if (addTool) {
            addClick();
        }

        if (removeTool) {
            removeClick();
        }

        if (moveTool) {
            moveClick();
        }
        return () => {
            removeAddClick();
            removeRemoveClick();
            removeMoveClick();
        };
    }, [addTool, removeTool, moveTool]);

    // JSX Return
    return (
        <div className='map' ref={mapRef}>
            {children}
        </div>
    );
};
export default Map;
