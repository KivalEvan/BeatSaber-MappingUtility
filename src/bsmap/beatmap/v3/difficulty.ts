import type { IDifficulty } from '../../types/beatmap/v3/difficulty.ts';
import { BasicEvent } from './basicEvent.ts';
import { BasicEventTypesWithKeywords } from './basicEventTypesWithKeywords.ts';
import { BombNote } from './bombNote.ts';
import { BPMEvent } from './bpmEvent.ts';
import { Chain } from './chain.ts';
import { ColorBoostEvent } from './colorBoostEvent.ts';
import { ColorNote } from './colorNote.ts';
import { LightColorEventBoxGroup } from './lightColorEventBoxGroup.ts';
import { LightRotationEventBoxGroup } from './lightRotationEventBoxGroup.ts';
import { LightTranslationEventBoxGroup } from './lightTranslationEventBoxGroup.ts';
import { Obstacle } from './obstacle.ts';
import { RotationEvent } from './rotationEvent.ts';
import { Arc } from './arc.ts';
import { Waypoint } from './waypoint.ts';
import type { DeepPartial } from '../../types/utils.ts';
import type { IBPMEvent } from '../../types/beatmap/v3/bpmEvent.ts';
import type { IRotationEvent } from '../../types/beatmap/v3/rotationEvent.ts';
import type { IColorNote } from '../../types/beatmap/v3/colorNote.ts';
import type { IBombNote } from '../../types/beatmap/v3/bombNote.ts';
import type { IObstacle } from '../../types/beatmap/v3/obstacle.ts';
import type { IArc } from '../../types/beatmap/v3/arc.ts';
import type { IChain } from '../../types/beatmap/v3/chain.ts';
import type { IWaypoint } from '../../types/beatmap/v3/waypoint.ts';
import type { IBasicEvent } from '../../types/beatmap/v3/basicEvent.ts';
import type { IColorBoostEvent } from '../../types/beatmap/v3/colorBoostEvent.ts';
import type { ILightRotationEventBoxGroup } from '../../types/beatmap/v3/lightRotationEventBoxGroup.ts';
import type { ILightColorEventBoxGroup } from '../../types/beatmap/v3/lightColorEventBoxGroup.ts';
import type { ILightTranslationEventBoxGroup } from '../../types/beatmap/v3/lightTranslationEventBoxGroup.ts';
import { deepCopy } from '../../utils/misc.ts';
import { WrapDifficulty } from '../wrapper/difficulty.ts';
import type { IWrapBPMEventAttribute } from '../../types/beatmap/wrapper/bpmEvent.ts';
import type { IWrapLightTranslationEventBoxGroupAttribute } from '../../types/beatmap/wrapper/lightTranslationEventBoxGroup.ts';
import type { IWrapBombNoteAttribute } from '../../types/beatmap/wrapper/bombNote.ts';
import type { IWrapChainAttribute } from '../../types/beatmap/wrapper/chain.ts';
import type { IWrapColorBoostEventAttribute } from '../../types/beatmap/wrapper/colorBoostEvent.ts';
import type { IWrapColorNoteAttribute } from '../../types/beatmap/wrapper/colorNote.ts';
import type { IWrapEventAttribute } from '../../types/beatmap/wrapper/event.ts';
import type { IWrapLightColorEventBoxGroupAttribute } from '../../types/beatmap/wrapper/lightColorEventBoxGroup.ts';
import type { IWrapLightRotationEventBoxGroupAttribute } from '../../types/beatmap/wrapper/lightRotationEventBoxGroup.ts';
import type { IWrapObstacleAttribute } from '../../types/beatmap/wrapper/obstacle.ts';
import type { IWrapRotationEventAttribute } from '../../types/beatmap/wrapper/rotationEvent.ts';
import type { IWrapArcAttribute } from '../../types/beatmap/wrapper/arc.ts';
import type { IWrapWaypointAttribute } from '../../types/beatmap/wrapper/waypoint.ts';
import type { IIndexFilter } from '../../types/beatmap/v3/indexFilter.ts';
import type { ILightColorEventBox } from '../../types/beatmap/v3/lightColorEventBox.ts';
import type { ILightRotationEventBox } from '../../types/beatmap/v3/lightRotationEventBox.ts';
import type { ILightTranslationEventBox } from '../../types/beatmap/v3/lightTranslationEventBox.ts';
import type { ILightColorBase } from '../../types/beatmap/v3/lightColorBase.ts';
import type { ILightRotationBase } from '../../types/beatmap/v3/lightRotationBase.ts';
import type { ILightTranslationBase } from '../../types/beatmap/v3/lightTranslationBase.ts';

/** Difficulty beatmap v3 class object. */
export class Difficulty extends WrapDifficulty<IDifficulty> {
   version: `3.${0 | 1 | 2}.0`;
   bpmEvents: BPMEvent[];
   rotationEvents: RotationEvent[];
   colorNotes: ColorNote[];
   bombNotes: BombNote[];
   obstacles: Obstacle[];
   arcs: Arc[];
   chains: Chain[];
   waypoints: Waypoint[];
   basicEvents: BasicEvent[];
   colorBoostEvents: ColorBoostEvent[];
   lightColorEventBoxGroups: LightColorEventBoxGroup[];
   lightRotationEventBoxGroups: LightRotationEventBoxGroup[];
   lightTranslationEventBoxGroups: LightTranslationEventBoxGroup[];
   eventTypesWithKeywords: BasicEventTypesWithKeywords;
   useNormalEventsAsCompatibleEvents;

   constructor(data: Partial<IDifficulty> = {}) {
      super();

      this.version = '3.2.0';
      this.bpmEvents = (data.bpmEvents ?? []).map((obj) => new BPMEvent(obj));
      this.rotationEvents = (data.rotationEvents ?? []).map((obj) => new RotationEvent(obj));
      this.colorNotes = (data.colorNotes ?? []).map((obj) => new ColorNote(obj));
      this.bombNotes = (data.bombNotes ?? []).map((obj) => new BombNote(obj));
      this.obstacles = (data.obstacles ?? []).map((obj) => new Obstacle(obj));
      this.arcs = (data.sliders ?? []).map((obj) => new Arc(obj));
      this.chains = (data.burstSliders ?? []).map((obj) => new Chain(obj));
      this.waypoints = (data.waypoints ?? []).map((obj) => new Waypoint(obj));
      this.basicEvents = (data.basicBeatmapEvents ?? []).map((obj) => new BasicEvent(obj));
      this.colorBoostEvents = (data.colorBoostBeatmapEvents ?? []).map(
         (obj) => new ColorBoostEvent(obj),
      );
      this.lightColorEventBoxGroups = (data.lightColorEventBoxGroups ?? []).map(
         (obj) => new LightColorEventBoxGroup(obj),
      );
      this.lightRotationEventBoxGroups = (data.lightRotationEventBoxGroups ?? []).map(
         (obj) => new LightRotationEventBoxGroup(obj),
      );
      this.lightTranslationEventBoxGroups = (data.lightTranslationEventBoxGroups ?? []).map(
         (obj) => new LightTranslationEventBoxGroup(obj),
      );
      this.eventTypesWithKeywords = new BasicEventTypesWithKeywords(
         data.basicEventTypesWithKeywords ?? {
            d: [],
         },
      );
      this.useNormalEventsAsCompatibleEvents = data.useNormalEventsAsCompatibleEvents ?? false;
      this.customData = deepCopy(data.customData ?? {});
   }

   static create(data: Partial<IDifficulty> = {}): Difficulty {
      return new this(data);
   }

   toJSON(): IDifficulty {
      return {
         version: '3.2.0',
         bpmEvents: this.bpmEvents.map((obj) => obj.toJSON()),
         rotationEvents: this.rotationEvents.map((obj) => obj.toJSON()),
         colorNotes: this.colorNotes.map((obj) => obj.toJSON()),
         bombNotes: this.bombNotes.map((obj) => obj.toJSON()),
         obstacles: this.obstacles.map((obj) => obj.toJSON()),
         sliders: this.arcs.map((obj) => obj.toJSON()),
         burstSliders: this.chains.map((obj) => obj.toJSON()),
         waypoints: this.waypoints.map((obj) => obj.toJSON()),
         basicBeatmapEvents: this.basicEvents.map((obj) => obj.toJSON()),
         colorBoostBeatmapEvents: this.colorBoostEvents.map((obj) => obj.toJSON()),
         lightColorEventBoxGroups: this.lightColorEventBoxGroups.map((obj) => obj.toJSON()),
         lightRotationEventBoxGroups: this.lightRotationEventBoxGroups.map((obj) => obj.toJSON()),
         lightTranslationEventBoxGroups: this.lightTranslationEventBoxGroups.map((obj) =>
            obj.toJSON(),
         ),
         basicEventTypesWithKeywords: this.eventTypesWithKeywords.toJSON(),
         useNormalEventsAsCompatibleEvents: this.useNormalEventsAsCompatibleEvents,
         customData: deepCopy(this.customData),
      };
   }

   get customData(): NonNullable<IDifficulty['customData']> {
      return this._customData;
   }
   set customData(value: NonNullable<IDifficulty['customData']>) {
      this._customData = value;
   }

   reparse(keepRef?: boolean): void {
      this.colorNotes = this.colorNotes.map((obj) => this.createOrKeep(ColorNote, obj, keepRef));
      this.bombNotes = this.bombNotes.map((obj) => this.createOrKeep(BombNote, obj, keepRef));
      this.arcs = this.arcs.map((obj) => this.createOrKeep(Arc, obj, keepRef));
      this.chains = this.chains.map((obj) => this.createOrKeep(Chain, obj, keepRef));
      this.obstacles = this.obstacles.map((obj) => this.createOrKeep(Obstacle, obj, keepRef));
      this.basicEvents = this.basicEvents.map((obj) => this.createOrKeep(BasicEvent, obj, keepRef));
      this.colorBoostEvents = this.colorBoostEvents.map((obj) =>
         this.createOrKeep(ColorBoostEvent, obj, keepRef),
      );
      this.rotationEvents = this.rotationEvents.map((obj) =>
         this.createOrKeep(RotationEvent, obj, keepRef),
      );
      this.bpmEvents = this.bpmEvents.map((obj) => this.createOrKeep(BPMEvent, obj, keepRef));
      this.waypoints = this.waypoints.map((obj) => this.createOrKeep(Waypoint, obj, keepRef));
      this.eventTypesWithKeywords = new BasicEventTypesWithKeywords(this.eventTypesWithKeywords);
   }

   addBpmEvents(...data: Partial<IWrapBPMEventAttribute<IBPMEvent>>[]): void;
   addBpmEvents(...data: Partial<IBPMEvent>[]): void;
   addBpmEvents(...data: (Partial<IBPMEvent> & Partial<IWrapBPMEventAttribute<IBPMEvent>>)[]): void;
   addBpmEvents(
      ...data: (Partial<IBPMEvent> & Partial<IWrapBPMEventAttribute<IBPMEvent>>)[]
   ): void {
      for (const obj of data) this.bpmEvents.push(new BPMEvent(obj));
   }

   addRotationEvents(...data: Partial<IWrapRotationEventAttribute<IRotationEvent>>[]): void;
   addRotationEvents(...data: Partial<IRotationEvent>[]): void;
   addRotationEvents(
      ...data: (Partial<IRotationEvent> & Partial<IWrapRotationEventAttribute<IRotationEvent>>)[]
   ): void;
   addRotationEvents(
      ...data: (Partial<IRotationEvent> & Partial<IWrapRotationEventAttribute<IRotationEvent>>)[]
   ): void {
      for (const obj of data) this.rotationEvents.push(new RotationEvent(obj));
   }

   addColorNotes(...data: Partial<IWrapColorNoteAttribute<IColorNote>>[]): void;
   addColorNotes(...data: Partial<IColorNote>[]): void;
   addColorNotes(
      ...data: (Partial<IColorNote> & Partial<IWrapColorNoteAttribute<IColorNote>>)[]
   ): void;
   addColorNotes(
      ...data: (Partial<IColorNote> & Partial<IWrapColorNoteAttribute<IColorNote>>)[]
   ): void {
      for (const obj of data) this.colorNotes.push(new ColorNote(obj));
   }

   addBombNotes(...data: Partial<IWrapBombNoteAttribute<IBombNote>>[]): void;
   addBombNotes(...data: Partial<IBombNote>[]): void;
   addBombNotes(
      ...data: (Partial<IBombNote>[] & Partial<IWrapBombNoteAttribute<IBombNote>>)[]
   ): void;
   addBombNotes(
      ...data: (Partial<IBombNote>[] & Partial<IWrapBombNoteAttribute<IBombNote>>)[]
   ): void {
      for (const obj of data) this.bombNotes.push(new BombNote(obj));
   }

   addObstacles(...data: Partial<IWrapObstacleAttribute<IObstacle>>[]): void;
   addObstacles(...data: Partial<IObstacle>[]): void;
   addObstacles(...data: (Partial<IObstacle> & Partial<IWrapObstacleAttribute<IObstacle>>)[]): void;
   addObstacles(
      ...data: (Partial<IObstacle> & Partial<IWrapObstacleAttribute<IObstacle>>)[]
   ): void {
      for (const obj of data) this.obstacles.push(new Obstacle(obj));
   }

   addArcs(...data: Partial<IWrapArcAttribute<IArc>>[]): void;
   addArcs(...data: Partial<IArc>[]): void;
   addArcs(...data: (Partial<IArc> & Partial<IWrapArcAttribute<IArc>>)[]): void;
   addArcs(...data: (Partial<IArc> & Partial<IWrapArcAttribute<IArc>>)[]): void {
      for (const obj of data) this.arcs.push(new Arc(obj));
   }

   addChains(...data: Partial<IWrapChainAttribute<IChain>>[]): void;
   addChains(...data: Partial<IChain>[]): void;
   addChains(...data: (Partial<IChain> & Partial<IWrapChainAttribute<IChain>>)[]): void;
   addChains(...data: (Partial<IChain> & Partial<IWrapChainAttribute<IChain>>)[]): void {
      for (const obj of data) this.chains.push(new Chain(obj));
   }

   addWaypoints(...data: Partial<IWrapWaypointAttribute<IWaypoint>>[]): void;
   addWaypoints(...data: Partial<IWaypoint>[]): void;
   addWaypoints(...data: (Partial<IWaypoint> & Partial<IWrapWaypointAttribute<IWaypoint>>)[]): void;
   addWaypoints(
      ...data: (Partial<IWaypoint> & Partial<IWrapWaypointAttribute<IWaypoint>>)[]
   ): void {
      for (const obj of data) this.waypoints.push(new Waypoint(obj));
   }

   addBasicEvents(...data: Partial<IWrapEventAttribute<IBasicEvent>>[]): void;
   addBasicEvents(...data: Partial<IBasicEvent>[]): void;
   addBasicEvents(
      ...data: (Partial<IBasicEvent>[] & Partial<IWrapEventAttribute<IBasicEvent>>)[]
   ): void;
   addBasicEvents(
      ...data: (Partial<IBasicEvent>[] & Partial<IWrapEventAttribute<IBasicEvent>>)[]
   ): void {
      for (const obj of data) this.basicEvents.push(new BasicEvent(obj));
   }

   addColorBoostEvents(...data: Partial<IWrapColorBoostEventAttribute<IColorBoostEvent>>[]): void;
   addColorBoostEvents(...data: Partial<IColorBoostEvent>[]): void;
   addColorBoostEvents(
      ...data: (Partial<IColorBoostEvent> &
         Partial<IWrapColorBoostEventAttribute<IColorBoostEvent>>)[]
   ): void;
   addColorBoostEvents(
      ...data: (Partial<IColorBoostEvent> &
         Partial<IWrapColorBoostEventAttribute<IColorBoostEvent>>)[]
   ): void {
      for (const obj of data) this.colorBoostEvents.push(new ColorBoostEvent(obj));
   }

   addLightColorEventBoxGroups(
      ...data: DeepPartial<
         IWrapLightColorEventBoxGroupAttribute<
            ILightColorEventBoxGroup,
            ILightColorEventBox,
            ILightColorBase,
            IIndexFilter
         >
      >[]
   ): void;
   addLightColorEventBoxGroups(...data: DeepPartial<ILightColorEventBoxGroup>[]): void;
   addLightColorEventBoxGroups(
      ...data: (DeepPartial<ILightColorEventBoxGroup> &
         DeepPartial<
            IWrapLightColorEventBoxGroupAttribute<
               ILightColorEventBoxGroup,
               ILightColorEventBox,
               ILightColorBase,
               IIndexFilter
            >
         >)[]
   ): void;
   addLightColorEventBoxGroups(
      ...data: (DeepPartial<ILightColorEventBoxGroup> &
         DeepPartial<
            IWrapLightColorEventBoxGroupAttribute<
               ILightColorEventBoxGroup,
               ILightColorEventBox,
               ILightColorBase,
               IIndexFilter
            >
         >)[]
   ): void {
      for (const obj of data) this.lightColorEventBoxGroups.push(new LightColorEventBoxGroup(obj));
   }

   addLightRotationEventBoxGroups(
      ...data: DeepPartial<
         IWrapLightRotationEventBoxGroupAttribute<
            ILightRotationEventBoxGroup,
            ILightRotationEventBox,
            ILightRotationBase,
            IIndexFilter
         >
      >[]
   ): void;
   addLightRotationEventBoxGroups(...data: DeepPartial<ILightRotationEventBoxGroup>[]): void;
   addLightRotationEventBoxGroups(
      ...data: (DeepPartial<ILightRotationEventBoxGroup> &
         DeepPartial<
            IWrapLightRotationEventBoxGroupAttribute<
               ILightRotationEventBoxGroup,
               ILightRotationEventBox,
               ILightRotationBase,
               IIndexFilter
            >
         >)[]
   ): void;
   addLightRotationEventBoxGroups(
      ...data: (DeepPartial<ILightRotationEventBoxGroup> &
         DeepPartial<
            IWrapLightRotationEventBoxGroupAttribute<
               ILightRotationEventBoxGroup,
               ILightRotationEventBox,
               ILightRotationBase,
               IIndexFilter
            >
         >)[]
   ): void {
      for (const obj of data) {
         this.lightRotationEventBoxGroups.push(new LightRotationEventBoxGroup(obj));
      }
   }

   addLightTranslationEventBoxGroups(
      ...data: DeepPartial<
         IWrapLightTranslationEventBoxGroupAttribute<
            ILightTranslationEventBoxGroup,
            ILightTranslationEventBox,
            ILightTranslationBase,
            IIndexFilter
         >
      >[]
   ): void;
   addLightTranslationEventBoxGroups(...data: DeepPartial<ILightTranslationEventBoxGroup>[]): void;
   addLightTranslationEventBoxGroups(
      ...data: (DeepPartial<ILightTranslationEventBoxGroup> &
         DeepPartial<
            IWrapLightTranslationEventBoxGroupAttribute<
               ILightTranslationEventBoxGroup,
               ILightTranslationEventBox,
               ILightTranslationBase,
               IIndexFilter
            >
         >)[]
   ): void;
   addLightTranslationEventBoxGroups(
      ...data: (DeepPartial<ILightTranslationEventBoxGroup> &
         DeepPartial<
            IWrapLightTranslationEventBoxGroupAttribute<
               ILightTranslationEventBoxGroup,
               ILightTranslationEventBox,
               ILightTranslationBase,
               IIndexFilter
            >
         >)[]
   ): void {
      for (const obj of data) {
         this.lightTranslationEventBoxGroups.push(new LightTranslationEventBoxGroup(obj));
      }
   }

   isValid(): boolean {
      return (
         this.colorNotes.every((obj) => this.checkClass(ColorNote, obj)) ||
         this.bombNotes.every((obj) => this.checkClass(BombNote, obj)) ||
         this.arcs.every((obj) => this.checkClass(Arc, obj)) ||
         this.chains.every((obj) => this.checkClass(Chain, obj)) ||
         this.obstacles.every((obj) => this.checkClass(Obstacle, obj)) ||
         this.basicEvents.every((obj) => this.checkClass(BasicEvent, obj)) ||
         this.colorBoostEvents.every((obj) => this.checkClass(ColorBoostEvent, obj)) ||
         this.rotationEvents.every((obj) => this.checkClass(RotationEvent, obj)) ||
         this.bpmEvents.every((obj) => this.checkClass(BPMEvent, obj)) ||
         this.waypoints.every((obj) => this.checkClass(Waypoint, obj)) ||
         this.lightColorEventBoxGroups.every((obj) =>
            this.checkClass(LightColorEventBoxGroup, obj),
         ) ||
         this.lightRotationEventBoxGroups.every((obj) =>
            this.checkClass(LightRotationEventBoxGroup, obj),
         ) ||
         this.lightTranslationEventBoxGroups.every((obj) =>
            this.checkClass(LightTranslationEventBoxGroup, obj),
         ) ||
         this.eventTypesWithKeywords instanceof BasicEventTypesWithKeywords
      );
   }
}
