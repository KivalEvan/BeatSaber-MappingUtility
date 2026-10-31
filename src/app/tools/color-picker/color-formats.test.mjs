import assert from 'node:assert/strict';
import test from 'node:test';
import {
   colorFields,
   colorPreviewHex,
   createColorEntries,
   parseColorJson,
   serializeColorOutputs,
   v4ExportWarnings,
} from './color-formats.ts';

test('color imports require every RGB channel in either format', () => {
   for (const [format, key] of [
      ['custom', '_colorLeft'],
      ['infoV2', 'saberAColor'],
   ]) {
      for (const missing of ['r', 'g', 'b']) {
         const color = { r: 1, g: 0.5, b: 0 };
         delete color[missing];

         assert.throws(
            () => parseColorJson(JSON.stringify({ [key]: color }), format),
            new RegExp(`${key}\\.${missing} must be a finite number`),
         );
      }
   }
});

test('color imports reject the other format instead of clearing colors', () => {
   const color = { r: 1, g: 0, b: 0 };

   assert.throws(
      () => parseColorJson(JSON.stringify({ saberAColor: color }), 'custom'),
      /No color fields found for this format/,
   );
   assert.throws(
      () => parseColorJson(JSON.stringify({ _colorLeft: color }), 'infoV2'),
      /No color fields found for this format/,
   );
});

test('color imports still accept deliberate clearing and custom data snippets', () => {
   for (const format of ['custom', 'infoV2', 'infoV4']) {
      assert.deepEqual(parseColorJson('{}', format), createColorEntries());
   }
   assert.deepEqual(parseColorJson('{"_colorLeft": null}', 'custom'), createColorEntries());
   assert.deepEqual(
      parseColorJson('"_colorLeft": {"r": 2, "g": -1, "b": 0, "a": 0.5},', 'custom'),
      createColorEntries({
         _colorLeft: { r: 2, g: -1, b: 0, a: 0.5 },
      }),
   );
});

test('all color channels convert between Custom Data, V2 Info and V4 Info', () => {
   const source = Object.fromEntries(
      colorFields.map(({ customKey }, index) => [
         customKey,
         { r: index / 255, g: (index + 20) / 255, b: 1, a: (index + 40) / 255 },
      ]),
   );
   const entries = createColorEntries(source);
   const outputs = serializeColorOutputs(entries, 'Conversion');

   assert.equal(JSON.parse(outputs.infoV2).colorSchemeId, 'Conversion');
   const infoV4 = JSON.parse(outputs.infoV4);
   assert.equal(infoV4.colorSchemeName, 'Conversion');
   assert.equal(infoV4.overrideNotes, true);
   assert.equal(infoV4.overrideLights, true);

   for (const format of ['custom', 'infoV2', 'infoV4']) {
      const imported = parseColorJson(outputs[format], format);
      assert.deepEqual(imported, entries);

      const converted = serializeColorOutputs(imported, 'Conversion');
      assert.deepEqual(converted, outputs);
   }
});

test('V4 imports accept supported RGB and RGBA hex lengths and reject object colors', () => {
   assert.deepEqual(parseColorJson('{"saberAColor":"#f08"}', 'infoV4')._colorLeft, {
      value: { r: 1, g: 0, b: 136 / 255 },
      checked: true,
   });
   assert.deepEqual(parseColorJson('{"saberAColor":"f008"}', 'infoV4')._colorLeft, {
      value: { r: 1, g: 0, b: 0, a: 136 / 255 },
      checked: true,
   });
   assert.throws(
      () => parseColorJson('{"saberAColor":{"r":1,"g":0,"b":0}}', 'infoV4'),
      /saberAColor must be a hex color/,
   );
   assert.throws(
      () => parseColorJson('{"saberAColor":"#xyzxyz"}', 'infoV4'),
      /saberAColor must be a hex color/,
   );
});

test('V2 wrappers and V4 override flags keep disabled color values unchecked', () => {
   const color = { r: 1, g: 0, b: 0, a: 128 / 255 };
   const v2 = parseColorJson(
      JSON.stringify({ useOverride: false, colorScheme: { saberAColor: color } }),
      'infoV2',
   );
   assert.deepEqual(v2._colorLeft, { value: color, checked: false });

   const v4 = parseColorJson(
      '{"overrideNotes":false,"overrideLights":true,"saberAColor":"#ff000080","environmentColor0":"#00ff00"}',
      'infoV4',
   );
   assert.deepEqual(v4._colorLeft, v2._colorLeft);
   assert.equal(v4._envColorLeft.checked, true);

   const output = JSON.parse(serializeColorOutputs(v4, 'Disabled notes').infoV4);
   assert.equal(output.overrideNotes, false);
   assert.equal(output.overrideLights, true);
   assert.equal(output.saberAColor, '#ff000080');
   assert.deepEqual(parseColorJson(JSON.stringify(output), 'infoV4')._colorLeft, v4._colorLeft);

   assert.throws(
      () => parseColorJson('{"useOverride":"false","colorScheme":{}}', 'infoV2'),
      /useOverride must be true or false/,
   );
   assert.throws(
      () => parseColorJson('{"overrideNotes":"false","saberAColor":"#ffffff"}', 'infoV4'),
      /overrideNotes must be true or false/,
   );
});

test('V4 projection preserves canonical HDR values, alpha and per-color inclusion', () => {
   const entries = createColorEntries({
      _colorLeft: { r: 2, g: -1, b: 0.5, a: 1.5 },
      _colorRight: { r: 0.2, g: 0.4, b: 0.6, a: -0.5 },
   });
   entries._colorRight.checked = false;
   const original = structuredClone(entries);
   const outputs = serializeColorOutputs(entries, 'HDR');

   assert.deepEqual(JSON.parse(outputs.custom)._colorLeft, entries._colorLeft.value);
   assert(!Object.hasOwn(JSON.parse(outputs.custom), '_colorRight'));
   assert.deepEqual(JSON.parse(outputs.infoV2).saberAColor, entries._colorLeft.value);
   assert.equal(JSON.parse(outputs.infoV4).saberAColor, colorPreviewHex(entries._colorLeft.value));
   assert.equal(JSON.parse(outputs.infoV4).saberBColor, '#00000000');
   assert.deepEqual(entries, original);
   assert(v4ExportWarnings(entries).some((warning) => warning.includes('out-of-range alpha')));
   assert(v4ExportWarnings(entries).some((warning) => warning.includes('per-color inclusion')));

   entries._colorLeft.checked = false;
   const disabled = JSON.parse(serializeColorOutputs(entries, 'Stored').infoV4);
   assert.equal(disabled.overrideNotes, false);
   assert.equal(disabled.saberBColor, colorPreviewHex(entries._colorRight.value));
});
