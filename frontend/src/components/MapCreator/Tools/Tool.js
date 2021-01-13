import React from 'react';

const Tool = ({ id, onClick }) => {
    return (
        <button className='toolbar-btn' type='button' id={id} onClick={onClick}>
            {id}
        </button>
    );
};

export default Tool;
