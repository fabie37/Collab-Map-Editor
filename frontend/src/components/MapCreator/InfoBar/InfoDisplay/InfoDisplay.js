import React from 'react';
import './InfoDisplay.css';
import moment from 'moment';

const InfoDisplay = ({ node }) => {

    // check if node has a date, if not, dispaly empty string
    let dateStr = ""

    if(node.node_start_date === null){
        dateStr = "";
    }else{
        dateStr = moment(node.node_start_date).format('MM/DD/YYYY');
    }

    return (
        <div className='info-display'>
            <div className='mediabox'></div>
            <div className='title'>{node.node_title}</div>
            <div className='date'>{dateStr}</div>
            <div className='text'>{node.node_description}</div>
        </div>
    );
};

export default InfoDisplay;
