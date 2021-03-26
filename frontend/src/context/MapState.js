import React, { createContext, useReducer, useContext } from 'react';
import MapReducer from './MapReducer';
import { api, config } from '../services/api';
import { setAuthToken } from '../services/setToken';
import socket from '../services/socket';
import { AuthContext } from '../context/AuthState';
import {
    MAP_CREATE_FAILURE,
    MAP_CREATE_SUCCESS,
    MAP_CREATE_RESET,
    MAP_DELETE_SINGLE_FAILURE,
    MAP_DELETE_SINGLE_SUCCESS,
    MAP_GET_SINGLE_FAILURE,
    MAP_GET_SINGLE_SUCCESS,
    MAP_USER_GET_FAILURE,
    MAP_USER_GET_SUCCESS,
    MAP_IS_LOADING,
    LAYER_GET_BY_MAP_SUCCESS,
    LAYER_GET_BY_MAP_FAILURE,
    LAYER_UPDATE_SUCCESS,
    LAYER_UPDATE_FAILURE,
    LAYER_CREATE_SUCCESS,
    LAYER_CREATE_FAILURE,
    LAYER_DELETE_SUCCESS,
    LAYER_DELETE_FAILURE,
    NODE_GET_BY_MAP_SUCCESS,
    NODE_GET_BY_MAP_FAILURE,
    NODE_UPDATE_SUCCESS,
    NODE_UPDATE_FAILURE,
    NODE_CREATE_SUCCESS,
    NODE_CREATE_FAILURE,
    NODE_DELETE_SUCCESS,
    NODE_DELETE_FAILURE,
} from '../actions/types';

// Initial State
const initalState = {
    workingMap: null,
    userMaps: [],
    mapCreated: false,
    isLoading: false,
    requestedLayers: [],
    requestedNodes: [],
};

// Create Context
export const MapContext = createContext(initalState);

// Provider
export const MapProvider = ({ children }) => {
    const [state, dispatch] = useReducer(MapReducer, initalState);

    const { user } = useContext(AuthContext);

    // Actions to send to dispatcher

    // Creating a map
    async function createMap(formData) {
        // This function simply checks if we have a token, if not then we erase it before making any api calls
        if (localStorage.token) {
            setAuthToken(localStorage.token);
        }
        // Simply lets the app know it's waiting for a map context request... so probably show a spinner
        dispatch({ type: MAP_IS_LOADING });
        try {
            const body = JSON.stringify(formData);
            const res = await api.post('/api/v1/maps/', body, config);
            dispatch({ type: MAP_CREATE_SUCCESS, payload: res.data });
        } catch (error) {
            alert(error.response.data.error);
            dispatch({ type: MAP_CREATE_FAILURE });
        }
    }

    // Set created map state
    function setMapCreated(bool) {
        dispatch({ type: MAP_CREATE_RESET, payload: bool });
    }

    // Get all maps
    async function getAllMaps() {
        if (localStorage.token) {
            setAuthToken(localStorage.token);
        }
        dispatch({ type: MAP_IS_LOADING });
        try {
            const res = await api.get('/api/v1/dashboard/');
            dispatch({ type: MAP_USER_GET_SUCCESS, payload: res.data });
        } catch (error) {
            alert(error.response.data.error);
            dispatch({ type: MAP_USER_GET_FAILURE });
        }
    }

    // Getting all maps that belong to logged in user
    async function getUserMaps() {
        if (localStorage.token) {
            setAuthToken(localStorage.token);
        }
        dispatch({ type: MAP_IS_LOADING });
        try {
            const res = await api.get('/api/v1/maps/');
            dispatch({ type: MAP_USER_GET_SUCCESS, payload: res.data });
        } catch (error) {
            alert(error.response.data.error);
            dispatch({ type: MAP_USER_GET_FAILURE });
        }
    }

    // Get single map that belongs to user
    async function getSingleMap(map_id) {
        if (localStorage.token) {
            setAuthToken(localStorage.token);
        }
        dispatch({ type: MAP_IS_LOADING });
        try {
            const res = await api.get(`/api/v1/maps/${map_id}`);
            dispatch({ type: MAP_GET_SINGLE_SUCCESS, payload: res.data });
        } catch (error) {
            alert(error.response.data.error);
            dispatch({ type: MAP_GET_SINGLE_FAILURE });
        }
    }

    // Delete single map that belongs to user
    async function deleteSingleMap(map_id) {
        if (localStorage.token) {
            setAuthToken(localStorage.token);
        }
        dispatch({ type: MAP_IS_LOADING });
        try {
            const res = await api.delete(`/api/v1/maps/${map_id}`);
            socket.emit('SEND_UPDATE', map_id);
            dispatch({ type: MAP_DELETE_SINGLE_SUCCESS, payload: res.data });
        } catch (error) {
            alert(error.response.data.error);
            dispatch({ type: MAP_DELETE_SINGLE_FAILURE });
        }
    }

    // Get layers via map id
    async function getMapLayers(map_id) {
        if (localStorage.token) {
            setAuthToken(localStorage.token);
        }
        dispatch({ type: MAP_IS_LOADING });
        try {
            const res = await api.get(`/api/v1/maps/${map_id}/layer`);
            dispatch({ type: LAYER_GET_BY_MAP_SUCCESS, payload: res.data });
        } catch (error) {
            alert(error.response.data.error);
            dispatch({ type: LAYER_GET_BY_MAP_FAILURE });
        }
    }

    // Update Layer via layer id and map id
    async function updateLayer(map_id, layer_id, formData) {
        if (localStorage.token) {
            setAuthToken(localStorage.token);
        }
        dispatch({ type: MAP_IS_LOADING });
        try {
            const body = JSON.stringify(formData);
            const res = await api.put(
                `/api/v1/maps/${map_id}/layer/${layer_id}`,
                body,
                config
            );
            socket.emit('SEND_UPDATE', map_id);
            dispatch({ type: LAYER_UPDATE_SUCCESS, payload: res.data });
        } catch (error) {
            alert(error.response.data.error);
            dispatch({ type: LAYER_UPDATE_FAILURE });
        }
    }

    // Create Layer via  map id
    async function createLayer(map_id, formData) {
        if (localStorage.token) {
            setAuthToken(localStorage.token);
        }
        dispatch({ type: MAP_IS_LOADING });
        try {
            const body = JSON.stringify(formData);
            const res = await api.post(
                `/api/v1/maps/${map_id}/layer/`,
                body,
                config
            );
            socket.emit('SEND_UPDATE', map_id);
            dispatch({ type: LAYER_CREATE_SUCCESS, payload: res.data });
        } catch (error) {
            alert(error.response.data.error);
            dispatch({ type: LAYER_CREATE_FAILURE });
        }
    }

    // Delete Layer via  map id
    async function deleteLayer(map_id, layer_id) {
        if (localStorage.token) {
            setAuthToken(localStorage.token);
        }
        dispatch({ type: MAP_IS_LOADING });
        try {
            const res = await api.delete(
                `/api/v1/maps/${map_id}/layer/${layer_id}`
            );
            socket.emit('SEND_UPDATE', map_id);
            dispatch({ type: LAYER_DELETE_SUCCESS, payload: res.data });
        } catch (error) {
            alert(error.response.data.error);
            dispatch({ type: LAYER_DELETE_FAILURE });
        }
    }

    // Get Nodes from map id and layer id
    async function getMapNodes(map_id, layer_id) {
        if (localStorage.token) {
            setAuthToken(localStorage.token);
        }
        dispatch({ type: MAP_IS_LOADING });
        try {
            const res = await api.get(
                `/api/v1/maps/${map_id}/layer/${layer_id}/node`
            );

            dispatch({ type: NODE_GET_BY_MAP_SUCCESS, payload: res.data });
        } catch (error) {
            alert(error.response.data.error);
            dispatch({ type: NODE_GET_BY_MAP_FAILURE });
        }
    }

    // Update node
    async function updateNode(map_id, layer_id, node_id, formData) {
        if (localStorage.token) {
            setAuthToken(localStorage.token);
        }
        dispatch({ type: MAP_IS_LOADING });
        try {
            const body = JSON.stringify(formData);
            const res = await api.put(
                `/api/v1/maps/${map_id}/layer/${layer_id}/node/${node_id}`,
                body,
                config
            );
            socket.emit('SEND_UPDATE', map_id);
            dispatch({ type: NODE_UPDATE_SUCCESS, payload: res.data });
        } catch (error) {
            alert(error.response.data.error);
            dispatch({ type: NODE_UPDATE_FAILURE });
        }
    }

    // Create Node
    async function createNode(map_id, layer_id, formData) {
        if (localStorage.token) {
            setAuthToken(localStorage.token);
        }
        dispatch({ type: MAP_IS_LOADING });
        try {
            const body = JSON.stringify(formData);
            const res = await api.post(
                `/api/v1/maps/${map_id}/layer/${layer_id}/node`,
                body,
                config
            );
            socket.emit('SEND_UPDATE', map_id);
            dispatch({ type: NODE_CREATE_SUCCESS, payload: res.data });
            return res.data.data;
        } catch (error) {
            alert(error.response.data.error);
            dispatch({ type: NODE_CREATE_FAILURE });
        }
    }

    // Delete a given node from a map
    async function deleteNode(map_id, layer_id, node_id) {
        if (localStorage.token) {
            setAuthToken(localStorage.token);
        }
        dispatch({ type: MAP_IS_LOADING });
        try {
            const res = await api.delete(
                `/api/v1/maps/${map_id}/layer/${layer_id}/node/${node_id}`
            );
            socket.emit('SEND_UPDATE', map_id);
            dispatch({ type: NODE_DELETE_SUCCESS, payload: res.data });
        } catch (error) {
            alert(error.response.data.error);
            dispatch({ type: NODE_DELETE_FAILURE });
        }
    }

    return (
        <MapContext.Provider
            value={{
                workingMap: state.workingMap,
                userMaps: state.userMaps,
                mapCreated: state.mapCreated,
                isLoading: state.isLoading,
                requestedLayers: state.requestedLayers,
                requestedNodes: state.requestedNodes,
                createMap,
                setMapCreated,
                getAllMaps,
                getUserMaps,
                getSingleMap,
                deleteSingleMap,
                getMapLayers,
                updateLayer,
                createLayer,
                deleteLayer,
                getMapNodes,
                updateNode,
                createNode,
                deleteNode,
            }}
        >
            {children}
        </MapContext.Provider>
    );
};
