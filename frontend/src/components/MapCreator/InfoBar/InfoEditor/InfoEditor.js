import React, { useContext } from 'react';
import { Form, FormGroup, Label, Input, FormText, Button } from 'reactstrap';
import { InfoBarContext } from '../../../../context/InfoBarState';
import { LayerGridContext } from '../../../../context/LayerGridState';
import { MapContext } from '../../../../context/MapState';
import './InfoEditor.css';
import moment from 'moment';

const InfoEditor = ({ node }) => {
    // Map API Calls
    const { workingMap, updateNode } = useContext(MapContext);
    const { workingLayer } = useContext(LayerGridContext);
    const { selectedNode, setViewMode } = useContext(InfoBarContext);

    const onSubmit = async (e) => {
        e.preventDefault();
        const nodeData = new FormData(e.target);
        const formData = {
            node_title: nodeData.get('node_title'),
            node_description: nodeData.get('node_description'),
            node_start_date: nodeData.get('node_start_date'),
        };
        await updateNode(workingMap._id, workingLayer, selectedNode, formData);
        setViewMode();
    };

    return (
        <div className='info-editor'>
            <div className='mediabox_editor'></div>
            <Form id='editor' className='form' onSubmit={onSubmit}>
                <FormGroup>
                    <Label for='node_title'>Title</Label>
                    <Input
                        type='text'
                        name='node_title'
                        id='node_title'
                        defaultValue={node.node_title}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for='node_description'>Description</Label>
                    <Input
                        type='textarea'
                        name='node_description'
                        id='node_description'
                        defaultValue={node.node_description}
                        className='form-textbox'
                    />
                </FormGroup>
                <FormGroup>
                    <Label for='node_start_date'>Description</Label>
                    <Input
                        type='date'
                        name='node_start_date'
                        id='node_start_date'
                        defaultValue={moment().toString()}
                        // className='form-textbox'
                    />
                </FormGroup>
            </Form>
        </div>
    );
};

export default InfoEditor;

/* 
div className='info-display'>
            <div className='mediabox'></div>
            <input className='title'></input>
            <input className='date'></input>
            <textarea className='text'></textarea>
        </div>*/
