import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { api, config } from '../../services/api';
import {
    Container,
    Card,
    CardTitle,
    CardBody,
    CardText,
    Button,
} from 'reactstrap';
import ItemCard from '../../components/ItemCard/ItemCard';
import Spinner from '../../components/Spinner/Spinner';
import { AuthContext } from '../../context/AuthState';
import { MapContext } from '../../context/MapState';
import './mapbrowser.css';

const MapBrowser = ({ history }) => {
    // State
    const { isAuthenticated } = useContext(AuthContext);
    const {
        userMaps,
        getAllMaps,
        getSingleMap,
        deleteSingleMap,
        isLoading,
    } = useContext(MapContext);

    // On Render, Get user maps
    useEffect(() => {
        if (isAuthenticated) {
            getAllMaps();
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

    // Delete Map from database - DISABLED FOR NOW
    // const deleteMap = (map_id) => {
    //     deleteSingleMap(map_id);
    // };

    return (
        <Container className="container">
            <div className='allmaps-container'>
                <div className='allmaps-title'>All Maps</div>
                {isLoading ? (
                    <Spinner></Spinner>
                ) : (
                    <div className='allmaps-cards-container'>
                        {userMaps && userMaps.length != 0 ? (
                            userMaps.map((map) => (
                                <Card className="card-style">
                                    <CardBody>
                                        <CardTitle className="card-title">
                                            {map.map_title}
                                        </CardTitle>
                                        <CardText>{map.map_type}</CardText>
                                        {/* <Button
                                            color='secondary'
                                            onClick={() => {
                                                deleteMap(map._id);
                                            }}
                                        >
                                            Delete
                                        </Button> */}
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
                            <h1>There are no maps to display</h1>
                        )}
                    </div>
                )}
            </div>
        </Container>
    );
};

export default MapBrowser;

/*<ItemCard
title={map.map_title}
subtitle={map.map_type}
primaryName='Delete'
primaryAction={() => deleteMap(map._id)}
secondaryName='Edit'
secondaryAction={() => editMap(map._id)}
></ItemCard> */
