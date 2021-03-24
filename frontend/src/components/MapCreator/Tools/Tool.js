import React, { useContext } from 'react';
import { ToolBarContext } from '../../../context/ToolbarState';

const Tool = ({ id, toolType }) => {
    const { setActiveTool, activeTool } = useContext(ToolBarContext);

    return (
        <button
            className={
                activeTool == toolType
                    ? 'toolbar-btn toolbar-btn-active'
                    : 'toolbar-btn'
            }
            type='button'
            id={id}
            onClick={() => setActiveTool(toolType)}
        >
            {id}
        </button>
    );
};

export default Tool;
