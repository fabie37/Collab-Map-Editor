import React from 'react';
import './ToolBar.css';

function ToolBar({ setTool }) {
    return (
        <div className='toolbar'>
            <button className='toolbar-btn' id='addTool' onClick={setTool}>
                Add
            </button>
            <button
                className='toolbar-btn'
                type='button'
                id='removeTool'
                onClick={setTool}
            >
                Remove
            </button>
            <button
                className='toolbar-btn'
                type='button'
                id='moveTool'
                onClick={setTool}
            >
                Move
            </button>
        </div>
    );
}

export default ToolBar;
