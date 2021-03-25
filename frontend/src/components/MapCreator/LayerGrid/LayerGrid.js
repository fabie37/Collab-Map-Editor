import React, { useContext, useState, useEffect } from 'react';
import LayerItem from '../LayerItem/LayerItem';
import { MapContext } from '../../../context/MapState';
import { LayerGridContext } from '../../../context/LayerGridState';
import { MapModeContext } from '../../../context/MapModeState';
import { ToolBarContext } from '../../../context/ToolbarState';
import { InfoBarContext } from '../../../context/InfoBarState';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import './LayerGrid.css';

const LayerGrid = () => {
    const [showCreationBox, setShowCreationBox] = useState(false);
    const [isOnlyLayer, setIsOnlyLayer] = useState(false);
    const { workingMap, deleteLayer, updateLayer, createLayer } = useContext(
        MapContext
    );
    const {
        mapID,
        setMapID,
        clearLayerGridContext,
        workingLayer,
        selectedLayers,
        setWorkingLayer,
        checkLayerDeleted,
        toggleLayer,
    } = useContext(LayerGridContext);
    const { isEditMode } = useContext(MapModeContext);
    const { clearToolBarContext } = useContext(ToolBarContext);
    const { clearInfoBarContext } = useContext(InfoBarContext);

    // If there is only one layer, refuse user to delete it
    useEffect(() => {
        if (workingMap.map_layers.length > 1) {
            setIsOnlyLayer(false);
        } else {
            setIsOnlyLayer(true);
        }
    }, [workingMap]);

    // If mode changed, clear context
    useEffect(() => {
        clearLayerGridContext();
        clearToolBarContext();
        setMapID(workingMap._id);
    }, [isEditMode]);

    // If a new map is loaded, clear previous context
    if (workingMap._id != mapID) {
        clearLayerGridContext();
        clearToolBarContext();
        setMapID(workingMap._id);
    }

    // If this is toggled, show/hide layer creation modal
    const toggleCreationBox = () => {
        setShowCreationBox(!showCreationBox);
    };

    // Handle Creating a new form submit
    const handleSubmit = async (event) => {
        event.preventDefault();
        const layerData = new FormData(event.target);
        const formData = {
            layer_description: layerData.get('layer_description'),
        };
        await createLayer(mapID, formData);
        toggleCreationBox();
    };

    return (
        <>
            <div className='layergrid'>
                {workingMap.map_layers.map((layer, index) => {
                    let itemClass = 'layeritem-not-active';
                    if (layer._id == workingLayer && isEditMode) {
                        itemClass = 'layeritem-working';
                    } else if (
                        selectedLayers.includes(layer._id) &&
                        !isEditMode
                    ) {
                        itemClass = 'layeritem-active';
                    }

                    return (
                        <LayerItem
                            isEditMode={isEditMode}
                            itemClass={itemClass}
                            map_id={mapID}
                            layer_id={layer._id}
                            description={layer.layer_description}
                            updateLayer={updateLayer}
                            deleteLayer={() => {
                                checkLayerDeleted(layer._id);
                                clearToolBarContext();
                                deleteLayer(workingMap._id, layer._id);
                            }}
                            isOnlyLayer={isOnlyLayer}
                            onEditClick={(e) => {
                                clearInfoBarContext();
                                clearToolBarContext();
                                setWorkingLayer(layer._id);
                            }}
                            onViewClick={(e) => {
                                toggleLayer(layer._id);
                            }}
                        ></LayerItem>
                    );
                })}
                {isEditMode && (
                    <button
                        className='addbtn'
                        onClick={() => {
                            setShowCreationBox(true);
                        }}
                    >
                        +
                    </button>
                )}
            </div>
            <Modal isOpen={showCreationBox} toggle={toggleCreationBox}>
                <ModalHeader>Create A New Layer</ModalHeader>
                <ModalBody>
                    {' '}
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label for='layer_description'>Description</Label>
                            <Input
                                type='text'
                                name='layer_description'
                                id='layer_description'
                                placeholder='A new layer'
                                required='true'
                            />
                        </FormGroup>
                        <Button color='secondary' onClick={toggleCreationBox}>
                            Cancel
                        </Button>
                        <Button color='primary' type='submit'>
                            Create Layer
                        </Button>
                    </Form>
                </ModalBody>
            </Modal>
        </>
    );
};

export default LayerGrid;
