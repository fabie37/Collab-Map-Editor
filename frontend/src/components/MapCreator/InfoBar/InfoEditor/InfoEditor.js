import React from 'react';
import './InfoEditor.css';

const InfoEditor = ({ node }) => {
    return (
        <div className='info-display'>
            <div className='mediabox'></div>
            <input className='title'></input>
            <input className='date'></input>
            <textarea className='text'></textarea>
        </div>
    );
};

export default InfoEditor;
