import { isV2, isV3 } from '../../beatmap/version';
import { IWrapDifficulty } from '../../types/beatmap/wrapper/difficulty';
import { v2 } from './v2';
import { v3 } from './v3';

/** Supports both beatmap v2 and v3.
 *
 * **WARNING:** These patch uses default value provided by class object, any changes to said default value will be affected here.
 */
export function difficulty(data: IWrapDifficulty) {
   if (isV2(data)) {
      v2(data);
   } else if (isV3(data)) {
      v3(data);
   }
}

export { info } from './info';
export * from './helpers';
