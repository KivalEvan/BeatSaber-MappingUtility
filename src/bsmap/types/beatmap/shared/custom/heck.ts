import { Easings } from '../../../easings';
import { Vector3, Vector4 } from '../../../vector';
export type FloatPointDefinition = [
   percent: number,
   time: number,
   ...options: (Easings | PointFlag | PointModifier)[],
];
export type Vector3PointDefinition = [
   ...vector3: Vector3,
   time: number,
   ...options: (Easings | PointFlag | PointModifier)[],
];
export type Vector4PointDefinition = [
   ...vector4: Vector4,
   time: number,
   ...options: ('lerpHSV' | Easings | PointFlag | PointModifier)[],
];

export interface IInfoSettingsCustomData {
   _settings?: {
      [key: string]: { [key: string]: boolean | string | number | undefined } | undefined;
   };
}

export type PointModifier = `op${'None' | 'Add' | 'Sub' | 'Mul' | 'Div'}`;
export type PointFlag = 'splineCatmullRom';

/** Heck interface for difficulty info custom data.
 * Honestly, just look at heck wiki for this, it's too many.
 */
export interface IHeckInfoCustomData extends IInfoSettingsCustomData {
   _settings?: {
      _playerOptions?: {
         _leftHanded?: boolean;
         _playerHeight?: number;
         _automaticPlayerHeight?: boolean;
         _sfxVolume?: number;
         _reduceDebris?: boolean;
         _noTextsAndHuds?: boolean;
         _noFailEffects?: boolean;
         _advancedHud?: boolean;
         _autoRestart?: boolean;
         _saberTrailIntensity?: number;
         _noteJumpDurationTypeSettings?: 'Dynamic' | 'Static';
         _noteJumpFixedDuration?: number;
         _noteJumpStartBeatOffset?: number;
         _hideNoteSpawnEffect?: boolean;
         _adaptiveSfx?: number;
         _environmentEffectsFilterDefaultPreset?: 'AllEffects' | 'Strobefilter' | 'NoEffects';
         _environmentEffectsFilterExpertPlusPreset?: 'AllEffects' | 'Strobefilter' | 'NoEffects';
      };
      _modifiers?: {
         _energyType?: 'Bar' | 'Battery';
         _noFailOn0Energy?: boolean;
         _instaFail?: boolean;
         _failOnSaberClash?: boolean;
         _enabledObstacleType?: 'All' | 'FullHeightOnly' | 'NoObstacles';
         _fastNotes?: boolean;
         _strictAngles?: boolean;
         _disappearingArrows?: boolean;
         _ghostNotes?: boolean;
         _noBombs?: boolean;
         _songSpeed?: 'Normal' | 'Faster' | 'Slower' | 'SuperFast';
         _noArrows?: boolean;
         _proMode?: boolean;
         _zenMode?: boolean;
         _smallCubes?: boolean;
      };

      _environments?: {
         _overrideEnvironments?: boolean;
      };
      _colors?: {
         _overrideDefaultColors?: boolean;
      };
      _graphics?: {
         _mirrorGraphicsSettings?: 0 | 1 | 2 | 3;
         _mainEffectGraphicsSettings?: 0 | 1;
         _smokeGraphicsSettings?: 0 | 1;
         _burnMarkTrailsEnabled?: boolean;
         _screenDisplacementEffectsEnabled?: boolean;
         _maxShockwaveParticles?: 0 | 1 | 2;
      };
   };
}
