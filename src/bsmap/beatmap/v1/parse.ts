import { IDifficulty } from '../../types/beatmap/v1/difficulty';
import { Difficulty } from './difficulty';
import { IInfo } from '../../types/beatmap/v1/info';
import { Info } from './info';
import { deepCheck } from '../shared/dataCheck';
import { DifficultyCheck, InfoCheck } from './dataCheck';
import { CharacteristicOrder } from '../shared/characteristic';
import logger from '../../logger';
import { sortV2NoteFn, sortV2ObjectFn } from '../shared/helpers';
import { DataCheckOption } from '../../types/beatmap/shared/dataCheck';

function tag(name: string): string[] {
   return ['v1', 'parse', name];
}

export function difficulty(
   data: Partial<IDifficulty>,
   checkData: DataCheckOption = { enabled: true, throwError: true },
): Difficulty {
   logger.tInfo(tag('difficulty'), 'Parsing beatmap difficulty v1.x.x');
   if (!data._version?.startsWith('1')) {
      logger.tWarn(tag('difficulty'), 'Unidentified beatmap version');
      data._version = '1.5.0';
   }
   if (checkData.enabled) {
      deepCheck(data, DifficultyCheck, 'difficulty', data._version, checkData.throwError);
   }

   data._notes = data._notes ?? [];
   data._obstacles = data._obstacles ?? [];
   data._events = data._events ?? [];

   data._notes.sort(sortV2NoteFn);
   data._obstacles.sort(sortV2ObjectFn);
   data._events.sort(sortV2ObjectFn);

   return new Difficulty(data);
}

export function info(
   data: Partial<IInfo>,
   checkData: DataCheckOption = { enabled: true, throwError: true },
): Info {
   logger.tInfo(tag('info'), 'Parsing beatmap info v1.x.x');
   if (checkData.enabled) {
      deepCheck(data, InfoCheck, 'info', '1.0.0', checkData.throwError);
   }

   data.difficultyLevels
      ?.sort((a, b) => a.difficultyRank - b.difficultyRank)
      .sort(
         (a, b) => CharacteristicOrder[a.characteristic] - CharacteristicOrder[b.characteristic],
      );

   return new Info(data);
}
