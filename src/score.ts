import { CurvePoint, ppCurve } from './ppCurve';

function lerp(x: number, y: number, a: number): number {
    return x + (y - x) * a;
}
function invlerp(x: number, y: number, a: number): number {
    return clamp((a - x) / (y - x));
}
function clamp(a: number, min = 0, max = 1): number {
    return Math.min(max, Math.max(min, a));
}

function interpolatePoint(pointArr: CurvePoint[], xPoint: number): number {
    const xArr = pointArr.map((arr) => arr[0]);
    const yArr = pointArr.map((arr) => arr[1]);
    const xa = [...xArr].reverse().find((x) => x <= xPoint) ?? xArr[0];
    const xb = xArr.find((x) => x >= xPoint) ?? xa;
    const ya = yArr[xArr.indexOf(xa)];
    const yb = yArr[xArr.indexOf(xb)];
    const t = invlerp(xa, xb, xPoint) || 0;
    return yArr[xArr.indexOf(xPoint)] || lerp(ya, yb, t);
}

export const maxNoteScore: number = 115;

export const scoreModifier: { [key: string]: { [key: string]: number | string } } = {
    nf: {
        name: 'No Fail',
        value: -0.5,
    },
    no: {
        name: 'No Obstacles',
        value: -0.05,
    },
    nb: {
        name: 'No Bombs',
        value: -0.1,
    },
    ss: {
        name: 'Slower Song',
        value: -0.3,
    },
    da: {
        name: 'Disappearing Arrows',
        value: 0.07,
    },
    fs: {
        name: 'Faster Song',
        value: 0.08,
    },
    gn: {
        name: 'Ghost Notes',
        value: 0.11,
    },
};

export default class ScoreCalculator {
    private _note: number;
    private _starRating: number = 7;
    private _starPP: number = 42.521;
    private _curvePoints: CurvePoint[];

    constructor(
        note: number = 0,
        star: number = 7,
        curvePoints: CurvePoint[] = ppCurve.scoresaber
    ) {
        this._note = note;
        this._starRating = star;
        this._curvePoints = [...curvePoints].sort((a, b) => a[0] - b[0]);
    }

    set note(val: number) {
        this._note = val;
    }
    get note(): number {
        return this._note;
    }
    set star(val: number) {
        this._starRating = val;
    }
    get star(): number {
        return this._starRating;
    }
    set curvePoints(val: CurvePoint[]) {
        this._curvePoints = [...val].sort((a, b) => a[0] - b[0]);
    }
    get curvePoints(): CurvePoint[] {
        return this._curvePoints;
    }

    // 100% pp value
    // 0.9458064516129032 interpolated value
    // 0.9431707317073172 rabbit's interpolated value
    public calcPP(
        starRating: number = this._starRating,
        perc: number = 0.9458064516129032
    ): number {
        return this._starPP * starRating * interpolatePoint(this._curvePoints, perc);
    }
    // miss simulate missing the note
    // break simulate combo break due to wall or bomb, but it can only happen once before the note
    // miss and break can happen at the same time, resulting multiplier to reduce twice
    public calcScore(
        scoreNote: number = maxNoteScore,
        scoreMultiplier: number = 1,
        missedArr: number[] = [],
        breakArr: number[] = []
    ): number {
        let total: number = 0;
        let noteScore: number = scoreNote * scoreMultiplier;
        let multFlag: boolean = true;
        let multCombo: number = 0;
        let multiplier: number = 1;
        const missed = [...missedArr].map((x) => x - 1);
        const cBreak = [...breakArr].map((x) => x - 1);
        function comboBreak() {
            multiplier = Math.max(multiplier / 2, 1);
            multCombo = 0;
            multFlag = true;
        }
        for (let i = 0; i < this._note; i++) {
            if (cBreak.includes(i)) {
                comboBreak();
            }
            if (missed.includes(i)) {
                comboBreak();
                continue;
            }
            multCombo++;
            if (multFlag && multCombo >= 2 * multiplier) {
                multiplier *= 2;
                if (multiplier >= 8) {
                    multFlag = false;
                }
                multCombo = 0;
            }
            total += noteScore * multiplier;
        }
        return total;
    }
}
