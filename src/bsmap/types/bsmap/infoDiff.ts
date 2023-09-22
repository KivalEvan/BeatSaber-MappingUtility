import type { CharacteristicName } from '../beatmap/shared/characteristic.ts';
import type { DifficultyName } from '../beatmap/shared/difficulty.ts';
import type { IWrapInfoDifficulty } from '../beatmap/wrapper/info.ts';
import type { Difficulty as V1Difficulty } from '../../beatmap/v1/difficulty.ts';
import type { Difficulty as V2Difficulty } from '../../beatmap/v2/difficulty.ts';
import type { Difficulty as V3Difficulty } from '../../beatmap/v3/difficulty.ts';
import type { IWrapDifficulty } from '../beatmap/wrapper/difficulty.ts';

interface ILoadInfoDataBase {
   readonly characteristic: CharacteristicName;
   readonly difficulty: DifficultyName;
   readonly settings: IWrapInfoDifficulty;
   data: IWrapDifficulty;
}

interface IV1LoadInfoDifficulty extends ILoadInfoDataBase {
   version: 1;
   data: V1Difficulty;
}

interface IV2LoadInfoDifficulty extends ILoadInfoDataBase {
   version: 2;
   data: V2Difficulty;
}

interface IV3LoadInfoDifficulty extends ILoadInfoDataBase {
   version: 3;
   data: V3Difficulty;
}

export type ILoadInfoData = IV1LoadInfoDifficulty | IV2LoadInfoDifficulty | IV3LoadInfoDifficulty;
