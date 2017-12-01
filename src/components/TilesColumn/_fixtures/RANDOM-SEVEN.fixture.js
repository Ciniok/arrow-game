import { TilesColumn } from '../index';
import { createRandomTileArray } from '../../../services/BoardFactory'

export default {
  component: TilesColumn,
  props: {
    tiles: createRandomTileArray(7, { x: 0 })
  }
}