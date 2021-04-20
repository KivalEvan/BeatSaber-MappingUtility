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
    input.njsTool.njsScale = this.value;
});

// sps thingy
for (const d in input.diffSPS) {
    document.getElementById(`input-sps-${d}`).addEventListener('input', inputSPS);
    document.getElementById(`input-sps-${d}`).addEventListener('change', inputSPS);
}

// diff label thing
document.getElementById('input-difficulty-label').addEventListener('input', function () {
    if (this.value.trim() !== '') {
        input.ingameDiffLabel.diffLabel = this.value.trim();
        document.getElementById('output-difficulty-label').innerHTML = input.ingameDiffLabel.diffLabel;
    } else {
        document.getElementById('output-difficulty-label').innerHTML = 'none';
    }
});
document.getElementById('input-diff-count-1').addEventListener('click', inputDiffCount);
document.getElementById('input-diff-count-2').addEventListener('click', inputDiffCount);
document.getElementById('input-diff-count-3').addEventListener('click', inputDiffCount);
document.getElementById('input-diff-count-4').addEventListener('click', inputDiffCount);
document.getElementById('input-diff-count-5').addEventListener('click', inputDiffCount);

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

// random pattern
tableRPattern();
document.getElementById('input-rpattern-row').addEventListener('change', function () {
    input.randomPattern.maxLayer = Math.min(Math.abs(parseFloat(this.value)) || 1, 4);
    this.value = input.randomPattern.maxLayer;
    tableRPattern();
});
document.getElementById('input-rpattern-column').addEventListener('change', function () {
    input.randomPattern.maxIndex = Math.min(Math.abs(parseFloat(this.value)) || 1, 8);
    this.value = input.randomPattern.maxIndex;
    tableRPattern();
});
document.getElementById('input-generate-rpattern').addEventListener('click', generateRandomPattern);
document.getElementById('input-rpattern-red').addEventListener('change', function () {
    input.randomPattern.note[0] = Math.abs(parseFloat(this.value)) || 0;
});
document.getElementById('input-rpattern-blue').addEventListener('change', function () {
    input.randomPattern.note[1] = Math.abs(parseFloat(this.value)) || 0;
});
document.getElementById('input-rpattern-bomb').addEventListener('change', function () {
    input.randomPattern.note[2] = Math.abs(parseFloat(this.value)) || 0;
});
document.getElementById('input-rpattern-total').addEventListener('change', function () {
    input.randomPattern.total = Math.abs(parseFloat(this.value)) || 0;
});
document.getElementById('input-rpattern-limit').addEventListener('click', function () {
    input.randomPattern.limit = this.checked;
});
document.getElementById('input-rpattern-nodot').addEventListener('click', function () {
    input.randomPattern.noDot = this.checked;
});

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
        input.precTool.realTimePrec = (60 / input.bpm / input.precTool.beatPrec) * 1000;
        document.getElementById('input-realtimeprec').value = round(input.precTool.realTimePrec, 1);
        document.getElementById('output-reacttime').innerHTML = `${round((60 / input.bpm) * 1000)}ms`;
    } else {
        disableInput();
    }
    if (e.type === 'change') {
        this.value = input.bpm;
    }
}
function inputBeatPrec(e) {
    input.precTool.beatPrec = Math.abs(parseFloat(this.value)) > 0 ? Math.abs(parseFloat(this.value)) : 1;
    if (input.precTool.beatPrec > 0) {
        input.precTool.timePrec = 1 / input.precTool.beatPrec;
        input.precTool.realTimePrec = (60 / input.bpm / input.precTool.beatPrec) * 1000;
        updateEBPM();
        document.getElementById('input-timeprec').value = round(input.precTool.timePrec, 3);
        document.getElementById('input-realtimeprec').value = round(input.precTool.realTimePrec, 1);
    }
    if (e.type === 'change') {
        this.value = round(input.precTool.beatPrec, 3);
    }
}
function inputTimePrec(e) {
    input.precTool.timePrec = Math.abs(parseFloat(this.value)) > 0 ? Math.abs(parseFloat(this.value)) : 1;
    if (input.precTool.timePrec > 0) {
        input.precTool.beatPrec = 1 / input.precTool.timePrec;
        input.precTool.realTimePrec = (60 / input.bpm / input.precTool.beatPrec) * 1000;
        updateEBPM();
        document.getElementById('input-beatprec').value = round(input.precTool.beatPrec, 3);
        document.getElementById('input-realtimeprec').value = round(input.precTool.realTimePrec, 1);
    }
    if (e.type === 'change') {
        this.value = round(input.precTool.timePrec, 3);
    }
}
function inputRealTimePrec(e) {
    input.precTool.realTimePrec = Math.abs(parseFloat(this.value)) > 0 ? Math.abs(parseFloat(this.value)) : 1;
    if (input.precTool.realTimePrec > 0) {
        input.precTool.timePrec = (input.bpm * input.precTool.realTimePrec) / 60000;
        input.precTool.beatPrec = 1 / input.precTool.timePrec;
        updateEBPM();
        document.getElementById('input-timeprec').value = round(input.precTool.timePrec, 3);
        document.getElementById('input-beatprec').value = round(input.precTool.beatPrec, 3);
    }
    if (e.type === 'change') {
        this.value = round(input.precTool.realTimePrec, 3);
    }
}
function inputEBPM(e) {
    if (this.id === 'input-ebpm-ohj') {
        input.precTool.ebpm.ohj = Math.abs(parseFloat(this.value)) > 0 ? Math.abs(parseFloat(this.value)) : input.bpm;
        input.precTool.ebpm.stream = input.precTool.ebpm.ohj / 2;
        if (e.type === 'change') {
            this.value = round(input.precTool.ebpm.ohj, 2);
        }
        document.getElementById('input-ebpm-stream').value = round(input.precTool.ebpm.stream, 2);
    }
    if (this.id === 'input-ebpm-stream') {
        input.precTool.ebpm.stream = Math.abs(parseFloat(this.value)) > 0 ? Math.abs(parseFloat(this.value)) : input.bpm;
        input.precTool.ebpm.ohj = input.precTool.ebpm.stream * 2;
        if (e.type === 'change') {
            this.value = round(input.precTool.ebpm.stream, 2);
        }
        document.getElementById('input-ebpm-ohj').value = round(input.precTool.ebpm.ohj, 2);
    }
    input.precTool.beatPrec = calcBeatPrecision();
    input.precTool.timePrec = 1 / input.beatPrec;
    input.precTool.realTimePrec = (60 / input.bpm / input.precTool.beatPrec) * 1000;
    document.getElementById('input-beatprec').value = round(input.precTool.beatPrec, 3);
    document.getElementById('input-timeprec').value = round(input.precTool.timePrec, 3);
    document.getElementById('input-realtimeprec').value = round(input.precTool.realTimePrec, 1);
}
function updateEBPM() {
    input.precTool.ebpm.ohj = calcEffectiveBPM();
    input.precTool.ebpm.stream = calcEffectiveBPM() / 2;
    document.getElementById('input-ebpm-ohj').value = round(input.precTool.ebpm.ohj, 2);
    document.getElementById('input-ebpm-stream').value = round(input.precTool.ebpm.stream, 2);
}

function inputNJS(e) {
    input.njsTool.njs = Math.abs(parseFloat(this.value)) > 0 ? Math.abs(parseFloat(this.value)) : input.njsTool.njs;
    updateNJS();
    if (e.type === 'change') {
        this.value = round(input.njsTool.njs, 3);
    }
}
function inputNJSOffset(e) {
    input.njsTool.offset = parseFloat(this.value) || 0;
    updateNJS();
    if (e.type === 'change') {
        this.value = round(input.njsTool.offset, 3);
    }
}
function updateNJS() {
    input.njsTool.hjd = calcHalfJumpDuration();
    input.njsTool.jd = calcJumpDistance();
    input.njsTool.reactTime = calcReactionTimeJD();
    document.getElementById('input-hjd').value = round(input.njsTool.hjd, 3);
    document.getElementById('input-jd').value = round(input.njsTool.jd, 2);
    document.getElementById('input-reacttime').value = round(input.njsTool.reactTime * 1000);
    document.getElementById('output-jd-optimal-high').innerHTML = round(calcJumpDistanceOptimalHigh(), 2);
    document.getElementById('output-jd-optimal-low').innerHTML = round(calcJumpDistanceOptimalLow(), 2);
    document.getElementById('output-jd').innerHTML = round(input.njsTool.njs * (60 / input.bpm) * 2, 2);
}
function inputHJD(e) {
    input.njsTool.hjd = Math.abs(parseFloat(this.value)) >= 1 ? Math.abs(parseFloat(this.value)) : input.njsTool.hjd;
    input.njsTool.offset = input.njsTool.hjd - calcHalfJumpDurationNoOffset();
    input.njsTool.hjd = calcHalfJumpDuration();
    input.njsTool.jd = calcJumpDistance();
    input.njsTool.reactTime = calcReactionTimeJD();
    document.getElementById('input-jd').value = round(input.njsTool.jd, 2);
    document.getElementById('input-reacttime').value = round(input.njsTool.reactTime * 1000);
    document.getElementById('output-jd').innerHTML = round(input.njsTool.njs * (60 / input.bpm) * 2, 2);
    document.getElementById('input-offset').value = round(input.njsTool.offset, 3);
    if (e.type === 'change') {
        this.value = round(input.njsTool.hjd, 3);
    }
}
function inputJD(e) {
    input.njsTool.jd = Math.abs(parseFloat(this.value)) > 0 ? Math.abs(parseFloat(this.value)) : input.njsTool.jd;
    if (input.njsTool.njsScale === 'hjd') {
        if (input.njsTool.jd / ((60 / input.bpm) * input.njsTool.njs * 2) < 1) {
            input.njsTool.jd = input.njsTool.njs * (60 / input.bpm) * 2;
        }
        input.njsTool.hjd = input.njsTool.jd / ((60 / input.bpm) * input.njsTool.njs * 2);
    }
    if (input.njsScale === 'njs') {
        console.log(input.njsTool.jd / (2 * input.njsTool.reactTime));
        input.njs = input.njsTool.jd / (2 * input.njsTool.reactTime);
    }
    input.njsTool.offset = input.njsTool.hjd - calcHalfJumpDurationNoOffset();
    input.njsTool.hjd = calcHalfJumpDuration();
    input.njsTool.jd = calcJumpDistance();
    input.njsTool.reactTime = calcReactionTimeJD();
    document.getElementById('input-hjd').value = round(input.njsTool.hjd, 3);
    document.getElementById('input-reacttime').value = round(input.njsTool.reactTime * 1000);
    document.getElementById('output-jd').innerHTML = round(input.njsTool.njs * (60 / input.bpm) * 2, 2);
    document.getElementById('input-njs').value = round(input.njsTool.njs, 3);
    document.getElementById('input-offset').value = round(input.njsTool.offset, 3);
    if (e.type === 'change') {
        this.value = round(input.njsTool.jd, 2);
    }
}
function inputReactTime(e) {
    input.njsTool.reactTime =
        Math.abs(parseFloat(this.value)) / 1000 > 0 ? Math.abs(parseFloat(this.value)) / 1000 : input.njsTool.reactTime;
    if (input.njsTool.reactTime < 60 / input.bpm) {
        input.njsTool.reactTime = 60 / input.bpm;
    }
    input.njsTool.hjd = input.njsTool.reactTime / (60 / input.bpm);
    input.njsTool.offset = input.njsTool.hjd - calcHalfJumpDurationNoOffset();
    input.njsTool.hjd = calcHalfJumpDuration();
    input.njsTool.jd = calcJumpDistance();
    input.njsTool.reactTime = calcReactionTimeJD();
    document.getElementById('input-hjd').value = round(input.njsTool.hjd, 3);
    document.getElementById('input-jd').value = round(input.njsTool.jd, 2);
    document.getElementById('output-jd').innerHTML = round(input.njsTool.njs * (60 / input.bpm) * 2, 2);
    document.getElementById('input-offset').value = round(input.njsTool.offset, 3);
    if (e.type === 'change') {
        this.value = round(input.njsTool.reactTime * 1000);
    }
}

function inputSPS(e) {
    const objName = this.id.slice(10);
    input.diffSPS[objName] = this.value ? Math.abs(parseFloat(this.value.trim())) : null;
    let prevDiff = null;
    let highest = null;
    let lowest = null;
    for (const d in input.diffSPS) {
        if (input.diffSPS[d] !== null) {
            if (!highest || highest < input.diffSPS[d]) {
                highest = input.diffSPS[d];
            }
            if (!lowest || lowest > input.diffSPS[d]) {
                lowest = input.diffSPS[d];
            }
            if (prevDiff !== null) {
                document.getElementById(`output-sps-${prevDiff}`).innerHTML = `${
                    input.diffSPS[d] !== 0 ? ((1 - input.diffSPS[prevDiff] / input.diffSPS[d]) * 100).toFixed(2) : 'Infinity'
                }%`;
            }
            prevDiff = d;
        }
        document.getElementById(`output-sps-${d}`).innerHTML = '';
    }
    document.getElementById('output-sps-total-reduction').innerHTML = `${
        highest || (highest && lowest) ? ((1 - lowest / highest) * 100).toFixed(2) : '0.00'
    }%`;
    if (e.type === 'change') {
        if (input.diffSPS[objName] !== null) {
            this.value = round(input.diffSPS[objName], 2);
        }
    }
}

function inputDiffCount() {
    input.ingameDiffLabel.diffCount = parseInt(this.value);
    document.getElementById('output-difficulty-label').className = `diff-labels diff-count-${input.ingameDiffLabel.diffCount}`;
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
    if (/^\#?[0-9a-fA-F]{6,8}/.test(this.value.trim())) {
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

function tableRPattern() {
    let table = document.getElementById('table-rpattern');
    table.innerHTML = '';
    for (let l = 0; l < input.randomPattern.maxLayer; l++) {
        let row = document.createElement('tr');
        for (let i = 0; i < input.randomPattern.maxIndex; i++) {
            let elem = document.createElement('td');
            elem.className = 'table-grid';
            let img = document.createElement('img');
            img.className = 'table-rpattern-image';
            img.src = noteImage.blank;
            img.alt = noteImage.blank.slice(0, -4);
            elem.appendChild(img);
            row.appendChild(elem);
        }
        table.appendChild(row);
    }
}
function generateRandomPattern() {
    let total = 2;
    const note = [input.randomPattern.note[0], input.randomPattern.note[1], input.randomPattern.note[2]];
    const maxSize = input.randomPattern.maxIndex * input.randomPattern.maxLayer;
    // deal with total
    if (input.randomPattern.limit) {
        total = Math.min(
            input.randomPattern.total,
            note.reduce((acc, cv) => acc + cv),
            maxSize
        );
    }
    if (!input.randomPattern.limit) {
        total = Math.min(
            note.reduce((acc, cv) => acc + cv),
            maxSize
        );
    }
    const arrayTableImage = document.querySelectorAll('.table-rpattern-image');
    arrayTableImage.forEach((image) => {
        image.src = 'blank.png';
        image.alt = 'blank';
        image.className = 'table-rpattern-image';
    });
    if (total === 0) {
        return;
    }
    const grid = new Array(maxSize).fill(null);
    for (let i = 0; i < total; ) {
        let randomIL = Math.floor(Math.random() * maxSize);
        let randomDir = Math.floor(Math.random() * 9);
        let randomNote = Math.floor(Math.random() * 3);
        for (let j = 0; j < 3; j++) {
            if (note[randomNote] === 0) {
                randomNote = (randomNote + 1) % 3;
            }
        }
        if (note[randomNote] === 0) {
            break;
        }
        for (let j = 0; j < maxSize; j++) {
            let pos = (randomIL + j) % maxSize;
            if (grid[pos] === null) {
                if (randomNote === 2) {
                    randomDir = 0;
                }
                grid[pos] = 'not null';
                arrayTableImage[pos].src =
                    randomDir !== 8 || input.randomPattern.noDot ? noteImage[randomNote] : noteImage[randomNote + 3];
                arrayTableImage[pos].alt = noteImage[randomNote].slice(0, -4);
                if (randomDir !== 8) {
                    arrayTableImage[pos].className += ` ${noteRotation[randomDir]}`;
                    arrayTableImage[pos].alt += ` ${noteRotation[randomDir]}`;
                }
                note[randomNote]--;
                i++;
                break;
            }
        }
    }
}
