import React, { createContext, useReducer } from 'react';
import {
    INFOBAR_CLEAR_CONTEXT,
    INFOBAR_SET_EDITING_MODE,
    INFOBAR_SET_SELECTED,
    INFOBAR_SET_VIEW_MODE,
} from '../actions/types';
import InfoBarReducer from './InfoBarReducer';

// Initial State
const initalState = {
    selectedNode: null,
    isEditing: false,
};

// Create Context
export const InfoBarContext = createContext(initalState);

// Provider
export const InfoBarProvider = ({ children }) => {
    const [state, dispatch] = useReducer(InfoBarReducer, initalState);

    // Actions to send to dispatcher
    function setSelectedNode(nodeID) {
        dispatch({ type: INFOBAR_SET_SELECTED, payload: nodeID });
    }

    function clearInfoBarContext() {
        dispatch({ type: INFOBAR_CLEAR_CONTEXT });
    }

    function setEditMode() {
        dispatch({ type: INFOBAR_SET_EDITING_MODE });
    }

    function setViewMode() {
        dispatch({ type: INFOBAR_SET_VIEW_MODE });
    }

    return (
        <InfoBarContext.Provider
            value={{
                selectedNode: state.selectedNode,
                isEditing: state.isEditing,
                setSelectedNode,
                clearInfoBarContext,
                setEditMode,
                setViewMode,
            }}
        >
            {children}
        </InfoBarContext.Provider>
    );
};
