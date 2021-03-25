import React, { useState, useMemo, useEffect } from 'react';
import { api } from '../../services/api';
import {
    Alert,
    Container,
    CustomInput,
    Button,
    Form,
    FormGroup,
    Input,
    Label,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    ButtonDropdown,
} from 'reactstrap';
import cameraIcon from '../../assets/camera.png';
import './createmap.css';

export default function CreateLayer({ history }) {
    // ATTRIBUTES ***********************************//
    const [map_id, setMapId] = useState('');
    const [layer_nodes, setNodes] = useState([]);
    const [layer_description, setDescription] = useState('');
    const [start_date, setStartDate] = useState('');
    const [end_date, setEndDate] = useState('');
    // ATTRIBUTES ***********************************//

    const [thumbnail, setThumbnail] = useState(null);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [dropdownOpen, setOpen] = useState(false);
    const user = localStorage.getItem('user');
    const user_id = localStorage.getItem('user_id');

    useEffect(() => {
        if (!user) history.push('/login');
    }, []);

    const toggle = () => setOpen(!dropdownOpen);

    const preview = useMemo(() => {
        return thumbnail ? URL.createObjectURL(thumbnail) : null;
    }, [thumbnail]);

    console.log('preview: ', preview);

    const submitHandler = async (evt) => {
        evt.preventDefault();

        try {
            if (map_id !== '') {
                await api.post(
                    '/createlayer',
                    {
                        map_id,
                        layer_nodes,
                        layer_description,
                        start_date,
                        end_date,
                    },
                    { headers: { user } }
                );
                setSuccess(true);
                setTimeout(() => {
                    setSuccess(false);
                    history.push('/mapbrowser');
                }, 2000);
            } else {
                setError(true);
                setTimeout(() => {
                    setError(false);
                }, 2000);
            }
        } catch (error) {
            Promise.reject(error);
            console.log(error);
        }
    };

    const map_id_Handler = async (evt) => {
        setMapId(evt.target.value);
    };

    const layer_nodes_Handler = async (evt) => {
        setNodes(evt.target.value);
    };

    const layer_description_Handler = async (evt) => {
        setDescription(evt.target.value);
    };

    const start_date_Handler = async (evt) => {
        setStartDate(evt.target.value);
    };

    const end_date_Handler = async (evt) => {
        setEndDate(evt.target.value);
    };

    return (
        <Container>
            <div className='panel'>
                <h2>Create Layer</h2>
                <Form onSubmit={submitHandler}>
                    <div className='input-group'>
                        <FormGroup>
                            <Label>
                                Map id (of map this layer belongs to):
                            </Label>
                            <Input
                                id='map_id'
                                type='text'
                                value={map_id}
                                placeholder={'Map id'}
                                onChange={(evt) => map_id_Handler(evt)}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label>Layer Description: </Label>
                            <Input
                                id='description'
                                type='text'
                                value={layer_description}
                                placeholder={'Layer Description'}
                                onChange={(evt) =>
                                    layer_description_Handler(evt)
                                }
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label>Layer start date:</Label>
                            <Input
                                id='date'
                                type='date'
                                value={start_date}
                                onChange={(evt) => start_date_Handler(evt)}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label>Layer end date:</Label>
                            <Input
                                id='date'
                                type='date'
                                value={end_date}
                                onChange={(evt) => end_date_Handler(evt)}
                            />
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
