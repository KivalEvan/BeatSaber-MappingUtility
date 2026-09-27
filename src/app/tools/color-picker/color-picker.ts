import { Component, computed, signal } from '@angular/core';
import { ColorScheme, ColorSchemeVariant, type v2 } from 'bsmap';
import { customColors } from './custom-colors';
import { ToolSection } from '../../ui/tool-section';
import {
   colorDifferences,
   colorFields,
   colorPreviewHex,
   createColorEntries,
   formatDifference,
   parseColorJson,
   parseHexColor,
   serializeColorOutputs,
   type ColorEntries,
   type ColorKey,
   type JsonFormat,
} from './color-formats';

type BuiltInSchemeName = keyof typeof ColorScheme;

interface InvalidInput {
   value: string;
   message: string;
}

interface JsonErrors {
   custom: InvalidInput | null;
   info: InvalidInput | null;
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

   private readonly customScheme = signal<v2.IColorScheme>({});
   protected readonly colors = signal<ColorEntries>(createColorEntries());

   // Bind rejected text so resetting to the same accepted value still updates the control.
   protected readonly hexErrors = signal<Partial<Record<ColorKey, InvalidInput>>>({});
   protected readonly jsonErrors = signal<JsonErrors>({
      custom: null,
      info: null,
   });

   private readonly schemes = computed(() => {
      const list: Record<string, v2.IColorScheme> = { Custom: this.customScheme() };

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
   protected readonly schemeNames = computed(() => Object.keys(this.schemes()));

   protected readonly colorFields = colorFields;
   protected readonly colorPreviewHex = colorPreviewHex;
   protected readonly formatDifference = formatDifference;

   protected selectScheme(name: string) {
      const scheme = this.schemes()[name];
      if (!scheme) return;

      this.colors.set(createColorEntries(scheme));
      this.hexErrors.set({});
      this.schemeName.set(name);
   }

   protected changeHex(key: ColorKey, hex: string) {
      const value = parseHexColor(hex);
      if (!value) {
         this.hexErrors.update((errors) => ({
            ...errors,
            [key]: { value: hex, message: 'Use 6 or 8 hex digits; # is optional.' },
         }));
         return;
      }

      this.setColor(key, { value, checked: true });
      this.clearHexError(key);
      this.markCustom();
   }

   protected importJson(text: string, format: JsonFormat) {
      try {
         const imported = parseColorJson(text, format);

         this.colors.set(createColorEntries(imported));
         this.hexErrors.set({});
         this.markCustom();
         this.jsonErrors.update((errors) => ({ ...errors, [format]: null }));
      } catch (error) {
         this.jsonErrors.update((errors) => ({
            ...errors,
            [format]: {
               value: text,
               message: `${format === 'custom' ? 'Custom data' : 'Info'} JSON not applied: ${error instanceof Error ? error.message : 'Check the JSON and try again.'}`,
            },
         }));
      }
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
      const scheme: v2.IColorScheme = {};

      for (const { customKey } of colorFields) {
         const entry = this.colors()[customKey];
         if (entry.checked && entry.value) scheme[customKey] = entry.value;
      }

      this.customScheme.set(scheme);
      this.schemeName.set('Custom');
   }
}
