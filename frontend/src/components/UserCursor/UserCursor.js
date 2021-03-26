import React, { CSSProperties } from 'react';
import './UserCursor.css';

const UserCursor = ({ connection, map }) => {
    const calcPos = (client, screen, map) => {
        if (map && map.current) {
            const pixels = map.current.getPixelFromCoordinate([
                client.X,
                client.Y,
            ]);
            if (pixels != null) {
                const x = pixels[0];
                const y = pixels[1];

                return { top: y, left: x };
            }
        }
        return { top: 0, left: 0 };
    };

    // Put position as CSS
    let position = calcPos(connection.client, connection.screen, map);
    position = { ...position, 'background-color': connection.color };

    return <div className='circle' style={position}></div>;
};

export default UserCursor;
