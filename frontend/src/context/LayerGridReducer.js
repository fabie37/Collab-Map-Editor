import {
    LAYERGRID_CLEAR_CONTEXT,
    LAYERGRID_SET_WORKING_MAP_ID,
    LAYERGRID_SET_WORKING_LAYER,
    LAYERGRID_DELETE_LAYER_CHECK,
    LAYERGRID_SET_LAYER,
    LAYERGRID_UNSET_LAYER,
} from '../actions/types';

// NOTE TO FUTURE SELF: YOU NEED TO HARD COPY VARIABLES IN ORDER TO FORCE A RERENDER IN OTHER WORDS DO newObj = [...oldOBJ]!
export default (state, action) => {
    switch (action.type) {
        case LAYERGRID_SET_WORKING_MAP_ID:
            return {
                ...state,
                mapID: action.payload,
            };
        case LAYERGRID_CLEAR_CONTEXT:
            return {
                mapID: null,
                workingLayer: null,
                selectedLayers: [],
            };
        case LAYERGRID_SET_WORKING_LAYER:
            return {
                ...state,
                workingLayer: action.payload,
            };
        case LAYERGRID_DELETE_LAYER_CHECK:
            let workingLayer = state.workingLayer;
            if ((action.payload = workingLayer)) {
                workingLayer = null;
            }
            return {
                ...state,
                workingLayer: workingLayer,
            };
        case LAYERGRID_SET_LAYER: {
            return {
                ...state,
                selectedLayers: [...state.selectedLayers, action.payload],
            };
        }
        case LAYERGRID_UNSET_LAYER: {
            return {
                ...state,
                selectedLayers: state.selectedLayers.filter(
                    (layer) => layer != action.payload
                ),
            };
        }
        default:
            return state;
    }
};
