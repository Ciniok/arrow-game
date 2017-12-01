import React from 'react';
import cls from 'classnames';

import './ArrowTile.css';

const ArrowTile = (props) => {
    const classNames = cls(
        'ArrowTile',
        `ArrowTile-${props.direction}`
    );
    return (
        <div className={classNames} />
    );
};

export default ArrowTile;
