import React, { useRef, useState, useEffect, useContext } from 'react';
import './Map.css';
import * as ol from 'ol';
import XYZ from 'ol/source/XYZ.js';
import TileLayer from 'ol/layer/Tile.js';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import * as olProj from 'ol/proj';
import { Icon, Style } from 'ol/style';
import marker from '../Tools/node.png';
import { MapContext } from '../../../context/MapState';
import { MapModeContext } from '../../../context/MapModeState';
import { LayerGridContext } from '../../../context/LayerGridState';

const Map = ({ children, map, mapRef }) => {
    const { createNode, deleteNode, workingMap } = useContext(MapContext);
    const { workingLayer, selectedLayers } = useContext(LayerGridContext);
    const { isEditMode } = useContext(MapModeContext);

    // Effect Hooks
    // Map Initialization: Runs only on initalisation
    const user = localStorage.getItem('user');
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

        map.current.on('pointermove', showCursorOnFeatureHover);

        return () => {
            mapObject.setTarget(undefined);
            map.current.removeEventListener(showCursorOnFeatureHover);
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Update Map Every Time we see a something change in the workingMap
    useEffect(() => {
        if (workingMap && isEditMode) {
            const foundLayer = workingMap.map_layers.find(
                (layer) => layer._id == workingLayer
            );
            if (foundLayer) {
                renderLayer(foundLayer);
            } else {
                clearMap();
            }
        } else if (workingMap) {
            if (selectedLayers.length == 0) {
                clearMap();
            } else {
                const layers = workingMap.map_layers.filter((layer) =>
                    selectedLayers.includes(layer._id)
                );
                renderMultiLayers(layers);
            }
        }
    }, [workingMap, workingLayer, selectedLayers]);

    // Clear all nodes from map
    const clearMap = () => {
        map.current.getLayers().array_[1].getSource().clear();
    };

    // Remove a layer
    const removeLayer = (layer) => {
        // Get all Currently rendered node
        let currentlyLoadedFeatures = map.current
            .getLayers()
            .array_[1].getSource()
            .getFeatures();

        // Map each rendered node
        let featureMap = {};
        currentlyLoadedFeatures.forEach((feature) => {
            featureMap[feature.getId()] = feature;
        });

        // If rendered node id not in layer, remove it
        let removeMap = {};
        layer.layer_nodes.forEach((node) => {
            if (featureMap[node._id]) {
                removeMap[node._id] = featureMap[node._id];
            }
        });

        // Remove Layer Nodes
        for (const key in removeMap) {
            map.current
                .getLayers()
                .array_[1].getSource()
                .removeFeature(removeMap[key]);
        }
    };

    // Load in an array of layers
    const renderMultiLayers = (layers) => {
        let currentlyLoadedFeatures = map.current
            .getLayers()
            .array_[1].getSource()
            .getFeatures();

        let featureMap = {};
        currentlyLoadedFeatures.forEach((feature) => {
            featureMap[feature.getId()] = feature;
        });

        layers.forEach((layer) => {
            layer.layer_nodes.forEach((node) => {
                if (!featureMap[node._id]) {
                    renderNode(node);
                } else {
                    delete featureMap[node._id];
                }
            });
        });

        for (const key in featureMap) {
            map.current
                .getLayers()
                .array_[1].getSource()
                .removeFeature(featureMap[key]);
        }
    };

    // Load in a layer
    const renderLayer = (layer) => {
        let currentlyLoadedFeatures = map.current
            .getLayers()
            .array_[1].getSource()
            .getFeatures();

        let featureMap = {};
        currentlyLoadedFeatures.forEach((feature) => {
            featureMap[feature.getId()] = feature;
        });

        layer.layer_nodes.forEach((node) => {
            if (!featureMap[node._id]) {
                renderNode(node);
            } else {
                delete featureMap[node._id];
            }
        });

        for (const key in featureMap) {
            map.current
                .getLayers()
                .array_[1].getSource()
                .removeFeature(featureMap[key]);
        }
    };

    // Method For Creating a node
    const renderNode = (node) => {
        var icon = new Feature({
            geometry: new Point(olProj.fromLonLat(node.node_coordinates)),
            id: node._id,
        });

        icon.setId(node._id);

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
    // Show Cursor
    const showCursorOnFeatureHover = (e) => {
        var hit = e.map.hasFeatureAtPixel(e.pixel);
        e.map.getViewport().style.cursor = hit ? 'pointer' : '';
    };

    function grn(min, max) {
        var highlightedNumber = (Math.random() * (max - min) + min).toFixed(3);

        return highlightedNumber;
    }

    return (
        <div className='map' ref={mapRef}>
            {children}
        </div>
    );
};
export default Map;

/*
 <div className='map' ref={mapRef}>
            <button
                onClick={() =>
                    createNode(workingMap._id, workingLayer, {
                        node_title: 'Hello world',
                        node_coordinates: [grn(-179, 180), grn(-89, 90)],
                    })
                }
                style={{ float: 'right' }}
            >
                Random Add
            </button>
            <button
                onClick={() => {
                    console.log(workingMap.map_layers[0].layer_nodes[0]._id);
                    deleteNode(
                        workingMap._id,
                        workingLayer,
                        workingMap.map_layers.find(
                            (layer) => layer._id == workingLayer
                        ).layer_nodes[0]._id
                    );
                }}
                style={{ float: 'right' }}
            >
                Delete
            </button>
            {children}
        </div>
 */
