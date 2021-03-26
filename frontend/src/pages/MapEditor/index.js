import React, { useContext } from 'react';
import MapContainer from '../../components/MapCreator/MapContainer/MapContainer';
import { Redirect } from 'react-router-dom';
import { MapContext } from '../../context/MapState';
import './mapeditor.css';

export default function MapEditor() {
    const { workingMap } = useContext(MapContext);

    // If map not selected, redirect
    if (!workingMap) {
        return <Redirect to='/mymaps' />;
    }

    return (
        <>
            <body className='map_body'>
                <MapContainer></MapContainer>
            </body>
        </>
    );
}
