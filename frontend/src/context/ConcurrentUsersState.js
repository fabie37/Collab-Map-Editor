import React, { createContext, useReducer, useState } from 'react';
import {
    CONUSERS_CLEAR_CONTEXT,
    CONUSERS_SET_CONN_POS,
    CONUSERS_REMOVE_CONN,
} from '../actions/types';
import ConcurrentUsersReducer from './ConcurrentUsersReducer';

// Initial State
const initalState = { connections: [] };

// Create Context
export const ConcurrentUsersContext = createContext(initalState);

// Provider
export const ConccurentUserProvider = ({ children }) => {
    const [state, dispatch] = useReducer(ConcurrentUsersReducer, initalState);

    // Actions to send to dispatcher

    function setConnectionPos(client, screen, map, user, color) {
        // Get WorkingMap
        const connection = {
            _id: user,
            map_id: map,
            client: client,
            screen: screen,
            color: color,
        };

        dispatch({ type: CONUSERS_SET_CONN_POS, payload: connection });
    }

    function removeConnection(user) {
        dispatch({ type: CONUSERS_REMOVE_CONN, payload: user });
    }

    function clearConcurrentUserState() {
        dispatch({ type: CONUSERS_CLEAR_CONTEXT });
    }

    return (
        <ConcurrentUsersContext.Provider
            value={{
                connections: state.connections,
                setConnectionPos,
                removeConnection,
                clearConcurrentUserState,
            }}
        >
            {children}
        </ConcurrentUsersContext.Provider>
    );
};
