import React from 'react';
import PropTypes from 'prop-types';
import './itemcard.css';

const ItemCard = ({
    title,
    subtitle,
    primaryName,
    primaryAction,
    secondaryAction,
    secondaryName,
}) => {
    return (
        <div className='item-card'>
            <p>{title}</p>
            <p>{subtitle}</p>
            <button onClick={primaryAction}>{primaryName}</button>
            <button onClick={secondaryAction}>{secondaryName}</button>
        </div>
    );
};

ItemCard.propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
    primaryName: PropTypes.string,
    primaryAction: PropTypes.func,
    secondaryName: PropTypes.string,
    secondaryAction: PropTypes.func,
};

export default ItemCard;
