import React, { useEffect, useState } from 'react';
import './ActionBar.css';

function ActionBar({ node, setUserClosed, removeNode, map, setIsEditing }) {
    const closeInfo = () => {
        setUserClosed(true);
    };

    const deleteNode = () => {
        var feature = map.current
            .getLayers()
            .array_[1].getSource()
            .getFeatureById(node.uid);
        if (feature) {
            removeNode(feature.getId());
            map.current
                .getLayers()
                .array_[1].getSource()
                .removeFeature(feature);
        }
    };

    return (
        <div className='actionbar'>
            <button className='action-btn' onClick={closeInfo}>
                Close
            </button>
            <button
                className='action-btn'
                onClick={() => {
                    setIsEditing(true);
                }}
            >
                Edit
            </button>
            <button className='action-btn' onClick={deleteNode}>
                Delete
            </button>
        </div>
    );
}

export default ActionBar;
