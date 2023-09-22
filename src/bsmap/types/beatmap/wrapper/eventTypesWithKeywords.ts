// deno-lint-ignore-file no-explicit-any
import type { ISerializable } from '../shared/serializable.ts';
import {
   IWrapEventTypesForKeywords,
   IWrapEventTypesForKeywordsAttribute,
} from './eventTypesForKeywords.ts';

export interface IWrapEventTypesWithKeywordsAttribute<
   T extends { [P in keyof T]: T[P] } = Record<string, any>,
> {
   /** Data list of event types with keywords. */
   list: IWrapEventTypesForKeywordsAttribute[];
}

export interface IWrapEventTypesWithKeywords<
   T extends { [P in keyof T]: T[P] } = Record<string, any>,
> extends ISerializable<T>,
      IWrapEventTypesWithKeywordsAttribute<T> {
   list: IWrapEventTypesForKeywords[];

   setData(value: IWrapEventTypesForKeywords[]): this;
   addData(value: IWrapEventTypesForKeywords): this;
   removeData(value: string): this;
}
