import type { ILightTranslationEventBoxGroup } from '../../types/beatmap/v3/lightTranslationEventBoxGroup.ts';
import type { DeepPartial } from '../../types/utils.ts';
import { LightTranslationEventBox } from './lightTranslationEventBox.ts';
import { WrapLightTranslationEventBoxGroup } from '../wrapper/lightTranslationEventBoxGroup.ts';
import { deepCopy } from '../../utils/misc.ts';
import type { ILightTranslationEventBox } from '../../types/beatmap/v3/lightTranslationEventBox.ts';
import type { IIndexFilter } from '../../types/beatmap/v3/indexFilter.ts';
import type { ILightTranslationBase } from '../../types/beatmap/v3/lightTranslationBase.ts';
import type { IWrapLightTranslationEventBoxGroupAttribute } from '../../types/beatmap/wrapper/lightTranslationEventBoxGroup.ts';

/** Light translation event box group beatmap v3 class object. */
export class LightTranslationEventBoxGroup extends WrapLightTranslationEventBoxGroup<
   ILightTranslationEventBoxGroup,
   ILightTranslationEventBox,
   ILightTranslationBase,
   IIndexFilter
> {
   static default: Required<ILightTranslationEventBoxGroup> = {
      b: 0,
      g: 0,
      e: [],
      customData: {},
   };

   constructor();
   constructor(
      data: DeepPartial<
         IWrapLightTranslationEventBoxGroupAttribute<
            ILightTranslationEventBoxGroup,
            ILightTranslationEventBox,
            ILightTranslationBase,
            IIndexFilter
         >
      >,
   );
   constructor(data: DeepPartial<ILightTranslationEventBoxGroup>);
   constructor(
      data: DeepPartial<ILightTranslationEventBoxGroup> &
         DeepPartial<
            IWrapLightTranslationEventBoxGroupAttribute<
               ILightTranslationEventBoxGroup,
               ILightTranslationEventBox,
               ILightTranslationBase,
               IIndexFilter
            >
         >,
   );
   constructor(
      data: DeepPartial<ILightTranslationEventBoxGroup> &
         DeepPartial<
            IWrapLightTranslationEventBoxGroupAttribute<
               ILightTranslationEventBoxGroup,
               ILightTranslationEventBox,
               ILightTranslationBase,
               IIndexFilter
            >
         > = {},
   ) {
      super();

      this._time = data.b ?? data.time ?? LightTranslationEventBoxGroup.default.b;
      this._id = data.g ?? data.id ?? LightTranslationEventBoxGroup.default.g;
      this._boxes = (
         (data.e as unknown as ILightTranslationEventBox[]) ??
         (data.boxes as ILightTranslationEventBox[]) ??
         LightTranslationEventBoxGroup.default.e
      ).map((obj) => new LightTranslationEventBox(obj));
      this._customData = deepCopy(
         data.customData ?? LightTranslationEventBoxGroup.default.customData,
      );
   }

   static create(): LightTranslationEventBoxGroup[];
   static create(
      ...data: DeepPartial<
         IWrapLightTranslationEventBoxGroupAttribute<
            ILightTranslationEventBoxGroup,
            ILightTranslationEventBox,
            ILightTranslationBase,
            IIndexFilter
         >
      >[]
   ): LightTranslationEventBoxGroup[];
   static create(
      ...data: DeepPartial<ILightTranslationEventBoxGroup>[]
   ): LightTranslationEventBoxGroup[];
   static create(
      ...data: (DeepPartial<ILightTranslationEventBoxGroup> &
         DeepPartial<
            IWrapLightTranslationEventBoxGroupAttribute<
               ILightTranslationEventBoxGroup,
               ILightTranslationEventBox,
               ILightTranslationBase,
               IIndexFilter
            >
         >)[]
   ): LightTranslationEventBoxGroup[];
   static create(
      ...data: (DeepPartial<ILightTranslationEventBoxGroup> &
         DeepPartial<
            IWrapLightTranslationEventBoxGroupAttribute<
               ILightTranslationEventBoxGroup,
               ILightTranslationEventBox,
               ILightTranslationBase,
               IIndexFilter
            >
         >)[]
   ): LightTranslationEventBoxGroup[] {
      const result: LightTranslationEventBoxGroup[] = [];
      data.forEach((obj) => result.push(new this(obj)));
      if (result.length) {
         return result;
      }
      return [new this()];
   }

   toJSON(): ILightTranslationEventBoxGroup {
      return {
         b: this.time,
         g: this.id,
         e: this.boxes.map((e) => e.toJSON()),
         customData: deepCopy(this.customData),
      };
   }

   get boxes(): LightTranslationEventBox[] {
      return this._boxes as LightTranslationEventBox[];
   }
   set boxes(value: LightTranslationEventBox[]) {
      this._boxes = value;
   }

   get customData(): NonNullable<ILightTranslationEventBoxGroup['customData']> {
      return this._customData;
   }
   set customData(value: NonNullable<ILightTranslationEventBoxGroup['customData']>) {
      this._customData = value;
   }

   setCustomData(value: NonNullable<ILightTranslationEventBoxGroup['customData']>): this {
      this.customData = value;
      return this;
   }
   addCustomData(object: ILightTranslationEventBoxGroup['customData']): this {
      this.customData = { ...this.customData, object };
      return this;
   }

   isValid(): boolean {
      return this.id >= 0;
   }
}
