import { For, createSignal } from 'solid-js';

const [idx, setIdx] = createSignal(1);
const [label, setLabel] = createSignal('');

function labelTextHandler(this: HTMLInputElement) {
   if (this.value.trim() !== '') {
      setLabel(this.value.trim());
   } else {
      setLabel('None');
   }
}

function diffCountHandler(this: HTMLInputElement, ev: Event) {
   setIdx(parseInt(this.value));
}

export default function () {
   return (
      <div id="difficulty-label">
         <h2>In-game Difficulty Label</h2>
         <div class="subpanel-center">
            <span>Difficulty Count: </span>
            <For each={[1, 2, 3, 4, 5]}>
               {(i, _) => (
                  <>
                     <input
                        type="radio"
                        id={`label-input-diff-count-${i}`}
                        name="input-diff-count"
                        value={i}
                        onChange={diffCountHandler}
                        checked={i === idx()}
                     />
                     <label for={`label-input-diff-count-${i}`}>{i}</label>
                  </>
               )}
            </For>
            <br />
            <label for="label-input-text" />
            <input type="text" id="label-input-text" value={label()} onInput={labelTextHandler} />
            <br />
            <span class={`diff-label diff-count-${idx()}`}>{label()}</span>
         </div>
         <span>This may not be representative in-game.</span>
      </div>
   );
}
