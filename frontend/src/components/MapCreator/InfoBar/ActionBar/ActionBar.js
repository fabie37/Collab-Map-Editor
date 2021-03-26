import React, { useContext } from 'react';
import { InfoBarContext } from '../../../../context/InfoBarState';
import { MapContext } from '../../../../context/MapState';
import { LayerGridContext } from '../../../../context/LayerGridState';
import './ActionBar.css';

function ActionBar({ node }) {
    // InfoBar State && API Calls
    const { clearInfoBarContext, setEditMode } = useContext(InfoBarContext);
    const { deleteNode, workingMap } = useContext(MapContext);
    const { workingLayer } = useContext(LayerGridContext);

    return (
        <div className='actionbar'>
            <button className='action-btn' onClick={clearInfoBarContext}>
                Close
            </button>
            <button
                className='action-btn'
                onClick={() => {
                    setEditMode();
                }}
            >
                Edit
            </button>
            <button
                className='action-btn'
                onClick={() =>
                    deleteNode(workingMap._id, workingLayer, node._id)
                }
            >
                Delete
            </button>
        </div>
    );
}

export default ActionBar;
