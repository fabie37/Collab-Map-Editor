import React, { useEffect, useState, useMemo, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { api } from '../../services/api';
import moment from 'moment';
import {
    Button,
    ButtonGroup,
    Alert,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Container,
} from 'reactstrap';
import socketio from 'socket.io-client';
import { AuthContext } from '../../context/AuthState';
import './profile.css';

export default function Profile({ history }) {
    const [events, setEvents] = useState([]);
    const [userName, setUserName] = useState('');
    const [profilePic, setProfilePic] = useState('');
    const [rSelected, setRSelected] = useState(null);
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
