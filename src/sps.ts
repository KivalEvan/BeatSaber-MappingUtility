interface DifficultySPS {
    easy: number;
    normal: number;
    hard: number;
    expert: number;
    expertplus: number;
    [key: string]: number;
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
    calcDifference(d1: string, d2: string): number {
        return (1 - this._difficulty[d2] / this._difficulty[d1]) * 100;
    }
    getTotalReduction(): number {
        let highest: number = null;
        let lowest: number = null;
        for (const d in this._difficulty) {
            if (this._difficulty[d] !== null) {
                if (!highest || highest < this._difficulty[d]) {
                    highest = this._difficulty[d];
                }
                if (!lowest || lowest > this._difficulty[d]) {
                    lowest = this._difficulty[d];
                }
            }
        }
        return highest || (highest && lowest) ? (1 - lowest / highest) * 100 : 0;
    }
}
