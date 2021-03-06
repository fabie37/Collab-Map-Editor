import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import {
    Container,
    Card,
    CardTitle,
    CardBody,
    CardText,
    Button,
} from 'reactstrap';
import Spinner from '../../components/Spinner/Spinner';
import { AuthContext } from '../../context/AuthState';
import { MapContext } from '../../context/MapState';
import './mymaps.css';

const MyMaps = ({ history }) => {
    // State
    const { isAuthenticated } = useContext(AuthContext);
    const {
        userMaps,
        getUserMaps,
        getSingleMap,
        deleteSingleMap,
        isLoading,
    } = useContext(MapContext);

    // On Render, Get user maps
    useEffect(() => {
        if (isAuthenticated) {
            getUserMaps();
        }
    }, []);

    // Redirect on authenticate.
    if (!isAuthenticated) {
        return <Redirect to='/login' />;
    }

    // Edit map functionality
    const editMap = async (map_id) => {
        await getSingleMap(map_id);
        history.push('/mapeditor');
    };

    // Delete Map from database
    const deleteMap = (map_id) => {
        deleteSingleMap(map_id);
    };

    return (
        <Container>
            <div className='my-maps__container'>
                <div className='my-maps__title'>My Maps</div>
                {isLoading ? (
                    <Spinner></Spinner>
                ) : (
                    <div className='my-maps__cards-container'>
                        {userMaps && userMaps.length != 0 ? (
                            userMaps.map((map) => (
                                <Card>
                                    <CardBody>
                                        <CardTitle tag='h2'>
                                            {map.map_title}
                                        </CardTitle>
                                        <CardText>{map.map_type}</CardText>
                                        <Button
                                            color='secondary'
                                            onClick={() => {
                                                deleteMap(map._id);
                                            }}
                                        >
                                            Delete
                                        </Button>
                                        <Button
                                            color='primary'
                                            onClick={() => {
                                                editMap(map._id);
                                            }}
                                        >
                                            Edit
                                        </Button>
                                    </CardBody>
                                </Card>
                            ))
                        ) : (
                            <h1>You have no Maps</h1>
                        )}
                    </div>
                )}
            </div>
        </Container>
    );
};

export default MyMaps;

/*<ItemCard
title={map.map_title}
subtitle={map.map_type}
primaryName='Delete'
primaryAction={() => deleteMap(map._id)}
secondaryName='Edit'
secondaryAction={() => editMap(map._id)}
></ItemCard> */
