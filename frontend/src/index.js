import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from './context/AuthState';
import { MapProvider } from './context/MapState';

ReactDOM.render(
    <AuthProvider>
        <MapProvider>
            <App />
        </MapProvider>
    </AuthProvider>,
    document.getElementById('root')
);
