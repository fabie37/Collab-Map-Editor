import React, { createContext, useReducer } from 'react';
import AuthReducer from './AuthReducer';
import { api, config } from '../services/api';
import { setAuthToken } from '../services/setToken';
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

// Initial State
const initalState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    loading: true,
    user: null,
};

// Create Context
export const AuthContext = createContext(initalState);

// Provider
export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, initalState);

    // Actions to send to dispatcher

    // Creating a user
    async function createUser(formData) {
        const body = JSON.stringify(formData);

        try {
            const res = await api.post('/api/v1/auth/register', body, config);
            dispatch({ type: AUTH_REGISTER_SUCCESS, payload: res.data });
        } catch (error) {
            alert(error.response.data.error);
            dispatch({ type: AUTH_REGISTER_FAILURE });
        }
    }

    // Logging User out
    async function logoutUser() {
        try {
            const res = await api.get('/api/v1/auth/logout', config);
            dispatch({ type: AUTH_LOGOUT_SUCCESS });
        } catch (error) {
            alert(error.response.data.error);
            dispatch({ type: AUTH_LOGOUT_FAILURE });
        }
    }

    // Logging User In
    async function loginUser(formData) {
        const body = JSON.stringify(formData);

        try {
            const res = await api.post('/api/v1/auth/login', body, config);
            dispatch({ type: AUTH_LOGIN_SUCCESS, payload: res.data });
        } catch (error) {
            alert(error.response.data.error);
            dispatch({ type: AUTH_LOGIN_FAILURE });
        }
    }

    // Loading a User
    async function loadUser() {
        if (localStorage.token) {
            setAuthToken(localStorage.token);
        }

        try {
            const res = await api.get('api/v1/auth/me');
            dispatch({
                type: AUTH_USER_LOADED,
                payload: res.data,
            });
        } catch (error) {
            dispatch({
                type: AUTH_ERR,
            });
        }
    }

    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                isAuthenticated: state.isAuthenticated,
                loading: state.loading,
                user: state.user,
                createUser,
                logoutUser,
                loadUser,
                loginUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
