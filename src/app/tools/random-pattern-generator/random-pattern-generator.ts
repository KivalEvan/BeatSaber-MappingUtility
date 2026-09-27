import { Component, computed, signal } from '@angular/core';
import { NoteDirection } from 'bsmap';
import { ToolSection } from '../../ui/tool-section';
import { generatePattern, type PatternNote, type PatternSettings } from './pattern-generation';

type NumberSetting =
   'row' | 'column' | 'noteRed' | 'noteBlue' | 'noteBomb' | 'total' | 'parityExtend';
type BooleanSetting = 'noDot' | 'limit' | 'parity' | 'parityRed' | 'parityBlue';

interface NoteAppearance {
   readonly image: string;
   readonly dotImage: string;
   readonly name: string;
}

const cutDirections: Record<number, string> = {
   [NoteDirection.UP]: 'up',
   [NoteDirection.DOWN]: 'down',
   [NoteDirection.LEFT]: 'left',
   [NoteDirection.RIGHT]: 'right',
   [NoteDirection.UP_LEFT]: 'up-left',
   [NoteDirection.UP_RIGHT]: 'up-right',
   [NoteDirection.DOWN_LEFT]: 'down-left',
   [NoteDirection.DOWN_RIGHT]: 'down-right',
};

@Component({
   selector: 'app-random-pattern-generator',
   imports: [ToolSection],
   templateUrl: './random-pattern-generator.html',
   styleUrl: './random-pattern-generator.scss',
})
export class RandomPatternGenerator {
   protected readonly maxGridDimension = 16;
   protected readonly maxNoteCount = this.maxGridDimension * this.maxGridDimension;
   protected readonly maxParityExtension = 3;

   protected readonly settings = signal<PatternSettings>({
      row: 3,
      column: 4,
      noteRed: 1,
      noteBlue: 1,
      noteBomb: 0,
      noDot: false,
      limit: false,
      total: 2,
      parity: false,
      parityExtend: 0,
      parityRed: false,
      parityBlue: false,
   });

   protected readonly grid = signal<(PatternNote | null)[]>(
      Array(this.settings().row * this.settings().column).fill(null),
   );
   protected readonly statusMessage = signal('');
   protected readonly errors = signal<Partial<Record<NumberSetting, string>>>({});

   protected readonly rows = computed(() =>
      Array.from({ length: this.settings().row }, (_, index) => index),
   );
   protected readonly columns = computed(() =>
      Array.from({ length: this.settings().column }, (_, index) => index),
   );

   private readonly noteAppearance: readonly NoteAppearance[] = [
      { image: 'noter.svg', dotImage: 'noterd.svg', name: 'Red note' },
      { image: 'noteb.svg', dotImage: 'notebd.svg', name: 'Blue note' },
      { image: 'bomb.png', dotImage: 'bomb.png', name: 'Bomb' },
   ];

   protected readonly noteRotation = [
      '',
      'deg180',
      'deg270',
      'deg90',
      'deg315',
      'deg45',
      'deg225',
      'deg135',
      '',
   ];

   protected updateNumberSetting(name: NumberSetting, rawValue: string): void {
      const text = rawValue.trim();
      const value = Number(text);

      const isGridDimension = name === 'row' || name === 'column';
      let minimum = 0;
      let maximum = this.maxNoteCount;

      if (isGridDimension) {
         minimum = 1;
         maximum = this.maxGridDimension;
      } else if (name === 'parityExtend') {
         maximum = this.maxParityExtension;
      }

      if (
         !/^\d+$/.test(text) ||
         !Number.isSafeInteger(value) ||
         value < minimum ||
         value > maximum
      ) {
         this.errors.update((errors) => ({
            ...errors,
            [name]: `Whole number: ${minimum}–${maximum}.`,
         }));
         return;
      }

      this.errors.update((errors) => {
         const nextErrors = { ...errors };
         delete nextErrors[name];

         return nextErrors;
      });

      const nextSettings: PatternSettings = { ...this.settings(), [name]: value };
      this.settings.set(nextSettings);

      if (isGridDimension) {
         this.grid.set(Array(nextSettings.row * nextSettings.column).fill(null));
         this.statusMessage.set('');
      }
   }

   protected updateBooleanSetting(name: BooleanSetting, checked: boolean): void {
      this.settings.update((settings) => ({ ...settings, [name]: checked }));
   }

   protected generate(): void {
      const settings = this.settings();
      const grid = generatePattern(settings);
      const placed = grid.filter(Boolean).length;
      const requested = settings.noteRed + settings.noteBlue + settings.noteBomb;
      const capacity = settings.row * settings.column;

      this.grid.set(grid);
      if (placed < requested) {
         const reason =
            settings.limit && settings.total === capacity
               ? `Grid capacity and maximum notes are both ${placed}.`
               : `${settings.limit && settings.total < capacity ? 'Maximum notes' : 'Grid capacity'} is ${placed}.`;
         this.statusMessage.set(`${placed} of ${requested} objects placed. ${reason}`);
      } else {
         this.statusMessage.set(
            placed ? `${placed} objects placed` : 'No objects. Increase note counts.',
         );
      }
   }

   protected generateDisabled(): boolean {
      const settings = this.settings();

      return Object.entries(this.errors()).some(
         ([name, error]) =>
            error &&
            (name !== 'total' || settings.limit) &&
            (name !== 'parityExtend' || settings.parity),
      );
   }

   protected imageSource(cell: PatternNote | null): string {
      if (!cell) return 'assets/blank.png';

      const appearance = this.noteAppearance[cell._noteType];
      const isDotNote = cell._noteDirection === 8 && cell._noteType < 2;
      const image = isDotNote ? appearance.dotImage : appearance.image;

      return `assets/${image}`;
   }

   protected imageAlt(cell: PatternNote | null): string {
      if (!cell) return 'Empty';

      const name = this.noteAppearance[cell._noteType].name;
      if (cell._noteType >= 2) return name;
      if (cell._noteDirection === NoteDirection.ANY) return `${name}, dot`;

      return `${name}, cut ${cutDirections[cell._noteDirection]}`;
   }

   protected imageClass(cell: PatternNote | null): string {
      const rotation =
         cell && cell._noteType < 2 && cell._noteDirection !== 8
            ? (this.noteRotation[cell._noteDirection] ?? '')
            : '';

      return `image ${rotation}`;
   }
}
