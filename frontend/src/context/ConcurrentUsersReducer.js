import {
    CONUSERS_CLEAR_CONTEXT,
    CONUSERS_SET_CONN_POS,
    CONUSERS_REMOVE_CONN,
} from '../actions/types';

// NOTE TO FUTURE SELF: YOU NEED TO HARD COPY VARIABLES IN ORDER TO FORCE A RERENDER IN OTHER WORDS DO newObj = [...oldOBJ]!
export default (state, action) => {
    switch (action.type) {
        case CONUSERS_CLEAR_CONTEXT:
            return {
                connections: [],
            };
        case CONUSERS_SET_CONN_POS:
            const connections = state.connections.filter(
                (conn) => conn._id != action.payload._id
            );
            return {
                ...state,
                connections: [...connections, action.payload],
            };
        case CONUSERS_REMOVE_CONN:
            return {
                ...state,
                connections: state.connections.filter(
                    (conn) => conn._id != action.payload
                ),
            };
        default:
            return state;
    }
};
