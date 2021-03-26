import React, { useState } from 'react';
import './LayerItem.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalHeader, ModalBody, Button } from 'reactstrap';
import { Form, FormGroup, Label, Input } from 'reactstrap';

function LayerItem({
    isEditMode,
    map_id,
    layer_id,
    description,
    updateLayer,
    deleteLayer,
    isOnlyLayer,
    onEditClick,
    onViewClick,
    itemClass,
}) {
    // Layer State For Edit Box
    const [showEditBox, setShowEditBox] = useState(false);

    // Toggle Show Edit Box For Layer
    const toggleEditBox = () => {
        setShowEditBox(!showEditBox);
    };

    // Form Submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        const layerData = new FormData(event.target);
        const formData = {
            layer_description: layerData.get('layer_description'),
        };
        await updateLayer(map_id, layer_id, formData);
        toggleEditBox();
    };
    return (
        <div
            onClick={isEditMode ? onEditClick : onViewClick}
            className={'layeritem ' + itemClass}
        >
            {isEditMode && (
                <FontAwesomeIcon
                    icon={faPen}
                    color='black'
                    style={{ color: 'black' }}
                    className='layeritem-edit'
                    onClick={(e) => {
                        e.stopPropagation();
                        toggleEditBox();
                    }}
                />
            )}
            <div className='layeritem-description'>{description}</div>
            {isOnlyLayer == false && isEditMode == true && (
                <FontAwesomeIcon
                    onClick={(e) => {
                        e.stopPropagation();
                        deleteLayer();
                    }}
                    icon={faTimes}
                    color='black'
                    style={{ color: 'black' }}
                    className='layeritem-delete'
                />
            )}
            <Modal isOpen={showEditBox} toggle={toggleEditBox}>
                <ModalHeader>Edit Layer</ModalHeader>
                <ModalBody>
                    {' '}
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label for='layer_description'>Description</Label>
                            <Input
                                type='text'
                                name='layer_description'
                                id='layer_description'
                                defaultValue={description}
                                required='true'
                            />
                        </FormGroup>
                        <Button color='secondary' onClick={toggleEditBox}>
                            Cancel
                        </Button>
                        <Button color='primary' type='submit'>
                            Edit Layer
                        </Button>
                    </Form>
                </ModalBody>
            </Modal>
        </div>
    );
}

export default LayerItem;
