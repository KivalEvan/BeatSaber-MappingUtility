import { NoteDirection } from 'bsmap';

export enum PatternNoteType {
   Red = 0,
   Blue = 1,
   Bomb = 2,
}

export interface PatternNote {
   _noteType: PatternNoteType;
   _noteDirection: NoteDirection;
}

/** Settings for a grid, its note counts, and its allowed note directions. */
export interface PatternSettings {
   row: number;
   column: number;

   noteRed: number;
   noteBlue: number;
   noteBomb: number;
   noDot: boolean;

   limit: boolean;
   total: number;

   parity: boolean;
   parityExtend: number;
   parityRed: boolean;
   parityBlue: boolean;
}

enum ParitySelection {
   Backhand = 'backhand',
   Forehand = 'forehand',
}

type NoteColor = PatternNoteType.Red | PatternNoteType.Blue;
type ParityRotation = Record<NoteColor, Record<ParitySelection, NoteDirection[]>>;

const NOTE_TYPES = [PatternNoteType.Red, PatternNoteType.Blue, PatternNoteType.Bomb] as const;
const DIRECTIONS: readonly NoteDirection[] = [
   NoteDirection.UP,
   NoteDirection.DOWN,
   NoteDirection.LEFT,
   NoteDirection.RIGHT,
   NoteDirection.UP_LEFT,
   NoteDirection.UP_RIGHT,
   NoteDirection.DOWN_LEFT,
   NoteDirection.DOWN_RIGHT,
   NoteDirection.ANY,
];

function createValidParity(ext: number, dot: boolean): ParityRotation {
   const red: Record<ParitySelection, NoteDirection[]> = {
      backhand: [NoteDirection.DOWN_LEFT, NoteDirection.DOWN, NoteDirection.DOWN_RIGHT],
      forehand: [NoteDirection.UP_LEFT, NoteDirection.UP, NoteDirection.UP_RIGHT],
   };
   const blue: Record<ParitySelection, NoteDirection[]> = {
      backhand: [NoteDirection.DOWN_LEFT, NoteDirection.DOWN, NoteDirection.DOWN_RIGHT],
      forehand: [NoteDirection.UP_LEFT, NoteDirection.UP, NoteDirection.UP_RIGHT],
   };

   if (dot) {
      red.backhand.push(NoteDirection.ANY);
      red.forehand.push(NoteDirection.ANY);
      blue.backhand.push(NoteDirection.ANY);
      blue.forehand.push(NoteDirection.ANY);
   }

   if (ext > 0) {
      red.backhand.push(NoteDirection.RIGHT);
      red.forehand.push(NoteDirection.LEFT);
      blue.backhand.push(NoteDirection.LEFT);
      blue.forehand.push(NoteDirection.RIGHT);
   }

   if (ext > 1) {
      red.backhand.push(NoteDirection.UP_RIGHT);
      red.forehand.push(NoteDirection.DOWN_LEFT);
      blue.backhand.push(NoteDirection.UP_LEFT);
      blue.forehand.push(NoteDirection.DOWN_RIGHT);
   }

   if (ext > 2) {
      red.backhand.push(NoteDirection.UP, NoteDirection.LEFT);
      red.forehand.push(NoteDirection.DOWN, NoteDirection.RIGHT);
      blue.backhand.push(NoteDirection.UP, NoteDirection.RIGHT);
      blue.forehand.push(NoteDirection.DOWN, NoteDirection.LEFT);
   }

   return { [PatternNoteType.Red]: red, [PatternNoteType.Blue]: blue };
}

/**
 * Generates a row-major grid using `Math.random` without mutating the options.
 * The caller must provide values that have passed the component's validation.
 */
export function generatePattern(options: PatternSettings): (PatternNote | null)[] {
   const note = [options.noteRed, options.noteBlue, options.noteBomb];
   const maxSize = options.row * options.column;
   const total = Math.min(
      note.reduce((sum, count) => sum + count, 0),
      maxSize,
      options.limit ? options.total : maxSize,
   );

   const cells: (PatternNote | null)[] = Array(maxSize).fill(null);
   const parity: Record<NoteColor, ParitySelection> = {
      [PatternNoteType.Red]: options.parityRed
         ? ParitySelection.Backhand
         : ParitySelection.Forehand,
      [PatternNoteType.Blue]: options.parityBlue
         ? ParitySelection.Backhand
         : ParitySelection.Forehand,
   };
   const validRotation = createValidParity(options.parityExtend, !options.noDot);
   const allDirections = options.noDot ? DIRECTIONS.slice(0, -1) : DIRECTIONS;

   for (let i = 0; i < total; i++) {
      let randomPosition = Math.floor(Math.random() * maxSize);
      let randomType = Math.floor(Math.random() * 3);

      for (let j = 0; j < 3 && note[randomType] === 0; j++) {
         randomType = (randomType + 1) % 3;
      }

      const noteType = NOTE_TYPES[randomType];
      const directions =
         options.parity && noteType !== PatternNoteType.Bomb
            ? validRotation[noteType][parity[noteType]]
            : allDirections;
      const randomDirection =
         noteType === PatternNoteType.Bomb
            ? NoteDirection.UP
            : directions[Math.floor(Math.random() * directions.length)];

      while (cells[randomPosition] !== null) {
         randomPosition = (randomPosition + 1) % maxSize;
      }

      cells[randomPosition] = {
         _noteType: noteType,
         _noteDirection: randomDirection,
      };
      note[randomType]--;
   }

   return cells;
}
