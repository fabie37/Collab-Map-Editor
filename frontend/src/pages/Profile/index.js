import React, { useEffect, useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import {
    Alert,
    Container,
} from 'reactstrap';
import { AuthContext } from '../../context/AuthState';
import './profile.css';

export default function Profile({ history }) {
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [messageHandler, setMessageHandler] = useState('');
    const [dropdownOpen, setDropDownOpen] = useState(false);
    const toggle = () => setDropDownOpen(!dropdownOpen);

    const { isAuthenticated, loadUser, user } = useContext(AuthContext);

    useEffect(() => {
        // Redirect on authenticate.
        if (isAuthenticated) {
            return <Redirect to='/login' />;
        }

        loadUser();
    }, []);

    /*const socket = useMemo(
        () => socketio('http://localhost:8000/', { query: { user: user._id } }),
        [user._id]
    ); */

    // Redirect on authenticate.
    if (!isAuthenticated) {
        return <Redirect to='/login' />;
    }

    return (
        <>
            <Container>
                <ul className='profile'>
                    <div class='userNameContainer'>
                        <div className='userName'>
                            {' '}
                            <strong>Name: </strong> {user.name}{' '}
                        </div>
                    </div>
                </ul>
                {error ? (
                    <Alert className='event-validation' color='danger'>
                        {' '}
                        {messageHandler}{' '}
                    </Alert>
                ) : (
                    ''
                )}
                {success ? (
                    <Alert className='event-validation' color='success'>
                        {' '}
                        {messageHandler}
                    </Alert>
                ) : (
                    ''
                )}
            </Container>
        </>
    );
}
