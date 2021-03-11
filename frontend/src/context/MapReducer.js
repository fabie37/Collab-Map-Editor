import {
    MAP_CREATE_SUCCESS,
    MAP_CREATE_FAILURE,
    MAP_DELETE_SINGLE_FAILURE,
    MAP_DELETE_SINGLE_SUCCESS,
    MAP_GET_SINGLE_FAILURE,
    MAP_GET_SINGLE_SUCCESS,
    MAP_USER_GET_FAILURE,
    MAP_USER_GET_SUCCESS,
    MAP_CREATE_RESET,
    MAP_IS_LOADING,
    LAYER_GET_BY_MAP_SUCCESS,
    LAYER_GET_BY_MAP_FAILURE,
    LAYER_UPDATE_SUCCESS,
    LAYER_CREATE_SUCCESS,
    LAYER_UPDATE_FAILURE,
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

// All this does is change the app state AFTER doing an api call. You passing in data via the action prop which contains a payload which will usually be your api response data.
// NOTE TO FUTURE SELF: YOU NEED TO HARD COPY VARIABLES IN ORDER TO FORCE A RERENDER IN OTHER WORDS DO newObj = [...oldOBJ]!
export default (state, action) => {
    let newMap = null;
    let newLayer = null;
    let newLayers = null;
    let newNode = null;
    let newNodes = null;

    switch (action.type) {
        case MAP_CREATE_SUCCESS:
            return {
                ...state,
                workingMap: action.payload.data,
                mapCreated: true,
                isLoading: false,
            };
        case MAP_CREATE_FAILURE:
            return {
                ...state,
                workingMap: null,
                userMaps: [],
                mapCreated: false,
                isLoading: false,
            };
        case MAP_CREATE_RESET: {
            return {
                ...state,
                mapCreated: false,
                isLoading: false,
            };
        }
        case MAP_DELETE_SINGLE_SUCCESS:
            return {
                ...state,
                workingMap: null,
                userMaps: state.userMaps.filter(
                    (map) => map._id != action.payload.data._id
                ),
                isLoading: false,
            };
        case MAP_DELETE_SINGLE_FAILURE:
            return {
                ...state,
                isLoading: false,
            };
        case MAP_GET_SINGLE_SUCCESS:
            return {
                ...state,
                workingMap: action.payload.data,
                isLoading: false,
            };
        case MAP_GET_SINGLE_FAILURE:
            return {
                ...state,
                workingMap: null,
                isLoading: false,
            };
        case MAP_USER_GET_SUCCESS:
            return {
                ...state,
                userMaps: action.payload.data,
                isLoading: false,
            };
        case MAP_USER_GET_FAILURE:
            return {
                ...state,
                userMaps: [],
                workingMap: null,
                isLoading: false,
            };
        case MAP_IS_LOADING: {
            return {
                ...state,
                isLoading: true,
            };
        }
        case LAYER_GET_BY_MAP_SUCCESS:
            return {
                ...state,
                requestedLayers: action.payload.data,
                isLoading: false,
            };
        case LAYER_GET_BY_MAP_FAILURE:
            return {
                ...state,
                requestedLayers: [],
                isLoading: false,
            };
        case LAYER_UPDATE_SUCCESS:
            newMap = state.workingMap;
            newLayers = newMap.map_layers.filter(
                (layer) => layer._id != action.payload.data._id
            );
            newLayers = [...newLayers, action.payload.data];
            newMap.map_layers = newLayers;
            return {
                ...state,
                workingMap: newMap,
                isLoading: false,
            };
        case LAYER_UPDATE_FAILURE:
            return {
                ...state,
                isLoading: false,
            };
        case LAYER_CREATE_SUCCESS:
            newMap = state.workingMap;
            newLayers = newMap.map_layers;
            newLayers = [...newLayers, action.payload.data];
            newMap.map_layers = newLayers;
            return {
                ...state,
                workingMap: newMap,
                isLoading: false,
            };

        case LAYER_CREATE_FAILURE:
            return {
                ...state,
                isLoading: false,
            };

        case LAYER_DELETE_SUCCESS:
            newMap = state.workingMap;
            newLayers = newMap.map_layers.filter(
                (layer) => layer._id != action.payload.data._id
            );
            newMap.map_layers = newLayers;
            return {
                ...state,
                workingMap: newMap,
                isLoading: false,
            };

        case LAYER_DELETE_FAILURE:
            return {
                ...state,
                isLoading: false,
            };

        case NODE_GET_BY_MAP_SUCCESS:
            return {
                ...state,
                isLoading: false,
                requestedNodes: action.payload.data,
            };

        case NODE_GET_BY_MAP_FAILURE:
            return {
                ...state,
                isLoading: false,
            };

        case NODE_UPDATE_SUCCESS:
            newNodes = state.workingMap.map_layers
                .filter((layer) => action.payload.data.layer_id == layer._id)[0]
                .layer_nodes.filter(
                    (node) => node._id != action.payload.data._id
                );
            newNodes = [...newNodes, action.payload.data];

            newLayer = state.workingMap.map_layers.filter(
                (layer) => action.payload.data.layer_id == layer._id
            )[0];
            newLayer.layer_nodes = newNodes;

            newLayers = state.workingMap.map_layers.filter(
                (layer) => layer._id != action.payload.data.layer_id
            );
            newLayers = [...newLayers, newLayer];

            newMap = state.workingMap;
            newMap.map_layers = newLayers;
            return {
                ...state,
                workingMap: newMap,
                isLoading: false,
            };

        case NODE_UPDATE_FAILURE:
            return {
                ...state,
                isLoading: false,
            };
        case NODE_CREATE_SUCCESS:
            newNodes = state.workingMap.map_layers.filter(
                (layer) => action.payload.data.layer_id == layer._id
            )[0].layer_nodes;
            newNodes = [...newNodes, action.payload.data];

            newLayer = state.workingMap.map_layers.filter(
                (layer) => action.payload.data.layer_id == layer._id
            )[0];
            newLayer.layer_nodes = newNodes;

            newLayers = state.workingMap.map_layers.filter(
                (layer) => layer._id != action.payload.data.layer_id
            );
            newLayers = [...newLayers, newLayer];

            newMap = { ...state.workingMap };
            newMap.map_layers = newLayers;
            return {
                ...state,
                workingMap: newMap,
                isLoading: false,
            };
        case NODE_CREATE_FAILURE:
            return {
                ...state,
                isLoading: false,
            };
        case NODE_DELETE_SUCCESS:
            newNodes = state.workingMap.map_layers
                .filter((layer) => action.payload.data.layer_id == layer._id)[0]
                .layer_nodes.filter(
                    (node) => action.payload.data._id != node._id
                );

            newLayer = state.workingMap.map_layers.filter(
                (layer) => action.payload.data.layer_id == layer._id
            )[0];
            newLayer.layer_nodes = newNodes;

            newLayers = state.workingMap.map_layers.filter(
                (layer) => layer._id != action.payload.data.layer_id
            );
            newLayers = [...newLayers, newLayer];

            newMap = { ...state.workingMap };
            newMap.map_layers = newLayers;
            return {
                ...state,
                workingMap: newMap,
                isLoading: false,
            };
        case NODE_DELETE_FAILURE:
            return {
                ...state,
                isLoading: false,
            };
        default:
            return state;
    }
};
