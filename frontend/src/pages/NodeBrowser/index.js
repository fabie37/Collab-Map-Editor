import React, { useEffect, useState, useMemo } from 'react';
import api from '../../services/api';
import moment from 'moment';
import { Button, ButtonGroup, Alert, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Container, Input } from 'reactstrap';
import socketio from 'socket.io-client';
import './mapbrowser.css'


export default function NodeBrowser({ history }) {
    const [nodes, setNodes] = useState([])
    const user = localStorage.getItem('user')
    const user_id = localStorage.getItem('user_id')

    useEffect(() => {
        getNodes('')
    }, [])

    const socket = useMemo(
        () =>
            socketio('http://localhost:8000/', { query: { user: user_id } }),
        [user_id]
    );

    const getNodes = async (layer_id) => {
        try {
            const url = `/node/${layer_id}`;

            const response = await api.get(url, { headers: { user } })

            setNodes(response.data.nodes)
        } catch (error) {
            //history.push('/login');
        }

    };


    const filterHandler = async (evt) => {
        getNodes(evt.target.value)
    }

    return (
        <>
            <Container>
                <div className="content">
                    <strong>Node browser (dev)</strong>
                    <p>fetch nodes by the layer_id they belong to</p>

                    <Input id="filter" type="text" placeholder={'filter'} onChange={(evt) => filterHandler(evt)} />

                    <ul className="maps-list">
                        {nodes.map(node => (
                            < li key={node._id} >
                                <strong>Node's layer_id: </strong>{node.node_layer_id}
                            </li>
                        ))}
                    </ul>
                </div>
            </Container>
        </>
    )
}