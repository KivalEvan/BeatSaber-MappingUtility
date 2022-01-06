import './style.css';
import Version from './version';
import { round } from './utils';
import BeatPerMinute from './bpm';
import EBPMPrecision from './ebpmPrec';
import NoteJumpSpeed from './njs';
import ScoreCalculator from './score';
import SwingPerSecond from './sps';
import ColorPicker from './colorPicker';
import RandomPatternGenerator from './randPattern';

const bpm = new BeatPerMinute();
const noteJumpSpeed = new NoteJumpSpeed(bpm, 16);
const ebpmPrec = new EBPMPrecision(bpm);
const scoreCalculator = new ScoreCalculator(727);
const swingPerSecond = new SwingPerSecond();
const colorPicker = new ColorPicker();
const randPatternGen = new RandomPatternGenerator(3, 4);
const version = new Version();

const textVersion = document.querySelectorAll<HTMLElement>('.text-version')!;
const textWatermark = document.querySelectorAll<HTMLElement>('.text-watermark')!;

const mapSettingsInputBPM = document.querySelector<HTMLInputElement>(
    '#map-settings-input-bpm'
)!;

const inputToggle = document.querySelectorAll<HTMLInputElement>('.toggle-input');

const ebpmInputPrecBeat =
    document.querySelector<HTMLInputElement>('#ebpm-input-precbeat')!;
const ebpmInputPrecTime =
    document.querySelector<HTMLInputElement>('#ebpm-input-prectime')!;
const ebpmInputPrecRealTime = document.querySelector<HTMLInputElement>(
    '#ebpm-input-precrealtime'
)!;
const ebpmInputEBPMOHJ =
    document.querySelector<HTMLInputElement>('#ebpm-input-ebpm-ohj')!;
const ebpmInputEBPMStream = document.querySelector<HTMLInputElement>(
    '#ebpm-input-ebpm-stream'
)!;

const njsInputNJS = document.querySelector<HTMLInputElement>('#njs-input-njs')!;
const njsInputOffset = document.querySelector<HTMLInputElement>('#njs-input-offset')!;
const njsInputHJD = document.querySelector<HTMLInputElement>('#njs-input-hjd')!;
const njsInputJD = document.querySelector<HTMLInputElement>('#njs-input-jd')!;
const njsInputReact = document.querySelector<HTMLInputElement>('#njs-input-reacttime')!;
const njsOutputJD = document.querySelector<HTMLElement>('#njs-output-jd')!;
const njsOutputMinReact = document.querySelector<HTMLElement>('#njs-output-reacttime')!;
const njsOutputJDOHigh = document.querySelector<HTMLElement>(
    '#njs-output-jd-optimal-high'
)!;
const njsOutputJDOLow = document.querySelector<HTMLElement>(
    '#njs-output-jd-optimal-low'
)!;
const njsOutputReverseStaircase = document.querySelector<HTMLElement>(
    '#njs-output-reverse-staircase'
)!;
const njsOutputReverseStaircaseTime = document.querySelector<HTMLElement>(
    '#njs-output-reverse-staircase-time'
)!;
const njsOutputReverseStaircaseDiagonal = document.querySelector<HTMLElement>(
    '#njs-output-reverse-staircase-diagonal'
)!;
const njsOutputReverseStaircaseDiagonalTime = document.querySelector<HTMLElement>(
    '#njs-output-reverse-staircase-diagonal-time'
)!;
const njsOutputInline = document.querySelector<HTMLElement>('#njs-output-inline')!;
const njsOutputInlineTime = document.querySelector<HTMLElement>(
    '#njs-output-inline-time'
)!;
const njsSelectScale = document.querySelector<HTMLSelectElement>(
    '#njs-option-njs-scale'
)!;

const labelInputText = document.querySelector<HTMLInputElement>('#label-input-text')!;
const labelOutputText = document.querySelector<HTMLInputElement>('#label-output-text')!;
const labelInputDiffCount1 = document.querySelector<HTMLInputElement>(
    '#label-input-diff-count-1'
)!;
const labelInputDiffCount2 = document.querySelector<HTMLInputElement>(
    '#label-input-diff-count-2'
)!;
const labelInputDiffCount3 = document.querySelector<HTMLInputElement>(
    '#label-input-diff-count-3'
)!;
const labelInputDiffCount4 = document.querySelector<HTMLInputElement>(
    '#label-input-diff-count-4'
)!;
const labelInputDiffCount5 = document.querySelector<HTMLInputElement>(
    '#label-input-diff-count-5'
)!;

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

labelInputText.addEventListener('input', inputLabelTextHandler);
labelInputDiffCount1.addEventListener('click', inputDiffCountHandler);
labelInputDiffCount2.addEventListener('click', inputDiffCountHandler);
labelInputDiffCount3.addEventListener('click', inputDiffCountHandler);
labelInputDiffCount4.addEventListener('click', inputDiffCountHandler);
labelInputDiffCount5.addEventListener('click', inputDiffCountHandler);

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

function inputBPMHandler(this: HTMLInputElement, ev: Event) {
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
        this.value = bpm.value.toString();
    }
}
function inputPrecBeatHandler(this: HTMLInputElement, ev: Event) {
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
function inputPrecTimeHandler(this: HTMLInputElement, ev: Event) {
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
function inputPrecRealTimeHandler(this: HTMLInputElement, ev: Event) {
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
function inputEBPMHandler(this: HTMLInputElement, ev: Event) {
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

function inputNJSHandler(this: HTMLInputElement, ev: Event) {
    noteJumpSpeed.njs =
        Math.abs(parseFloat(this.value)) > 0
            ? Math.abs(parseFloat(this.value))
            : noteJumpSpeed.njs;
    updateNJS();
    if (ev.type === 'change') {
        this.value = round(noteJumpSpeed.njs, 3).toString();
    }
}
function inputNJSOffsetHandler(this: HTMLInputElement, ev: Event) {
    noteJumpSpeed.offset = parseFloat(this.value) || 0;
    updateNJS();
    if (ev.type === 'change') {
        this.value = round(noteJumpSpeed.offset, 3).toString();
    }
}
function inputHJDHandler(this: HTMLInputElement, ev: Event) {
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
function inputJDHandler(this: HTMLInputElement, ev: Event) {
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
function inputReactTimeHandler(this: HTMLInputElement, ev: Event) {
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
    njsOutputReverseStaircase.textContent = round(
        (1.425 / noteJumpSpeed.njs - 0.0216882353) * (bpm.value / 60),
        3
    ).toString();
    njsOutputReverseStaircaseTime.textContent = round(
        1 / ((1.425 / noteJumpSpeed.njs - 0.0216882353) * (bpm.value / 60)),
        1
    ).toString();
    njsOutputReverseStaircaseDiagonal.textContent = round(
        (1.425 / noteJumpSpeed.njs - 0.03414823529) * (bpm.value / 60),
        3
    ).toString();
    njsOutputReverseStaircaseDiagonalTime.textContent = round(
        1 / ((1.425 / noteJumpSpeed.njs - 0.03414823529) * (bpm.value / 60)),
        1
    ).toString();
    njsOutputInline.textContent = round(
        (1.425 / noteJumpSpeed.njs) * (bpm.value / 60),
        3
    ).toString();
    njsOutputInlineTime.textContent = round(
        1 / ((1.425 / noteJumpSpeed.njs) * (bpm.value / 60)),
        1
    ).toString();
    njsOutputJD.textContent = round(noteJumpSpeed.jdMin, 2).toString();
}

function inputLabelTextHandler(this: HTMLInputElement) {
    if (this.value.trim() !== '') {
        labelOutputText.textContent = this.value.trim();
    } else {
        labelOutputText.textContent = 'none';
    }
}
function inputDiffCountHandler(this: HTMLInputElement) {
    labelOutputText.className = `diff-label diff-count-${parseInt(this.value)}`;
}
