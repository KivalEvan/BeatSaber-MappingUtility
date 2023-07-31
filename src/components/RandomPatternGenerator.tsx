import { For } from 'solid-js';
import { createStore } from 'solid-js/store';

const noteImage: { [key: string]: string } = {
   0: 'noter.svg',
   1: 'noteb.svg',
   2: 'bomb.png',
   3: 'noterd.svg',
   4: 'notebd.svg',
};
const noteRotation: { [key: string]: string } = {
   0: '',
   1: 'deg180',
   2: 'deg270',
   3: 'deg90',
   4: 'deg315',
   5: 'deg45',
   6: 'deg225',
   7: 'deg135',
   8: '',
};

interface ParityRotation {
   0: { [key: number]: number[] };
   1: { [key: number]: number[] };
   [key: number]: { [key: number]: number[] };
}

const [rpg, setRpg] = createStore({
   row: 3,
   column: 4,
   noteRed: 1,
   noteBlue: 1,
   noteBomb: 0,
   noDot: false,
   limit: false,
   total: 2,
   parity: false,
   parityExtend: 0,
   parityRed: false,
   parityBlue: false,
});
const [grid, setGrid] = createStore<({ _noteType: number; _noteDirection: number } | null)[]>(
   new Array(rpg.row * rpg.column),
);

function createValidParity(ext: number = 0, dot: boolean = false) {
   const parityRotation: ParityRotation = {
      0: {
         0: [6, 1, 7],
         1: [4, 0, 5],
         2: [0, 1, 2, 3, 4, 5, 6, 7, 8],
         3: [0, 1, 2, 3, 4, 5, 6, 7, 8],
      },
      1: {
         0: [6, 1, 7],
         1: [4, 0, 5],
         2: [0, 1, 2, 3, 4, 5, 6, 7, 8],
         3: [0, 1, 2, 3, 4, 5, 6, 7, 8],
      },
   };
   if (dot) {
      parityRotation[0][0].push(8);
      parityRotation[0][1].push(8);
      parityRotation[1][0].push(8);
      parityRotation[1][1].push(8);
   }
   if (ext > 0) {
      parityRotation[0][0].push(3);
      parityRotation[0][1].push(2);
      parityRotation[1][0].push(2);
      parityRotation[1][1].push(3);
   }
   if (ext > 1) {
      parityRotation[0][0].push(5);
      parityRotation[0][1].push(6);
      parityRotation[1][0].push(4);
      parityRotation[1][1].push(7);
   }
   if (ext > 2) {
      parityRotation[0][0].push(0, 2);
      parityRotation[0][1].push(1, 3);
      parityRotation[1][0].push(0, 3);
      parityRotation[1][1].push(1, 2);
   }
   return parityRotation;
}
function generate(): ({ _noteType: number; _noteDirection: number } | null)[] {
   let total = 2;
   const note = [rpg.noteRed, rpg.noteBlue, rpg.noteBomb];
   const parity: { [key: number]: number } = {
      0: rpg.parityRed ? 0 : 1,
      1: rpg.parityBlue ? 0 : 1,
   };
   const validRotation: ParityRotation = createValidParity(rpg.parityExtend, !rpg.noDot);
   const maxSize = rpg.column * rpg.row;
   if (rpg.limit) {
      total = Math.min(
         total,
         note.reduce((acc, cv) => acc + cv),
         maxSize,
      );
   }
   if (!rpg.limit) {
      total = Math.min(
         note.reduce((acc, cv) => acc + cv),
         maxSize,
      );
   }
   const grid: ({ _noteType: number; _noteDirection: number } | null)[] = new Array(maxSize).fill(
      null,
   );
   if (total === 0) {
      return grid;
   }
   for (let i = 0; i < total; ) {
      let randIL = Math.floor(Math.random() * maxSize);
      let randType = Math.floor(Math.random() * 3);
      for (let j = 0; j < 3; j++) {
         if (note[randType] === 0) {
            randType = (randType + 1) % 3;
         }
      }
      if (note[randType] === 0) {
         break;
      }
      let randDir = Math.floor(Math.random() * 9);
      if (rpg.parity && randType <= 1) {
         randDir =
            validRotation[randType][parity[randType]][
               Math.floor(Math.random() * validRotation[randType][parity[randType]].length)
            ];
      }
      for (let j = 0; j < maxSize; j++) {
         let pos = (randIL + j) % maxSize;
         if (grid[pos] === null) {
            if (randType === 2) {
               randDir = 0;
            }
            grid[pos] = {
               _noteType: randType,
               _noteDirection: randDir,
            };
            note[randType]--;
            i++;
            break;
         }
      }
   }
   return grid;
}

function paramNumberHandler(this: HTMLInputElement) {
   setRpg(this.name as 'noteBlue', parseInt(this.value));
}

function paramBoolHandler(this: HTMLInputElement) {
   setRpg(this.name as 'parity', this.checked);
}

function regenerateHandler(this: HTMLInputElement) {
   setRpg(this.name as 'noteBlue', parseInt(this.value));
   setGrid(new Array(rpg.row * rpg.column));
}

function generateHandler() {
   setGrid(generate());
}

export default function () {
   return (
      <div id="random-pattern">
         <h2>Random Pattern Generator</h2>
         <div class="subpanel-center">
            <label for="rpg-input-rpattern-row">Row </label>
            <input
               type="number"
               id="rpg-input-rpattern-row"
               name="row"
               min="0"
               value={rpg.row}
               onChange={regenerateHandler}
            />
            <label for="rpg-input-rpattern-column"> Column </label>
            <input
               type="number"
               id="rpg-input-rpattern-column"
               name="column"
               min="0"
               value={rpg.column}
               onChange={regenerateHandler}
            />

            <table class="table-center" id="rpg-table-rpattern">
               <tbody>
                  <For each={new Array(rpg.row)}>
                     {(_, i) => (
                        <tr>
                           <For each={grid.slice(i() * rpg.column, (i() + 1) * rpg.column)}>
                              {(g) => {
                                 if (!g)
                                    return (
                                       <td class="table-grid">
                                          <img
                                             src="./assets/blank.png"
                                             alt="blank"
                                             class="table-rpattern-image"
                                          />
                                       </td>
                                    );
                                 return (
                                    <td class="table-grid">
                                       <img
                                          src={`./assets/${
                                             g._noteDirection !== 8 || rpg.noDot
                                                ? noteImage[g._noteType]
                                                : noteImage[g._noteType + 3]
                                          }`}
                                          alt={noteImage[g._noteType].slice(0, -4)}
                                          class={
                                             g._noteDirection !== 8
                                                ? `table-rpattern-image ${
                                                     noteRotation[g._noteDirection]
                                                  }`
                                                : 'table-rpattern-image'
                                          }
                                       />
                                    </td>
                                 );
                              }}
                           </For>
                        </tr>
                     )}
                  </For>
               </tbody>
            </table>
            <label for="rpg-input-rpattern-red">Red </label>
            <input
               type="number"
               id="rpg-input-rpattern-red"
               name="noteRed"
               min="0"
               value={rpg.noteRed}
               onChange={paramNumberHandler}
            />
            <label for="rpg-input-rpattern-blue"> Blue </label>
            <input
               type="number"
               id="rpg-input-rpattern-blue"
               name="noteBlue"
               min="0"
               value={rpg.noteBlue}
               onChange={paramNumberHandler}
            />
            <label for="rpg-input-rpattern-bomb"> Bomb </label>
            <input
               type="number"
               id="rpg-input-rpattern-bomb"
               name="noteBomb"
               min="0"
               value={rpg.noteBomb}
               onChange={paramNumberHandler}
            />
            <br />
            <input
               type="checkbox"
               id="rpg-input-rpattern-limit"
               name="limit"
               checked={rpg.limit}
               onChange={paramBoolHandler}
            />
            <label for="rpg-input-rpattern-limit">Limit </label>
            <label for="rpg-input-rpattern-total">Total </label>
            <input
               type="number"
               id="rpg-input-rpattern-total"
               min="0"
               value={rpg.total}
               onChange={paramNumberHandler}
            />
            <input
               type="checkbox"
               id="rpg-input-rpattern-nodot"
               name="noDot"
               checked={rpg.noDot}
               onChange={paramBoolHandler}
            />
            <label for="rpg-input-rpattern-nodot">No Dot</label>
            <br />
            <input
               type="checkbox"
               id="rpg-input-rpattern-parity"
               name="parity"
               checked={rpg.parity}
               onChange={paramBoolHandler}
            />
            <label for="rpg-input-rpattern-parity">Parity </label>
            <label for="rpg-input-rpattern-parity-extend">Extend </label>
            <input
               type="number"
               id="rpg-input-rpattern-parity-extend"
               min="0"
               name="parityExtend"
               value={rpg.parityExtend}
               onChange={paramNumberHandler}
            />
            <input
               type="checkbox"
               id="rpg-input-rpattern-parity-red"
               name="parityRed"
               checked={rpg.parityRed}
               onChange={paramBoolHandler}
            />
            <label for="rpg-input-rpattern-parity-red">Backhand Red</label>
            <input
               type="checkbox"
               id="rpg-input-rpattern-parity-blue"
               name="parityBlue"
               checked={rpg.parityBlue}
               onChange={paramBoolHandler}
            />
            <label for="rpg-input-rpattern-parity-blue">Backhand Blue</label>
            <br />
            <input
               type="button"
               id="rpg-input-generate-rpattern"
               value="Generate Random Pattern"
               onClick={generateHandler}
            />
         </div>
      </div>
   );
}
