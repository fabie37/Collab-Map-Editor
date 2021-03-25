import React, { useContext, useEffect } from 'react';
import Routes from './routes';
import { ContextWrapper } from './user-context';
import './App.css';
import { AuthContext } from './context/AuthState';
import { setAuthToken } from './services/setToken';

if (localStorage.token) {
    setAuthToken(localStorage.token);
}

const App = () => {
    const { loadUser } = useContext(AuthContext);

    useEffect(() => {
        loadUser();
    }, []);

    return (
        <ContextWrapper>
            <Routes />
        </ContextWrapper>
    );
};

export default App;
