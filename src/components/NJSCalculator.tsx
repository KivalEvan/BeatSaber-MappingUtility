import { createSignal } from 'solid-js';
import { NoteJumpSpeed } from 'bsmap';
import { createStore } from 'solid-js/store';
import { round } from 'bsmap/utils';

const NJS = new NoteJumpSpeed(128, 16);
const [scaleSelect, setScaleSelect] = createSignal('hjd');
const [bpm, setBpm] = createSignal(NJS.bpm);
const [njs, setNjs] = createStore({
   value: NJS.value,
   offset: NJS.offset,
   hjd: NJS.hjd,
   jd: NJS.jd,
   minJd: NJS.calcJd(NoteJumpSpeed.HJD_MIN),
   minRt: NJS.calcRtFromHjd(NoteJumpSpeed.HJD_MIN),
   jdOpt: NJS.calcJdOptimal(),
   reactionTime: NJS.reactionTime,
});

function update() {
   setNjs('value', NJS.value);
   setNjs('offset', NJS.offset);
   setNjs('hjd', NJS.hjd);
   setNjs('jd', round(NJS.jd, 3));
   setNjs('minJd', NJS.calcJd(NoteJumpSpeed.HJD_MIN));
   setNjs('minRt', NJS.calcRtFromHjd(NoteJumpSpeed.HJD_MIN));
   setNjs('jdOpt', NJS.calcJdOptimal());
   setNjs('reactionTime', NJS.reactionTime);
}

export default function () {
   return (
      <div id="njs-calculator">
         <h2>NJS Calculator</h2>
         <div class="subpanel-small">
            <input
               type="number"
               id="njs-input-bpm"
               min="0"
               step="1"
               value={bpm()}
               onInput={(e) => {
                  setBpm(round(parseFloat(e.currentTarget.value), 3));
                  NJS.bpm = bpm();
                  update();
               }}
            />
            <label for="njs-input-bpm"> BPM</label>
            <br />
            <input
               type="number"
               class="toggle-input"
               id="njs-input-njs"
               min="0"
               step="0.25"
               value={njs.value}
               disabled={!bpm()}
               onInput={(e) => {
                  NJS.value = round(parseFloat(e.currentTarget.value), 3);
                  update();
               }}
            />
            <label for="njs-input-njs"> NJS</label>
            <br />
            <input
               type="number"
               class="toggle-input"
               id="njs-input-offset"
               step="0.125"
               value={njs.offset}
               disabled={!bpm()}
               onInput={(e) => {
                  NJS.offset = round(parseFloat(e.currentTarget.value), 3);
                  update();
               }}
            />
            <label for="njs-input-offset"> Offset</label>
            <br />
            <br />
         </div>
         <div class="subpanel-small">
            <input
               type="number"
               class="toggle-input"
               id="njs-input-hjd"
               min="0"
               step="0.25"
               value={njs.hjd}
               disabled={!bpm()}
               onInput={(e) => {
                  NJS.offset = round(
                     Math.max(Math.abs(parseFloat(e.currentTarget.value)), NoteJumpSpeed.HJD_MIN) -
                        NJS.calcHjd(0),
                     3,
                  );
                  update();
               }}
            />
            <label for="njs-input-hjd"> HJD</label>
            <br />
            <input
               type="number"
               class="toggle-input"
               id="njs-input-jd"
               min="0"
               step="0.25"
               value={njs.jd}
               disabled={!bpm()}
               onInput={(e) => {
                  let jd =
                     Math.abs(parseFloat(e.currentTarget.value)) > 0
                        ? Math.abs(parseFloat(e.currentTarget.value))
                        : NJS.jd;
                  if (scaleSelect() === 'hjd') {
                     jd = Math.max(jd, NJS.calcJd(NoteJumpSpeed.HJD_MIN));
                     NJS.offset = round(NJS.calcHjdFromJd(jd) - NJS.calcHjd(0), 3);
                  }
                  if (scaleSelect() === 'njs') {
                     NJS.value = round(jd / (2 * NJS.calcRtFromHjd()), 3);
                  }
                  update();
               }}
            />
            <label for="njs-input-jd"> JD</label>
            <br />
            <input
               type="number"
               class="toggle-input"
               id="njs-input-reacttime"
               min="0"
               step="5"
               value={round(njs.reactionTime * 1000)}
               disabled={!bpm()}
               onInput={(e) => {
                  let reactTime = Math.max(
                     Math.abs(parseFloat(e.currentTarget.value)) / 1000 > 0
                        ? Math.abs(parseFloat(e.currentTarget.value)) / 1000
                        : NJS.calcRtFromHjd(),
                     NJS.calcRtFromHjd(NoteJumpSpeed.HJD_MIN),
                  );
                  NJS.offset = round(reactTime / (60 / bpm()) - NJS.calcHjd(0), 3);
                  update();
               }}
            />
            <label for="njs-input-reacttime"> RT (ms)</label>
         </div>
         <div class="subpanel-small">
            <span>
               <b>Min. HJD: </b>
               {NoteJumpSpeed.HJD_MIN}
            </span>
            <br />
            <span>
               <b>Min. JD: </b>
               {round(njs.minJd, 3)}
            </span>
            <br />
            <span>
               <b>Min. Reaction Time: </b>
               {round(njs.minRt * 1000)}ms
            </span>
            <br />
         </div>
         <br />
         <span>
            <b>Optimal JD (lowest -|- highest): </b>
            {round(njs.jdOpt[0], 3)} -|- {round(njs.jdOpt[1], 3)}
         </span>
         <br />
         <br />
         <table>
            <thead>
               <tr>
                  <th></th>
                  <th>Time Distance</th>
                  <th>Beat Precision</th>
               </tr>
            </thead>
            <tbody>
               <tr>
                  <td class="table-first">Reverse Staircase (V/H)</td>
                  <td>{round((1.425 / njs.value - 0.0216882353) * (bpm() / 60), 3)}</td>
                  <td>{round(1 / ((1.425 / njs.value - 0.0216882353) * (bpm() / 60)), 1)}</td>
               </tr>
               <tr>
                  <td class="table-first">Reverse Staircase (Diagonal)</td>
                  <td>{round((1.425 / njs.value - 0.03414823529) * (bpm() / 60), 3)}</td>
                  <td>{round(1 / ((1.425 / njs.value - 0.03414823529) * (bpm() / 60)), 1)}</td>
               </tr>
               <tr>
                  <td class="table-first">Inline Hitbox</td>
                  <td>{round((1.425 / njs.value) * (bpm() / 60), 3)}</td>
                  <td>{round(1 / ((1.425 / njs.value) * (bpm() / 60)), 1)}</td>
               </tr>
            </tbody>
         </table>
         <span>
            <strong>Cannot be below time distance or exceed beat precision</strong>
         </span>
         <br />
         <br />
         <div>
            <label for="njs-option-njs-scale">
               <b>Jump distance scale for: </b>
            </label>
            <select
               class="toggle-input"
               id="njs-option-njs-scale"
               disabled={!bpm()}
               value={scaleSelect()}
               onChange={(e) => setScaleSelect(e.currentTarget.value)}
            >
               <option value="njs">NJS - Note Jump Speed</option>
               <option value="hjd" selected>
                  HJD - Half Jump Duration
               </option>
            </select>
            <br />
            <span>When changing jump distance, scale either HJD or NJS.</span>
         </div>
      </div>
   );
}
