import React, { useEffect, useState, useMemo } from 'react';
import api from '../../services/api';
import moment from 'moment';
import { Button, ButtonGroup, Alert, Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import socketio from 'socket.io-client';
import userContext from '../../user-context'
import './profile.css'


export default function Profile({ history }) {
    const [events, setEvents] = useState([])
    const user = localStorage.getItem('user')
    const user_id = localStorage.getItem('user_id')
    const userName = localStorage.getItem('userName')
    const profilePic = localStorage.getItem('profilePic')

    const [rSelected, setRSelected] = useState(null)
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false)
    const [messageHandler, setMessageHandler] = useState('')
    const [dropdownOpen, setDropDownOpen] = useState(false)

    const toggle = () => setDropDownOpen(!dropdownOpen);

    useEffect(() => {
        getUserDetails()
    }, [])

    const socket = useMemo(
        () =>
            socketio('http://localhost:8000/', { query: { user: user_id } }),
        [user_id]
    );

    const getUserDetails = async (user_id) => {
        
        try {
            const url = user_id ? `/user/${user_id}` : '/user';
            const response = await api.get(`/user/${user_id}`)
            console.log("response: ", response.data)
            //const response = await api.get(url, { headers: { user } })
            //setUserName(response.user.firstName)
        } catch (error) {
            //history.push('/login');
        }

    };

    const imgsrc = "http://localhost:8000/files/" + profilePic

    return (
        <>
            <ul className="profile">
                <img className="profilePic" src={imgsrc}/>
                <div className="userName"> <strong>Name: </strong> { userName } </div> 
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
        </>
    )
}