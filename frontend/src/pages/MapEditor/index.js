import React from 'react';
import MapContainer from '../../components/MapCreator/MapContainer/MapContainer';
import './mapeditor.css'

export default function MapEditor() {
    return (
        <>
            <body className="map_body">
            <MapContainer></MapContainer>
            </body>
        </>
    );
}
