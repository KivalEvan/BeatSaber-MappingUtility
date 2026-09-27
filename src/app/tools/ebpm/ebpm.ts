import { Component, computed, signal } from '@angular/core';
import { round } from 'bsmap';
import { ToolSection } from '../../ui/tool-section';
import { areEbpmResultsValid, calculateEbpmResults } from './ebpm-calculations';

type InputField = 'tempo' | 'beatPrecision' | 'timeDistance' | 'realTime' | 'oneHanded' | 'stream';
type InputState = Record<InputField, string | null>;

@Component({
   selector: 'app-ebpm',
   imports: [ToolSection],
   templateUrl: './ebpm.html',
})
export class Ebpm {
   protected readonly round = round;
   protected readonly results = signal(calculateEbpmResults(128, 2));

   private readonly drafts = signal<InputState>({
      tempo: null,
      beatPrecision: null,
      timeDistance: null,
      realTime: null,
      oneHanded: null,
      stream: null,
   });

   protected readonly errors = signal<InputState>({
      tempo: null,
      beatPrecision: null,
      timeDistance: null,
      realTime: null,
      oneHanded: null,
      stream: null,
   });
   protected readonly hasErrors = computed(() => Object.values(this.errors()).some(Boolean));

   protected updateFromInput(field: InputField, input: HTMLInputElement) {
      const value = input.valueAsNumber;
      const rawValue = input.value;
      if (!Number.isFinite(value) || value <= 0) {
         this.setFieldState(field, rawValue, 'Enter a number above 0.');
         return;
      }

      let { bpm, beatPrecision } = this.results();

      switch (field) {
         case 'tempo':
            bpm = value;
            break;

         case 'beatPrecision':
            beatPrecision = value;
            break;

         case 'timeDistance':
            beatPrecision = 1 / value;
            break;

         case 'realTime':
            beatPrecision = 60000 / (bpm * value);
            break;

         case 'oneHanded':
            beatPrecision = (2 * value) / bpm;
            break;

         case 'stream':
            beatPrecision = (4 * value) / bpm;
            break;
      }

      const nextResults = calculateEbpmResults(bpm, beatPrecision);
      if (!areEbpmResultsValid(nextResults)) {
         this.setFieldState(field, rawValue, 'Enter a less extreme positive value.');
         return;
      }

      this.results.set(nextResults);
      this.setFieldState(field, null, null);
   }

   protected inputValue(field: InputField, value: number) {
      return this.drafts()[field] ?? value;
   }

   private setFieldState(field: InputField, draft: string | null, error: string | null) {
      this.drafts.update((current) => ({ ...current, [field]: draft }));
      this.errors.update((current) => ({ ...current, [field]: error }));
   }
}
