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

export default function CreateNode({ history }) {
    // ATTRIBUTES ***********************************//
    const [node_title, set_node_title] = useState('');
    const [node_layer_id, set_node_layer_id] = useState('');
    //const [node_user_id, set_node_user_id] = useState('')
    const [node_category, set_node_category] = useState('');
    const [connected_nodes, set_connected_nodes] = useState([]);

    const [node_coordinates, set_node_coordinates] = useState(['0', '0']);
    const [node_coordinatesX, set_node_coordinatesX] = useState('');
    const [node_coordinatesY, set_node_coordinatesY] = useState('');

    const [node_start_date, set_node_start_date] = useState('');
    const [node_end_date, set_node_end_date] = useState('');
    const [node_description, set_node_description] = useState('');
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
            if (node_layer_id !== '') {
                await api.post(
                    '/createnode',
                    {
                        node_title,
                        node_layer_id,
                        node_category,
                        node_description,
                        node_coordinates,
                        node_start_date,
                        node_end_date,
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

    return (
        <Container>
            <div className='panel'>
                <h2>Create your Map</h2>
                <Form onSubmit={submitHandler}>
                    <div className='input-group'>
                        <FormGroup>
                            <Label>Node title: </Label>
                            <Input
                                id='title'
                                type='text'
                                value={node_title}
                                placeholder={''}
                                onChange={(evt) =>
                                    set_node_title(evt.target.value)
                                }
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label>
                                Node layer id (this will eventually be set
                                automatically):{' '}
                            </Label>
                            <Input
                                id='layerid'
                                type='text'
                                value={node_layer_id}
                                placeholder={'Map Title'}
                                onChange={(evt) =>
                                    set_node_layer_id(evt.target.value)
                                }
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label>
                                Node category (this will eventually be a
                                dropdown with preset types):{' '}
                            </Label>
                            <Input
                                id='category'
                                type='text'
                                value={node_category}
                                placeholder={'Map Type'}
                                onChange={(evt) =>
                                    set_node_category(evt.target.value)
                                }
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label>Node description: </Label>
                            <Input
                                id='description'
                                type='text'
                                value={node_description}
                                placeholder={'Map Title'}
                                onChange={(evt) =>
                                    set_node_description(evt.target.value)
                                }
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label>Latitude: </Label>
                            <Input
                                id='latitude'
                                type='text'
                                value={node_coordinates[0]}
                                placeholder={''}
                                onChange={(evt) =>
                                    (node_coordinates[0] = evt.target.value)
                                }
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label>Longitude: </Label>
                            <Input
                                id='longitude'
                                type='text'
                                value={node_coordinates[1]}
                                placeholder={''}
                                onChange={(evt) =>
                                    (node_coordinates[1] = evt.target.value)
                                }
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label>Node start date:</Label>
                            <Input
                                id='date'
                                type='date'
                                value={node_start_date}
                                onChange={(evt) =>
                                    set_node_start_date(evt.target.value)
                                }
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label>Node end date:</Label>
                            <Input
                                id='date'
                                type='date'
                                value={node_end_date}
                                onChange={(evt) =>
                                    set_node_end_date(evt.target.value)
                                }
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
