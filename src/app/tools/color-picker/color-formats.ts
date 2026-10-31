import {
   type ColorArray,
   colorFrom,
   colorToHex,
   deltaE00,
   type IColor,
   round,
   toColorObject,
   type v2,
   type v4,
} from 'bsmap';

interface ColorField {
   readonly customKey: keyof v2.IColorScheme;
   readonly label: string;
   readonly infoKey: Exclude<keyof v2.IInfoColorSchemeData, 'colorSchemeId'>;
   readonly overrideKey: 'overrideNotes' | 'overrideLights';
}

export const colorFields = [
   {
      customKey: '_colorLeft',
      label: 'Note Left',
      infoKey: 'saberAColor',
      overrideKey: 'overrideNotes',
   },
   {
      customKey: '_colorRight',
      label: 'Note Right',
      infoKey: 'saberBColor',
      overrideKey: 'overrideNotes',
   },
   {
      customKey: '_obstacleColor',
      label: 'Obstacle',
      infoKey: 'obstaclesColor',
      overrideKey: 'overrideNotes',
   },
   {
      customKey: '_envColorLeft',
      label: 'Light 0',
      infoKey: 'environmentColor0',
      overrideKey: 'overrideLights',
   },
   {
      customKey: '_envColorRight',
      label: 'Light 1',
      infoKey: 'environmentColor1',
      overrideKey: 'overrideLights',
   },
   {
      customKey: '_envColorWhite',
      label: 'Light W',
      infoKey: 'environmentColorW',
      overrideKey: 'overrideLights',
   },
   {
      customKey: '_envColorLeftBoost',
      label: 'Light 0 Boost',
      infoKey: 'environmentColor0Boost',
      overrideKey: 'overrideLights',
   },
   {
      customKey: '_envColorRightBoost',
      label: 'Light 1 Boost',
      infoKey: 'environmentColor1Boost',
      overrideKey: 'overrideLights',
   },
   {
      customKey: '_envColorWhiteBoost',
      label: 'Light W Boost',
      infoKey: 'environmentColorWBoost',
      overrideKey: 'overrideLights',
   },
] as const satisfies readonly ColorField[];

export type ColorKey = (typeof colorFields)[number]['customKey'];
export type ColorEntries = Record<ColorKey, ColorEntry>;
export type JsonFormat = 'custom' | 'infoV2' | 'infoV4';

export interface ColorEntry {
   value: IColor | null;
   checked: boolean;
}

export interface ColorDifferences {
   notes: number | null;
   leftArrow: number | null;
   rightArrow: number | null;
}

export type ColorOutputs = Record<JsonFormat, string>;

const infoDefaults: Omit<v2.IInfoColorSchemeData, 'colorSchemeId'> = {
   saberAColor: { r: 0, g: 0, b: 0, a: 0 },
   saberBColor: { r: 0, g: 0, b: 0, a: 0 },
   obstaclesColor: { r: 0, g: 0, b: 0, a: 0 },
   environmentColor0: { r: 0, g: 0, b: 0, a: 0 },
   environmentColor1: { r: 0, g: 0, b: 0, a: 0 },
   environmentColor0Boost: { r: 0, g: 0, b: 0, a: 0 },
   environmentColor1Boost: { r: 0, g: 0, b: 0, a: 0 },
};

/** Creates editable entries, including only the provided colors in exports. */
export function createColorEntries(source: Partial<Record<ColorKey, IColor>> = {}): ColorEntries {
   return Object.fromEntries(
      colorFields.map(({ customKey }) => {
         const value = source[customKey] ?? null;

         return [customKey, { value, checked: value !== null }];
      }),
   ) as ColorEntries;
}

export function colorPreviewHex(color: IColor): string {
   // Hex controls cannot represent negative or HDR channels; project only the preview.
   const red = Math.max(0, color.r);
   const green = Math.max(0, color.g);
   const blue = Math.max(0, color.b);
   const scale = Math.max(1, red, green, blue);

   const preview: IColor = { r: red / scale, g: green / scale, b: blue / scale };
   if (color.a !== undefined) preview.a = Math.min(1, Math.max(0, color.a));

   return colorToHex(preview);
}

export function parseHexColor(hex: string): IColor | null {
   const trimmed = hex.trim();
   if (!/^#?(?:[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(trimmed)) return null;

   return toColorObject(colorFrom(`#${trimmed.replace(/^#/, '')}`));
}

export function parseColorJson(text: string, format: JsonFormat): ColorEntries {
   const trimmed = text.trim();
   const value: unknown = JSON.parse(
      trimmed.startsWith('{') ? trimmed : `{${trimmed.replace(/,\s*$/, '')}}`,
   );

   if (!value || typeof value !== 'object' || Array.isArray(value)) {
      throw new Error('Enter a JSON object with color fields.');
   }

   let fields = value as Record<string, unknown>;
   let useOverride = true;

   if (format === 'infoV2' && Object.hasOwn(fields, 'colorScheme')) {
      const scheme = fields['colorScheme'];
      if (!scheme || typeof scheme !== 'object' || Array.isArray(scheme)) {
         throw new Error('colorScheme must be a JSON object.');
      }
      if (typeof fields['useOverride'] !== 'boolean') {
         throw new Error('useOverride must be true or false.');
      }

      useOverride = fields['useOverride'];
      fields = scheme as Record<string, unknown>;
   }

   if (format === 'infoV4') {
      for (const key of ['overrideNotes', 'overrideLights'] as const) {
         if (Object.hasOwn(fields, key) && typeof fields[key] !== 'boolean') {
            throw new Error(`${key} must be true or false.`);
         }
      }
   }

   const colors = createColorEntries();
   let hasColorField = false;

   for (const { customKey, infoKey, overrideKey } of colorFields) {
      const name = format === 'custom' ? customKey : infoKey;
      if (!Object.hasOwn(fields, name)) continue;
      hasColorField = true;

      const raw = fields[name];
      if (raw == null) continue;

      let color: IColor;
      if (format === 'infoV4') {
         if (
            typeof raw !== 'string' ||
            !/^#?(?:[\da-f]{3,4}|[\da-f]{6}|[\da-f]{8})$/i.test(raw.trim())
         ) {
            throw new Error(`${name} must be a hex color with 3, 4, 6 or 8 digits.`);
         }

         color = toColorObject(colorFrom(`#${raw.trim().replace(/^#/, '')}`));
      } else {
         if (typeof raw !== 'object' || Array.isArray(raw)) {
            throw new Error(`${name} must contain numeric r, g and b channels.`);
         }

         const channels = raw as Record<string, unknown>;
         color = { r: 0, g: 0, b: 0 };

         for (const channel of ['r', 'g', 'b', 'a'] as const) {
            const component = channels[channel];

            if (channel === 'a' && component === undefined) continue;

            if (typeof component !== 'number' || !Number.isFinite(component)) {
               throw new Error(`${name}.${channel} must be a finite number.`);
            }

            color[channel] = component;
         }
      }

      colors[customKey] = {
         value: color,
         // V4.0.0 omitted these flags and enabled both override groups.
         checked: useOverride && (format !== 'infoV4' || fields[overrideKey] !== false),
      };
   }

   if (!hasColorField && Object.keys(fields).length > 0) {
      throw new Error('No color fields found for this format.');
   }

   return colors;
}

export function colorDifferences(colors: ColorEntries): ColorDifferences {
   const left = colors._colorLeft.value;
   const right = colors._colorRight.value;
   const white: ColorArray = [1, 1, 1];

   return {
      notes: left && right ? deltaE00(colorFrom(left), colorFrom(right)) : null,
      leftArrow: left ? deltaE00(colorFrom(left), white) : null,
      rightArrow: right ? deltaE00(colorFrom(right), white) : null,
   };
}

export function formatDifference(value: number | null) {
   return value === null || !Number.isFinite(value) ? 'N/A' : round(value, 2);
}

export function serializeColorOutputs(colors: ColorEntries, schemeName: string): ColorOutputs {
   const custom: Partial<v2.IColorScheme> = {};
   const infoV2: v2.IInfoColorSchemeData = {
      colorSchemeId: schemeName,
      ...infoDefaults,
   };
   const infoV4: v4.IInfoColorScheme = {
      colorSchemeName: schemeName,
      overrideNotes: false,
      overrideLights: false,
      saberAColor: '#00000000',
      saberBColor: '#00000000',
      obstaclesColor: '#00000000',
      environmentColor0: '#00000000',
      environmentColor1: '#00000000',
      environmentColor0Boost: '#00000000',
      environmentColor1Boost: '#00000000',
   };

   for (const { customKey, overrideKey } of colorFields) {
      const entry = colors[customKey];
      if (entry.checked && entry.value) infoV4[overrideKey] = true;
   }

   for (const { customKey, infoKey, overrideKey } of colorFields) {
      const entry = colors[customKey];
      if (!entry.value) continue;

      if (entry.checked) {
         custom[customKey] = toColorObject(entry.value);
         infoV2[infoKey] = toColorObject(entry.value, true);
      }

      // Disabled V4 groups can retain their stored colors without applying them.
      if (entry.checked || !infoV4[overrideKey]) {
         infoV4[infoKey] = colorPreviewHex(entry.value);
      }
   }

   return {
      custom: JSON.stringify(custom, null, 2),
      infoV2: JSON.stringify(infoV2, null, 2),
      infoV4: JSON.stringify(infoV4, null, 2),
   };
}

export function v4ExportWarnings(colors: ColorEntries): string[] {
   const enabledGroups = new Set(
      colorFields
         .filter(({ customKey }) => colors[customKey].checked && colors[customKey].value)
         .map(({ overrideKey }) => overrideKey),
   );
   const warnings: string[] = [];

   if (
      colorFields.some(({ customKey, overrideKey }) => {
         const entry = colors[customKey];
         return (
            entry.value &&
            (entry.checked || !enabledGroups.has(overrideKey)) &&
            Object.values(entry.value).some((channel) => channel < 0 || channel > 1)
         );
      })
   ) {
      warnings.push(
         'V4 hex cannot retain HDR, negative, or out-of-range alpha values. Original values stay in the editor.',
      );
   }

   if (
      colorFields.some(({ customKey, infoKey, overrideKey }) => {
         const entry = colors[customKey];
         return (
            !entry.checked &&
            enabledGroups.has(overrideKey) &&
            (Object.hasOwn(infoDefaults, infoKey) || entry.value !== null)
         );
      })
   ) {
      warnings.push(
         'V4 overrides notes and lights by group; use Custom Data for per-color inclusion.',
      );
   }

   return warnings;
}
