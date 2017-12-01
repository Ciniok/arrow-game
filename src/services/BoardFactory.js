import _ from 'lodash';

import { Tile } from '../model';
import { ArrowDirections } from '../constants';

const RANDOM_CONFIG = {
    INTERACTIVE_CHANCE: 0.95,
    TYPES: {
        [Tile.TYPES.BLANK]: .25,
        [Tile.TYPES.GEM]: .05,
        [Tile.TYPES.ARROW]: .7,
        [Tile.TYPES.TRAP]: 0,
    }
}

const getRandomType = () => {
    const randomNumber = Math.random();
    let probabilitySum = 0;

    return _.findKey(RANDOM_CONFIG.TYPES, (probability, key) => {
        probabilitySum += probability;
        return randomNumber < probabilitySum;
    });
}

const getRandomDirection = () => (
    _.chain(ArrowDirections)
        .values()
        .sample()
        .value()
);

const randomValue = (chance, successValue = true, failValue = false) => (
    Math.random() < chance ? successValue : failValue
);

const isInteractive = (type) => (
    type === Tile.TYPES.ARROW && randomValue(RANDOM_CONFIG.INTERACTIVE_CHANCE)
);

export const createRandomTile = ({x, y}) => {
    const type = getRandomType();
    const pos = x + Tile.POSITION_SEPARATOR + y;

    return {
        x, y, pos, type,
        direction: getRandomDirection(),
        isInteractive: isInteractive(type),
    };
};

const createRandomTileWithPosition = ({ x, y }, posPointer) => {
    let posX = _.isUndefined(x) ? posPointer: x;
    let posY = _.isUndefined(y) ? posPointer: y;
    return createRandomTile({ x: posX, y: posY });
}

export const createRandomTileArray = (numTiles, position = {}) => {
    let result = [];

    for (let pos = 0; pos < numTiles; pos++) {
        result.push(createRandomTileWithPosition(position, pos));
    }
    return result;
}

export const createRandomTileBoard = (numCols, numRows) => {
    let board = [];

    for (let col = 0; col < numCols; col++) {
        const colCells = createRandomTileArray(numRows, { x: col });
        board.push(...colCells);
    }
    return board;
}
