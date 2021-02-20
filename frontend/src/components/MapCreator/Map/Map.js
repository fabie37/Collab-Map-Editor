import React, { useRef, useState, useEffect } from 'react';
import './Map.css';
import * as ol from 'ol';
import XYZ from 'ol/source/XYZ.js';
import TileLayer from 'ol/layer/Tile.js';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { Icon, Style } from 'ol/style';
import marker from '../Tools/node.png';

const Map = ({ children, map, mapRef, nodes }) => {
    // Effect Hooks
    // Map Initialization: Runs only on initalisation
    useEffect(() => {
        // Configurations
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

        loadNodes(nodes);

        map.current.on('pointermove', showCursorOnFeatureHover);

        return () => {
            mapObject.setTarget(undefined);
            map.current.removeEventListener(showCursorOnFeatureHover);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Show Cursor
    const showCursorOnFeatureHover = (e) => {
        var hit = e.map.hasFeatureAtPixel(e.pixel);
        e.map.getViewport().style.cursor = hit ? 'pointer' : '';
    };

    // Load in nodes that have been previously saved
    const loadNodes = (nodes) => {
        for (var i = 0; i < nodes.length; i++) {
            createNode(nodes[i]);
        }
    };

    // Method For Creating a node
    const createNode = (node) => {
        console.log("createNode in Map.js being called")
        var icon = new Feature({
            geometry: new Point(node.coords),
            id: node.uid,
        });

        icon.setId(node.uid);

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
    };

    return (
        <div className='map' ref={mapRef}>
            {children}
        </div>
    );
};
export default Map;
