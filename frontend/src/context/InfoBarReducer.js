import {
    INFOBAR_CLEAR_CONTEXT,
    INFOBAR_SET_EDITING_MODE,
    INFOBAR_SET_SELECTED,
    INFOBAR_SET_VIEW_MODE,
} from '../actions/types';

// NOTE TO FUTURE SELF: YOU NEED TO HARD COPY VARIABLES IN ORDER TO FORCE A RERENDER IN OTHER WORDS DO newObj = [...oldOBJ]!
export default (state, action) => {
    switch (action.type) {
        case INFOBAR_SET_SELECTED:
            return {
                ...state,
                selectedNode: action.payload,
            };
        case INFOBAR_CLEAR_CONTEXT:
            return {
                selectedNode: null,
                isEditing: false,
            };
        case INFOBAR_SET_EDITING_MODE:
            return {
                ...state,
                isEditing: true,
            };
        case INFOBAR_SET_VIEW_MODE:
            return {
                ...state,
                isEditing: false,
            };
        default:
            return state;
    }
};
