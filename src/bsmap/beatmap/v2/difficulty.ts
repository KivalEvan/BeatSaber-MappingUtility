import type { IDifficulty } from '../../types/beatmap/v2/difficulty.ts';
import { Note } from './note.ts';
import { Arc } from './arc.ts';
import { Obstacle } from './obstacle.ts';
import { Event } from './event.ts';
import { Waypoint } from './waypoint.ts';
import { SpecialEventsKeywordFilters } from './specialEventsKeywordFilters.ts';
import { deepCopy } from '../../utils/misc.ts';
import type { INote } from '../../types/beatmap/v2/note.ts';
import type { IObstacle } from '../../types/beatmap/v2/obstacle.ts';
import {
   IEvent,
   IEventBoost,
   IEventBPMChange,
   IEventLaneRotation,
} from '../../types/beatmap/v2/event.ts';
import type { IWaypoint } from '../../types/beatmap/v2/waypoint.ts';
import type { IArc } from '../../types/beatmap/v2/arc.ts';
import { WrapDifficulty } from '../wrapper/difficulty.ts';
import logger from '../../logger.ts';
import type { IWrapColorBoostEventAttribute } from '../../types/beatmap/wrapper/colorBoostEvent.ts';
import type { IWrapBombNoteAttribute } from '../../types/beatmap/wrapper/bombNote.ts';
import type { IWrapBPMEventAttribute } from '../../types/beatmap/wrapper/bpmEvent.ts';
import type { IWrapColorNoteAttribute } from '../../types/beatmap/wrapper/colorNote.ts';
import type { IWrapEventAttribute } from '../../types/beatmap/wrapper/event.ts';
import type { IWrapObstacleAttribute } from '../../types/beatmap/wrapper/obstacle.ts';
import type { IWrapRotationEventAttribute } from '../../types/beatmap/wrapper/rotationEvent.ts';
import type { IWrapArcAttribute } from '../../types/beatmap/wrapper/arc.ts';
import type { IWrapWaypointAttribute } from '../../types/beatmap/wrapper/waypoint.ts';

function tag(name: string): string[] {
   return ['beatmap', 'v2', 'difficulty', name];
}

/** Difficulty beatmap v2 class object. */
export class Difficulty extends WrapDifficulty<IDifficulty> {
   version: `2.${0 | 2 | 4 | 5 | 6}.0`;
   bpmEvents: never[] = [];
   rotationEvents: never[] = [];
   colorNotes: Note[];
   bombNotes: never[] = [];
   obstacles: Obstacle[];
   arcs: Arc[];
   chains: never[] = [];
   waypoints: Waypoint[];
   basicEvents: Event[];
   colorBoostEvents: never[] = [];
   lightColorEventBoxGroups: never[] = [];
   lightRotationEventBoxGroups: never[] = [];
   lightTranslationEventBoxGroups: never[] = [];
   eventTypesWithKeywords: SpecialEventsKeywordFilters;
   useNormalEventsAsCompatibleEvents = true;

   constructor(data: Partial<IDifficulty> = {}) {
      super();

      this.version = '2.6.0';
      this.colorNotes = (data._notes ?? []).map((obj) => new Note(obj));
      this.arcs = (data._sliders ?? []).map((obj) => new Arc(obj));
      this.obstacles = (data._obstacles ?? []).map((obj) => new Obstacle(obj));
      this.basicEvents = (data._events ?? []).map((obj) => new Event(obj));
      this.waypoints = (data._waypoints ?? []).map((obj) => new Waypoint(obj));
      this.eventTypesWithKeywords = new SpecialEventsKeywordFilters(
         data._specialEventsKeywordFilters ?? {
            _keywords: [],
         },
      );
      this.customData = deepCopy(data._customData ?? {});
   }

   static create(data: Partial<IDifficulty> = {}): Difficulty {
      return new this(data);
   }

   toJSON(): IDifficulty {
      return {
         _version: '2.6.0',
         _notes: this.colorNotes.map((obj) => obj.toJSON()),
         _sliders: this.arcs.map((obj) => obj.toJSON()),
         _obstacles: this.obstacles.map((obj) => obj.toJSON()),
         _events: this.basicEvents.map((obj) => obj.toJSON()),
         _waypoints: this.waypoints.map((obj) => obj.toJSON()),
         _specialEventsKeywordFilters: this.eventTypesWithKeywords.toJSON(),
         _customData: deepCopy(this.customData),
      };
   }

   get customData(): NonNullable<IDifficulty['_customData']> {
      return this._customData;
   }
   set customData(value: NonNullable<IDifficulty['_customData']>) {
      this._customData = value;
   }

   reparse(keepRef?: boolean): void {
      this.colorNotes = this.colorNotes.map((obj) => this.createOrKeep(Note, obj, keepRef));
      this.obstacles = this.obstacles.map((obj) => this.createOrKeep(Obstacle, obj, keepRef));
      this.basicEvents = this.basicEvents.map((obj) => this.createOrKeep(Event, obj, keepRef));
      this.waypoints = this.waypoints.map((obj) => this.createOrKeep(Waypoint, obj, keepRef));
      this.arcs = this.arcs.map((obj) => this.createOrKeep(Arc, obj, keepRef));
      this.eventTypesWithKeywords = new SpecialEventsKeywordFilters(this.eventTypesWithKeywords);
   }

   addBpmEvents(...data: Partial<IWrapBPMEventAttribute>[]): void;
   addBpmEvents(...data: Partial<IEventBPMChange>[]): void;
   addBpmEvents(
      ...data: (Partial<IEventBPMChange> & Partial<IWrapBPMEventAttribute<IEventBPMChange>>)[]
   ): void;
   addBpmEvents(
      ...data: (Partial<IEventBPMChange> & Partial<IWrapBPMEventAttribute<IEventBPMChange>>)[]
   ): void {
      for (const obj of data) {
         this.basicEvents.push(new Event({ ...obj, type: 100, value: obj.bpm }));
      }
   }

   addRotationEvents(...data: Partial<IWrapRotationEventAttribute>[]): void;
   addRotationEvents(...data: Partial<IEventLaneRotation>[]): void;
   addRotationEvents(
      ...data: (Partial<IEventLaneRotation> &
         Partial<IWrapRotationEventAttribute<IEventLaneRotation>>)[]
   ): void;
   addRotationEvents(
      ...data: (Partial<IEventLaneRotation> &
         Partial<IWrapRotationEventAttribute<IEventLaneRotation>>)[]
   ): void {
      for (const obj of data) {
         this.basicEvents.push(
            new Event({
               ...obj,
               type:
                  typeof obj.executionTime === 'number'
                     ? obj.executionTime === 0
                        ? 14
                        : 15
                     : obj._type,
            }),
         );
      }
      logger.tWarn(tag('addRotationEvents'), 'This may not work correctly');
   }

   addColorNotes(...data: Partial<IWrapColorNoteAttribute<INote>>[]): void;
   addColorNotes(...data: Partial<INote>[]): void;
   addColorNotes(...data: (Partial<INote> & Partial<IWrapColorNoteAttribute<INote>>)[]): void;
   addColorNotes(...data: (Partial<INote> & Partial<IWrapColorNoteAttribute<INote>>)[]): void {
      for (const obj of data) this.colorNotes.push(new Note(obj));
   }

   addBombNotes(...data: Partial<IWrapBombNoteAttribute<INote>>[]): void;
   addBombNotes(...data: Partial<INote>[]): void;
   addBombNotes(...data: (Partial<INote> & Partial<IWrapBombNoteAttribute<INote>>)[]): void;
   addBombNotes(...data: (Partial<INote> & Partial<IWrapBombNoteAttribute<INote>>)[]): void {
      for (const obj of data) this.colorNotes.push(new Note({ ...obj, type: 3 }));
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

   addChains(..._: never[]): void {
      logger.tWarn(tag('addChains'), 'Chain does not exist in beatmap V2');
   }

   addWaypoints(...data: Partial<IWrapWaypointAttribute<IWaypoint>>[]): void;
   addWaypoints(...data: Partial<IWaypoint>[]): void;
   addWaypoints(...data: (Partial<IWaypoint> & Partial<IWrapWaypointAttribute<IWaypoint>>)[]): void;
   addWaypoints(
      ...data: (Partial<IWaypoint> & Partial<IWrapWaypointAttribute<IWaypoint>>)[]
   ): void {
      for (const obj of data) this.waypoints.push(new Waypoint(obj));
   }

   addBasicEvents(...data: Partial<IWrapEventAttribute<IEvent>>[]): void;
   addBasicEvents(...data: Partial<IEvent>[]): void;
   addBasicEvents(...data: (Partial<IEvent> & Partial<IWrapEventAttribute<IEvent>>)[]): void;
   addBasicEvents(...data: (Partial<IEvent> & Partial<IWrapEventAttribute<IEvent>>)[]): void {
      for (const obj of data) this.basicEvents.push(new Event(obj));
   }

   addColorBoostEvents(...data: Partial<IWrapColorBoostEventAttribute<IEventBoost>>[]): void;
   addColorBoostEvents(...data: Partial<IEventBoost>[]): void;
   addColorBoostEvents(
      ...data: (Partial<IEventBoost> & Partial<IWrapColorBoostEventAttribute<IEventBoost>>)[]
   ): void;
   addColorBoostEvents(
      ...data: (Partial<IEventBoost> & Partial<IWrapColorBoostEventAttribute<IEventBoost>>)[]
   ): void {
      for (const obj of data) {
         this.basicEvents.push(new Event({ ...obj, value: obj.toggle ? 1 : obj._value }));
      }
   }

   addLightColorEventBoxGroups(..._: never[]): void {
      logger.tWarn(
         tag('addLightColorEventBoxGroups'),
         'Light Color Event Box Group does not exist in beatmap V2',
      );
   }

   addLightRotationEventBoxGroups(..._: never[]): void {
      logger.tWarn(
         tag('addLightRotationEventBoxGroups'),
         'Light Rotation Event Box Group does not exist in beatmap V2',
      );
   }

   addLightTranslationEventBoxGroups(..._: never[]): void {
      logger.tWarn(
         tag('addLightTranslationEventBoxGroups'),
         'Light Translation Event Box Group does not exist in beatmap V2',
      );
   }

   isValid(): boolean {
      return (
         this.colorNotes.every((obj) => this.checkClass(Note, obj)) ||
         this.obstacles.every((obj) => this.checkClass(Obstacle, obj)) ||
         this.basicEvents.every((obj) => this.checkClass(Event, obj)) ||
         this.waypoints.every((obj) => this.checkClass(Waypoint, obj)) ||
         this.arcs.every((obj) => this.checkClass(Arc, obj)) ||
         this.eventTypesWithKeywords instanceof SpecialEventsKeywordFilters
      );
   }
}
