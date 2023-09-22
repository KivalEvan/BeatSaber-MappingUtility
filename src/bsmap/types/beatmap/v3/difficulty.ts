import type { IBPMEvent } from './bpmEvent.ts';
import type { IRotationEvent } from './rotationEvent.ts';
import type { IColorNote } from './colorNote.ts';
import type { IBombNote } from './bombNote.ts';
import type { IObstacle } from './obstacle.ts';
import type { IArc } from './arc.ts';
import type { IChain } from './chain.ts';
import type { IWaypoint } from './waypoint.ts';
import type { IBasicEvent } from './basicEvent.ts';
import type { IColorBoostEvent } from './colorBoostEvent.ts';
import type { ILightColorEventBoxGroup } from './lightColorEventBoxGroup.ts';
import type { ILightRotationEventBoxGroup } from './lightRotationEventBoxGroup.ts';
import type { IBasicEventTypesWithKeywords } from './basicEventTypesWithKeywords.ts';
import type { ILightTranslationEventBoxGroup } from './lightTranslationEventBoxGroup.ts';
import type { ICustomDataDifficulty } from './custom/difficulty.ts';
import type { IBaseItem } from './baseItem.ts';

export interface IDifficulty extends IBaseItem {
   version: `3.${0 | 1 | 2}.0`;
   bpmEvents: IBPMEvent[];
   rotationEvents: IRotationEvent[];
   colorNotes: IColorNote[];
   bombNotes: IBombNote[];
   obstacles: IObstacle[];
   sliders: IArc[];
   burstSliders: IChain[];
   waypoints: IWaypoint[];
   basicBeatmapEvents: IBasicEvent[];
   colorBoostBeatmapEvents: IColorBoostEvent[];
   lightColorEventBoxGroups: ILightColorEventBoxGroup[];
   lightRotationEventBoxGroups: ILightRotationEventBoxGroup[];
   lightTranslationEventBoxGroups: ILightTranslationEventBoxGroup[];
   basicEventTypesWithKeywords: IBasicEventTypesWithKeywords;
   useNormalEventsAsCompatibleEvents: boolean;
   customData?: ICustomDataDifficulty;
}