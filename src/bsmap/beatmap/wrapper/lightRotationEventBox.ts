import { IWrapLightRotationBase } from '../../types/beatmap/wrapper/lightRotationBase';
import { IWrapLightRotationEventBox } from '../../types/beatmap/wrapper/lightRotationEventBox';
import { WrapEventBox } from './eventBox';

/** Light rotation event box beatmap class object. */
export abstract class WrapLightRotationEventBox<
      TBox extends { [P in keyof TBox]: TBox[P] },
      TBase extends { [P in keyof TBase]: TBase[P] },
      TFilter extends { [P in keyof TFilter]: TFilter[P] },
   >
   extends WrapEventBox<TBox, TBase, TFilter>
   implements IWrapLightRotationEventBox<TBox, TBase, TFilter>
{
   protected _rotationDistribution!: IWrapLightRotationEventBox['rotationDistribution'];
   protected _rotationDistributionType!: IWrapLightRotationEventBox['rotationDistributionType'];
   protected _axis!: IWrapLightRotationEventBox['axis'];
   protected _flip!: IWrapLightRotationEventBox['flip'];
   protected _affectFirst!: IWrapLightRotationEventBox['affectFirst'];
   protected declare _events: IWrapLightRotationBase<TBase>[];

   get rotationDistribution(): IWrapLightRotationEventBox['rotationDistribution'] {
      return this._rotationDistribution;
   }
   set rotationDistribution(value: IWrapLightRotationEventBox['rotationDistribution']) {
      this._rotationDistribution = value;
   }
   get rotationDistributionType(): IWrapLightRotationEventBox['rotationDistributionType'] {
      return this._rotationDistributionType;
   }
   set rotationDistributionType(value: IWrapLightRotationEventBox['rotationDistributionType']) {
      this._rotationDistributionType = value;
   }
   get axis(): IWrapLightRotationEventBox['axis'] {
      return this._axis;
   }
   set axis(value: IWrapLightRotationEventBox['axis']) {
      this._axis = value;
   }
   get flip(): IWrapLightRotationEventBox['flip'] {
      return this._flip;
   }
   set flip(value: IWrapLightRotationEventBox['flip']) {
      this._flip = value;
   }
   get affectFirst(): IWrapLightRotationEventBox['affectFirst'] {
      return this._affectFirst;
   }
   set affectFirst(value: IWrapLightRotationEventBox['affectFirst']) {
      this._affectFirst = value;
   }
   get events(): IWrapLightRotationBase<TBase>[] {
      return this._events;
   }
   set events(value: IWrapLightRotationBase<TBase>[]) {
      this._events = value;
   }

   setRotationDistribution(value: IWrapLightRotationEventBox['rotationDistribution']) {
      this.rotationDistribution = value;
      return this;
   }
   setRotationDistributionType(value: IWrapLightRotationEventBox['rotationDistributionType']) {
      this.rotationDistributionType = value;
      return this;
   }
   setAxis(value: IWrapLightRotationEventBox['axis']) {
      this.axis = value;
      return this;
   }
   setFlip(value: IWrapLightRotationEventBox['flip']) {
      this.flip = value;
      return this;
   }
   setAffectFirst(value: IWrapLightRotationEventBox['affectFirst']) {
      this.affectFirst = value;
      return this;
   }

   isValid(): boolean {
      return (
         super.isValid() &&
         (this.rotationDistributionType === 1 || this.rotationDistributionType === 2) &&
         (this.axis === 0 || this.axis === 1) &&
         (this.flip === 0 || this.flip === 1) &&
         (this.affectFirst === 0 || this.affectFirst === 1)
      );
   }
}
