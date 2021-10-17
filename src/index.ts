// it turns out ui is complete pain with typescript and webpack
// need to learn how to break up these into separate files
import Version from './version';
import { formatNumber, round } from './util';
import BeatPerMinute from './bpm';
import EBPMPrecision from './ebpmPrec';
import NoteJumpSpeed from './njs';
import ScoreCalculator, { maxNoteScore } from './score';
import SwingPerSecond from './sps';
import { Color } from './color';
import ColorPicker from './colorPicker';
import { colorScheme } from './envColor';
import RandomPatternGenerator, { noteImage, noteRotation } from './randPattern';
import { CurvePoint, ppCurve } from './ppCurve';

const bpm = new BeatPerMinute();
const noteJumpSpeed = new NoteJumpSpeed(bpm, 16);
const ebpmPrec = new EBPMPrecision(bpm);
const scoreCalculator = new ScoreCalculator(727);
const swingPerSecond = new SwingPerSecond();
const colorPicker = new ColorPicker();
const randPatternGen = new RandomPatternGenerator(3, 4);
const version = new Version();

const textVersion = document.querySelectorAll<HTMLElement>('.text-version');
const textWatermark = document.querySelectorAll<HTMLElement>('.text-watermark');

const mapSettingsInputBPM = document.querySelector<HTMLInputElement>(
    '#map-settings-input-bpm'
);

const inputToggle = document.querySelectorAll<HTMLInputElement>('.toggle-input');

const ebpmInputPrecBeat =
    document.querySelector<HTMLInputElement>('#ebpm-input-precbeat');
const ebpmInputPrecTime =
    document.querySelector<HTMLInputElement>('#ebpm-input-prectime');
const ebpmInputPrecRealTime = document.querySelector<HTMLInputElement>(
    '#ebpm-input-precrealtime'
);
const ebpmInputEBPMOHJ =
    document.querySelector<HTMLInputElement>('#ebpm-input-ebpm-ohj');
const ebpmInputEBPMStream = document.querySelector<HTMLInputElement>(
    '#ebpm-input-ebpm-stream'
);

const njsInputNJS = document.querySelector<HTMLInputElement>('#njs-input-njs');
const njsInputOffset = document.querySelector<HTMLInputElement>('#njs-input-offset');
const njsInputHJD = document.querySelector<HTMLInputElement>('#njs-input-hjd');
const njsInputJD = document.querySelector<HTMLInputElement>('#njs-input-jd');
const njsInputReact = document.querySelector<HTMLInputElement>('#njs-input-reacttime');
const njsOutputJD = document.querySelector<HTMLElement>('#njs-output-jd');
const njsOutputMinReact = document.querySelector<HTMLElement>('#njs-output-reacttime');
const njsOutputJDOHigh = document.querySelector<HTMLElement>(
    '#njs-output-jd-optimal-high'
);
const njsOutputJDOLow = document.querySelector<HTMLElement>(
    '#njs-output-jd-optimal-low'
);
const njsSelectScale = document.querySelector<HTMLSelectElement>(
    '#njs-option-njs-scale'
);

const scoreInputNote = document.querySelector<HTMLInputElement>('#score-input-note');
const scoreInputStar = document.querySelector<HTMLInputElement>('#score-input-star');
const scoreInputPercent =
    document.querySelector<HTMLInputElement>('#score-input-percent');
const scoreInputScore = document.querySelector<HTMLInputElement>('#score-input-score');
const scoreInputPP = document.querySelector<HTMLInputElement>('#score-input-pp');
const scoreOutputMaxScore = document.querySelector<HTMLElement>(
    '#score-output-maxscore'
);
const scoreOutputMaxScoreMod = document.querySelector<HTMLElement>(
    '#score-output-maxscore-modifier'
);
const scoreInputAvgCut =
    document.querySelector<HTMLInputElement>('#score-input-avgcut');
const scoreInputMissed =
    document.querySelector<HTMLTextAreaElement>('#score-input-missed');
const scoreInputBreak =
    document.querySelector<HTMLTextAreaElement>('#score-input-break');
const scoreOutputEstScore = document.querySelector<HTMLElement>(
    '#score-output-estscore'
);
const scoreOutputEstPercent = document.querySelector<HTMLElement>(
    '#score-output-estpercent'
);
const scoreOutputEstPP = document.querySelector<HTMLElement>('#score-output-estpp');
const scoreOutputMissScore = document.querySelector<HTMLElement>(
    '#score-output-missscore'
);
const scoreOutputNoMissScore = document.querySelector<HTMLElement>(
    '#score-output-nomissscore'
);
const scoreOutputNoMissPercent = document.querySelector<HTMLElement>(
    '#score-output-nomisspercent'
);
const scoreOutputNoMissPP = document.querySelector<HTMLElement>(
    '#score-output-nomisspp'
);
const scoreTable = document.querySelector<HTMLTableElement>('#score-table');
const scoreTablePercent = document.querySelector<HTMLTextAreaElement>(
    '#score-table-percentage'
);
const scoreOptionPP = document.querySelector<HTMLOptionElement>(
    '#score-option-pp-curve'
);
const scoreTextAreaJSON =
    document.querySelector<HTMLTextAreaElement>('#score-text-json');
const scoreErrorJSON = document.querySelector<HTMLElement>('#score-error-json');

const labelInputText = document.querySelector<HTMLInputElement>('#label-input-text');
const labelOutputText = document.querySelector<HTMLInputElement>('#label-output-text');
const labelInputDiffCount1 = document.querySelector<HTMLInputElement>(
    '#label-input-diff-count-1'
);
const labelInputDiffCount2 = document.querySelector<HTMLInputElement>(
    '#label-input-diff-count-2'
);
const labelInputDiffCount3 = document.querySelector<HTMLInputElement>(
    '#label-input-diff-count-3'
);
const labelInputDiffCount4 = document.querySelector<HTMLInputElement>(
    '#label-input-diff-count-4'
);
const labelInputDiffCount5 = document.querySelector<HTMLInputElement>(
    '#label-input-diff-count-5'
);

const spsInput: { [key: string]: HTMLInputElement } = {};
const spsOutput: { [key: string]: HTMLInputElement } = {};
for (const d in swingPerSecond.difficulty) {
    spsInput[d] = document.querySelector<HTMLInputElement>(`#sps-input-${d}`);
    spsOutput[d] = document.querySelector<HTMLInputElement>(`#sps-output-${d}`);
}
const spsOutputTotal = document.querySelector<HTMLElement>(
    '#sps-output-total-reduction'
);

const cpOptionColorScheme = document.querySelector<HTMLInputElement>(
    '#cp-option-colorscheme'
);
const cpInputHex: { [key: string]: HTMLInputElement } = {};
const cpInputPicker: { [key: string]: HTMLInputElement } = {};
const cpInputInclude: { [key: string]: HTMLInputElement } = {};
const cpInputReset: { [key: string]: HTMLInputElement } = {};
for (const obj in colorPicker.colorScheme) {
    const part: string = obj.replace(/^\_/, '').toLowerCase();
    cpInputHex[obj] = document.querySelector<HTMLInputElement>(`#cp-input-hex-${part}`);
    cpInputPicker[obj] = document.querySelector<HTMLInputElement>(
        `#cp-input-picker-${part}`
    );
    cpInputInclude[obj] = document.querySelector<HTMLInputElement>(
        `#cp-input-include-${part}`
    );
    cpInputReset[obj] = document.querySelector<HTMLInputElement>(
        `#cp-input-reset-${part}`
    );
}
const cpTextAreaIOJSON =
    document.querySelector<HTMLTextAreaElement>('#cp-io-colorjson');
const cpErrorJSON = document.querySelector<HTMLElement>('#cp-error-colorjson');

const rpgInputRow = document.querySelector<HTMLInputElement>('#rpg-input-rpattern-row');
const rpgInputColumn = document.querySelector<HTMLInputElement>(
    '#rpg-input-rpattern-column'
);
const rpgTable = document.querySelector<HTMLTableElement>('#rpg-table-rpattern');
const rpgInputNRed = document.querySelector<HTMLInputElement>(
    '#rpg-input-rpattern-red'
);
const rpgInputNBlue = document.querySelector<HTMLInputElement>(
    '#rpg-input-rpattern-blue'
);
const rpgInputNBomb = document.querySelector<HTMLInputElement>(
    '#rpg-input-rpattern-bomb'
);
const rpgInputLimit = document.querySelector<HTMLInputElement>(
    '#rpg-input-rpattern-limit'
);
const rpgInputTotal = document.querySelector<HTMLInputElement>(
    '#rpg-input-rpattern-total'
);
const rpgInputNoDot = document.querySelector<HTMLInputElement>(
    '#rpg-input-rpattern-nodot'
);
const rpgInputParity = document.querySelector<HTMLInputElement>(
    '#rpg-input-rpattern-parity'
);
const rpgInputParityExtend = document.querySelector<HTMLInputElement>(
    '#rpg-input-rpattern-parity-extend'
);
const rpgInputParityNRed = document.querySelector<HTMLInputElement>(
    '#rpg-input-rpattern-parity-red'
);
const rpgInputParityNBlue = document.querySelector<HTMLInputElement>(
    '#rpg-input-rpattern-parity-blue'
);
const rpgInputGenerate = document.querySelector<HTMLInputElement>(
    '#rpg-input-generate-rpattern'
);

init();

mapSettingsInputBPM.addEventListener('change', inputBPMHandler);
mapSettingsInputBPM.addEventListener('input', inputBPMHandler);

ebpmInputPrecBeat.addEventListener('change', inputPrecBeatHandler);
ebpmInputPrecBeat.addEventListener('input', inputPrecBeatHandler);
ebpmInputPrecTime.addEventListener('change', inputPrecTimeHandler);
ebpmInputPrecTime.addEventListener('input', inputPrecTimeHandler);
ebpmInputPrecRealTime.addEventListener('change', inputPrecRealTimeHandler);
ebpmInputPrecRealTime.addEventListener('input', inputPrecRealTimeHandler);
ebpmInputEBPMOHJ.addEventListener('change', inputEBPMHandler);
ebpmInputEBPMOHJ.addEventListener('input', inputEBPMHandler);
ebpmInputEBPMStream.addEventListener('change', inputEBPMHandler);
ebpmInputEBPMStream.addEventListener('input', inputEBPMHandler);

njsInputNJS.addEventListener('change', inputNJSHandler);
njsInputNJS.addEventListener('input', inputNJSHandler);
njsInputOffset.addEventListener('change', inputNJSOffsetHandler);
njsInputOffset.addEventListener('input', inputNJSOffsetHandler);
njsInputHJD.addEventListener('change', inputHJDHandler);
njsInputHJD.addEventListener('input', inputHJDHandler);
njsInputJD.addEventListener('change', inputJDHandler);
njsInputJD.addEventListener('input', inputJDHandler);
njsInputReact.addEventListener('change', inputReactTimeHandler);
njsInputReact.addEventListener('input', inputReactTimeHandler);

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

labelInputText.addEventListener('input', inputLabelTextHandler);
labelInputDiffCount1.addEventListener('click', inputDiffCountHandler);
labelInputDiffCount2.addEventListener('click', inputDiffCountHandler);
labelInputDiffCount3.addEventListener('click', inputDiffCountHandler);
labelInputDiffCount4.addEventListener('click', inputDiffCountHandler);
labelInputDiffCount5.addEventListener('click', inputDiffCountHandler);

for (const d in swingPerSecond.difficulty) {
    spsInput[d].addEventListener('input', inputSPSHandlerHandler);
}

cpOptionColorScheme.addEventListener('change', optionColorSchemeHandler);
for (const obj in colorPicker.colorScheme) {
    cpInputHex[obj].addEventListener('change', inputColorHexHandler);
    cpInputPicker[obj].addEventListener('change', inputColorPickerHandler);
    cpInputInclude[obj].addEventListener('click', inputColorIncludeHandler);
    cpInputReset[obj].addEventListener('click', inputColorResetHandler);
    cpInputReset[obj].style.display = 'none';
}
const cpCustomText = 'Custom';
let option = document.createElement('option');
option.value = cpCustomText;
option.textContent = cpCustomText;
cpOptionColorScheme.append(option);
for (const cs in colorScheme) {
    option = document.createElement('option');
    option.value = cs;
    option.textContent = cs;
    cpOptionColorScheme.append(option);
}
cpTextAreaIOJSON.addEventListener('change', inputJSONColorHandler);

rpgInputRow.addEventListener('click', inputRPatternRowHandler);
rpgInputColumn.addEventListener('click', inputRPatternColumnHandler);
rpgInputGenerate.addEventListener('click', inputRPatternGenerateHandler);

function init() {
    updateVersion(version.number);
    updateWatermark(version.watermark);

    mapSettingsInputBPM.value = bpm.value.toString();
    updateEBPM();
    updatePrec();

    njsInputNJS.value = noteJumpSpeed.njs.toString();
    njsInputOffset.value = noteJumpSpeed.offset.toString();
    updateNJS();
    njsOutputMinReact.textContent = `${round(
        (60 / bpm.value) * noteJumpSpeed.hjdMin * 1000
    )}ms`;
    enableInput();

    const missedScore = [3, 22, 100, 102];
    const breakScore = [127];
    scoreTablePercent.value = [100, 98, 97, 96, 95, 94, 93, 90, 85, 80].join(',');
    scoreInputNote.value = scoreCalculator.note.toString();
    scoreInputStar.value = scoreCalculator.star.toString();
    scoreInputPercent.value = '90';
    scoreInputAvgCut.value = '111';
    scoreInputMissed.value = missedScore.join(',');
    scoreInputBreak.value = breakScore.join(',');
    ppCurve['custom'] = [...ppCurve.scoresaber];
    updateScore();
    updateScoreEst();
    updateScoreTable();
    updateScoreJSON();

    rpgInputRow.value = randPatternGen.row.toString();
    rpgInputColumn.value = randPatternGen.column.toString();
    rpgInputNRed.value = '1';
    rpgInputNBlue.value = '1';
    rpgInputNBomb.value = '0';
    rpgInputTotal.value = '2';
    rpgInputParityExtend.value = '0';
    tableRPattern();
}

function updateVersion(text: string): void {
    textVersion.forEach((ver) => {
        ver.textContent = text;
    });
}
function updateWatermark(text: string): void {
    textWatermark.forEach((wm) => {
        wm.textContent = text;
    });
}

function enableInput() {
    inputToggle.forEach((inp) => {
        inp.disabled = false;
    });
}
function disableInput() {
    inputToggle.forEach((inp) => {
        inp.disabled = true;
    });
}

function inputBPMHandler(ev: Event) {
    bpm.value = Math.abs(parseFloat(this.value)) || 0;
    if (bpm.value > 0) {
        ebpmPrec.update();
        enableInput();
        updatePrec();
        updateEBPM();
        updateNJS();
        njsOutputMinReact.textContent = `${round(
            (60 / bpm.value) * noteJumpSpeed.hjdMin * 1000
        )}ms`;
    } else {
        disableInput();
    }
    if (ev.type === 'change') {
        this.value = bpm.value;
    }
}
function inputPrecBeatHandler(ev: Event) {
    ebpmPrec.precBeat =
        Math.abs(parseFloat(this.value)) > 0 ? Math.abs(parseFloat(this.value)) : 1;
    if (ebpmPrec.precBeat > 0) {
        updateEBPM();
        ebpmInputPrecTime.value = round(ebpmPrec.precTime, 3).toString();
        ebpmInputPrecRealTime.value = round(ebpmPrec.precRealTime, 1).toString();
    }
    if (ev.type === 'change') {
        this.value = round(ebpmPrec.precBeat, 3).toString();
    }
}
function inputPrecTimeHandler(ev: Event) {
    ebpmPrec.precTime =
        Math.abs(parseFloat(this.value)) > 0 ? Math.abs(parseFloat(this.value)) : 1;
    if (ebpmPrec.precTime > 0) {
        updateEBPM();
        ebpmInputPrecBeat.value = round(ebpmPrec.precBeat, 3).toString();
        ebpmInputPrecRealTime.value = round(ebpmPrec.precRealTime, 1).toString();
    }
    if (ev.type === 'change') {
        this.value = round(ebpmPrec.precTime, 3).toString();
    }
}
function inputPrecRealTimeHandler(ev: Event) {
    ebpmPrec.precRealTime =
        Math.abs(parseFloat(this.value)) > 0 ? Math.abs(parseFloat(this.value)) : 1;
    if (ebpmPrec.precRealTime > 0) {
        updateEBPM();
        ebpmInputPrecBeat.value = round(ebpmPrec.precBeat, 3).toString();
        ebpmInputPrecTime.value = round(ebpmPrec.precTime, 3).toString();
    }
    if (ev.type === 'change') {
        ebpmInputPrecRealTime.value = round(ebpmPrec.precRealTime, 1).toString();
    }
}
function inputEBPMHandler(ev: Event) {
    if (this.id === 'ebpm-input-ebpm-ohj') {
        ebpmPrec.ebpmOHJ =
            Math.abs(parseFloat(this.value)) > 0
                ? Math.abs(parseFloat(this.value))
                : bpm.value;
        if (ev.type === 'change') {
            this.value = round(ebpmPrec.ebpmOHJ, 2).toString();
        }
        ebpmInputEBPMStream.value = round(ebpmPrec.ebpmStream, 2).toString();
    }
    if (this.id === 'ebpm-input-ebpm-stream') {
        ebpmPrec.ebpmStream =
            Math.abs(parseFloat(this.value)) > 0
                ? Math.abs(parseFloat(this.value))
                : bpm.value;
        if (ev.type === 'change') {
            this.value = round(ebpmPrec.ebpmStream, 2).toString();
        }
        ebpmInputEBPMOHJ.value = round(ebpmPrec.ebpmOHJ, 2).toString();
    }
    updatePrec();
}
function updatePrec() {
    ebpmInputPrecBeat.value = round(ebpmPrec.precBeat, 3).toString();
    ebpmInputPrecTime.value = round(ebpmPrec.precTime, 3).toString();
    ebpmInputPrecRealTime.value = round(ebpmPrec.precRealTime, 1).toString();
}
function updateEBPM() {
    ebpmInputEBPMOHJ.value = round(ebpmPrec.ebpmOHJ, 2).toString();
    ebpmInputEBPMStream.value = round(ebpmPrec.ebpmStream, 2).toString();
}

function inputNJSHandler(ev: Event) {
    noteJumpSpeed.njs =
        Math.abs(parseFloat(this.value)) > 0
            ? Math.abs(parseFloat(this.value))
            : noteJumpSpeed.njs;
    updateNJS();
    if (ev.type === 'change') {
        this.value = round(noteJumpSpeed.njs, 3);
    }
}
function inputNJSOffsetHandler(ev: Event) {
    noteJumpSpeed.offset = parseFloat(this.value) || 0;
    updateNJS();
    if (ev.type === 'change') {
        this.value = round(noteJumpSpeed.offset, 3);
    }
}
function inputHJDHandler(ev: Event) {
    noteJumpSpeed.offset =
        Math.max(Math.abs(parseFloat(this.value)), noteJumpSpeed.hjdMin) -
        noteJumpSpeed.calcHalfJumpDurationRaw();
    njsInputOffset.value = round(noteJumpSpeed.offset, 3).toString();
    njsInputJD.value = round(noteJumpSpeed.jd, 3).toString();
    njsInputReact.value = round(noteJumpSpeed.reactTime * 1000).toString();
    njsOutputJD.textContent = round(noteJumpSpeed.jdMin, 2).toString();
    if (ev.type === 'change') {
        this.value = round(noteJumpSpeed.hjd, 3).toString();
    }
}
function inputJDHandler(ev: Event) {
    let jd =
        Math.abs(parseFloat(this.value)) > 0
            ? Math.abs(parseFloat(this.value))
            : noteJumpSpeed.jd;
    if (njsSelectScale.value === 'hjd') {
        jd = Math.max(jd, noteJumpSpeed.jdMin);
        noteJumpSpeed.offset =
            noteJumpSpeed.calcHalfJumpDurationFromJD(jd) -
            noteJumpSpeed.calcHalfJumpDurationRaw();
    }
    if (njsSelectScale.value === 'njs') {
        noteJumpSpeed.njs = jd / (2 * noteJumpSpeed.calcReactionTimeHJD());
    }
    njsInputHJD.value = round(noteJumpSpeed.hjd, 3).toString();
    njsInputReact.value = round(noteJumpSpeed.reactTime * 1000).toString();
    njsOutputJD.textContent = round(noteJumpSpeed.jdMin, 2).toString();
    njsInputNJS.value = round(noteJumpSpeed.njs, 3).toString();
    njsInputOffset.value = round(noteJumpSpeed.offset, 3).toString();
    if (ev.type === 'change') {
        this.value = round(noteJumpSpeed.jd, 2).toString();
    }
}
function inputReactTimeHandler(ev: Event) {
    let reactTime = Math.max(
        Math.abs(parseFloat(this.value)) / 1000 > 0
            ? Math.abs(parseFloat(this.value)) / 1000
            : noteJumpSpeed.calcReactionTimeHJD(),
        noteJumpSpeed.calcReactionTimeHJD(noteJumpSpeed.hjdMin)
    );
    noteJumpSpeed.offset =
        reactTime / (60 / bpm.value) - noteJumpSpeed.calcHalfJumpDurationRaw();
    njsInputHJD.value = round(noteJumpSpeed.hjd, 3).toString();
    njsInputJD.value = round(noteJumpSpeed.jd, 2).toString();
    njsOutputJD.textContent = round(noteJumpSpeed.jdMin, 2).toString();
    njsInputOffset.value = round(noteJumpSpeed.offset, 3).toString();
    if (ev.type === 'change') {
        this.value = round(noteJumpSpeed.reactTime * 1000).toString();
    }
}
function updateNJS() {
    noteJumpSpeed.update();
    njsInputHJD.value = round(noteJumpSpeed.hjd, 3).toString();
    njsInputJD.value = round(noteJumpSpeed.jd, 2).toString();
    njsInputReact.value = round(noteJumpSpeed.reactTime * 1000).toString();
    njsOutputJDOHigh.textContent = round(
        noteJumpSpeed.calcJumpDistanceOptimalHigh(),
        2
    ).toString();
    njsOutputJDOLow.textContent = round(
        noteJumpSpeed.calcJumpDistanceOptimalLow(),
        2
    ).toString();
    njsOutputJD.textContent = round(noteJumpSpeed.jdMin, 2).toString();
}

function inputNoteHandler(ev: Event) {
    scoreCalculator.note = parseInt(this.value) || 0;
    updateScore();
    updateScoreEst();
    updateScoreTable();
    if (ev.type === 'change') {
        this.value = scoreCalculator.note.toString();
    }
}
function inputStarHandler(ev: Event) {
    scoreCalculator.star = parseFloat(this.value) || 0;
    updateScore();
    updateScoreEst();
    updateScoreTable();
    if (ev.type === 'change') {
        this.value = round(scoreCalculator.star, 2).toString();
    }
}
function inputPercentHandler(ev: Event) {
    updateScore();
    updateScoreTable();
    if (ev.type === 'change') {
        this.value = round(parseFloat(this.value), 2).toString();
    }
}
function inputScoreHandler(ev: Event) {
    const score = parseInt(this.value);
    const maxScore = scoreCalculator.calcScore();
    scoreInputPercent.value = round((score / maxScore) * 100, 2).toString();
    scoreInputPP.value = round(
        scoreCalculator.calcPP(
            scoreCalculator.star,
            parseFloat(scoreInputPercent.value) / 100
        ),
        2
    ).toString();
    if (ev.type === 'change') {
        this.value = score.toString();
    }
}
function inputAvgCutHandler(ev: Event) {
    updateScoreEst();
    if (ev.type === 'change') {
        this.value = round(parseFloat(this.value), 2).toString();
    }
}
function inputMissBreakHandler(ev: Event) {
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
function inputTablePercentHandler(ev: Event) {
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
    scoreInputScore.value = round(
        scoreCalculator.calcScore() * (parseFloat(scoreInputPercent.value) / 100)
    ).toString();
    scoreInputPP.value = round(
        scoreCalculator.calcPP(
            scoreCalculator.star,
            parseFloat(scoreInputPercent.value) / 100
        ),
        2
    ).toString();
    scoreOutputMaxScore.textContent = formatNumber(scoreCalculator.calcScore());
    scoreOutputMaxScoreMod.textContent = formatNumber(scoreCalculator.calcScore());
}
function updateScoreEst() {
    const missedScore = scoreInputMissed.value.split(',').map((x) => parseInt(x)) || [];
    const breakScore = scoreInputBreak.value.split(',').map((x) => parseInt(x)) || [];
    const maxScore = scoreCalculator.calcScore();
    const estScore = scoreCalculator.calcScore(
        parseFloat(scoreInputAvgCut.value),
        undefined,
        missedScore,
        breakScore
    );
    const noMissScore = scoreCalculator.calcScore(parseFloat(scoreInputAvgCut.value));
    scoreOutputEstScore.textContent = formatNumber(round(estScore));
    scoreOutputEstPercent.textContent = round(
        (estScore / maxScore) * 100,
        2
    ).toString();
    scoreOutputEstPP.textContent = round(
        scoreCalculator.calcPP(scoreCalculator.star, estScore / maxScore),
        2
    ).toString();
    scoreOutputMissScore.textContent = formatNumber(round(noMissScore - estScore));
    scoreOutputNoMissScore.textContent = formatNumber(round(noMissScore));
    scoreOutputNoMissPercent.textContent = round(
        (noMissScore / maxScore) * 100,
        2
    ).toString();
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
        elemScore.textContent = formatNumber(
            round(scoreCalculator.calcScore() * (scorePerc[i] / 100))
        );
        elemPP.textContent = round(
            scoreCalculator.calcPP(scoreCalculator.star, scorePerc[i] / 100),
            2
        ).toString();
        elemRow.appendChild(elemPerc);
        elemRow.appendChild(elemScore);
        elemRow.appendChild(elemPP);
        scoreTable.appendChild(elemRow);
    }
}
function optionScoreCurveHandler() {
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
function inputJSONScoreHandler() {
    let parsedJSON: { [key: string]: CurvePoint[] } = {};
    cpErrorJSON.innerHTML = '';
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

function inputSPSHandlerHandler(ev: Event) {
    const diffName: string = this.id.slice(10);
    swingPerSecond.difficulty[diffName] = this.value
        ? Math.abs(parseFloat(this.value.trim()))
        : null;
    let prevDiff: string = null;
    for (const d in swingPerSecond.difficulty) {
        if (swingPerSecond.difficulty[d] !== null) {
            if (prevDiff !== null) {
                spsOutput[prevDiff].textContent = `${
                    swingPerSecond.difficulty[d] !== 0
                        ? swingPerSecond.calcDifference(d, prevDiff).toFixed(2)
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
            this.value = round(swingPerSecond.difficulty[diffName], 2).toString();
        }
    }
}

function inputLabelTextHandler(ev: Event) {
    if (this.value.trim() !== '') {
        labelOutputText.textContent = this.value.trim();
    } else {
        labelOutputText.textContent = 'none';
    }
}
function inputDiffCountHandler(ev: Event) {
    labelOutputText.className = `diff-label diff-count-${parseInt(this.value)}`;
}

function optionColorSchemeHandler() {
    if (this.value !== cpCustomText) {
        for (const obj in colorPicker.colorScheme) {
            cpInputHex[obj].value = '';
            cpInputPicker[obj].value = '#000000';
            cpInputInclude[obj].checked = false;
            cpInputReset[obj].style.display = 'none';
        }
        colorPicker.environmentColor = this.value;
        for (const obj in colorPicker.colorScheme) {
            if (colorPicker.colorScheme[obj]) {
                const hexColor = colorPicker.getColorHex(colorPicker.colorScheme[obj]);
                cpInputHex[obj].value = hexColor;
                cpInputPicker[obj].value = hexColor;
                cpInputInclude[obj].checked = colorPicker.colorScheme[obj]
                    ? true
                    : false;
                cpInputReset[obj].style.display = 'block';
            }
        }
        updateColorJSON();
    }
}
function inputJSONColorHandler() {
    for (const obj in colorPicker.colorScheme) {
        cpInputHex[obj].value = '';
        cpInputPicker[obj].value = '#000000';
        cpInputInclude[obj].checked = false;
        cpInputReset[obj].style.display = 'none';
    }
    cpErrorJSON.innerHTML = '';
    const colorType = [
        '_colorLeft',
        '_colorRight',
        '_envColorLeft',
        '_envColorRight',
        '_envColorLeftBoost',
        '_envColorRightBoost',
        '_obstacleColor',
    ];
    let parsedJSON: { [key: string]: Color } = {};
    try {
        if (/^{/.test(this.value.trim())) {
            parsedJSON = JSON.parse(this.value.trim());
        } else {
            parsedJSON = JSON.parse(`{${this.value.trim().replace(/\,$/, '')}}`);
        }
    } catch (err) {
        console.error(err);
        cpErrorJSON.innerHTML = err + '<br>';
    }
    for (const obj in parsedJSON) {
        if (colorType.includes(obj)) {
            colorPicker.colorScheme[obj] = parsedJSON[obj];
            const hexColor = colorPicker.getColorHex(parsedJSON[obj]);
            cpInputHex[obj].value = hexColor;
            cpInputPicker[obj].value = hexColor;
            cpInputInclude[obj].checked = true;
            cpInputReset[obj].style.display = 'block';
        }
    }
    updateColorJSON();
}
function updateColorJSON() {
    const parsed: { [key: string]: object } = {};
    for (const obj in colorPicker.colorScheme) {
        if (cpInputInclude[obj].checked) {
            parsed[obj] = colorPicker.colorScheme[obj];
        }
    }
    cpTextAreaIOJSON.value = JSON.stringify(parsed, null, 4);
}
function inputColorHexHandler() {
    // pepega
    if (/^\#?[0-9a-fA-F]{6,8}/.test(this.value.trim())) {
        let objName = `_${this.id.slice(13)}`;
        for (const obj in colorPicker.colorScheme) {
            if (objName === obj.toLowerCase()) {
                objName = obj;
            }
        }
        const colorHex = this.value.trim().replace(/^\#?/, '#').slice(0, 7);
        colorPicker.colorScheme[objName] = colorPicker.hexToRGB(colorHex);
        cpInputHex[objName].value = colorHex;
        cpInputPicker[objName].value = colorHex;
        cpInputInclude[objName].checked = true;
        cpInputReset[objName].style.display = 'block';
        updateColorJSON();
    }
}
function inputColorPickerHandler() {
    let objName = `_${this.id.slice(16)}`;
    for (const obj in colorPicker.colorScheme) {
        if (objName === obj.toLowerCase()) {
            objName = obj;
        }
    }
    colorPicker.colorScheme[objName] = colorPicker.hexToRGB(this.value);
    cpInputHex[objName].value = this.value;
    cpInputInclude[objName].checked = true;
    cpInputReset[objName].style.display = 'block';
    updateColorJSON();
}
function inputColorIncludeHandler() {
    let objName = `_${this.id.slice(17)}`;
    for (const obj in colorPicker.colorScheme) {
        if (objName === obj.toLowerCase()) {
            objName = obj;
        }
    }
    if (this.checked) {
        colorPicker.colorScheme[objName] = colorPicker.hexToRGB(
            cpInputPicker[objName].value
        );
        cpInputHex[objName].value = cpInputPicker[objName].value;
        cpInputReset[objName].style.display = 'block';
    }
    updateColorJSON();
}
function inputColorResetHandler() {
    let objName = `_${this.id.slice(15)}`;
    for (const obj in colorPicker.colorScheme) {
        if (objName === obj.toLowerCase()) {
            objName = obj;
        }
    }
    colorPicker.colorScheme[objName] = null;
    cpInputHex[objName].value = '';
    cpInputPicker[objName].value = '#000000';
    cpInputInclude[objName].checked = false;
    cpInputReset[objName].style.display = 'none';
    updateColorJSON();
}

function tableRPattern() {
    rpgTable.innerHTML = '';
    for (let l = 0; l < randPatternGen.row; l++) {
        let row = document.createElement('tr');
        for (let i = 0; i < randPatternGen.column; i++) {
            let elem = document.createElement('td');
            elem.className = 'table-grid';
            let img = document.createElement('img');
            img.className = 'table-rpattern-image';
            img.src = `./assets/${noteImage.blank}`;
            img.alt = noteImage.blank.slice(0, -4);
            elem.appendChild(img);
            row.appendChild(elem);
        }
        rpgTable.appendChild(row);
    }
}
function inputRPatternRowHandler() {
    const val = Math.min(Math.abs(parseFloat(this.value)) || 1, 4);
    this.value = val;
    randPatternGen.row = val;
    tableRPattern();
}
function inputRPatternColumnHandler() {
    const val = Math.min(Math.abs(parseFloat(this.value)) || 1, 8);
    this.value = val;
    randPatternGen.column = val;
    tableRPattern();
}
function inputRPatternGenerateHandler() {
    const rpgTableImage = document.querySelectorAll<HTMLImageElement>(
        '.table-rpattern-image'
    );
    rpgTableImage.forEach((image) => {
        image.src = './assets/blank.png';
        image.alt = 'blank';
        image.className = 'table-rpattern-image';
    });
    randPatternGen.noteRed = parseInt(rpgInputNRed.value) || 0;
    randPatternGen.noteBlue = parseInt(rpgInputNBlue.value) || 0;
    randPatternGen.noteBomb = parseInt(rpgInputNBomb.value) || 0;
    randPatternGen.noDot = rpgInputNoDot.checked;
    randPatternGen.limit = rpgInputLimit.checked;
    randPatternGen.total = parseInt(rpgInputTotal.value) || 0;
    randPatternGen.parity = rpgInputParity.checked;
    randPatternGen.parityExtend = parseInt(rpgInputParityExtend.value) || 0;
    randPatternGen.parityRed = rpgInputParityNRed.checked;
    randPatternGen.parityBlue = rpgInputParityNBlue.checked;
    const grid = randPatternGen.generate();
    for (let j = 0; j < grid.length; j++) {
        if (grid[j] !== null) {
            rpgTableImage[j].src = `./assets/${
                grid[j]._noteDirection !== 8 || rpgInputNoDot.checked
                    ? noteImage[grid[j]._noteType]
                    : noteImage[grid[j]._noteType + 3]
            }`;
            rpgTableImage[j].alt = noteImage[grid[j]._noteType].slice(0, -4);
            if (grid[j]._noteDirection !== 8) {
                rpgTableImage[j].className += ` ${
                    noteRotation[grid[j]._noteDirection]
                }`;
                rpgTableImage[j].alt += ` ${noteRotation[grid[j]._noteDirection]}`;
            }
        }
    }
}
