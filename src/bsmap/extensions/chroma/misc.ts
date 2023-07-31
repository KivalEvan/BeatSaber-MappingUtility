import { IChromaNote } from './types/object';

/** Enable look for note from start to end. */
export function setSpawnEffect(objects: IChromaNote[], bool: boolean): void {
   objects.forEach((o) => {
      o.customData.spawnEffect = bool;
   });
}
