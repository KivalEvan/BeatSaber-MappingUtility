import { createSignal } from 'solid-js';
import { createStore } from 'solid-js/store';
import { round } from 'bsmap/utils';

const [bpm, setBpm] = createSignal(128);
const [ebpm, setEbpm] = createStore({
   precBeat: 2,
   precTime: 0,
   precRealTime: 0,
   ebpmOhj: 0,
   ebpmStream: 0,
});
update();

function precBeatHandler(this: HTMLInputElement, ev: Event) {
   setEbpm('precBeat', this.valueAsNumber);
   update();
}
function precTimeHandler(this: HTMLInputElement) {
   setEbpm('precBeat', 1 / this.valueAsNumber);
   update();
}
function precRealTimeHandler(this: HTMLInputElement) {
   setEbpm('precBeat', 1 / ((bpm() * this.valueAsNumber) / 60000));
   update();
}
function ebpmStreamHandler(this: HTMLInputElement) {
   setEbpm('ebpmStream', this.valueAsNumber);
   setEbpm('precBeat', calcBeatPrecision());
   update();
}
function ebpmOhjHandler(this: HTMLInputElement) {
   setEbpm('ebpmStream', this.valueAsNumber / 2);
   setEbpm('precBeat', calcBeatPrecision());
   update();
}

function update(): void {
   setEbpm('precTime', 1 / ebpm.precBeat);
   setEbpm('precRealTime', (60 / bpm() / ebpm.precBeat) * 1000);
   setEbpm('ebpmOhj', calcEffectiveBPM());
   setEbpm('ebpmStream', ebpm.ebpmOhj / 2);
}
function calcEffectiveBPM() {
   return (bpm() * 0.5) / (1 / ebpm.precBeat);
}
function calcBeatPrecision() {
   return ebpm.ebpmStream / (bpm() * 0.25);
}

export default function () {
   return (
      <div id="ebpm-precision">
         <h2>Effective BPM & Time Precision</h2>
         <div class="subpanel-medium">
            <input
               type="number"
               id="ebpm-input-bpm"
               min="0"
               step="1"
               value={bpm()}
               onInput={(e) => {
                  setBpm(parseFloat(e.currentTarget.value));
                  update();
               }}
            />
            <label for="ebpm-input-bpm"> BPM</label>
            <br />1 /{' '}
            <input
               type="number"
               class="toggle-input"
               id="ebpm-input-precbeat"
               min="1"
               step="1"
               value={round(ebpm.precBeat, 3)}
               disabled={!bpm()}
               onInput={precBeatHandler}
            />
            <label for="ebpm-input-precbeat"> Beat Precision</label>
            <br />
            <input
               type="number"
               class="toggle-input"
               id="ebpm-input-prectime"
               min="0"
               step="0.125"
               value={round(ebpm.precTime, 3)}
               disabled={!bpm()}
               onInput={precTimeHandler}
            />
            <label for="ebpm-input-prectime"> Time Distance</label>
            <br />
            <input
               type="number"
               class="toggle-input"
               id="ebpm-input-precrealtime"
               min="0"
               step="1"
               value={round(ebpm.precRealTime, 3)}
               disabled={!bpm()}
               onInput={precRealTimeHandler}
            />
            <label for="ebpm-input-precrealtime"> Real-time (ms)</label>
            <br />
         </div>
         <div class="subpanel-medium">
            <span>
               <b>Effective BPM:</b>
            </span>
            <br />
            <input
               type="number"
               class="toggle-input"
               id="ebpm-input-ebpm-ohj"
               min="0"
               step="1"
               value={round(ebpm.ebpmOhj, 3)}
               disabled={!bpm()}
               onInput={ebpmOhjHandler}
            />
            <label for="ebpm-input-ebpm-ohj"> (One-handed Jump)</label>
            <br />
            <input
               type="number"
               class="toggle-input"
               id="ebpm-input-ebpm-stream"
               min="0"
               step="1"
               value={round(ebpm.ebpmStream, 3)}
               disabled={!bpm()}
               onInput={ebpmStreamHandler}
            />
            <label for="ebpm-input-ebpm-stream"> (Alternating Note Stream)</label>
         </div>
      </div>
   );
}
