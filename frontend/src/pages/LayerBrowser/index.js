import React, { useEffect, useState, useMemo } from 'react';
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
    Input,
} from 'reactstrap';
import socketio from 'socket.io-client';
import './mapbrowser.css';

export default function LayerBrowser({ history }) {
    const [layers, setLayers] = useState([]);
    const user = localStorage.getItem('user');
    const user_id = localStorage.getItem('user_id');
    var filter = '';

    useEffect(() => {
        getLayers('');
    });

    const socket = useMemo(
        () => socketio('http://localhost:8000/', { query: { user: user_id } }),
        [user_id]
    );

    const getLayers = async (map_id) => {
        try {
            if (map_id == '') {
                console.log('calling api with param: ', map_id);
            }
            const url = `/layer/${map_id}`;

            const response = await api.get(url, { headers: { user } });

            setLayers(response.data.layers);
        } catch (error) {
            //history.push('/login');
        }
    };

    const updateFilter = async (evt) => {
        filter = evt.target.value;
        getLayers(filter);
        console.log('filter: ', filter);
    };

    // const filterHandler = async (evt) => {
    //     console.log("input field current value: ",evt.target.value)
    //     getLayers(evt.target.value)
    // }

    return (
        <>
            <Container>
                <div className='content'>
                    <strong>Layer browser (dev)</strong>
                    <p>fetch layers by the map_id they belong to</p>

                    <Input
                        id='filter'
                        type='text'
                        placeholder={'filter'}
                        onChange={(evt) => updateFilter(evt)}
                    />

                    <ul className='maps-list'>
                        {layers.map((layer) => (
                            <li key={layer._id}>
                                <strong>Layer's map_id: </strong>
                                {layer.map_id}
                                <strong>layer_description: </strong>
                                {layer.layer_description}
                            </li>
                        ))}
                    </ul>
                </div>
            </Container>
        </>
    );
}
