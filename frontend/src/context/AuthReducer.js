import {
    AUTH_REGISTER_SUCCESS,
    AUTH_REGISTER_FAILURE,
    AUTH_LOGOUT_SUCCESS,
    AUTH_LOGOUT_FAILURE,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGIN_FAILURE,
    AUTH_USER_LOADED,
    AUTH_ERR,
} from '../actions/types';

// All this does is change the app state AFTER doing an api call. You passing in data via the action prop which contains a payload which will usually be your api response data.
export default (state, action) => {
    switch (action.type) {
        case AUTH_LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.data.token);
            return {
                ...state,
                token: action.payload.data.token,
                isAuthenticated: true,
                loading: false,
                user: action.payload.data.user,
            };
        case AUTH_LOGIN_FAILURE:
            localStorage.setItem('token', null);
            return {
                ...state,
                isAuthenticated: false,
                loading: false,
                user: null,
            };
        case AUTH_USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: action.payload.data,
            };
        case AUTH_ERR:
            localStorage.setItem('token', null);
            return {
                ...state,
                isAuthenticated: false,
                loading: false,
                user: null,
            };
        case AUTH_REGISTER_SUCCESS:
            localStorage.setItem('token', action.payload.data.token);
            return {
                ...state,
                token: action.payload.data.token,
                isAuthenticated: true,
                loading: false,
                user: action.payload.data.user,
            };
        case AUTH_REGISTER_FAILURE:
            localStorage.setItem('token', null);
            return {
                ...state,
                isAuthenticated: false,
                loading: false,
                user: null,
            };
        case AUTH_LOGOUT_SUCCESS:
            localStorage.setItem('token', null);
            return {
                ...state,
                isAuthenticated: false,
                loading: false,
                user: null,
            };
        case AUTH_LOGOUT_FAILURE:
            localStorage.setItem('token', null);
            return {
                ...state,
                isAuthenticated: false,
                loading: false,
                user: null,
            };

        default:
            return state;
    }
};
