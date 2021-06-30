export default class BeatPerMinute {
    constructor(private bpm: number = 128) {}
    set value(bpm: number) {
        this.bpm = bpm;
    }
    get value() {
        return this.bpm;
    }
}
