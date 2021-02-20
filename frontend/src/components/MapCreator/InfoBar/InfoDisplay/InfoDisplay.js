import React from 'react';
import './InfoDisplay.css';

const InfoDisplay = ({ node }) => {
    // All the details to be featured on the card
    const getTitle = () => {
        if (node) {
            return node.title;
        } else {
            return null;
        }
    };

    const getText = () => {
        if (node) {
            return node.text;
        } else {
            return null;
        }
    };

    const getDate = () => {
        if (node) {
            return node.date;
        } else {
            return null;
        }
    };

    return (
        <div className='info-display'>
            <div className='mediabox'></div>
            <div className='title'>{getTitle()}</div>
            <div className='date'>{getDate()}</div>
            <div className='text'>{getText()}</div>
        </div>
    );
};

export default InfoDisplay;
