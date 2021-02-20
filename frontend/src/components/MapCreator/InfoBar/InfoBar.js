import React, { useEffect, useState } from 'react';
import ActionBar from './ActionBar/ActionBar';
import EditBar from './EditBar/EditBar';
import './InfoBar.css';
import InfoDisplay from './InfoDisplay/InfoDisplay';
import InfoEditor from './InfoEditor/InfoEditor';

function InfoBar({ node, setCurrentNode, removeNode, map, updateNode }) {
    let [userClosed, setUserClosed] = useState(false);
    let [show, setShow] = useState(false);
    let [isEditing, setIsEditing] = useState(false);

    const showInfoBar = () => {
        if (show) {
            return 'show';
        } else {
            return 'hide';
        }
    };

    // Effects that change the condition of whether to show the card or not
    useEffect(() => {
        if (node == null) {
            setShow(false);
        } else {
            setShow(true);
        }
    }, [node]);

    useEffect(() => {
        if (userClosed == true) {
            setIsEditing(false);
            setCurrentNode(null);
            setUserClosed(false);
        }
    }, [userClosed]);

    // Conditional Rending: Editing or not
    let display;
    let bar;
    if (isEditing) {
        display = <InfoEditor node={node}></InfoEditor>;
        bar = (
            <EditBar
                node={node}
                setIsEditing={setIsEditing}
                updateNode={updateNode}
            ></EditBar>
        );
    } else {
        display = <InfoDisplay node={node}></InfoDisplay>;
        bar = (
            <ActionBar
                node={node}
                setUserClosed={setUserClosed}
                removeNode={removeNode}
                map={map}
                setIsEditing={setIsEditing}
            ></ActionBar>
        );
    }

    return (
        <div className={showInfoBar()}>
            {display}
            {bar}
        </div>
    );
}

export default InfoBar;
