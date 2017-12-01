import React, { Component } from 'react';
import { chunk } from 'lodash';

import { TilesColumn } from '../TilesColumn';
import { createRandomTileBoard } from '../../services/BoardFactory';
import { processTileClick } from '../../services/BoardProcessor';

import './GameBoard.css';

class GameBoard extends Component {
    constructor() {
        super();
        this.tiles = [];
        this.isInteractive = true;
    }

    componentWillMount() {
        this.generateTiles();
    }

    generateTiles = () => {
        const { numCols, numRows } = this.props;
        this.tiles = createRandomTileBoard(numCols, numRows);
    }

    handleClick = (pos) => {
        processTileClick(this.tiles, pos);
        this.forceUpdate();
    } 

    render() {
        const { numRows } = this.props;
        const columns = chunk(this.tiles, numRows);

        return (
            <div className='GameBoard'>{
                columns.map((columnTiles, ix) => (
                    <TilesColumn key={ix} tiles={columnTiles} onClick={this.handleClick} />
                ))
            }</div>
        );
    }
};

GameBoard.defaultProps = {
    numCols: 7,
    numRows: 9,
}

export default GameBoard;
