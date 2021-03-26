import React, { useState, useEffect, useContext } from 'react';
import Spinner from '../../components/Spinner/Spinner';
import {
    Alert,
    Container,
    Button,
    Form,
    FormGroup,
    Input,
    Label,
} from 'reactstrap';
import './createmap.css';
import { AuthContext } from '../../context/AuthState';
import { MapContext } from '../../context/MapState';

export default function CreateMap({ history }) {
    const [map_title, setMapTitle] = useState('');
    const [map_type, setMapType] = useState('');
    const [is_public, setIsPublic] = useState(false);

    const [error] = useState(false);
    const [success] = useState(false);

    const { isAuthenticated } = useContext(AuthContext);
    const { createMap, mapCreated, setMapCreated, isLoading } = useContext(
        MapContext
    );

    useEffect(() => {
        // Redirect on authenticate.
        if (!isAuthenticated) {
            history.push('/login');
        }
    }, []);

    useEffect(() => {
        // Redirect on map creation.
        if (mapCreated) {
            setMapCreated(false);
            history.push('/mapeditor');
        }
    }, [mapCreated]);

    // Handle Button Request
    const submitHandler = async (evt) => {
        evt.preventDefault();

        const mapData = { map_title, map_type, is_public };
        createMap(mapData);
    };

    const titleHandler = async (evt) => {
        setMapTitle(evt.target.value);
    };

    const typeHandler = async (evt) => {
        setMapType(evt.target.value);
    };

    const isPublicHandler = async (evt) => {
        setIsPublic(!is_public);
    };

    return (
        <Container>
            <div className='panel'>
                <h2>Create your Map</h2>
                {isLoading ? (
                    <Spinner></Spinner>
                ) : (
                    <Form onSubmit={submitHandler}>
                        <div className='input-group'>
                            <FormGroup>
                                <Label>Title: </Label>
                                <Input
                                    id='title'
                                    type='text'
                                    value={map_title}
                                    placeholder={'Map Title'}
                                    onChange={(evt) => titleHandler(evt)}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label>Type: </Label>
                                <Input
                                    id='description'
                                    type='text'
                                    value={map_type}
                                    placeholder={'Map Type'}
                                    onChange={(evt) => typeHandler(evt)}
                                />
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input
                                        type='checkbox'
                                        onChange={isPublicHandler}
                                    />{' '}
                                    Do you want your map to be public?
                                </Label>
                            </FormGroup>
                        </div>
                        <FormGroup>
                            <Button className='submit-btn'>Submit</Button>
                        </FormGroup>
                        <FormGroup>
                            <Button
                                className='secondary-btn'
                                onClick={() => history.push('/mapbrowser')}
                            >
                                Cancel
                            </Button>
                        </FormGroup>
                    </Form>
                )}
                {error ? (
                    <Alert className='event-validation' color='danger'>
                        {' '}
                        Missing required information
                    </Alert>
                ) : (
                    ''
                )}
                {success ? (
                    <Alert className='event-validation' color='success'>
                        {' '}
                        The event was created successfully!
                    </Alert>
                ) : (
                    ''
                )}
            </div>
        </Container>
    );
}
