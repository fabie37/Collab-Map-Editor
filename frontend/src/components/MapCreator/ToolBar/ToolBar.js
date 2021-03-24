import React, { useContext } from 'react';
import AddTool from '../Tools/AddTool';
import RemoveTool from '../Tools/RemoveTool';
import MoveTool from '../Tools/MoveTool';
import SelectTool from '../Tools/SelectTool';
import { ToolBarContext } from '../../../context/ToolbarState';
import './ToolBar.css';

function ToolBar({ map }) {
    // ToolBar State
    const { activeTool } = useContext(ToolBarContext);

    return (
        <div className='toolbar'>
            <AddTool map={map} activeTool={activeTool}></AddTool>
            <RemoveTool map={map} activeTool={activeTool}></RemoveTool>
            <MoveTool map={map} activeTool={activeTool}></MoveTool>
            <SelectTool map={map} activeTool={activeTool}></SelectTool>
        </div>
    );
}

export default ToolBar;
