// bpm stuff
document.getElementById('input-bpm').addEventListener('input', function () {
    input.bpm = Math.abs(parseFloat(this.value)) || 0;
    inputBPM();
});
document.getElementById('input-bpm').addEventListener('change', function () {
    input.bpm = Math.abs(parseFloat(this.value)) || 0;
    inputBPM();
    document.getElementById('input-bpm').value = input.bpm;
});

document.getElementById('input-beatprec').addEventListener('input', function () {
    input.beatPrec = Math.abs(parseFloat(this.value)) > 0 ? Math.abs(parseFloat(this.value)) : 1;
    inputBeatPrec();
});
document.getElementById('input-beatprec').addEventListener('change', function () {
    input.beatPrec = Math.abs(parseFloat(this.value)) > 0 ? Math.abs(parseFloat(this.value)) : 1;
    inputBeatPrec();
    document.getElementById('input-beatprec').value = round(input.beatPrec, 3);
});

document.getElementById('input-timeprec').addEventListener('input', function () {
    input.timePrec = Math.abs(parseFloat(this.value)) > 0 ? Math.abs(parseFloat(this.value)) : 1;
    inputTimePrec();
});
document.getElementById('input-timeprec').addEventListener('change', function () {
    input.timePrec = Math.abs(parseFloat(this.value)) > 0 ? Math.abs(parseFloat(this.value)) : 1;
    inputTimePrec();
    document.getElementById('input-timeprec').value = round(input.timePrec, 3);
});

document.getElementById('input-ebpm-ohj').addEventListener('input', function () {
    input.ebpm.ohj = Math.abs(parseFloat(this.value)) > 0 ? Math.abs(parseFloat(this.value)) : input.bpm;
    inputEBPMOHJ();
});
document.getElementById('input-ebpm-ohj').addEventListener('change', function () {
    input.ebpm.ohj = Math.abs(parseFloat(this.value)) > 0 ? Math.abs(parseFloat(this.value)) : input.bpm;
    inputEBPMOHJ();
    document.getElementById('input-ebpm-ohj').value = round(input.ebpm.ohj, 2);
});

document.getElementById('input-ebpm-stream').addEventListener('input', function () {
    input.ebpm.stream = Math.abs(parseFloat(this.value)) > 0 ? Math.abs(parseFloat(this.value)) : input.bpm;
    inputEBPMStream();
});
document.getElementById('input-ebpm-stream').addEventListener('change', function () {
    input.ebpm.stream = Math.abs(parseFloat(this.value)) > 0 ? Math.abs(parseFloat(this.value)) : input.bpm;
    inputEBPMStream();
    document.getElementById('input-ebpm-stream').value = round(input.ebpm.stream, 2);
});

// njs stuff
document.getElementById('input-njs').addEventListener('input', function () {
    input.njs = Math.abs(parseFloat(this.value)) > 0 ? Math.abs(parseFloat(this.value)) : input.njs;
    updateNJS();
});
document.getElementById('input-njs').addEventListener('change', function () {
    input.njs = Math.abs(parseFloat(this.value)) > 0 ? Math.abs(parseFloat(this.value)) : input.njs;
    updateNJS();
    document.getElementById('input-njs').value = round(input.njs, 3);
});

document.getElementById('input-offset').addEventListener('input', function () {
    input.offset = parseFloat(this.value) || 0;
    updateNJS();
});
document.getElementById('input-offset').addEventListener('change', function () {
    input.offset = parseFloat(this.value) || 0;
    updateNJS();
    document.getElementById('input-offset').value = round(input.offset, 3);
});

document.getElementById('input-hjd').addEventListener('input', function () {
    input.hjd = Math.abs(parseFloat(this.value)) >= 1 ? Math.abs(parseFloat(this.value)) : input.hjd;
    inputHJD();
});
document.getElementById('input-hjd').addEventListener('change', function () {
    input.hjd = Math.abs(parseFloat(this.value)) >= 1 ? Math.abs(parseFloat(this.value)) : input.hjd;
    inputHJD();
    document.getElementById('input-hjd').value = round(input.hjd, 3);
});

document.getElementById('input-jd').addEventListener('input', function () {
    input.jd = Math.abs(parseFloat(this.value)) > 0 ? Math.abs(parseFloat(this.value)) : input.jd;
    inputJD();
});
document.getElementById('input-jd').addEventListener('change', function () {
    input.jd = Math.abs(parseFloat(this.value)) > 0 ? Math.abs(parseFloat(this.value)) : input.jd;
    inputJD();
    document.getElementById('input-jd').value = round(input.jd, 2);
});

document.getElementById('input-reacttime').addEventListener('input', function () {
    input.reactTime = Math.abs(parseFloat(this.value)) / 1000 > 0 ? Math.abs(parseFloat(this.value)) / 1000 : input.reactTime;
    inputReactTime();
});
document.getElementById('input-reacttime').addEventListener('change', function () {
    input.reactTime = Math.abs(parseFloat(this.value)) / 1000 > 0 ? Math.abs(parseFloat(this.value)) / 1000 : input.reactTime;
    inputReactTime();
    document.getElementById('input-reacttime').value = round(input.reactTime * 1000);
});

document.getElementById('input-njs-scale').addEventListener('change', function () {
    input.njsScale = this.value;
});

function enableInput() {
    document.getElementById('input-beatprec').disabled = false;
    document.getElementById('input-timeprec').disabled = false;
    document.getElementById('input-ebpm-ohj').disabled = false;
    document.getElementById('input-ebpm-stream').disabled = false;
    document.getElementById('input-njs').disabled = false;
    document.getElementById('input-offset').disabled = false;
    document.getElementById('input-hjd').disabled = false;
    document.getElementById('input-jd').disabled = false;
    document.getElementById('input-reacttime').disabled = false;
    document.getElementById('input-njs-scale').disabled = false;
}
function disableInput() {
    document.getElementById('input-beatprec').disabled = true;
    document.getElementById('input-timeprec').disabled = true;
    document.getElementById('input-ebpm-ohj').disabled = true;
    document.getElementById('input-ebpm-stream').disabled = true;
    document.getElementById('input-njs').disabled = true;
    document.getElementById('input-offset').disabled = true;
    document.getElementById('input-hjd').disabled = true;
    document.getElementById('input-jd').disabled = true;
    document.getElementById('input-reacttime').disabled = true;
    document.getElementById('input-njs-scale').disabled = true;
}

function inputBPM() {
    if (input.bpm > 0) {
        enableInput();
        updateEBPM();
        updateNJS();
        document.getElementById('output-reacttime').innerHTML = `${round((60 / input.bpm) * 1000)}ms`;
    } else {
        disableInput();
    }
}
function inputBeatPrec() {
    if (input.beatPrec > 0) {
        updateEBPM();
        input.timePrec = 1 / input.beatPrec;
        document.getElementById('input-timeprec').value = round(input.timePrec, 3);
    }
}
function inputTimePrec() {
    if (input.beatPrec > 0) {
        updateEBPM();
        input.beatPrec = 1 / input.timePrec;
        document.getElementById('input-beatprec').value = round(input.beatPrec, 3);
    }
}
function inputEBPMOHJ() {
    input.ebpm.stream = input.ebpm.ohj / 2;
    input.beatPrec = calcBeatPrecision();
    document.getElementById('input-beatprec').value = round(input.beatPrec, 3);
    document.getElementById('input-ebpm-ohj').value = round(input.ebpm.ohj, 2);
    document.getElementById('input-ebpm-stream').value = round(input.ebpm.stream, 2);
}
function inputEBPMStream() {
    input.ebpm.ohj = input.ebpm.stream * 2;
    input.beatPrec = calcBeatPrecision();
    document.getElementById('input-beatprec').value = round(input.beatPrec, 3);
    document.getElementById('input-ebpm-ohj').value = round(input.ebpm.ohj, 2);
}
function updateEBPM() {
    input.ebpm.ohj = calcEffectiveBPM();
    input.ebpm.stream = calcEffectiveBPM() / 2;
    document.getElementById('input-ebpm-ohj').value = round(input.ebpm.ohj, 2);
    document.getElementById('input-ebpm-stream').value = round(input.ebpm.stream, 2);
    document.getElementById('output-time-prec').innerHTML = `${round((60 / input.bpm / input.beatPrec) * 1000, 1)}ms`;
}

function updateNJS() {
    input.hjd = calcHalfJumpDuration();
    input.jd = calcJumpDistance();
    input.reactTime = calcReactionTimeJD();
    document.getElementById('input-hjd').value = round(input.hjd, 3);
    document.getElementById('input-jd').value = round(input.jd, 2);
    document.getElementById('input-reacttime').value = round(input.reactTime * 1000);
    document.getElementById('output-jd').innerHTML = round(input.njs * (60 / input.bpm) * 2, 2);
}
function inputHJD() {
    input.offset = input.hjd - calcHalfJumpDurationNoOffset();
    input.hjd = calcHalfJumpDuration();
    input.jd = calcJumpDistance();
    input.reactTime = calcReactionTimeJD();
    document.getElementById('input-jd').value = round(input.jd, 2);
    document.getElementById('input-reacttime').value = round(input.reactTime * 1000);
    document.getElementById('output-jd').innerHTML = round(input.njs * (60 / input.bpm) * 2, 2);
    document.getElementById('input-offset').value = round(input.offset, 3);
}
function inputJD() {
    if (input.njsScale === 'hjd') {
        if (input.jd / ((60 / input.bpm) * input.njs * 2) < 1) {
            input.jd = input.njs * (60 / input.bpm) * 2;
        }
        input.hjd = input.jd / ((60 / input.bpm) * input.njs * 2);
    }
    if (input.njsScale === 'njs') {
        console.log(input.jd / (2 * input.reactTime));
        input.njs = input.jd / (2 * input.reactTime);
    }
    input.offset = input.hjd - calcHalfJumpDurationNoOffset();
    input.hjd = calcHalfJumpDuration();
    input.jd = calcJumpDistance();
    input.reactTime = calcReactionTimeJD();
    document.getElementById('input-hjd').value = round(input.hjd, 3);
    document.getElementById('input-reacttime').value = round(input.reactTime * 1000);
    document.getElementById('output-jd').innerHTML = round(input.njs * (60 / input.bpm) * 2, 2);
    document.getElementById('input-njs').value = round(input.njs, 3);
    document.getElementById('input-offset').value = round(input.offset, 3);
}
function inputReactTime() {
    if (input.reactTime < 60 / input.bpm) {
        input.reactTime = 60 / input.bpm;
    }
    input.hjd = input.reactTime / (60 / input.bpm);
    input.offset = input.hjd - calcHalfJumpDurationNoOffset();
    input.hjd = calcHalfJumpDuration();
    input.jd = calcJumpDistance();
    input.reactTime = calcReactionTimeJD();
    document.getElementById('input-hjd').value = round(input.hjd, 3);
    document.getElementById('input-jd').value = round(input.jd, 2);
    document.getElementById('output-jd').innerHTML = round(input.njs * (60 / input.bpm) * 2, 2);
    document.getElementById('input-offset').value = round(input.offset, 3);
}
