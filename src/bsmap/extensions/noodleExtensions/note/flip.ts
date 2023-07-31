import { ColorNote } from '../../../beatmap/v3/colorNote';
import { Vector2 } from '../../../types/vector';
import { random } from '../../../utils/math';

/** Apply random flip to notes.
 * ```ts
 * ne.randomFlip(notes, [[-4, 4], [0, 2]]);
 * ```
 */
export function randomFlip(notes: ColorNote[], range: [Vector2, Vector2]): void {
   const [xVec, yVec] = range.map((r) => r.sort((a, b) => a - b));
   notes.forEach((n) => {
      n.customData.flip = [random(xVec[0], xVec[1]), random(yVec[0], yVec[1])];
   });
}
