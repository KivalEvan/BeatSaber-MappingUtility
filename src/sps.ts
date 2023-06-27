import { round } from './utils';

interface DifficultySPS {
    easy: number | null;
    normal: number | null;
    hard: number | null;
    expert: number | null;
    expertplus: number | null;
}

export default class SwingPerSecond {
    private _difficulty: DifficultySPS;
    constructor() {
        this._difficulty = {
            easy: null,
            normal: null,
            hard: null,
            expert: null,
            expertplus: null,
        };
    }
    get difficulty() {
        return this._difficulty;
    }
    calcDifference(d1: keyof DifficultySPS, d2: keyof DifficultySPS): number {
        return (1 - this._difficulty[d2]! / this._difficulty[d1]!) * 100;
    }
    getTotalReduction(): number {
        let highest!: number;
        let lowest!: number;
        for (const diff in this._difficulty) {
            const d = diff as keyof DifficultySPS;
            if (this._difficulty[d] != null) {
                if (!highest || highest < this._difficulty[d]!) {
                    highest = this._difficulty[d]!;
                }
                if (!lowest || lowest > this._difficulty[d]!) {
                    lowest = this._difficulty[d]!;
                }
            }
        }
        return highest || (highest && lowest) ? (1 - lowest / highest) * 100 : 0;
    }
}
const swingPerSecond = new SwingPerSecond();

const spsInput: { [key: string]: HTMLInputElement } = {};
const spsOutput: { [key: string]: HTMLInputElement } = {};
for (const d in swingPerSecond.difficulty) {
    spsInput[d] = document.querySelector<HTMLInputElement>(`#sps-input-${d}`)!;
    spsOutput[d] = document.querySelector<HTMLInputElement>(`#sps-output-${d}`)!;
}
const spsOutputTotal = document.querySelector<HTMLElement>('#sps-output-total-reduction')!;

for (const d in swingPerSecond.difficulty) {
    spsInput[d].addEventListener('input', inputSPSHandlerHandler);
}

function inputSPSHandlerHandler(this: HTMLInputElement, ev: Event) {
    const diffName = this.id.slice(10) as keyof DifficultySPS;
    swingPerSecond.difficulty[diffName] = this.value
        ? Math.abs(parseFloat(this.value.trim()))
        : null;
    let prevDiff: string | null = null;
    for (const diff in swingPerSecond.difficulty) {
        const d = diff as keyof DifficultySPS;
        if (swingPerSecond.difficulty[d] !== null) {
            if (prevDiff !== null) {
                spsOutput[prevDiff].textContent = `${
                    swingPerSecond.difficulty[d] !== 0
                        ? swingPerSecond
                              .calcDifference(d, prevDiff as keyof DifficultySPS)
                              .toFixed(2)
                        : 'Infinity'
                }%`;
            }
            prevDiff = d;
        }
        spsOutput[d].textContent = '';
    }
    spsOutputTotal.textContent = `${swingPerSecond.getTotalReduction().toFixed(2)}%`;
    if (ev.type === 'change') {
        if (swingPerSecond.difficulty[diffName] !== null) {
            this.value = round(swingPerSecond.difficulty[diffName]!, 2).toString();
        }
    }
}
