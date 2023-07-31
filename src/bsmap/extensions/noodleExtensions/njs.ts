import { NoteJumpSpeed } from '../../beatmap/shared/njs';
import { INEObject } from './types/object';
import { settings } from './settings';
import { BeatPerMinute } from '../../beatmap/shared/bpm';
import { EasingFunction } from '../../types/easings';
import { lerp, normalize } from '../../utils/math';
import logger from '../../logger';

function tag(name: string): string[] {
   return ['ext', 'NE', 'njs', name];
}

/** Set NJS to object from start to end object.
 *
 * **NOTE:** JD input will override NJS offset.
 */
export function setNjs(
   objects: INEObject[],
   options: {
      bpm: BeatPerMinute;
      njs: NoteJumpSpeed | number;
      offset?: number;
      jd?: number;
   },
): void {
   if (!objects.length) {
      logger.tWarn(tag('setNJS'), 'No object(s) received.');
      return;
   }
   const njs =
      typeof options.njs === 'number'
         ? new NoteJumpSpeed(options.bpm, options.njs, options.offset)
         : options.njs;
   const offset = njs.calcHjdFromJd(options.jd) - njs.calcHjd(0);
   objects.forEach((o) => {
      o.customData.noteJumpMovementSpeed = njs.value;
      o.customData.noteJumpStartBeatOffset = offset;
   });
}

/** Simultaneously spawn the object from start to end object.
 *
 * Speed determines how fast should note spawn from start to end. (1 is regular speed)
 *
 * **NOTE:** JD input will override NJS offset.
 */
export function simultaneousSpawn(
   objects: INEObject[],
   options: {
      bpm: BeatPerMinute;
      njs: NoteJumpSpeed | number;
      njsOverride?: boolean;
      jd?: number;
      spawnBeatOffset?: number;
      speed: number;
   },
): void {
   if (!objects.length) {
      logger.tWarn(tag('simultaneousSpawn'), 'No object(s) received.');
      return;
   }
   if (!options.speed) {
      logger.tError(tag('simultaneousSpawn'), 'Speed cannot be 0!');
      options.speed = 1;
   }
   options.spawnBeatOffset = options.spawnBeatOffset ?? 0;
   const njs = typeof options.njs === 'number' ? options.njs : options.njs.value;
   const startTime = objects[0].time;
   objects.forEach((o) => {
      o.customData.noteJumpMovementSpeed = options.njsOverride
         ? o.customData.noteJumpMovementSpeed ?? njs
         : njs;
      const currentNJS = new NoteJumpSpeed(options.bpm, o.customData.noteJumpMovementSpeed);
      const offset = currentNJS.calcHjdFromJd(options.jd) - currentNJS.calcHjd(0);
      o.customData.noteJumpStartBeatOffset =
         options.spawnBeatOffset! +
         offset +
         o.time -
         startTime -
         (o.time - startTime) / options.speed;
   });
}

/** Gradually change NJS for objects from start to end objects.
 *
 * **NOTE:** JD input will override NJS offset.
 */
export function gradientNjs(
   objects: INEObject[],
   options: {
      bpm: BeatPerMinute | number;
      njsStart: number;
      njsEnd: number;
      njsOffset?: NoteJumpSpeed | number | null;
      jd?: number;
      easing?: EasingFunction;
   },
): void {
   if (!objects.length) {
      logger.tWarn(tag('gradientNJS'), 'No object(s) received.');
      return;
   }
   options.easing =
      options.easing ??
      function (x: number) {
         return x;
      };
   let offset: number;
   if (typeof options.njsOffset !== 'number') {
      if (options.njsOffset) {
         offset = options.njsOffset.offset;
      } else {
         offset = settings.NJS?.offset ?? 0;
      }
   } else {
      offset = options.njsOffset;
   }
   const startTime = objects[0].time;
   const endTime = objects.at(-1)!.time;
   objects.forEach((o) => {
      o.customData.noteJumpMovementSpeed = lerp(
         normalize(o.time, startTime, endTime),
         options.njsStart,
         options.njsEnd,
         options.easing,
      );
      if (typeof options.jd === 'number') {
         const currNJS = new NoteJumpSpeed(options.bpm, o.customData.noteJumpMovementSpeed, offset);
         o.customData.noteJumpStartBeatOffset =
            currNJS.calcHjdFromJd(options.jd) - currNJS.calcHjd(0);
      }
   });
}
