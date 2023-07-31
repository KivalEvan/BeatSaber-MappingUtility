import { BombNote } from '../../../beatmap/v3/bombNote';
import { ColorNote } from '../../../beatmap/v3/colorNote';
import { Chain } from '../../../beatmap/v3/chain';
import { Arc } from '../../../beatmap/v3/arc';

export type IChromaNote = ColorNote | BombNote | Chain | Arc;
