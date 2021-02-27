document.getElementById('watermark').innerHTML = 'Kival Evan#5480 | ';
document.getElementById('version').innerHTML = 'v1.1.0';

const input = {
    bpm: 0,
    ebpm: {
        stream: 0,
        ohj: 0,
    },
    beatPrec: 2,
    njs: 16,
    offset: 0,
    hjd: 0,
    jd: 0,
    reactTime: 0,
    njsScale: 'hjd',
};

document.getElementById('input-bpm').value = input.bpm;
document.getElementById('input-beatprec').value = input.beatPrec;
document.getElementById('input-ebpm-stream').value = input.ebpm.stream;
document.getElementById('input-ebpm-ohj').value = input.ebpm.ohj;
document.getElementById('input-njs').value = input.njs;
document.getElementById('input-offset').value = input.offset;
document.getElementById('input-hjd').value = input.hjd;
document.getElementById('input-jd').value = input.jd;
document.getElementById('input-reacttime').value = input.reactTime;

function calcEffectiveBPM() {
    return (input.bpm * 0.5) / (1 / input.beatPrec);
}
function calcBeatPrecision() {
    return input.ebpm.stream / (input.bpm * 0.25);
}

function calcHalfJumpDuration() {
    const maxHalfJump = 18;
    const noteJumpMovementSpeed = (input.njs * input.bpm) / input.bpm;
    const num = 60 / input.bpm;
    let hjd = 4;
    while (noteJumpMovementSpeed * num * hjd > maxHalfJump) {
        hjd /= 2;
    }
    hjd += input.offset;
    if (hjd < 1) {
        hjd = 1;
    }
    return hjd;
}
function calcHalfJumpDurationNoOffset() {
    const maxHalfJump = 18;
    const noteJumpMovementSpeed = (input.njs * input.bpm) / input.bpm;
    const num = 60 / input.bpm;
    let hjd = 4;
    while (noteJumpMovementSpeed * num * hjd > maxHalfJump) {
        hjd /= 2;
    }
    if (hjd < 1) {
        hjd = 1;
    }
    return hjd;
}
function calcJumpDistance() {
    return input.njs * (60 / input.bpm) * calcHalfJumpDuration() * 2;
}
function calcReactionTimeJD() {
    return calcJumpDistance() / (2 * input.njs);
}
function calcReactionTimeHJD() {
    return (60 / input.bpm) * calcHalfJumpDuration();
}

function round(num, d = 0) {
    if (!d > 0) {
        return Math.round(num);
    }
    return Math.round(num * Math.pow(10, d)) / Math.pow(10, d);
}
