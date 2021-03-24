import React, { createContext, useReducer } from 'react';
import ToolbarReducer from './ToolbarReducer';
import { TOOLBAR_CLEAR_CONTEXT, TOOLBAR_SET_TOOL } from '../actions/types';

// Initial State
const initalState = {
    activeTool: null,
};

// Create Context
export const ToolBarContext = createContext(initalState);

// Provider
export const ToolbarProvider = ({ children }) => {
    const [state, dispatch] = useReducer(ToolbarReducer, initalState);

    // Actions to send to dispatcher
    function setActiveTool(tool) {
        dispatch({ type: TOOLBAR_SET_TOOL, payload: tool });
    }

    function clearToolBarContext() {
        dispatch({ type: TOOLBAR_CLEAR_CONTEXT });
    }

    return (
        <ToolBarContext.Provider
            value={{
                activeTool: state.activeTool,
                setActiveTool,
                clearToolBarContext,
            }}
        >
            {children}
        </ToolBarContext.Provider>
    );
};
