import React, { useContext } from 'react';
import './modetoggle.css';
import { MapModeContext } from '../../../context/MapModeState';
import { InfoBarContext } from '../../../context/InfoBarState';

const ModeToggle = () => {
    const { isEditMode, toggleMode } = useContext(MapModeContext);
    const { clearInfoBarContext } = useContext(InfoBarContext);
    return (
        <div className='modetoggle'>
            <button
                className='modetoggle-btn'
                onClick={() => {
                    clearInfoBarContext();
                    toggleMode();
                }}
            >
                {isEditMode ? 'Edit Mode' : 'View Mode'}
            </button>
        </div>
    );
};

export default ModeToggle;
