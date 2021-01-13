import React from 'react';
import AddTool from '../Tools/AddTool';
import RemoveTool from '../Tools/RemoveTool';
import MoveTool from '../Tools/MoveTool';
import './ToolBar.css';

function ToolBar({
    setTool,
    map,
    toolBarState,
    addNode,
    removeNode,
    nodes,
    onNode,
}) {
    return (
        <div className='toolbar'>
            <AddTool
                map={map}
                onClick={setTool}
                toolBarState={toolBarState}
                addNode={addNode}
            ></AddTool>
            <RemoveTool
                map={map}
                onClick={setTool}
                toolBarState={toolBarState}
                removeNode={removeNode}
            ></RemoveTool>
            <MoveTool
                map={map}
                onClick={setTool}
                toolBarState={toolBarState}
                onNode={onNode}
            ></MoveTool>
        </div>
    );
}

export default ToolBar;
