export const noteImage: { [key: string]: string } = {
    0: 'noter.svg',
    1: 'noteb.svg',
    2: 'bomb.png',
    3: 'noterd.svg',
    4: 'notebd.svg',
    blank: 'blank.png',
};
export const noteRotation: { [key: string]: string } = {
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

export default class RandomPatternGenerator {
    private _maxIndex: number;
    private _maxLayer: number;
    private _noteRed: number;
    private _noteBlue: number;
    private _noteBomb: number;
    private _noDot: boolean;
    private _limit: boolean;
    private _total: number;
    private _parity: boolean;
    private _parityExtend: number;
    private _parityRed: boolean;
    private _parityBlue: boolean;

    constructor(row: number, column: number) {
        this._maxIndex = column;
        this._maxLayer = row;
    }

    set column(val: number) {
        this._maxIndex = val;
    }
    get column(): number {
        return this._maxIndex;
    }
    set row(val: number) {
        this._maxLayer = val;
    }
    get row(): number {
        return this._maxLayer;
    }
    set limit(val: boolean) {
        this._limit = val;
    }
    get limit(): boolean {
        return this._limit;
    }
    set total(val: number) {
        this._total = val;
    }
    get total(): number {
        return this._total;
    }
    set noteRed(val: number) {
        this._noteRed = val;
    }
    get noteRed(): number {
        return this._noteRed;
    }
    set noteBlue(val: number) {
        this._noteBlue = val;
    }
    get noteBlue(): number {
        return this._noteBlue;
    }
    set noteBomb(val: number) {
        this._noteBomb = val;
    }
    get noteBomb(): number {
        return this._noteBomb;
    }
    set noDot(val: boolean) {
        this._noDot = val;
    }
    get noDot(): boolean {
        return this._noDot;
    }
    set parity(val: boolean) {
        this._parity = val;
    }
    get parity(): boolean {
        return this._parity;
    }
    set parityExtend(val: number) {
        this._parityExtend = val;
    }
    get parityExtend(): number {
        return this._parityExtend;
    }
    set parityRed(val: boolean) {
        this._parityRed = val;
    }
    get parityRed(): boolean {
        return this._parityRed;
    }
    set parityBlue(val: boolean) {
        this._parityBlue = val;
    }
    get parityBlue(): boolean {
        return this._parityBlue;
    }

    private createValidParity(ext: number = 0, dot: boolean = false) {
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
    public generate() {
        let total = 2;
        const note = [this._noteRed, this._noteBlue, this._noteBomb];
        const parity: { [key: number]: number } = {
            0: this._parityRed ? 0 : 1,
            1: this._parityBlue ? 0 : 1,
        };
        const validRotation: ParityRotation = this.createValidParity(
            this._parityExtend,
            !this._noDot
        );
        const maxSize = this._maxIndex * this._maxLayer;
        if (this._limit) {
            total = Math.min(
                this._total,
                note.reduce((acc, cv) => acc + cv),
                maxSize
            );
        }
        if (!this._limit) {
            total = Math.min(
                note.reduce((acc, cv) => acc + cv),
                maxSize
            );
        }
        const grid = new Array(maxSize).fill(null);
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
            if (this._parity && randType <= 1) {
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
}
