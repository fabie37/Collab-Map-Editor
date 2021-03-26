import React, { useState, useContext } from 'react';
import { api } from '../../services/api';
import { AuthContext } from '../../context/AuthState';
import {
    Button,
    Form,
    FormGroup,
    Container,
    Input,
    Alert,
    Label,
} from 'reactstrap';
import { UserContext } from '../../user-context';
import { Redirect } from 'react-router-dom';
import './register.css';

export default function Register({ history }) {
    const { createUser } = useContext(AuthContext);
    const { isAuthenticated } = useContext(AuthContext);
    const { setIsloggedIn } = useContext(UserContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    // Redirect on authenticate.
    if (isAuthenticated) {
        return <Redirect to='/' />;
    }

    const handleSubmit = async (evt) => {
        evt.preventDefault();

        if (
            email !== '' &&
            password !== '' &&
            firstName !== '' &&
            lastName !== ''
        ) {
            const fullName = firstName + ' ' + lastName;
            await createUser({ email, password, name: fullName });
        } else {
            setError(true);
            setErrorMessage('You need to fill all the Inputs');
            setTimeout(() => {
                setError(false);
                setErrorMessage('');
            }, 2000);
        }
    };

    return (
        <Container>
            <div className='content_login'>
                <h2>Register:</h2>
                <p>
                    Please <strong>Register</strong> for a new account
                </p>
                <Form onSubmit={handleSubmit} className='input-group'>
                    <div className='input-group'>
                        <FormGroup className='mb-2 mr-sm-2 mb-sm-2'>
                            <Input
                                type='text'
                                name='firstName'
                                id='firstName'
                                placeholder='Your first name'
                                onChange={(evt) =>
                                    setFirstName(evt.target.value)
                                }
                            />
                        </FormGroup>
                        <FormGroup className='mb-2 mr-sm-2 mb-sm-2'>
                            <Input
                                type='text'
                                name='lastName'
                                id='lastName'
                                placeholder='Your last name'
                                onChange={(evt) =>
                                    setLastName(evt.target.value)
                                }
                            />
                        </FormGroup>
                        <FormGroup className='mb-2 mr-sm-2 mb-sm-2'>
                            <Input
                                type='email'
                                name='email'
                                id='email'
                                placeholder='Your email'
                                onChange={(evt) => setEmail(evt.target.value)}
                            />
                        </FormGroup>
                        <FormGroup className='mb-2 mr-sm-2 mb-sm-2'>
                            <Input
                                type='password'
                                name='password'
                                id='password'
                                placeholder='Your password'
                                onChange={(evt) =>
                                    setPassword(evt.target.value)
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
                            onClick={() => history.push('/login')}
                        >
                            Login instead?
                        </Button>
                    </FormGroup>
                </Form>
                {error ? (
                    <Alert className='event-validation' color='danger'>
                        {errorMessage}
                    </Alert>
                ) : (
                    ''
                )}
            </div>
        </Container>
    );
}
