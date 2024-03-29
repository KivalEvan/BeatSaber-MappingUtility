// deno-lint-ignore-file no-explicit-any
import type { IWrapBaseObject, IWrapBaseObjectAttribute } from './baseObject.ts';

export interface IWrapLightTranslationBaseAttribute<
   T extends { [P in keyof T]: T[P] } = Record<string, any>,
> extends IWrapBaseObjectAttribute<T> {
   /** Relative beat time `<float>` to event box group. */
   time: number;
   /**
    * Ease type `<int>` of light translation.
    * ```ts
    * -1 -> Step
    * 0 -> Linear
    * 1 -> EaseInQuad
    * 2 -> EaseOutQuad
    * 3 -> EaseInOutQuad
    * ```
    */
   easing: -1 | 0 | 1 | 2 | 3;
   /** Use previous event translation value `<int>` in light translation. */
   previous: 0 | 1;
   /** Translation value `<float>` of light translation. */
   translation: number;
}

export interface IWrapLightTranslationBase<T extends { [P in keyof T]: T[P] } = Record<string, any>>
   extends IWrapBaseObject<T>,
      IWrapLightTranslationBaseAttribute<T> {
   setPrevious(value: 0 | 1): this;
   setEasing(value: -1 | 0 | 1 | 2 | 3): this;
   setTranslation(value: number): this;
}
