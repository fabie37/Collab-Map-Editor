import {
    MAPMODE_SET_EDIT,
    MAPMODE_SET_VIEW,
    MAPMODE_TOGGLE_MODE,
} from '../actions/types';

// NOTE TO FUTURE SELF: YOU NEED TO HARD COPY VARIABLES IN ORDER TO FORCE A RERENDER IN OTHER WORDS DO newObj = [...oldOBJ]!
export default (state, action) => {
    switch (action.type) {
        case MAPMODE_TOGGLE_MODE:
            return {
                isEditMode: !state.isEditMode,
            };
        case MAPMODE_SET_EDIT:
            return {
                isEditMode: true,
            };
        case MAPMODE_SET_VIEW:
            return {
                isEditMode: false,
            };
        default:
            return state;
    }
};
