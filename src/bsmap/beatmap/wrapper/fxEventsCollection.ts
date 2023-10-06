import type { IWrapFxEventFloat } from '../../types/beatmap/wrapper/fxEventFloat.ts';
import type { IWrapFxEventInt } from '../../types/beatmap/wrapper/fxEventInt.ts';
import type { IWrapFxEventsCollection } from '../../types/beatmap/wrapper/fxEventsCollection.ts';
import { WrapBaseItem } from './baseItem.ts';

/** FX events collection beatmap class object. */
export abstract class WrapFxEventsCollection<
      T extends { [P in keyof T]: T[P] },
      TFloat extends { [P in keyof TFloat]: TFloat[P] },
      TInt extends { [P in keyof TInt]: TInt[P] },
   >
   extends WrapBaseItem<T>
   implements IWrapFxEventsCollection<T>
{
   protected _floatList!: IWrapFxEventFloat<TFloat>[];
   protected _intList!: IWrapFxEventInt<TInt>[];

   get floatList(): IWrapFxEventFloat<TFloat>[] {
      return this._floatList;
   }
   set floatList(value: IWrapFxEventFloat<TFloat>[]) {
      this._floatList = value;
   }

   get intList(): IWrapFxEventInt<TInt>[] {
      return this._intList;
   }
   set intList(value: IWrapFxEventInt<TInt>[]) {
      this._intList = value;
   }
}
