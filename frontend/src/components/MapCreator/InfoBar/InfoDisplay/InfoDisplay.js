import React from 'react';
import './InfoDisplay.css';
import moment from 'moment';

const InfoDisplay = ({ node }) => {
    console.log(node)
    return (
        <div className='info-display'>
            <div className='mediabox'></div>
            <div className='title'>{node.node_title}</div>
            <div className='date'>{moment(node.node_start_date).format('MM/DD/YYYY')}</div>
            <div className='text'>{node.node_description}</div>
        </div>
    );
};

export default InfoDisplay;
