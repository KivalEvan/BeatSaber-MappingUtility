document.getElementById('watermark').innerHTML = 'Kival Evan#5480';
document.getElementById('version').innerHTML = 'v1.3.1';
const noteImage = {
    0: 'noter.png',
    1: 'noteb.png',
    2: 'bomb.png',
    3: 'noterd.png',
    4: 'notebd.png',
    blank: 'blank.png',
};
const noteRotation = {
    0: '',
    1: 'deg180',
    2: 'deg270',
    3: 'deg90',
    4: 'deg315',
    5: 'deg45',
    6: 'deg225',
    7: 'deg135',
    8: '',
};

const input = {
    bpm: 0,
    precTool: {
        ebpm: {
            stream: 0,
            ohj: 0,
        },
        beatPrec: 2,
        timePrec: 0.5,
        realTimePrec: 0,
    },
    njsTool: {
        njs: 16,
        offset: 0,
        hjd: 0,
        jd: 0,
        reactTime: 0,
        njsScale: 'hjd',
    },
    diffSPS: {
        easy: null,
        normal: null,
        hard: null,
        expert: null,
        expertplus: null,
    },
    ingameDiffLabel: {
        diffLabel: 'Difficulty Label',
        diffCount: 1,
    },
    colorPicker: {
        colorLeft: {
            hex: null,
            include: false,
        },
        colorRight: {
            hex: null,
            include: false,
        },
        envColorLeft: {
            hex: null,
            include: false,
        },
        envColorRight: {
            hex: null,
            include: false,
        },
        envColorLeftBoost: {
            hex: null,
            include: false,
        },
        envColorRightBoost: {
            hex: null,
            include: false,
        },
        obstacleColor: {
            hex: null,
            include: false,
        },
    },
    colorParsed: {},
    randomPattern: {
        maxIndex: 4,
        maxLayer: 3,
        note: {
            0: 1,
            1: 1,
            2: 0,
        },
        total: 2,
        limit: false,
        noDot: false,
    },
};

document.getElementById('input-bpm').value = input.bpm;
document.getElementById('input-beatprec').value = input.precTool.beatPrec;
document.getElementById('input-timeprec').value = input.precTool.timePrec;
document.getElementById('input-realtimeprec').value = input.precTool.realTimePrec;
document.getElementById('input-ebpm-stream').value = input.precTool.ebpm.stream;
document.getElementById('input-ebpm-ohj').value = input.precTool.ebpm.ohj;
document.getElementById('input-njs').value = input.njsTool.njs;
document.getElementById('input-offset').value = input.njsTool.offset;
document.getElementById('input-hjd').value = input.njsTool.hjd;
document.getElementById('input-jd').value = input.njsTool.jd;
document.getElementById('input-reacttime').value = input.njsTool.reactTime;
document.getElementById('output-difficulty-label').innerHTML = input.ingameDiffLabel.diffLabel;
document.getElementById('input-rpattern-column').value = input.randomPattern.maxIndex;
document.getElementById('input-rpattern-row').value = input.randomPattern.maxLayer;
document.getElementById('input-rpattern-red').value = input.randomPattern.note[0];
document.getElementById('input-rpattern-blue').value = input.randomPattern.note[1];
document.getElementById('input-rpattern-bomb').value = input.randomPattern.note[2];
document.getElementById('input-rpattern-total').value = input.randomPattern.total;

function calcEffectiveBPM() {
    return (input.bpm * 0.5) / (1 / input.precTool.beatPrec);
}
function calcBeatPrecision() {
    return input.precTool.ebpm.stream / (input.bpm * 0.25);
}

function calcHalfJumpDuration() {
    const maxHalfJump = 18;
    const noteJumpMovementSpeed = (input.njsTool.njs * input.bpm) / input.bpm;
    const num = 60 / input.bpm;
    let hjd = 4;
    while (noteJumpMovementSpeed * num * hjd > maxHalfJump) {
        hjd /= 2;
    }
    hjd += input.njsTool.offset;
    if (hjd < 1) {
        hjd = 1;
    }
    return hjd;
}
function calcHalfJumpDurationNoOffset() {
    const maxHalfJump = 18;
    const noteJumpMovementSpeed = (input.njsTool.njs * input.bpm) / input.bpm;
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
    return input.njsTool.njs * (60 / input.bpm) * calcHalfJumpDuration() * 2;
}
function calcReactionTimeJD() {
    return calcJumpDistance() / (2 * input.njsTool.njs);
}
function calcReactionTimeHJD() {
    return (60 / input.bpm) * calcHalfJumpDuration();
}
function calcJumpDistanceOptimalHigh() {
    return 18 * (1 / 1.07) ** input.njsTool.njs + 18;
}
function calcJumpDistanceOptimalLow() {
    return -(18 / (input.njsTool.njs + 1)) + 18;
}

function round(num, d = 0) {
    if (!d > 0) {
        return Math.round(num);
    }
    return Math.round(num * Math.pow(10, d)) / Math.pow(10, d);
}

function compToHex(c) {
    let hex = c.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
}
function hexToDec(c) {
    return parseInt(c, 16);
}

function cDenorm(c) {
    return c > 1 && !c < 0 ? 255 : round(c * 255);
}
function cNorm(c) {
    return c / 255;
}

function rgbaToHex(colorObj) {
    let color = {};
    for (const c in colorObj) {
        color[c] = cDenorm(colorObj[c]);
    }
    return `#${compToHex(color.r)}${compToHex(color.g)}${compToHex(color.b)}${color.a > 0 ? compToHex(c.a) : ''}`;
}

function hexToRGB(hex) {
    return {
        r: cNorm(hexToDec(hex.slice(1, 3))),
        g: cNorm(hexToDec(hex.slice(3, 5))),
        b: cNorm(hexToDec(hex.slice(5, 7))),
    };
}

const colorScheme = {
    'The First': {
        _colorLeft: '#c81414',
        _colorRight: '#288ed2',
        _envColorLeft: '#d91616',
        _envColorRight: '#30acff',
        _obstacleColor: '#ff3030',
    },
    Origins: {
        _colorLeft: '#ad9200',
        _colorRight: '#b40089',
        _envColorLeft: '#7dafb3',
        _envColorRight: '#0aafe7',
        _obstacleColor: '#104965',
    },
    KDA: {
        _colorLeft: '#a84028',
        _colorRight: '#801492',
        _envColorLeft: '#ff643c',
        _envColorRight: '#c220dd',
        _obstacleColor: '#ff643c',
    },
    'Crab Rave': {
        _colorLeft: '#00b614',
        _colorRight: '#0b81bb',
        _envColorLeft: '#20c124',
        _envColorRight: '#0b9ee6',
        _obstacleColor: '#00cf14',
    },
    Noir: {
        _colorLeft: '#2c2c2c',
        _colorRight: '#989898',
        _envColorLeft: '#686868',
        _envColorRight: '#9a9a9a',
        _obstacleColor: '#3c3c3c',
    },
    Rocket: {
        _colorLeft: '#ff7f00',
        _colorRight: '#0087ff',
        _envColorLeft: '#e67c53',
        _envColorRight: '#66b7ff',
        _obstacleColor: '#519cb9',
    },
    'Green Day': {
        _colorLeft: '#40c800',
        _colorRight: '#00b6ab',
        _envColorLeft: '#00b6ab',
        _envColorRight: '#40c800',
        _obstacleColor: '#00cf14',
    },
    Timbaland: {
        _colorLeft: '#808080',
        _colorRight: '#1a8dff',
        _envColorLeft: '#1a8dff',
        _envColorRight: '#1a8dff',
        _obstacleColor: '#808080',
    },
    FitBeat: {
        _colorLeft: '#cc9b28',
        _colorRight: '#ca29ae',
        _envColorLeft: '#cc8f8f',
        _envColorRight: '#8f8fcc',
        _obstacleColor: '#474766',
    },
    'Linkin Park': {
        _colorLeft: '#a92a2b',
        _colorRight: '#63848e',
        _envColorLeft: '#c0ac97',
        _envColorRight: '#9fb0b5',
        _envColorLeftBoost: '#eb9841',
        _envColorRightBoost: '#48759f',
        _obstacleColor: '#a92a2c',
    },
    BTS: {
        _colorLeft: '#ff1768',
        _colorRight: '#cc00c0',
        _envColorLeft: '#c82080',
        _envColorRight: '#b120dd',
        _envColorLeftBoost: '#e68aff',
        _envColorRightBoost: '#59ceff',
        _obstacleColor: '#ab2e8d',
    },
    Kaleidoscope: {
        _colorLeft: '#a82020',
        _colorRight: '#484848',
        _envColorLeft: '#a82020',
        _envColorRight: '#787878',
        _envColorLeftBoost: '#800000',
        _envColorRightBoost: '#7e0089',
        _obstacleColor: '#404040',
    },
    'Glass Desert': {
        _colorLeft: '#ad9200',
        _colorRight: '#b40089',
        _envColorLeft: '#3a6e87',
        _envColorRight: '#6b6b99',
        _obstacleColor: '#104965',
    },
};
