import React, { useContext, useEffect } from 'react';
import Routes from './routes';
import { ContextWrapper } from './user-context';
import './App.css';
import { AuthContext } from './context/AuthState';
import { MapContext } from './context/MapState';
import { setAuthToken } from './services/setToken';
import socket from './services/socket';

if (localStorage.token) {
    setAuthToken(localStorage.token);
}

const App = () => {
    const { loadUser, user } = useContext(AuthContext);
    const { getSingleMap, workingMap } = useContext(MapContext);

    useEffect(() => {
        // Load Current User
        loadUser();
        socket.on('connect', () => {});
        socket.on('GET_UPDATE', (map_id) => {
            console.log(map_id);
            getSingleMap(map_id);
        });
        return () => {};
    }, []);

    useEffect(() => {
        if (workingMap) {
            socket.emit('USER_WORKING', workingMap);
        }
    }, [workingMap]);

    return (
        <ContextWrapper>
            <Routes />
        </ContextWrapper>
    );
};

export default App;
