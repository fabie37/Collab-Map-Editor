import React, { useContext } from 'react';
import { InfoBarContext } from '../../../../context/InfoBarState';
import './EditBar.css';

const EditBar = ({ setIsEditing }) => {
    const { setViewMode } = useContext(InfoBarContext);
    return (
        <div className='editbar'>
            <button
                id='EditItem'
                className='action-btn'
                onClick={() => {
                    setViewMode();
                }}
            >
                Cancel
            </button>
            <div className='action-btn-dummy'></div>
            <button
                name='submit'
                id='submit'
                form='editor'
                className='action-btn'
            >
                Save
            </button>
        </div>
    );
};

export default EditBar;
