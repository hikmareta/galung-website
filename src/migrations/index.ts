import * as migration_20261026_014426 from './20261026_014426';
import * as migration_20261026_041637_phase04 from './20261026_041637_phase04';
import * as migration_20261026_122602_phase04_closure from './20261026_122602_phase04_closure';
import * as migration_20261026_123633_phase04_models from './20261026_123633_phase04_models';

export const migrations = [
  {
    up: migration_20261026_014426.up,
    down: migration_20261026_014426.down,
    name: '20261026_014426',
  },
  {
    up: migration_20261026_041637_phase04.up,
    down: migration_20261026_041637_phase04.down,
    name: '20261026_041637_phase04',
  },
  {
    up: migration_20261026_122602_phase04_closure.up,
    down: migration_20261026_122602_phase04_closure.down,
    name: '20261026_122602_phase04_closure',
  },
  {
    up: migration_20261026_123633_phase04_models.up,
    down: migration_20261026_123633_phase04_models.down,
    name: '20261026_123633_phase04_models'
  },
];
