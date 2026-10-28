import * as migration_20261026_014426 from './20261026_014426';
import * as migration_20261026_041637_phase04 from './20261026_041637_phase04';
import * as migration_20261026_122602_phase04_closure from './20261026_122602_phase04_closure';
import * as migration_20261026_123633_phase04_models from './20261026_123633_phase04_models';
import * as migration_20261027_064206_phase05_contact_receipts from './20261027_064206_phase05_contact_receipts';
import * as migration_20261027_091945_phase06_downloads from './20261027_091945_phase06_downloads';
import * as migration_20261027_092310_phase06_approval_snapshot from './20261027_092310_phase06_approval_snapshot';
import * as migration_20261028_125152_phase06_candidate_selection from './20261028_125152_phase06_candidate_selection';

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
    name: '20261026_123633_phase04_models',
  },
  {
    up: migration_20261027_064206_phase05_contact_receipts.up,
    down: migration_20261027_064206_phase05_contact_receipts.down,
    name: '20261027_064206_phase05_contact_receipts',
  },
  {
    up: migration_20261027_091945_phase06_downloads.up,
    down: migration_20261027_091945_phase06_downloads.down,
    name: '20261027_091945_phase06_downloads',
  },
  {
    up: migration_20261027_092310_phase06_approval_snapshot.up,
    down: migration_20261027_092310_phase06_approval_snapshot.down,
    name: '20261027_092310_phase06_approval_snapshot',
  },
  {
    up: migration_20261028_125152_phase06_candidate_selection.up,
    down: migration_20261028_125152_phase06_candidate_selection.down,
    name: '20261028_125152_phase06_candidate_selection'
  },
];
