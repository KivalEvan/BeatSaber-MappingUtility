import { Component, computed, signal } from '@angular/core';
import { round } from 'bsmap';
import { ToolSection } from '../../ui/tool-section';

const DIFFICULTY_NAMES = ['Easy', 'Normal', 'Hard', 'Expert', 'Expert+'] as const;
type DifficultyName = (typeof DIFFICULTY_NAMES)[number];

interface DifficultyEntry {
   name: DifficultyName;
   rawValue: string;
   value: number | null;
   validationMessage: string | null;
}

interface EnteredDifficulty {
   name: DifficultyName;
   value: number;
}

interface AdjacentDrop {
   previous: DifficultyName;
   next: DifficultyName;
   reduction: number | null;
   unavailableReason: 'zero' | 'range' | null;
}

function formatReduction(value: number | null): string {
   return value === null ? '-' : `${value.toFixed(2)}%`;
}

@Component({
   selector: 'app-sps-difference',
   imports: [ToolSection],
   templateUrl: './sps-difference.html',
   styleUrl: './sps-difference.scss',
})
export class SpsDifference {
   protected readonly difficulties = signal<DifficultyEntry[]>(
      DIFFICULTY_NAMES.map((name) => ({
         name,
         rawValue: '',
         value: null,
         validationMessage: null,
      })),
   );

   protected readonly adjacentDrops = computed<AdjacentDrop[]>(() => {
      const entered: EnteredDifficulty[] = [];

      for (const difficulty of this.difficulties()) {
         if (difficulty.value !== null) {
            entered.push({ name: difficulty.name, value: difficulty.value });
         }
      }

      return entered.slice(1).map((next, index) => {
         const previous = entered[index];
         const reduction = next.value === 0 ? null : (1 - previous.value / next.value) * 100;
         const unavailableReason =
            next.value === 0 ? 'zero' : Number.isFinite(reduction) ? null : 'range';

         return {
            previous: previous.name,
            next: next.name,
            reduction: unavailableReason === null ? reduction : null,
            unavailableReason,
         };
      });
   });

   protected readonly totalReduction = computed<number | null>(() => {
      const values: number[] = [];

      for (const difficulty of this.difficulties()) {
         if (difficulty.value !== null) values.push(difficulty.value);
      }

      if (values.length < 2) return null;

      const highest = Math.max(...values);
      if (highest === 0) return 0;

      const lowest = Math.min(...values);

      return (1 - lowest / highest) * 100;
   });

   protected readonly formatReduction = formatReduction;

   private setDifficulty(index: number, entry: Partial<DifficultyEntry>) {
      this.difficulties.update((current) =>
         current.map((difficulty, itemIndex) =>
            itemIndex === index ? { ...difficulty, ...entry } : difficulty,
         ),
      );
   }

   protected handleInput(index: number, input: HTMLInputElement) {
      const rawValue = input.value;

      if (rawValue === '' && !input.validity.badInput) {
         input.setCustomValidity('');
         this.setDifficulty(index, { rawValue: '', value: null, validationMessage: null });
         return;
      }

      const parsedValue = input.valueAsNumber;
      if (!Number.isFinite(parsedValue) || parsedValue < 0) {
         const message = 'Enter a number greater than or equal to 0.';

         input.setCustomValidity(message);
         this.setDifficulty(index, { rawValue, value: null, validationMessage: message });
         return;
      }

      const value = round(parsedValue, 2);
      if (!Number.isFinite(value)) {
         const message =
            'This value is too large to round to two decimal places. Enter a smaller value.';

         input.setCustomValidity(message);
         this.setDifficulty(index, { rawValue, value: null, validationMessage: message });
         return;
      }

      input.setCustomValidity('');
      const normalizedValue = String(value);
      this.setDifficulty(index, { rawValue: normalizedValue, value, validationMessage: null });

      if (input.value !== normalizedValue) input.value = normalizedValue;
   }
}
