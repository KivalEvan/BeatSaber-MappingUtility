import type { IBasicEventTypesForKeywords } from '../../types/beatmap/v3/basicEventTypesForKeywords.ts';
import type { IWrapEventTypesForKeywordsAttribute } from '../../types/beatmap/wrapper/eventTypesForKeywords.ts';
import type { DeepPartial } from '../../types/utils.ts';
import { WrapEventTypesForKeywords } from '../wrapper/eventTypesForKeywords.ts';

/**
 * Basic event types for keywords beatmap v3 class object.
 *
 * Used in basic event types with keywords.
 */
export class BasicEventTypesForKeywords extends WrapEventTypesForKeywords<IBasicEventTypesForKeywords> {
   static default: Required<IBasicEventTypesForKeywords> = {
      k: '',
      e: [],
   };

   constructor();
   constructor(data: DeepPartial<IWrapEventTypesForKeywordsAttribute<IBasicEventTypesForKeywords>>);
   constructor(
      data: DeepPartial<IBasicEventTypesForKeywords> &
         DeepPartial<IWrapEventTypesForKeywordsAttribute<IBasicEventTypesForKeywords>>,
   );
   constructor(
      data: DeepPartial<IBasicEventTypesForKeywords> &
         DeepPartial<IWrapEventTypesForKeywordsAttribute<IBasicEventTypesForKeywords>> = {},
   ) {
      super();

      this._keyword = data.k ?? data.keyword ?? BasicEventTypesForKeywords.default.k;
      this._events = (data.e ?? data.events ?? BasicEventTypesForKeywords.default.e).filter(
         (n) => typeof n === 'number',
      ) as number[];
   }

   static create(): BasicEventTypesForKeywords[];
   static create(
      ...data: Partial<IWrapEventTypesForKeywordsAttribute<IBasicEventTypesForKeywords>>[]
   ): BasicEventTypesForKeywords[];
   static create(
      ...data: (Partial<IBasicEventTypesForKeywords> &
         Partial<IWrapEventTypesForKeywordsAttribute<IBasicEventTypesForKeywords>>)[]
   ): BasicEventTypesForKeywords[];
   static create(
      ...data: (Partial<IBasicEventTypesForKeywords> &
         Partial<IWrapEventTypesForKeywordsAttribute<IBasicEventTypesForKeywords>>)[]
   ): BasicEventTypesForKeywords[] {
      const result: BasicEventTypesForKeywords[] = [];
      data.forEach((obj) => result.push(new this(obj)));
      if (result.length) {
         return result;
      }
      return [new this()];
   }

   toJSON(): IBasicEventTypesForKeywords {
      return {
         k: this.keyword,
         e: this.events,
      };
   }
}
