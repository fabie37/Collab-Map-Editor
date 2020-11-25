import React, { useEffect, useState, useMemo } from 'react';
import api from '../../services/api';
import moment from 'moment';
import { Button, ButtonGroup, Container, Alert, Dropdown, Nav, NavLink, 
    DropdownItem, DropdownMenu, DropdownToggle, ListGroup, ListGroupItem, Card, CardBody, CardImg, CardTitle, CardSubtitle, CardText } from 'reactstrap';
import socketio from 'socket.io-client';
import './dashboard.css'
import battle from '../../assets/battle.jpg'


export default function Dashboard({ history }) {
    const [events, setEvents] = useState([])
    const user = localStorage.getItem('user')
    const user_id = localStorage.getItem('user_id')

    const [rSelected, setRSelected] = useState(null)
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false)
    const [messageHandler, setMessageHandler] = useState('')
    const [browseMapsPanel, setBrowseMapsPanel] = useState(false)
    const [myMapsPanel, setMyMapsPanel] = useState(false)

    useEffect(() => {
        getEvents()
    }, [])

    const socket = useMemo(
        () =>
            socketio('http://localhost:8000/', { query: { user: user_id } }),
        [user_id]
    );

    const filterHandler = (query) => {
        setRSelected(query)
        getEvents(query)
    }

    const myEventsHandler = async () => {
        try {
            setRSelected('myevents')
            const response = await api.get('/user/events', { headers: { user } })
            setEvents(response.data.events)
        } catch (error) {
            history.push('/login');
        }

    }

    const getEvents = async (filter) => {
        try {
            const url = filter ? `/dashboard/${filter}` : '/dashboard';
            const response = await api.get(url, { headers: { user } })

            setEvents(response.data.events)
        } catch (error) {
            history.push('/login');
        }

    };

    const deleteEventHandler = async (eventId) => {
        try {
            await api.delete(`/event/${eventId}`, { headers: { user: user } });
            setSuccess(true)
            setMessageHandler('The event was deleted successfully!')
            setTimeout(() => {
                setSuccess(false)
                filterHandler(null)
                setMessageHandler('')
            }, 2500)

        } catch (error) {
            setError(true)
            setMessageHandler('Error when deleting event!')
            setTimeout(() => {
                setError(false)
                setMessageHandler('')
            }, 2000)
        }
    }

    console.log("middle panel: ", browseMapsPanel)

    const browseMapsFunc = async() => {
        setBrowseMapsPanel(!browseMapsPanel)
        if (myMapsPanel){
            setMyMapsPanel(false)
        }
    }

    const myMapsFunc = async() => {
        setMyMapsPanel(!myMapsPanel)
        if (browseMapsPanel){
            setBrowseMapsPanel(false)
        }
    }

    return (
        <>
            <div className="left-panel">
                <ListGroup>
                    <Button id="testbutton" color="link" onClick={() => browseMapsFunc()}> Browse Maps </Button>
                    <Button id="testbutton" color="link" onClick={() => myMapsFunc()}> My Maps </Button>
                    <Button id="testbutton" color="link"> Shared with Me </Button>
                    <Button id="testbutton" color="link"> Help </Button>
                </ListGroup>
            </div>
            {
                browseMapsPanel ? (
                    <div className="mapPanel">
                        <h2>Browse Maps</h2>
                        <ul>
                            <li className="map">
                                <strong> Map </strong>
                                <img src={battle} width="200"/>
                                <span> Date </span>
                                <span> Description </span>
                            </li>

                            <li className="map">
                                <strong> Map </strong>
                                <img src={battle} width="200"/>
                                <span> Date </span>
                                <span> Description </span>
                            </li>
                        </ul>
                    </div>
                ) : ""
            }
            {
                myMapsPanel ? (
                    <div className="mapPanel">
                        <h2>My Maps</h2>
                        <ul>
                            <li className="map">
                                <strong> Map </strong>
                                <img src={battle} width="200"/>
                                <span> Date </span>
                                <span> Description </span>
                            </li>

                            <li className="map">
                                <strong> Map </strong>
                                <img src={battle} width="200"/>
                                <span> Date </span>
                                <span> Description </span>
                            </li>
                        </ul>
                    </div>
                ) : ""
            }

            
        </>
    )
}
