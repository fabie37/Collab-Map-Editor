import React from 'react';
import './EditBar.css';

const EditBar = ({ setIsEditing }) => {
    return (
        <div className='editbar'>
            <button
                className='action-btn'
                onClick={() => {
                    setIsEditing(false);
                }}
            >
                Cancel
            </button>
            <div className='action-btn'></div>
            <button className='action-btn'>Save</button>
        </div>
    );
};

export default EditBar;
