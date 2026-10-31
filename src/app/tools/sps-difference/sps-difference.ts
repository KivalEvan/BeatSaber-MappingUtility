import { Component, computed, signal } from '@angular/core';
import { round } from 'bsmap';
import { ToolSection } from '../../ui/tool-section';

const DIFFICULTY_NAMES = ['Easy', 'Normal', 'Hard', 'Expert', 'Expert+'] as const;
type DifficultyName = (typeof DIFFICULTY_NAMES)[number];

interface DifficultyEntry {
   name: DifficultyName;
   value: number | null;
   validationMessage: string | null;
}

interface EnteredDifficulty {
   name: DifficultyName;
   value: number;
}

interface AdjacentDrop {
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
         value: null,
         validationMessage: null,
      })),
   );

   protected readonly adjacentDrops = computed<Partial<Record<DifficultyName, AdjacentDrop>>>(
      () => {
         const entered: EnteredDifficulty[] = [];

         for (const difficulty of this.difficulties()) {
            if (difficulty.value !== null) {
               entered.push({ name: difficulty.name, value: difficulty.value });
            }
         }

         const drops: Partial<Record<DifficultyName, AdjacentDrop>> = {};

         for (let index = 1; index < entered.length; index++) {
            const previous = entered[index - 1];
            const next = entered[index];
            const reduction = next.value === 0 ? null : (1 - previous.value / next.value) * 100;
            const unavailableReason =
               next.value === 0 ? 'zero' : Number.isFinite(reduction) ? null : 'range';

            drops[previous.name] = {
               next: next.name,
               reduction: unavailableReason === null ? reduction : null,
               unavailableReason,
            };
         }

         return drops;
      },
   );

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

   // Mounted inputs own their drafts so incomplete numbers and the caret survive updates.
   protected handleInput(index: number, input: HTMLInputElement) {
      const rawValue = input.value;

      if (rawValue === '' && !input.validity.badInput) {
         input.setCustomValidity('');
         this.setDifficulty(index, {
            value: null,
            validationMessage: null,
         });
         return;
      }

      const parsedValue = input.valueAsNumber;
      if (!Number.isFinite(parsedValue) || parsedValue < 0) {
         const message = 'Enter a number greater than or equal to 0.';

         input.setCustomValidity(message);
         this.setDifficulty(index, {
            value: null,
            validationMessage: message,
         });
         return;
      }

      const value = round(parsedValue, 2);
      if (!Number.isFinite(value)) {
         const message =
            'This value is too large to round to two decimal places. Enter a smaller value.';

         input.setCustomValidity(message);
         this.setDifficulty(index, {
            value: null,
            validationMessage: message,
         });
         return;
      }

      input.setCustomValidity('');
      this.setDifficulty(index, {
         value,
         validationMessage: null,
      });
   }

   protected normalizeInput(index: number, input: HTMLInputElement) {
      const value = this.difficulties()[index].value;
      if (value === null) return;

      input.value = String(value);
   }
}
