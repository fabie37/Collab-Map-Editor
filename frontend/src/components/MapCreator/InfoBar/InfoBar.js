import React, { useEffect, useState, useContext } from 'react';
import ActionBar from './ActionBar/ActionBar';
import EditBar from './EditBar/EditBar';
import './InfoBar.css';
import InfoDisplay from './InfoDisplay/InfoDisplay';
import InfoEditor from './InfoEditor/InfoEditor';
import { InfoBarContext } from '../../../context/InfoBarState';
import { MapModeContext } from '../../../context/MapModeState';
import { MapContext } from '../../../context/MapState';

function InfoBar() {
    const { selectedNode, isEditing, clearInfoBarContext } = useContext(
        InfoBarContext
    );
    const { workingMap } = useContext(MapContext);
    const { isEditMode } = useContext(MapModeContext);

    const [node, setNode] = useState(null);

    // Get node from selectedNode ID
    useEffect(() => {
        let found = null;
        for (let layer of workingMap.map_layers) {
            found = layer.layer_nodes.find((n) => n._id === selectedNode);
            if (found) {
                break;
            }
        }
        if (found === null || found === undefined) {
            clearInfoBarContext();
            setNode(null);
        } else {
            setNode(found);
        }
    }, [selectedNode, workingMap]);

    return (
        <div className='infobar'>
            {node ? (
                isEditing ? (
                    <InfoEditor node={node} />
                ) : (
                    <InfoDisplay node={node} />
                )
            ) : null}
            {node ? (
                isEditMode ? (
                    isEditing ? (
                        <EditBar node={node} />
                    ) : (
                        <ActionBar node={node} />
                    )
                ) : null
            ) : null}
        </div>
    );
}

export default InfoBar;
