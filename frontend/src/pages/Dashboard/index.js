import React, { useEffect, useState, useMemo } from 'react';
import api from '../../services/api';
import moment from 'moment';
import { Button, ButtonGroup, Alert, Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import socketio from 'socket.io-client';
import './dashboard.css'


export default function Dashboard({ history }) {
    const [events, setEvents] = useState([])
    const user = localStorage.getItem('user')
    const user_id = localStorage.getItem('user_id')

    const [rSelected, setRSelected] = useState(null)
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false)
    const [messageHandler, setMessageHandler] = useState('')
    const [dropdownOpen, setDropDownOpen] = useState(false)

    const toggle = () => setDropDownOpen(!dropdownOpen);

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

    return (
        <>
            <ul className="home">
                <div className="left-panel"> Hello from the left panel </div>
            </ul>
        </>
    )
}
