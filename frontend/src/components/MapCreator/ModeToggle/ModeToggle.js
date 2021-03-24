import React, { useContext } from 'react';
import './modetoggle.css';
import { MapModeContext } from '../../../context/MapModeState';

const ModeToggle = () => {
    const { isEditMode, toggleMode } = useContext(MapModeContext);
    return (
        <div className='modetoggle'>
            <button
                className='modetoggle-btn'
                onClick={() => {
                    toggleMode();
                }}
            >
                {isEditMode ? 'Edit Mode' : 'View Mode'}
            </button>
        </div>
    );
};

export default ModeToggle;
