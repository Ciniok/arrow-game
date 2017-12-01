import React from 'react';
import cls from 'classnames';

import { GameTile } from '../GameTile';

import './TilesColumn.css';

const TilesColumn = (props) => {
    const { tiles, onClick } = props;
    const classNames = cls('TilesColumn');

    return (
        <div className={classNames}>{
            tiles.map((tileProps) => (
                <GameTile key={tileProps.pos} {...tileProps} onClick={onClick} />
            ))
        }</div>
    );
};

TilesColumn.defaultProps = {
    tiles: [],
    onClick: (pos) => console.log(`tile clicked, key: ${pos}`),
};

export default TilesColumn;
