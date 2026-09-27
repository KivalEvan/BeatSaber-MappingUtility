export interface PatternNote {
   _noteType: number;
   _noteDirection: number;
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

interface ParityRotation {
   [key: number]: { [key: number]: number[] };
}

function createValidParity(ext: number = 0, dot: boolean = false) {
   const parityRotation: ParityRotation = {
      0: {
         0: [6, 1, 7],
         1: [4, 0, 5],
      },
      1: {
         0: [6, 1, 7],
         1: [4, 0, 5],
      },
   };

   if (dot) {
      parityRotation[0][0].push(8);
      parityRotation[0][1].push(8);
      parityRotation[1][0].push(8);
      parityRotation[1][1].push(8);
   }

   if (ext > 0) {
      parityRotation[0][0].push(3);
      parityRotation[0][1].push(2);
      parityRotation[1][0].push(2);
      parityRotation[1][1].push(3);
   }

   if (ext > 1) {
      parityRotation[0][0].push(5);
      parityRotation[0][1].push(6);
      parityRotation[1][0].push(4);
      parityRotation[1][1].push(7);
   }

   if (ext > 2) {
      parityRotation[0][0].push(0, 2);
      parityRotation[0][1].push(1, 3);
      parityRotation[1][0].push(0, 3);
      parityRotation[1][1].push(1, 2);
   }

   return parityRotation;
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
   const parity = { 0: options.parityRed ? 0 : 1, 1: options.parityBlue ? 0 : 1 };
   const validRotation = createValidParity(options.parityExtend, !options.noDot);
   const allDirections = Array.from({ length: options.noDot ? 8 : 9 }, (_, direction) => direction);

   for (let i = 0; i < total; i++) {
      let randomPosition = Math.floor(Math.random() * maxSize);
      let randomType = Math.floor(Math.random() * 3);

      for (let j = 0; j < 3 && note[randomType] === 0; j++) {
         randomType = (randomType + 1) % 3;
      }

      const directions =
         options.parity && randomType < 2
            ? validRotation[randomType][parity[randomType as 0 | 1]]
            : allDirections;
      const randomDirection =
         randomType === 2 ? 0 : directions[Math.floor(Math.random() * directions.length)];

      while (cells[randomPosition] !== null) {
         randomPosition = (randomPosition + 1) % maxSize;
      }

      cells[randomPosition] = { _noteType: randomType, _noteDirection: randomDirection };
      note[randomType]--;
   }

   return cells;
}
