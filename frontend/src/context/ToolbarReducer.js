import { TOOLBAR_CLEAR_CONTEXT, TOOLBAR_SET_TOOL } from '../actions/types';

// NOTE TO FUTURE SELF: YOU NEED TO HARD COPY VARIABLES IN ORDER TO FORCE A RERENDER IN OTHER WORDS DO newObj = [...oldOBJ]!
export default (state, action) => {
    switch (action.type) {
        case TOOLBAR_SET_TOOL:
            return {
                ...state,
                activeTool: action.payload,
            };
        case TOOLBAR_CLEAR_CONTEXT: {
            return {
                activeTool: null,
            };
        }
        default:
            return state;
    }
};
