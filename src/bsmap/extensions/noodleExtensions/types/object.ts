import { BombNote } from '../../../beatmap/v3/bombNote';
import { ColorNote } from '../../../beatmap/v3/colorNote';
import { Chain } from '../../../beatmap/v3/chain';
import { Arc } from '../../../beatmap/v3/arc';
import { Obstacle } from '../../../beatmap/v3/obstacle';

export type INEObject = ColorNote | Obstacle | BombNote | Chain | Arc;

export type INENote = ColorNote | BombNote | Chain | Arc;
