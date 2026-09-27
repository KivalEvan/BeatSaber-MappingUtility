import { Component, computed, signal } from '@angular/core';
import { NoteJumpSpeed, round } from 'bsmap';
import { ToolSection } from '../../ui/tool-section';
import { calculateJumpResults, type JumpResults } from './jump-calculations';

type InputName = 'bpm' | 'njs' | 'offset' | 'hjd' | 'jd' | 'reactionTimeMs';

interface Inputs {
   bpm: string;
   njs: string;
   offset: string;
   hjd: string;
   jd: string;
   reactionTimeMs: string;
}

const INPUT_NAMES: InputName[] = ['bpm', 'njs', 'offset', 'hjd', 'jd', 'reactionTimeMs'];

@Component({
   selector: 'app-njs-calculator',
   imports: [ToolSection],
   templateUrl: './njs-calculator.html',
   styleUrl: './njs-calculator.scss',
})
export class NjsCalculator {
   protected readonly minimumHjd = NoteJumpSpeed.HJD_MIN;

   private readonly njs = signal(new NoteJumpSpeed(128, 16));
   protected readonly scaleSelect = signal<'njs' | 'hjd'>('hjd');

   protected readonly inputs = signal<Inputs>({
      bpm: String(this.njs().bpm),
      njs: String(this.njs().value),
      offset: String(this.njs().offset),
      hjd: String(this.njs().hjd),
      jd: String(this.njs().jd),
      reactionTimeMs: String(round(this.njs().reactionTime * 1000)),
   });

   protected readonly fieldErrors = signal<Record<InputName, string | null>>({
      bpm: null,
      njs: null,
      offset: null,
      hjd: null,
      jd: null,
      reactionTimeMs: null,
   });

   protected readonly results = signal(calculateJumpResults(this.njs()));

   protected readonly hasErrors = computed(() => Object.values(this.fieldErrors()).some(Boolean));

   protected updateFromInput(name: InputName, input: HTMLInputElement) {
      const rawValue = input.value;
      this.inputs.update((current) => ({ ...current, [name]: rawValue }));

      if (rawValue.trim() === '') {
         this.setInputError(name, 'Enter a value.');
         return;
      }

      const parsedValue = Number(rawValue);
      if (!Number.isFinite(parsedValue)) {
         this.setInputError(name, 'Enter a finite number.');
         return;
      }

      if (name === 'bpm' && parsedValue <= 0) {
         this.setInputError(name, 'Enter a BPM above 0.');
         return;
      }

      if (name === 'njs' && parsedValue <= 0) {
         this.setInputError(name, 'Enter an NJS above 0.');
         return;
      }

      if (name !== 'offset' && parsedValue < 0) {
         this.setInputError(name, 'Enter 0 or a positive value.');
         return;
      }

      const nextNjs = new NoteJumpSpeed(this.njs().bpm, this.njs().value, this.njs().offset);

      switch (name) {
         case 'bpm': {
            nextNjs.bpm = round(parsedValue, 3);
            break;
         }

         case 'njs': {
            nextNjs.value = round(parsedValue, 3);
            break;
         }

         case 'offset': {
            nextNjs.offset = round(parsedValue, 3);
            break;
         }

         case 'hjd': {
            nextNjs.offset = round(
               Math.max(parsedValue, NoteJumpSpeed.HJD_MIN) - nextNjs.calcHjd(0),
               3,
            );
            break;
         }

         case 'jd': {
            const distance = parsedValue > 0 ? parsedValue : nextNjs.jd;

            if (this.scaleSelect() === 'hjd') {
               const minimumDistance = nextNjs.calcJd(NoteJumpSpeed.HJD_MIN);
               nextNjs.offset = round(
                  nextNjs.calcHjdFromJd(Math.max(distance, minimumDistance)) - nextNjs.calcHjd(0),
                  3,
               );
            } else {
               nextNjs.value = round(distance / (2 * nextNjs.calcRtFromHjd()), 3);
            }

            break;
         }

         case 'reactionTimeMs': {
            const reactionTime = Math.max(
               parsedValue > 0 ? parsedValue / 1000 : nextNjs.calcRtFromHjd(),
               nextNjs.calcRtFromHjd(NoteJumpSpeed.HJD_MIN),
            );

            nextNjs.offset = round(reactionTime / (60 / nextNjs.bpm) - nextNjs.calcHjd(0), 3);
            break;
         }
      }

      if (!Number.isFinite(nextNjs.bpm) || nextNjs.bpm <= 0) {
         this.setInputError(name, 'BPM must exceed 0 after rounding.');
         return;
      }

      if (!Number.isFinite(nextNjs.value) || nextNjs.value <= 0) {
         this.setInputError(name, 'NJS must exceed 0 after rounding.');
         return;
      }

      const nextResults = calculateJumpResults(nextNjs);
      if (!nextResults) {
         const message =
            name === 'bpm'
               ? 'Enter a less extreme BPM.'
               : name === 'njs'
                 ? 'Enter a less extreme positive NJS.'
                 : 'Enter a less extreme value.';

         this.setInputError(name, message);
         return;
      }

      const inputsToSync = this.normalizedInputs(nextNjs, nextResults);
      const syncNames = INPUT_NAMES.filter((field) => field === name || !this.fieldErrors()[field]);

      this.fieldErrors.update((current) => ({ ...current, [name]: null }));
      this.njs.set(nextNjs);
      this.results.set(nextResults);

      this.inputs.update((current) => {
         const updated = { ...current };
         for (const field of syncNames) updated[field] = inputsToSync[field];

         return updated;
      });
   }

   protected formatNumber(value: number | null | undefined): string {
      return value !== null && value !== undefined && Number.isFinite(value) ? String(value) : '-';
   }

   private normalizedInputs(nextNjs: NoteJumpSpeed, result: JumpResults): Inputs {
      return {
         bpm: String(round(nextNjs.bpm, 3)),
         njs: String(round(nextNjs.value, 3)),
         offset: String(round(nextNjs.offset, 3)),
         hjd: String(result.hjd),
         jd: String(result.jd),
         reactionTimeMs: String(result.reactionTimeMs),
      };
   }

   private setInputError(name: InputName, message: string) {
      this.fieldErrors.update((current) => ({ ...current, [name]: message }));
   }
}
