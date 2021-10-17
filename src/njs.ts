import BeatPerMinute from './bpm';

export default class NoteJumpSpeed {
    private _bpm: BeatPerMinute;
    private _njs: number;
    private _sdm: number;
    private _hjd: number;
    private static readonly HJD_START: number = 4;
    private static readonly HJD_MIN: number = 0.25;
    private _jd: number;
    private _jdMin: number;
    private _reactionTime: number;

    constructor(bpm: BeatPerMinute, njs = 10, sdm = 0) {
        this._bpm = bpm;
        this._njs = njs;
        this._sdm = sdm;
        this.update();
    }

    set njs(val: number) {
        this._njs = val;
        this.update();
    }
    get njs(): number {
        return this._njs;
    }
    set offset(val: number) {
        this._sdm = val;
        this.update();
    }
    get offset(): number {
        return this._sdm;
    }
    get hjd(): number {
        return this._hjd;
    }
    get hjdMin(): number {
        return NoteJumpSpeed.HJD_MIN;
    }
    get reactTime(): number {
        return this._reactionTime;
    }
    get jd(): number {
        return this._jd;
    }
    get jdMin(): number {
        return this._jdMin;
    }

    update(): void {
        this._hjd = this.calcHalfJumpDuration();
        this._jd = this.calcJumpDistance();
        this._jdMin = this.calcJumpDistance(NoteJumpSpeed.HJD_MIN);
        this._reactionTime = this.calcReactionTimeHJD();
    }
    calcHalfJumpDurationRaw(): number {
        const maxHalfJump = 18;
        const noteJumpMovementSpeed = (this._njs * this._njs) / this._njs;
        const num = 60 / this._bpm.value;
        let hjd = NoteJumpSpeed.HJD_START;
        while (noteJumpMovementSpeed * num * hjd > maxHalfJump) {
            hjd /= 2;
        }
        if (hjd < 1) {
            hjd = 1;
        }
        return hjd;
    }
    calcHalfJumpDuration(offset: number = this.offset): number {
        return Math.max(this.calcHalfJumpDurationRaw() + offset, NoteJumpSpeed.HJD_MIN);
    }
    calcHalfJumpDurationFromJD(jd: number = this.calcJumpDistance()): number {
        return jd / ((60 / this._bpm.value) * this._njs * 2);
    }
    calcHalfJumpDurationFromRT(rt: number = this.calcReactionTimeHJD()): number {
        return rt / (60 / this._bpm.value);
    }
    calcJumpDistance(hjd: number = this.calcHalfJumpDuration()): number {
        return this._njs * (60 / this._bpm.value) * hjd * 2;
    }
    calcJumpDistanceOptimalHigh(): number {
        return 18 * (1 / 1.07) ** this._njs + 18;
    }
    calcJumpDistanceOptimalLow(): number {
        return -(18 / (this._njs + 1)) + 18;
    }
    calcReactionTimeJD(jd: number = this.calcJumpDistance()): number {
        return jd / (2 * this._njs);
    }
    calcReactionTimeHJD(hjd: number = this.calcHalfJumpDuration()): number {
        return (60 / this._bpm.value) * hjd;
    }
}
