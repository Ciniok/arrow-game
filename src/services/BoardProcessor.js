import { find } from 'lodash';
import { Tile } from '../model';
import { 
    ArrowDirections, 
    JUMP_OVER_ACTIVATED_TILES,
 } from '../constants';

const MOVE_VECTORS = {
    [ArrowDirections.UP]: [0, -1],
    [ArrowDirections.DOWN]: [0, 1],
    [ArrowDirections.LEFT]: [-1, 0],
    [ArrowDirections.RIGHT]: [1, 0],
};
    
const updateTileState = (tile, userTriggered) => {
    tile.isActivated = true;
    tile.isClickOrigin = userTriggered;
};

const getMoveVector = ({ type, isActivated, direction }) => {
    if ((type === Tile.TYPES.ARROW) && (!JUMP_OVER_ACTIVATED_TILES || !isActivated)) {
        return MOVE_VECTORS[direction];
    }
};

const getNextPosition = (tile, moveVector) => {
    if (!tile || !moveVector) return;

    const [dx, dy] = moveVector;

    return [tile.x + dx, tile.y + dy].join(Tile.POSITION_SEPARATOR);
};

const traverseBoard = (function() {
    let prevVector;

    return (board, tile, userTriggered = false) => {
        let moveVector = getMoveVector(tile) || prevVector;
        let nextPos = getNextPosition(tile, moveVector);
        let nextTile = findTile(board, nextPos);
    
        prevVector = moveVector;
    
        if (JUMP_OVER_ACTIVATED_TILES || !nextTile.isActivated) {
            updateTileState(tile, userTriggered);
            nextTile && traverseBoard(board, nextTile);
        }
    };
})();

export const findTile = (board, pos) => {
    if (!pos) return;
    const [x, y] = pos.split(Tile.POSITION_SEPARATOR);

    if ((x * y) <= board.length) {
        return find(board, { pos });
    }
}

export const processTileClick = (board, posStr) => {
    const tile = findTile(board, posStr);

    if (tile) {
        traverseBoard(board, tile, true);
    }
};