import React, { useState, useMemo, useEffect } from 'react';
import api from '../../services/api';
import { Alert, Container, CustomInput, Button, Form, FormGroup, Input, Label, DropdownItem, DropdownMenu, DropdownToggle, ButtonDropdown } from 'reactstrap';
import cameraIcon from '../../assets/camera.png'
import "./createmap.css";

export default function CreateMap({ history }) {
    const [map_title, setMapTitle] = useState('')
    const [map_type, setMapType] = useState('')
    const [is_public, setIsPublic] = useState(false)

    const [thumbnail, setThumbnail] = useState(null)
    const [sport, setSport] = useState('Sport')
    const [date, setDate] = useState('')
    
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)
    const [dropdownOpen, setOpen] = useState(false);
    const user = localStorage.getItem('user');
    const user_id = localStorage.getItem('user_id');

    useEffect(() => {
        if (!user) history.push('/login');
    }, [])

    const toggle = () => setOpen(!dropdownOpen);

    const preview = useMemo(() => {
        return thumbnail ? URL.createObjectURL(thumbnail) : null;
    }, [thumbnail])

    console.log("preview: ", preview)

    const submitHandler = async (evt) => {
        evt.preventDefault()

        const mapData = new FormData();

        mapData.append("map_title", map_title)
        mapData.append("map_type", map_type)
        mapData.append("is_public", is_public)


        try {
            if (map_title !== "" && map_type !== "") {
                await api.post("/createmap", mapData, { headers: { user } })
                setSuccess(true)
                setTimeout(() => {
                    setSuccess(false)
                    history.push("/")
                }, 2000)
            } else {
                setError(true)
                setTimeout(() => {
                    setError(false)
                }, 2000)
            }
        } catch (error) {
            Promise.reject(error);
            console.log(error);
        }
    }

    const isPublicHandler = async (evt) => {
        setIsPublic(!is_public)
    }
    

    return (
        <Container>
            <div className="panel">
            <h2>Create your Map</h2>
            <Form onSubmit={submitHandler}>
                <div className="input-group">
                    <FormGroup>
                        <Label>Title: </Label>
                        <Input id="title" type="text" value={map_title} placeholder={'Map Title'} onChange={(evt) => setMapTitle(evt.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Type: </Label>
                        <Input id="description" type="text" value={map_type} placeholder={'Map Type'} onChange={(evt) => setMapType(evt.target.value)} />
                    </FormGroup>
                    <FormGroup check>
                        <Label check>
                        <Input type="checkbox" onChange={isPublicHandler}/>{' '}
                            Do you want your map to be public?
                        </Label>
                        <div>
                            <CustomInput type="switch" id="exampleCustomSwitch" name="customSwitch" label="This doesnt do anything, I was just experimenting" />
                        </div>
                    </FormGroup>
                </div>
                <FormGroup>
                    <Button className="submit-btn">Submit</Button>
                </FormGroup>
                <FormGroup>
                    <Button className="secondary-btn" onClick={() => history.push("/")}>
                        Cancel
                    </Button>
                </FormGroup>
            </Form>
            {error ? (
                <Alert className="event-validation" color="danger"> Missing required information</Alert>
            ) : ""}
            {success ? (
                <Alert className="event-validation" color="success"> The event was created successfully!</Alert>
            ) : ""}
            </div>
        </Container>
    )
}