import React, { useContext } from 'react';
import { ToolBarContext } from '../../../context/ToolbarState';

const Tool = ({ id, toolType }) => {
    const { setActiveTool } = useContext(ToolBarContext);

    return (
        <button
            className='toolbar-btn'
            type='button'
            id={id}
            onClick={() => setActiveTool(toolType)}
        >
            {id}
        </button>
    );
};

export default Tool;
