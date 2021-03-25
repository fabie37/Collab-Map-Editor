import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from './context/AuthState';
import { MapProvider } from './context/MapState';
import { LayerGridProvider } from './context/LayerGridState';
import { MapModeProvider } from './context/MapModeState';
import { ToolbarProvider } from './context/ToolbarState';
import { InfoBarProvider } from './context/InfoBarState';

ReactDOM.render(
    <AuthProvider>
        <MapProvider>
            <MapModeProvider>
                <LayerGridProvider>
                    <ToolbarProvider>
                        <InfoBarProvider>
                            <App />
                        </InfoBarProvider>
                    </ToolbarProvider>
                </LayerGridProvider>
            </MapModeProvider>
        </MapProvider>
    </AuthProvider>,
    document.getElementById('root')
);
