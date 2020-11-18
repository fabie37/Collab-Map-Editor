import React, { useState, useContext, useMemo } from 'react';
import api from '../../services/api';
import cameraIcon from '../../assets/camera.png'
import { Button, Form, FormGroup, Container, Input, Alert, Label } from 'reactstrap';
import { UserContext } from '../../user-context'
import "./register.css";

export default function Register({ history }) {
    const { setIsloggedIn } = useContext(UserContext);
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [profilePic, setProfilePic] = useState(null)

    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("")

    const preview = useMemo(() => {
        return profilePic ? URL.createObjectURL(profilePic) : null;
    }, [profilePic])


    const handleSubmit = async evt => {
        evt.preventDefault();

        if (email !== "" && password !== "" && firstName !== "" && lastName !== "") {
            const userData = new FormData();

            userData.append("email", email)
            userData.append("password", password)
            userData.append("firstName", firstName)
            userData.append("lastName", lastName)
            userData.append("profilePic", profilePic)

            console.log("userData: ", userData)

            const response = await api.post('/user/register', userData)
            //const response = await api.post('/user/register', { email, password, firstName, lastName, profilePic })
            const user = response.data.user || false;
            const user_id = response.data.user_id || false;
            const userName = response.data.userName || false;
            const pic = response.data.profilePic || false;

            if (user && user_id) {
                localStorage.setItem('user', user)
                localStorage.setItem('user_id', user_id)
                localStorage.setItem('userName', userName)
                localStorage.setItem('profilePic', pic)
                setIsloggedIn(true)
                history.push('/')
            } else {
                const { message } = response.data
                setError(true)
                setErrorMessage(message)
                setTimeout(() => {
                    setError(false)
                    setErrorMessage("")
                }, 2000)
            }
        } else {
            setError(true)
            setErrorMessage("You need to fill all the Inputs")
            setTimeout(() => {
                setError(false)
                setErrorMessage("")
            }, 2000)

        }

    }

    return (
        <Container>
            <h2>Register:</h2>
            <p>Please <strong>Register</strong> for a new account</p>
            <Form onSubmit={handleSubmit} className="input-group">
                <div className="input-group">
                    <FormGroup>
                        <Label>Upload Image: </Label>
                        <Label id='profilePic' style={{ backgroundImage: `url(${preview})` }} className={profilePic ? 'has-profilePic' : ''}>
                            <Input id='profilePic' type="file" onChange={evt => setProfilePic(evt.target.files[0])} />
                            <img src={cameraIcon} style={{ maxWidth: "50px" }} alt="upload icon image" />
                        </Label>
                    </FormGroup>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-2">
                        <Input type="text" name="firstName" id="firstName" placeholder="Your first name" onChange={evt => setFirstName(evt.target.value)} />
                    </FormGroup>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-2">
                        <Input type="text" name="lastName" id="lastName" placeholder="Your last name" onChange={evt => setLastName(evt.target.value)} />
                    </FormGroup>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-2">
                        <Input type="email" name="email" id="email" placeholder="Your email" onChange={evt => setEmail(evt.target.value)} />
                    </FormGroup>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-2">
                        <Input type="password" name="password" id="password" placeholder="Your password" onChange={evt => setPassword(evt.target.value)} />
                    </FormGroup>
                </div>
                <FormGroup>
                    <Button className="submit-btn">Submit</Button>
                </FormGroup>
                <FormGroup>
                    <Button className="secondary-btn" onClick={() => history.push("/login")}>Login instead?</Button>
                </FormGroup>
            </Form>
            {error ? (
                <Alert className="event-validation" color="danger">{errorMessage}</Alert>
            ) : ""}
        </Container>
    );
}