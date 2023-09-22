import type { CharacteristicName } from './characteristic.ts';
import type { DifficultyName } from './difficulty.ts';

export type GenericFileName = `${DifficultyName}${CharacteristicName | ''}.dat`;
