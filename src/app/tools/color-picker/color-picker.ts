import { Component, computed, type ElementRef, signal, viewChildren } from '@angular/core';
import { ColorScheme, ColorSchemeVariant, type v2 } from 'bsmap';
import { customColors } from './custom-colors';
import { ToolSection } from '../../ui/tool-section';
import {
   colorDifferences,
   type ColorEntries,
   colorFields,
   type ColorKey,
   colorPreviewHex,
   createColorEntries,
   formatDifference,
   type JsonFormat,
   parseColorJson,
   parseHexColor,
   serializeColorOutputs,
   v4ExportWarnings,
} from './color-formats';

type BuiltInSchemeName = keyof typeof ColorScheme;

interface InvalidInput {
   value: string;
   message: string;
}

@Component({
   selector: 'app-color-picker',
   imports: [ToolSection],
   templateUrl: './color-picker.html',
   styleUrl: './color-picker.scss',
})
export class ColorPicker {
   protected readonly schemeName = signal('Custom');
   protected readonly showVariants = signal(false);
   protected readonly showOthers = signal(false);
   protected readonly activeJsonFormat = signal<JsonFormat>('custom');
   protected readonly jsonFormats = [
      { id: 'custom', label: 'Custom Data', inputId: 'cp-io-jsoncd' },
      { id: 'infoV2', label: 'V2 Info', inputId: 'cp-io-jsoninfo' },
      { id: 'infoV4', label: 'V4 Info', inputId: 'cp-io-jsoninfov4' },
   ] as const;

   private readonly jsonTabs = viewChildren<ElementRef<HTMLButtonElement>>('jsonTab');

   private readonly customEntries = signal<ColorEntries>(createColorEntries());
   protected readonly colors = signal<ColorEntries>(createColorEntries());

   // Bind rejected text so resetting to the same accepted value still updates the control.
   protected readonly hexErrors = signal<Partial<Record<ColorKey, InvalidInput>>>({});
   protected readonly jsonErrors = signal<Record<JsonFormat, InvalidInput | null>>({
      custom: null,
      infoV2: null,
      infoV4: null,
   });

   private readonly schemes = computed(() => {
      const list: Record<string, v2.IColorScheme> = {};

      for (const name of Object.keys(ColorScheme) as BuiltInSchemeName[]) {
         const scheme = ColorScheme[name];
         list[name] = scheme;

         if (!this.showVariants()) continue;

         const variants = ColorSchemeVariant[name];
         if (!variants) continue;

         for (const [variantName, variant] of Object.entries(variants)) {
            list[`${name} - ${variantName}`] = { ...scheme, ...variant };
         }
      }

      if (this.showOthers()) Object.assign(list, customColors);

      return list;
   });

   protected readonly differences = computed(() => colorDifferences(this.colors()));
   protected readonly outputs = computed(() =>
      serializeColorOutputs(this.colors(), this.schemeName()),
   );
   protected readonly v4Warnings = computed(() => v4ExportWarnings(this.colors()));
   protected readonly schemeNames = computed(() => ['Custom', ...Object.keys(this.schemes())]);

   protected readonly colorFields = colorFields;
   protected readonly colorPreviewHex = colorPreviewHex;
   protected readonly formatDifference = formatDifference;

   protected selectScheme(name: string) {
      if (name === 'Custom') {
         this.colors.set(this.customEntries());
      } else {
         const scheme = this.schemes()[name];
         if (!scheme) return;

         this.colors.set(createColorEntries(scheme));
      }

      this.hexErrors.set({});
      this.schemeName.set(name);
   }

   protected changeColor(key: ColorKey, hex: string, source: 'hex' | 'picker') {
      const value = parseHexColor(hex);
      if (!value) {
         this.hexErrors.update((errors) => ({
            ...errors,
            [key]: { value: hex, message: 'Use 6 or 8 hex digits; # is optional.' },
         }));
         return;
      }

      const alpha = this.colors()[key].value?.a;
      if (source === 'picker' && alpha !== undefined) value.a = alpha;

      this.setColor(key, { value, checked: true });
      this.clearHexError(key);
      this.markCustom();
   }

   protected importJson(text: string, format: JsonFormat) {
      try {
         const imported = parseColorJson(text, format);

         this.colors.set(imported);
         this.hexErrors.set({});
         this.markCustom();
         this.jsonErrors.update((errors) => ({ ...errors, [format]: null }));
      } catch (error) {
         this.jsonErrors.update((errors) => ({
            ...errors,
            [format]: {
               value: text,
               message: `JSON not applied: ${
                  error instanceof Error ? error.message : 'Check the JSON and try again.'
               }`,
            },
         }));
      }
   }

   protected onJsonFormatKeydown(event: KeyboardEvent, index: number) {
      let next: number;

      switch (event.key) {
         case 'ArrowRight':
            next = (index + 1) % this.jsonFormats.length;
            break;
         case 'ArrowLeft':
            next = (index - 1 + this.jsonFormats.length) % this.jsonFormats.length;
            break;
         case 'Home':
            next = 0;
            break;
         case 'End':
            next = this.jsonFormats.length - 1;
            break;
         default:
            return;
      }

      event.preventDefault();
      this.activeJsonFormat.set(this.jsonFormats[next].id);
      this.jsonTabs()[next].nativeElement.focus({ preventScroll: true });
   }

   protected toggleInclude(key: ColorKey, checked: boolean) {
      this.setColor(key, {
         value: this.colors()[key].value ?? { r: 0, g: 0, b: 0, a: 0 },
         checked,
      });

      this.markCustom();
   }

   protected resetColor(key: ColorKey) {
      this.setColor(key, { value: null, checked: false });
      this.clearHexError(key);
      this.markCustom();
   }

   protected toggleVariants(checked: boolean) {
      if (!checked && this.schemeName().includes(' - ')) this.markCustom();

      this.showVariants.set(checked);
   }

   protected toggleOthers(checked: boolean) {
      if (!checked && this.schemeName() in customColors) this.markCustom();

      this.showOthers.set(checked);
   }

   private clearHexError(key: ColorKey) {
      this.hexErrors.update((errors) => ({ ...errors, [key]: undefined }));
   }

   private setColor(key: ColorKey, entry: ColorEntries[ColorKey]) {
      this.colors.update((current) => ({ ...current, [key]: entry }));
   }

   private markCustom() {
      this.customEntries.set(this.colors());
      this.schemeName.set('Custom');
   }
}
