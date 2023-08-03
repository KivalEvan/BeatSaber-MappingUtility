import { For, Index, createSignal } from 'solid-js';
import { createStore } from 'solid-js/store';
import type { ColorSchemeName, IColorScheme } from '../bsmap/types/beatmap/shared/colorScheme';
import type { LooseAutocomplete, Nullable } from '../bsmap/types/utils';
import { ColorScheme } from '../bsmap/beatmap/shared/colorScheme';
import type { ColorArray, IColor } from '../bsmap/types/colors';
import { colorFrom, colorToHex, deltaE00, toColorObject } from '../bsmap/utils/colors';
import type { IInfoColorSchemeData } from '../bsmap/types/beatmap/v2/info';
import { round } from '../bsmap/utils/math';
import { myCustomColor } from '../data/customColor';
import { deepCopy } from '../bsmap/utils/misc';

let schemeList: { [key: string]: IColorScheme } = { ...ColorScheme, Custom: {} };
const [schName, setSchName] = createSignal('Custom');
const [schList, setSchList] = createStore<LooseAutocomplete<ColorSchemeName>[]>(
   ['Custom'].concat(Object.keys(schemeList)),
);
const [colorSch, setColorSch] = createStore<{
   [k in keyof IColorScheme]: { readonly name: string; value: IColor | null; checked: boolean };
}>({
   _colorLeft: { name: 'Note L', value: null, checked: false },
   _colorRight: { name: 'Note R', value: null, checked: false },
   _envColorLeft: { name: 'Light L', value: null, checked: false },
   _envColorRight: { name: 'Light R', value: null, checked: false },
   _envColorWhite: { name: 'Light W', value: null, checked: false },
   _envColorLeftBoost: { name: 'Light L Boost', value: null, checked: false },
   _envColorRightBoost: { name: 'Light R Boost', value: null, checked: false },
   _envColorWhiteBoost: { name: 'Light W Boost', value: null, checked: false },
   _obstacleColor: { name: 'Obstacle', value: null, checked: false },
});
const [jsonCd, setJsonCd] = createStore<Nullable<IColorScheme>>({
   _colorLeft: null,
   _colorRight: null,
   _envColorLeft: null,
   _envColorRight: null,
   _envColorWhite: null,
   _envColorLeftBoost: null,
   _envColorRightBoost: null,
   _envColorWhiteBoost: null,
   _obstacleColor: null,
});
const [jsonInfo, setJsonInfo] = createStore<{
   [k in keyof IInfoColorSchemeData]: IInfoColorSchemeData[k] | null;
}>({
   colorSchemeId: '',
   saberAColor: { r: 0, g: 0, b: 0, a: 0 },
   saberBColor: { r: 0, g: 0, b: 0, a: 0 },
   environmentColor0: { r: 0, g: 0, b: 0, a: 0 },
   environmentColor1: { r: 0, g: 0, b: 0, a: 0 },
   environmentColorW: null,
   obstaclesColor: { r: 0, g: 0, b: 0, a: 0 },
   environmentColor0Boost: { r: 0, g: 0, b: 0, a: 0 },
   environmentColor1Boost: { r: 0, g: 0, b: 0, a: 0 },
   environmentColorWBoost: null,
});
const cdInfoMap = {
   _colorLeft: 'saberAColor',
   _colorRight: 'saberBColor',
   _envColorLeft: 'environmentColor0',
   _envColorRight: 'environmentColor1',
   _envColorWhite: 'environmentColorW',
   _envColorLeftBoost: 'environmentColor0Boost',
   _envColorRightBoost: 'environmentColor1Boost',
   _envColorWhiteBoost: 'environmentColorWBoost',
   _obstacleColor: 'obstaclesColor',
} as const;
const infoCdMap = {
   saberAColor: '_colorLeft',
   saberBColor: '_colorRight',
   environmentColor0: '_envColorLeft',
   environmentColor1: '_envColorRight',
   environmentColorW: '_envColorWhite',
   environmentColor0Boost: '_envColorLeftBoost',
   environmentColor1Boost: '_envColorRightBoost',
   environmentColorWBoost: '_envColorWhiteBoost',
   obstaclesColor: '_obstacleColor',
} as const;
const [dENote, setDENote] = createSignal<number | null>(null);
const [dEArrowL, setDEArrowL] = createSignal<number | null>(null);
const [dEArrowR, setDEArrowR] = createSignal<number | null>(null);
const [msgErr, setMsgErr] = createSignal('');

function showCustomHandler(this: HTMLInputElement) {
   schemeList = { ...ColorScheme, Custom: schemeList.Custom };
   if (this.checked) {
      schemeList = { ...schemeList, ...myCustomColor };
   }
   setSchList(['Custom'].concat(Object.keys(schemeList)));
}

function colorSchemeHandler(this: HTMLOptionElement) {
   resetAll();
   let sch = schemeList[this.value];
   if (!sch) {
      return;
   }
   sch = deepCopy(sch);
   setSchName(this.value);
   for (const key in sch) {
      const k = key as keyof IColorScheme;
      setColorSch(k, 'value', sch[k]!);
      setColorSch(k, 'checked', true);
   }
   updateDeltaE();
   updateColorJSON();
}

function jsonCdHandler(this: HTMLTextAreaElement) {
   resetAll();
   setMsgErr('');
   const colorType: (keyof IColorScheme)[] = [
      '_colorLeft',
      '_colorRight',
      '_envColorLeft',
      '_envColorRight',
      '_envColorWhite',
      '_envColorLeftBoost',
      '_envColorRightBoost',
      '_envColorWhiteBoost',
      '_obstacleColor',
   ];

   let parsedJson: Nullable<IColorScheme> = {};
   try {
      if (/^{/.test(this.value.trim())) {
         parsedJson = JSON.parse(this.value.trim());
      } else {
         parsedJson = JSON.parse(`{${this.value.trim().replace(/\,$/, '')}}`);
      }
   } catch (err) {
      console.error(err);
      setMsgErr(err instanceof Error ? err.message : 'Unhandled Exception');
      return;
   }
   for (const key in parsedJson) {
      const k = key as keyof IColorScheme;
      if (colorType.includes(k)) {
         const p = parsedJson[k];
         if (!p) continue;
         const color: IColor = {
            r: p.r ?? 0,
            g: p.g ?? 0,
            b: p.b ?? 0,
         };
         if (typeof p.a === 'number') color.a = p.a!;
         setColorSch(k, 'value', color);
         setColorSch(k, 'checked', true);
      }
   }
   setCustom();
   updateDeltaE();
   updateColorJSON();
}

function jsonInfoHandler(this: HTMLTextAreaElement) {
   resetAll();
   setMsgErr('');
   const colorType: (keyof IInfoColorSchemeData)[] = [
      'saberAColor',
      'saberBColor',
      'environmentColor0',
      'environmentColor1',
      'environmentColorW',
      'obstaclesColor',
      'environmentColor0Boost',
      'environmentColor1Boost',
      'environmentColorWBoost',
   ];

   let parsedJson: Nullable<IInfoColorSchemeData> = {};
   try {
      if (/^{/.test(this.value.trim())) {
         parsedJson = JSON.parse(this.value.trim());
      } else {
         parsedJson = JSON.parse(`{${this.value.trim().replace(/\,$/, '')}}`);
      }
   } catch (err) {
      console.error(err);
      setMsgErr(err instanceof Error ? err.message : 'Unhandled Exception');
      return;
   }
   for (const key in parsedJson) {
      const k = key as keyof Omit<IInfoColorSchemeData, 'colorSchemeId'>;
      if (colorType.includes(k)) {
         const p = parsedJson[k];
         if (!p || typeof p === 'string') continue;
         const color: IColor = {
            r: p.r ?? 0,
            g: p.g ?? 0,
            b: p.b ?? 0,
         };
         if (typeof p.a === 'number') color.a = p.a!;
         setColorSch(infoCdMap[k], 'value', color);
         setColorSch(infoCdMap[k], 'checked', true);
      }
   }
   setCustom();
   updateDeltaE();
   updateColorJSON();
}

function colorHexHandler(this: HTMLInputElement) {
   const objName = this.name as keyof IColorScheme;
   const str = this.value.trim();
   if (/^\#?[0-9a-fA-F]{6,8}/.test(str)) {
   }
   const colorHex = str.replace(/^\#?/, '#').slice(0, 9);
   const color = colorFrom(colorHex);
   setColorSch(objName, 'value', toColorObject(color));
   setColorSch(objName, 'checked', true);
   setCustom();
   updateDeltaE();
   updateColorJSON();
}

function colorPickerHandler(this: HTMLInputElement) {
   const objName = this.name as keyof IColorScheme;
   const color = colorFrom(this.value);
   setColorSch(objName, 'value', toColorObject(color));
   setColorSch(objName, 'checked', true);
   setCustom();
   updateDeltaE();
   updateColorJSON();
}

function includeHandler(this: HTMLInputElement) {
   const objName = this.name as keyof IColorScheme;
   setColorSch(objName, 'value', colorSch[objName]?.value ?? { r: 0, g: 0, b: 0, a: 0 });
   setColorSch(objName, 'checked', this.checked);
   setCustom();
   updateDeltaE();
   updateColorJSON();
}

function resetHandler(this: HTMLInputElement, ev: Event) {
   const objName = this.name as keyof IColorScheme;
   setColorSch(objName, 'value', null);
   setColorSch(objName, 'checked', false);
   setCustom();
   updateDeltaE();
   updateColorJSON();
}

function updateDeltaE() {
   const noteLeft = colorSch._colorLeft?.value;
   const noteRight = colorSch._colorRight?.value;
   const arrowColor: ColorArray = [1, 1, 1];
   if (noteLeft) {
      setDEArrowL(deltaE00(colorFrom(noteLeft), arrowColor));
   } else {
      setDEArrowL(null);
   }
   if (noteRight) {
      setDEArrowR(deltaE00(colorFrom(noteRight), arrowColor));
   } else {
      setDEArrowR(null);
   }
   if (noteLeft && noteRight) {
      setDENote(deltaE00(colorFrom(noteLeft), colorFrom(noteRight)));
   } else {
      setDENote(null);
   }
}

function updateColorJSON() {
   for (const key in colorSch) {
      const k = key as keyof IColorScheme;
      if (colorSch[k]!.checked && colorSch[k]!.value) {
         setJsonCd(k, toColorObject(colorSch[k]!.value!));
         setJsonInfo(cdInfoMap[k], toColorObject(colorSch[k]!.value!, true));
      } else {
         setJsonCd(k, null);
         switch (k) {
            case '_colorLeft':
            case '_colorRight':
            case '_envColorLeft':
            case '_envColorRight':
            case '_obstacleColor':
            case '_envColorLeftBoost':
            case '_envColorRightBoost':
               setJsonInfo(cdInfoMap[k], { r: 0, g: 0, b: 0, a: 0 });
               break;
            case '_envColorWhite':
            case '_envColorWhiteBoost':
               setJsonInfo(cdInfoMap[k], null);
               break;
         }
      }
   }
}

function formatJson(data: Record<string, any>): string {
   return JSON.stringify(
      Object.entries(data).reduce(
         (p, v) => {
            if (v[1] !== null) p[v[0]] = v[1];
            if (v[0] === 'colorSchemeId') p[v[0]] = schName();
            return p;
         },
         {} as Record<string, any>,
      ),
      null,
      2,
   );
}

function setCustom() {
   for (const key in colorSch) {
      const k = key as keyof IColorScheme;
      if (colorSch[k]!.value) {
         schemeList['Custom'][k] = colorSch[k]!.value!;
      } else {
         delete schemeList['Custom'][k];
      }
   }
   setSchName('Custom');
}

function resetAll() {
   for (const key in colorSch) {
      const k = key as keyof IColorScheme;
      setColorSch(k, 'value', null);
      setColorSch(k, 'checked', false);
   }
}

export default function () {
   return (
      <div id="color-picker">
         <h2>Color Picker</h2>
         <label for="cp-option-colorscheme">
            <b>Color Scheme: </b>
         </label>
         <select id="cp-option-colorscheme" onChange={colorSchemeHandler}>
            <For each={schList}>
               {(sch) => (
                  <option value={sch} selected={sch === schName()}>
                     {sch}
                  </option>
               )}
            </For>
         </select>
         <br></br>
         <input type="checkbox" id="cp-show-custom" onChange={showCustomHandler} />
         <label for="cp-show-custom">Show others</label>
         <table>
            <thead>
               <tr>
                  <th></th>
                  <th>Hex</th>
                  <th>Color Picker</th>
                  <th>Include</th>
               </tr>
            </thead>
            <tbody>
               <Index each={Object.entries(colorSch)}>
                  {(sch, _) => (
                     <tr>
                        <td class="table-first">{sch()[1].name}</td>
                        <td>
                           <input
                              type="text"
                              class="table-input"
                              name={sch()[0]}
                              value={sch()[1].value ? colorToHex(sch()[1].value!) : ''}
                              onChange={colorHexHandler}
                           />
                        </td>
                        <td>
                           <input
                              type="color"
                              class="table-input"
                              name={sch()[0]}
                              value={sch()[1].value ? colorToHex(sch()[1].value!).slice(0, 7) : ''}
                              onChange={colorPickerHandler}
                           />
                        </td>
                        <td>
                           <input
                              type="checkbox"
                              name={sch()[0]}
                              checked={sch()[1].checked}
                              onChange={includeHandler}
                           />
                           <input
                              type="button"
                              name={sch()[0]}
                              value="Reset"
                              onClick={resetHandler}
                              disabled={sch()[1].value === null}
                           />
                        </td>
                     </tr>
                  )}
               </Index>
            </tbody>
         </table>
         <div>
            <br />
            <span>
               <b>Note colour similarity (dE): </b>
               {dENote() ? round(dENote()!, 2) : 'N/A'}
            </span>
            <br />
            <span>
               <b>Left arrow similarity (dE): </b>
               {dEArrowL() ? round(dEArrowL()!, 2) : 'N/A'}
            </span>
            <br />
            <span>
               <b>Right arrow similarity (dE): </b>
               {dEArrowR() ? round(dEArrowR()!, 2) : 'N/A'}
            </span>
            <br />
            <br />
            <span>Lower dE is similar colour, higher dE is opposite colour.</span>
            <br />
            <br />
         </div>
         <table>
            <thead>
               <tr>
                  <th>
                     <label for="cp-io-jsoncd">Custom Data Format</label>
                  </th>
                  <th>
                     <label for="cp-io-jsoninfo">Info Format</label>
                  </th>
               </tr>
            </thead>
            <tbody>
               <tr>
                  <td>
                     <textarea
                        id="cp-io-jsoncd"
                        rows="16"
                        value={formatJson(jsonCd)}
                        onChange={jsonCdHandler}
                     />
                  </td>
                  <td>
                     <textarea
                        id="cp-io-jsoninfo"
                        rows="16"
                        value={formatJson(jsonInfo)}
                        onChange={jsonInfoHandler}
                     />
                  </td>
               </tr>
            </tbody>
         </table>
         <span class="msg-error">{msgErr()}</span>
         <p>Copy the JSON to respective location.</p>
      </div>
   );
}
