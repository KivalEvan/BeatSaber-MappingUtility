import type { IIndexFilter } from '../../types/beatmap/v3/indexFilter.ts';
import type { ILightTranslationBase } from '../../types/beatmap/v3/lightTranslationBase.ts';
import type { ILightTranslationEventBox } from '../../types/beatmap/v3/lightTranslationEventBox.ts';
import type { IWrapLightTranslationEventBoxAttribute } from '../../types/beatmap/wrapper/lightTranslationEventBox.ts';
import type { DeepPartial } from '../../types/utils.ts';
import { deepCopy } from '../../utils/misc.ts';
import { WrapLightTranslationEventBox } from '../wrapper/lightTranslationEventBox.ts';
import { IndexFilter } from './indexFilter.ts';
import { LightTranslationBase } from './lightTranslationBase.ts';

/** Light translation event box beatmap v3 class object. */
export class LightTranslationEventBox extends WrapLightTranslationEventBox<
   ILightTranslationEventBox,
   ILightTranslationBase,
   IIndexFilter
> {
   static default: Required<ILightTranslationEventBox> = {
      f: {
         f: IndexFilter.default.f,
         p: IndexFilter.default.p,
         t: IndexFilter.default.t,
         r: IndexFilter.default.r,
         c: IndexFilter.default.c,
         n: IndexFilter.default.n,
         s: IndexFilter.default.s,
         l: IndexFilter.default.l,
         d: IndexFilter.default.d,
      },
      w: 0,
      d: 1,
      s: 0,
      t: 1,
      a: 0,
      r: 0,
      b: 0,
      i: 0,
      l: [],
      customData: {},
   };

   constructor();
   constructor(
      data: DeepPartial<
         IWrapLightTranslationEventBoxAttribute<
            ILightTranslationEventBox,
            ILightTranslationBase,
            IIndexFilter
         >
      >,
   );
   constructor(data: DeepPartial<ILightTranslationEventBox>);
   constructor(
      data: DeepPartial<ILightTranslationEventBox> &
         DeepPartial<
            IWrapLightTranslationEventBoxAttribute<
               ILightTranslationEventBox,
               ILightTranslationBase,
               IIndexFilter
            >
         >,
   );
   constructor(
      data: DeepPartial<ILightTranslationEventBox> &
         DeepPartial<
            IWrapLightTranslationEventBoxAttribute<
               ILightTranslationEventBox,
               ILightTranslationBase,
               IIndexFilter
            >
         > = {},
   ) {
      super();

      this._filter = new IndexFilter(
         (data as ILightTranslationEventBox).f ??
            (data.filter as IIndexFilter) ??
            LightTranslationEventBox.default.f,
      );
      this._beatDistribution =
         data.w ?? data.beatDistribution ?? LightTranslationEventBox.default.w;
      this._beatDistributionType =
         data.d ?? data.beatDistributionType ?? LightTranslationEventBox.default.d;
      this._translationDistribution =
         data.s ?? data.translationDistribution ?? LightTranslationEventBox.default.s;
      this._translationDistributionType =
         data.t ?? data.translationDistributionType ?? LightTranslationEventBox.default.t;
      this._axis = data.a ?? data.axis ?? LightTranslationEventBox.default.a;
      this._flip = data.r ?? data.flip ?? LightTranslationEventBox.default.r;
      this._affectFirst = data.b ?? data.affectFirst ?? LightTranslationEventBox.default.b;
      this._easing = data.i ?? data.easing ?? LightTranslationEventBox.default.i;
      this._events = (
         (data as ILightTranslationEventBox).l ??
         (data.events as ILightTranslationBase[]) ??
         LightTranslationEventBox.default.l
      ).map((obj) => new LightTranslationBase(obj));
      this._customData = deepCopy(data.customData ?? LightTranslationEventBox.default.customData);
   }

   static create(): LightTranslationEventBox[];
   static create(
      ...data: DeepPartial<
         IWrapLightTranslationEventBoxAttribute<
            ILightTranslationEventBox,
            ILightTranslationBase,
            IIndexFilter
         >
      >[]
   ): LightTranslationEventBox[];
   static create(...data: DeepPartial<ILightTranslationEventBox>[]): LightTranslationEventBox[];
   static create(
      ...data: (DeepPartial<ILightTranslationEventBox> &
         DeepPartial<
            IWrapLightTranslationEventBoxAttribute<
               ILightTranslationEventBox,
               ILightTranslationBase,
               IIndexFilter
            >
         >)[]
   ): LightTranslationEventBox[];
   static create(
      ...data: (DeepPartial<ILightTranslationEventBox> &
         DeepPartial<
            IWrapLightTranslationEventBoxAttribute<
               ILightTranslationEventBox,
               ILightTranslationBase,
               IIndexFilter
            >
         >)[]
   ): LightTranslationEventBox[] {
      const result: LightTranslationEventBox[] = [];
      data.forEach((obj) => result.push(new this(obj)));
      if (result.length) {
         return result;
      }
      return [new this()];
   }

   toJSON(): ILightTranslationEventBox {
      return {
         f: this.filter.toJSON(),
         w: this.beatDistribution,
         d: this.beatDistributionType,
         s: this.translationDistribution,
         t: this.translationDistributionType,
         a: this.axis,
         r: this.flip,
         b: this.affectFirst,
         i: this.easing,
         l: this.events.map((l) => l.toJSON()),
         customData: deepCopy(this.customData),
      };
   }

   get filter(): IndexFilter {
      return this._filter as IndexFilter;
   }
   set filter(value: IndexFilter) {
      this._filter = value;
   }

   get events(): LightTranslationBase[] {
      return this._events as LightTranslationBase[];
   }
   set events(value: LightTranslationBase[]) {
      this._events = value;
   }

   get customData(): NonNullable<ILightTranslationEventBox['customData']> {
      return this._customData;
   }
   set customData(value: NonNullable<ILightTranslationEventBox['customData']>) {
      this._customData = value;
   }

   setEvents(value: LightTranslationBase[]): this {
      this.events = value;
      return this;
   }
}
