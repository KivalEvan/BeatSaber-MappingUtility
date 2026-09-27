import {
   type ColorArray,
   type IColor,
   type v2,
   round,
   colorFrom,
   colorToHex,
   deltaE00,
   toColorObject,
} from 'bsmap';

interface ColorField {
   readonly customKey: keyof v2.IColorScheme;
   readonly label: string;
   readonly infoKey: Exclude<keyof v2.IInfoColorSchemeData, 'colorSchemeId'>;
}

export const colorFields = [
   { customKey: '_colorLeft', label: 'Note Left', infoKey: 'saberAColor' },
   { customKey: '_colorRight', label: 'Note Right', infoKey: 'saberBColor' },
   { customKey: '_obstacleColor', label: 'Obstacle', infoKey: 'obstaclesColor' },
   { customKey: '_envColorLeft', label: 'Light 0', infoKey: 'environmentColor0' },
   { customKey: '_envColorRight', label: 'Light 1', infoKey: 'environmentColor1' },
   { customKey: '_envColorWhite', label: 'Light W', infoKey: 'environmentColorW' },
   {
      customKey: '_envColorLeftBoost',
      label: 'Light 0 Boost',
      infoKey: 'environmentColor0Boost',
   },
   {
      customKey: '_envColorRightBoost',
      label: 'Light 1 Boost',
      infoKey: 'environmentColor1Boost',
   },
   {
      customKey: '_envColorWhiteBoost',
      label: 'Light W Boost',
      infoKey: 'environmentColorWBoost',
   },
] as const satisfies readonly ColorField[];

export type ColorKey = (typeof colorFields)[number]['customKey'];
export type ColorEntries = Record<ColorKey, ColorEntry>;
export type JsonFormat = 'custom' | 'info';

export interface ColorEntry {
   value: IColor | null;
   checked: boolean;
}

export interface ColorDifferences {
   notes: number | null;
   leftArrow: number | null;
   rightArrow: number | null;
}

export interface ColorOutputs {
   custom: string;
   info: string;
}

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

export function parseColorJson(
   text: string,
   format: JsonFormat,
): Partial<Record<ColorKey, IColor>> {
   const trimmed = text.trim();
   const value: unknown = JSON.parse(
      trimmed.startsWith('{') ? trimmed : `{${trimmed.replace(/,\s*$/, '')}}`,
   );

   if (!value || typeof value !== 'object' || Array.isArray(value)) {
      throw new Error('Enter a JSON object with color fields.');
   }

   const colors: Partial<Record<ColorKey, IColor>> = {};

   for (const { customKey, infoKey } of colorFields) {
      const name = format === 'custom' ? customKey : infoKey;
      const raw = (value as Record<string, unknown>)[name];
      if (raw == null) continue;

      if (typeof raw !== 'object' || Array.isArray(raw)) {
         throw new Error(`${name} must contain numeric r, g and b channels.`);
      }

      const channels = raw as Record<string, unknown>;
      const color: IColor = { r: 0, g: 0, b: 0 };

      for (const channel of ['r', 'g', 'b', 'a'] as const) {
         const component = channels[channel];

         if (component === undefined) continue;

         if (typeof component !== 'number' || !Number.isFinite(component)) {
            throw new Error(`${name}.${channel} must be a finite number.`);
         }

         color[channel] = component;
      }

      colors[customKey] = color;
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
   const info: v2.IInfoColorSchemeData = { colorSchemeId: schemeName, ...infoDefaults };

   for (const { customKey, infoKey } of colorFields) {
      const entry = colors[customKey];
      if (!entry.checked || !entry.value) continue;

      custom[customKey] = toColorObject(entry.value);
      info[infoKey] = toColorObject(entry.value, true);
   }

   return {
      custom: JSON.stringify(custom, null, 2),
      info: JSON.stringify(info, null, 2),
   };
}
