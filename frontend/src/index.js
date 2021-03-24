import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from './context/AuthState';
import { MapProvider } from './context/MapState';
import { LayerGridProvider } from './context/LayerGridState';
import { MapModeProvider } from './context/MapModeState';

ReactDOM.render(
    <AuthProvider>
        <MapProvider>
            <MapModeProvider>
                <LayerGridProvider>
                    <App />
                </LayerGridProvider>
            </MapModeProvider>
        </MapProvider>
    </AuthProvider>,
    document.getElementById('root')
);
