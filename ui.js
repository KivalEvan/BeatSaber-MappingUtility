// bpm stuff
document.getElementById('input-bpm').addEventListener('input', inputBPM);
document.getElementById('input-bpm').addEventListener('change', inputBPM);
document.getElementById('input-beatprec').addEventListener('input', inputBeatPrec);
document.getElementById('input-beatprec').addEventListener('change', inputBeatPrec);
document.getElementById('input-timeprec').addEventListener('input', inputTimePrec);
document.getElementById('input-timeprec').addEventListener('change', inputTimePrec);
document.getElementById('input-realtimeprec').addEventListener('input', inputRealTimePrec);
document.getElementById('input-realtimeprec').addEventListener('change', inputRealTimePrec);
document.getElementById('input-ebpm-ohj').addEventListener('input', inputEBPM);
document.getElementById('input-ebpm-ohj').addEventListener('change', inputEBPM);
document.getElementById('input-ebpm-stream').addEventListener('input', inputEBPM);
document.getElementById('input-ebpm-stream').addEventListener('change', inputEBPM);

// njs stuff
document.getElementById('input-njs').addEventListener('input', inputNJS);
document.getElementById('input-njs').addEventListener('change', inputNJS);
document.getElementById('input-offset').addEventListener('input', inputNJSOffset);
document.getElementById('input-offset').addEventListener('change', inputNJSOffset);
document.getElementById('input-hjd').addEventListener('input', inputHJD);
document.getElementById('input-hjd').addEventListener('change', inputHJD);
document.getElementById('input-jd').addEventListener('input', inputJD);
document.getElementById('input-jd').addEventListener('change', inputJD);
document.getElementById('input-reacttime').addEventListener('input', inputReactTime);
document.getElementById('input-reacttime').addEventListener('change', inputReactTime);
document.getElementById('option-njs-scale').addEventListener('change', function () {
    input.njsScale = this.value;
});

// sps thingy
for (const d in input.diffSPS) {
    document.getElementById(`input-sps-${d}`).addEventListener('input', inputSPS);
    document.getElementById(`input-sps-${d}`).addEventListener('change', inputSPS);
}

// color stuff
// pepega i know
let UIOptionColorScheme = document.getElementById('option-colorscheme');
let option = document.createElement('option');
option.value = 'Custom';
option.innerHTML = 'Custom';
UIOptionColorScheme.append(option);
for (const cs in colorScheme) {
    option = document.createElement('option');
    option.value = cs;
    option.innerHTML = cs;
    UIOptionColorScheme.append(option);
}
UIOptionColorScheme.addEventListener('change', optionColorScheme);
for (const obj in input.colorPicker) {
    document.getElementById(`input-hex-${obj.toLowerCase()}`).addEventListener('change', inputColorHex);
    document.getElementById(`input-picker-${obj.toLowerCase()}`).addEventListener('change', inputColorPicker);
    document.getElementById(`input-include-${obj.toLowerCase()}`).addEventListener('click', inputColorInclude);
    document.getElementById(`input-reset-${obj.toLowerCase()}`).addEventListener('click', inputColorReset);
    document.getElementById(`input-reset-${obj.toLowerCase()}`).style.display = 'none';
}
document.getElementById('io-colorjson').addEventListener('change', inputJSONColor);

function enableInput() {
    document.getElementById('input-beatprec').disabled = false;
    document.getElementById('input-timeprec').disabled = false;
    document.getElementById('input-realtimeprec').disabled = false;
    document.getElementById('input-ebpm-ohj').disabled = false;
    document.getElementById('input-ebpm-stream').disabled = false;
    document.getElementById('input-njs').disabled = false;
    document.getElementById('input-offset').disabled = false;
    document.getElementById('input-hjd').disabled = false;
    document.getElementById('input-jd').disabled = false;
    document.getElementById('input-reacttime').disabled = false;
    document.getElementById('option-njs-scale').disabled = false;
}
function disableInput() {
    document.getElementById('input-beatprec').disabled = true;
    document.getElementById('input-timeprec').disabled = true;
    document.getElementById('input-realtimeprec').disabled = true;
    document.getElementById('input-ebpm-ohj').disabled = true;
    document.getElementById('input-ebpm-stream').disabled = true;
    document.getElementById('input-njs').disabled = true;
    document.getElementById('input-offset').disabled = true;
    document.getElementById('input-hjd').disabled = true;
    document.getElementById('input-jd').disabled = true;
    document.getElementById('input-reacttime').disabled = true;
    document.getElementById('option-njs-scale').disabled = true;
}

function inputBPM(e) {
    input.bpm = Math.abs(parseFloat(this.value)) || 0;
    if (input.bpm > 0) {
        enableInput();
        updateEBPM();
        updateNJS();
        input.realTimePrec = (60 / input.bpm / input.beatPrec) * 1000;
        document.getElementById('input-realtimeprec').value = round(input.realTimePrec, 1);
        document.getElementById('output-reacttime').innerHTML = `${round((60 / input.bpm) * 1000)}ms`;
    } else {
        disableInput();
    }
    if (e.type === 'change') {
        this.value = input.bpm;
    }
}
function inputBeatPrec(e) {
    input.beatPrec = Math.abs(parseFloat(this.value)) > 0 ? Math.abs(parseFloat(this.value)) : 1;
    if (input.beatPrec > 0) {
        input.timePrec = 1 / input.beatPrec;
        input.realTimePrec = (60 / input.bpm / input.beatPrec) * 1000;
        updateEBPM();
        document.getElementById('input-timeprec').value = round(input.timePrec, 3);
        document.getElementById('input-realtimeprec').value = round(input.realTimePrec, 1);
    }
    if (e.type === 'change') {
        this.value = round(input.beatPrec, 3);
    }
}
function inputTimePrec(e) {
    input.timePrec = Math.abs(parseFloat(this.value)) > 0 ? Math.abs(parseFloat(this.value)) : 1;
    if (input.timePrec > 0) {
        input.beatPrec = 1 / input.timePrec;
        input.realTimePrec = (60 / input.bpm / input.beatPrec) * 1000;
        updateEBPM();
        document.getElementById('input-beatprec').value = round(input.beatPrec, 3);
        document.getElementById('input-realtimeprec').value = round(input.realTimePrec, 1);
    }
    if (e.type === 'change') {
        this.value = round(input.timePrec, 3);
    }
}
function inputRealTimePrec(e) {
    input.realTimePrec = Math.abs(parseFloat(this.value)) > 0 ? Math.abs(parseFloat(this.value)) : 1;
    if (input.realTimePrec > 0) {
        input.timePrec = (input.bpm * input.realTimePrec) / 60000;
        input.beatPrec = 1 / input.timePrec;
        updateEBPM();
        document.getElementById('input-timeprec').value = round(input.timePrec, 3);
        document.getElementById('input-beatprec').value = round(input.beatPrec, 3);
    }
    if (e.type === 'change') {
        this.value = round(input.realTimePrec, 3);
    }
}
function inputEBPM(e) {
    if (this.id === 'input-ebpm-ohj') {
        input.ebpm.ohj = Math.abs(parseFloat(this.value)) > 0 ? Math.abs(parseFloat(this.value)) : input.bpm;
        input.ebpm.stream = input.ebpm.ohj / 2;
        if (e.type === 'change') {
            this.value = round(input.ebpm.ohj, 2);
        }
        document.getElementById('input-ebpm-stream').value = round(input.ebpm.stream, 2);
    }
    if (this.id === 'input-ebpm-stream') {
        input.ebpm.stream = Math.abs(parseFloat(this.value)) > 0 ? Math.abs(parseFloat(this.value)) : input.bpm;
        input.ebpm.ohj = input.ebpm.stream * 2;
        if (e.type === 'change') {
            this.value = round(input.ebpm.stream, 2);
        }
        document.getElementById('input-ebpm-ohj').value = round(input.ebpm.ohj, 2);
    }
    input.beatPrec = calcBeatPrecision();
    input.timePrec = 1 / input.beatPrec;
    input.realTimePrec = (60 / input.bpm / input.beatPrec) * 1000;
    document.getElementById('input-beatprec').value = round(input.beatPrec, 3);
    document.getElementById('input-timeprec').value = round(input.timePrec, 3);
    document.getElementById('input-realtimeprec').value = round(input.realTimePrec, 1);
}

function updateEBPM() {
    input.ebpm.ohj = calcEffectiveBPM();
    input.ebpm.stream = calcEffectiveBPM() / 2;
    document.getElementById('input-ebpm-ohj').value = round(input.ebpm.ohj, 2);
    document.getElementById('input-ebpm-stream').value = round(input.ebpm.stream, 2);
}

function inputNJS(e) {
    input.njs = Math.abs(parseFloat(this.value)) > 0 ? Math.abs(parseFloat(this.value)) : input.njs;
    updateNJS();
    if (e.type === 'change') {
        this.value = round(input.njs, 3);
    }
}
function inputNJSOffset(e) {
    input.offset = parseFloat(this.value) || 0;
    updateNJS();
    if (e.type === 'change') {
        this.value = round(input.offset, 3);
    }
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
function inputHJD(e) {
    input.hjd = Math.abs(parseFloat(this.value)) >= 1 ? Math.abs(parseFloat(this.value)) : input.hjd;
    input.offset = input.hjd - calcHalfJumpDurationNoOffset();
    input.hjd = calcHalfJumpDuration();
    input.jd = calcJumpDistance();
    input.reactTime = calcReactionTimeJD();
    document.getElementById('input-jd').value = round(input.jd, 2);
    document.getElementById('input-reacttime').value = round(input.reactTime * 1000);
    document.getElementById('output-jd').innerHTML = round(input.njs * (60 / input.bpm) * 2, 2);
    document.getElementById('input-offset').value = round(input.offset, 3);
    if (e.type === 'change') {
        this.value = round(input.hjd, 3);
    }
}
function inputJD(e) {
    input.jd = Math.abs(parseFloat(this.value)) > 0 ? Math.abs(parseFloat(this.value)) : input.jd;
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
    if (e.type === 'change') {
        this.value = round(input.jd, 2);
    }
}
function inputReactTime(e) {
    input.reactTime = Math.abs(parseFloat(this.value)) / 1000 > 0 ? Math.abs(parseFloat(this.value)) / 1000 : input.reactTime;
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
    if (e.type === 'change') {
        this.value = round(input.reactTime * 1000);
    }
}

function inputSPS(e) {
    const objName = this.id.slice(10);
    input.diffSPS[objName] = this.value ? Math.abs(parseFloat(this.value.trim())) : null;
    let prevDiff = null;
    for (const d in input.diffSPS) {
        if (input.diffSPS[d] !== null) {
            if (prevDiff !== null) {
                document.getElementById(`output-sps-${prevDiff}`).innerHTML = `${
                    input.diffSPS[d] !== 0 ? ((1 - input.diffSPS[prevDiff] / input.diffSPS[d]) * 100).toFixed(2) : 'Infinity'
                }%`;
            }
            prevDiff = d;
        } else {
            document.getElementById(`output-sps-${d}`).innerHTML = '';
        }
    }
    if (e.type === 'change') {
        if (input.diffSPS[objName] !== null) {
            this.value = round(input.diffSPS[objName], 2);
        }
    }
}

function optionColorScheme() {
    if (this.value !== 'Custom') {
        for (const obj in input.colorPicker) {
            input.colorPicker[obj].hex = '#000000';
            input.colorPicker[obj].include = false;
            document.getElementById(`input-hex-${obj.toLowerCase()}`).value = '';
            document.getElementById(`input-picker-${obj.toLowerCase()}`).value = '#000000';
            document.getElementById(`input-include-${obj.toLowerCase()}`).checked = false;
            document.getElementById(`input-reset-${obj.toLowerCase()}`).style.display = 'none';
        }
        for (const obj in colorScheme[this.value]) {
            const hexColor = colorScheme[this.value][obj];
            const objName = obj.replace(/^\_/, '');
            input.colorPicker[objName].hex = hexColor;
            input.colorPicker[objName].include = true;
            document.getElementById(`input-hex-${objName.toLowerCase()}`).value = hexColor;
            document.getElementById(`input-picker-${objName.toLowerCase()}`).value = hexColor;
            document.getElementById(`input-include-${objName.toLowerCase()}`).checked = true;
            document.getElementById(`input-reset-${objName.toLowerCase()}`).style.display = 'block';
        }
        updateJSONColor();
    }
}
function inputJSONColor() {
    for (const obj in input.colorPicker) {
        input.colorPicker[obj].hex = '#000000';
        input.colorPicker[obj].include = false;
        document.getElementById(`input-hex-${obj.toLowerCase()}`).value = '';
        document.getElementById(`input-picker-${obj.toLowerCase()}`).value = '#000000';
        document.getElementById(`input-include-${obj.toLowerCase()}`).checked = false;
        document.getElementById(`input-reset-${obj.toLowerCase()}`).style.display = 'none';
    }
    document.getElementById('error-colorjson').innerHTML = '';
    const colorType = [
        '_colorLeft',
        '_colorRight',
        '_envColorLeft',
        '_envColorRight',
        '_envColorLeftBoost',
        '_envColorRightBoost',
        '_obstacleColor',
    ];
    try {
        if (/^{/.test(this.value.trim())) {
            input.colorParsed = JSON.parse(this.value.trim());
        } else {
            input.colorParsed = JSON.parse(`{${this.value.trim().replace(/\,$/, '')}}`);
        }
    } catch (err) {
        console.error(err);
        document.getElementById('error-colorjson').innerHTML = err + '<br>';
    }
    for (const obj in input.colorParsed) {
        if (colorType.includes(obj)) {
            const hexColor = rgbaToHex(input.colorParsed[obj]);
            const objName = obj.replace(/^\_/, '');
            input.colorPicker[objName].hex = hexColor;
            input.colorPicker[objName].include = true;
            document.getElementById(`input-hex-${objName.toLowerCase()}`).value = hexColor;
            document.getElementById(`input-picker-${objName.toLowerCase()}`).value = hexColor;
            document.getElementById(`input-include-${objName.toLowerCase()}`).checked = true;
            document.getElementById(`input-reset-${objName.toLowerCase()}`).style.display = 'block';
        }
    }
    updateJSONColor();
}
function updateJSONColor() {
    const parsed = {};
    for (const obj in input.colorPicker) {
        if (input.colorPicker[obj].include) {
            parsed[`_${obj}`] = hexToRGB(input.colorPicker[obj].hex);
        }
    }
    document.getElementById('io-colorjson').value = JSON.stringify(parsed, null, 4);
}
function inputColorHex() {
    // pepega
    if (/^\#?[0-9a-f]{6,8}/.test(this.value.trim())) {
        let objName = this.id.slice(10);
        for (const obj in input.colorPicker) {
            if (objName === obj.toLowerCase()) {
                objName = obj;
            }
        }
        input.colorPicker[objName].hex = this.value.trim().replace(/^\#?/, '#').slice(0, 7);
        input.colorPicker[objName].include = true;
        document.getElementById(`input-hex-${objName.toLowerCase()}`).value = input.colorPicker[objName].hex;
        document.getElementById(`input-picker-${objName.toLowerCase()}`).value = input.colorPicker[objName].hex;
        document.getElementById(`input-include-${objName.toLowerCase()}`).checked = true;
        document.getElementById(`input-reset-${objName.toLowerCase()}`).style.display = 'block';
        updateJSONColor();
    }
}
function inputColorPicker() {
    let objName = this.id.slice(13);
    for (const obj in input.colorPicker) {
        if (objName === obj.toLowerCase()) {
            objName = obj;
        }
    }
    input.colorPicker[objName].hex = this.value;
    input.colorPicker[objName].include = true;
    document.getElementById(`input-hex-${objName.toLowerCase()}`).value = this.value;
    document.getElementById(`input-include-${objName.toLowerCase()}`).checked = true;
    document.getElementById(`input-reset-${objName.toLowerCase()}`).style.display = 'block';
    updateJSONColor();
}
function inputColorInclude() {
    let objName = this.id.slice(14);
    for (const obj in input.colorPicker) {
        if (objName === obj.toLowerCase()) {
            objName = obj;
        }
    }
    input.colorPicker[objName].include = document.getElementById(`input-include-${objName.toLowerCase()}`).checked;
    if (input.colorPicker[objName].include) {
        input.colorPicker[objName].hex = document.getElementById(`input-picker-${objName.toLowerCase()}`).value;
        document.getElementById(`input-hex-${objName.toLowerCase()}`).value = input.colorPicker[objName].hex;
        document.getElementById(`input-reset-${objName.toLowerCase()}`).style.display = 'block';
    }
    updateJSONColor();
}
function inputColorReset() {
    let objName = this.id.slice(12);
    for (const obj in input.colorPicker) {
        if (objName === obj.toLowerCase()) {
            objName = obj;
        }
    }
    input.colorPicker[objName].hex = '#000000';
    input.colorPicker[objName].include = false;
    document.getElementById(`input-hex-${objName.toLowerCase()}`).value = '';
    document.getElementById(`input-picker-${objName.toLowerCase()}`).value = '#000000';
    document.getElementById(`input-include-${objName.toLowerCase()}`).checked = false;
    document.getElementById(`input-reset-${objName.toLowerCase()}`).style.display = 'none';
    updateJSONColor();
}
