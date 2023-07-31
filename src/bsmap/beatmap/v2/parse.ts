import { IDifficulty } from '../../types/beatmap/v2/difficulty';
import { Difficulty } from './difficulty';
import { IInfo } from '../../types/beatmap/v2/info';
import { Info } from './info';
import { deepCheck } from '../shared/dataCheck';
import { DifficultyCheck, InfoCheck } from './dataCheck';
import { CharacteristicOrder } from '../shared/characteristic';
import { DifficultyRanking } from '../shared/difficulty';
import logger from '../../logger';
import { sortV2NoteFn, sortV2ObjectFn } from '../shared/helpers';
import { DataCheckOption } from '../../types/beatmap/shared/dataCheck';

function tag(name: string): string[] {
   return ['v2', 'parse', name];
}

export function difficulty(
   data: Partial<IDifficulty>,
   checkData: DataCheckOption = { enabled: true, throwError: true },
): Difficulty {
   logger.tInfo(tag('difficulty'), 'Parsing beatmap difficulty v2.x.x');
   if (!data._version?.startsWith('2')) {
      logger.tWarn(tag('difficulty'), 'Unidentified beatmap version');
      data._version = '2.0.0';
   }
   if (checkData.enabled) {
      deepCheck(data, DifficultyCheck, 'difficulty', data._version, checkData.throwError);
   }

   data._notes?.sort(sortV2NoteFn);
   data._sliders?.sort((a, b) => a._headTime - b._headTime);
   data._obstacles?.sort(sortV2ObjectFn);
   data._events?.sort(sortV2ObjectFn);
   data._waypoints?.sort(sortV2ObjectFn);

   return new Difficulty(data);
}

export function info(
   data: Partial<IInfo>,
   checkData: DataCheckOption = { enabled: true, throwError: true },
): Info {
   logger.tInfo(tag('info'), 'Parsing beatmap info v2.x.x');
   if (!data._version?.startsWith('2')) {
      logger.tWarn(tag('info'), 'Unidentified beatmap version');
   }
   // FIXME: temporary fix from my own mistake, remove when 2.2.0 exist
   data._version = '2.0.0';
   if (checkData.enabled) {
      deepCheck(data, InfoCheck, 'info', data._version, checkData.throwError);
   }
   data._difficultyBeatmapSets?.sort(
      (a, b) =>
         CharacteristicOrder[a._beatmapCharacteristicName] -
         CharacteristicOrder[b._beatmapCharacteristicName],
   );
   data._difficultyBeatmapSets?.forEach((set) => {
      let num = 0;
      set._difficultyBeatmaps.forEach((a) => {
         if (a._difficultyRank - num <= 0) {
            logger.tWarn(tag('info'), a._difficulty + ' is unordered');
         }
         if (DifficultyRanking[a._difficulty] !== a._difficultyRank) {
            logger.tError(tag('info'), a._difficulty + ' has invalid rank');
         }
         num = a._difficultyRank;
         if (
            typeof a._customData?._editorOffset === 'number' &&
            a._customData._editorOffset === 0
         ) {
            delete a._customData._editorOffset;
         }
         if (
            typeof a._customData?._editorOldOffset === 'number' &&
            a._customData._editorOldOffset === 0
         ) {
            delete a._customData._editorOldOffset;
         }
      });
      set._difficultyBeatmaps.sort((a, b) => a._difficultyRank - b._difficultyRank);
   });

   return new Info(data);
}
