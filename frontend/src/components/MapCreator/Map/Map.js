import React, { useRef, useState, useEffect } from 'react';
import './Map.css';
import * as ol from 'ol';
import XYZ from 'ol/source/XYZ.js';
import TileLayer from 'ol/layer/Tile.js';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';

const Map = ({ children, map, mapRef }) => {
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

        return () => {
            mapObject.setTarget(undefined);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className='map' ref={mapRef}>
            {children}
        </div>
    );
};
export default Map;
