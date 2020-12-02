import React, { useEffect, useState, useMemo } from 'react';
import api from '../../services/api';
import moment from 'moment';
import { Button, ButtonGroup, Alert, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Container } from 'reactstrap';
import socketio from 'socket.io-client';
import userContext from '../../user-context'
import './profile.css'


export default function Profile({ history }) {
    const [events, setEvents] = useState([])
    const user = localStorage.getItem('user')
    const user_id = localStorage.getItem('user_id')
    const [userName, setUserName] = useState('')
    const [profilePic, setProfilePic] = useState('')

    const [rSelected, setRSelected] = useState(null)
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false)
    const [messageHandler, setMessageHandler] = useState('')
    const [dropdownOpen, setDropDownOpen] = useState(false)

    const toggle = () => setDropDownOpen(!dropdownOpen);

    useEffect(() => {
        getUserDetails(user_id)
    }, [])

    const socket = useMemo(
        () =>
            socketio('http://localhost:8000/', { query: { user: user_id } }),
        [user_id]
    );

    const getUserDetails = async (user_id) => {
        
        try {
            const url = user_id ? `/profile/${user_id}` : '/profile';
            const response = await api.get(`/profile/${user_id}`)
            console.log("response: ", response.data)
            console.log("USERNAME SHOULD BE: ", response.data.firstName + " " + response.data.lastName)
            setUserName(response.data.firstName + " " + response.data.lastName)
            setProfilePic(response.data.profilePic_url)
        } catch (error) {
            history.push('/login');
        }

    };

    const imgsrc = profilePic

    return (
        <>
            <Container>
                <ul className="profile">
                    <div class="profilePic">
                        <img className="profilePic" src={imgsrc}/>
                    </div>
                    <div class="userNameContainer">
                        <div className="userName"> <strong>Name: </strong> { userName } </div> 
                    </div>
                </ul>
                {
                    error ? (
                        <Alert className="event-validation" color="danger"> {messageHandler} </Alert>
                    ) : ""
                }
                {
                    success ? (
                        <Alert className="event-validation" color="success"> {messageHandler}</Alert>
                    ) : ""
                }
            </Container>
        </>
    )
}