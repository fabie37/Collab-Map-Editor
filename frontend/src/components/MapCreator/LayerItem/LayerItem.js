import React from 'react';
import './LayerItem.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTimes } from '@fortawesome/free-solid-svg-icons';

function LayerItem({
    isEditMode,
    description,
    deleteLayer,
    isOnlyLayer,
    onEditClick,
    onViewClick,
    itemClass,
}) {
    return (
        <div
            onClick={isEditMode ? onEditClick : onViewClick}
            className={'layeritem ' + itemClass}
        >
            {isEditMode && (
                <FontAwesomeIcon
                    icon={faPen}
                    color='black'
                    style={{ color: 'black' }}
                    className='layeritem-edit'
                />
            )}
            <div className='layeritem-description'>{description}</div>
            {isOnlyLayer == false && isEditMode == true && (
                <FontAwesomeIcon
                    onClick={(e) => {
                        e.stopPropagation();
                        deleteLayer();
                    }}
                    icon={faTimes}
                    color='black'
                    style={{ color: 'black' }}
                    className='layeritem-delete'
                />
            )}
        </div>
    );
}

export default LayerItem;
