import React from 'react';
import cls from 'classnames';

import { ArrowTile } from './tiles'
import { Tile } from '../../model';

import './GameTile.css';

const getTileContent = ({ type, direction}) => {
    if (type === Tile.TYPES.ARROW) {
        return <ArrowTile direction={direction} />;
    }
    return '';
};

const handleClick = ({
    pos,
    isInteractive, 
    isActivated, 
    onClick
}) => (
    isInteractive &&
    !isActivated &&
    onClick(pos)
);

const GameTile = (props) => {
    const classNames = cls(
        'GameTile',
        `GameTile-${props.type}`, {
        'GameTile--interactive': props.isInteractive,
        'GameTile--click-origin': props.isClickOrigin,
        'GameTile--activated': props.isActivated,
    });
    return (
        <div className={classNames} onClick={() => handleClick(props)}>
            { getTileContent(props) }
        </div>
    );
};

GameTile.defaultProps = {
    type: Tile.TYPES.BLANK,
    isInteractive: true,
    isClickOrigin: false,
    onClick: () => {},
    pos: '0_0',
    x: 0,
    y: 0,
};

export default GameTile;
