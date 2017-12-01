import { GameTile } from '../index';
import { Tile } from '../../../model';
import { ArrowDirections } from '../../../constants';

export default {
  component: GameTile,
  props: {
    type: Tile.TYPES.ARROW,
    direction: ArrowDirections.LEFT,
    isInteractive: false,
  }
}