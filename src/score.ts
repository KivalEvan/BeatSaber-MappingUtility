import { CurvePoint, ppCurve } from './ppCurve';
import { round, formatNumber } from './utils';

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
    private _starPP: number = 1 / 1.046 / 0.0227;
    private _curvePoints: CurvePoint[];

    constructor(note: number = 0, star: number = 7, curvePoints: CurvePoint[] = ppCurve.ScoreSaber) {
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
    public calcPP(starRating: number = this._starRating, perc: number = 0.9458064516129032): number {
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
const scoreCalculator = new ScoreCalculator(727);

const scoreInputNote = document.querySelector<HTMLInputElement>('#score-input-note')!;
const scoreInputStar = document.querySelector<HTMLInputElement>('#score-input-star')!;
const scoreInputPercent = document.querySelector<HTMLInputElement>('#score-input-percent')!;
const scoreInputScore = document.querySelector<HTMLInputElement>('#score-input-score')!;
const scoreInputPP = document.querySelector<HTMLInputElement>('#score-input-pp')!;
const scoreOutputMaxScore = document.querySelector<HTMLElement>('#score-output-maxscore')!;
const scoreOutputMaxScoreMod = document.querySelector<HTMLElement>('#score-output-maxscore-modifier')!;
const scoreInputAvgCut = document.querySelector<HTMLInputElement>('#score-input-avgcut')!;
const scoreInputMissed = document.querySelector<HTMLTextAreaElement>('#score-input-missed')!;
const scoreInputBreak = document.querySelector<HTMLTextAreaElement>('#score-input-break')!;
const scoreOutputEstScore = document.querySelector<HTMLElement>('#score-output-estscore')!;
const scoreOutputEstPercent = document.querySelector<HTMLElement>('#score-output-estpercent')!;
const scoreOutputEstPP = document.querySelector<HTMLElement>('#score-output-estpp')!;
const scoreOutputMissScore = document.querySelector<HTMLElement>('#score-output-missscore')!;
const scoreOutputNoMissScore = document.querySelector<HTMLElement>('#score-output-nomissscore')!;
const scoreOutputNoMissPercent = document.querySelector<HTMLElement>('#score-output-nomisspercent')!;
const scoreOutputNoMissPP = document.querySelector<HTMLElement>('#score-output-nomisspp')!;
const scoreTable = document.querySelector<HTMLTableElement>('#score-table')!;
const scoreTablePercent = document.querySelector<HTMLTextAreaElement>('#score-table-percentage')!;
const scoreOptionPP = document.querySelector<HTMLOptionElement>('#score-option-pp-curve')!;
const scoreTextAreaJSON = document.querySelector<HTMLTextAreaElement>('#score-text-json')!;
const scoreErrorJSON = document.querySelector<HTMLElement>('#score-error-json')!;

scoreInputNote.addEventListener('change', inputNoteHandler);
scoreInputNote.addEventListener('input', inputNoteHandler);
scoreInputStar.addEventListener('change', inputStarHandler);
scoreInputStar.addEventListener('input', inputStarHandler);
scoreInputPercent.addEventListener('change', inputPercentHandler);
scoreInputPercent.addEventListener('input', inputPercentHandler);
scoreInputScore.addEventListener('change', inputScoreHandler);
scoreInputScore.addEventListener('input', inputScoreHandler);
scoreInputAvgCut.addEventListener('change', inputAvgCutHandler);
scoreInputAvgCut.addEventListener('input', inputAvgCutHandler);
scoreInputBreak.addEventListener('change', inputMissBreakHandler);
scoreInputMissed.addEventListener('change', inputMissBreakHandler);
scoreTablePercent.addEventListener('change', inputTablePercentHandler);
scoreOptionPP.addEventListener('change', optionScoreCurveHandler);
scoreTextAreaJSON.addEventListener('change', inputJSONScoreHandler);

const missedScore = [3, 22, 100, 102];
const breakScore = [127];
scoreTablePercent.value = [100, 99.5, 99, 98, 97, 96, 95, 94, 93, 90, 85, 80].join(',');
scoreInputNote.value = scoreCalculator.note.toString();
scoreInputStar.value = scoreCalculator.star.toString();
scoreInputPercent.value = '90';
scoreInputAvgCut.value = '111';
scoreInputMissed.value = missedScore.join(',');
scoreInputBreak.value = breakScore.join(',');
ppCurve['custom'] = [...ppCurve.ScoreSaber];
updateScore();
updateScoreEst();
updateScoreTable();
updateScoreJSON();

function inputNoteHandler(this: HTMLInputElement, ev: Event) {
    scoreCalculator.note = parseInt(this.value) || 0;
    updateScore();
    updateScoreEst();
    updateScoreTable();
    if (ev.type === 'change') {
        this.value = scoreCalculator.note.toString();
    }
}
function inputStarHandler(this: HTMLInputElement, ev: Event) {
    scoreCalculator.star = parseFloat(this.value) || 0;
    updateScore();
    updateScoreEst();
    updateScoreTable();
    if (ev.type === 'change') {
        this.value = round(scoreCalculator.star, 2).toString();
    }
}
function inputPercentHandler(this: HTMLInputElement, ev: Event) {
    updateScore();
    updateScoreTable();
    if (ev.type === 'change') {
        this.value = round(parseFloat(this.value), 2).toString();
    }
}
function inputScoreHandler(this: HTMLInputElement, ev: Event) {
    const score = parseInt(this.value);
    const maxScore = scoreCalculator.calcScore();
    scoreInputPercent.value = round((score / maxScore) * 100, 2).toString();
    scoreInputPP.value = round(
        scoreCalculator.calcPP(scoreCalculator.star, parseFloat(scoreInputPercent.value) / 100),
        2
    ).toString();
    if (ev.type === 'change') {
        this.value = score.toString();
    }
}
function inputAvgCutHandler(this: HTMLInputElement, ev: Event) {
    updateScoreEst();
    if (ev.type === 'change') {
        this.value = round(parseFloat(this.value), 2).toString();
    }
}
function inputMissBreakHandler(this: HTMLInputElement) {
    const temp: string = this.value.trim().replace(/\s+,/, ',');
    if (/^((\d+\.)?\d+,?)+/.test(temp) || temp === '') {
        const temp2: number[] = temp
            .split(',')
            .map((x) => parseInt(x))
            .filter((x) => !isNaN(x))
            .sort((a: number, b: number) => a - b);
        this.value = temp2.join(',').toString();
        updateScoreEst();
    }
}
function inputTablePercentHandler(this: HTMLInputElement) {
    const temp: string = this.value.trim().replace(/\s+,/, ',');
    if (/^((\d+\.)?\d+,?)+/.test(temp)) {
        const temp2: number[] = temp
            .split(',')
            .map((x) => parseFloat(x))
            .filter((x) => !isNaN(x))
            .sort((a: number, b: number) => b - a);
        this.value = temp2.toString();
        updateScoreTable();
    }
}
function updateScore() {
    scoreInputScore.value = round(scoreCalculator.calcScore() * (parseFloat(scoreInputPercent.value) / 100)).toString();
    scoreInputPP.value = round(
        scoreCalculator.calcPP(scoreCalculator.star, parseFloat(scoreInputPercent.value) / 100),
        2
    ).toString();
    scoreOutputMaxScore.textContent = formatNumber(scoreCalculator.calcScore());
    scoreOutputMaxScoreMod.textContent = formatNumber(scoreCalculator.calcScore());
}
function updateScoreEst() {
    const missedScore = scoreInputMissed.value.split(',').map((x) => parseInt(x)) || [];
    const breakScore = scoreInputBreak.value.split(',').map((x) => parseInt(x)) || [];
    const maxScore = scoreCalculator.calcScore();
    const estScore = scoreCalculator.calcScore(parseFloat(scoreInputAvgCut.value), undefined, missedScore, breakScore);
    const noMissScore = scoreCalculator.calcScore(parseFloat(scoreInputAvgCut.value));
    scoreOutputEstScore.textContent = formatNumber(round(estScore));
    scoreOutputEstPercent.textContent = round((estScore / maxScore) * 100, 2).toString();
    scoreOutputEstPP.textContent = round(
        scoreCalculator.calcPP(scoreCalculator.star, estScore / maxScore),
        2
    ).toString();
    scoreOutputMissScore.textContent = formatNumber(round(noMissScore - estScore));
    scoreOutputNoMissScore.textContent = formatNumber(round(noMissScore));
    scoreOutputNoMissPercent.textContent = round((noMissScore / maxScore) * 100, 2).toString();
    scoreOutputNoMissPP.textContent = round(
        scoreCalculator.calcPP(scoreCalculator.star, noMissScore / maxScore),
        2
    ).toString();
}
function updateScoreTable() {
    scoreTable.innerHTML = '<tr><th>Percentage</th><th>Score</th><th>PP</th></tr>';
    const scorePerc = scoreTablePercent.value.split(',').map((x) => parseFloat(x));
    for (let i = 0; i < scorePerc.length; i++) {
        let elemRow = document.createElement('tr');
        let elemPerc = document.createElement('td');
        let elemScore = document.createElement('td');
        let elemPP = document.createElement('td');
        elemPerc.textContent = round(scorePerc[i], 2).toString();
        elemScore.textContent = formatNumber(round(scoreCalculator.calcScore() * (scorePerc[i] / 100)));
        elemPP.textContent = round(scoreCalculator.calcPP(scoreCalculator.star, scorePerc[i] / 100), 2).toString();
        elemRow.appendChild(elemPerc);
        elemRow.appendChild(elemScore);
        elemRow.appendChild(elemPP);
        scoreTable.appendChild(elemRow);
    }
}
function optionScoreCurveHandler(this: HTMLOptionElement) {
    scoreCalculator.curvePoints = ppCurve[this.value];
    scoreTextAreaJSON.disabled = true;
    if (this.value === 'custom') {
        scoreTextAreaJSON.disabled = false;
    }
    updateScore();
    updateScoreEst();
    updateScoreTable();
    updateScoreJSON();
}
function inputJSONScoreHandler(this: HTMLTextAreaElement) {
    let parsedJSON: { [key: string]: CurvePoint[] } = {};
    scoreErrorJSON.innerHTML = '';
    try {
        if (/^{/.test(this.value.trim())) {
            parsedJSON = JSON.parse(this.value.trim());
        } else {
            parsedJSON = JSON.parse(`{${this.value.trim().replace(/\,$/, '')}}`);
        }
        scoreCalculator.curvePoints = parsedJSON.curvePoints;
        ppCurve['custom'] = parsedJSON.curvePoints;
    } catch (err) {
        console.error(err);
        scoreErrorJSON.innerHTML = err + '<br>';
    }
    updateScore();
    updateScoreEst();
    updateScoreTable();
    updateScoreJSON();
}
function updateScoreJSON() {
    const parsed: { [key: string]: object } = {
        curvePoints: [...scoreCalculator.curvePoints].reverse(),
    };
    scoreTextAreaJSON.value = JSON.stringify(parsed, null, 4);
}
