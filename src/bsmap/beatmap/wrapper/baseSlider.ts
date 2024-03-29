import { LINE_COUNT } from '../shared/constants.ts';
import type { IWrapBaseSlider } from '../../types/beatmap/wrapper/baseSlider.ts';
import { WrapBaseNote } from './baseNote.ts';
import type { ModType } from '../../types/beatmap/shared/modCheck.ts';
import type { Vector2 } from '../../types/vector.ts';

/** Base slider beatmap class object. */
export abstract class WrapBaseSlider<T extends { [P in keyof T]: T[P] }>
   extends WrapBaseNote<T>
   implements IWrapBaseSlider<T>
{
   protected _tailTime!: IWrapBaseSlider['tailTime'];
   protected _tailPosX!: IWrapBaseSlider['tailPosX'];
   protected _tailPosY!: IWrapBaseSlider['tailPosY'];

   get tailTime(): IWrapBaseSlider['tailTime'] {
      return this._tailTime;
   }
   set tailTime(value: IWrapBaseSlider['tailTime']) {
      this._tailTime = value;
   }
   get tailPosX(): IWrapBaseSlider['tailPosX'] {
      return this._tailPosX;
   }
   set tailPosX(value: IWrapBaseSlider['tailPosX']) {
      this._tailPosX = value;
   }
   get tailPosY(): IWrapBaseSlider['tailPosY'] {
      return this._tailPosY;
   }
   set tailPosY(value: IWrapBaseSlider['tailPosY']) {
      this._tailPosY = value;
   }

   setTailTime(value: IWrapBaseSlider['tailTime']) {
      this.tailTime = value;
      return this;
   }
   setTailPosX(value: IWrapBaseSlider['tailPosX']) {
      this.tailPosX = value;
      return this;
   }
   setTailPosY(value: IWrapBaseSlider['tailPosY']) {
      this.tailPosY = value;
      return this;
   }

   mirror(flipColor = true, _flipNoodle?: boolean) {
      this.tailPosX = LINE_COUNT - 1 - this.tailPosX;
      return super.mirror(flipColor);
   }

   getTailPosition(_type?: ModType): Vector2 {
      return [this.tailPosX - 2, this.tailPosY];
   }

   isInverse() {
      return this.time > this.tailTime;
   }
}
