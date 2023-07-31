import { Index, createSignal } from 'solid-js';
import { createStore } from 'solid-js/store';
import { round } from '../bsmap/utils/math';

type DifficultyName = 'Easy' | 'Normal' | 'Hard' | 'Expert' | 'Expert+';
interface DiffSPS {
   name: DifficultyName;
   value: number | null;
   drop: number | null;
}

const [difficulties, setDifficulties] = createStore(
   (['Easy', 'Normal', 'Hard', 'Expert', 'Expert+'] as DifficultyName[]).reduce((p, v) => {
      p.push({ name: v, value: null, drop: null });
      return p;
   }, [] as DiffSPS[]),
);
const [total, setTotal] = createSignal(0);

function calcDifference(data: DiffSPS, compareTo: DiffSPS): number {
   return (1 - compareTo.value! / data.value!) * 100;
}

function getTotalReduction(): number {
   let highest!: number;
   let lowest!: number;
   for (const d of difficulties) {
      if (d.value !== null) {
         if (!highest || highest < d.value) {
            highest = d.value;
         }
         if (!lowest || lowest > d.value) {
            lowest = d.value;
         }
      }
   }
   return highest || (highest && lowest) ? (1 - lowest / highest) * 100 : 0;
}

function inputSPSHandler(this: HTMLInputElement, ev: Event) {
   const idx = parseInt(this.name);
   const value = this.value ? round(Math.abs(parseFloat(this.value.trim())), 2) : 0;
   this.value = value.toString();
   setDifficulties(idx, 'value', value);
   let prevIdx: number | null = null;
   for (const id in difficulties) {
      const i = parseInt(id);
      const d = difficulties[i];
      if (d.value !== null) {
         if (prevIdx !== null) {
            const prevDiff = difficulties[prevIdx];
            setDifficulties(prevIdx, 'drop', prevDiff.value ? calcDifference(d, prevDiff) : null);
         }
      }
      setDifficulties(i, 'drop', null);
      prevIdx = i;
   }
   setTotal(getTotalReduction());
}

export default function () {
   return (
      <div id="sps-difference">
         <h2>SPS Difference</h2>
         <table>
            <thead>
               <tr>
                  <Index each={difficulties}>
                     {(diff, i) => (
                        <th>
                           <label for={`sps-input-${diff().name}`}>{diff().name}</label>
                        </th>
                     )}
                  </Index>
               </tr>
            </thead>
            <tbody>
               <tr>
                  <Index each={difficulties}>
                     {(diff, i) => (
                        <td>
                           <input
                              type="number"
                              class="table-input"
                              id={`sps-input-${diff().name}`}
                              name={i.toString()}
                              value={diff().value ? diff().value! : ''}
                              min="0"
                              step="0.1"
                              onChange={inputSPSHandler}
                           />
                        </td>
                     )}
                  </Index>
               </tr>
               <tr>
                  <Index each={difficulties}>
                     {(diff, i) => (
                        <td>{diff().drop !== null ? diff().drop!.toFixed(2) + '%' : ''}</td>
                     )}
                  </Index>
               </tr>
            </tbody>
         </table>
         <span>
            <b>Total Reduction: </b>
            {total().toFixed(2)}%
         </span>
         <br />
         <span>Also works for NPS or any kind of number too.</span>
      </div>
   );
}
