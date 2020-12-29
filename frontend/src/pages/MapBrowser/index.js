import React, { useEffect, useState, useMemo } from 'react';
import api from '../../services/api';
import moment from 'moment';
import { Button, ButtonGroup, Alert, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Container } from 'reactstrap';
import socketio from 'socket.io-client';
import './mapbrowser.css'


export default function MapBrowser({ history }) {
    const [maps, setMaps] = useState([])
    const user = localStorage.getItem('user')
    const user_id = localStorage.getItem('user_id')

    const [rSelected, setRSelected] = useState(null)
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false)
    const [messageHandler, setMessageHandler] = useState('')
    const [eventsRequest, setEventsRequest] = useState([])
    const [dropdownOpen, setDropDownOpen] = useState(false)
    const [eventRequestMessage, setEventRequestMessage] = useState('')
    const [eventRequestSuccess, setEventRequestSuccess] = useState(false)

    const toggle = () => setDropDownOpen(!dropdownOpen);

    useEffect(() => {
        getMaps()
    }, [])

    const socket = useMemo(
        () =>
            socketio('http://localhost:8000/', { query: { user: user_id } }),
        [user_id]
    );

    const filterHandler = (query) => {
        setRSelected(query)
        getMaps(query)
    }

    const myEventsHandler = async () => {
        try {
            setRSelected('myevents')
            const response = await api.get('/user/events', { headers: { user } })
            setMaps(response.data.events)
        } catch (error) {
            history.push('/login');
        }

    }

    const getMaps = async (filter) => {
        console.log("debug1")
        try {
            const url = filter ? `/mapbrowser/${filter}` : '/mapbrowser';
            console.log("debug2")
            const response = await api.get(url, { headers: { user } })
            console.log("debug3")

            setMaps(response.data.maps)
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

    return (
        <>
            <Container>
            <div className="content">
            <div className="filter-panel">
                <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                    <DropdownToggle color="primary" caret>
                        Filter
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem onClick={() => filterHandler(null)} active={rSelected === null} >All Sports</DropdownItem>
                        <DropdownItem onClick={myEventsHandler} active={rSelected === 'myevents'} >My Events</DropdownItem>
                        <DropdownItem onClick={() => filterHandler("running")} active={rSelected === 'running'} >Running</DropdownItem>
                        <DropdownItem onClick={() => filterHandler("cycling")} active={rSelected === 'cycling'} >Cycling</DropdownItem>
                        <DropdownItem color="primary" onClick={() => filterHandler('swimming')} active={rSelected === 'swimming'} >Swimming</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
            <ul className="events-list">
                {maps.map(map => (
                    < li key={map._id} >
                        <strong>{map.map_title}</strong>
                        <span>Event Date: {moment(map.map_type)}</span>
                    </li>
                ))}
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
            </div>
            </Container>
        </>
    )
}