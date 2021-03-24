import React, { createContext, useReducer } from 'react';
import LayerGridReducer from './LayerGridReducer';
import {
    LAYERGRID_CLEAR_CONTEXT,
    LAYERGRID_SET_WORKING_MAP_ID,
    LAYERGRID_DELETE_LAYER_CHECK,
    LAYERGRID_SET_WORKING_LAYER,
    LAYERGRID_UNSET_LAYER,
    LAYERGRID_SET_LAYER,
} from '../actions/types';

// Initial State
const initalState = {
    mapID: null,
    workingLayer: null,
    selectedLayers: [],
};

// Create Context
export const LayerGridContext = createContext(initalState);

// Provider
export const LayerGridProvider = ({ children }) => {
    const [state, dispatch] = useReducer(LayerGridReducer, initalState);

    // Actions to send to dispatcher
    function setMapID(mapID) {
        dispatch({ type: LAYERGRID_SET_WORKING_MAP_ID, payload: mapID });
    }

    function clearLayerGridContext() {
        dispatch({ type: LAYERGRID_CLEAR_CONTEXT });
    }

    function setWorkingLayer(layerID) {
        dispatch({ type: LAYERGRID_SET_WORKING_LAYER, payload: layerID });
    }

    function checkLayerDeleted(layerID) {
        dispatch({ type: LAYERGRID_DELETE_LAYER_CHECK, payload: layerID });
    }

    function toggleLayer(layerID) {
        if (state.selectedLayers.includes(layerID)) {
            dispatch({ type: LAYERGRID_UNSET_LAYER, payload: layerID });
        } else {
            dispatch({ type: LAYERGRID_SET_LAYER, payload: layerID });
        }
    }

    return (
        <LayerGridContext.Provider
            value={{
                mapID: state.mapID,
                workingLayer: state.workingLayer,
                selectedLayers: state.selectedLayers,
                setMapID,
                clearLayerGridContext,
                checkLayerDeleted,
                setWorkingLayer,
                toggleLayer,
            }}
        >
            {children}
        </LayerGridContext.Provider>
    );
};
