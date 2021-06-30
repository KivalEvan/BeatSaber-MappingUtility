import BeatPerMinute from './bpm';

export default class EBPMPrecision {
    private _bpm: BeatPerMinute;
    private _precBeat: number;
    private _precTime: number;
    private _precRealTime: number;
    private _ebpmOHJ: number;
    private _ebpmStream: number;

    constructor(bpm: BeatPerMinute, precBeat: number = 2) {
        this._bpm = bpm;
        this._precBeat = precBeat;
        this.update();
    }

    set precBeat(val: number) {
        this._precBeat = val;
        this.update();
    }
    get precBeat(): number {
        return this._precBeat;
    }
    set precTime(val: number) {
        this.precBeat = 1 / val;
    }
    get precTime(): number {
        return this._precTime;
    }
    set precRealTime(val: number) {
        this.precBeat = 1 / ((this._bpm.value * val) / 60000);
    }
    get precRealTime(): number {
        return this._precRealTime;
    }
    set ebpmStream(val: number) {
        this._ebpmStream = val;
        this.precBeat = this.calcBeatPrecision();
    }
    get ebpmStream(): number {
        return this._ebpmStream;
    }
    set ebpmOHJ(val: number) {
        this._ebpmStream = val / 2;
        this.precBeat = this.calcBeatPrecision();
    }
    get ebpmOHJ(): number {
        return this._ebpmOHJ;
    }

    update(): void {
        this._precTime = 1 / this._precBeat;
        this._precRealTime = (60 / this._bpm.value / this._precBeat) * 1000;
        this._ebpmOHJ = this.calcEffectiveBPM();
        this._ebpmStream = this._ebpmOHJ / 2;
    }
    private calcEffectiveBPM() {
        return (this._bpm.value * 0.5) / (1 / this._precBeat);
    }
    private calcBeatPrecision() {
        return this._ebpmStream / (this._bpm.value * 0.25);
    }
}
