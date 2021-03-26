import React, { useContext, useEffect } from 'react';
import Routes from './routes';
import { ContextWrapper } from './user-context';
import './App.css';
import { AuthContext } from './context/AuthState';
import { MapContext } from './context/MapState';
import { setAuthToken } from './services/setToken';
import { ConcurrentUsersContext } from './context/ConcurrentUsersState';
import socket from './services/socket';

if (localStorage.token) {
    setAuthToken(localStorage.token);
}

const App = () => {
    const { loadUser, user } = useContext(AuthContext);
    const { getSingleMap, workingMap } = useContext(MapContext);
    const { setConnectionPos, removeConnection } = useContext(
        ConcurrentUsersContext
    );

    useEffect(() => {
        // Load Current User
        loadUser();
        socket.on('connect', () => {});
        socket.on('GET_UPDATE', (map_id) => {
            console.log(map_id);
            getSingleMap(map_id);
        });
        socket.on('GET_POS', (client, screen, map, user, color) => {
            setConnectionPos(client, screen, map, user, color);
        });
        socket.on('USER_LEFT', (user) => {
            removeConnection(user);
        });
        return () => {};
    }, []);

    useEffect(() => {
        if (workingMap) {
            socket.emit('USER_WORKING', workingMap._id);
        }
    }, [workingMap]);

    return (
        <ContextWrapper>
            <Routes />
        </ContextWrapper>
    );
};

export default App;
