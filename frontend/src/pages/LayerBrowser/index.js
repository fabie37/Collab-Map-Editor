import React, { useEffect, useState, useMemo } from 'react';
import api from '../../services/api';
import moment from 'moment';
import { Button, ButtonGroup, Alert, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Container, Input } from 'reactstrap';
import socketio from 'socket.io-client';
import './mapbrowser.css'


export default function LayerBrowser({ history }) {
    const [layers, setLayers] = useState([])
    const user = localStorage.getItem('user')
    const user_id = localStorage.getItem('user_id')

    // useEffect(() => {
    //     getLayers()
    // }, [])

    const socket = useMemo(
        () =>
            socketio('http://localhost:8000/', { query: { user: user_id } }),
        [user_id]
    );

    const getLayers = async (map_id) => {
        try {
            console.log("fetching layers with filter: ", map_id)
            const url = '/layerbrowser';

            const response = await api.post(url, {map_id}, { headers: { user } })

            setLayers(response.data.layers)
        } catch (error) {
            //history.push('/login');
        }

    };


    const filterHandler = async (evt) => {
        getLayers(evt.target.value)
    }

    return (
        <>
            <Container>
                <div className="content">
                    <strong>Layer browser (dev)</strong>
                    <p>fetch layers by the map_id they belong to</p>

                    <Input id="filter" type="text" placeholder={'filter'} onChange={(evt) => filterHandler(evt)} />

                    <ul className="maps-list">
                        {layers.map(layer => (
                            < li key={layer._id} >
                                <strong>Layer's map_id: </strong>{layer.map_id}
                                <strong>layer_description: </strong>{layer.layer_description}
                            </li>
                        ))}
                    </ul>
                </div>
            </Container>
        </>
    )
}