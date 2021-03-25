import React from 'react';
import './InfoDisplay.css';

const InfoDisplay = ({ node }) => {
    return (
        <div className='info-display'>
            <div className='mediabox'></div>
            <div className='title'>{node.node_title}</div>
            <div className='date'>{node.date}</div>
            <div className='text'>{node.node_description}</div>
        </div>
    );
};

export default InfoDisplay;
