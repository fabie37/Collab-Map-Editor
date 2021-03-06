import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { Alert, Container, Button, Form, FormGroup, Input } from 'reactstrap';
import { AuthContext } from '../../context/AuthState';
import './login.css';

export default function Login({ history }) {
    const { loginUser, isAuthenticated } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error] = useState(false);
    const [errorMessage] = useState('false');

    const handleSubmit = async (evt) => {
        evt.preventDefault();

        // API call here
        await loginUser({ email, password });
    };

    // Redirect on authenticate.
    if (isAuthenticated) {
        return <Redirect to='/' />;
    }

    return (
        <Container>
            <div className='content_login'>
                <h2>Login:</h2>
                <p>
                    Please <strong>Login</strong> into your account
                </p>
                <Form onSubmit={handleSubmit} className='input-group'>
                    <div className='input-group'>
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
                            onClick={() => history.push('/register')}
                        >
                            New Account
                        </Button>
                    </FormGroup>
                </Form>
                {error ? (
                    <Alert className='event-validation' color='danger'>
                        {' '}
                        {errorMessage}
                    </Alert>
                ) : (
                    ''
                )}
            </div>
        </Container>
    );
}
