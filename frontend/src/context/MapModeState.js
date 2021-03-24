import React, { createContext, useReducer } from 'react';
import MapModeReducer from './MapModeReducer';
import {
    MAPMODE_SET_EDIT,
    MAPMODE_SET_VIEW,
    MAPMODE_TOGGLE_MODE,
} from '../actions/types';

// Initial State
const initalState = {
    isEditMode: true,
};

// Create Context
export const MapModeContext = createContext(initalState);

// Provider
export const MapModeProvider = ({ children }) => {
    const [state, dispatch] = useReducer(MapModeReducer, initalState);

    // Actions to send to dispatcher
    function toggleMode() {
        dispatch({ type: MAPMODE_TOGGLE_MODE });
    }

    function setModeEdit() {
        dispatch({ type: MAPMODE_SET_EDIT });
    }

    function setModeView() {
        dispatch({ type: MAPMODE_SET_VIEW });
    }
    return (
        <MapModeContext.Provider
            value={{
                isEditMode: state.isEditMode,
                toggleMode,
                setModeEdit,
                setModeView,
            }}
        >
            {children}
        </MapModeContext.Provider>
    );
};
