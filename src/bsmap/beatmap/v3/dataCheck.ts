import type { DataCheck } from '../../types/beatmap/shared/dataCheck.ts';
import type { IBasicEvent } from '../../types/beatmap/v3/basicEvent.ts';
import type { IBasicEventTypesForKeywords } from '../../types/beatmap/v3/basicEventTypesForKeywords.ts';
import type { IBasicEventTypesWithKeywords } from '../../types/beatmap/v3/basicEventTypesWithKeywords.ts';
import type { IBombNote } from '../../types/beatmap/v3/bombNote.ts';
import type { IBPMEvent } from '../../types/beatmap/v3/bpmEvent.ts';
import type { IChain } from '../../types/beatmap/v3/chain.ts';
import type { IColorBoostEvent } from '../../types/beatmap/v3/colorBoostEvent.ts';
import type { IColorNote } from '../../types/beatmap/v3/colorNote.ts';
import type { IDifficulty } from '../../types/beatmap/v3/difficulty.ts';
import type { IIndexFilter } from '../../types/beatmap/v3/indexFilter.ts';
import type { ILightColorBase } from '../../types/beatmap/v3/lightColorBase.ts';
import type { ILightColorEventBox } from '../../types/beatmap/v3/lightColorEventBox.ts';
import type { ILightColorEventBoxGroup } from '../../types/beatmap/v3/lightColorEventBoxGroup.ts';
import type { ILightRotationBase } from '../../types/beatmap/v3/lightRotationBase.ts';
import type { ILightRotationEventBox } from '../../types/beatmap/v3/lightRotationEventBox.ts';
import type { ILightRotationEventBoxGroup } from '../../types/beatmap/v3/lightRotationEventBoxGroup.ts';
import type { ILightTranslationBase } from '../../types/beatmap/v3/lightTranslationBase.ts';
import type { ILightTranslationEventBox } from '../../types/beatmap/v3/lightTranslationEventBox.ts';
import type { ILightTranslationEventBoxGroup } from '../../types/beatmap/v3/lightTranslationEventBoxGroup.ts';
import type { IObstacle } from '../../types/beatmap/v3/obstacle.ts';
import type { IRotationEvent } from '../../types/beatmap/v3/rotationEvent.ts';
import type { IArc } from '../../types/beatmap/v3/arc.ts';
import type { IWaypoint } from '../../types/beatmap/v3/waypoint.ts';

// FIXME: ALMOST EVERYTHING IS HERE IFUCKIN OPTIONAL REE
export const ColorNoteDataCheck: { readonly [key in keyof IColorNote]: DataCheck } = {
   b: {
      type: 'number',
      version: '3.0.0',
   },
   c: {
      type: 'number',
      int: true,
      version: '3.0.0',
   },
   x: {
      type: 'number',
      int: true,
      version: '3.0.0',
   },
   y: {
      type: 'number',
      int: true,
      version: '3.0.0',
   },
   d: {
      type: 'number',
      int: true,
      version: '3.0.0',
   },
   a: {
      type: 'number',
      int: true,
      version: '3.0.0',
   },
   customData: {
      type: 'object',
      version: '3.0.0',
      check: {},
      optional: true,
   },
} as const;

export const BombDataCheck: { readonly [key in keyof IBombNote]: DataCheck } = {
   b: {
      type: 'number',
      version: '3.0.0',
   },
   x: {
      type: 'number',
      int: true,
      version: '3.0.0',
   },
   y: {
      type: 'number',
      int: true,
      version: '3.0.0',
   },
   customData: {
      type: 'object',
      version: '3.0.0',
      check: {},
      optional: true,
   },
} as const;

export const ArcDataCheck: { readonly [key in keyof IArc]: DataCheck } = {
   b: {
      type: 'number',
      version: '3.0.0',
   },
   c: {
      type: 'number',
      int: true,
      version: '3.0.0',
   },
   x: {
      type: 'number',
      int: true,
      version: '3.0.0',
   },
   y: {
      type: 'number',
      int: true,
      version: '3.0.0',
   },
   d: {
      type: 'number',
      int: true,
      version: '3.0.0',
   },
   mu: {
      type: 'number',
      version: '3.0.0',
   },
   tb: {
      type: 'number',
      version: '3.0.0',
   },
   tx: {
      type: 'number',
      int: true,
      version: '3.0.0',
   },
   ty: {
      type: 'number',
      int: true,
      version: '3.0.0',
   },
   tc: {
      type: 'number',
      int: true,
      version: '3.0.0',
   },
   tmu: {
      type: 'number',
      version: '3.0.0',
   },
   m: {
      type: 'number',
      int: true,
      version: '3.0.0',
   },
   customData: {
      type: 'object',
      version: '3.0.0',
      check: {},
      optional: true,
   },
} as const;

export const ChainDataCheck: { readonly [key in keyof IChain]: DataCheck } = {
   b: {
      type: 'number',
      version: '3.0.0',
   },
   c: {
      type: 'number',
      int: true,
      version: '3.0.0',
   },
   x: {
      type: 'number',
      int: true,
      version: '3.0.0',
   },
   y: {
      type: 'number',
      int: true,
      version: '3.0.0',
   },
   d: {
      type: 'number',
      int: true,
      version: '3.0.0',
   },
   tb: {
      type: 'number',
      version: '3.0.0',
   },
   tx: {
      type: 'number',
      int: true,
      version: '3.0.0',
   },
   ty: {
      type: 'number',
      int: true,
      version: '3.0.0',
   },
   sc: {
      type: 'number',
      int: true,
      version: '3.0.0',
   },
   s: {
      type: 'number',
      version: '3.0.0',
   },
   customData: {
      type: 'object',
      version: '3.0.0',
      check: {},
      optional: true,
   },
} as const;

export const ObstacleDataCheck: { readonly [key in keyof IObstacle]: DataCheck } = {
   b: {
      type: 'number',
      version: '3.0.0',
   },
   x: {
      type: 'number',
      int: true,
      version: '3.0.0',
   },
   y: {
      type: 'number',
      int: true,
      version: '3.0.0',
   },
   d: {
      type: 'number',
      version: '3.0.0',
   },
   w: {
      type: 'number',
      int: true,
      version: '3.0.0',
   },
   h: {
      type: 'number',
      int: true,
      version: '3.0.0',
   },
   customData: {
      type: 'object',
      version: '3.0.0',
      check: {},
      optional: true,
   },
} as const;

export const BasicEventDataCheck: { readonly [key in keyof IBasicEvent]: DataCheck } = {
   b: {
      type: 'number',
      version: '3.0.0',
   },
   et: {
      type: 'number',
      int: true,
      version: '3.0.0',
   },
   i: {
      type: 'number',
      int: true,
      version: '3.0.0',
   },
   f: {
      type: 'number',
      version: '3.0.0',
   },
   customData: {
      type: 'object',
      version: '3.0.0',
      check: {},
      optional: true,
   },
} as const;

export const BPMChangeEventDataCheck: { readonly [key in keyof IBPMEvent]: DataCheck } = {
   b: {
      type: 'number',
      version: '3.0.0',
   },
   m: {
      type: 'number',
      version: '3.0.0',
   },
   customData: {
      type: 'object',
      version: '3.0.0',
      check: {},
      optional: true,
   },
} as const;

export const RotationEventDataCheck: {
   readonly [key in keyof IRotationEvent]: DataCheck;
} = {
   b: {
      type: 'number',
      version: '3.0.0',
   },
   e: {
      type: 'number',
      int: true,
      version: '3.0.0',
   },
   r: {
      type: 'number',
      version: '3.0.0',
   },
   customData: {
      type: 'object',
      version: '3.0.0',
      check: {},
      optional: true,
   },
} as const;

export const ColorBoostEventDataCheck: {
   readonly [key in keyof IColorBoostEvent]: DataCheck;
} = {
   b: {
      type: 'number',
      version: '3.0.0',
   },
   o: {
      type: 'boolean',
      version: '3.0.0',
   },
   customData: {
      type: 'object',
      version: '3.0.0',
      check: {},
      optional: true,
   },
} as const;

export const IndexFilterDataCheck: { readonly [key in keyof IIndexFilter]: DataCheck } = {
   f: {
      type: 'number',
      int: true,
      version: '3.0.0',
   },
   p: {
      type: 'number',
      version: '3.0.0',
   },
   t: {
      type: 'number',
      version: '3.0.0',
   },
   r: {
      type: 'number',
      int: true,
      version: '3.0.0',
   },
   c: {
      type: 'number',
      int: true,
      version: '3.1.0',
   },
   l: {
      type: 'number',
      version: '3.1.0',
   },
   d: {
      type: 'number',
      int: true,
      version: '3.1.0',
   },
   n: {
      type: 'number',
      int: true,
      version: '3.1.0',
   },
   s: {
      type: 'number',
      int: true,
      version: '3.1.0',
   },
   customData: {
      type: 'object',
      version: '3.0.0',
      check: {},
      optional: true,
   },
} as const;

export const LightColorBaseDataCheck: {
   readonly [key in keyof ILightColorBase]: DataCheck;
} = {
   b: {
      type: 'number',
      version: '3.0.0',
   },
   i: {
      type: 'number',
      int: true,
      version: '3.0.0',
   },
   c: {
      type: 'number',
      int: true,
      version: '3.0.0',
   },
   s: {
      type: 'number',
      version: '3.0.0',
   },
   f: {
      type: 'number',
      version: '3.0.0',
   },
   customData: {
      type: 'object',
      version: '3.0.0',
      check: {},
      optional: true,
   },
} as const;

export const LightColorEventBoxDataCheck: {
   readonly [key in keyof ILightColorEventBox]: DataCheck;
} = {
   f: {
      type: 'object',
      version: '3.0.0',
      check: IndexFilterDataCheck,
   },
   w: {
      type: 'number',
      version: '3.0.0',
   },
   d: {
      type: 'number',
      int: true,
      version: '3.0.0',
   },
   r: {
      type: 'number',
      version: '3.0.0',
   },
   t: {
      type: 'number',
      int: true,
      version: '3.0.0',
   },
   e: {
      type: 'array',
      version: '3.0.0',
      check: LightColorBaseDataCheck,
   },
   b: {
      type: 'number',
      int: true,
      version: '3.0.0',
   },
   i: {
      type: 'number',
      int: true,
      version: '3.2.0',
   },
   customData: {
      type: 'object',
      version: '3.0.0',
      check: {},
      optional: true,
   },
} as const;

export const LightColorEventBoxGroupDataCheck: {
   readonly [key in keyof ILightColorEventBoxGroup]: DataCheck;
} = {
   b: {
      type: 'number',
      version: '3.0.0',
   },
   g: {
      type: 'number',
      int: true,
      version: '3.0.0',
   },
   e: {
      type: 'array',
      version: '3.0.0',
      check: LightColorEventBoxDataCheck,
   },
   customData: {
      type: 'object',
      version: '3.0.0',
      check: {},
      optional: true,
   },
} as const;

export const LightRotationBaseDataCheck: {
   readonly [key in keyof ILightRotationBase]: DataCheck;
} = {
   b: {
      type: 'number',
      version: '3.0.0',
   },
   p: {
      type: 'number',
      int: true,
      version: '3.0.0',
   },
   e: {
      type: 'number',
      int: true,
      version: '3.0.0',
   },
   l: {
      type: 'number',
      version: '3.0.0',
   },
   r: {
      type: 'number',
      version: '3.0.0',
   },
   o: {
      type: 'number',
      int: true,
      version: '3.0.0',
   },
   customData: {
      type: 'object',
      version: '3.0.0',
      check: {},
      optional: true,
   },
} as const;

export const LightRotationEventBoxDataCheck: {
   readonly [key in keyof ILightRotationEventBox]: DataCheck;
} = {
   f: {
      type: 'object',
      version: '3.0.0',
      check: IndexFilterDataCheck,
   },
   w: {
      type: 'number',
      version: '3.0.0',
   },
   d: {
      type: 'number',
      int: true,
      version: '3.0.0',
   },
   s: {
      type: 'number',
      version: '3.0.0',
   },
   t: {
      type: 'number',
      int: true,
      version: '3.0.0',
   },
   a: {
      type: 'number',
      int: true,
      version: '3.0.0',
   },
   l: {
      type: 'array',
      version: '3.0.0',
      check: LightRotationBaseDataCheck,
   },
   r: {
      type: 'number',
      int: true,
      version: '3.0.0',
   },
   b: {
      type: 'number',
      int: true,
      version: '3.0.0',
   },
   i: {
      type: 'number',
      int: true,
      version: '3.2.0',
   },
   customData: {
      type: 'object',
      version: '3.0.0',
      check: {},
      optional: true,
   },
} as const;

export const LightRotationEventBoxGroupDataCheck: {
   readonly [key in keyof ILightRotationEventBoxGroup]: DataCheck;
} = {
   b: {
      type: 'number',
      version: '3.0.0',
   },
   g: {
      type: 'number',
      int: true,
      version: '3.0.0',
   },
   e: {
      type: 'array',
      version: '3.0.0',
      check: LightRotationEventBoxDataCheck,
   },
   customData: {
      type: 'object',
      version: '3.0.0',
      check: {},
      optional: true,
   },
} as const;

export const LightTranslationBaseDataCheck: {
   readonly [key in keyof ILightTranslationBase]: DataCheck;
} = {
   b: {
      type: 'number',
      version: '3.2.0',
   },
   p: {
      type: 'number',
      int: true,
      version: '3.2.0',
   },
   e: {
      type: 'number',
      int: true,
      version: '3.2.0',
   },
   t: {
      type: 'number',
      version: '3.2.0',
   },
   customData: {
      type: 'object',
      version: '3.0.0',
      check: {},
      optional: true,
   },
} as const;

export const LightTranslationEventBoxDataCheck: {
   readonly [key in keyof ILightTranslationEventBox]: DataCheck;
} = {
   f: {
      type: 'object',
      version: '3.2.0',
      check: IndexFilterDataCheck,
   },
   w: {
      type: 'number',
      version: '3.2.0',
   },
   d: {
      type: 'number',
      int: true,
      version: '3.2.0',
   },
   s: {
      type: 'number',
      version: '3.2.0',
   },
   t: {
      type: 'number',
      int: true,
      version: '3.2.0',
   },
   a: {
      type: 'number',
      int: true,
      version: '3.2.0',
   },
   l: {
      type: 'array',
      version: '3.2.0',
      check: LightTranslationBaseDataCheck,
   },
   r: {
      type: 'number',
      int: true,
      version: '3.2.0',
   },
   b: {
      type: 'number',
      int: true,
      version: '3.2.0',
   },
   i: {
      type: 'number',
      int: true,
      version: '3.2.0',
   },
   customData: {
      type: 'object',
      version: '3.0.0',
      check: {},
      optional: true,
   },
} as const;

export const LightTranslationEventBoxGroupDataCheck: {
   readonly [key in keyof ILightTranslationEventBoxGroup]: DataCheck;
} = {
   b: {
      type: 'number',
      version: '3.2.0',
   },
   g: {
      type: 'number',
      int: true,
      version: '3.2.0',
   },
   e: {
      type: 'array',
      version: '3.2.0',
      check: LightTranslationEventBoxDataCheck,
   },
   customData: {
      type: 'object',
      version: '3.2.0',
      check: {},
      optional: true,
   },
} as const;

export const BasicEventTypesForKeywordsDataCheck: {
   readonly [key in keyof IBasicEventTypesForKeywords]: DataCheck;
} = {
   k: {
      type: 'string',
      version: '3.0.0',
   },
   e: {
      type: 'number',
      int: true,
      array: true,
      version: '3.0.0',
   },
} as const;

export const BasicEventTypesWithKeywordsDataCheck: {
   readonly [key in keyof IBasicEventTypesWithKeywords]: DataCheck;
} = {
   d: {
      type: 'array',
      version: '3.0.0',
      check: BasicEventTypesForKeywordsDataCheck,
      optional: true,
   },
} as const;

export const WaypointDataCheck: { readonly [key in keyof IWaypoint]: DataCheck } = {
   b: {
      type: 'number',
      version: '3.0.0',
   },
   d: {
      type: 'number',
      int: true,
      version: '3.0.0',
   },
   x: {
      type: 'number',
      int: true,
      version: '3.0.0',
   },
   y: {
      type: 'number',
      int: true,
      version: '3.0.0',
   },
   customData: {
      type: 'object',
      version: '3.0.0',
      check: {},
      optional: true,
   },
} as const;

export const DifficultyCheck: { readonly [key in keyof IDifficulty]: DataCheck } = {
   version: {
      type: 'string',
      version: '3.0.0',
   },
   bpmEvents: {
      type: 'array',
      version: '3.0.0',
      check: BPMChangeEventDataCheck,
      optional: true,
   },
   rotationEvents: {
      type: 'array',
      version: '3.0.0',
      check: RotationEventDataCheck,
      optional: true,
   },
   colorNotes: {
      type: 'array',
      version: '3.0.0',
      check: ColorNoteDataCheck,
      optional: true,
   },
   bombNotes: {
      type: 'array',
      version: '3.0.0',
      check: BombDataCheck,
      optional: true,
   },
   obstacles: {
      type: 'array',
      version: '3.0.0',
      check: ObstacleDataCheck,
      optional: true,
   },
   sliders: {
      type: 'array',
      version: '3.0.0',
      check: ArcDataCheck,
      optional: true,
   },
   burstSliders: {
      type: 'array',
      version: '3.0.0',
      check: ChainDataCheck,
      optional: true,
   },
   waypoints: {
      type: 'array',
      version: '3.0.0',
      check: WaypointDataCheck,
      optional: true,
   },
   basicBeatmapEvents: {
      type: 'array',
      version: '3.0.0',
      check: BasicEventDataCheck,
      optional: true,
   },
   colorBoostBeatmapEvents: {
      type: 'array',
      version: '3.0.0',
      check: ColorBoostEventDataCheck,
      optional: true,
   },
   lightColorEventBoxGroups: {
      type: 'array',
      version: '3.0.0',
      check: LightColorEventBoxGroupDataCheck,
      optional: true,
   },
   lightRotationEventBoxGroups: {
      type: 'array',
      version: '3.0.0',
      check: LightRotationEventBoxGroupDataCheck,
      optional: true,
   },
   lightTranslationEventBoxGroups: {
      type: 'array',
      version: '3.2.0',
      check: LightTranslationEventBoxGroupDataCheck,
      optional: true,
   },
   basicEventTypesWithKeywords: {
      type: 'object',
      version: '3.0.0',
      check: BasicEventTypesWithKeywordsDataCheck,
   },
   useNormalEventsAsCompatibleEvents: {
      type: 'boolean',
      version: '3.0.0',
      optional: true,
   },
   customData: {
      type: 'object',
      version: '3.0.0',
      check: {},
      optional: true,
   },
} as const;