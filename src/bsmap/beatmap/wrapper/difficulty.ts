import type { IWrapEvent, IWrapEventAttribute } from '../../types/beatmap/wrapper/event.ts';
import type { IWrapEventTypesWithKeywords } from '../../types/beatmap/wrapper/eventTypesWithKeywords.ts';
import type {
   IWrapBombNote,
   IWrapBombNoteAttribute,
} from '../../types/beatmap/wrapper/bombNote.ts';
import type {
   IWrapBPMEvent,
   IWrapBPMEventAttribute,
} from '../../types/beatmap/wrapper/bpmEvent.ts';
import type { IWrapChain, IWrapChainAttribute } from '../../types/beatmap/wrapper/chain.ts';
import {
   IWrapColorBoostEvent,
   IWrapColorBoostEventAttribute,
} from '../../types/beatmap/wrapper/colorBoostEvent.ts';
import type {
   IWrapColorNote,
   IWrapColorNoteAttribute,
} from '../../types/beatmap/wrapper/colorNote.ts';
import {
   IWrapLightColorEventBoxGroup,
   IWrapLightColorEventBoxGroupAttribute,
} from '../../types/beatmap/wrapper/lightColorEventBoxGroup.ts';
import {
   IWrapLightRotationEventBoxGroup,
   IWrapLightRotationEventBoxGroupAttribute,
} from '../../types/beatmap/wrapper/lightRotationEventBoxGroup.ts';
import {
   IWrapLightTranslationEventBoxGroup,
   IWrapLightTranslationEventBoxGroupAttribute,
} from '../../types/beatmap/wrapper/lightTranslationEventBoxGroup.ts';
import type {
   IWrapObstacle,
   IWrapObstacleAttribute,
} from '../../types/beatmap/wrapper/obstacle.ts';
import {
   IWrapRotationEvent,
   IWrapRotationEventAttribute,
} from '../../types/beatmap/wrapper/rotationEvent.ts';
import type { IWrapArc, IWrapArcAttribute } from '../../types/beatmap/wrapper/arc.ts';
import type {
   IWrapWaypoint,
   IWrapWaypointAttribute,
} from '../../types/beatmap/wrapper/waypoint.ts';
import { BeatPerMinute } from '../shared/bpm.ts';
import {
   _ObtainCustomData,
   DeepPartialWrapper,
   LooseAutocomplete,
   PartialWrapper,
} from '../../types/utils.ts';
import type { GenericFileName } from '../../types/beatmap/shared/filename.ts';
import type { EventContainer, NoteContainer } from '../../types/beatmap/wrapper/container.ts';
import type { Version } from '../../types/beatmap/shared/version.ts';
import { WrapBaseItem } from './baseItem.ts';
import type { IWrapDifficulty } from '../../types/beatmap/wrapper/difficulty.ts';
import type { IWrapFxEventsCollection } from '../../types/beatmap/wrapper/fxEventsCollection.ts';
import {
   IWrapFxEventBoxGroup,
   IWrapFxEventBoxGroupAttribute,
} from '../../types/beatmap/wrapper/fxEventBoxGroup.ts';
import { sortNoteFn, sortObjectFn } from '../shared/helpers.ts';

/** Difficulty beatmap class object. */
export abstract class WrapDifficulty<T extends { [P in keyof T]: T[P] }>
   extends WrapBaseItem<T>
   implements IWrapDifficulty<T>
{
   private _filename = 'UnnamedDifficulty.dat';

   abstract version: Version;
   abstract bpmEvents: IWrapBPMEvent[];
   abstract rotationEvents: IWrapRotationEvent[];
   abstract colorNotes: IWrapColorNote[];
   abstract bombNotes: IWrapBombNote[];
   abstract obstacles: IWrapObstacle[];
   abstract arcs: IWrapArc[];
   abstract chains: IWrapChain[];
   abstract waypoints: IWrapWaypoint[];
   abstract basicEvents: IWrapEvent[];
   abstract colorBoostEvents: IWrapColorBoostEvent[];
   abstract lightColorEventBoxGroups: IWrapLightColorEventBoxGroup[];
   abstract lightRotationEventBoxGroups: IWrapLightRotationEventBoxGroup[];
   abstract lightTranslationEventBoxGroups: IWrapLightTranslationEventBoxGroup[];
   abstract fxEventBoxGroups: IWrapFxEventBoxGroup[];
   abstract eventTypesWithKeywords: IWrapEventTypesWithKeywords;
   abstract fxEventsCollection: IWrapFxEventsCollection;
   abstract useNormalEventsAsCompatibleEvents: boolean;

   clone<U extends this>(): U {
      return super.clone().setFileName(this.filename) as U;
   }

   set filename(name: LooseAutocomplete<GenericFileName>) {
      this._filename = name.trim();
   }
   get filename(): string {
      return this._filename;
   }

   setFileName(filename: LooseAutocomplete<GenericFileName>) {
      this.filename = filename;
      return this;
   }

   sort(): this {
      this.bpmEvents.sort(sortObjectFn);
      this.rotationEvents.sort(sortObjectFn);
      this.colorNotes.sort(sortNoteFn);
      this.bombNotes.sort(sortNoteFn);
      this.obstacles.sort(sortObjectFn);
      this.arcs.sort(sortNoteFn);
      this.chains.sort(sortNoteFn);
      this.waypoints.sort(sortObjectFn);
      this.basicEvents.sort(sortObjectFn);
      this.colorBoostEvents.sort(sortObjectFn);
      this.lightColorEventBoxGroups.sort(sortObjectFn);
      this.lightRotationEventBoxGroups.sort(sortObjectFn);
      this.lightTranslationEventBoxGroups.sort(sortObjectFn);
      this.fxEventBoxGroups.sort(sortObjectFn);

      this.lightColorEventBoxGroups.forEach((gr) =>
         gr.boxes.forEach((bx) => bx.events.sort(sortObjectFn)),
      );
      this.lightRotationEventBoxGroups.forEach((gr) =>
         gr.boxes.forEach((bx) => bx.events.sort(sortObjectFn)),
      );
      this.lightTranslationEventBoxGroups.forEach((gr) =>
         gr.boxes.forEach((bx) => bx.events.sort(sortObjectFn)),
      );

      return this;
   }

   abstract reparse(keepRef?: boolean): this;

   protected createOrKeep<T, U>(concrete: { new (data: T | U): U }, obj: U, keep?: boolean): U {
      return keep && obj instanceof concrete ? obj : new concrete(obj);
   }

   protected checkClass<T, U>(concrete: { new (data: T): U }, obj: U): boolean {
      return obj instanceof concrete;
   }

   nps(duration: number): number {
      const notes = this.getNoteContainer().filter((n) => n.type !== 'bomb');
      return duration ? notes.length / duration : 0;
   }

   peak(beat: number, bpm: BeatPerMinute | number): number {
      let peakNPS = 0;
      let currentSectionStart = 0;
      bpm = typeof bpm === 'number' ? new BeatPerMinute(bpm) : bpm;
      const notes = this.getNoteContainer().filter((n) => n.type !== 'bomb');

      for (let i = 0; i < notes.length; i++) {
         while (notes[i].data.time - notes[currentSectionStart].data.time > beat) {
            currentSectionStart++;
         }
         peakNPS = Math.max(peakNPS, (i - currentSectionStart + 1) / bpm.toRealTime(beat));
      }

      return peakNPS;
   }

   getFirstInteractiveTime(): number {
      const notes = this.getNoteContainer().filter((n) => n.type !== 'arc');
      let firstNoteTime = Number.MAX_VALUE;
      if (notes.length > 0) {
         firstNoteTime = notes[0].data.time;
      }
      const firstInteractiveObstacleTime = this.findFirstInteractiveObstacleTime();
      return Math.min(firstNoteTime, firstInteractiveObstacleTime);
   }

   getLastInteractiveTime(): number {
      const notes = this.getNoteContainer().filter((n) => n.type !== 'arc');
      let lastNoteTime = 0;
      if (notes.length > 0) {
         lastNoteTime = notes[notes.length - 1].data.time;
      }
      const lastInteractiveObstacleTime = this.findLastInteractiveObstacleTime();
      return Math.max(lastNoteTime, lastInteractiveObstacleTime);
   }

   findFirstInteractiveObstacleTime(): number {
      for (let i = 0, len = this.obstacles.length; i < len; i++) {
         if (this.obstacles[i].isInteractive()) {
            return this.obstacles[i].time;
         }
      }
      return Number.MAX_VALUE;
   }

   findLastInteractiveObstacleTime(): number {
      let obstacleEnd = 0;
      for (let i = this.obstacles.length - 1; i >= 0; i--) {
         if (this.obstacles[i].isInteractive()) {
            obstacleEnd = Math.max(
               obstacleEnd,
               this.obstacles[i].time + this.obstacles[i].duration,
            );
         }
      }
      return obstacleEnd;
   }

   getNoteContainer(): NoteContainer[] {
      const nc: NoteContainer[] = [];
      this.colorNotes.forEach((n) => nc.push({ type: 'note', data: n }));
      this.arcs.forEach((s) => nc.push({ type: 'arc', data: s }));
      this.chains.forEach((bs) => nc.push({ type: 'chain', data: bs }));
      this.bombNotes.forEach((b) => nc.push({ type: 'bomb', data: b }));
      return nc.sort((a, b) => a.data.time - b.data.time);
   }

   getEventContainer(): EventContainer[] {
      const ec: EventContainer[] = [];
      this.basicEvents.forEach((be) => ec.push({ type: 'basicEvent', data: be }));
      this.colorBoostEvents.forEach((b) => ec.push({ type: 'boost', data: b }));
      return ec.sort((a, b) => a.data.time - b.data.time);
   }

   abstract addBpmEvents(...data: PartialWrapper<IWrapBPMEventAttribute>[]): void;
   abstract addRotationEvents(...data: PartialWrapper<IWrapRotationEventAttribute>[]): void;
   abstract addColorNotes(...data: PartialWrapper<IWrapColorNoteAttribute>[]): void;
   abstract addBombNotes(...data: PartialWrapper<IWrapBombNoteAttribute>[]): void;
   abstract addObstacles(...data: PartialWrapper<IWrapObstacleAttribute>[]): void;
   abstract addArcs(...data: PartialWrapper<IWrapArcAttribute>[]): void;
   abstract addChains(...data: PartialWrapper<IWrapChainAttribute>[]): void;
   abstract addWaypoints(...data: PartialWrapper<IWrapWaypointAttribute>[]): void;
   abstract addBasicEvents(...data: PartialWrapper<IWrapEventAttribute>[]): void;
   abstract addColorBoostEvents(...data: PartialWrapper<IWrapColorBoostEventAttribute>[]): void;
   abstract addLightColorEventBoxGroups(
      ...data: DeepPartialWrapper<IWrapLightColorEventBoxGroupAttribute>[]
   ): void;
   abstract addLightRotationEventBoxGroups(
      ...data: DeepPartialWrapper<IWrapLightRotationEventBoxGroupAttribute>[]
   ): void;
   abstract addLightTranslationEventBoxGroups(
      ...data: DeepPartialWrapper<IWrapLightTranslationEventBoxGroupAttribute>[]
   ): void;
   abstract addFxEventBoxGroups(...data: DeepPartialWrapper<IWrapFxEventBoxGroupAttribute>[]): void;
}
