import type { ILightColorBase } from '../../types/beatmap/v3/lightColorBase.ts';
import type { IWrapLightColorBaseAttribute } from '../../types/beatmap/wrapper/lightColorBase.ts';
import { deepCopy } from '../../utils/misc.ts';
import { WrapLightColorBase } from '../wrapper/lightColorBase.ts';

/** Light color base beatmap v3 class object. */
export class LightColorBase extends WrapLightColorBase<ILightColorBase> {
   static default: Required<ILightColorBase> = {
      b: 0,
      i: 0,
      c: 0,
      s: 1,
      f: 0,
      customData: {},
   };

   constructor();
   constructor(data: Partial<IWrapLightColorBaseAttribute<ILightColorBase>>);
   constructor(data: Partial<ILightColorBase>);
   constructor(
      data: Partial<ILightColorBase> & Partial<IWrapLightColorBaseAttribute<ILightColorBase>>,
   );
   constructor(
      data: Partial<ILightColorBase> & Partial<IWrapLightColorBaseAttribute<ILightColorBase>> = {},
   ) {
      super();

      this._time = data.b ?? data.time ?? LightColorBase.default.b;
      this._transition = data.i ?? data.transition ?? LightColorBase.default.i;
      this._color = data.c ?? data.color ?? LightColorBase.default.c;
      this._brightness = data.s ?? data.brightness ?? LightColorBase.default.s;
      this._frequency = data.f ?? data.frequency ?? LightColorBase.default.f;
      this._customData = deepCopy(data.customData ?? LightColorBase.default.customData);
   }

   static create(): LightColorBase[];
   static create(
      ...data: Partial<IWrapLightColorBaseAttribute<ILightColorBase>>[]
   ): LightColorBase[];
   static create(...data: Partial<ILightColorBase>[]): LightColorBase[];
   static create(
      ...data: (Partial<ILightColorBase> & Partial<IWrapLightColorBaseAttribute<ILightColorBase>>)[]
   ): LightColorBase[];
   static create(
      ...data: (Partial<ILightColorBase> & Partial<IWrapLightColorBaseAttribute<ILightColorBase>>)[]
   ): LightColorBase[] {
      const result: LightColorBase[] = [];
      data.forEach((obj) => result.push(new this(obj)));
      if (result.length) {
         return result;
      }
      return [new this()];
   }

   toJSON(): ILightColorBase {
      return {
         b: this.time,
         i: this.transition,
         c: this.color,
         s: this.brightness,
         f: this.frequency,
         customData: deepCopy(this.customData),
      };
   }

   get customData(): NonNullable<ILightColorBase['customData']> {
      return this._customData;
   }
   set customData(value: NonNullable<ILightColorBase['customData']>) {
      this._customData = value;
   }
}
