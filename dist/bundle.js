/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/bpm.ts":
/*!********************!*\
  !*** ./src/bpm.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var BeatPerMinute = /** @class */ (function () {
    function BeatPerMinute(bpm) {
        if (bpm === void 0) { bpm = 128; }
        this.bpm = bpm;
    }
    Object.defineProperty(BeatPerMinute.prototype, "value", {
        get: function () {
            return this.bpm;
        },
        set: function (bpm) {
            this.bpm = bpm;
        },
        enumerable: false,
        configurable: true
    });
    return BeatPerMinute;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BeatPerMinute);


/***/ }),

/***/ "./src/colorPicker.ts":
/*!****************************!*\
  !*** ./src/colorPicker.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ "./src/util.ts");
/* harmony import */ var _envColor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./envColor */ "./src/envColor.ts");


var ColorPicker = /** @class */ (function () {
    function ColorPicker(_environmentColor) {
        if (_environmentColor === void 0) { _environmentColor = 'Default Custom'; }
        this._environmentColor = _environmentColor;
        this._colorScheme = {
            _colorLeft: null,
            _colorRight: null,
            _envColorLeft: null,
            _envColorRight: null,
            _envColorLeftBoost: null,
            _envColorRightBoost: null,
            _obstacleColor: null,
        };
        this.update();
    }
    Object.defineProperty(ColorPicker.prototype, "colorScheme", {
        get: function () {
            return this._colorScheme;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ColorPicker.prototype, "environmentColor", {
        get: function () {
            return this._environmentColor;
        },
        set: function (val) {
            this._environmentColor = val;
            this.update();
        },
        enumerable: false,
        configurable: true
    });
    ColorPicker.prototype.update = function () {
        if (_envColor__WEBPACK_IMPORTED_MODULE_1__.colorScheme[this._environmentColor]) {
            for (var part in this._colorScheme) {
                this._colorScheme[part] = _envColor__WEBPACK_IMPORTED_MODULE_1__.colorScheme[this._environmentColor][part] || null;
            }
        }
    };
    ColorPicker.prototype.getColorHex = function (color) {
        if (color == null) {
            return '#000000';
        }
        return this.rgbaToHex(color);
    };
    ColorPicker.prototype.decToHex = function (val) {
        var hex = val.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    };
    ColorPicker.prototype.hexToDec = function (val) {
        return parseInt(val, 16);
    };
    ColorPicker.prototype.cDenorm = function (val) {
        return val > 1 && !(val < 0) ? 255 : (0,_util__WEBPACK_IMPORTED_MODULE_0__.round)(val * 255);
    };
    ColorPicker.prototype.cNorm = function (val) {
        return val / 255;
    };
    ColorPicker.prototype.rgbaToHex = function (c) {
        var color = { r: null, g: null, b: null };
        for (var v in c) {
            color[v] = this.cDenorm(c[v]);
        }
        return "#" + this.decToHex(color.r) + this.decToHex(color.g) + this.decToHex(color.b) + (color.a !== undefined ? this.decToHex(color.a) : '');
    };
    ColorPicker.prototype.hexToRGB = function (hex) {
        return {
            r: this.cNorm(this.hexToDec(hex.slice(1, 3))),
            g: this.cNorm(this.hexToDec(hex.slice(3, 5))),
            b: this.cNorm(this.hexToDec(hex.slice(5, 7))),
        };
    };
    return ColorPicker;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ColorPicker);


/***/ }),

/***/ "./src/ebpmPrec.ts":
/*!*************************!*\
  !*** ./src/ebpmPrec.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var EBPMPrecision = /** @class */ (function () {
    function EBPMPrecision(bpm, precBeat) {
        if (precBeat === void 0) { precBeat = 2; }
        this._bpm = bpm;
        this._precBeat = precBeat;
        this.update();
    }
    Object.defineProperty(EBPMPrecision.prototype, "precBeat", {
        get: function () {
            return this._precBeat;
        },
        set: function (val) {
            this._precBeat = val;
            this.update();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EBPMPrecision.prototype, "precTime", {
        get: function () {
            return this._precTime;
        },
        set: function (val) {
            this.precBeat = 1 / val;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EBPMPrecision.prototype, "precRealTime", {
        get: function () {
            return this._precRealTime;
        },
        set: function (val) {
            this.precBeat = 1 / ((this._bpm.value * val) / 60000);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EBPMPrecision.prototype, "ebpmStream", {
        get: function () {
            return this._ebpmStream;
        },
        set: function (val) {
            this._ebpmStream = val;
            this.precBeat = this.calcBeatPrecision();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EBPMPrecision.prototype, "ebpmOHJ", {
        get: function () {
            return this._ebpmOHJ;
        },
        set: function (val) {
            this._ebpmStream = val / 2;
            this.precBeat = this.calcBeatPrecision();
        },
        enumerable: false,
        configurable: true
    });
    EBPMPrecision.prototype.update = function () {
        this._precTime = 1 / this._precBeat;
        this._precRealTime = (60 / this._bpm.value / this._precBeat) * 1000;
        this._ebpmOHJ = this.calcEffectiveBPM();
        this._ebpmStream = this._ebpmOHJ / 2;
    };
    EBPMPrecision.prototype.calcEffectiveBPM = function () {
        return (this._bpm.value * 0.5) / (1 / this._precBeat);
    };
    EBPMPrecision.prototype.calcBeatPrecision = function () {
        return this._ebpmStream / (this._bpm.value * 0.25);
    };
    return EBPMPrecision;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (EBPMPrecision);


/***/ }),

/***/ "./src/envColor.ts":
/*!*************************!*\
  !*** ./src/envColor.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "colorScheme": () => (/* binding */ colorScheme)
/* harmony export */ });
var colorScheme = {
    'Default Custom': {
        _colorLeft: {
            r: 0.7529412,
            g: 0.1882353,
            b: 0.1882353,
        },
        _colorRight: {
            r: 0.1254902,
            g: 0.3921569,
            b: 0.6588235,
        },
        _envColorLeft: {
            r: 0.7529412,
            g: 0.1882353,
            b: 0.1882353,
        },
        _envColorRight: {
            r: 0.1882353,
            g: 0.5960785,
            b: 1,
        },
        _obstacleColor: {
            r: 1,
            g: 0.1882353,
            b: 0.1882353,
        },
    },
    'The First': {
        _colorLeft: {
            r: 0.7843137,
            g: 0.07843138,
            b: 0.07843138,
        },
        _colorRight: {
            r: 0.1568627,
            g: 0.5568627,
            b: 0.8235294,
        },
        _envColorLeft: {
            r: 0.85,
            g: 0.08499997,
            b: 0.08499997,
        },
        _envColorRight: {
            r: 0.1882353,
            g: 0.675294,
            b: 1,
        },
        _obstacleColor: {
            r: 1,
            g: 0.1882353,
            b: 0.1882353,
        },
    },
    Origins: {
        _colorLeft: {
            r: 0.6792453,
            g: 0.5712628,
            b: 0,
        },
        _colorRight: {
            r: 0.7075472,
            g: 0,
            b: 0.5364411,
        },
        _envColorLeft: {
            r: 0.4910995,
            g: 0.6862745,
            b: 0.7,
        },
        _envColorRight: {
            r: 0.03844783,
            g: 0.6862745,
            b: 0.9056604,
        },
        _obstacleColor: {
            r: 0.06167676,
            g: 0.2869513,
            b: 0.3962264,
        },
    },
    KDA: {
        _colorLeft: {
            r: 0.6588235,
            g: 0.2627451,
            b: 0.1607843,
        },
        _colorRight: {
            r: 0.5019608,
            g: 0.08235294,
            b: 0.572549,
        },
        _envColorLeft: {
            r: 1,
            g: 0.3960785,
            b: 0.2431373,
        },
        _envColorRight: {
            r: 0.7607844,
            g: 0.1254902,
            b: 0.8666667,
        },
        _obstacleColor: {
            r: 1,
            g: 0.3960785,
            b: 0.2431373,
        },
    },
    'Crab Rave': {
        _colorLeft: {
            r: 0,
            g: 0.7130001,
            b: 0.07806564,
        },
        _colorRight: {
            r: 0.04805952,
            g: 0.5068096,
            b: 0.734,
        },
        _envColorLeft: {
            r: 0.134568,
            g: 0.756,
            b: 0.1557533,
        },
        _envColorRight: {
            r: 0.05647058,
            g: 0.6211764,
            b: 0.9,
        },
        _obstacleColor: {
            r: 0,
            g: 0.8117648,
            b: 0.09019608,
        },
    },
    Noir: {
        _colorLeft: {
            r: 0.1792453,
            g: 0.1792453,
            b: 0.1792453,
        },
        _colorRight: {
            r: 0.5943396,
            g: 0.5943396,
            b: 0.5943396,
        },
        _envColorLeft: {
            r: 0.4056604,
            g: 0.4056604,
            b: 0.4056604,
        },
        _envColorRight: {
            r: 0.6037736,
            g: 0.6037736,
            b: 0.6037736,
        },
        _obstacleColor: {
            r: 0.2358491,
            g: 0.2358491,
            b: 0.2358491,
        },
    },
    Rocket: {
        _colorLeft: {
            r: 1,
            g: 0.4980392,
            b: 0,
        },
        _colorRight: {
            r: 0,
            g: 0.5294118,
            b: 1,
        },
        _envColorLeft: {
            r: 0.9,
            g: 0.4866279,
            b: 0.3244186,
        },
        _envColorRight: {
            r: 0.4,
            g: 0.7180724,
            b: 1,
        },
        _obstacleColor: {
            r: 0.3176471,
            g: 0.6117647,
            b: 0.7254902,
        },
    },
    'Green Day': {
        _colorLeft: {
            r: 0.2588235,
            g: 0.7843138,
            b: 0.01960784,
        },
        _colorRight: {
            r: 0,
            g: 0.7137255,
            b: 0.6705883,
        },
        _envColorLeft: {
            r: 0,
            g: 0.7137255,
            b: 0.6705883,
        },
        _envColorRight: {
            r: 0.2588235,
            g: 0.7843137,
            b: 0.01960784,
        },
        _obstacleColor: {
            r: 0,
            g: 0.8117648,
            b: 0.09019608,
        },
    },
    Timbaland: {
        _colorLeft: {
            r: 0.5019608,
            g: 0.5019608,
            b: 0.5019608,
        },
        _colorRight: {
            r: 0.1,
            g: 0.5517647,
            b: 1,
        },
        _envColorLeft: {
            r: 0.1,
            g: 0.5517647,
            b: 1,
        },
        _envColorRight: {
            r: 0.1,
            g: 0.5517647,
            b: 1,
        },
        _obstacleColor: {
            r: 0.5,
            g: 0.5,
            b: 0.5,
        },
    },
    FitBeat: {
        _colorLeft: {
            r: 0.8000001,
            g: 0.6078432,
            b: 0.1568628,
        },
        _colorRight: {
            r: 0.7921569,
            g: 0.1607843,
            b: 0.682353,
        },
        _envColorLeft: {
            r: 0.8,
            g: 0.5594772,
            b: 0.5594772,
        },
        _envColorRight: {
            r: 0.5594772,
            g: 0.5594772,
            b: 0.8,
        },
        _obstacleColor: {
            r: 0.2784314,
            g: 0.2784314,
            b: 0.4,
        },
    },
    'Linkin Park': {
        _colorLeft: {
            r: 0.6627451,
            g: 0.1643608,
            b: 0.1690187,
        },
        _colorRight: {
            r: 0.3870196,
            g: 0.5168997,
            b: 0.5568628,
        },
        _envColorLeft: {
            r: 0.7529412,
            g: 0.672753,
            b: 0.5925647,
        },
        _envColorRight: {
            r: 0.6241197,
            g: 0.6890281,
            b: 0.709,
        },
        _envColorLeftBoost: {
            r: 0.922,
            g: 0.5957885,
            b: 0.255394,
        },
        _envColorRightBoost: {
            r: 0.282353,
            g: 0.4586275,
            b: 0.6235294,
        },
        _obstacleColor: {
            r: 0.6627451,
            g: 0.1647059,
            b: 0.172549,
        },
    },
    BTS: {
        _colorLeft: {
            r: 1,
            g: 0.09019607,
            b: 0.4059771,
        },
        _colorRight: {
            r: 0.8018868,
            g: 0,
            b: 0.7517689,
        },
        _envColorLeft: {
            r: 0.7843137,
            g: 0.1254902,
            b: 0.5010797,
        },
        _envColorRight: {
            r: 0.6941177,
            g: 0.1254902,
            b: 0.8666667,
        },
        _envColorLeftBoost: {
            r: 0.9019608,
            g: 0.5411765,
            b: 1,
        },
        _envColorRightBoost: {
            r: 0.3490196,
            g: 0.8078431,
            b: 1,
        },
        _obstacleColor: {
            r: 0.6698113,
            g: 0.1800908,
            b: 0.5528399,
        },
    },
    Kaleidoscope: {
        _colorLeft: {
            r: 0.65882355,
            g: 0.1254902,
            b: 0.1254902,
        },
        _colorRight: {
            r: 0.28235295,
            g: 0.28235295,
            b: 0.28235295,
        },
        _envColorLeft: {
            r: 0.65882355,
            g: 0.1254902,
            b: 0.1254902,
        },
        _envColorRight: {
            r: 0.47058824,
            g: 0.47058824,
            b: 0.47058824,
        },
        _envColorLeftBoost: {
            r: 0.50196081,
            g: 0,
            b: 0,
        },
        _envColorRightBoost: {
            r: 0.49244517,
            g: 0,
            b: 0.53725493,
        },
        _obstacleColor: {
            r: 0.25098041,
            g: 0.25098041,
            b: 0.25098041,
        },
    },
    Interscope: {
        _colorLeft: {
            r: 0.726415,
            g: 0.62691,
            b: 0.31181,
        },
        _colorRight: {
            r: 0.589571,
            g: 0.297888,
            b: 0.723,
        },
        _envColorLeft: {
            r: 0.724254,
            g: 0.319804,
            b: 0.913725,
        },
        _envColorRight: {
            r: 0.764706,
            g: 0.758971,
            b: 0.913725,
        },
        _envColorLeftBoost: {
            r: 0.792453,
            g: 0.429686,
            b: 0.429868,
        },
        _envColorRightBoost: {
            r: 0.7038,
            g: 0.715745,
            b: 0.765,
        },
        _obstacleColor: {
            r: 0.588235,
            g: 0.298039,
            b: 0.721569,
        },
    },
    Skrillex: {
        _colorLeft: {
            r: 0.69803923,
            g: 0.14117648,
            b: 0.36862746,
        },
        _colorRight: {
            r: 0.32933334,
            g: 0.32299998,
            b: 0.38,
        },
        _envColorLeft: {
            r: 0.80000001,
            g: 0.28000003,
            b: 0.58594489,
        },
        _envColorRight: {
            r: 0.06525807,
            g: 0.57800001,
            b: 0.56867743,
        },
        _envColorLeftBoost: {
            r: 0.81176478,
            g: 0.30588236,
            b: 0.30588236,
        },
        _envColorRightBoost: {
            r: 0.27843139,
            g: 0.80000001,
            b: 0.44597632,
        },
        _obstacleColor: {
            r: 0.15686275,
            g: 0.60392159,
            b: 0.60392159,
        },
    },
    'Billie Eilish': {
        _colorLeft: {
            r: 0.80000001,
            g: 0.64481932,
            b: 0.43200001,
        },
        _colorRight: {
            r: 0.54808509,
            g: 0.61276591,
            b: 0.63999999,
        },
        _envColorLeft: {
            r: 0.81960785,
            g: 0.442,
            b: 0.184,
        },
        _envColorRight: {
            r: 0.94117647,
            g: 0.70677096,
            b: 0.56470591,
        },
        _obstacleColor: {
            r: 0.71325314,
            g: 0.56140977,
            b: 0.78301889,
        },
        _envColorLeftBoost: {
            r: 0.80000001,
            g: 0,
            b: 0,
        },
        _envColorRightBoost: {
            r: 0.55686277,
            g: 0.7019608,
            b: 0.77647066,
        },
    },
    'Glass Desert': {
        _colorLeft: {
            r: 0.6792453,
            g: 0.5712628,
            b: 0,
        },
        _colorRight: {
            r: 0.7075472,
            g: 0,
            b: 0.5364411,
        },
        _envColorLeft: {
            r: 0.32222217,
            g: 0.6111111,
            b: 0.75,
        },
        _envColorRight: {
            r: 0.03844783,
            g: 0.62239975,
            b: 0.90566039,
        },
        _obstacleColor: {
            r: 0.06167676,
            g: 0.2869513,
            b: 0.3962264,
        },
    },
    'New World': {
        _colorLeft: {
            r: 0.625,
            g: 0.625,
            b: 0.625,
        },
        _colorRight: {
            r: 0.34375,
            g: 0.4375,
            b: 0.625,
        },
        _envColorLeft: {
            r: 0.21875,
            g: 0.28125,
            b: 0.46875,
        },
        _envColorRight: {
            r: 0.5,
            g: 0.5625,
            b: 0.78125,
        },
        _obstacleColor: {
            r: 0.625,
            g: 0.59375,
            b: 0.8125,
        },
    },
    'Girly Cupid': {
        _colorLeft: {
            r: 1,
            g: 0.1875,
            b: 0.1875,
        },
        _colorRight: {
            r: 0.375,
            g: 0.5625,
            b: 0.875,
        },
        _envColorLeft: {
            r: 0.375,
            g: 0.375,
            b: 0.375,
        },
        _envColorRight: {
            r: 0.625,
            g: 0.75,
            b: 0.875,
        },
        _obstacleColor: {
            r: 0.75,
            g: 0.75,
            b: 0.75,
        },
    },
    'T.R.Y Revolution': {
        _colorLeft: {
            r: 1,
            g: 0,
            b: 0.375,
        },
        _colorRight: {
            r: 0.125,
            g: 0.375,
            b: 0.90625,
        },
        _envColorLeft: {
            r: 1,
            g: 0.125,
            b: 0.375,
        },
        _envColorRight: {
            r: 0.1875,
            g: 0.5625,
            b: 1,
        },
        _obstacleColor: {
            r: 0.625,
            g: 0.625,
            b: 0.625,
        },
    },
    Frightmare: {
        _colorLeft: {
            r: 0.8125,
            g: 0.125,
            b: 0.125,
        },
        _colorRight: {
            r: 0.625,
            g: 0.625,
            b: 0.625,
        },
        _envColorLeft: {
            r: 0.625,
            g: 0.03215,
            b: 0.03215,
        },
        _envColorRight: {
            r: 0.71875,
            g: 0.71875,
            b: 0.71875,
        },
        _obstacleColor: {
            r: 0.1875,
            g: 0.1875,
            b: 0.1875,
        },
    },
    'Azure Raindrop': {
        _colorLeft: {
            r: 0.8125,
            g: 0.125,
            b: 0.125,
        },
        _colorRight: {
            r: 0.0625,
            g: 0.5,
            b: 0.875,
        },
        _envColorLeft: {
            r: 0.5625,
            g: 0.5625,
            b: 0.5625,
        },
        _envColorRight: {
            r: 0.0625,
            g: 0.5,
            b: 0.875,
        },
        _obstacleColor: {
            r: 0.75,
            g: 0.25,
            b: 0.75,
        },
    },
    VENTEN: {
        _colorLeft: {
            r: 0.8125,
            g: 0.625,
            b: 0.375,
        },
        _colorRight: {
            r: 0.625,
            g: 0.375,
            b: 0.875,
        },
        _envColorLeft: {
            r: 0.78125,
            g: 0.625,
            b: 0.1875,
        },
        _envColorRight: {
            r: 0.09375,
            g: 0.4375,
            b: 0.6875,
        },
        _envColorLeftBoost: {
            r: 0.875,
            g: 0.0625,
            b: 0.375,
        },
        _envColorRightBoost: {
            r: 0.1875,
            g: 0.5,
            b: 0.875,
        },
        _obstacleColor: {
            r: 0.125,
            g: 0.25,
            b: 0.4375,
        },
    },
    'Unconscious Requiem': {
        _colorLeft: { r: 0.438, g: 0.438, b: 0.438 },
        _colorRight: { r: 0.388, g: 0.62, b: 0.157 },
        _envColorLeft: { r: 0.85, g: 0.085, b: 0.085 },
        _envColorRight: { r: 0.604, g: 0.604, b: 0.604 },
        _envColorLeftBoost: { r: 0.922, g: 0.596, b: 0.255 },
        _envColorRightBoost: { r: 0.259, g: 0.784, b: 0.02 },
        _obstacleColor: { r: 0.5, g: 0.5, b: 0.5 },
    },
};


/***/ }),

/***/ "./src/njs.ts":
/*!********************!*\
  !*** ./src/njs.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var NoteJumpSpeed = /** @class */ (function () {
    function NoteJumpSpeed(bpm, njs, sdm) {
        if (njs === void 0) { njs = 10; }
        if (sdm === void 0) { sdm = 0; }
        this._hjdStart = 4;
        this._hjdMin = 1;
        this._bpm = bpm;
        this._njs = njs;
        this._sdm = sdm;
        this.update();
    }
    Object.defineProperty(NoteJumpSpeed.prototype, "njs", {
        get: function () {
            return this._njs;
        },
        set: function (val) {
            this._njs = val;
            this.update();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(NoteJumpSpeed.prototype, "offset", {
        get: function () {
            return this._sdm;
        },
        set: function (val) {
            this._sdm = val;
            this.update();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(NoteJumpSpeed.prototype, "hjd", {
        get: function () {
            return this._hjd;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(NoteJumpSpeed.prototype, "hjdMin", {
        get: function () {
            return this._hjdMin;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(NoteJumpSpeed.prototype, "reactTime", {
        get: function () {
            return this._reactionTime;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(NoteJumpSpeed.prototype, "jd", {
        get: function () {
            return this._jd;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(NoteJumpSpeed.prototype, "jdMin", {
        get: function () {
            return this._jdMin;
        },
        enumerable: false,
        configurable: true
    });
    NoteJumpSpeed.prototype.update = function () {
        this._hjd = this.calcHalfJumpDuration();
        this._jd = this.calcJumpDistance();
        this._jdMin = this.calcJumpDistance(this._hjdMin);
        this._reactionTime = this.calcReactionTimeHJD();
    };
    NoteJumpSpeed.prototype.calcHalfJumpDurationRaw = function () {
        var maxHalfJump = 18;
        var noteJumpMovementSpeed = (this._njs * this._njs) / this._njs;
        var num = 60 / this._bpm.value;
        var hjd = this._hjdStart;
        while (noteJumpMovementSpeed * num * hjd > maxHalfJump) {
            hjd /= 2;
        }
        if (hjd < this._hjdMin) {
            hjd = 1;
        }
        return hjd;
    };
    NoteJumpSpeed.prototype.calcHalfJumpDuration = function (offset) {
        if (offset === void 0) { offset = this.offset; }
        return Math.max(this.calcHalfJumpDurationRaw() + offset, 1);
    };
    NoteJumpSpeed.prototype.calcHalfJumpDurationFromJD = function (jd) {
        if (jd === void 0) { jd = this.calcJumpDistance(); }
        return jd / ((60 / this._bpm.value) * this._njs * 2);
    };
    NoteJumpSpeed.prototype.calcHalfJumpDurationFromRT = function (rt) {
        if (rt === void 0) { rt = this.calcReactionTimeHJD(); }
        return rt / (60 / this._bpm.value);
    };
    NoteJumpSpeed.prototype.calcJumpDistance = function (hjd) {
        if (hjd === void 0) { hjd = this.calcHalfJumpDuration(); }
        return this._njs * (60 / this._bpm.value) * hjd * 2;
    };
    NoteJumpSpeed.prototype.calcJumpDistanceOptimalHigh = function () {
        return 18 * Math.pow((1 / 1.07), this._njs) + 18;
    };
    NoteJumpSpeed.prototype.calcJumpDistanceOptimalLow = function () {
        return -(18 / (this._njs + 1)) + 18;
    };
    NoteJumpSpeed.prototype.calcReactionTimeJD = function (jd) {
        if (jd === void 0) { jd = this.calcJumpDistance(); }
        return jd / (2 * this._njs);
    };
    NoteJumpSpeed.prototype.calcReactionTimeHJD = function (hjd) {
        if (hjd === void 0) { hjd = this.calcHalfJumpDuration(); }
        return (60 / this._bpm.value) * hjd;
    };
    return NoteJumpSpeed;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (NoteJumpSpeed);


/***/ }),

/***/ "./src/ppCurve.ts":
/*!************************!*\
  !*** ./src/ppCurve.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ppCurve": () => (/* binding */ ppCurve)
/* harmony export */ });
var ppCurve = {
    scoresaber: [
        [1.14, 1.2],
        [1.1, 1.15],
        [1, 1.1],
        [0.95, 1.036],
        [0.94, 0.974],
        [0.93, 0.92],
        [0.92, 0.885],
        [0.91, 0.85],
        [0.9, 0.815],
        [0.88, 0.766],
        [0.86, 0.72],
        [0.845, 0.63],
        [0.82, 0.56],
        [0.75, 0.425],
        [0.69, 0.25],
        [0.5, 0.15],
        [0.4, 0.08],
        [0, 0],
    ],
    exponential: [
        [1, 8],
        [0.99, 4],
        [0.98, 2],
        [0.97, 1.5],
        [0.96, 1.1],
        [0.95, 1.036],
        [0.94, 0.974],
        [0.93, 0.92],
        [0.92, 0.885],
        [0.91, 0.85],
        [0.9, 0.815],
        [0.88, 0.766],
        [0.86, 0.72],
        [0.845, 0.63],
        [0.82, 0.56],
        [0.75, 0.425],
        [0.69, 0.25],
        [0.5, 0.15],
        [0.4, 0.08],
        [0, 0],
    ],
};


/***/ }),

/***/ "./src/randPattern.ts":
/*!****************************!*\
  !*** ./src/randPattern.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "noteImage": () => (/* binding */ noteImage),
/* harmony export */   "noteRotation": () => (/* binding */ noteRotation),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var noteImage = {
    0: 'noter.svg',
    1: 'noteb.svg',
    2: 'bomb.png',
    3: 'noterd.svg',
    4: 'notebd.svg',
    blank: 'blank.png',
};
var noteRotation = {
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
var RandomPatternGenerator = /** @class */ (function () {
    function RandomPatternGenerator(row, column) {
        this._maxIndex = column;
        this._maxLayer = row;
    }
    Object.defineProperty(RandomPatternGenerator.prototype, "column", {
        get: function () {
            return this._maxIndex;
        },
        set: function (val) {
            this._maxIndex = val;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RandomPatternGenerator.prototype, "row", {
        get: function () {
            return this._maxLayer;
        },
        set: function (val) {
            this._maxLayer = val;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RandomPatternGenerator.prototype, "limit", {
        get: function () {
            return this._limit;
        },
        set: function (val) {
            this._limit = val;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RandomPatternGenerator.prototype, "total", {
        get: function () {
            return this._total;
        },
        set: function (val) {
            this._total = val;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RandomPatternGenerator.prototype, "noteRed", {
        get: function () {
            return this._noteRed;
        },
        set: function (val) {
            this._noteRed = val;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RandomPatternGenerator.prototype, "noteBlue", {
        get: function () {
            return this._noteBlue;
        },
        set: function (val) {
            this._noteBlue = val;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RandomPatternGenerator.prototype, "noteBomb", {
        get: function () {
            return this._noteBomb;
        },
        set: function (val) {
            this._noteBomb = val;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RandomPatternGenerator.prototype, "noDot", {
        get: function () {
            return this._noDot;
        },
        set: function (val) {
            this._noDot = val;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RandomPatternGenerator.prototype, "parity", {
        get: function () {
            return this._parity;
        },
        set: function (val) {
            this._parity = val;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RandomPatternGenerator.prototype, "parityExtend", {
        get: function () {
            return this._parityExtend;
        },
        set: function (val) {
            this._parityExtend = val;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RandomPatternGenerator.prototype, "parityRed", {
        get: function () {
            return this._parityRed;
        },
        set: function (val) {
            this._parityRed = val;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RandomPatternGenerator.prototype, "parityBlue", {
        get: function () {
            return this._parityBlue;
        },
        set: function (val) {
            this._parityBlue = val;
        },
        enumerable: false,
        configurable: true
    });
    RandomPatternGenerator.prototype.createValidParity = function (ext, dot) {
        if (ext === void 0) { ext = 0; }
        if (dot === void 0) { dot = false; }
        var parityRotation = {
            0: {
                0: [6, 1, 7],
                1: [4, 0, 5],
                2: [0, 1, 2, 3, 4, 5, 6, 7, 8],
                3: [0, 1, 2, 3, 4, 5, 6, 7, 8],
            },
            1: {
                0: [6, 1, 7],
                1: [4, 0, 5],
                2: [0, 1, 2, 3, 4, 5, 6, 7, 8],
                3: [0, 1, 2, 3, 4, 5, 6, 7, 8],
            },
        };
        if (dot) {
            parityRotation[0][0].push(8);
            parityRotation[0][1].push(8);
            parityRotation[1][0].push(8);
            parityRotation[1][1].push(8);
        }
        if (ext > 0) {
            parityRotation[0][0].push(3);
            parityRotation[0][1].push(2);
            parityRotation[1][0].push(2);
            parityRotation[1][1].push(3);
        }
        if (ext > 1) {
            parityRotation[0][0].push(5);
            parityRotation[0][1].push(6);
            parityRotation[1][0].push(4);
            parityRotation[1][1].push(7);
        }
        if (ext > 2) {
            parityRotation[0][0].push(0, 2);
            parityRotation[0][1].push(1, 3);
            parityRotation[1][0].push(0, 3);
            parityRotation[1][1].push(1, 2);
        }
        return parityRotation;
    };
    RandomPatternGenerator.prototype.generate = function () {
        var total = 2;
        var note = [this._noteRed, this._noteBlue, this._noteBomb];
        var parity = {
            0: this._parityRed ? 0 : 1,
            1: this._parityBlue ? 0 : 1,
        };
        var validRotation = this.createValidParity(this._parityExtend, !this._noDot);
        var maxSize = this._maxIndex * this._maxLayer;
        if (this._limit) {
            total = Math.min(this._total, note.reduce(function (acc, cv) { return acc + cv; }), maxSize);
        }
        if (!this._limit) {
            total = Math.min(note.reduce(function (acc, cv) { return acc + cv; }), maxSize);
        }
        var grid = new Array(maxSize).fill(null);
        if (total === 0) {
            return grid;
        }
        for (var i = 0; i < total;) {
            var randIL = Math.floor(Math.random() * maxSize);
            var randType = Math.floor(Math.random() * 3);
            for (var j = 0; j < 3; j++) {
                if (note[randType] === 0) {
                    randType = (randType + 1) % 3;
                }
            }
            if (note[randType] === 0) {
                break;
            }
            var randDir = Math.floor(Math.random() * 9);
            if (this._parity && randType <= 1) {
                randDir =
                    validRotation[randType][parity[randType]][Math.floor(Math.random() * validRotation[randType][parity[randType]].length)];
            }
            for (var j = 0; j < maxSize; j++) {
                var pos = (randIL + j) % maxSize;
                if (grid[pos] === null) {
                    if (randType === 2) {
                        randDir = 0;
                    }
                    grid[pos] = {
                        _noteType: randType,
                        _noteDirection: randDir,
                    };
                    note[randType]--;
                    i++;
                    break;
                }
            }
        }
        return grid;
    };
    return RandomPatternGenerator;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (RandomPatternGenerator);


/***/ }),

/***/ "./src/score.ts":
/*!**********************!*\
  !*** ./src/score.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "maxNoteScore": () => (/* binding */ maxNoteScore),
/* harmony export */   "scoreModifier": () => (/* binding */ scoreModifier),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ppCurve__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ppCurve */ "./src/ppCurve.ts");
var __spreadArray = (undefined && undefined.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};

function lerp(x, y, a) {
    return x + (y - x) * a;
}
function invlerp(x, y, a) {
    return clamp((a - x) / (y - x));
}
function clamp(a, min, max) {
    if (min === void 0) { min = 0; }
    if (max === void 0) { max = 1; }
    return Math.min(max, Math.max(min, a));
}
function interpolatePoint(pointArr, xPoint) {
    var _a, _b;
    var xArr = pointArr.map(function (arr) { return arr[0]; });
    var yArr = pointArr.map(function (arr) { return arr[1]; });
    var xa = (_a = __spreadArray([], xArr, true).reverse().find(function (x) { return x <= xPoint; })) !== null && _a !== void 0 ? _a : xArr[0];
    var xb = (_b = xArr.find(function (x) { return x >= xPoint; })) !== null && _b !== void 0 ? _b : xa;
    var ya = yArr[xArr.indexOf(xa)];
    var yb = yArr[xArr.indexOf(xb)];
    var t = invlerp(xa, xb, xPoint) || 0;
    return yArr[xArr.indexOf(xPoint)] || lerp(ya, yb, t);
}
var maxNoteScore = 115;
var scoreModifier = {
    nf: {
        name: 'No Fail',
        value: -0.5,
    },
    no: {
        name: 'No Obstacles',
        value: -0.05,
    },
    nb: {
        name: 'No Bombs',
        value: -0.1,
    },
    ss: {
        name: 'Slower Song',
        value: -0.3,
    },
    da: {
        name: 'Disappearing Arrows',
        value: 0.07,
    },
    fs: {
        name: 'Faster Song',
        value: 0.08,
    },
    gn: {
        name: 'Ghost Notes',
        value: 0.11,
    },
};
var ScoreCalculator = /** @class */ (function () {
    function ScoreCalculator(note, star, curvePoints) {
        if (note === void 0) { note = 0; }
        if (star === void 0) { star = 7; }
        if (curvePoints === void 0) { curvePoints = _ppCurve__WEBPACK_IMPORTED_MODULE_0__.ppCurve.scoresaber; }
        this._starRating = 7;
        this._starPP = 42.521;
        this._note = note;
        this._starRating = star;
        this._curvePoints = __spreadArray([], curvePoints, true).sort(function (a, b) { return a[0] - b[0]; });
    }
    Object.defineProperty(ScoreCalculator.prototype, "note", {
        get: function () {
            return this._note;
        },
        set: function (val) {
            this._note = val;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ScoreCalculator.prototype, "star", {
        get: function () {
            return this._starRating;
        },
        set: function (val) {
            this._starRating = val;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ScoreCalculator.prototype, "curvePoints", {
        get: function () {
            return this._curvePoints;
        },
        set: function (val) {
            this._curvePoints = __spreadArray([], val, true).sort(function (a, b) { return a[0] - b[0]; });
        },
        enumerable: false,
        configurable: true
    });
    // 100% pp value
    // 0.9458064516129032 interpolated value
    // 0.9431707317073172 rabbit's interpolated value
    ScoreCalculator.prototype.calcPP = function (starRating, perc) {
        if (starRating === void 0) { starRating = this._starRating; }
        if (perc === void 0) { perc = 0.9458064516129032; }
        return this._starPP * starRating * interpolatePoint(this._curvePoints, perc);
    };
    // miss simulate missing the note
    // break simulate combo break due to wall or bomb, but it can only happen once before the note
    // miss and break can happen at the same time, resulting multiplier to reduce twice
    ScoreCalculator.prototype.calcScore = function (scoreNote, scoreMultiplier, missedArr, breakArr) {
        if (scoreNote === void 0) { scoreNote = maxNoteScore; }
        if (scoreMultiplier === void 0) { scoreMultiplier = 1; }
        if (missedArr === void 0) { missedArr = []; }
        if (breakArr === void 0) { breakArr = []; }
        var total = 0;
        var noteScore = scoreNote * scoreMultiplier;
        var multFlag = true;
        var multCombo = 0;
        var multiplier = 1;
        var missed = __spreadArray([], missedArr, true).map(function (x) { return x - 1; });
        var cBreak = __spreadArray([], breakArr, true).map(function (x) { return x - 1; });
        function comboBreak() {
            multiplier = Math.max(multiplier / 2, 1);
            multCombo = 0;
            multFlag = true;
        }
        for (var i = 0; i < this._note; i++) {
            if (cBreak.includes(i)) {
                comboBreak();
            }
            if (missed.includes(i)) {
                comboBreak();
                continue;
            }
            multCombo++;
            if (multFlag && multCombo >= 2 * multiplier) {
                multiplier *= 2;
                if (multiplier >= 8) {
                    multFlag = false;
                }
                multCombo = 0;
            }
            total += noteScore * multiplier;
        }
        return total;
    };
    return ScoreCalculator;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ScoreCalculator);


/***/ }),

/***/ "./src/sps.ts":
/*!********************!*\
  !*** ./src/sps.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var SwingPerSecond = /** @class */ (function () {
    function SwingPerSecond() {
        this._difficulty = {
            easy: null,
            normal: null,
            hard: null,
            expert: null,
            expertplus: null,
        };
    }
    Object.defineProperty(SwingPerSecond.prototype, "difficulty", {
        get: function () {
            return this._difficulty;
        },
        enumerable: false,
        configurable: true
    });
    SwingPerSecond.prototype.calcDifference = function (d1, d2) {
        return (1 - this._difficulty[d2] / this._difficulty[d1]) * 100;
    };
    SwingPerSecond.prototype.getTotalReduction = function () {
        var highest = null;
        var lowest = null;
        for (var d in this._difficulty) {
            if (this._difficulty[d] !== null) {
                if (!highest || highest < this._difficulty[d]) {
                    highest = this._difficulty[d];
                }
                if (!lowest || lowest > this._difficulty[d]) {
                    lowest = this._difficulty[d];
                }
            }
        }
        return highest || (highest && lowest) ? (1 - lowest / highest) * 100 : 0;
    };
    return SwingPerSecond;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SwingPerSecond);


/***/ }),

/***/ "./src/util.ts":
/*!*********************!*\
  !*** ./src/util.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "round": () => (/* binding */ round),
/* harmony export */   "formatNumber": () => (/* binding */ formatNumber)
/* harmony export */ });
function round(num, d) {
    if (d === void 0) { d = 0; }
    if (!(d > 0)) {
        return Math.round(num);
    }
    return Math.round(num * Math.pow(10, d)) / Math.pow(10, d);
}
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}


/***/ }),

/***/ "./src/version.ts":
/*!************************!*\
  !*** ./src/version.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var versionMajor = 2;
var versionMinor = 0;
var versionPatch = 2;
var watermark = 'Kival Evan#5480';
var Version = /** @class */ (function () {
    function Version() {
        this.version = "v" + versionMajor + "." + versionMinor + "." + versionPatch;
        this.wm = watermark;
    }
    Object.defineProperty(Version.prototype, "number", {
        get: function () {
            return this.version;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Version.prototype, "watermark", {
        get: function () {
            return this.wm;
        },
        enumerable: false,
        configurable: true
    });
    return Version;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Version);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _version__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./version */ "./src/version.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util */ "./src/util.ts");
/* harmony import */ var _bpm__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./bpm */ "./src/bpm.ts");
/* harmony import */ var _ebpmPrec__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ebpmPrec */ "./src/ebpmPrec.ts");
/* harmony import */ var _njs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./njs */ "./src/njs.ts");
/* harmony import */ var _score__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./score */ "./src/score.ts");
/* harmony import */ var _sps__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./sps */ "./src/sps.ts");
/* harmony import */ var _colorPicker__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./colorPicker */ "./src/colorPicker.ts");
/* harmony import */ var _envColor__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./envColor */ "./src/envColor.ts");
/* harmony import */ var _randPattern__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./randPattern */ "./src/randPattern.ts");
/* harmony import */ var _ppCurve__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./ppCurve */ "./src/ppCurve.ts");
var __spreadArray = (undefined && undefined.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
// it turns out ui is complete pain with typescript and webpack
// need to learn how to break up these into separate files











var bpm = new _bpm__WEBPACK_IMPORTED_MODULE_2__["default"]();
var noteJumpSpeed = new _njs__WEBPACK_IMPORTED_MODULE_4__["default"](bpm, 16);
var ebpmPrec = new _ebpmPrec__WEBPACK_IMPORTED_MODULE_3__["default"](bpm);
var scoreCalculator = new _score__WEBPACK_IMPORTED_MODULE_5__["default"](727);
var swingPerSecond = new _sps__WEBPACK_IMPORTED_MODULE_6__["default"]();
var colorPicker = new _colorPicker__WEBPACK_IMPORTED_MODULE_7__["default"]();
var randPatternGen = new _randPattern__WEBPACK_IMPORTED_MODULE_9__["default"](3, 4);
var version = new _version__WEBPACK_IMPORTED_MODULE_0__["default"]();
var textVersion = document.querySelectorAll('.text-version');
var textWatermark = document.querySelectorAll('.text-watermark');
var mapSettingsInputBPM = document.querySelector('#map-settings-input-bpm');
var inputToggle = document.querySelectorAll('.toggle-input');
var ebpmInputPrecBeat = document.querySelector('#ebpm-input-precbeat');
var ebpmInputPrecTime = document.querySelector('#ebpm-input-prectime');
var ebpmInputPrecRealTime = document.querySelector('#ebpm-input-precrealtime');
var ebpmInputEBPMOHJ = document.querySelector('#ebpm-input-ebpm-ohj');
var ebpmInputEBPMStream = document.querySelector('#ebpm-input-ebpm-stream');
var njsInputNJS = document.querySelector('#njs-input-njs');
var njsInputOffset = document.querySelector('#njs-input-offset');
var njsInputHJD = document.querySelector('#njs-input-hjd');
var njsInputJD = document.querySelector('#njs-input-jd');
var njsInputReact = document.querySelector('#njs-input-reacttime');
var njsOutputJD = document.querySelector('#njs-output-jd');
var njsOutputMinReact = document.querySelector('#njs-output-reacttime');
var njsOutputJDOHigh = document.querySelector('#njs-output-jd-optimal-high');
var njsOutputJDOLow = document.querySelector('#njs-output-jd-optimal-low');
var njsSelectScale = document.querySelector('#njs-option-njs-scale');
var scoreInputNote = document.querySelector('#score-input-note');
var scoreInputStar = document.querySelector('#score-input-star');
var scoreInputPercent = document.querySelector('#score-input-percent');
var scoreInputScore = document.querySelector('#score-input-score');
var scoreInputPP = document.querySelector('#score-input-pp');
var scoreOutputMaxScore = document.querySelector('#score-output-maxscore');
var scoreOutputMaxScoreMod = document.querySelector('#score-output-maxscore-modifier');
var scoreInputAvgCut = document.querySelector('#score-input-avgcut');
var scoreInputMissed = document.querySelector('#score-input-missed');
var scoreInputBreak = document.querySelector('#score-input-break');
var scoreOutputEstScore = document.querySelector('#score-output-estscore');
var scoreOutputEstPercent = document.querySelector('#score-output-estpercent');
var scoreOutputEstPP = document.querySelector('#score-output-estpp');
var scoreOutputMissScore = document.querySelector('#score-output-missscore');
var scoreOutputNoMissScore = document.querySelector('#score-output-nomissscore');
var scoreOutputNoMissPercent = document.querySelector('#score-output-nomisspercent');
var scoreOutputNoMissPP = document.querySelector('#score-output-nomisspp');
var scoreTable = document.querySelector('#score-table');
var scoreTablePercent = document.querySelector('#score-table-percentage');
var scoreOptionPP = document.querySelector('#score-option-pp-curve');
var scoreTextAreaJSON = document.querySelector('#score-text-json');
var scoreErrorJSON = document.querySelector('#score-error-json');
var labelInputText = document.querySelector('#label-input-text');
var labelOutputText = document.querySelector('#label-output-text');
var labelInputDiffCount1 = document.querySelector('#label-input-diff-count-1');
var labelInputDiffCount2 = document.querySelector('#label-input-diff-count-2');
var labelInputDiffCount3 = document.querySelector('#label-input-diff-count-3');
var labelInputDiffCount4 = document.querySelector('#label-input-diff-count-4');
var labelInputDiffCount5 = document.querySelector('#label-input-diff-count-5');
var spsInput = {};
var spsOutput = {};
for (var d in swingPerSecond.difficulty) {
    spsInput[d] = document.querySelector("#sps-input-" + d);
    spsOutput[d] = document.querySelector("#sps-output-" + d);
}
var spsOutputTotal = document.querySelector('#sps-output-total-reduction');
var cpOptionColorScheme = document.querySelector('#cp-option-colorscheme');
var cpInputHex = {};
var cpInputPicker = {};
var cpInputInclude = {};
var cpInputReset = {};
for (var obj in colorPicker.colorScheme) {
    var part = obj.replace(/^\_/, '').toLowerCase();
    cpInputHex[obj] = document.querySelector("#cp-input-hex-" + part);
    cpInputPicker[obj] = document.querySelector("#cp-input-picker-" + part);
    cpInputInclude[obj] = document.querySelector("#cp-input-include-" + part);
    cpInputReset[obj] = document.querySelector("#cp-input-reset-" + part);
}
var cpTextAreaIOJSON = document.querySelector('#cp-io-colorjson');
var cpErrorJSON = document.querySelector('#cp-error-colorjson');
var rpgInputRow = document.querySelector('#rpg-input-rpattern-row');
var rpgInputColumn = document.querySelector('#rpg-input-rpattern-column');
var rpgTable = document.querySelector('#rpg-table-rpattern');
var rpgInputNRed = document.querySelector('#rpg-input-rpattern-red');
var rpgInputNBlue = document.querySelector('#rpg-input-rpattern-blue');
var rpgInputNBomb = document.querySelector('#rpg-input-rpattern-bomb');
var rpgInputLimit = document.querySelector('#rpg-input-rpattern-limit');
var rpgInputTotal = document.querySelector('#rpg-input-rpattern-total');
var rpgInputNoDot = document.querySelector('#rpg-input-rpattern-nodot');
var rpgInputParity = document.querySelector('#rpg-input-rpattern-parity');
var rpgInputParityExtend = document.querySelector('#rpg-input-rpattern-parity-extend');
var rpgInputParityNRed = document.querySelector('#rpg-input-rpattern-parity-red');
var rpgInputParityNBlue = document.querySelector('#rpg-input-rpattern-parity-blue');
var rpgInputGenerate = document.querySelector('#rpg-input-generate-rpattern');
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
for (var d in swingPerSecond.difficulty) {
    spsInput[d].addEventListener('input', inputSPSHandlerHandler);
}
cpOptionColorScheme.addEventListener('change', optionColorSchemeHandler);
for (var obj in colorPicker.colorScheme) {
    cpInputHex[obj].addEventListener('change', inputColorHexHandler);
    cpInputPicker[obj].addEventListener('change', inputColorPickerHandler);
    cpInputInclude[obj].addEventListener('click', inputColorIncludeHandler);
    cpInputReset[obj].addEventListener('click', inputColorResetHandler);
    cpInputReset[obj].style.display = 'none';
}
var cpCustomText = 'Custom';
var option = document.createElement('option');
option.value = cpCustomText;
option.textContent = cpCustomText;
cpOptionColorScheme.append(option);
for (var cs in _envColor__WEBPACK_IMPORTED_MODULE_8__.colorScheme) {
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
    njsOutputMinReact.textContent = (0,_util__WEBPACK_IMPORTED_MODULE_1__.round)((60 / bpm.value) * 1000) + "ms";
    enableInput();
    var missedScore = [3, 22, 100, 102];
    var breakScore = [127];
    scoreTablePercent.value = [100, 98, 97, 96, 95, 94, 93, 90, 85, 80].join(',');
    scoreInputNote.value = scoreCalculator.note.toString();
    scoreInputStar.value = scoreCalculator.star.toString();
    scoreInputPercent.value = '90';
    scoreInputAvgCut.value = '111';
    scoreInputMissed.value = missedScore.join(',');
    scoreInputBreak.value = breakScore.join(',');
    _ppCurve__WEBPACK_IMPORTED_MODULE_10__.ppCurve.custom = __spreadArray([], _ppCurve__WEBPACK_IMPORTED_MODULE_10__.ppCurve.scoresaber, true);
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
function updateVersion(text) {
    textVersion.forEach(function (ver) {
        ver.textContent = text;
    });
}
function updateWatermark(text) {
    textWatermark.forEach(function (wm) {
        wm.textContent = text;
    });
}
function enableInput() {
    inputToggle.forEach(function (inp) {
        inp.disabled = false;
    });
}
function disableInput() {
    inputToggle.forEach(function (inp) {
        inp.disabled = true;
    });
}
function inputBPMHandler(ev) {
    bpm.value = Math.abs(parseFloat(this.value)) || 0;
    if (bpm.value > 0) {
        ebpmPrec.update();
        enableInput();
        updatePrec();
        updateEBPM();
        updateNJS();
        njsOutputMinReact.textContent = (0,_util__WEBPACK_IMPORTED_MODULE_1__.round)((60 / bpm.value) * 1000) + "ms";
    }
    else {
        disableInput();
    }
    if (ev.type === 'change') {
        this.value = bpm.value;
    }
}
function inputPrecBeatHandler(ev) {
    ebpmPrec.precBeat = Math.abs(parseFloat(this.value)) > 0 ? Math.abs(parseFloat(this.value)) : 1;
    if (ebpmPrec.precBeat > 0) {
        updateEBPM();
        ebpmInputPrecTime.value = (0,_util__WEBPACK_IMPORTED_MODULE_1__.round)(ebpmPrec.precTime, 3).toString();
        ebpmInputPrecRealTime.value = (0,_util__WEBPACK_IMPORTED_MODULE_1__.round)(ebpmPrec.precRealTime, 1).toString();
    }
    if (ev.type === 'change') {
        this.value = (0,_util__WEBPACK_IMPORTED_MODULE_1__.round)(ebpmPrec.precBeat, 3).toString();
    }
}
function inputPrecTimeHandler(ev) {
    ebpmPrec.precTime = Math.abs(parseFloat(this.value)) > 0 ? Math.abs(parseFloat(this.value)) : 1;
    if (ebpmPrec.precTime > 0) {
        updateEBPM();
        ebpmInputPrecBeat.value = (0,_util__WEBPACK_IMPORTED_MODULE_1__.round)(ebpmPrec.precBeat, 3).toString();
        ebpmInputPrecRealTime.value = (0,_util__WEBPACK_IMPORTED_MODULE_1__.round)(ebpmPrec.precRealTime, 1).toString();
    }
    if (ev.type === 'change') {
        this.value = (0,_util__WEBPACK_IMPORTED_MODULE_1__.round)(ebpmPrec.precTime, 3).toString();
    }
}
function inputPrecRealTimeHandler(ev) {
    ebpmPrec.precRealTime =
        Math.abs(parseFloat(this.value)) > 0 ? Math.abs(parseFloat(this.value)) : 1;
    if (ebpmPrec.precRealTime > 0) {
        updateEBPM();
        ebpmInputPrecBeat.value = (0,_util__WEBPACK_IMPORTED_MODULE_1__.round)(ebpmPrec.precBeat, 3).toString();
        ebpmInputPrecTime.value = (0,_util__WEBPACK_IMPORTED_MODULE_1__.round)(ebpmPrec.precTime, 3).toString();
    }
    if (ev.type === 'change') {
        ebpmInputPrecRealTime.value = (0,_util__WEBPACK_IMPORTED_MODULE_1__.round)(ebpmPrec.precRealTime, 1).toString();
    }
}
function inputEBPMHandler(ev) {
    if (this.id === 'ebpm-input-ebpm-ohj') {
        ebpmPrec.ebpmOHJ =
            Math.abs(parseFloat(this.value)) > 0 ? Math.abs(parseFloat(this.value)) : bpm.value;
        if (ev.type === 'change') {
            this.value = (0,_util__WEBPACK_IMPORTED_MODULE_1__.round)(ebpmPrec.ebpmOHJ, 2).toString();
        }
        ebpmInputEBPMStream.value = (0,_util__WEBPACK_IMPORTED_MODULE_1__.round)(ebpmPrec.ebpmStream, 2).toString();
    }
    if (this.id === 'ebpm-input-ebpm-stream') {
        ebpmPrec.ebpmStream =
            Math.abs(parseFloat(this.value)) > 0 ? Math.abs(parseFloat(this.value)) : bpm.value;
        if (ev.type === 'change') {
            this.value = (0,_util__WEBPACK_IMPORTED_MODULE_1__.round)(ebpmPrec.ebpmStream, 2).toString();
        }
        ebpmInputEBPMOHJ.value = (0,_util__WEBPACK_IMPORTED_MODULE_1__.round)(ebpmPrec.ebpmOHJ, 2).toString();
    }
    updatePrec();
}
function updatePrec() {
    ebpmInputPrecBeat.value = (0,_util__WEBPACK_IMPORTED_MODULE_1__.round)(ebpmPrec.precBeat, 3).toString();
    ebpmInputPrecTime.value = (0,_util__WEBPACK_IMPORTED_MODULE_1__.round)(ebpmPrec.precTime, 3).toString();
    ebpmInputPrecRealTime.value = (0,_util__WEBPACK_IMPORTED_MODULE_1__.round)(ebpmPrec.precRealTime, 1).toString();
}
function updateEBPM() {
    ebpmInputEBPMOHJ.value = (0,_util__WEBPACK_IMPORTED_MODULE_1__.round)(ebpmPrec.ebpmOHJ, 2).toString();
    ebpmInputEBPMStream.value = (0,_util__WEBPACK_IMPORTED_MODULE_1__.round)(ebpmPrec.ebpmStream, 2).toString();
}
function inputNJSHandler(ev) {
    noteJumpSpeed.njs =
        Math.abs(parseFloat(this.value)) > 0 ? Math.abs(parseFloat(this.value)) : noteJumpSpeed.njs;
    updateNJS();
    if (ev.type === 'change') {
        this.value = (0,_util__WEBPACK_IMPORTED_MODULE_1__.round)(noteJumpSpeed.njs, 3);
    }
}
function inputNJSOffsetHandler(ev) {
    noteJumpSpeed.offset = parseFloat(this.value) || 0;
    updateNJS();
    if (ev.type === 'change') {
        this.value = (0,_util__WEBPACK_IMPORTED_MODULE_1__.round)(noteJumpSpeed.offset, 3);
    }
}
function inputHJDHandler(ev) {
    noteJumpSpeed.offset =
        Math.max(Math.abs(parseFloat(this.value)), noteJumpSpeed.hjdMin) -
            noteJumpSpeed.calcHalfJumpDurationRaw();
    njsInputOffset.value = (0,_util__WEBPACK_IMPORTED_MODULE_1__.round)(noteJumpSpeed.offset, 3).toString();
    njsInputJD.value = (0,_util__WEBPACK_IMPORTED_MODULE_1__.round)(noteJumpSpeed.jd, 3).toString();
    njsInputReact.value = (0,_util__WEBPACK_IMPORTED_MODULE_1__.round)(noteJumpSpeed.reactTime * 1000).toString();
    njsOutputJD.textContent = (0,_util__WEBPACK_IMPORTED_MODULE_1__.round)(noteJumpSpeed.jdMin, 2).toString();
    if (ev.type === 'change') {
        this.value = (0,_util__WEBPACK_IMPORTED_MODULE_1__.round)(noteJumpSpeed.hjd, 3).toString();
    }
}
function inputJDHandler(ev) {
    var jd = Math.abs(parseFloat(this.value)) > 0 ? Math.abs(parseFloat(this.value)) : noteJumpSpeed.jd;
    if (njsSelectScale.value === 'hjd') {
        jd = Math.max(jd, noteJumpSpeed.jdMin);
        noteJumpSpeed.offset =
            noteJumpSpeed.calcHalfJumpDurationFromJD(jd) - noteJumpSpeed.calcHalfJumpDurationRaw();
    }
    if (njsSelectScale.value === 'njs') {
        noteJumpSpeed.njs = jd / (2 * noteJumpSpeed.calcReactionTimeHJD());
    }
    njsInputHJD.value = (0,_util__WEBPACK_IMPORTED_MODULE_1__.round)(noteJumpSpeed.hjd, 3).toString();
    njsInputReact.value = (0,_util__WEBPACK_IMPORTED_MODULE_1__.round)(noteJumpSpeed.reactTime * 1000).toString();
    njsOutputJD.textContent = (0,_util__WEBPACK_IMPORTED_MODULE_1__.round)(noteJumpSpeed.jdMin, 2).toString();
    njsInputNJS.value = (0,_util__WEBPACK_IMPORTED_MODULE_1__.round)(noteJumpSpeed.njs, 3).toString();
    njsInputOffset.value = (0,_util__WEBPACK_IMPORTED_MODULE_1__.round)(noteJumpSpeed.offset, 3).toString();
    if (ev.type === 'change') {
        this.value = (0,_util__WEBPACK_IMPORTED_MODULE_1__.round)(noteJumpSpeed.jd, 2).toString();
    }
}
function inputReactTimeHandler(ev) {
    var reactTime = Math.max(Math.abs(parseFloat(this.value)) / 1000 > 0
        ? Math.abs(parseFloat(this.value)) / 1000
        : noteJumpSpeed.calcReactionTimeHJD(), noteJumpSpeed.calcReactionTimeHJD(noteJumpSpeed.hjdMin));
    noteJumpSpeed.offset = reactTime / (60 / bpm.value) - noteJumpSpeed.calcHalfJumpDurationRaw();
    njsInputHJD.value = (0,_util__WEBPACK_IMPORTED_MODULE_1__.round)(noteJumpSpeed.hjd, 3).toString();
    njsInputJD.value = (0,_util__WEBPACK_IMPORTED_MODULE_1__.round)(noteJumpSpeed.jd, 2).toString();
    njsOutputJD.textContent = (0,_util__WEBPACK_IMPORTED_MODULE_1__.round)(noteJumpSpeed.jdMin, 2).toString();
    njsInputOffset.value = (0,_util__WEBPACK_IMPORTED_MODULE_1__.round)(noteJumpSpeed.offset, 3).toString();
    if (ev.type === 'change') {
        this.value = (0,_util__WEBPACK_IMPORTED_MODULE_1__.round)(noteJumpSpeed.reactTime * 1000).toString();
    }
}
function updateNJS() {
    noteJumpSpeed.update();
    njsInputHJD.value = (0,_util__WEBPACK_IMPORTED_MODULE_1__.round)(noteJumpSpeed.hjd, 3).toString();
    njsInputJD.value = (0,_util__WEBPACK_IMPORTED_MODULE_1__.round)(noteJumpSpeed.jd, 2).toString();
    njsInputReact.value = (0,_util__WEBPACK_IMPORTED_MODULE_1__.round)(noteJumpSpeed.reactTime * 1000).toString();
    njsOutputJDOHigh.textContent = (0,_util__WEBPACK_IMPORTED_MODULE_1__.round)(noteJumpSpeed.calcJumpDistanceOptimalHigh(), 2).toString();
    njsOutputJDOLow.textContent = (0,_util__WEBPACK_IMPORTED_MODULE_1__.round)(noteJumpSpeed.calcJumpDistanceOptimalLow(), 2).toString();
    njsOutputJD.textContent = (0,_util__WEBPACK_IMPORTED_MODULE_1__.round)(noteJumpSpeed.jdMin, 2).toString();
}
function inputNoteHandler(ev) {
    scoreCalculator.note = parseInt(this.value) || 0;
    updateScore();
    updateScoreEst();
    updateScoreTable();
    if (ev.type === 'change') {
        this.value = scoreCalculator.note.toString();
    }
}
function inputStarHandler(ev) {
    scoreCalculator.star = parseFloat(this.value) || 0;
    updateScore();
    updateScoreEst();
    updateScoreTable();
    if (ev.type === 'change') {
        this.value = (0,_util__WEBPACK_IMPORTED_MODULE_1__.round)(scoreCalculator.star, 2).toString();
    }
}
function inputPercentHandler(ev) {
    updateScore();
    updateScoreTable();
    if (ev.type === 'change') {
        this.value = (0,_util__WEBPACK_IMPORTED_MODULE_1__.round)(parseFloat(this.value), 2).toString();
    }
}
function inputScoreHandler(ev) {
    var score = parseInt(this.value);
    var maxScore = scoreCalculator.calcScore();
    scoreInputPercent.value = (0,_util__WEBPACK_IMPORTED_MODULE_1__.round)((score / maxScore) * 100, 2).toString();
    scoreInputPP.value = (0,_util__WEBPACK_IMPORTED_MODULE_1__.round)(scoreCalculator.calcPP(scoreCalculator.star, parseFloat(scoreInputPercent.value) / 100), 2).toString();
    if (ev.type === 'change') {
        this.value = score.toString();
    }
}
function inputAvgCutHandler(ev) {
    updateScoreEst();
    if (ev.type === 'change') {
        this.value = (0,_util__WEBPACK_IMPORTED_MODULE_1__.round)(parseFloat(this.value), 2).toString();
    }
}
function inputMissBreakHandler(ev) {
    var temp = this.value.trim().replace(/\s+,/, ',');
    if (/^((\d+\.)?\d+,?)+/.test(temp) || temp === '') {
        var temp2 = temp
            .split(',')
            .map(function (x) { return parseInt(x); })
            .filter(function (x) { return !isNaN(x); })
            .sort(function (a, b) { return a - b; });
        this.value = temp2.join(',').toString();
        updateScoreEst();
    }
}
function inputTablePercentHandler(ev) {
    var temp = this.value.trim().replace(/\s+,/, ',');
    if (/^((\d+\.)?\d+,?)+/.test(temp)) {
        var temp2 = temp
            .split(',')
            .map(function (x) { return parseFloat(x); })
            .filter(function (x) { return !isNaN(x); })
            .sort(function (a, b) { return b - a; });
        this.value = temp2.toString();
        updateScoreTable();
    }
}
function updateScore() {
    scoreInputScore.value = (0,_util__WEBPACK_IMPORTED_MODULE_1__.round)(scoreCalculator.calcScore() * (parseFloat(scoreInputPercent.value) / 100)).toString();
    scoreInputPP.value = (0,_util__WEBPACK_IMPORTED_MODULE_1__.round)(scoreCalculator.calcPP(scoreCalculator.star, parseFloat(scoreInputPercent.value) / 100), 2).toString();
    scoreOutputMaxScore.textContent = (0,_util__WEBPACK_IMPORTED_MODULE_1__.formatNumber)(scoreCalculator.calcScore());
    scoreOutputMaxScoreMod.textContent = (0,_util__WEBPACK_IMPORTED_MODULE_1__.formatNumber)(scoreCalculator.calcScore());
}
function updateScoreEst() {
    var missedScore = scoreInputMissed.value.split(',').map(function (x) { return parseInt(x); }) || [];
    var breakScore = scoreInputBreak.value.split(',').map(function (x) { return parseInt(x); }) || [];
    var maxScore = scoreCalculator.calcScore();
    var estScore = scoreCalculator.calcScore(parseFloat(scoreInputAvgCut.value), undefined, missedScore, breakScore);
    var noMissScore = scoreCalculator.calcScore(parseFloat(scoreInputAvgCut.value));
    scoreOutputEstScore.textContent = (0,_util__WEBPACK_IMPORTED_MODULE_1__.formatNumber)((0,_util__WEBPACK_IMPORTED_MODULE_1__.round)(estScore));
    scoreOutputEstPercent.textContent = (0,_util__WEBPACK_IMPORTED_MODULE_1__.round)((estScore / maxScore) * 100, 2).toString();
    scoreOutputEstPP.textContent = (0,_util__WEBPACK_IMPORTED_MODULE_1__.round)(scoreCalculator.calcPP(scoreCalculator.star, estScore / maxScore), 2).toString();
    scoreOutputMissScore.textContent = (0,_util__WEBPACK_IMPORTED_MODULE_1__.formatNumber)((0,_util__WEBPACK_IMPORTED_MODULE_1__.round)(noMissScore - estScore));
    scoreOutputNoMissScore.textContent = (0,_util__WEBPACK_IMPORTED_MODULE_1__.formatNumber)((0,_util__WEBPACK_IMPORTED_MODULE_1__.round)(noMissScore));
    scoreOutputNoMissPercent.textContent = (0,_util__WEBPACK_IMPORTED_MODULE_1__.round)((noMissScore / maxScore) * 100, 2).toString();
    scoreOutputNoMissPP.textContent = (0,_util__WEBPACK_IMPORTED_MODULE_1__.round)(scoreCalculator.calcPP(scoreCalculator.star, noMissScore / maxScore), 2).toString();
}
function updateScoreTable() {
    scoreTable.innerHTML = '<tr><th>Percentage</th><th>Score</th><th>PP</th></tr>';
    var scorePerc = scoreTablePercent.value.split(',').map(function (x) { return parseFloat(x); });
    for (var i = 0; i < scorePerc.length; i++) {
        var elemRow = document.createElement('tr');
        var elemPerc = document.createElement('td');
        var elemScore = document.createElement('td');
        var elemPP = document.createElement('td');
        elemPerc.textContent = (0,_util__WEBPACK_IMPORTED_MODULE_1__.round)(scorePerc[i], 2).toString();
        elemScore.textContent = (0,_util__WEBPACK_IMPORTED_MODULE_1__.formatNumber)((0,_util__WEBPACK_IMPORTED_MODULE_1__.round)(scoreCalculator.calcScore() * (scorePerc[i] / 100)));
        elemPP.textContent = (0,_util__WEBPACK_IMPORTED_MODULE_1__.round)(scoreCalculator.calcPP(scoreCalculator.star, scorePerc[i] / 100), 2).toString();
        elemRow.appendChild(elemPerc);
        elemRow.appendChild(elemScore);
        elemRow.appendChild(elemPP);
        scoreTable.appendChild(elemRow);
    }
}
function optionScoreCurveHandler() {
    scoreCalculator.curvePoints = _ppCurve__WEBPACK_IMPORTED_MODULE_10__.ppCurve[this.value];
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
    var parsedJSON = {};
    cpErrorJSON.innerHTML = '';
    try {
        if (/^{/.test(this.value.trim())) {
            parsedJSON = JSON.parse(this.value.trim());
        }
        else {
            parsedJSON = JSON.parse("{" + this.value.trim().replace(/\,$/, '') + "}");
        }
        scoreCalculator.curvePoints = parsedJSON.curvePoints;
        _ppCurve__WEBPACK_IMPORTED_MODULE_10__.ppCurve.custom = parsedJSON.curvePoints;
    }
    catch (err) {
        console.error(err);
        scoreErrorJSON.innerHTML = err + '<br>';
    }
    updateScore();
    updateScoreEst();
    updateScoreTable();
    updateScoreJSON();
}
function updateScoreJSON() {
    var parsed = {
        curvePoints: __spreadArray([], scoreCalculator.curvePoints, true).reverse(),
    };
    scoreTextAreaJSON.value = JSON.stringify(parsed, null, 4);
}
function inputSPSHandlerHandler(ev) {
    var diffName = this.id.slice(10);
    swingPerSecond.difficulty[diffName] = this.value
        ? Math.abs(parseFloat(this.value.trim()))
        : null;
    var prevDiff = null;
    for (var d in swingPerSecond.difficulty) {
        if (swingPerSecond.difficulty[d] !== null) {
            if (prevDiff !== null) {
                spsOutput[prevDiff].textContent = (swingPerSecond.difficulty[d] !== 0
                    ? swingPerSecond.calcDifference(d, prevDiff).toFixed(2)
                    : 'Infinity') + "%";
            }
            prevDiff = d;
        }
        spsOutput[d].textContent = '';
    }
    spsOutputTotal.textContent = swingPerSecond.getTotalReduction().toFixed(2) + "%";
    if (ev.type === 'change') {
        if (swingPerSecond.difficulty[diffName] !== null) {
            this.value = (0,_util__WEBPACK_IMPORTED_MODULE_1__.round)(swingPerSecond.difficulty[diffName], 2).toString();
        }
    }
}
function inputLabelTextHandler(ev) {
    if (this.value.trim() !== '') {
        labelOutputText.textContent = this.value.trim();
    }
    else {
        labelOutputText.textContent = 'none';
    }
}
function inputDiffCountHandler(ev) {
    labelOutputText.className = "diff-label diff-count-" + parseInt(this.value);
}
function optionColorSchemeHandler() {
    if (this.value !== cpCustomText) {
        for (var obj in colorPicker.colorScheme) {
            cpInputHex[obj].value = '';
            cpInputPicker[obj].value = '#000000';
            cpInputInclude[obj].checked = false;
            cpInputReset[obj].style.display = 'none';
        }
        colorPicker.environmentColor = this.value;
        for (var obj in colorPicker.colorScheme) {
            if (colorPicker.colorScheme[obj]) {
                var hexColor = colorPicker.getColorHex(colorPicker.colorScheme[obj]);
                cpInputHex[obj].value = hexColor;
                cpInputPicker[obj].value = hexColor;
                cpInputInclude[obj].checked = colorPicker.colorScheme[obj] ? true : false;
                cpInputReset[obj].style.display = 'block';
            }
        }
        updateColorJSON();
    }
}
function inputJSONColorHandler() {
    for (var obj in colorPicker.colorScheme) {
        cpInputHex[obj].value = '';
        cpInputPicker[obj].value = '#000000';
        cpInputInclude[obj].checked = false;
        cpInputReset[obj].style.display = 'none';
    }
    cpErrorJSON.innerHTML = '';
    var colorType = [
        '_colorLeft',
        '_colorRight',
        '_envColorLeft',
        '_envColorRight',
        '_envColorLeftBoost',
        '_envColorRightBoost',
        '_obstacleColor',
    ];
    var parsedJSON = {};
    try {
        if (/^{/.test(this.value.trim())) {
            parsedJSON = JSON.parse(this.value.trim());
        }
        else {
            parsedJSON = JSON.parse("{" + this.value.trim().replace(/\,$/, '') + "}");
        }
    }
    catch (err) {
        console.error(err);
        cpErrorJSON.innerHTML = err + '<br>';
    }
    for (var obj in parsedJSON) {
        if (colorType.includes(obj)) {
            colorPicker.colorScheme[obj] = parsedJSON[obj];
            var hexColor = colorPicker.getColorHex(parsedJSON[obj]);
            cpInputHex[obj].value = hexColor;
            cpInputPicker[obj].value = hexColor;
            cpInputInclude[obj].checked = true;
            cpInputReset[obj].style.display = 'block';
        }
    }
    updateColorJSON();
}
function updateColorJSON() {
    var parsed = {};
    for (var obj in colorPicker.colorScheme) {
        if (cpInputInclude[obj].checked) {
            parsed[obj] = colorPicker.colorScheme[obj];
        }
    }
    cpTextAreaIOJSON.value = JSON.stringify(parsed, null, 4);
}
function inputColorHexHandler() {
    // pepega
    if (/^\#?[0-9a-fA-F]{6,8}/.test(this.value.trim())) {
        var objName = "_" + this.id.slice(13);
        for (var obj in colorPicker.colorScheme) {
            if (objName === obj.toLowerCase()) {
                objName = obj;
            }
        }
        var colorHex = this.value.trim().replace(/^\#?/, '#').slice(0, 7);
        colorPicker.colorScheme[objName] = colorPicker.hexToRGB(colorHex);
        cpInputHex[objName].value = colorHex;
        cpInputPicker[objName].value = colorHex;
        cpInputInclude[objName].checked = true;
        cpInputReset[objName].style.display = 'block';
        updateColorJSON();
    }
}
function inputColorPickerHandler() {
    var objName = "_" + this.id.slice(16);
    for (var obj in colorPicker.colorScheme) {
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
    var objName = "_" + this.id.slice(17);
    for (var obj in colorPicker.colorScheme) {
        if (objName === obj.toLowerCase()) {
            objName = obj;
        }
    }
    if (this.checked) {
        colorPicker.colorScheme[objName] = colorPicker.hexToRGB(cpInputPicker[objName].value);
        cpInputHex[objName].value = cpInputPicker[objName].value;
        cpInputReset[objName].style.display = 'block';
    }
    updateColorJSON();
}
function inputColorResetHandler() {
    var objName = "_" + this.id.slice(15);
    for (var obj in colorPicker.colorScheme) {
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
    for (var l = 0; l < randPatternGen.row; l++) {
        var row = document.createElement('tr');
        for (var i = 0; i < randPatternGen.column; i++) {
            var elem = document.createElement('td');
            elem.className = 'table-grid';
            var img = document.createElement('img');
            img.className = 'table-rpattern-image';
            img.src = "./assets/" + _randPattern__WEBPACK_IMPORTED_MODULE_9__.noteImage.blank;
            img.alt = _randPattern__WEBPACK_IMPORTED_MODULE_9__.noteImage.blank.slice(0, -4);
            elem.appendChild(img);
            row.appendChild(elem);
        }
        rpgTable.appendChild(row);
    }
}
function inputRPatternRowHandler() {
    var val = Math.min(Math.abs(parseFloat(this.value)) || 1, 4);
    this.value = val;
    randPatternGen.row = val;
    tableRPattern();
}
function inputRPatternColumnHandler() {
    var val = Math.min(Math.abs(parseFloat(this.value)) || 1, 8);
    this.value = val;
    randPatternGen.column = val;
    tableRPattern();
}
function inputRPatternGenerateHandler() {
    var rpgTableImage = document.querySelectorAll('.table-rpattern-image');
    rpgTableImage.forEach(function (image) {
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
    var grid = randPatternGen.generate();
    for (var j = 0; j < grid.length; j++) {
        if (grid[j] !== null) {
            rpgTableImage[j].src = "./assets/" + (grid[j]._noteDirection !== 8 || rpgInputNoDot.checked
                ? _randPattern__WEBPACK_IMPORTED_MODULE_9__.noteImage[grid[j]._noteType]
                : _randPattern__WEBPACK_IMPORTED_MODULE_9__.noteImage[grid[j]._noteType + 3]);
            rpgTableImage[j].alt = _randPattern__WEBPACK_IMPORTED_MODULE_9__.noteImage[grid[j]._noteType].slice(0, -4);
            if (grid[j]._noteDirection !== 8) {
                rpgTableImage[j].className += " " + _randPattern__WEBPACK_IMPORTED_MODULE_9__.noteRotation[grid[j]._noteDirection];
                rpgTableImage[j].alt += " " + _randPattern__WEBPACK_IMPORTED_MODULE_9__.noteRotation[grid[j]._noteDirection];
            }
        }
    }
}

})();

// This entry need to be wrapped in an IIFE because it need to be isolated against other entry modules.
(() => {
/*!*******************!*\
  !*** ./src/ui.ts ***!
  \*******************/

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBLDhCQUE4QjtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLENBQUM7QUFDRCxpRUFBZSxhQUFhLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2pCRTtBQUNVO0FBQ3pDO0FBQ0E7QUFDQSw0Q0FBNEM7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsWUFBWSxrREFBVztBQUN2QjtBQUNBLDBDQUEwQyxrREFBVztBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkNBQTZDLDRDQUFLO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0I7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsaUVBQWUsV0FBVyxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7O0FDN0UzQjtBQUNBO0FBQ0EsbUNBQW1DO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELGlFQUFlLGFBQWEsRUFBQzs7Ozs7Ozs7Ozs7Ozs7OztBQzFFdEI7QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNBLHNCQUFzQiw4QkFBOEI7QUFDcEQsdUJBQXVCLDZCQUE2QjtBQUNwRCx5QkFBeUIsNkJBQTZCO0FBQ3RELDBCQUEwQiw4QkFBOEI7QUFDeEQsOEJBQThCLDhCQUE4QjtBQUM1RCwrQkFBK0IsNkJBQTZCO0FBQzVELDBCQUEwQix3QkFBd0I7QUFDbEQsS0FBSztBQUNMOzs7Ozs7Ozs7Ozs7Ozs7O0FDN3JCQTtBQUNBO0FBQ0EsOEJBQThCO0FBQzlCLDhCQUE4QjtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQztBQUNqQztBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QjtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0EsOEJBQThCO0FBQzlCO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxpRUFBZSxhQUFhLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2SHRCO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzNDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FB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REFBUztBQUM1QztBQUNBLG9EQUFvRCxzREFBWTtBQUNoRSw4Q0FBOEMsc0RBQVk7QUFDMUQ7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9tYXBwaW5nLXV0aWxpdHkvLi9zcmMvYnBtLnRzIiwid2VicGFjazovL21hcHBpbmctdXRpbGl0eS8uL3NyYy9jb2xvclBpY2tlci50cyIsIndlYnBhY2s6Ly9tYXBwaW5nLXV0aWxpdHkvLi9zcmMvZWJwbVByZWMudHMiLCJ3ZWJwYWNrOi8vbWFwcGluZy11dGlsaXR5Ly4vc3JjL2VudkNvbG9yLnRzIiwid2VicGFjazovL21hcHBpbmctdXRpbGl0eS8uL3NyYy9uanMudHMiLCJ3ZWJwYWNrOi8vbWFwcGluZy11dGlsaXR5Ly4vc3JjL3BwQ3VydmUudHMiLCJ3ZWJwYWNrOi8vbWFwcGluZy11dGlsaXR5Ly4vc3JjL3JhbmRQYXR0ZXJuLnRzIiwid2VicGFjazovL21hcHBpbmctdXRpbGl0eS8uL3NyYy9zY29yZS50cyIsIndlYnBhY2s6Ly9tYXBwaW5nLXV0aWxpdHkvLi9zcmMvc3BzLnRzIiwid2VicGFjazovL21hcHBpbmctdXRpbGl0eS8uL3NyYy91dGlsLnRzIiwid2VicGFjazovL21hcHBpbmctdXRpbGl0eS8uL3NyYy92ZXJzaW9uLnRzIiwid2VicGFjazovL21hcHBpbmctdXRpbGl0eS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9tYXBwaW5nLXV0aWxpdHkvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL21hcHBpbmctdXRpbGl0eS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL21hcHBpbmctdXRpbGl0eS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL21hcHBpbmctdXRpbGl0eS8uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgQmVhdFBlck1pbnV0ZSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIEJlYXRQZXJNaW51dGUoYnBtKSB7XHJcbiAgICAgICAgaWYgKGJwbSA9PT0gdm9pZCAwKSB7IGJwbSA9IDEyODsgfVxyXG4gICAgICAgIHRoaXMuYnBtID0gYnBtO1xyXG4gICAgfVxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEJlYXRQZXJNaW51dGUucHJvdG90eXBlLCBcInZhbHVlXCIsIHtcclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYnBtO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAoYnBtKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYnBtID0gYnBtO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIHJldHVybiBCZWF0UGVyTWludXRlO1xyXG59KCkpO1xyXG5leHBvcnQgZGVmYXVsdCBCZWF0UGVyTWludXRlO1xyXG4iLCJpbXBvcnQgeyByb3VuZCB9IGZyb20gJy4vdXRpbCc7XHJcbmltcG9ydCB7IGNvbG9yU2NoZW1lIH0gZnJvbSAnLi9lbnZDb2xvcic7XHJcbnZhciBDb2xvclBpY2tlciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIENvbG9yUGlja2VyKF9lbnZpcm9ubWVudENvbG9yKSB7XHJcbiAgICAgICAgaWYgKF9lbnZpcm9ubWVudENvbG9yID09PSB2b2lkIDApIHsgX2Vudmlyb25tZW50Q29sb3IgPSAnRGVmYXVsdCBDdXN0b20nOyB9XHJcbiAgICAgICAgdGhpcy5fZW52aXJvbm1lbnRDb2xvciA9IF9lbnZpcm9ubWVudENvbG9yO1xyXG4gICAgICAgIHRoaXMuX2NvbG9yU2NoZW1lID0ge1xyXG4gICAgICAgICAgICBfY29sb3JMZWZ0OiBudWxsLFxyXG4gICAgICAgICAgICBfY29sb3JSaWdodDogbnVsbCxcclxuICAgICAgICAgICAgX2VudkNvbG9yTGVmdDogbnVsbCxcclxuICAgICAgICAgICAgX2VudkNvbG9yUmlnaHQ6IG51bGwsXHJcbiAgICAgICAgICAgIF9lbnZDb2xvckxlZnRCb29zdDogbnVsbCxcclxuICAgICAgICAgICAgX2VudkNvbG9yUmlnaHRCb29zdDogbnVsbCxcclxuICAgICAgICAgICAgX29ic3RhY2xlQ29sb3I6IG51bGwsXHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xyXG4gICAgfVxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KENvbG9yUGlja2VyLnByb3RvdHlwZSwgXCJjb2xvclNjaGVtZVwiLCB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9jb2xvclNjaGVtZTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ29sb3JQaWNrZXIucHJvdG90eXBlLCBcImVudmlyb25tZW50Q29sb3JcIiwge1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZW52aXJvbm1lbnRDb2xvcjtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNldDogZnVuY3Rpb24gKHZhbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9lbnZpcm9ubWVudENvbG9yID0gdmFsO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZSgpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIENvbG9yUGlja2VyLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKGNvbG9yU2NoZW1lW3RoaXMuX2Vudmlyb25tZW50Q29sb3JdKSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIHBhcnQgaW4gdGhpcy5fY29sb3JTY2hlbWUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2NvbG9yU2NoZW1lW3BhcnRdID0gY29sb3JTY2hlbWVbdGhpcy5fZW52aXJvbm1lbnRDb2xvcl1bcGFydF0gfHwgbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBDb2xvclBpY2tlci5wcm90b3R5cGUuZ2V0Q29sb3JIZXggPSBmdW5jdGlvbiAoY29sb3IpIHtcclxuICAgICAgICBpZiAoY29sb3IgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gJyMwMDAwMDAnO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5yZ2JhVG9IZXgoY29sb3IpO1xyXG4gICAgfTtcclxuICAgIENvbG9yUGlja2VyLnByb3RvdHlwZS5kZWNUb0hleCA9IGZ1bmN0aW9uICh2YWwpIHtcclxuICAgICAgICB2YXIgaGV4ID0gdmFsLnRvU3RyaW5nKDE2KTtcclxuICAgICAgICByZXR1cm4gaGV4Lmxlbmd0aCA9PT0gMSA/ICcwJyArIGhleCA6IGhleDtcclxuICAgIH07XHJcbiAgICBDb2xvclBpY2tlci5wcm90b3R5cGUuaGV4VG9EZWMgPSBmdW5jdGlvbiAodmFsKSB7XHJcbiAgICAgICAgcmV0dXJuIHBhcnNlSW50KHZhbCwgMTYpO1xyXG4gICAgfTtcclxuICAgIENvbG9yUGlja2VyLnByb3RvdHlwZS5jRGVub3JtID0gZnVuY3Rpb24gKHZhbCkge1xyXG4gICAgICAgIHJldHVybiB2YWwgPiAxICYmICEodmFsIDwgMCkgPyAyNTUgOiByb3VuZCh2YWwgKiAyNTUpO1xyXG4gICAgfTtcclxuICAgIENvbG9yUGlja2VyLnByb3RvdHlwZS5jTm9ybSA9IGZ1bmN0aW9uICh2YWwpIHtcclxuICAgICAgICByZXR1cm4gdmFsIC8gMjU1O1xyXG4gICAgfTtcclxuICAgIENvbG9yUGlja2VyLnByb3RvdHlwZS5yZ2JhVG9IZXggPSBmdW5jdGlvbiAoYykge1xyXG4gICAgICAgIHZhciBjb2xvciA9IHsgcjogbnVsbCwgZzogbnVsbCwgYjogbnVsbCB9O1xyXG4gICAgICAgIGZvciAodmFyIHYgaW4gYykge1xyXG4gICAgICAgICAgICBjb2xvclt2XSA9IHRoaXMuY0Rlbm9ybShjW3ZdKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFwiI1wiICsgdGhpcy5kZWNUb0hleChjb2xvci5yKSArIHRoaXMuZGVjVG9IZXgoY29sb3IuZykgKyB0aGlzLmRlY1RvSGV4KGNvbG9yLmIpICsgKGNvbG9yLmEgIT09IHVuZGVmaW5lZCA/IHRoaXMuZGVjVG9IZXgoY29sb3IuYSkgOiAnJyk7XHJcbiAgICB9O1xyXG4gICAgQ29sb3JQaWNrZXIucHJvdG90eXBlLmhleFRvUkdCID0gZnVuY3Rpb24gKGhleCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHI6IHRoaXMuY05vcm0odGhpcy5oZXhUb0RlYyhoZXguc2xpY2UoMSwgMykpKSxcclxuICAgICAgICAgICAgZzogdGhpcy5jTm9ybSh0aGlzLmhleFRvRGVjKGhleC5zbGljZSgzLCA1KSkpLFxyXG4gICAgICAgICAgICBiOiB0aGlzLmNOb3JtKHRoaXMuaGV4VG9EZWMoaGV4LnNsaWNlKDUsIDcpKSksXHJcbiAgICAgICAgfTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gQ29sb3JQaWNrZXI7XHJcbn0oKSk7XHJcbmV4cG9ydCBkZWZhdWx0IENvbG9yUGlja2VyO1xyXG4iLCJ2YXIgRUJQTVByZWNpc2lvbiA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIEVCUE1QcmVjaXNpb24oYnBtLCBwcmVjQmVhdCkge1xyXG4gICAgICAgIGlmIChwcmVjQmVhdCA9PT0gdm9pZCAwKSB7IHByZWNCZWF0ID0gMjsgfVxyXG4gICAgICAgIHRoaXMuX2JwbSA9IGJwbTtcclxuICAgICAgICB0aGlzLl9wcmVjQmVhdCA9IHByZWNCZWF0O1xyXG4gICAgICAgIHRoaXMudXBkYXRlKCk7XHJcbiAgICB9XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoRUJQTVByZWNpc2lvbi5wcm90b3R5cGUsIFwicHJlY0JlYXRcIiwge1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcHJlY0JlYXQ7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWwpIHtcclxuICAgICAgICAgICAgdGhpcy5fcHJlY0JlYXQgPSB2YWw7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlKCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgIH0pO1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEVCUE1QcmVjaXNpb24ucHJvdG90eXBlLCBcInByZWNUaW1lXCIsIHtcclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3ByZWNUaW1lO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsKSB7XHJcbiAgICAgICAgICAgIHRoaXMucHJlY0JlYXQgPSAxIC8gdmFsO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShFQlBNUHJlY2lzaW9uLnByb3RvdHlwZSwgXCJwcmVjUmVhbFRpbWVcIiwge1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcHJlY1JlYWxUaW1lO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsKSB7XHJcbiAgICAgICAgICAgIHRoaXMucHJlY0JlYXQgPSAxIC8gKCh0aGlzLl9icG0udmFsdWUgKiB2YWwpIC8gNjAwMDApO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShFQlBNUHJlY2lzaW9uLnByb3RvdHlwZSwgXCJlYnBtU3RyZWFtXCIsIHtcclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2VicG1TdHJlYW07XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWwpIHtcclxuICAgICAgICAgICAgdGhpcy5fZWJwbVN0cmVhbSA9IHZhbDtcclxuICAgICAgICAgICAgdGhpcy5wcmVjQmVhdCA9IHRoaXMuY2FsY0JlYXRQcmVjaXNpb24oKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoRUJQTVByZWNpc2lvbi5wcm90b3R5cGUsIFwiZWJwbU9ISlwiLCB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9lYnBtT0hKO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2VicG1TdHJlYW0gPSB2YWwgLyAyO1xyXG4gICAgICAgICAgICB0aGlzLnByZWNCZWF0ID0gdGhpcy5jYWxjQmVhdFByZWNpc2lvbigpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIEVCUE1QcmVjaXNpb24ucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLl9wcmVjVGltZSA9IDEgLyB0aGlzLl9wcmVjQmVhdDtcclxuICAgICAgICB0aGlzLl9wcmVjUmVhbFRpbWUgPSAoNjAgLyB0aGlzLl9icG0udmFsdWUgLyB0aGlzLl9wcmVjQmVhdCkgKiAxMDAwO1xyXG4gICAgICAgIHRoaXMuX2VicG1PSEogPSB0aGlzLmNhbGNFZmZlY3RpdmVCUE0oKTtcclxuICAgICAgICB0aGlzLl9lYnBtU3RyZWFtID0gdGhpcy5fZWJwbU9ISiAvIDI7XHJcbiAgICB9O1xyXG4gICAgRUJQTVByZWNpc2lvbi5wcm90b3R5cGUuY2FsY0VmZmVjdGl2ZUJQTSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gKHRoaXMuX2JwbS52YWx1ZSAqIDAuNSkgLyAoMSAvIHRoaXMuX3ByZWNCZWF0KTtcclxuICAgIH07XHJcbiAgICBFQlBNUHJlY2lzaW9uLnByb3RvdHlwZS5jYWxjQmVhdFByZWNpc2lvbiA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZWJwbVN0cmVhbSAvICh0aGlzLl9icG0udmFsdWUgKiAwLjI1KTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gRUJQTVByZWNpc2lvbjtcclxufSgpKTtcclxuZXhwb3J0IGRlZmF1bHQgRUJQTVByZWNpc2lvbjtcclxuIiwiZXhwb3J0IHZhciBjb2xvclNjaGVtZSA9IHtcclxuICAgICdEZWZhdWx0IEN1c3RvbSc6IHtcclxuICAgICAgICBfY29sb3JMZWZ0OiB7XHJcbiAgICAgICAgICAgIHI6IDAuNzUyOTQxMixcclxuICAgICAgICAgICAgZzogMC4xODgyMzUzLFxyXG4gICAgICAgICAgICBiOiAwLjE4ODIzNTMsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBfY29sb3JSaWdodDoge1xyXG4gICAgICAgICAgICByOiAwLjEyNTQ5MDIsXHJcbiAgICAgICAgICAgIGc6IDAuMzkyMTU2OSxcclxuICAgICAgICAgICAgYjogMC42NTg4MjM1LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgX2VudkNvbG9yTGVmdDoge1xyXG4gICAgICAgICAgICByOiAwLjc1Mjk0MTIsXHJcbiAgICAgICAgICAgIGc6IDAuMTg4MjM1MyxcclxuICAgICAgICAgICAgYjogMC4xODgyMzUzLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgX2VudkNvbG9yUmlnaHQ6IHtcclxuICAgICAgICAgICAgcjogMC4xODgyMzUzLFxyXG4gICAgICAgICAgICBnOiAwLjU5NjA3ODUsXHJcbiAgICAgICAgICAgIGI6IDEsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBfb2JzdGFjbGVDb2xvcjoge1xyXG4gICAgICAgICAgICByOiAxLFxyXG4gICAgICAgICAgICBnOiAwLjE4ODIzNTMsXHJcbiAgICAgICAgICAgIGI6IDAuMTg4MjM1MyxcclxuICAgICAgICB9LFxyXG4gICAgfSxcclxuICAgICdUaGUgRmlyc3QnOiB7XHJcbiAgICAgICAgX2NvbG9yTGVmdDoge1xyXG4gICAgICAgICAgICByOiAwLjc4NDMxMzcsXHJcbiAgICAgICAgICAgIGc6IDAuMDc4NDMxMzgsXHJcbiAgICAgICAgICAgIGI6IDAuMDc4NDMxMzgsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBfY29sb3JSaWdodDoge1xyXG4gICAgICAgICAgICByOiAwLjE1Njg2MjcsXHJcbiAgICAgICAgICAgIGc6IDAuNTU2ODYyNyxcclxuICAgICAgICAgICAgYjogMC44MjM1Mjk0LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgX2VudkNvbG9yTGVmdDoge1xyXG4gICAgICAgICAgICByOiAwLjg1LFxyXG4gICAgICAgICAgICBnOiAwLjA4NDk5OTk3LFxyXG4gICAgICAgICAgICBiOiAwLjA4NDk5OTk3LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgX2VudkNvbG9yUmlnaHQ6IHtcclxuICAgICAgICAgICAgcjogMC4xODgyMzUzLFxyXG4gICAgICAgICAgICBnOiAwLjY3NTI5NCxcclxuICAgICAgICAgICAgYjogMSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIF9vYnN0YWNsZUNvbG9yOiB7XHJcbiAgICAgICAgICAgIHI6IDEsXHJcbiAgICAgICAgICAgIGc6IDAuMTg4MjM1MyxcclxuICAgICAgICAgICAgYjogMC4xODgyMzUzLFxyXG4gICAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgT3JpZ2luczoge1xyXG4gICAgICAgIF9jb2xvckxlZnQ6IHtcclxuICAgICAgICAgICAgcjogMC42NzkyNDUzLFxyXG4gICAgICAgICAgICBnOiAwLjU3MTI2MjgsXHJcbiAgICAgICAgICAgIGI6IDAsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBfY29sb3JSaWdodDoge1xyXG4gICAgICAgICAgICByOiAwLjcwNzU0NzIsXHJcbiAgICAgICAgICAgIGc6IDAsXHJcbiAgICAgICAgICAgIGI6IDAuNTM2NDQxMSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIF9lbnZDb2xvckxlZnQ6IHtcclxuICAgICAgICAgICAgcjogMC40OTEwOTk1LFxyXG4gICAgICAgICAgICBnOiAwLjY4NjI3NDUsXHJcbiAgICAgICAgICAgIGI6IDAuNyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIF9lbnZDb2xvclJpZ2h0OiB7XHJcbiAgICAgICAgICAgIHI6IDAuMDM4NDQ3ODMsXHJcbiAgICAgICAgICAgIGc6IDAuNjg2Mjc0NSxcclxuICAgICAgICAgICAgYjogMC45MDU2NjA0LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgX29ic3RhY2xlQ29sb3I6IHtcclxuICAgICAgICAgICAgcjogMC4wNjE2NzY3NixcclxuICAgICAgICAgICAgZzogMC4yODY5NTEzLFxyXG4gICAgICAgICAgICBiOiAwLjM5NjIyNjQsXHJcbiAgICAgICAgfSxcclxuICAgIH0sXHJcbiAgICBLREE6IHtcclxuICAgICAgICBfY29sb3JMZWZ0OiB7XHJcbiAgICAgICAgICAgIHI6IDAuNjU4ODIzNSxcclxuICAgICAgICAgICAgZzogMC4yNjI3NDUxLFxyXG4gICAgICAgICAgICBiOiAwLjE2MDc4NDMsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBfY29sb3JSaWdodDoge1xyXG4gICAgICAgICAgICByOiAwLjUwMTk2MDgsXHJcbiAgICAgICAgICAgIGc6IDAuMDgyMzUyOTQsXHJcbiAgICAgICAgICAgIGI6IDAuNTcyNTQ5LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgX2VudkNvbG9yTGVmdDoge1xyXG4gICAgICAgICAgICByOiAxLFxyXG4gICAgICAgICAgICBnOiAwLjM5NjA3ODUsXHJcbiAgICAgICAgICAgIGI6IDAuMjQzMTM3MyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIF9lbnZDb2xvclJpZ2h0OiB7XHJcbiAgICAgICAgICAgIHI6IDAuNzYwNzg0NCxcclxuICAgICAgICAgICAgZzogMC4xMjU0OTAyLFxyXG4gICAgICAgICAgICBiOiAwLjg2NjY2NjcsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBfb2JzdGFjbGVDb2xvcjoge1xyXG4gICAgICAgICAgICByOiAxLFxyXG4gICAgICAgICAgICBnOiAwLjM5NjA3ODUsXHJcbiAgICAgICAgICAgIGI6IDAuMjQzMTM3MyxcclxuICAgICAgICB9LFxyXG4gICAgfSxcclxuICAgICdDcmFiIFJhdmUnOiB7XHJcbiAgICAgICAgX2NvbG9yTGVmdDoge1xyXG4gICAgICAgICAgICByOiAwLFxyXG4gICAgICAgICAgICBnOiAwLjcxMzAwMDEsXHJcbiAgICAgICAgICAgIGI6IDAuMDc4MDY1NjQsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBfY29sb3JSaWdodDoge1xyXG4gICAgICAgICAgICByOiAwLjA0ODA1OTUyLFxyXG4gICAgICAgICAgICBnOiAwLjUwNjgwOTYsXHJcbiAgICAgICAgICAgIGI6IDAuNzM0LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgX2VudkNvbG9yTGVmdDoge1xyXG4gICAgICAgICAgICByOiAwLjEzNDU2OCxcclxuICAgICAgICAgICAgZzogMC43NTYsXHJcbiAgICAgICAgICAgIGI6IDAuMTU1NzUzMyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIF9lbnZDb2xvclJpZ2h0OiB7XHJcbiAgICAgICAgICAgIHI6IDAuMDU2NDcwNTgsXHJcbiAgICAgICAgICAgIGc6IDAuNjIxMTc2NCxcclxuICAgICAgICAgICAgYjogMC45LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgX29ic3RhY2xlQ29sb3I6IHtcclxuICAgICAgICAgICAgcjogMCxcclxuICAgICAgICAgICAgZzogMC44MTE3NjQ4LFxyXG4gICAgICAgICAgICBiOiAwLjA5MDE5NjA4LFxyXG4gICAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgTm9pcjoge1xyXG4gICAgICAgIF9jb2xvckxlZnQ6IHtcclxuICAgICAgICAgICAgcjogMC4xNzkyNDUzLFxyXG4gICAgICAgICAgICBnOiAwLjE3OTI0NTMsXHJcbiAgICAgICAgICAgIGI6IDAuMTc5MjQ1MyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIF9jb2xvclJpZ2h0OiB7XHJcbiAgICAgICAgICAgIHI6IDAuNTk0MzM5NixcclxuICAgICAgICAgICAgZzogMC41OTQzMzk2LFxyXG4gICAgICAgICAgICBiOiAwLjU5NDMzOTYsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBfZW52Q29sb3JMZWZ0OiB7XHJcbiAgICAgICAgICAgIHI6IDAuNDA1NjYwNCxcclxuICAgICAgICAgICAgZzogMC40MDU2NjA0LFxyXG4gICAgICAgICAgICBiOiAwLjQwNTY2MDQsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBfZW52Q29sb3JSaWdodDoge1xyXG4gICAgICAgICAgICByOiAwLjYwMzc3MzYsXHJcbiAgICAgICAgICAgIGc6IDAuNjAzNzczNixcclxuICAgICAgICAgICAgYjogMC42MDM3NzM2LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgX29ic3RhY2xlQ29sb3I6IHtcclxuICAgICAgICAgICAgcjogMC4yMzU4NDkxLFxyXG4gICAgICAgICAgICBnOiAwLjIzNTg0OTEsXHJcbiAgICAgICAgICAgIGI6IDAuMjM1ODQ5MSxcclxuICAgICAgICB9LFxyXG4gICAgfSxcclxuICAgIFJvY2tldDoge1xyXG4gICAgICAgIF9jb2xvckxlZnQ6IHtcclxuICAgICAgICAgICAgcjogMSxcclxuICAgICAgICAgICAgZzogMC40OTgwMzkyLFxyXG4gICAgICAgICAgICBiOiAwLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgX2NvbG9yUmlnaHQ6IHtcclxuICAgICAgICAgICAgcjogMCxcclxuICAgICAgICAgICAgZzogMC41Mjk0MTE4LFxyXG4gICAgICAgICAgICBiOiAxLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgX2VudkNvbG9yTGVmdDoge1xyXG4gICAgICAgICAgICByOiAwLjksXHJcbiAgICAgICAgICAgIGc6IDAuNDg2NjI3OSxcclxuICAgICAgICAgICAgYjogMC4zMjQ0MTg2LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgX2VudkNvbG9yUmlnaHQ6IHtcclxuICAgICAgICAgICAgcjogMC40LFxyXG4gICAgICAgICAgICBnOiAwLjcxODA3MjQsXHJcbiAgICAgICAgICAgIGI6IDEsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBfb2JzdGFjbGVDb2xvcjoge1xyXG4gICAgICAgICAgICByOiAwLjMxNzY0NzEsXHJcbiAgICAgICAgICAgIGc6IDAuNjExNzY0NyxcclxuICAgICAgICAgICAgYjogMC43MjU0OTAyLFxyXG4gICAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgJ0dyZWVuIERheSc6IHtcclxuICAgICAgICBfY29sb3JMZWZ0OiB7XHJcbiAgICAgICAgICAgIHI6IDAuMjU4ODIzNSxcclxuICAgICAgICAgICAgZzogMC43ODQzMTM4LFxyXG4gICAgICAgICAgICBiOiAwLjAxOTYwNzg0LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgX2NvbG9yUmlnaHQ6IHtcclxuICAgICAgICAgICAgcjogMCxcclxuICAgICAgICAgICAgZzogMC43MTM3MjU1LFxyXG4gICAgICAgICAgICBiOiAwLjY3MDU4ODMsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBfZW52Q29sb3JMZWZ0OiB7XHJcbiAgICAgICAgICAgIHI6IDAsXHJcbiAgICAgICAgICAgIGc6IDAuNzEzNzI1NSxcclxuICAgICAgICAgICAgYjogMC42NzA1ODgzLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgX2VudkNvbG9yUmlnaHQ6IHtcclxuICAgICAgICAgICAgcjogMC4yNTg4MjM1LFxyXG4gICAgICAgICAgICBnOiAwLjc4NDMxMzcsXHJcbiAgICAgICAgICAgIGI6IDAuMDE5NjA3ODQsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBfb2JzdGFjbGVDb2xvcjoge1xyXG4gICAgICAgICAgICByOiAwLFxyXG4gICAgICAgICAgICBnOiAwLjgxMTc2NDgsXHJcbiAgICAgICAgICAgIGI6IDAuMDkwMTk2MDgsXHJcbiAgICAgICAgfSxcclxuICAgIH0sXHJcbiAgICBUaW1iYWxhbmQ6IHtcclxuICAgICAgICBfY29sb3JMZWZ0OiB7XHJcbiAgICAgICAgICAgIHI6IDAuNTAxOTYwOCxcclxuICAgICAgICAgICAgZzogMC41MDE5NjA4LFxyXG4gICAgICAgICAgICBiOiAwLjUwMTk2MDgsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBfY29sb3JSaWdodDoge1xyXG4gICAgICAgICAgICByOiAwLjEsXHJcbiAgICAgICAgICAgIGc6IDAuNTUxNzY0NyxcclxuICAgICAgICAgICAgYjogMSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIF9lbnZDb2xvckxlZnQ6IHtcclxuICAgICAgICAgICAgcjogMC4xLFxyXG4gICAgICAgICAgICBnOiAwLjU1MTc2NDcsXHJcbiAgICAgICAgICAgIGI6IDEsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBfZW52Q29sb3JSaWdodDoge1xyXG4gICAgICAgICAgICByOiAwLjEsXHJcbiAgICAgICAgICAgIGc6IDAuNTUxNzY0NyxcclxuICAgICAgICAgICAgYjogMSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIF9vYnN0YWNsZUNvbG9yOiB7XHJcbiAgICAgICAgICAgIHI6IDAuNSxcclxuICAgICAgICAgICAgZzogMC41LFxyXG4gICAgICAgICAgICBiOiAwLjUsXHJcbiAgICAgICAgfSxcclxuICAgIH0sXHJcbiAgICBGaXRCZWF0OiB7XHJcbiAgICAgICAgX2NvbG9yTGVmdDoge1xyXG4gICAgICAgICAgICByOiAwLjgwMDAwMDEsXHJcbiAgICAgICAgICAgIGc6IDAuNjA3ODQzMixcclxuICAgICAgICAgICAgYjogMC4xNTY4NjI4LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgX2NvbG9yUmlnaHQ6IHtcclxuICAgICAgICAgICAgcjogMC43OTIxNTY5LFxyXG4gICAgICAgICAgICBnOiAwLjE2MDc4NDMsXHJcbiAgICAgICAgICAgIGI6IDAuNjgyMzUzLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgX2VudkNvbG9yTGVmdDoge1xyXG4gICAgICAgICAgICByOiAwLjgsXHJcbiAgICAgICAgICAgIGc6IDAuNTU5NDc3MixcclxuICAgICAgICAgICAgYjogMC41NTk0NzcyLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgX2VudkNvbG9yUmlnaHQ6IHtcclxuICAgICAgICAgICAgcjogMC41NTk0NzcyLFxyXG4gICAgICAgICAgICBnOiAwLjU1OTQ3NzIsXHJcbiAgICAgICAgICAgIGI6IDAuOCxcclxuICAgICAgICB9LFxyXG4gICAgICAgIF9vYnN0YWNsZUNvbG9yOiB7XHJcbiAgICAgICAgICAgIHI6IDAuMjc4NDMxNCxcclxuICAgICAgICAgICAgZzogMC4yNzg0MzE0LFxyXG4gICAgICAgICAgICBiOiAwLjQsXHJcbiAgICAgICAgfSxcclxuICAgIH0sXHJcbiAgICAnTGlua2luIFBhcmsnOiB7XHJcbiAgICAgICAgX2NvbG9yTGVmdDoge1xyXG4gICAgICAgICAgICByOiAwLjY2Mjc0NTEsXHJcbiAgICAgICAgICAgIGc6IDAuMTY0MzYwOCxcclxuICAgICAgICAgICAgYjogMC4xNjkwMTg3LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgX2NvbG9yUmlnaHQ6IHtcclxuICAgICAgICAgICAgcjogMC4zODcwMTk2LFxyXG4gICAgICAgICAgICBnOiAwLjUxNjg5OTcsXHJcbiAgICAgICAgICAgIGI6IDAuNTU2ODYyOCxcclxuICAgICAgICB9LFxyXG4gICAgICAgIF9lbnZDb2xvckxlZnQ6IHtcclxuICAgICAgICAgICAgcjogMC43NTI5NDEyLFxyXG4gICAgICAgICAgICBnOiAwLjY3Mjc1MyxcclxuICAgICAgICAgICAgYjogMC41OTI1NjQ3LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgX2VudkNvbG9yUmlnaHQ6IHtcclxuICAgICAgICAgICAgcjogMC42MjQxMTk3LFxyXG4gICAgICAgICAgICBnOiAwLjY4OTAyODEsXHJcbiAgICAgICAgICAgIGI6IDAuNzA5LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgX2VudkNvbG9yTGVmdEJvb3N0OiB7XHJcbiAgICAgICAgICAgIHI6IDAuOTIyLFxyXG4gICAgICAgICAgICBnOiAwLjU5NTc4ODUsXHJcbiAgICAgICAgICAgIGI6IDAuMjU1Mzk0LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgX2VudkNvbG9yUmlnaHRCb29zdDoge1xyXG4gICAgICAgICAgICByOiAwLjI4MjM1MyxcclxuICAgICAgICAgICAgZzogMC40NTg2Mjc1LFxyXG4gICAgICAgICAgICBiOiAwLjYyMzUyOTQsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBfb2JzdGFjbGVDb2xvcjoge1xyXG4gICAgICAgICAgICByOiAwLjY2Mjc0NTEsXHJcbiAgICAgICAgICAgIGc6IDAuMTY0NzA1OSxcclxuICAgICAgICAgICAgYjogMC4xNzI1NDksXHJcbiAgICAgICAgfSxcclxuICAgIH0sXHJcbiAgICBCVFM6IHtcclxuICAgICAgICBfY29sb3JMZWZ0OiB7XHJcbiAgICAgICAgICAgIHI6IDEsXHJcbiAgICAgICAgICAgIGc6IDAuMDkwMTk2MDcsXHJcbiAgICAgICAgICAgIGI6IDAuNDA1OTc3MSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIF9jb2xvclJpZ2h0OiB7XHJcbiAgICAgICAgICAgIHI6IDAuODAxODg2OCxcclxuICAgICAgICAgICAgZzogMCxcclxuICAgICAgICAgICAgYjogMC43NTE3Njg5LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgX2VudkNvbG9yTGVmdDoge1xyXG4gICAgICAgICAgICByOiAwLjc4NDMxMzcsXHJcbiAgICAgICAgICAgIGc6IDAuMTI1NDkwMixcclxuICAgICAgICAgICAgYjogMC41MDEwNzk3LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgX2VudkNvbG9yUmlnaHQ6IHtcclxuICAgICAgICAgICAgcjogMC42OTQxMTc3LFxyXG4gICAgICAgICAgICBnOiAwLjEyNTQ5MDIsXHJcbiAgICAgICAgICAgIGI6IDAuODY2NjY2NyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIF9lbnZDb2xvckxlZnRCb29zdDoge1xyXG4gICAgICAgICAgICByOiAwLjkwMTk2MDgsXHJcbiAgICAgICAgICAgIGc6IDAuNTQxMTc2NSxcclxuICAgICAgICAgICAgYjogMSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIF9lbnZDb2xvclJpZ2h0Qm9vc3Q6IHtcclxuICAgICAgICAgICAgcjogMC4zNDkwMTk2LFxyXG4gICAgICAgICAgICBnOiAwLjgwNzg0MzEsXHJcbiAgICAgICAgICAgIGI6IDEsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBfb2JzdGFjbGVDb2xvcjoge1xyXG4gICAgICAgICAgICByOiAwLjY2OTgxMTMsXHJcbiAgICAgICAgICAgIGc6IDAuMTgwMDkwOCxcclxuICAgICAgICAgICAgYjogMC41NTI4Mzk5LFxyXG4gICAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgS2FsZWlkb3Njb3BlOiB7XHJcbiAgICAgICAgX2NvbG9yTGVmdDoge1xyXG4gICAgICAgICAgICByOiAwLjY1ODgyMzU1LFxyXG4gICAgICAgICAgICBnOiAwLjEyNTQ5MDIsXHJcbiAgICAgICAgICAgIGI6IDAuMTI1NDkwMixcclxuICAgICAgICB9LFxyXG4gICAgICAgIF9jb2xvclJpZ2h0OiB7XHJcbiAgICAgICAgICAgIHI6IDAuMjgyMzUyOTUsXHJcbiAgICAgICAgICAgIGc6IDAuMjgyMzUyOTUsXHJcbiAgICAgICAgICAgIGI6IDAuMjgyMzUyOTUsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBfZW52Q29sb3JMZWZ0OiB7XHJcbiAgICAgICAgICAgIHI6IDAuNjU4ODIzNTUsXHJcbiAgICAgICAgICAgIGc6IDAuMTI1NDkwMixcclxuICAgICAgICAgICAgYjogMC4xMjU0OTAyLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgX2VudkNvbG9yUmlnaHQ6IHtcclxuICAgICAgICAgICAgcjogMC40NzA1ODgyNCxcclxuICAgICAgICAgICAgZzogMC40NzA1ODgyNCxcclxuICAgICAgICAgICAgYjogMC40NzA1ODgyNCxcclxuICAgICAgICB9LFxyXG4gICAgICAgIF9lbnZDb2xvckxlZnRCb29zdDoge1xyXG4gICAgICAgICAgICByOiAwLjUwMTk2MDgxLFxyXG4gICAgICAgICAgICBnOiAwLFxyXG4gICAgICAgICAgICBiOiAwLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgX2VudkNvbG9yUmlnaHRCb29zdDoge1xyXG4gICAgICAgICAgICByOiAwLjQ5MjQ0NTE3LFxyXG4gICAgICAgICAgICBnOiAwLFxyXG4gICAgICAgICAgICBiOiAwLjUzNzI1NDkzLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgX29ic3RhY2xlQ29sb3I6IHtcclxuICAgICAgICAgICAgcjogMC4yNTA5ODA0MSxcclxuICAgICAgICAgICAgZzogMC4yNTA5ODA0MSxcclxuICAgICAgICAgICAgYjogMC4yNTA5ODA0MSxcclxuICAgICAgICB9LFxyXG4gICAgfSxcclxuICAgIEludGVyc2NvcGU6IHtcclxuICAgICAgICBfY29sb3JMZWZ0OiB7XHJcbiAgICAgICAgICAgIHI6IDAuNzI2NDE1LFxyXG4gICAgICAgICAgICBnOiAwLjYyNjkxLFxyXG4gICAgICAgICAgICBiOiAwLjMxMTgxLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgX2NvbG9yUmlnaHQ6IHtcclxuICAgICAgICAgICAgcjogMC41ODk1NzEsXHJcbiAgICAgICAgICAgIGc6IDAuMjk3ODg4LFxyXG4gICAgICAgICAgICBiOiAwLjcyMyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIF9lbnZDb2xvckxlZnQ6IHtcclxuICAgICAgICAgICAgcjogMC43MjQyNTQsXHJcbiAgICAgICAgICAgIGc6IDAuMzE5ODA0LFxyXG4gICAgICAgICAgICBiOiAwLjkxMzcyNSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIF9lbnZDb2xvclJpZ2h0OiB7XHJcbiAgICAgICAgICAgIHI6IDAuNzY0NzA2LFxyXG4gICAgICAgICAgICBnOiAwLjc1ODk3MSxcclxuICAgICAgICAgICAgYjogMC45MTM3MjUsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBfZW52Q29sb3JMZWZ0Qm9vc3Q6IHtcclxuICAgICAgICAgICAgcjogMC43OTI0NTMsXHJcbiAgICAgICAgICAgIGc6IDAuNDI5Njg2LFxyXG4gICAgICAgICAgICBiOiAwLjQyOTg2OCxcclxuICAgICAgICB9LFxyXG4gICAgICAgIF9lbnZDb2xvclJpZ2h0Qm9vc3Q6IHtcclxuICAgICAgICAgICAgcjogMC43MDM4LFxyXG4gICAgICAgICAgICBnOiAwLjcxNTc0NSxcclxuICAgICAgICAgICAgYjogMC43NjUsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBfb2JzdGFjbGVDb2xvcjoge1xyXG4gICAgICAgICAgICByOiAwLjU4ODIzNSxcclxuICAgICAgICAgICAgZzogMC4yOTgwMzksXHJcbiAgICAgICAgICAgIGI6IDAuNzIxNTY5LFxyXG4gICAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgU2tyaWxsZXg6IHtcclxuICAgICAgICBfY29sb3JMZWZ0OiB7XHJcbiAgICAgICAgICAgIHI6IDAuNjk4MDM5MjMsXHJcbiAgICAgICAgICAgIGc6IDAuMTQxMTc2NDgsXHJcbiAgICAgICAgICAgIGI6IDAuMzY4NjI3NDYsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBfY29sb3JSaWdodDoge1xyXG4gICAgICAgICAgICByOiAwLjMyOTMzMzM0LFxyXG4gICAgICAgICAgICBnOiAwLjMyMjk5OTk4LFxyXG4gICAgICAgICAgICBiOiAwLjM4LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgX2VudkNvbG9yTGVmdDoge1xyXG4gICAgICAgICAgICByOiAwLjgwMDAwMDAxLFxyXG4gICAgICAgICAgICBnOiAwLjI4MDAwMDAzLFxyXG4gICAgICAgICAgICBiOiAwLjU4NTk0NDg5LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgX2VudkNvbG9yUmlnaHQ6IHtcclxuICAgICAgICAgICAgcjogMC4wNjUyNTgwNyxcclxuICAgICAgICAgICAgZzogMC41NzgwMDAwMSxcclxuICAgICAgICAgICAgYjogMC41Njg2Nzc0MyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIF9lbnZDb2xvckxlZnRCb29zdDoge1xyXG4gICAgICAgICAgICByOiAwLjgxMTc2NDc4LFxyXG4gICAgICAgICAgICBnOiAwLjMwNTg4MjM2LFxyXG4gICAgICAgICAgICBiOiAwLjMwNTg4MjM2LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgX2VudkNvbG9yUmlnaHRCb29zdDoge1xyXG4gICAgICAgICAgICByOiAwLjI3ODQzMTM5LFxyXG4gICAgICAgICAgICBnOiAwLjgwMDAwMDAxLFxyXG4gICAgICAgICAgICBiOiAwLjQ0NTk3NjMyLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgX29ic3RhY2xlQ29sb3I6IHtcclxuICAgICAgICAgICAgcjogMC4xNTY4NjI3NSxcclxuICAgICAgICAgICAgZzogMC42MDM5MjE1OSxcclxuICAgICAgICAgICAgYjogMC42MDM5MjE1OSxcclxuICAgICAgICB9LFxyXG4gICAgfSxcclxuICAgICdCaWxsaWUgRWlsaXNoJzoge1xyXG4gICAgICAgIF9jb2xvckxlZnQ6IHtcclxuICAgICAgICAgICAgcjogMC44MDAwMDAwMSxcclxuICAgICAgICAgICAgZzogMC42NDQ4MTkzMixcclxuICAgICAgICAgICAgYjogMC40MzIwMDAwMSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIF9jb2xvclJpZ2h0OiB7XHJcbiAgICAgICAgICAgIHI6IDAuNTQ4MDg1MDksXHJcbiAgICAgICAgICAgIGc6IDAuNjEyNzY1OTEsXHJcbiAgICAgICAgICAgIGI6IDAuNjM5OTk5OTksXHJcbiAgICAgICAgfSxcclxuICAgICAgICBfZW52Q29sb3JMZWZ0OiB7XHJcbiAgICAgICAgICAgIHI6IDAuODE5NjA3ODUsXHJcbiAgICAgICAgICAgIGc6IDAuNDQyLFxyXG4gICAgICAgICAgICBiOiAwLjE4NCxcclxuICAgICAgICB9LFxyXG4gICAgICAgIF9lbnZDb2xvclJpZ2h0OiB7XHJcbiAgICAgICAgICAgIHI6IDAuOTQxMTc2NDcsXHJcbiAgICAgICAgICAgIGc6IDAuNzA2NzcwOTYsXHJcbiAgICAgICAgICAgIGI6IDAuNTY0NzA1OTEsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBfb2JzdGFjbGVDb2xvcjoge1xyXG4gICAgICAgICAgICByOiAwLjcxMzI1MzE0LFxyXG4gICAgICAgICAgICBnOiAwLjU2MTQwOTc3LFxyXG4gICAgICAgICAgICBiOiAwLjc4MzAxODg5LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgX2VudkNvbG9yTGVmdEJvb3N0OiB7XHJcbiAgICAgICAgICAgIHI6IDAuODAwMDAwMDEsXHJcbiAgICAgICAgICAgIGc6IDAsXHJcbiAgICAgICAgICAgIGI6IDAsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBfZW52Q29sb3JSaWdodEJvb3N0OiB7XHJcbiAgICAgICAgICAgIHI6IDAuNTU2ODYyNzcsXHJcbiAgICAgICAgICAgIGc6IDAuNzAxOTYwOCxcclxuICAgICAgICAgICAgYjogMC43NzY0NzA2NixcclxuICAgICAgICB9LFxyXG4gICAgfSxcclxuICAgICdHbGFzcyBEZXNlcnQnOiB7XHJcbiAgICAgICAgX2NvbG9yTGVmdDoge1xyXG4gICAgICAgICAgICByOiAwLjY3OTI0NTMsXHJcbiAgICAgICAgICAgIGc6IDAuNTcxMjYyOCxcclxuICAgICAgICAgICAgYjogMCxcclxuICAgICAgICB9LFxyXG4gICAgICAgIF9jb2xvclJpZ2h0OiB7XHJcbiAgICAgICAgICAgIHI6IDAuNzA3NTQ3MixcclxuICAgICAgICAgICAgZzogMCxcclxuICAgICAgICAgICAgYjogMC41MzY0NDExLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgX2VudkNvbG9yTGVmdDoge1xyXG4gICAgICAgICAgICByOiAwLjMyMjIyMjE3LFxyXG4gICAgICAgICAgICBnOiAwLjYxMTExMTEsXHJcbiAgICAgICAgICAgIGI6IDAuNzUsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBfZW52Q29sb3JSaWdodDoge1xyXG4gICAgICAgICAgICByOiAwLjAzODQ0NzgzLFxyXG4gICAgICAgICAgICBnOiAwLjYyMjM5OTc1LFxyXG4gICAgICAgICAgICBiOiAwLjkwNTY2MDM5LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgX29ic3RhY2xlQ29sb3I6IHtcclxuICAgICAgICAgICAgcjogMC4wNjE2NzY3NixcclxuICAgICAgICAgICAgZzogMC4yODY5NTEzLFxyXG4gICAgICAgICAgICBiOiAwLjM5NjIyNjQsXHJcbiAgICAgICAgfSxcclxuICAgIH0sXHJcbiAgICAnTmV3IFdvcmxkJzoge1xyXG4gICAgICAgIF9jb2xvckxlZnQ6IHtcclxuICAgICAgICAgICAgcjogMC42MjUsXHJcbiAgICAgICAgICAgIGc6IDAuNjI1LFxyXG4gICAgICAgICAgICBiOiAwLjYyNSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIF9jb2xvclJpZ2h0OiB7XHJcbiAgICAgICAgICAgIHI6IDAuMzQzNzUsXHJcbiAgICAgICAgICAgIGc6IDAuNDM3NSxcclxuICAgICAgICAgICAgYjogMC42MjUsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBfZW52Q29sb3JMZWZ0OiB7XHJcbiAgICAgICAgICAgIHI6IDAuMjE4NzUsXHJcbiAgICAgICAgICAgIGc6IDAuMjgxMjUsXHJcbiAgICAgICAgICAgIGI6IDAuNDY4NzUsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBfZW52Q29sb3JSaWdodDoge1xyXG4gICAgICAgICAgICByOiAwLjUsXHJcbiAgICAgICAgICAgIGc6IDAuNTYyNSxcclxuICAgICAgICAgICAgYjogMC43ODEyNSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIF9vYnN0YWNsZUNvbG9yOiB7XHJcbiAgICAgICAgICAgIHI6IDAuNjI1LFxyXG4gICAgICAgICAgICBnOiAwLjU5Mzc1LFxyXG4gICAgICAgICAgICBiOiAwLjgxMjUsXHJcbiAgICAgICAgfSxcclxuICAgIH0sXHJcbiAgICAnR2lybHkgQ3VwaWQnOiB7XHJcbiAgICAgICAgX2NvbG9yTGVmdDoge1xyXG4gICAgICAgICAgICByOiAxLFxyXG4gICAgICAgICAgICBnOiAwLjE4NzUsXHJcbiAgICAgICAgICAgIGI6IDAuMTg3NSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIF9jb2xvclJpZ2h0OiB7XHJcbiAgICAgICAgICAgIHI6IDAuMzc1LFxyXG4gICAgICAgICAgICBnOiAwLjU2MjUsXHJcbiAgICAgICAgICAgIGI6IDAuODc1LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgX2VudkNvbG9yTGVmdDoge1xyXG4gICAgICAgICAgICByOiAwLjM3NSxcclxuICAgICAgICAgICAgZzogMC4zNzUsXHJcbiAgICAgICAgICAgIGI6IDAuMzc1LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgX2VudkNvbG9yUmlnaHQ6IHtcclxuICAgICAgICAgICAgcjogMC42MjUsXHJcbiAgICAgICAgICAgIGc6IDAuNzUsXHJcbiAgICAgICAgICAgIGI6IDAuODc1LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgX29ic3RhY2xlQ29sb3I6IHtcclxuICAgICAgICAgICAgcjogMC43NSxcclxuICAgICAgICAgICAgZzogMC43NSxcclxuICAgICAgICAgICAgYjogMC43NSxcclxuICAgICAgICB9LFxyXG4gICAgfSxcclxuICAgICdULlIuWSBSZXZvbHV0aW9uJzoge1xyXG4gICAgICAgIF9jb2xvckxlZnQ6IHtcclxuICAgICAgICAgICAgcjogMSxcclxuICAgICAgICAgICAgZzogMCxcclxuICAgICAgICAgICAgYjogMC4zNzUsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBfY29sb3JSaWdodDoge1xyXG4gICAgICAgICAgICByOiAwLjEyNSxcclxuICAgICAgICAgICAgZzogMC4zNzUsXHJcbiAgICAgICAgICAgIGI6IDAuOTA2MjUsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBfZW52Q29sb3JMZWZ0OiB7XHJcbiAgICAgICAgICAgIHI6IDEsXHJcbiAgICAgICAgICAgIGc6IDAuMTI1LFxyXG4gICAgICAgICAgICBiOiAwLjM3NSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIF9lbnZDb2xvclJpZ2h0OiB7XHJcbiAgICAgICAgICAgIHI6IDAuMTg3NSxcclxuICAgICAgICAgICAgZzogMC41NjI1LFxyXG4gICAgICAgICAgICBiOiAxLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgX29ic3RhY2xlQ29sb3I6IHtcclxuICAgICAgICAgICAgcjogMC42MjUsXHJcbiAgICAgICAgICAgIGc6IDAuNjI1LFxyXG4gICAgICAgICAgICBiOiAwLjYyNSxcclxuICAgICAgICB9LFxyXG4gICAgfSxcclxuICAgIEZyaWdodG1hcmU6IHtcclxuICAgICAgICBfY29sb3JMZWZ0OiB7XHJcbiAgICAgICAgICAgIHI6IDAuODEyNSxcclxuICAgICAgICAgICAgZzogMC4xMjUsXHJcbiAgICAgICAgICAgIGI6IDAuMTI1LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgX2NvbG9yUmlnaHQ6IHtcclxuICAgICAgICAgICAgcjogMC42MjUsXHJcbiAgICAgICAgICAgIGc6IDAuNjI1LFxyXG4gICAgICAgICAgICBiOiAwLjYyNSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIF9lbnZDb2xvckxlZnQ6IHtcclxuICAgICAgICAgICAgcjogMC42MjUsXHJcbiAgICAgICAgICAgIGc6IDAuMDMyMTUsXHJcbiAgICAgICAgICAgIGI6IDAuMDMyMTUsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBfZW52Q29sb3JSaWdodDoge1xyXG4gICAgICAgICAgICByOiAwLjcxODc1LFxyXG4gICAgICAgICAgICBnOiAwLjcxODc1LFxyXG4gICAgICAgICAgICBiOiAwLjcxODc1LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgX29ic3RhY2xlQ29sb3I6IHtcclxuICAgICAgICAgICAgcjogMC4xODc1LFxyXG4gICAgICAgICAgICBnOiAwLjE4NzUsXHJcbiAgICAgICAgICAgIGI6IDAuMTg3NSxcclxuICAgICAgICB9LFxyXG4gICAgfSxcclxuICAgICdBenVyZSBSYWluZHJvcCc6IHtcclxuICAgICAgICBfY29sb3JMZWZ0OiB7XHJcbiAgICAgICAgICAgIHI6IDAuODEyNSxcclxuICAgICAgICAgICAgZzogMC4xMjUsXHJcbiAgICAgICAgICAgIGI6IDAuMTI1LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgX2NvbG9yUmlnaHQ6IHtcclxuICAgICAgICAgICAgcjogMC4wNjI1LFxyXG4gICAgICAgICAgICBnOiAwLjUsXHJcbiAgICAgICAgICAgIGI6IDAuODc1LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgX2VudkNvbG9yTGVmdDoge1xyXG4gICAgICAgICAgICByOiAwLjU2MjUsXHJcbiAgICAgICAgICAgIGc6IDAuNTYyNSxcclxuICAgICAgICAgICAgYjogMC41NjI1LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgX2VudkNvbG9yUmlnaHQ6IHtcclxuICAgICAgICAgICAgcjogMC4wNjI1LFxyXG4gICAgICAgICAgICBnOiAwLjUsXHJcbiAgICAgICAgICAgIGI6IDAuODc1LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgX29ic3RhY2xlQ29sb3I6IHtcclxuICAgICAgICAgICAgcjogMC43NSxcclxuICAgICAgICAgICAgZzogMC4yNSxcclxuICAgICAgICAgICAgYjogMC43NSxcclxuICAgICAgICB9LFxyXG4gICAgfSxcclxuICAgIFZFTlRFTjoge1xyXG4gICAgICAgIF9jb2xvckxlZnQ6IHtcclxuICAgICAgICAgICAgcjogMC44MTI1LFxyXG4gICAgICAgICAgICBnOiAwLjYyNSxcclxuICAgICAgICAgICAgYjogMC4zNzUsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBfY29sb3JSaWdodDoge1xyXG4gICAgICAgICAgICByOiAwLjYyNSxcclxuICAgICAgICAgICAgZzogMC4zNzUsXHJcbiAgICAgICAgICAgIGI6IDAuODc1LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgX2VudkNvbG9yTGVmdDoge1xyXG4gICAgICAgICAgICByOiAwLjc4MTI1LFxyXG4gICAgICAgICAgICBnOiAwLjYyNSxcclxuICAgICAgICAgICAgYjogMC4xODc1LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgX2VudkNvbG9yUmlnaHQ6IHtcclxuICAgICAgICAgICAgcjogMC4wOTM3NSxcclxuICAgICAgICAgICAgZzogMC40Mzc1LFxyXG4gICAgICAgICAgICBiOiAwLjY4NzUsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBfZW52Q29sb3JMZWZ0Qm9vc3Q6IHtcclxuICAgICAgICAgICAgcjogMC44NzUsXHJcbiAgICAgICAgICAgIGc6IDAuMDYyNSxcclxuICAgICAgICAgICAgYjogMC4zNzUsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBfZW52Q29sb3JSaWdodEJvb3N0OiB7XHJcbiAgICAgICAgICAgIHI6IDAuMTg3NSxcclxuICAgICAgICAgICAgZzogMC41LFxyXG4gICAgICAgICAgICBiOiAwLjg3NSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIF9vYnN0YWNsZUNvbG9yOiB7XHJcbiAgICAgICAgICAgIHI6IDAuMTI1LFxyXG4gICAgICAgICAgICBnOiAwLjI1LFxyXG4gICAgICAgICAgICBiOiAwLjQzNzUsXHJcbiAgICAgICAgfSxcclxuICAgIH0sXHJcbiAgICAnVW5jb25zY2lvdXMgUmVxdWllbSc6IHtcclxuICAgICAgICBfY29sb3JMZWZ0OiB7IHI6IDAuNDM4LCBnOiAwLjQzOCwgYjogMC40MzggfSxcclxuICAgICAgICBfY29sb3JSaWdodDogeyByOiAwLjM4OCwgZzogMC42MiwgYjogMC4xNTcgfSxcclxuICAgICAgICBfZW52Q29sb3JMZWZ0OiB7IHI6IDAuODUsIGc6IDAuMDg1LCBiOiAwLjA4NSB9LFxyXG4gICAgICAgIF9lbnZDb2xvclJpZ2h0OiB7IHI6IDAuNjA0LCBnOiAwLjYwNCwgYjogMC42MDQgfSxcclxuICAgICAgICBfZW52Q29sb3JMZWZ0Qm9vc3Q6IHsgcjogMC45MjIsIGc6IDAuNTk2LCBiOiAwLjI1NSB9LFxyXG4gICAgICAgIF9lbnZDb2xvclJpZ2h0Qm9vc3Q6IHsgcjogMC4yNTksIGc6IDAuNzg0LCBiOiAwLjAyIH0sXHJcbiAgICAgICAgX29ic3RhY2xlQ29sb3I6IHsgcjogMC41LCBnOiAwLjUsIGI6IDAuNSB9LFxyXG4gICAgfSxcclxufTtcclxuIiwidmFyIE5vdGVKdW1wU3BlZWQgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBOb3RlSnVtcFNwZWVkKGJwbSwgbmpzLCBzZG0pIHtcclxuICAgICAgICBpZiAobmpzID09PSB2b2lkIDApIHsgbmpzID0gMTA7IH1cclxuICAgICAgICBpZiAoc2RtID09PSB2b2lkIDApIHsgc2RtID0gMDsgfVxyXG4gICAgICAgIHRoaXMuX2hqZFN0YXJ0ID0gNDtcclxuICAgICAgICB0aGlzLl9oamRNaW4gPSAxO1xyXG4gICAgICAgIHRoaXMuX2JwbSA9IGJwbTtcclxuICAgICAgICB0aGlzLl9uanMgPSBuanM7XHJcbiAgICAgICAgdGhpcy5fc2RtID0gc2RtO1xyXG4gICAgICAgIHRoaXMudXBkYXRlKCk7XHJcbiAgICB9XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoTm90ZUp1bXBTcGVlZC5wcm90b3R5cGUsIFwibmpzXCIsIHtcclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX25qcztcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNldDogZnVuY3Rpb24gKHZhbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9uanMgPSB2YWw7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlKCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgIH0pO1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KE5vdGVKdW1wU3BlZWQucHJvdG90eXBlLCBcIm9mZnNldFwiLCB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zZG07XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWwpIHtcclxuICAgICAgICAgICAgdGhpcy5fc2RtID0gdmFsO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZSgpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShOb3RlSnVtcFNwZWVkLnByb3RvdHlwZSwgXCJoamRcIiwge1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5faGpkO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShOb3RlSnVtcFNwZWVkLnByb3RvdHlwZSwgXCJoamRNaW5cIiwge1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5faGpkTWluO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShOb3RlSnVtcFNwZWVkLnByb3RvdHlwZSwgXCJyZWFjdFRpbWVcIiwge1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcmVhY3Rpb25UaW1lO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShOb3RlSnVtcFNwZWVkLnByb3RvdHlwZSwgXCJqZFwiLCB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9qZDtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoTm90ZUp1bXBTcGVlZC5wcm90b3R5cGUsIFwiamRNaW5cIiwge1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5famRNaW47XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgIH0pO1xyXG4gICAgTm90ZUp1bXBTcGVlZC5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuX2hqZCA9IHRoaXMuY2FsY0hhbGZKdW1wRHVyYXRpb24oKTtcclxuICAgICAgICB0aGlzLl9qZCA9IHRoaXMuY2FsY0p1bXBEaXN0YW5jZSgpO1xyXG4gICAgICAgIHRoaXMuX2pkTWluID0gdGhpcy5jYWxjSnVtcERpc3RhbmNlKHRoaXMuX2hqZE1pbik7XHJcbiAgICAgICAgdGhpcy5fcmVhY3Rpb25UaW1lID0gdGhpcy5jYWxjUmVhY3Rpb25UaW1lSEpEKCk7XHJcbiAgICB9O1xyXG4gICAgTm90ZUp1bXBTcGVlZC5wcm90b3R5cGUuY2FsY0hhbGZKdW1wRHVyYXRpb25SYXcgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIG1heEhhbGZKdW1wID0gMTg7XHJcbiAgICAgICAgdmFyIG5vdGVKdW1wTW92ZW1lbnRTcGVlZCA9ICh0aGlzLl9uanMgKiB0aGlzLl9uanMpIC8gdGhpcy5fbmpzO1xyXG4gICAgICAgIHZhciBudW0gPSA2MCAvIHRoaXMuX2JwbS52YWx1ZTtcclxuICAgICAgICB2YXIgaGpkID0gdGhpcy5faGpkU3RhcnQ7XHJcbiAgICAgICAgd2hpbGUgKG5vdGVKdW1wTW92ZW1lbnRTcGVlZCAqIG51bSAqIGhqZCA+IG1heEhhbGZKdW1wKSB7XHJcbiAgICAgICAgICAgIGhqZCAvPSAyO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaGpkIDwgdGhpcy5faGpkTWluKSB7XHJcbiAgICAgICAgICAgIGhqZCA9IDE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBoamQ7XHJcbiAgICB9O1xyXG4gICAgTm90ZUp1bXBTcGVlZC5wcm90b3R5cGUuY2FsY0hhbGZKdW1wRHVyYXRpb24gPSBmdW5jdGlvbiAob2Zmc2V0KSB7XHJcbiAgICAgICAgaWYgKG9mZnNldCA9PT0gdm9pZCAwKSB7IG9mZnNldCA9IHRoaXMub2Zmc2V0OyB9XHJcbiAgICAgICAgcmV0dXJuIE1hdGgubWF4KHRoaXMuY2FsY0hhbGZKdW1wRHVyYXRpb25SYXcoKSArIG9mZnNldCwgMSk7XHJcbiAgICB9O1xyXG4gICAgTm90ZUp1bXBTcGVlZC5wcm90b3R5cGUuY2FsY0hhbGZKdW1wRHVyYXRpb25Gcm9tSkQgPSBmdW5jdGlvbiAoamQpIHtcclxuICAgICAgICBpZiAoamQgPT09IHZvaWQgMCkgeyBqZCA9IHRoaXMuY2FsY0p1bXBEaXN0YW5jZSgpOyB9XHJcbiAgICAgICAgcmV0dXJuIGpkIC8gKCg2MCAvIHRoaXMuX2JwbS52YWx1ZSkgKiB0aGlzLl9uanMgKiAyKTtcclxuICAgIH07XHJcbiAgICBOb3RlSnVtcFNwZWVkLnByb3RvdHlwZS5jYWxjSGFsZkp1bXBEdXJhdGlvbkZyb21SVCA9IGZ1bmN0aW9uIChydCkge1xyXG4gICAgICAgIGlmIChydCA9PT0gdm9pZCAwKSB7IHJ0ID0gdGhpcy5jYWxjUmVhY3Rpb25UaW1lSEpEKCk7IH1cclxuICAgICAgICByZXR1cm4gcnQgLyAoNjAgLyB0aGlzLl9icG0udmFsdWUpO1xyXG4gICAgfTtcclxuICAgIE5vdGVKdW1wU3BlZWQucHJvdG90eXBlLmNhbGNKdW1wRGlzdGFuY2UgPSBmdW5jdGlvbiAoaGpkKSB7XHJcbiAgICAgICAgaWYgKGhqZCA9PT0gdm9pZCAwKSB7IGhqZCA9IHRoaXMuY2FsY0hhbGZKdW1wRHVyYXRpb24oKTsgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9uanMgKiAoNjAgLyB0aGlzLl9icG0udmFsdWUpICogaGpkICogMjtcclxuICAgIH07XHJcbiAgICBOb3RlSnVtcFNwZWVkLnByb3RvdHlwZS5jYWxjSnVtcERpc3RhbmNlT3B0aW1hbEhpZ2ggPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIDE4ICogTWF0aC5wb3coKDEgLyAxLjA3KSwgdGhpcy5fbmpzKSArIDE4O1xyXG4gICAgfTtcclxuICAgIE5vdGVKdW1wU3BlZWQucHJvdG90eXBlLmNhbGNKdW1wRGlzdGFuY2VPcHRpbWFsTG93ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiAtKDE4IC8gKHRoaXMuX25qcyArIDEpKSArIDE4O1xyXG4gICAgfTtcclxuICAgIE5vdGVKdW1wU3BlZWQucHJvdG90eXBlLmNhbGNSZWFjdGlvblRpbWVKRCA9IGZ1bmN0aW9uIChqZCkge1xyXG4gICAgICAgIGlmIChqZCA9PT0gdm9pZCAwKSB7IGpkID0gdGhpcy5jYWxjSnVtcERpc3RhbmNlKCk7IH1cclxuICAgICAgICByZXR1cm4gamQgLyAoMiAqIHRoaXMuX25qcyk7XHJcbiAgICB9O1xyXG4gICAgTm90ZUp1bXBTcGVlZC5wcm90b3R5cGUuY2FsY1JlYWN0aW9uVGltZUhKRCA9IGZ1bmN0aW9uIChoamQpIHtcclxuICAgICAgICBpZiAoaGpkID09PSB2b2lkIDApIHsgaGpkID0gdGhpcy5jYWxjSGFsZkp1bXBEdXJhdGlvbigpOyB9XHJcbiAgICAgICAgcmV0dXJuICg2MCAvIHRoaXMuX2JwbS52YWx1ZSkgKiBoamQ7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIE5vdGVKdW1wU3BlZWQ7XHJcbn0oKSk7XHJcbmV4cG9ydCBkZWZhdWx0IE5vdGVKdW1wU3BlZWQ7XHJcbiIsImV4cG9ydCB2YXIgcHBDdXJ2ZSA9IHtcclxuICAgIHNjb3Jlc2FiZXI6IFtcclxuICAgICAgICBbMS4xNCwgMS4yXSxcclxuICAgICAgICBbMS4xLCAxLjE1XSxcclxuICAgICAgICBbMSwgMS4xXSxcclxuICAgICAgICBbMC45NSwgMS4wMzZdLFxyXG4gICAgICAgIFswLjk0LCAwLjk3NF0sXHJcbiAgICAgICAgWzAuOTMsIDAuOTJdLFxyXG4gICAgICAgIFswLjkyLCAwLjg4NV0sXHJcbiAgICAgICAgWzAuOTEsIDAuODVdLFxyXG4gICAgICAgIFswLjksIDAuODE1XSxcclxuICAgICAgICBbMC44OCwgMC43NjZdLFxyXG4gICAgICAgIFswLjg2LCAwLjcyXSxcclxuICAgICAgICBbMC44NDUsIDAuNjNdLFxyXG4gICAgICAgIFswLjgyLCAwLjU2XSxcclxuICAgICAgICBbMC43NSwgMC40MjVdLFxyXG4gICAgICAgIFswLjY5LCAwLjI1XSxcclxuICAgICAgICBbMC41LCAwLjE1XSxcclxuICAgICAgICBbMC40LCAwLjA4XSxcclxuICAgICAgICBbMCwgMF0sXHJcbiAgICBdLFxyXG4gICAgZXhwb25lbnRpYWw6IFtcclxuICAgICAgICBbMSwgOF0sXHJcbiAgICAgICAgWzAuOTksIDRdLFxyXG4gICAgICAgIFswLjk4LCAyXSxcclxuICAgICAgICBbMC45NywgMS41XSxcclxuICAgICAgICBbMC45NiwgMS4xXSxcclxuICAgICAgICBbMC45NSwgMS4wMzZdLFxyXG4gICAgICAgIFswLjk0LCAwLjk3NF0sXHJcbiAgICAgICAgWzAuOTMsIDAuOTJdLFxyXG4gICAgICAgIFswLjkyLCAwLjg4NV0sXHJcbiAgICAgICAgWzAuOTEsIDAuODVdLFxyXG4gICAgICAgIFswLjksIDAuODE1XSxcclxuICAgICAgICBbMC44OCwgMC43NjZdLFxyXG4gICAgICAgIFswLjg2LCAwLjcyXSxcclxuICAgICAgICBbMC44NDUsIDAuNjNdLFxyXG4gICAgICAgIFswLjgyLCAwLjU2XSxcclxuICAgICAgICBbMC43NSwgMC40MjVdLFxyXG4gICAgICAgIFswLjY5LCAwLjI1XSxcclxuICAgICAgICBbMC41LCAwLjE1XSxcclxuICAgICAgICBbMC40LCAwLjA4XSxcclxuICAgICAgICBbMCwgMF0sXHJcbiAgICBdLFxyXG59O1xyXG4iLCJleHBvcnQgdmFyIG5vdGVJbWFnZSA9IHtcclxuICAgIDA6ICdub3Rlci5zdmcnLFxyXG4gICAgMTogJ25vdGViLnN2ZycsXHJcbiAgICAyOiAnYm9tYi5wbmcnLFxyXG4gICAgMzogJ25vdGVyZC5zdmcnLFxyXG4gICAgNDogJ25vdGViZC5zdmcnLFxyXG4gICAgYmxhbms6ICdibGFuay5wbmcnLFxyXG59O1xyXG5leHBvcnQgdmFyIG5vdGVSb3RhdGlvbiA9IHtcclxuICAgIDA6ICcnLFxyXG4gICAgMTogJ2RlZzE4MCcsXHJcbiAgICAyOiAnZGVnMjcwJyxcclxuICAgIDM6ICdkZWc5MCcsXHJcbiAgICA0OiAnZGVnMzE1JyxcclxuICAgIDU6ICdkZWc0NScsXHJcbiAgICA2OiAnZGVnMjI1JyxcclxuICAgIDc6ICdkZWcxMzUnLFxyXG4gICAgODogJycsXHJcbn07XHJcbnZhciBSYW5kb21QYXR0ZXJuR2VuZXJhdG9yID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gUmFuZG9tUGF0dGVybkdlbmVyYXRvcihyb3csIGNvbHVtbikge1xyXG4gICAgICAgIHRoaXMuX21heEluZGV4ID0gY29sdW1uO1xyXG4gICAgICAgIHRoaXMuX21heExheWVyID0gcm93O1xyXG4gICAgfVxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFJhbmRvbVBhdHRlcm5HZW5lcmF0b3IucHJvdG90eXBlLCBcImNvbHVtblwiLCB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9tYXhJbmRleDtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNldDogZnVuY3Rpb24gKHZhbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9tYXhJbmRleCA9IHZhbDtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoUmFuZG9tUGF0dGVybkdlbmVyYXRvci5wcm90b3R5cGUsIFwicm93XCIsIHtcclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX21heExheWVyO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX21heExheWVyID0gdmFsO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShSYW5kb21QYXR0ZXJuR2VuZXJhdG9yLnByb3RvdHlwZSwgXCJsaW1pdFwiLCB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9saW1pdDtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNldDogZnVuY3Rpb24gKHZhbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9saW1pdCA9IHZhbDtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoUmFuZG9tUGF0dGVybkdlbmVyYXRvci5wcm90b3R5cGUsIFwidG90YWxcIiwge1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdG90YWw7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWwpIHtcclxuICAgICAgICAgICAgdGhpcy5fdG90YWwgPSB2YWw7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgIH0pO1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFJhbmRvbVBhdHRlcm5HZW5lcmF0b3IucHJvdG90eXBlLCBcIm5vdGVSZWRcIiwge1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbm90ZVJlZDtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNldDogZnVuY3Rpb24gKHZhbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9ub3RlUmVkID0gdmFsO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShSYW5kb21QYXR0ZXJuR2VuZXJhdG9yLnByb3RvdHlwZSwgXCJub3RlQmx1ZVwiLCB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9ub3RlQmx1ZTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNldDogZnVuY3Rpb24gKHZhbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9ub3RlQmx1ZSA9IHZhbDtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoUmFuZG9tUGF0dGVybkdlbmVyYXRvci5wcm90b3R5cGUsIFwibm90ZUJvbWJcIiwge1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbm90ZUJvbWI7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWwpIHtcclxuICAgICAgICAgICAgdGhpcy5fbm90ZUJvbWIgPSB2YWw7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgIH0pO1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFJhbmRvbVBhdHRlcm5HZW5lcmF0b3IucHJvdG90eXBlLCBcIm5vRG90XCIsIHtcclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX25vRG90O1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX25vRG90ID0gdmFsO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShSYW5kb21QYXR0ZXJuR2VuZXJhdG9yLnByb3RvdHlwZSwgXCJwYXJpdHlcIiwge1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcGFyaXR5O1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3Bhcml0eSA9IHZhbDtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoUmFuZG9tUGF0dGVybkdlbmVyYXRvci5wcm90b3R5cGUsIFwicGFyaXR5RXh0ZW5kXCIsIHtcclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3Bhcml0eUV4dGVuZDtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNldDogZnVuY3Rpb24gKHZhbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9wYXJpdHlFeHRlbmQgPSB2YWw7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcclxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcclxuICAgIH0pO1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFJhbmRvbVBhdHRlcm5HZW5lcmF0b3IucHJvdG90eXBlLCBcInBhcml0eVJlZFwiLCB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9wYXJpdHlSZWQ7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWwpIHtcclxuICAgICAgICAgICAgdGhpcy5fcGFyaXR5UmVkID0gdmFsO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShSYW5kb21QYXR0ZXJuR2VuZXJhdG9yLnByb3RvdHlwZSwgXCJwYXJpdHlCbHVlXCIsIHtcclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3Bhcml0eUJsdWU7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWwpIHtcclxuICAgICAgICAgICAgdGhpcy5fcGFyaXR5Qmx1ZSA9IHZhbDtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICBSYW5kb21QYXR0ZXJuR2VuZXJhdG9yLnByb3RvdHlwZS5jcmVhdGVWYWxpZFBhcml0eSA9IGZ1bmN0aW9uIChleHQsIGRvdCkge1xyXG4gICAgICAgIGlmIChleHQgPT09IHZvaWQgMCkgeyBleHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKGRvdCA9PT0gdm9pZCAwKSB7IGRvdCA9IGZhbHNlOyB9XHJcbiAgICAgICAgdmFyIHBhcml0eVJvdGF0aW9uID0ge1xyXG4gICAgICAgICAgICAwOiB7XHJcbiAgICAgICAgICAgICAgICAwOiBbNiwgMSwgN10sXHJcbiAgICAgICAgICAgICAgICAxOiBbNCwgMCwgNV0sXHJcbiAgICAgICAgICAgICAgICAyOiBbMCwgMSwgMiwgMywgNCwgNSwgNiwgNywgOF0sXHJcbiAgICAgICAgICAgICAgICAzOiBbMCwgMSwgMiwgMywgNCwgNSwgNiwgNywgOF0sXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIDE6IHtcclxuICAgICAgICAgICAgICAgIDA6IFs2LCAxLCA3XSxcclxuICAgICAgICAgICAgICAgIDE6IFs0LCAwLCA1XSxcclxuICAgICAgICAgICAgICAgIDI6IFswLCAxLCAyLCAzLCA0LCA1LCA2LCA3LCA4XSxcclxuICAgICAgICAgICAgICAgIDM6IFswLCAxLCAyLCAzLCA0LCA1LCA2LCA3LCA4XSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9O1xyXG4gICAgICAgIGlmIChkb3QpIHtcclxuICAgICAgICAgICAgcGFyaXR5Um90YXRpb25bMF1bMF0ucHVzaCg4KTtcclxuICAgICAgICAgICAgcGFyaXR5Um90YXRpb25bMF1bMV0ucHVzaCg4KTtcclxuICAgICAgICAgICAgcGFyaXR5Um90YXRpb25bMV1bMF0ucHVzaCg4KTtcclxuICAgICAgICAgICAgcGFyaXR5Um90YXRpb25bMV1bMV0ucHVzaCg4KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGV4dCA+IDApIHtcclxuICAgICAgICAgICAgcGFyaXR5Um90YXRpb25bMF1bMF0ucHVzaCgzKTtcclxuICAgICAgICAgICAgcGFyaXR5Um90YXRpb25bMF1bMV0ucHVzaCgyKTtcclxuICAgICAgICAgICAgcGFyaXR5Um90YXRpb25bMV1bMF0ucHVzaCgyKTtcclxuICAgICAgICAgICAgcGFyaXR5Um90YXRpb25bMV1bMV0ucHVzaCgzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGV4dCA+IDEpIHtcclxuICAgICAgICAgICAgcGFyaXR5Um90YXRpb25bMF1bMF0ucHVzaCg1KTtcclxuICAgICAgICAgICAgcGFyaXR5Um90YXRpb25bMF1bMV0ucHVzaCg2KTtcclxuICAgICAgICAgICAgcGFyaXR5Um90YXRpb25bMV1bMF0ucHVzaCg0KTtcclxuICAgICAgICAgICAgcGFyaXR5Um90YXRpb25bMV1bMV0ucHVzaCg3KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGV4dCA+IDIpIHtcclxuICAgICAgICAgICAgcGFyaXR5Um90YXRpb25bMF1bMF0ucHVzaCgwLCAyKTtcclxuICAgICAgICAgICAgcGFyaXR5Um90YXRpb25bMF1bMV0ucHVzaCgxLCAzKTtcclxuICAgICAgICAgICAgcGFyaXR5Um90YXRpb25bMV1bMF0ucHVzaCgwLCAzKTtcclxuICAgICAgICAgICAgcGFyaXR5Um90YXRpb25bMV1bMV0ucHVzaCgxLCAyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHBhcml0eVJvdGF0aW9uO1xyXG4gICAgfTtcclxuICAgIFJhbmRvbVBhdHRlcm5HZW5lcmF0b3IucHJvdG90eXBlLmdlbmVyYXRlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciB0b3RhbCA9IDI7XHJcbiAgICAgICAgdmFyIG5vdGUgPSBbdGhpcy5fbm90ZVJlZCwgdGhpcy5fbm90ZUJsdWUsIHRoaXMuX25vdGVCb21iXTtcclxuICAgICAgICB2YXIgcGFyaXR5ID0ge1xyXG4gICAgICAgICAgICAwOiB0aGlzLl9wYXJpdHlSZWQgPyAwIDogMSxcclxuICAgICAgICAgICAgMTogdGhpcy5fcGFyaXR5Qmx1ZSA/IDAgOiAxLFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdmFyIHZhbGlkUm90YXRpb24gPSB0aGlzLmNyZWF0ZVZhbGlkUGFyaXR5KHRoaXMuX3Bhcml0eUV4dGVuZCwgIXRoaXMuX25vRG90KTtcclxuICAgICAgICB2YXIgbWF4U2l6ZSA9IHRoaXMuX21heEluZGV4ICogdGhpcy5fbWF4TGF5ZXI7XHJcbiAgICAgICAgaWYgKHRoaXMuX2xpbWl0KSB7XHJcbiAgICAgICAgICAgIHRvdGFsID0gTWF0aC5taW4odGhpcy5fdG90YWwsIG5vdGUucmVkdWNlKGZ1bmN0aW9uIChhY2MsIGN2KSB7IHJldHVybiBhY2MgKyBjdjsgfSksIG1heFNpemUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIXRoaXMuX2xpbWl0KSB7XHJcbiAgICAgICAgICAgIHRvdGFsID0gTWF0aC5taW4obm90ZS5yZWR1Y2UoZnVuY3Rpb24gKGFjYywgY3YpIHsgcmV0dXJuIGFjYyArIGN2OyB9KSwgbWF4U2l6ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBncmlkID0gbmV3IEFycmF5KG1heFNpemUpLmZpbGwobnVsbCk7XHJcbiAgICAgICAgaWYgKHRvdGFsID09PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBncmlkO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRvdGFsOykge1xyXG4gICAgICAgICAgICB2YXIgcmFuZElMID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbWF4U2l6ZSk7XHJcbiAgICAgICAgICAgIHZhciByYW5kVHlwZSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDMpO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IDM7IGorKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKG5vdGVbcmFuZFR5cGVdID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmFuZFR5cGUgPSAocmFuZFR5cGUgKyAxKSAlIDM7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKG5vdGVbcmFuZFR5cGVdID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgcmFuZERpciA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDkpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fcGFyaXR5ICYmIHJhbmRUeXBlIDw9IDEpIHtcclxuICAgICAgICAgICAgICAgIHJhbmREaXIgPVxyXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkUm90YXRpb25bcmFuZFR5cGVdW3Bhcml0eVtyYW5kVHlwZV1dW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHZhbGlkUm90YXRpb25bcmFuZFR5cGVdW3Bhcml0eVtyYW5kVHlwZV1dLmxlbmd0aCldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgbWF4U2l6ZTsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcG9zID0gKHJhbmRJTCArIGopICUgbWF4U2l6ZTtcclxuICAgICAgICAgICAgICAgIGlmIChncmlkW3Bvc10gPT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmFuZFR5cGUgPT09IDIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmFuZERpciA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGdyaWRbcG9zXSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX25vdGVUeXBlOiByYW5kVHlwZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgX25vdGVEaXJlY3Rpb246IHJhbmREaXIsXHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICBub3RlW3JhbmRUeXBlXS0tO1xyXG4gICAgICAgICAgICAgICAgICAgIGkrKztcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZ3JpZDtcclxuICAgIH07XHJcbiAgICByZXR1cm4gUmFuZG9tUGF0dGVybkdlbmVyYXRvcjtcclxufSgpKTtcclxuZXhwb3J0IGRlZmF1bHQgUmFuZG9tUGF0dGVybkdlbmVyYXRvcjtcclxuIiwidmFyIF9fc3ByZWFkQXJyYXkgPSAodGhpcyAmJiB0aGlzLl9fc3ByZWFkQXJyYXkpIHx8IGZ1bmN0aW9uICh0bywgZnJvbSwgcGFjaykge1xyXG4gICAgaWYgKHBhY2sgfHwgYXJndW1lbnRzLmxlbmd0aCA9PT0gMikgZm9yICh2YXIgaSA9IDAsIGwgPSBmcm9tLmxlbmd0aCwgYXI7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICBpZiAoYXIgfHwgIShpIGluIGZyb20pKSB7XHJcbiAgICAgICAgICAgIGlmICghYXIpIGFyID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZnJvbSwgMCwgaSk7XHJcbiAgICAgICAgICAgIGFyW2ldID0gZnJvbVtpXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdG8uY29uY2F0KGFyIHx8IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGZyb20pKTtcclxufTtcclxuaW1wb3J0IHsgcHBDdXJ2ZSB9IGZyb20gJy4vcHBDdXJ2ZSc7XHJcbmZ1bmN0aW9uIGxlcnAoeCwgeSwgYSkge1xyXG4gICAgcmV0dXJuIHggKyAoeSAtIHgpICogYTtcclxufVxyXG5mdW5jdGlvbiBpbnZsZXJwKHgsIHksIGEpIHtcclxuICAgIHJldHVybiBjbGFtcCgoYSAtIHgpIC8gKHkgLSB4KSk7XHJcbn1cclxuZnVuY3Rpb24gY2xhbXAoYSwgbWluLCBtYXgpIHtcclxuICAgIGlmIChtaW4gPT09IHZvaWQgMCkgeyBtaW4gPSAwOyB9XHJcbiAgICBpZiAobWF4ID09PSB2b2lkIDApIHsgbWF4ID0gMTsgfVxyXG4gICAgcmV0dXJuIE1hdGgubWluKG1heCwgTWF0aC5tYXgobWluLCBhKSk7XHJcbn1cclxuZnVuY3Rpb24gaW50ZXJwb2xhdGVQb2ludChwb2ludEFyciwgeFBvaW50KSB7XHJcbiAgICB2YXIgX2EsIF9iO1xyXG4gICAgdmFyIHhBcnIgPSBwb2ludEFyci5tYXAoZnVuY3Rpb24gKGFycikgeyByZXR1cm4gYXJyWzBdOyB9KTtcclxuICAgIHZhciB5QXJyID0gcG9pbnRBcnIubWFwKGZ1bmN0aW9uIChhcnIpIHsgcmV0dXJuIGFyclsxXTsgfSk7XHJcbiAgICB2YXIgeGEgPSAoX2EgPSBfX3NwcmVhZEFycmF5KFtdLCB4QXJyLCB0cnVlKS5yZXZlcnNlKCkuZmluZChmdW5jdGlvbiAoeCkgeyByZXR1cm4geCA8PSB4UG9pbnQ7IH0pKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiB4QXJyWzBdO1xyXG4gICAgdmFyIHhiID0gKF9iID0geEFyci5maW5kKGZ1bmN0aW9uICh4KSB7IHJldHVybiB4ID49IHhQb2ludDsgfSkpICE9PSBudWxsICYmIF9iICE9PSB2b2lkIDAgPyBfYiA6IHhhO1xyXG4gICAgdmFyIHlhID0geUFyclt4QXJyLmluZGV4T2YoeGEpXTtcclxuICAgIHZhciB5YiA9IHlBcnJbeEFyci5pbmRleE9mKHhiKV07XHJcbiAgICB2YXIgdCA9IGludmxlcnAoeGEsIHhiLCB4UG9pbnQpIHx8IDA7XHJcbiAgICByZXR1cm4geUFyclt4QXJyLmluZGV4T2YoeFBvaW50KV0gfHwgbGVycCh5YSwgeWIsIHQpO1xyXG59XHJcbmV4cG9ydCB2YXIgbWF4Tm90ZVNjb3JlID0gMTE1O1xyXG5leHBvcnQgdmFyIHNjb3JlTW9kaWZpZXIgPSB7XHJcbiAgICBuZjoge1xyXG4gICAgICAgIG5hbWU6ICdObyBGYWlsJyxcclxuICAgICAgICB2YWx1ZTogLTAuNSxcclxuICAgIH0sXHJcbiAgICBubzoge1xyXG4gICAgICAgIG5hbWU6ICdObyBPYnN0YWNsZXMnLFxyXG4gICAgICAgIHZhbHVlOiAtMC4wNSxcclxuICAgIH0sXHJcbiAgICBuYjoge1xyXG4gICAgICAgIG5hbWU6ICdObyBCb21icycsXHJcbiAgICAgICAgdmFsdWU6IC0wLjEsXHJcbiAgICB9LFxyXG4gICAgc3M6IHtcclxuICAgICAgICBuYW1lOiAnU2xvd2VyIFNvbmcnLFxyXG4gICAgICAgIHZhbHVlOiAtMC4zLFxyXG4gICAgfSxcclxuICAgIGRhOiB7XHJcbiAgICAgICAgbmFtZTogJ0Rpc2FwcGVhcmluZyBBcnJvd3MnLFxyXG4gICAgICAgIHZhbHVlOiAwLjA3LFxyXG4gICAgfSxcclxuICAgIGZzOiB7XHJcbiAgICAgICAgbmFtZTogJ0Zhc3RlciBTb25nJyxcclxuICAgICAgICB2YWx1ZTogMC4wOCxcclxuICAgIH0sXHJcbiAgICBnbjoge1xyXG4gICAgICAgIG5hbWU6ICdHaG9zdCBOb3RlcycsXHJcbiAgICAgICAgdmFsdWU6IDAuMTEsXHJcbiAgICB9LFxyXG59O1xyXG52YXIgU2NvcmVDYWxjdWxhdG9yID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gU2NvcmVDYWxjdWxhdG9yKG5vdGUsIHN0YXIsIGN1cnZlUG9pbnRzKSB7XHJcbiAgICAgICAgaWYgKG5vdGUgPT09IHZvaWQgMCkgeyBub3RlID0gMDsgfVxyXG4gICAgICAgIGlmIChzdGFyID09PSB2b2lkIDApIHsgc3RhciA9IDc7IH1cclxuICAgICAgICBpZiAoY3VydmVQb2ludHMgPT09IHZvaWQgMCkgeyBjdXJ2ZVBvaW50cyA9IHBwQ3VydmUuc2NvcmVzYWJlcjsgfVxyXG4gICAgICAgIHRoaXMuX3N0YXJSYXRpbmcgPSA3O1xyXG4gICAgICAgIHRoaXMuX3N0YXJQUCA9IDQyLjUyMTtcclxuICAgICAgICB0aGlzLl9ub3RlID0gbm90ZTtcclxuICAgICAgICB0aGlzLl9zdGFyUmF0aW5nID0gc3RhcjtcclxuICAgICAgICB0aGlzLl9jdXJ2ZVBvaW50cyA9IF9fc3ByZWFkQXJyYXkoW10sIGN1cnZlUG9pbnRzLCB0cnVlKS5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7IHJldHVybiBhWzBdIC0gYlswXTsgfSk7XHJcbiAgICB9XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoU2NvcmVDYWxjdWxhdG9yLnByb3RvdHlwZSwgXCJub3RlXCIsIHtcclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX25vdGU7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWwpIHtcclxuICAgICAgICAgICAgdGhpcy5fbm90ZSA9IHZhbDtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoU2NvcmVDYWxjdWxhdG9yLnByb3RvdHlwZSwgXCJzdGFyXCIsIHtcclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3N0YXJSYXRpbmc7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWwpIHtcclxuICAgICAgICAgICAgdGhpcy5fc3RhclJhdGluZyA9IHZhbDtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoU2NvcmVDYWxjdWxhdG9yLnByb3RvdHlwZSwgXCJjdXJ2ZVBvaW50c1wiLCB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9jdXJ2ZVBvaW50cztcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNldDogZnVuY3Rpb24gKHZhbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9jdXJ2ZVBvaW50cyA9IF9fc3ByZWFkQXJyYXkoW10sIHZhbCwgdHJ1ZSkuc29ydChmdW5jdGlvbiAoYSwgYikgeyByZXR1cm4gYVswXSAtIGJbMF07IH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIC8vIDEwMCUgcHAgdmFsdWVcclxuICAgIC8vIDAuOTQ1ODA2NDUxNjEyOTAzMiBpbnRlcnBvbGF0ZWQgdmFsdWVcclxuICAgIC8vIDAuOTQzMTcwNzMxNzA3MzE3MiByYWJiaXQncyBpbnRlcnBvbGF0ZWQgdmFsdWVcclxuICAgIFNjb3JlQ2FsY3VsYXRvci5wcm90b3R5cGUuY2FsY1BQID0gZnVuY3Rpb24gKHN0YXJSYXRpbmcsIHBlcmMpIHtcclxuICAgICAgICBpZiAoc3RhclJhdGluZyA9PT0gdm9pZCAwKSB7IHN0YXJSYXRpbmcgPSB0aGlzLl9zdGFyUmF0aW5nOyB9XHJcbiAgICAgICAgaWYgKHBlcmMgPT09IHZvaWQgMCkgeyBwZXJjID0gMC45NDU4MDY0NTE2MTI5MDMyOyB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N0YXJQUCAqIHN0YXJSYXRpbmcgKiBpbnRlcnBvbGF0ZVBvaW50KHRoaXMuX2N1cnZlUG9pbnRzLCBwZXJjKTtcclxuICAgIH07XHJcbiAgICAvLyBtaXNzIHNpbXVsYXRlIG1pc3NpbmcgdGhlIG5vdGVcclxuICAgIC8vIGJyZWFrIHNpbXVsYXRlIGNvbWJvIGJyZWFrIGR1ZSB0byB3YWxsIG9yIGJvbWIsIGJ1dCBpdCBjYW4gb25seSBoYXBwZW4gb25jZSBiZWZvcmUgdGhlIG5vdGVcclxuICAgIC8vIG1pc3MgYW5kIGJyZWFrIGNhbiBoYXBwZW4gYXQgdGhlIHNhbWUgdGltZSwgcmVzdWx0aW5nIG11bHRpcGxpZXIgdG8gcmVkdWNlIHR3aWNlXHJcbiAgICBTY29yZUNhbGN1bGF0b3IucHJvdG90eXBlLmNhbGNTY29yZSA9IGZ1bmN0aW9uIChzY29yZU5vdGUsIHNjb3JlTXVsdGlwbGllciwgbWlzc2VkQXJyLCBicmVha0Fycikge1xyXG4gICAgICAgIGlmIChzY29yZU5vdGUgPT09IHZvaWQgMCkgeyBzY29yZU5vdGUgPSBtYXhOb3RlU2NvcmU7IH1cclxuICAgICAgICBpZiAoc2NvcmVNdWx0aXBsaWVyID09PSB2b2lkIDApIHsgc2NvcmVNdWx0aXBsaWVyID0gMTsgfVxyXG4gICAgICAgIGlmIChtaXNzZWRBcnIgPT09IHZvaWQgMCkgeyBtaXNzZWRBcnIgPSBbXTsgfVxyXG4gICAgICAgIGlmIChicmVha0FyciA9PT0gdm9pZCAwKSB7IGJyZWFrQXJyID0gW107IH1cclxuICAgICAgICB2YXIgdG90YWwgPSAwO1xyXG4gICAgICAgIHZhciBub3RlU2NvcmUgPSBzY29yZU5vdGUgKiBzY29yZU11bHRpcGxpZXI7XHJcbiAgICAgICAgdmFyIG11bHRGbGFnID0gdHJ1ZTtcclxuICAgICAgICB2YXIgbXVsdENvbWJvID0gMDtcclxuICAgICAgICB2YXIgbXVsdGlwbGllciA9IDE7XHJcbiAgICAgICAgdmFyIG1pc3NlZCA9IF9fc3ByZWFkQXJyYXkoW10sIG1pc3NlZEFyciwgdHJ1ZSkubWFwKGZ1bmN0aW9uICh4KSB7IHJldHVybiB4IC0gMTsgfSk7XHJcbiAgICAgICAgdmFyIGNCcmVhayA9IF9fc3ByZWFkQXJyYXkoW10sIGJyZWFrQXJyLCB0cnVlKS5tYXAoZnVuY3Rpb24gKHgpIHsgcmV0dXJuIHggLSAxOyB9KTtcclxuICAgICAgICBmdW5jdGlvbiBjb21ib0JyZWFrKCkge1xyXG4gICAgICAgICAgICBtdWx0aXBsaWVyID0gTWF0aC5tYXgobXVsdGlwbGllciAvIDIsIDEpO1xyXG4gICAgICAgICAgICBtdWx0Q29tYm8gPSAwO1xyXG4gICAgICAgICAgICBtdWx0RmxhZyA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5fbm90ZTsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChjQnJlYWsuaW5jbHVkZXMoaSkpIHtcclxuICAgICAgICAgICAgICAgIGNvbWJvQnJlYWsoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAobWlzc2VkLmluY2x1ZGVzKGkpKSB7XHJcbiAgICAgICAgICAgICAgICBjb21ib0JyZWFrKCk7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBtdWx0Q29tYm8rKztcclxuICAgICAgICAgICAgaWYgKG11bHRGbGFnICYmIG11bHRDb21ibyA+PSAyICogbXVsdGlwbGllcikge1xyXG4gICAgICAgICAgICAgICAgbXVsdGlwbGllciAqPSAyO1xyXG4gICAgICAgICAgICAgICAgaWYgKG11bHRpcGxpZXIgPj0gOCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG11bHRGbGFnID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBtdWx0Q29tYm8gPSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRvdGFsICs9IG5vdGVTY29yZSAqIG11bHRpcGxpZXI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0b3RhbDtcclxuICAgIH07XHJcbiAgICByZXR1cm4gU2NvcmVDYWxjdWxhdG9yO1xyXG59KCkpO1xyXG5leHBvcnQgZGVmYXVsdCBTY29yZUNhbGN1bGF0b3I7XHJcbiIsInZhciBTd2luZ1BlclNlY29uZCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIFN3aW5nUGVyU2Vjb25kKCkge1xyXG4gICAgICAgIHRoaXMuX2RpZmZpY3VsdHkgPSB7XHJcbiAgICAgICAgICAgIGVhc3k6IG51bGwsXHJcbiAgICAgICAgICAgIG5vcm1hbDogbnVsbCxcclxuICAgICAgICAgICAgaGFyZDogbnVsbCxcclxuICAgICAgICAgICAgZXhwZXJ0OiBudWxsLFxyXG4gICAgICAgICAgICBleHBlcnRwbHVzOiBudWxsLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoU3dpbmdQZXJTZWNvbmQucHJvdG90eXBlLCBcImRpZmZpY3VsdHlcIiwge1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZGlmZmljdWx0eTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICBTd2luZ1BlclNlY29uZC5wcm90b3R5cGUuY2FsY0RpZmZlcmVuY2UgPSBmdW5jdGlvbiAoZDEsIGQyKSB7XHJcbiAgICAgICAgcmV0dXJuICgxIC0gdGhpcy5fZGlmZmljdWx0eVtkMl0gLyB0aGlzLl9kaWZmaWN1bHR5W2QxXSkgKiAxMDA7XHJcbiAgICB9O1xyXG4gICAgU3dpbmdQZXJTZWNvbmQucHJvdG90eXBlLmdldFRvdGFsUmVkdWN0aW9uID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBoaWdoZXN0ID0gbnVsbDtcclxuICAgICAgICB2YXIgbG93ZXN0ID0gbnVsbDtcclxuICAgICAgICBmb3IgKHZhciBkIGluIHRoaXMuX2RpZmZpY3VsdHkpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2RpZmZpY3VsdHlbZF0gIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIGlmICghaGlnaGVzdCB8fCBoaWdoZXN0IDwgdGhpcy5fZGlmZmljdWx0eVtkXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGhpZ2hlc3QgPSB0aGlzLl9kaWZmaWN1bHR5W2RdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKCFsb3dlc3QgfHwgbG93ZXN0ID4gdGhpcy5fZGlmZmljdWx0eVtkXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxvd2VzdCA9IHRoaXMuX2RpZmZpY3VsdHlbZF07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGhpZ2hlc3QgfHwgKGhpZ2hlc3QgJiYgbG93ZXN0KSA/ICgxIC0gbG93ZXN0IC8gaGlnaGVzdCkgKiAxMDAgOiAwO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBTd2luZ1BlclNlY29uZDtcclxufSgpKTtcclxuZXhwb3J0IGRlZmF1bHQgU3dpbmdQZXJTZWNvbmQ7XHJcbiIsImV4cG9ydCBmdW5jdGlvbiByb3VuZChudW0sIGQpIHtcclxuICAgIGlmIChkID09PSB2b2lkIDApIHsgZCA9IDA7IH1cclxuICAgIGlmICghKGQgPiAwKSkge1xyXG4gICAgICAgIHJldHVybiBNYXRoLnJvdW5kKG51bSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gTWF0aC5yb3VuZChudW0gKiBNYXRoLnBvdygxMCwgZCkpIC8gTWF0aC5wb3coMTAsIGQpO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXROdW1iZXIobnVtKSB7XHJcbiAgICByZXR1cm4gbnVtLnRvU3RyaW5nKCkucmVwbGFjZSgvXFxCKD89KFxcZHszfSkrKD8hXFxkKSkvZywgJywnKTtcclxufVxyXG4iLCJ2YXIgdmVyc2lvbk1ham9yID0gMjtcclxudmFyIHZlcnNpb25NaW5vciA9IDA7XHJcbnZhciB2ZXJzaW9uUGF0Y2ggPSAyO1xyXG52YXIgd2F0ZXJtYXJrID0gJ0tpdmFsIEV2YW4jNTQ4MCc7XHJcbnZhciBWZXJzaW9uID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gVmVyc2lvbigpIHtcclxuICAgICAgICB0aGlzLnZlcnNpb24gPSBcInZcIiArIHZlcnNpb25NYWpvciArIFwiLlwiICsgdmVyc2lvbk1pbm9yICsgXCIuXCIgKyB2ZXJzaW9uUGF0Y2g7XHJcbiAgICAgICAgdGhpcy53bSA9IHdhdGVybWFyaztcclxuICAgIH1cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShWZXJzaW9uLnByb3RvdHlwZSwgXCJudW1iZXJcIiwge1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy52ZXJzaW9uO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXHJcbiAgICB9KTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShWZXJzaW9uLnByb3RvdHlwZSwgXCJ3YXRlcm1hcmtcIiwge1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy53bTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxyXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gVmVyc2lvbjtcclxufSgpKTtcclxuZXhwb3J0IGRlZmF1bHQgVmVyc2lvbjtcclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJ2YXIgX19zcHJlYWRBcnJheSA9ICh0aGlzICYmIHRoaXMuX19zcHJlYWRBcnJheSkgfHwgZnVuY3Rpb24gKHRvLCBmcm9tLCBwYWNrKSB7XHJcbiAgICBpZiAocGFjayB8fCBhcmd1bWVudHMubGVuZ3RoID09PSAyKSBmb3IgKHZhciBpID0gMCwgbCA9IGZyb20ubGVuZ3RoLCBhcjsgaSA8IGw7IGkrKykge1xyXG4gICAgICAgIGlmIChhciB8fCAhKGkgaW4gZnJvbSkpIHtcclxuICAgICAgICAgICAgaWYgKCFhcikgYXIgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChmcm9tLCAwLCBpKTtcclxuICAgICAgICAgICAgYXJbaV0gPSBmcm9tW2ldO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB0by5jb25jYXQoYXIgfHwgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZnJvbSkpO1xyXG59O1xyXG4vLyBpdCB0dXJucyBvdXQgdWkgaXMgY29tcGxldGUgcGFpbiB3aXRoIHR5cGVzY3JpcHQgYW5kIHdlYnBhY2tcclxuLy8gbmVlZCB0byBsZWFybiBob3cgdG8gYnJlYWsgdXAgdGhlc2UgaW50byBzZXBhcmF0ZSBmaWxlc1xyXG5pbXBvcnQgVmVyc2lvbiBmcm9tICcuL3ZlcnNpb24nO1xyXG5pbXBvcnQgeyBmb3JtYXROdW1iZXIsIHJvdW5kIH0gZnJvbSAnLi91dGlsJztcclxuaW1wb3J0IEJlYXRQZXJNaW51dGUgZnJvbSAnLi9icG0nO1xyXG5pbXBvcnQgRUJQTVByZWNpc2lvbiBmcm9tICcuL2VicG1QcmVjJztcclxuaW1wb3J0IE5vdGVKdW1wU3BlZWQgZnJvbSAnLi9uanMnO1xyXG5pbXBvcnQgU2NvcmVDYWxjdWxhdG9yIGZyb20gJy4vc2NvcmUnO1xyXG5pbXBvcnQgU3dpbmdQZXJTZWNvbmQgZnJvbSAnLi9zcHMnO1xyXG5pbXBvcnQgQ29sb3JQaWNrZXIgZnJvbSAnLi9jb2xvclBpY2tlcic7XHJcbmltcG9ydCB7IGNvbG9yU2NoZW1lIH0gZnJvbSAnLi9lbnZDb2xvcic7XHJcbmltcG9ydCBSYW5kb21QYXR0ZXJuR2VuZXJhdG9yLCB7IG5vdGVJbWFnZSwgbm90ZVJvdGF0aW9uIH0gZnJvbSAnLi9yYW5kUGF0dGVybic7XHJcbmltcG9ydCB7IHBwQ3VydmUgfSBmcm9tICcuL3BwQ3VydmUnO1xyXG52YXIgYnBtID0gbmV3IEJlYXRQZXJNaW51dGUoKTtcclxudmFyIG5vdGVKdW1wU3BlZWQgPSBuZXcgTm90ZUp1bXBTcGVlZChicG0sIDE2KTtcclxudmFyIGVicG1QcmVjID0gbmV3IEVCUE1QcmVjaXNpb24oYnBtKTtcclxudmFyIHNjb3JlQ2FsY3VsYXRvciA9IG5ldyBTY29yZUNhbGN1bGF0b3IoNzI3KTtcclxudmFyIHN3aW5nUGVyU2Vjb25kID0gbmV3IFN3aW5nUGVyU2Vjb25kKCk7XHJcbnZhciBjb2xvclBpY2tlciA9IG5ldyBDb2xvclBpY2tlcigpO1xyXG52YXIgcmFuZFBhdHRlcm5HZW4gPSBuZXcgUmFuZG9tUGF0dGVybkdlbmVyYXRvcigzLCA0KTtcclxudmFyIHZlcnNpb24gPSBuZXcgVmVyc2lvbigpO1xyXG52YXIgdGV4dFZlcnNpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGV4dC12ZXJzaW9uJyk7XHJcbnZhciB0ZXh0V2F0ZXJtYXJrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRleHQtd2F0ZXJtYXJrJyk7XHJcbnZhciBtYXBTZXR0aW5nc0lucHV0QlBNID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI21hcC1zZXR0aW5ncy1pbnB1dC1icG0nKTtcclxudmFyIGlucHV0VG9nZ2xlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRvZ2dsZS1pbnB1dCcpO1xyXG52YXIgZWJwbUlucHV0UHJlY0JlYXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZWJwbS1pbnB1dC1wcmVjYmVhdCcpO1xyXG52YXIgZWJwbUlucHV0UHJlY1RpbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZWJwbS1pbnB1dC1wcmVjdGltZScpO1xyXG52YXIgZWJwbUlucHV0UHJlY1JlYWxUaW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2VicG0taW5wdXQtcHJlY3JlYWx0aW1lJyk7XHJcbnZhciBlYnBtSW5wdXRFQlBNT0hKID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2VicG0taW5wdXQtZWJwbS1vaGonKTtcclxudmFyIGVicG1JbnB1dEVCUE1TdHJlYW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZWJwbS1pbnB1dC1lYnBtLXN0cmVhbScpO1xyXG52YXIgbmpzSW5wdXROSlMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbmpzLWlucHV0LW5qcycpO1xyXG52YXIgbmpzSW5wdXRPZmZzZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbmpzLWlucHV0LW9mZnNldCcpO1xyXG52YXIgbmpzSW5wdXRISkQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbmpzLWlucHV0LWhqZCcpO1xyXG52YXIgbmpzSW5wdXRKRCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNuanMtaW5wdXQtamQnKTtcclxudmFyIG5qc0lucHV0UmVhY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbmpzLWlucHV0LXJlYWN0dGltZScpO1xyXG52YXIgbmpzT3V0cHV0SkQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbmpzLW91dHB1dC1qZCcpO1xyXG52YXIgbmpzT3V0cHV0TWluUmVhY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbmpzLW91dHB1dC1yZWFjdHRpbWUnKTtcclxudmFyIG5qc091dHB1dEpET0hpZ2ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbmpzLW91dHB1dC1qZC1vcHRpbWFsLWhpZ2gnKTtcclxudmFyIG5qc091dHB1dEpET0xvdyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNuanMtb3V0cHV0LWpkLW9wdGltYWwtbG93Jyk7XHJcbnZhciBuanNTZWxlY3RTY2FsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNuanMtb3B0aW9uLW5qcy1zY2FsZScpO1xyXG52YXIgc2NvcmVJbnB1dE5vdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2NvcmUtaW5wdXQtbm90ZScpO1xyXG52YXIgc2NvcmVJbnB1dFN0YXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2NvcmUtaW5wdXQtc3RhcicpO1xyXG52YXIgc2NvcmVJbnB1dFBlcmNlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2NvcmUtaW5wdXQtcGVyY2VudCcpO1xyXG52YXIgc2NvcmVJbnB1dFNjb3JlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Njb3JlLWlucHV0LXNjb3JlJyk7XHJcbnZhciBzY29yZUlucHV0UFAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2NvcmUtaW5wdXQtcHAnKTtcclxudmFyIHNjb3JlT3V0cHV0TWF4U2NvcmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2NvcmUtb3V0cHV0LW1heHNjb3JlJyk7XHJcbnZhciBzY29yZU91dHB1dE1heFNjb3JlTW9kID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Njb3JlLW91dHB1dC1tYXhzY29yZS1tb2RpZmllcicpO1xyXG52YXIgc2NvcmVJbnB1dEF2Z0N1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzY29yZS1pbnB1dC1hdmdjdXQnKTtcclxudmFyIHNjb3JlSW5wdXRNaXNzZWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2NvcmUtaW5wdXQtbWlzc2VkJyk7XHJcbnZhciBzY29yZUlucHV0QnJlYWsgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2NvcmUtaW5wdXQtYnJlYWsnKTtcclxudmFyIHNjb3JlT3V0cHV0RXN0U2NvcmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2NvcmUtb3V0cHV0LWVzdHNjb3JlJyk7XHJcbnZhciBzY29yZU91dHB1dEVzdFBlcmNlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2NvcmUtb3V0cHV0LWVzdHBlcmNlbnQnKTtcclxudmFyIHNjb3JlT3V0cHV0RXN0UFAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2NvcmUtb3V0cHV0LWVzdHBwJyk7XHJcbnZhciBzY29yZU91dHB1dE1pc3NTY29yZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzY29yZS1vdXRwdXQtbWlzc3Njb3JlJyk7XHJcbnZhciBzY29yZU91dHB1dE5vTWlzc1Njb3JlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Njb3JlLW91dHB1dC1ub21pc3NzY29yZScpO1xyXG52YXIgc2NvcmVPdXRwdXROb01pc3NQZXJjZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Njb3JlLW91dHB1dC1ub21pc3NwZXJjZW50Jyk7XHJcbnZhciBzY29yZU91dHB1dE5vTWlzc1BQID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Njb3JlLW91dHB1dC1ub21pc3NwcCcpO1xyXG52YXIgc2NvcmVUYWJsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzY29yZS10YWJsZScpO1xyXG52YXIgc2NvcmVUYWJsZVBlcmNlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2NvcmUtdGFibGUtcGVyY2VudGFnZScpO1xyXG52YXIgc2NvcmVPcHRpb25QUCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzY29yZS1vcHRpb24tcHAtY3VydmUnKTtcclxudmFyIHNjb3JlVGV4dEFyZWFKU09OID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Njb3JlLXRleHQtanNvbicpO1xyXG52YXIgc2NvcmVFcnJvckpTT04gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2NvcmUtZXJyb3ItanNvbicpO1xyXG52YXIgbGFiZWxJbnB1dFRleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbGFiZWwtaW5wdXQtdGV4dCcpO1xyXG52YXIgbGFiZWxPdXRwdXRUZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2xhYmVsLW91dHB1dC10ZXh0Jyk7XHJcbnZhciBsYWJlbElucHV0RGlmZkNvdW50MSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNsYWJlbC1pbnB1dC1kaWZmLWNvdW50LTEnKTtcclxudmFyIGxhYmVsSW5wdXREaWZmQ291bnQyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2xhYmVsLWlucHV0LWRpZmYtY291bnQtMicpO1xyXG52YXIgbGFiZWxJbnB1dERpZmZDb3VudDMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbGFiZWwtaW5wdXQtZGlmZi1jb3VudC0zJyk7XHJcbnZhciBsYWJlbElucHV0RGlmZkNvdW50NCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNsYWJlbC1pbnB1dC1kaWZmLWNvdW50LTQnKTtcclxudmFyIGxhYmVsSW5wdXREaWZmQ291bnQ1ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2xhYmVsLWlucHV0LWRpZmYtY291bnQtNScpO1xyXG52YXIgc3BzSW5wdXQgPSB7fTtcclxudmFyIHNwc091dHB1dCA9IHt9O1xyXG5mb3IgKHZhciBkIGluIHN3aW5nUGVyU2Vjb25kLmRpZmZpY3VsdHkpIHtcclxuICAgIHNwc0lucHV0W2RdID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzcHMtaW5wdXQtXCIgKyBkKTtcclxuICAgIHNwc091dHB1dFtkXSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc3BzLW91dHB1dC1cIiArIGQpO1xyXG59XHJcbnZhciBzcHNPdXRwdXRUb3RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzcHMtb3V0cHV0LXRvdGFsLXJlZHVjdGlvbicpO1xyXG52YXIgY3BPcHRpb25Db2xvclNjaGVtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjcC1vcHRpb24tY29sb3JzY2hlbWUnKTtcclxudmFyIGNwSW5wdXRIZXggPSB7fTtcclxudmFyIGNwSW5wdXRQaWNrZXIgPSB7fTtcclxudmFyIGNwSW5wdXRJbmNsdWRlID0ge307XHJcbnZhciBjcElucHV0UmVzZXQgPSB7fTtcclxuZm9yICh2YXIgb2JqIGluIGNvbG9yUGlja2VyLmNvbG9yU2NoZW1lKSB7XHJcbiAgICB2YXIgcGFydCA9IG9iai5yZXBsYWNlKC9eXFxfLywgJycpLnRvTG93ZXJDYXNlKCk7XHJcbiAgICBjcElucHV0SGV4W29ial0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NwLWlucHV0LWhleC1cIiArIHBhcnQpO1xyXG4gICAgY3BJbnB1dFBpY2tlcltvYmpdID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjcC1pbnB1dC1waWNrZXItXCIgKyBwYXJ0KTtcclxuICAgIGNwSW5wdXRJbmNsdWRlW29ial0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NwLWlucHV0LWluY2x1ZGUtXCIgKyBwYXJ0KTtcclxuICAgIGNwSW5wdXRSZXNldFtvYmpdID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjcC1pbnB1dC1yZXNldC1cIiArIHBhcnQpO1xyXG59XHJcbnZhciBjcFRleHRBcmVhSU9KU09OID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NwLWlvLWNvbG9yanNvbicpO1xyXG52YXIgY3BFcnJvckpTT04gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY3AtZXJyb3ItY29sb3Jqc29uJyk7XHJcbnZhciBycGdJbnB1dFJvdyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNycGctaW5wdXQtcnBhdHRlcm4tcm93Jyk7XHJcbnZhciBycGdJbnB1dENvbHVtbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNycGctaW5wdXQtcnBhdHRlcm4tY29sdW1uJyk7XHJcbnZhciBycGdUYWJsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNycGctdGFibGUtcnBhdHRlcm4nKTtcclxudmFyIHJwZ0lucHV0TlJlZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNycGctaW5wdXQtcnBhdHRlcm4tcmVkJyk7XHJcbnZhciBycGdJbnB1dE5CbHVlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3JwZy1pbnB1dC1ycGF0dGVybi1ibHVlJyk7XHJcbnZhciBycGdJbnB1dE5Cb21iID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3JwZy1pbnB1dC1ycGF0dGVybi1ib21iJyk7XHJcbnZhciBycGdJbnB1dExpbWl0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3JwZy1pbnB1dC1ycGF0dGVybi1saW1pdCcpO1xyXG52YXIgcnBnSW5wdXRUb3RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNycGctaW5wdXQtcnBhdHRlcm4tdG90YWwnKTtcclxudmFyIHJwZ0lucHV0Tm9Eb3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcnBnLWlucHV0LXJwYXR0ZXJuLW5vZG90Jyk7XHJcbnZhciBycGdJbnB1dFBhcml0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNycGctaW5wdXQtcnBhdHRlcm4tcGFyaXR5Jyk7XHJcbnZhciBycGdJbnB1dFBhcml0eUV4dGVuZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNycGctaW5wdXQtcnBhdHRlcm4tcGFyaXR5LWV4dGVuZCcpO1xyXG52YXIgcnBnSW5wdXRQYXJpdHlOUmVkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3JwZy1pbnB1dC1ycGF0dGVybi1wYXJpdHktcmVkJyk7XHJcbnZhciBycGdJbnB1dFBhcml0eU5CbHVlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3JwZy1pbnB1dC1ycGF0dGVybi1wYXJpdHktYmx1ZScpO1xyXG52YXIgcnBnSW5wdXRHZW5lcmF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNycGctaW5wdXQtZ2VuZXJhdGUtcnBhdHRlcm4nKTtcclxuaW5pdCgpO1xyXG5tYXBTZXR0aW5nc0lucHV0QlBNLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGlucHV0QlBNSGFuZGxlcik7XHJcbm1hcFNldHRpbmdzSW5wdXRCUE0uYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBpbnB1dEJQTUhhbmRsZXIpO1xyXG5lYnBtSW5wdXRQcmVjQmVhdC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBpbnB1dFByZWNCZWF0SGFuZGxlcik7XHJcbmVicG1JbnB1dFByZWNCZWF0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgaW5wdXRQcmVjQmVhdEhhbmRsZXIpO1xyXG5lYnBtSW5wdXRQcmVjVGltZS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBpbnB1dFByZWNUaW1lSGFuZGxlcik7XHJcbmVicG1JbnB1dFByZWNUaW1lLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgaW5wdXRQcmVjVGltZUhhbmRsZXIpO1xyXG5lYnBtSW5wdXRQcmVjUmVhbFRpbWUuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgaW5wdXRQcmVjUmVhbFRpbWVIYW5kbGVyKTtcclxuZWJwbUlucHV0UHJlY1JlYWxUaW1lLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgaW5wdXRQcmVjUmVhbFRpbWVIYW5kbGVyKTtcclxuZWJwbUlucHV0RUJQTU9ISi5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBpbnB1dEVCUE1IYW5kbGVyKTtcclxuZWJwbUlucHV0RUJQTU9ISi5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIGlucHV0RUJQTUhhbmRsZXIpO1xyXG5lYnBtSW5wdXRFQlBNU3RyZWFtLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGlucHV0RUJQTUhhbmRsZXIpO1xyXG5lYnBtSW5wdXRFQlBNU3RyZWFtLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgaW5wdXRFQlBNSGFuZGxlcik7XHJcbm5qc0lucHV0TkpTLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGlucHV0TkpTSGFuZGxlcik7XHJcbm5qc0lucHV0TkpTLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgaW5wdXROSlNIYW5kbGVyKTtcclxubmpzSW5wdXRPZmZzZXQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgaW5wdXROSlNPZmZzZXRIYW5kbGVyKTtcclxubmpzSW5wdXRPZmZzZXQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBpbnB1dE5KU09mZnNldEhhbmRsZXIpO1xyXG5uanNJbnB1dEhKRC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBpbnB1dEhKREhhbmRsZXIpO1xyXG5uanNJbnB1dEhKRC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIGlucHV0SEpESGFuZGxlcik7XHJcbm5qc0lucHV0SkQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgaW5wdXRKREhhbmRsZXIpO1xyXG5uanNJbnB1dEpELmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgaW5wdXRKREhhbmRsZXIpO1xyXG5uanNJbnB1dFJlYWN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGlucHV0UmVhY3RUaW1lSGFuZGxlcik7XHJcbm5qc0lucHV0UmVhY3QuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBpbnB1dFJlYWN0VGltZUhhbmRsZXIpO1xyXG5zY29yZUlucHV0Tm90ZS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBpbnB1dE5vdGVIYW5kbGVyKTtcclxuc2NvcmVJbnB1dE5vdGUuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBpbnB1dE5vdGVIYW5kbGVyKTtcclxuc2NvcmVJbnB1dFN0YXIuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgaW5wdXRTdGFySGFuZGxlcik7XHJcbnNjb3JlSW5wdXRTdGFyLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgaW5wdXRTdGFySGFuZGxlcik7XHJcbnNjb3JlSW5wdXRQZXJjZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGlucHV0UGVyY2VudEhhbmRsZXIpO1xyXG5zY29yZUlucHV0UGVyY2VudC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIGlucHV0UGVyY2VudEhhbmRsZXIpO1xyXG5zY29yZUlucHV0U2NvcmUuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgaW5wdXRTY29yZUhhbmRsZXIpO1xyXG5zY29yZUlucHV0U2NvcmUuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBpbnB1dFNjb3JlSGFuZGxlcik7XHJcbnNjb3JlSW5wdXRBdmdDdXQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgaW5wdXRBdmdDdXRIYW5kbGVyKTtcclxuc2NvcmVJbnB1dEF2Z0N1dC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIGlucHV0QXZnQ3V0SGFuZGxlcik7XHJcbnNjb3JlSW5wdXRCcmVhay5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBpbnB1dE1pc3NCcmVha0hhbmRsZXIpO1xyXG5zY29yZUlucHV0TWlzc2VkLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGlucHV0TWlzc0JyZWFrSGFuZGxlcik7XHJcbnNjb3JlVGFibGVQZXJjZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGlucHV0VGFibGVQZXJjZW50SGFuZGxlcik7XHJcbnNjb3JlT3B0aW9uUFAuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgb3B0aW9uU2NvcmVDdXJ2ZUhhbmRsZXIpO1xyXG5zY29yZVRleHRBcmVhSlNPTi5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBpbnB1dEpTT05TY29yZUhhbmRsZXIpO1xyXG5sYWJlbElucHV0VGV4dC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIGlucHV0TGFiZWxUZXh0SGFuZGxlcik7XHJcbmxhYmVsSW5wdXREaWZmQ291bnQxLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaW5wdXREaWZmQ291bnRIYW5kbGVyKTtcclxubGFiZWxJbnB1dERpZmZDb3VudDIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBpbnB1dERpZmZDb3VudEhhbmRsZXIpO1xyXG5sYWJlbElucHV0RGlmZkNvdW50My5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGlucHV0RGlmZkNvdW50SGFuZGxlcik7XHJcbmxhYmVsSW5wdXREaWZmQ291bnQ0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaW5wdXREaWZmQ291bnRIYW5kbGVyKTtcclxubGFiZWxJbnB1dERpZmZDb3VudDUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBpbnB1dERpZmZDb3VudEhhbmRsZXIpO1xyXG5mb3IgKHZhciBkIGluIHN3aW5nUGVyU2Vjb25kLmRpZmZpY3VsdHkpIHtcclxuICAgIHNwc0lucHV0W2RdLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgaW5wdXRTUFNIYW5kbGVySGFuZGxlcik7XHJcbn1cclxuY3BPcHRpb25Db2xvclNjaGVtZS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBvcHRpb25Db2xvclNjaGVtZUhhbmRsZXIpO1xyXG5mb3IgKHZhciBvYmogaW4gY29sb3JQaWNrZXIuY29sb3JTY2hlbWUpIHtcclxuICAgIGNwSW5wdXRIZXhbb2JqXS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBpbnB1dENvbG9ySGV4SGFuZGxlcik7XHJcbiAgICBjcElucHV0UGlja2VyW29ial0uYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgaW5wdXRDb2xvclBpY2tlckhhbmRsZXIpO1xyXG4gICAgY3BJbnB1dEluY2x1ZGVbb2JqXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGlucHV0Q29sb3JJbmNsdWRlSGFuZGxlcik7XHJcbiAgICBjcElucHV0UmVzZXRbb2JqXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGlucHV0Q29sb3JSZXNldEhhbmRsZXIpO1xyXG4gICAgY3BJbnB1dFJlc2V0W29ial0uc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxufVxyXG52YXIgY3BDdXN0b21UZXh0ID0gJ0N1c3RvbSc7XHJcbnZhciBvcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRpb24nKTtcclxub3B0aW9uLnZhbHVlID0gY3BDdXN0b21UZXh0O1xyXG5vcHRpb24udGV4dENvbnRlbnQgPSBjcEN1c3RvbVRleHQ7XHJcbmNwT3B0aW9uQ29sb3JTY2hlbWUuYXBwZW5kKG9wdGlvbik7XHJcbmZvciAodmFyIGNzIGluIGNvbG9yU2NoZW1lKSB7XHJcbiAgICBvcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRpb24nKTtcclxuICAgIG9wdGlvbi52YWx1ZSA9IGNzO1xyXG4gICAgb3B0aW9uLnRleHRDb250ZW50ID0gY3M7XHJcbiAgICBjcE9wdGlvbkNvbG9yU2NoZW1lLmFwcGVuZChvcHRpb24pO1xyXG59XHJcbmNwVGV4dEFyZWFJT0pTT04uYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgaW5wdXRKU09OQ29sb3JIYW5kbGVyKTtcclxucnBnSW5wdXRSb3cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBpbnB1dFJQYXR0ZXJuUm93SGFuZGxlcik7XHJcbnJwZ0lucHV0Q29sdW1uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaW5wdXRSUGF0dGVybkNvbHVtbkhhbmRsZXIpO1xyXG5ycGdJbnB1dEdlbmVyYXRlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaW5wdXRSUGF0dGVybkdlbmVyYXRlSGFuZGxlcik7XHJcbmZ1bmN0aW9uIGluaXQoKSB7XHJcbiAgICB1cGRhdGVWZXJzaW9uKHZlcnNpb24ubnVtYmVyKTtcclxuICAgIHVwZGF0ZVdhdGVybWFyayh2ZXJzaW9uLndhdGVybWFyayk7XHJcbiAgICBtYXBTZXR0aW5nc0lucHV0QlBNLnZhbHVlID0gYnBtLnZhbHVlLnRvU3RyaW5nKCk7XHJcbiAgICB1cGRhdGVFQlBNKCk7XHJcbiAgICB1cGRhdGVQcmVjKCk7XHJcbiAgICBuanNJbnB1dE5KUy52YWx1ZSA9IG5vdGVKdW1wU3BlZWQubmpzLnRvU3RyaW5nKCk7XHJcbiAgICBuanNJbnB1dE9mZnNldC52YWx1ZSA9IG5vdGVKdW1wU3BlZWQub2Zmc2V0LnRvU3RyaW5nKCk7XHJcbiAgICB1cGRhdGVOSlMoKTtcclxuICAgIG5qc091dHB1dE1pblJlYWN0LnRleHRDb250ZW50ID0gcm91bmQoKDYwIC8gYnBtLnZhbHVlKSAqIDEwMDApICsgXCJtc1wiO1xyXG4gICAgZW5hYmxlSW5wdXQoKTtcclxuICAgIHZhciBtaXNzZWRTY29yZSA9IFszLCAyMiwgMTAwLCAxMDJdO1xyXG4gICAgdmFyIGJyZWFrU2NvcmUgPSBbMTI3XTtcclxuICAgIHNjb3JlVGFibGVQZXJjZW50LnZhbHVlID0gWzEwMCwgOTgsIDk3LCA5NiwgOTUsIDk0LCA5MywgOTAsIDg1LCA4MF0uam9pbignLCcpO1xyXG4gICAgc2NvcmVJbnB1dE5vdGUudmFsdWUgPSBzY29yZUNhbGN1bGF0b3Iubm90ZS50b1N0cmluZygpO1xyXG4gICAgc2NvcmVJbnB1dFN0YXIudmFsdWUgPSBzY29yZUNhbGN1bGF0b3Iuc3Rhci50b1N0cmluZygpO1xyXG4gICAgc2NvcmVJbnB1dFBlcmNlbnQudmFsdWUgPSAnOTAnO1xyXG4gICAgc2NvcmVJbnB1dEF2Z0N1dC52YWx1ZSA9ICcxMTEnO1xyXG4gICAgc2NvcmVJbnB1dE1pc3NlZC52YWx1ZSA9IG1pc3NlZFNjb3JlLmpvaW4oJywnKTtcclxuICAgIHNjb3JlSW5wdXRCcmVhay52YWx1ZSA9IGJyZWFrU2NvcmUuam9pbignLCcpO1xyXG4gICAgcHBDdXJ2ZVsnY3VzdG9tJ10gPSBfX3NwcmVhZEFycmF5KFtdLCBwcEN1cnZlLnNjb3Jlc2FiZXIsIHRydWUpO1xyXG4gICAgdXBkYXRlU2NvcmUoKTtcclxuICAgIHVwZGF0ZVNjb3JlRXN0KCk7XHJcbiAgICB1cGRhdGVTY29yZVRhYmxlKCk7XHJcbiAgICB1cGRhdGVTY29yZUpTT04oKTtcclxuICAgIHJwZ0lucHV0Um93LnZhbHVlID0gcmFuZFBhdHRlcm5HZW4ucm93LnRvU3RyaW5nKCk7XHJcbiAgICBycGdJbnB1dENvbHVtbi52YWx1ZSA9IHJhbmRQYXR0ZXJuR2VuLmNvbHVtbi50b1N0cmluZygpO1xyXG4gICAgcnBnSW5wdXROUmVkLnZhbHVlID0gJzEnO1xyXG4gICAgcnBnSW5wdXROQmx1ZS52YWx1ZSA9ICcxJztcclxuICAgIHJwZ0lucHV0TkJvbWIudmFsdWUgPSAnMCc7XHJcbiAgICBycGdJbnB1dFRvdGFsLnZhbHVlID0gJzInO1xyXG4gICAgcnBnSW5wdXRQYXJpdHlFeHRlbmQudmFsdWUgPSAnMCc7XHJcbiAgICB0YWJsZVJQYXR0ZXJuKCk7XHJcbn1cclxuZnVuY3Rpb24gdXBkYXRlVmVyc2lvbih0ZXh0KSB7XHJcbiAgICB0ZXh0VmVyc2lvbi5mb3JFYWNoKGZ1bmN0aW9uICh2ZXIpIHtcclxuICAgICAgICB2ZXIudGV4dENvbnRlbnQgPSB0ZXh0O1xyXG4gICAgfSk7XHJcbn1cclxuZnVuY3Rpb24gdXBkYXRlV2F0ZXJtYXJrKHRleHQpIHtcclxuICAgIHRleHRXYXRlcm1hcmsuZm9yRWFjaChmdW5jdGlvbiAod20pIHtcclxuICAgICAgICB3bS50ZXh0Q29udGVudCA9IHRleHQ7XHJcbiAgICB9KTtcclxufVxyXG5mdW5jdGlvbiBlbmFibGVJbnB1dCgpIHtcclxuICAgIGlucHV0VG9nZ2xlLmZvckVhY2goZnVuY3Rpb24gKGlucCkge1xyXG4gICAgICAgIGlucC5kaXNhYmxlZCA9IGZhbHNlO1xyXG4gICAgfSk7XHJcbn1cclxuZnVuY3Rpb24gZGlzYWJsZUlucHV0KCkge1xyXG4gICAgaW5wdXRUb2dnbGUuZm9yRWFjaChmdW5jdGlvbiAoaW5wKSB7XHJcbiAgICAgICAgaW5wLmRpc2FibGVkID0gdHJ1ZTtcclxuICAgIH0pO1xyXG59XHJcbmZ1bmN0aW9uIGlucHV0QlBNSGFuZGxlcihldikge1xyXG4gICAgYnBtLnZhbHVlID0gTWF0aC5hYnMocGFyc2VGbG9hdCh0aGlzLnZhbHVlKSkgfHwgMDtcclxuICAgIGlmIChicG0udmFsdWUgPiAwKSB7XHJcbiAgICAgICAgZWJwbVByZWMudXBkYXRlKCk7XHJcbiAgICAgICAgZW5hYmxlSW5wdXQoKTtcclxuICAgICAgICB1cGRhdGVQcmVjKCk7XHJcbiAgICAgICAgdXBkYXRlRUJQTSgpO1xyXG4gICAgICAgIHVwZGF0ZU5KUygpO1xyXG4gICAgICAgIG5qc091dHB1dE1pblJlYWN0LnRleHRDb250ZW50ID0gcm91bmQoKDYwIC8gYnBtLnZhbHVlKSAqIDEwMDApICsgXCJtc1wiO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgZGlzYWJsZUlucHV0KCk7XHJcbiAgICB9XHJcbiAgICBpZiAoZXYudHlwZSA9PT0gJ2NoYW5nZScpIHtcclxuICAgICAgICB0aGlzLnZhbHVlID0gYnBtLnZhbHVlO1xyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIGlucHV0UHJlY0JlYXRIYW5kbGVyKGV2KSB7XHJcbiAgICBlYnBtUHJlYy5wcmVjQmVhdCA9IE1hdGguYWJzKHBhcnNlRmxvYXQodGhpcy52YWx1ZSkpID4gMCA/IE1hdGguYWJzKHBhcnNlRmxvYXQodGhpcy52YWx1ZSkpIDogMTtcclxuICAgIGlmIChlYnBtUHJlYy5wcmVjQmVhdCA+IDApIHtcclxuICAgICAgICB1cGRhdGVFQlBNKCk7XHJcbiAgICAgICAgZWJwbUlucHV0UHJlY1RpbWUudmFsdWUgPSByb3VuZChlYnBtUHJlYy5wcmVjVGltZSwgMykudG9TdHJpbmcoKTtcclxuICAgICAgICBlYnBtSW5wdXRQcmVjUmVhbFRpbWUudmFsdWUgPSByb3VuZChlYnBtUHJlYy5wcmVjUmVhbFRpbWUsIDEpLnRvU3RyaW5nKCk7XHJcbiAgICB9XHJcbiAgICBpZiAoZXYudHlwZSA9PT0gJ2NoYW5nZScpIHtcclxuICAgICAgICB0aGlzLnZhbHVlID0gcm91bmQoZWJwbVByZWMucHJlY0JlYXQsIDMpLnRvU3RyaW5nKCk7XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gaW5wdXRQcmVjVGltZUhhbmRsZXIoZXYpIHtcclxuICAgIGVicG1QcmVjLnByZWNUaW1lID0gTWF0aC5hYnMocGFyc2VGbG9hdCh0aGlzLnZhbHVlKSkgPiAwID8gTWF0aC5hYnMocGFyc2VGbG9hdCh0aGlzLnZhbHVlKSkgOiAxO1xyXG4gICAgaWYgKGVicG1QcmVjLnByZWNUaW1lID4gMCkge1xyXG4gICAgICAgIHVwZGF0ZUVCUE0oKTtcclxuICAgICAgICBlYnBtSW5wdXRQcmVjQmVhdC52YWx1ZSA9IHJvdW5kKGVicG1QcmVjLnByZWNCZWF0LCAzKS50b1N0cmluZygpO1xyXG4gICAgICAgIGVicG1JbnB1dFByZWNSZWFsVGltZS52YWx1ZSA9IHJvdW5kKGVicG1QcmVjLnByZWNSZWFsVGltZSwgMSkudG9TdHJpbmcoKTtcclxuICAgIH1cclxuICAgIGlmIChldi50eXBlID09PSAnY2hhbmdlJykge1xyXG4gICAgICAgIHRoaXMudmFsdWUgPSByb3VuZChlYnBtUHJlYy5wcmVjVGltZSwgMykudG9TdHJpbmcoKTtcclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiBpbnB1dFByZWNSZWFsVGltZUhhbmRsZXIoZXYpIHtcclxuICAgIGVicG1QcmVjLnByZWNSZWFsVGltZSA9XHJcbiAgICAgICAgTWF0aC5hYnMocGFyc2VGbG9hdCh0aGlzLnZhbHVlKSkgPiAwID8gTWF0aC5hYnMocGFyc2VGbG9hdCh0aGlzLnZhbHVlKSkgOiAxO1xyXG4gICAgaWYgKGVicG1QcmVjLnByZWNSZWFsVGltZSA+IDApIHtcclxuICAgICAgICB1cGRhdGVFQlBNKCk7XHJcbiAgICAgICAgZWJwbUlucHV0UHJlY0JlYXQudmFsdWUgPSByb3VuZChlYnBtUHJlYy5wcmVjQmVhdCwgMykudG9TdHJpbmcoKTtcclxuICAgICAgICBlYnBtSW5wdXRQcmVjVGltZS52YWx1ZSA9IHJvdW5kKGVicG1QcmVjLnByZWNUaW1lLCAzKS50b1N0cmluZygpO1xyXG4gICAgfVxyXG4gICAgaWYgKGV2LnR5cGUgPT09ICdjaGFuZ2UnKSB7XHJcbiAgICAgICAgZWJwbUlucHV0UHJlY1JlYWxUaW1lLnZhbHVlID0gcm91bmQoZWJwbVByZWMucHJlY1JlYWxUaW1lLCAxKS50b1N0cmluZygpO1xyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIGlucHV0RUJQTUhhbmRsZXIoZXYpIHtcclxuICAgIGlmICh0aGlzLmlkID09PSAnZWJwbS1pbnB1dC1lYnBtLW9oaicpIHtcclxuICAgICAgICBlYnBtUHJlYy5lYnBtT0hKID1cclxuICAgICAgICAgICAgTWF0aC5hYnMocGFyc2VGbG9hdCh0aGlzLnZhbHVlKSkgPiAwID8gTWF0aC5hYnMocGFyc2VGbG9hdCh0aGlzLnZhbHVlKSkgOiBicG0udmFsdWU7XHJcbiAgICAgICAgaWYgKGV2LnR5cGUgPT09ICdjaGFuZ2UnKSB7XHJcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSByb3VuZChlYnBtUHJlYy5lYnBtT0hKLCAyKS50b1N0cmluZygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlYnBtSW5wdXRFQlBNU3RyZWFtLnZhbHVlID0gcm91bmQoZWJwbVByZWMuZWJwbVN0cmVhbSwgMikudG9TdHJpbmcoKTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLmlkID09PSAnZWJwbS1pbnB1dC1lYnBtLXN0cmVhbScpIHtcclxuICAgICAgICBlYnBtUHJlYy5lYnBtU3RyZWFtID1cclxuICAgICAgICAgICAgTWF0aC5hYnMocGFyc2VGbG9hdCh0aGlzLnZhbHVlKSkgPiAwID8gTWF0aC5hYnMocGFyc2VGbG9hdCh0aGlzLnZhbHVlKSkgOiBicG0udmFsdWU7XHJcbiAgICAgICAgaWYgKGV2LnR5cGUgPT09ICdjaGFuZ2UnKSB7XHJcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSByb3VuZChlYnBtUHJlYy5lYnBtU3RyZWFtLCAyKS50b1N0cmluZygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlYnBtSW5wdXRFQlBNT0hKLnZhbHVlID0gcm91bmQoZWJwbVByZWMuZWJwbU9ISiwgMikudG9TdHJpbmcoKTtcclxuICAgIH1cclxuICAgIHVwZGF0ZVByZWMoKTtcclxufVxyXG5mdW5jdGlvbiB1cGRhdGVQcmVjKCkge1xyXG4gICAgZWJwbUlucHV0UHJlY0JlYXQudmFsdWUgPSByb3VuZChlYnBtUHJlYy5wcmVjQmVhdCwgMykudG9TdHJpbmcoKTtcclxuICAgIGVicG1JbnB1dFByZWNUaW1lLnZhbHVlID0gcm91bmQoZWJwbVByZWMucHJlY1RpbWUsIDMpLnRvU3RyaW5nKCk7XHJcbiAgICBlYnBtSW5wdXRQcmVjUmVhbFRpbWUudmFsdWUgPSByb3VuZChlYnBtUHJlYy5wcmVjUmVhbFRpbWUsIDEpLnRvU3RyaW5nKCk7XHJcbn1cclxuZnVuY3Rpb24gdXBkYXRlRUJQTSgpIHtcclxuICAgIGVicG1JbnB1dEVCUE1PSEoudmFsdWUgPSByb3VuZChlYnBtUHJlYy5lYnBtT0hKLCAyKS50b1N0cmluZygpO1xyXG4gICAgZWJwbUlucHV0RUJQTVN0cmVhbS52YWx1ZSA9IHJvdW5kKGVicG1QcmVjLmVicG1TdHJlYW0sIDIpLnRvU3RyaW5nKCk7XHJcbn1cclxuZnVuY3Rpb24gaW5wdXROSlNIYW5kbGVyKGV2KSB7XHJcbiAgICBub3RlSnVtcFNwZWVkLm5qcyA9XHJcbiAgICAgICAgTWF0aC5hYnMocGFyc2VGbG9hdCh0aGlzLnZhbHVlKSkgPiAwID8gTWF0aC5hYnMocGFyc2VGbG9hdCh0aGlzLnZhbHVlKSkgOiBub3RlSnVtcFNwZWVkLm5qcztcclxuICAgIHVwZGF0ZU5KUygpO1xyXG4gICAgaWYgKGV2LnR5cGUgPT09ICdjaGFuZ2UnKSB7XHJcbiAgICAgICAgdGhpcy52YWx1ZSA9IHJvdW5kKG5vdGVKdW1wU3BlZWQubmpzLCAzKTtcclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiBpbnB1dE5KU09mZnNldEhhbmRsZXIoZXYpIHtcclxuICAgIG5vdGVKdW1wU3BlZWQub2Zmc2V0ID0gcGFyc2VGbG9hdCh0aGlzLnZhbHVlKSB8fCAwO1xyXG4gICAgdXBkYXRlTkpTKCk7XHJcbiAgICBpZiAoZXYudHlwZSA9PT0gJ2NoYW5nZScpIHtcclxuICAgICAgICB0aGlzLnZhbHVlID0gcm91bmQobm90ZUp1bXBTcGVlZC5vZmZzZXQsIDMpO1xyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIGlucHV0SEpESGFuZGxlcihldikge1xyXG4gICAgbm90ZUp1bXBTcGVlZC5vZmZzZXQgPVxyXG4gICAgICAgIE1hdGgubWF4KE1hdGguYWJzKHBhcnNlRmxvYXQodGhpcy52YWx1ZSkpLCBub3RlSnVtcFNwZWVkLmhqZE1pbikgLVxyXG4gICAgICAgICAgICBub3RlSnVtcFNwZWVkLmNhbGNIYWxmSnVtcER1cmF0aW9uUmF3KCk7XHJcbiAgICBuanNJbnB1dE9mZnNldC52YWx1ZSA9IHJvdW5kKG5vdGVKdW1wU3BlZWQub2Zmc2V0LCAzKS50b1N0cmluZygpO1xyXG4gICAgbmpzSW5wdXRKRC52YWx1ZSA9IHJvdW5kKG5vdGVKdW1wU3BlZWQuamQsIDMpLnRvU3RyaW5nKCk7XHJcbiAgICBuanNJbnB1dFJlYWN0LnZhbHVlID0gcm91bmQobm90ZUp1bXBTcGVlZC5yZWFjdFRpbWUgKiAxMDAwKS50b1N0cmluZygpO1xyXG4gICAgbmpzT3V0cHV0SkQudGV4dENvbnRlbnQgPSByb3VuZChub3RlSnVtcFNwZWVkLmpkTWluLCAyKS50b1N0cmluZygpO1xyXG4gICAgaWYgKGV2LnR5cGUgPT09ICdjaGFuZ2UnKSB7XHJcbiAgICAgICAgdGhpcy52YWx1ZSA9IHJvdW5kKG5vdGVKdW1wU3BlZWQuaGpkLCAzKS50b1N0cmluZygpO1xyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIGlucHV0SkRIYW5kbGVyKGV2KSB7XHJcbiAgICB2YXIgamQgPSBNYXRoLmFicyhwYXJzZUZsb2F0KHRoaXMudmFsdWUpKSA+IDAgPyBNYXRoLmFicyhwYXJzZUZsb2F0KHRoaXMudmFsdWUpKSA6IG5vdGVKdW1wU3BlZWQuamQ7XHJcbiAgICBpZiAobmpzU2VsZWN0U2NhbGUudmFsdWUgPT09ICdoamQnKSB7XHJcbiAgICAgICAgamQgPSBNYXRoLm1heChqZCwgbm90ZUp1bXBTcGVlZC5qZE1pbik7XHJcbiAgICAgICAgbm90ZUp1bXBTcGVlZC5vZmZzZXQgPVxyXG4gICAgICAgICAgICBub3RlSnVtcFNwZWVkLmNhbGNIYWxmSnVtcER1cmF0aW9uRnJvbUpEKGpkKSAtIG5vdGVKdW1wU3BlZWQuY2FsY0hhbGZKdW1wRHVyYXRpb25SYXcoKTtcclxuICAgIH1cclxuICAgIGlmIChuanNTZWxlY3RTY2FsZS52YWx1ZSA9PT0gJ25qcycpIHtcclxuICAgICAgICBub3RlSnVtcFNwZWVkLm5qcyA9IGpkIC8gKDIgKiBub3RlSnVtcFNwZWVkLmNhbGNSZWFjdGlvblRpbWVISkQoKSk7XHJcbiAgICB9XHJcbiAgICBuanNJbnB1dEhKRC52YWx1ZSA9IHJvdW5kKG5vdGVKdW1wU3BlZWQuaGpkLCAzKS50b1N0cmluZygpO1xyXG4gICAgbmpzSW5wdXRSZWFjdC52YWx1ZSA9IHJvdW5kKG5vdGVKdW1wU3BlZWQucmVhY3RUaW1lICogMTAwMCkudG9TdHJpbmcoKTtcclxuICAgIG5qc091dHB1dEpELnRleHRDb250ZW50ID0gcm91bmQobm90ZUp1bXBTcGVlZC5qZE1pbiwgMikudG9TdHJpbmcoKTtcclxuICAgIG5qc0lucHV0TkpTLnZhbHVlID0gcm91bmQobm90ZUp1bXBTcGVlZC5uanMsIDMpLnRvU3RyaW5nKCk7XHJcbiAgICBuanNJbnB1dE9mZnNldC52YWx1ZSA9IHJvdW5kKG5vdGVKdW1wU3BlZWQub2Zmc2V0LCAzKS50b1N0cmluZygpO1xyXG4gICAgaWYgKGV2LnR5cGUgPT09ICdjaGFuZ2UnKSB7XHJcbiAgICAgICAgdGhpcy52YWx1ZSA9IHJvdW5kKG5vdGVKdW1wU3BlZWQuamQsIDIpLnRvU3RyaW5nKCk7XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gaW5wdXRSZWFjdFRpbWVIYW5kbGVyKGV2KSB7XHJcbiAgICB2YXIgcmVhY3RUaW1lID0gTWF0aC5tYXgoTWF0aC5hYnMocGFyc2VGbG9hdCh0aGlzLnZhbHVlKSkgLyAxMDAwID4gMFxyXG4gICAgICAgID8gTWF0aC5hYnMocGFyc2VGbG9hdCh0aGlzLnZhbHVlKSkgLyAxMDAwXHJcbiAgICAgICAgOiBub3RlSnVtcFNwZWVkLmNhbGNSZWFjdGlvblRpbWVISkQoKSwgbm90ZUp1bXBTcGVlZC5jYWxjUmVhY3Rpb25UaW1lSEpEKG5vdGVKdW1wU3BlZWQuaGpkTWluKSk7XHJcbiAgICBub3RlSnVtcFNwZWVkLm9mZnNldCA9IHJlYWN0VGltZSAvICg2MCAvIGJwbS52YWx1ZSkgLSBub3RlSnVtcFNwZWVkLmNhbGNIYWxmSnVtcER1cmF0aW9uUmF3KCk7XHJcbiAgICBuanNJbnB1dEhKRC52YWx1ZSA9IHJvdW5kKG5vdGVKdW1wU3BlZWQuaGpkLCAzKS50b1N0cmluZygpO1xyXG4gICAgbmpzSW5wdXRKRC52YWx1ZSA9IHJvdW5kKG5vdGVKdW1wU3BlZWQuamQsIDIpLnRvU3RyaW5nKCk7XHJcbiAgICBuanNPdXRwdXRKRC50ZXh0Q29udGVudCA9IHJvdW5kKG5vdGVKdW1wU3BlZWQuamRNaW4sIDIpLnRvU3RyaW5nKCk7XHJcbiAgICBuanNJbnB1dE9mZnNldC52YWx1ZSA9IHJvdW5kKG5vdGVKdW1wU3BlZWQub2Zmc2V0LCAzKS50b1N0cmluZygpO1xyXG4gICAgaWYgKGV2LnR5cGUgPT09ICdjaGFuZ2UnKSB7XHJcbiAgICAgICAgdGhpcy52YWx1ZSA9IHJvdW5kKG5vdGVKdW1wU3BlZWQucmVhY3RUaW1lICogMTAwMCkudG9TdHJpbmcoKTtcclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiB1cGRhdGVOSlMoKSB7XHJcbiAgICBub3RlSnVtcFNwZWVkLnVwZGF0ZSgpO1xyXG4gICAgbmpzSW5wdXRISkQudmFsdWUgPSByb3VuZChub3RlSnVtcFNwZWVkLmhqZCwgMykudG9TdHJpbmcoKTtcclxuICAgIG5qc0lucHV0SkQudmFsdWUgPSByb3VuZChub3RlSnVtcFNwZWVkLmpkLCAyKS50b1N0cmluZygpO1xyXG4gICAgbmpzSW5wdXRSZWFjdC52YWx1ZSA9IHJvdW5kKG5vdGVKdW1wU3BlZWQucmVhY3RUaW1lICogMTAwMCkudG9TdHJpbmcoKTtcclxuICAgIG5qc091dHB1dEpET0hpZ2gudGV4dENvbnRlbnQgPSByb3VuZChub3RlSnVtcFNwZWVkLmNhbGNKdW1wRGlzdGFuY2VPcHRpbWFsSGlnaCgpLCAyKS50b1N0cmluZygpO1xyXG4gICAgbmpzT3V0cHV0SkRPTG93LnRleHRDb250ZW50ID0gcm91bmQobm90ZUp1bXBTcGVlZC5jYWxjSnVtcERpc3RhbmNlT3B0aW1hbExvdygpLCAyKS50b1N0cmluZygpO1xyXG4gICAgbmpzT3V0cHV0SkQudGV4dENvbnRlbnQgPSByb3VuZChub3RlSnVtcFNwZWVkLmpkTWluLCAyKS50b1N0cmluZygpO1xyXG59XHJcbmZ1bmN0aW9uIGlucHV0Tm90ZUhhbmRsZXIoZXYpIHtcclxuICAgIHNjb3JlQ2FsY3VsYXRvci5ub3RlID0gcGFyc2VJbnQodGhpcy52YWx1ZSkgfHwgMDtcclxuICAgIHVwZGF0ZVNjb3JlKCk7XHJcbiAgICB1cGRhdGVTY29yZUVzdCgpO1xyXG4gICAgdXBkYXRlU2NvcmVUYWJsZSgpO1xyXG4gICAgaWYgKGV2LnR5cGUgPT09ICdjaGFuZ2UnKSB7XHJcbiAgICAgICAgdGhpcy52YWx1ZSA9IHNjb3JlQ2FsY3VsYXRvci5ub3RlLnRvU3RyaW5nKCk7XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gaW5wdXRTdGFySGFuZGxlcihldikge1xyXG4gICAgc2NvcmVDYWxjdWxhdG9yLnN0YXIgPSBwYXJzZUZsb2F0KHRoaXMudmFsdWUpIHx8IDA7XHJcbiAgICB1cGRhdGVTY29yZSgpO1xyXG4gICAgdXBkYXRlU2NvcmVFc3QoKTtcclxuICAgIHVwZGF0ZVNjb3JlVGFibGUoKTtcclxuICAgIGlmIChldi50eXBlID09PSAnY2hhbmdlJykge1xyXG4gICAgICAgIHRoaXMudmFsdWUgPSByb3VuZChzY29yZUNhbGN1bGF0b3Iuc3RhciwgMikudG9TdHJpbmcoKTtcclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiBpbnB1dFBlcmNlbnRIYW5kbGVyKGV2KSB7XHJcbiAgICB1cGRhdGVTY29yZSgpO1xyXG4gICAgdXBkYXRlU2NvcmVUYWJsZSgpO1xyXG4gICAgaWYgKGV2LnR5cGUgPT09ICdjaGFuZ2UnKSB7XHJcbiAgICAgICAgdGhpcy52YWx1ZSA9IHJvdW5kKHBhcnNlRmxvYXQodGhpcy52YWx1ZSksIDIpLnRvU3RyaW5nKCk7XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gaW5wdXRTY29yZUhhbmRsZXIoZXYpIHtcclxuICAgIHZhciBzY29yZSA9IHBhcnNlSW50KHRoaXMudmFsdWUpO1xyXG4gICAgdmFyIG1heFNjb3JlID0gc2NvcmVDYWxjdWxhdG9yLmNhbGNTY29yZSgpO1xyXG4gICAgc2NvcmVJbnB1dFBlcmNlbnQudmFsdWUgPSByb3VuZCgoc2NvcmUgLyBtYXhTY29yZSkgKiAxMDAsIDIpLnRvU3RyaW5nKCk7XHJcbiAgICBzY29yZUlucHV0UFAudmFsdWUgPSByb3VuZChzY29yZUNhbGN1bGF0b3IuY2FsY1BQKHNjb3JlQ2FsY3VsYXRvci5zdGFyLCBwYXJzZUZsb2F0KHNjb3JlSW5wdXRQZXJjZW50LnZhbHVlKSAvIDEwMCksIDIpLnRvU3RyaW5nKCk7XHJcbiAgICBpZiAoZXYudHlwZSA9PT0gJ2NoYW5nZScpIHtcclxuICAgICAgICB0aGlzLnZhbHVlID0gc2NvcmUudG9TdHJpbmcoKTtcclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiBpbnB1dEF2Z0N1dEhhbmRsZXIoZXYpIHtcclxuICAgIHVwZGF0ZVNjb3JlRXN0KCk7XHJcbiAgICBpZiAoZXYudHlwZSA9PT0gJ2NoYW5nZScpIHtcclxuICAgICAgICB0aGlzLnZhbHVlID0gcm91bmQocGFyc2VGbG9hdCh0aGlzLnZhbHVlKSwgMikudG9TdHJpbmcoKTtcclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiBpbnB1dE1pc3NCcmVha0hhbmRsZXIoZXYpIHtcclxuICAgIHZhciB0ZW1wID0gdGhpcy52YWx1ZS50cmltKCkucmVwbGFjZSgvXFxzKywvLCAnLCcpO1xyXG4gICAgaWYgKC9eKChcXGQrXFwuKT9cXGQrLD8pKy8udGVzdCh0ZW1wKSB8fCB0ZW1wID09PSAnJykge1xyXG4gICAgICAgIHZhciB0ZW1wMiA9IHRlbXBcclxuICAgICAgICAgICAgLnNwbGl0KCcsJylcclxuICAgICAgICAgICAgLm1hcChmdW5jdGlvbiAoeCkgeyByZXR1cm4gcGFyc2VJbnQoeCk7IH0pXHJcbiAgICAgICAgICAgIC5maWx0ZXIoZnVuY3Rpb24gKHgpIHsgcmV0dXJuICFpc05hTih4KTsgfSlcclxuICAgICAgICAgICAgLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHsgcmV0dXJuIGEgLSBiOyB9KTtcclxuICAgICAgICB0aGlzLnZhbHVlID0gdGVtcDIuam9pbignLCcpLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgdXBkYXRlU2NvcmVFc3QoKTtcclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiBpbnB1dFRhYmxlUGVyY2VudEhhbmRsZXIoZXYpIHtcclxuICAgIHZhciB0ZW1wID0gdGhpcy52YWx1ZS50cmltKCkucmVwbGFjZSgvXFxzKywvLCAnLCcpO1xyXG4gICAgaWYgKC9eKChcXGQrXFwuKT9cXGQrLD8pKy8udGVzdCh0ZW1wKSkge1xyXG4gICAgICAgIHZhciB0ZW1wMiA9IHRlbXBcclxuICAgICAgICAgICAgLnNwbGl0KCcsJylcclxuICAgICAgICAgICAgLm1hcChmdW5jdGlvbiAoeCkgeyByZXR1cm4gcGFyc2VGbG9hdCh4KTsgfSlcclxuICAgICAgICAgICAgLmZpbHRlcihmdW5jdGlvbiAoeCkgeyByZXR1cm4gIWlzTmFOKHgpOyB9KVxyXG4gICAgICAgICAgICAuc29ydChmdW5jdGlvbiAoYSwgYikgeyByZXR1cm4gYiAtIGE7IH0pO1xyXG4gICAgICAgIHRoaXMudmFsdWUgPSB0ZW1wMi50b1N0cmluZygpO1xyXG4gICAgICAgIHVwZGF0ZVNjb3JlVGFibGUoKTtcclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiB1cGRhdGVTY29yZSgpIHtcclxuICAgIHNjb3JlSW5wdXRTY29yZS52YWx1ZSA9IHJvdW5kKHNjb3JlQ2FsY3VsYXRvci5jYWxjU2NvcmUoKSAqIChwYXJzZUZsb2F0KHNjb3JlSW5wdXRQZXJjZW50LnZhbHVlKSAvIDEwMCkpLnRvU3RyaW5nKCk7XHJcbiAgICBzY29yZUlucHV0UFAudmFsdWUgPSByb3VuZChzY29yZUNhbGN1bGF0b3IuY2FsY1BQKHNjb3JlQ2FsY3VsYXRvci5zdGFyLCBwYXJzZUZsb2F0KHNjb3JlSW5wdXRQZXJjZW50LnZhbHVlKSAvIDEwMCksIDIpLnRvU3RyaW5nKCk7XHJcbiAgICBzY29yZU91dHB1dE1heFNjb3JlLnRleHRDb250ZW50ID0gZm9ybWF0TnVtYmVyKHNjb3JlQ2FsY3VsYXRvci5jYWxjU2NvcmUoKSk7XHJcbiAgICBzY29yZU91dHB1dE1heFNjb3JlTW9kLnRleHRDb250ZW50ID0gZm9ybWF0TnVtYmVyKHNjb3JlQ2FsY3VsYXRvci5jYWxjU2NvcmUoKSk7XHJcbn1cclxuZnVuY3Rpb24gdXBkYXRlU2NvcmVFc3QoKSB7XHJcbiAgICB2YXIgbWlzc2VkU2NvcmUgPSBzY29yZUlucHV0TWlzc2VkLnZhbHVlLnNwbGl0KCcsJykubWFwKGZ1bmN0aW9uICh4KSB7IHJldHVybiBwYXJzZUludCh4KTsgfSkgfHwgW107XHJcbiAgICB2YXIgYnJlYWtTY29yZSA9IHNjb3JlSW5wdXRCcmVhay52YWx1ZS5zcGxpdCgnLCcpLm1hcChmdW5jdGlvbiAoeCkgeyByZXR1cm4gcGFyc2VJbnQoeCk7IH0pIHx8IFtdO1xyXG4gICAgdmFyIG1heFNjb3JlID0gc2NvcmVDYWxjdWxhdG9yLmNhbGNTY29yZSgpO1xyXG4gICAgdmFyIGVzdFNjb3JlID0gc2NvcmVDYWxjdWxhdG9yLmNhbGNTY29yZShwYXJzZUZsb2F0KHNjb3JlSW5wdXRBdmdDdXQudmFsdWUpLCB1bmRlZmluZWQsIG1pc3NlZFNjb3JlLCBicmVha1Njb3JlKTtcclxuICAgIHZhciBub01pc3NTY29yZSA9IHNjb3JlQ2FsY3VsYXRvci5jYWxjU2NvcmUocGFyc2VGbG9hdChzY29yZUlucHV0QXZnQ3V0LnZhbHVlKSk7XHJcbiAgICBzY29yZU91dHB1dEVzdFNjb3JlLnRleHRDb250ZW50ID0gZm9ybWF0TnVtYmVyKHJvdW5kKGVzdFNjb3JlKSk7XHJcbiAgICBzY29yZU91dHB1dEVzdFBlcmNlbnQudGV4dENvbnRlbnQgPSByb3VuZCgoZXN0U2NvcmUgLyBtYXhTY29yZSkgKiAxMDAsIDIpLnRvU3RyaW5nKCk7XHJcbiAgICBzY29yZU91dHB1dEVzdFBQLnRleHRDb250ZW50ID0gcm91bmQoc2NvcmVDYWxjdWxhdG9yLmNhbGNQUChzY29yZUNhbGN1bGF0b3Iuc3RhciwgZXN0U2NvcmUgLyBtYXhTY29yZSksIDIpLnRvU3RyaW5nKCk7XHJcbiAgICBzY29yZU91dHB1dE1pc3NTY29yZS50ZXh0Q29udGVudCA9IGZvcm1hdE51bWJlcihyb3VuZChub01pc3NTY29yZSAtIGVzdFNjb3JlKSk7XHJcbiAgICBzY29yZU91dHB1dE5vTWlzc1Njb3JlLnRleHRDb250ZW50ID0gZm9ybWF0TnVtYmVyKHJvdW5kKG5vTWlzc1Njb3JlKSk7XHJcbiAgICBzY29yZU91dHB1dE5vTWlzc1BlcmNlbnQudGV4dENvbnRlbnQgPSByb3VuZCgobm9NaXNzU2NvcmUgLyBtYXhTY29yZSkgKiAxMDAsIDIpLnRvU3RyaW5nKCk7XHJcbiAgICBzY29yZU91dHB1dE5vTWlzc1BQLnRleHRDb250ZW50ID0gcm91bmQoc2NvcmVDYWxjdWxhdG9yLmNhbGNQUChzY29yZUNhbGN1bGF0b3Iuc3Rhciwgbm9NaXNzU2NvcmUgLyBtYXhTY29yZSksIDIpLnRvU3RyaW5nKCk7XHJcbn1cclxuZnVuY3Rpb24gdXBkYXRlU2NvcmVUYWJsZSgpIHtcclxuICAgIHNjb3JlVGFibGUuaW5uZXJIVE1MID0gJzx0cj48dGg+UGVyY2VudGFnZTwvdGg+PHRoPlNjb3JlPC90aD48dGg+UFA8L3RoPjwvdHI+JztcclxuICAgIHZhciBzY29yZVBlcmMgPSBzY29yZVRhYmxlUGVyY2VudC52YWx1ZS5zcGxpdCgnLCcpLm1hcChmdW5jdGlvbiAoeCkgeyByZXR1cm4gcGFyc2VGbG9hdCh4KTsgfSk7XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNjb3JlUGVyYy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHZhciBlbGVtUm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndHInKTtcclxuICAgICAgICB2YXIgZWxlbVBlcmMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZCcpO1xyXG4gICAgICAgIHZhciBlbGVtU2NvcmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZCcpO1xyXG4gICAgICAgIHZhciBlbGVtUFAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZCcpO1xyXG4gICAgICAgIGVsZW1QZXJjLnRleHRDb250ZW50ID0gcm91bmQoc2NvcmVQZXJjW2ldLCAyKS50b1N0cmluZygpO1xyXG4gICAgICAgIGVsZW1TY29yZS50ZXh0Q29udGVudCA9IGZvcm1hdE51bWJlcihyb3VuZChzY29yZUNhbGN1bGF0b3IuY2FsY1Njb3JlKCkgKiAoc2NvcmVQZXJjW2ldIC8gMTAwKSkpO1xyXG4gICAgICAgIGVsZW1QUC50ZXh0Q29udGVudCA9IHJvdW5kKHNjb3JlQ2FsY3VsYXRvci5jYWxjUFAoc2NvcmVDYWxjdWxhdG9yLnN0YXIsIHNjb3JlUGVyY1tpXSAvIDEwMCksIDIpLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgZWxlbVJvdy5hcHBlbmRDaGlsZChlbGVtUGVyYyk7XHJcbiAgICAgICAgZWxlbVJvdy5hcHBlbmRDaGlsZChlbGVtU2NvcmUpO1xyXG4gICAgICAgIGVsZW1Sb3cuYXBwZW5kQ2hpbGQoZWxlbVBQKTtcclxuICAgICAgICBzY29yZVRhYmxlLmFwcGVuZENoaWxkKGVsZW1Sb3cpO1xyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIG9wdGlvblNjb3JlQ3VydmVIYW5kbGVyKCkge1xyXG4gICAgc2NvcmVDYWxjdWxhdG9yLmN1cnZlUG9pbnRzID0gcHBDdXJ2ZVt0aGlzLnZhbHVlXTtcclxuICAgIHNjb3JlVGV4dEFyZWFKU09OLmRpc2FibGVkID0gdHJ1ZTtcclxuICAgIGlmICh0aGlzLnZhbHVlID09PSAnY3VzdG9tJykge1xyXG4gICAgICAgIHNjb3JlVGV4dEFyZWFKU09OLmRpc2FibGVkID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICB1cGRhdGVTY29yZSgpO1xyXG4gICAgdXBkYXRlU2NvcmVFc3QoKTtcclxuICAgIHVwZGF0ZVNjb3JlVGFibGUoKTtcclxuICAgIHVwZGF0ZVNjb3JlSlNPTigpO1xyXG59XHJcbmZ1bmN0aW9uIGlucHV0SlNPTlNjb3JlSGFuZGxlcigpIHtcclxuICAgIHZhciBwYXJzZWRKU09OID0ge307XHJcbiAgICBjcEVycm9ySlNPTi5pbm5lckhUTUwgPSAnJztcclxuICAgIHRyeSB7XHJcbiAgICAgICAgaWYgKC9eey8udGVzdCh0aGlzLnZhbHVlLnRyaW0oKSkpIHtcclxuICAgICAgICAgICAgcGFyc2VkSlNPTiA9IEpTT04ucGFyc2UodGhpcy52YWx1ZS50cmltKCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcGFyc2VkSlNPTiA9IEpTT04ucGFyc2UoXCJ7XCIgKyB0aGlzLnZhbHVlLnRyaW0oKS5yZXBsYWNlKC9cXCwkLywgJycpICsgXCJ9XCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzY29yZUNhbGN1bGF0b3IuY3VydmVQb2ludHMgPSBwYXJzZWRKU09OLmN1cnZlUG9pbnRzO1xyXG4gICAgICAgIHBwQ3VydmVbJ2N1c3RvbSddID0gcGFyc2VkSlNPTi5jdXJ2ZVBvaW50cztcclxuICAgIH1cclxuICAgIGNhdGNoIChlcnIpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XHJcbiAgICAgICAgc2NvcmVFcnJvckpTT04uaW5uZXJIVE1MID0gZXJyICsgJzxicj4nO1xyXG4gICAgfVxyXG4gICAgdXBkYXRlU2NvcmUoKTtcclxuICAgIHVwZGF0ZVNjb3JlRXN0KCk7XHJcbiAgICB1cGRhdGVTY29yZVRhYmxlKCk7XHJcbiAgICB1cGRhdGVTY29yZUpTT04oKTtcclxufVxyXG5mdW5jdGlvbiB1cGRhdGVTY29yZUpTT04oKSB7XHJcbiAgICB2YXIgcGFyc2VkID0ge1xyXG4gICAgICAgIGN1cnZlUG9pbnRzOiBfX3NwcmVhZEFycmF5KFtdLCBzY29yZUNhbGN1bGF0b3IuY3VydmVQb2ludHMsIHRydWUpLnJldmVyc2UoKSxcclxuICAgIH07XHJcbiAgICBzY29yZVRleHRBcmVhSlNPTi52YWx1ZSA9IEpTT04uc3RyaW5naWZ5KHBhcnNlZCwgbnVsbCwgNCk7XHJcbn1cclxuZnVuY3Rpb24gaW5wdXRTUFNIYW5kbGVySGFuZGxlcihldikge1xyXG4gICAgdmFyIGRpZmZOYW1lID0gdGhpcy5pZC5zbGljZSgxMCk7XHJcbiAgICBzd2luZ1BlclNlY29uZC5kaWZmaWN1bHR5W2RpZmZOYW1lXSA9IHRoaXMudmFsdWVcclxuICAgICAgICA/IE1hdGguYWJzKHBhcnNlRmxvYXQodGhpcy52YWx1ZS50cmltKCkpKVxyXG4gICAgICAgIDogbnVsbDtcclxuICAgIHZhciBwcmV2RGlmZiA9IG51bGw7XHJcbiAgICBmb3IgKHZhciBkIGluIHN3aW5nUGVyU2Vjb25kLmRpZmZpY3VsdHkpIHtcclxuICAgICAgICBpZiAoc3dpbmdQZXJTZWNvbmQuZGlmZmljdWx0eVtkXSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBpZiAocHJldkRpZmYgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHNwc091dHB1dFtwcmV2RGlmZl0udGV4dENvbnRlbnQgPSAoc3dpbmdQZXJTZWNvbmQuZGlmZmljdWx0eVtkXSAhPT0gMFxyXG4gICAgICAgICAgICAgICAgICAgID8gc3dpbmdQZXJTZWNvbmQuY2FsY0RpZmZlcmVuY2UoZCwgcHJldkRpZmYpLnRvRml4ZWQoMilcclxuICAgICAgICAgICAgICAgICAgICA6ICdJbmZpbml0eScpICsgXCIlXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcHJldkRpZmYgPSBkO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzcHNPdXRwdXRbZF0udGV4dENvbnRlbnQgPSAnJztcclxuICAgIH1cclxuICAgIHNwc091dHB1dFRvdGFsLnRleHRDb250ZW50ID0gc3dpbmdQZXJTZWNvbmQuZ2V0VG90YWxSZWR1Y3Rpb24oKS50b0ZpeGVkKDIpICsgXCIlXCI7XHJcbiAgICBpZiAoZXYudHlwZSA9PT0gJ2NoYW5nZScpIHtcclxuICAgICAgICBpZiAoc3dpbmdQZXJTZWNvbmQuZGlmZmljdWx0eVtkaWZmTmFtZV0gIT09IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHJvdW5kKHN3aW5nUGVyU2Vjb25kLmRpZmZpY3VsdHlbZGlmZk5hbWVdLCAyKS50b1N0cmluZygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiBpbnB1dExhYmVsVGV4dEhhbmRsZXIoZXYpIHtcclxuICAgIGlmICh0aGlzLnZhbHVlLnRyaW0oKSAhPT0gJycpIHtcclxuICAgICAgICBsYWJlbE91dHB1dFRleHQudGV4dENvbnRlbnQgPSB0aGlzLnZhbHVlLnRyaW0oKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGxhYmVsT3V0cHV0VGV4dC50ZXh0Q29udGVudCA9ICdub25lJztcclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiBpbnB1dERpZmZDb3VudEhhbmRsZXIoZXYpIHtcclxuICAgIGxhYmVsT3V0cHV0VGV4dC5jbGFzc05hbWUgPSBcImRpZmYtbGFiZWwgZGlmZi1jb3VudC1cIiArIHBhcnNlSW50KHRoaXMudmFsdWUpO1xyXG59XHJcbmZ1bmN0aW9uIG9wdGlvbkNvbG9yU2NoZW1lSGFuZGxlcigpIHtcclxuICAgIGlmICh0aGlzLnZhbHVlICE9PSBjcEN1c3RvbVRleHQpIHtcclxuICAgICAgICBmb3IgKHZhciBvYmogaW4gY29sb3JQaWNrZXIuY29sb3JTY2hlbWUpIHtcclxuICAgICAgICAgICAgY3BJbnB1dEhleFtvYmpdLnZhbHVlID0gJyc7XHJcbiAgICAgICAgICAgIGNwSW5wdXRQaWNrZXJbb2JqXS52YWx1ZSA9ICcjMDAwMDAwJztcclxuICAgICAgICAgICAgY3BJbnB1dEluY2x1ZGVbb2JqXS5jaGVja2VkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGNwSW5wdXRSZXNldFtvYmpdLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbG9yUGlja2VyLmVudmlyb25tZW50Q29sb3IgPSB0aGlzLnZhbHVlO1xyXG4gICAgICAgIGZvciAodmFyIG9iaiBpbiBjb2xvclBpY2tlci5jb2xvclNjaGVtZSkge1xyXG4gICAgICAgICAgICBpZiAoY29sb3JQaWNrZXIuY29sb3JTY2hlbWVbb2JqXSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGhleENvbG9yID0gY29sb3JQaWNrZXIuZ2V0Q29sb3JIZXgoY29sb3JQaWNrZXIuY29sb3JTY2hlbWVbb2JqXSk7XHJcbiAgICAgICAgICAgICAgICBjcElucHV0SGV4W29ial0udmFsdWUgPSBoZXhDb2xvcjtcclxuICAgICAgICAgICAgICAgIGNwSW5wdXRQaWNrZXJbb2JqXS52YWx1ZSA9IGhleENvbG9yO1xyXG4gICAgICAgICAgICAgICAgY3BJbnB1dEluY2x1ZGVbb2JqXS5jaGVja2VkID0gY29sb3JQaWNrZXIuY29sb3JTY2hlbWVbb2JqXSA/IHRydWUgOiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGNwSW5wdXRSZXNldFtvYmpdLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHVwZGF0ZUNvbG9ySlNPTigpO1xyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIGlucHV0SlNPTkNvbG9ySGFuZGxlcigpIHtcclxuICAgIGZvciAodmFyIG9iaiBpbiBjb2xvclBpY2tlci5jb2xvclNjaGVtZSkge1xyXG4gICAgICAgIGNwSW5wdXRIZXhbb2JqXS52YWx1ZSA9ICcnO1xyXG4gICAgICAgIGNwSW5wdXRQaWNrZXJbb2JqXS52YWx1ZSA9ICcjMDAwMDAwJztcclxuICAgICAgICBjcElucHV0SW5jbHVkZVtvYmpdLmNoZWNrZWQgPSBmYWxzZTtcclxuICAgICAgICBjcElucHV0UmVzZXRbb2JqXS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgfVxyXG4gICAgY3BFcnJvckpTT04uaW5uZXJIVE1MID0gJyc7XHJcbiAgICB2YXIgY29sb3JUeXBlID0gW1xyXG4gICAgICAgICdfY29sb3JMZWZ0JyxcclxuICAgICAgICAnX2NvbG9yUmlnaHQnLFxyXG4gICAgICAgICdfZW52Q29sb3JMZWZ0JyxcclxuICAgICAgICAnX2VudkNvbG9yUmlnaHQnLFxyXG4gICAgICAgICdfZW52Q29sb3JMZWZ0Qm9vc3QnLFxyXG4gICAgICAgICdfZW52Q29sb3JSaWdodEJvb3N0JyxcclxuICAgICAgICAnX29ic3RhY2xlQ29sb3InLFxyXG4gICAgXTtcclxuICAgIHZhciBwYXJzZWRKU09OID0ge307XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGlmICgvXnsvLnRlc3QodGhpcy52YWx1ZS50cmltKCkpKSB7XHJcbiAgICAgICAgICAgIHBhcnNlZEpTT04gPSBKU09OLnBhcnNlKHRoaXMudmFsdWUudHJpbSgpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHBhcnNlZEpTT04gPSBKU09OLnBhcnNlKFwie1wiICsgdGhpcy52YWx1ZS50cmltKCkucmVwbGFjZSgvXFwsJC8sICcnKSArIFwifVwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xyXG4gICAgICAgIGNwRXJyb3JKU09OLmlubmVySFRNTCA9IGVyciArICc8YnI+JztcclxuICAgIH1cclxuICAgIGZvciAodmFyIG9iaiBpbiBwYXJzZWRKU09OKSB7XHJcbiAgICAgICAgaWYgKGNvbG9yVHlwZS5pbmNsdWRlcyhvYmopKSB7XHJcbiAgICAgICAgICAgIGNvbG9yUGlja2VyLmNvbG9yU2NoZW1lW29ial0gPSBwYXJzZWRKU09OW29ial07XHJcbiAgICAgICAgICAgIHZhciBoZXhDb2xvciA9IGNvbG9yUGlja2VyLmdldENvbG9ySGV4KHBhcnNlZEpTT05bb2JqXSk7XHJcbiAgICAgICAgICAgIGNwSW5wdXRIZXhbb2JqXS52YWx1ZSA9IGhleENvbG9yO1xyXG4gICAgICAgICAgICBjcElucHV0UGlja2VyW29ial0udmFsdWUgPSBoZXhDb2xvcjtcclxuICAgICAgICAgICAgY3BJbnB1dEluY2x1ZGVbb2JqXS5jaGVja2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgY3BJbnB1dFJlc2V0W29ial0uc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgdXBkYXRlQ29sb3JKU09OKCk7XHJcbn1cclxuZnVuY3Rpb24gdXBkYXRlQ29sb3JKU09OKCkge1xyXG4gICAgdmFyIHBhcnNlZCA9IHt9O1xyXG4gICAgZm9yICh2YXIgb2JqIGluIGNvbG9yUGlja2VyLmNvbG9yU2NoZW1lKSB7XHJcbiAgICAgICAgaWYgKGNwSW5wdXRJbmNsdWRlW29ial0uY2hlY2tlZCkge1xyXG4gICAgICAgICAgICBwYXJzZWRbb2JqXSA9IGNvbG9yUGlja2VyLmNvbG9yU2NoZW1lW29ial07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgY3BUZXh0QXJlYUlPSlNPTi52YWx1ZSA9IEpTT04uc3RyaW5naWZ5KHBhcnNlZCwgbnVsbCwgNCk7XHJcbn1cclxuZnVuY3Rpb24gaW5wdXRDb2xvckhleEhhbmRsZXIoKSB7XHJcbiAgICAvLyBwZXBlZ2FcclxuICAgIGlmICgvXlxcIz9bMC05YS1mQS1GXXs2LDh9Ly50ZXN0KHRoaXMudmFsdWUudHJpbSgpKSkge1xyXG4gICAgICAgIHZhciBvYmpOYW1lID0gXCJfXCIgKyB0aGlzLmlkLnNsaWNlKDEzKTtcclxuICAgICAgICBmb3IgKHZhciBvYmogaW4gY29sb3JQaWNrZXIuY29sb3JTY2hlbWUpIHtcclxuICAgICAgICAgICAgaWYgKG9iak5hbWUgPT09IG9iai50b0xvd2VyQ2FzZSgpKSB7XHJcbiAgICAgICAgICAgICAgICBvYmpOYW1lID0gb2JqO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBjb2xvckhleCA9IHRoaXMudmFsdWUudHJpbSgpLnJlcGxhY2UoL15cXCM/LywgJyMnKS5zbGljZSgwLCA3KTtcclxuICAgICAgICBjb2xvclBpY2tlci5jb2xvclNjaGVtZVtvYmpOYW1lXSA9IGNvbG9yUGlja2VyLmhleFRvUkdCKGNvbG9ySGV4KTtcclxuICAgICAgICBjcElucHV0SGV4W29iak5hbWVdLnZhbHVlID0gY29sb3JIZXg7XHJcbiAgICAgICAgY3BJbnB1dFBpY2tlcltvYmpOYW1lXS52YWx1ZSA9IGNvbG9ySGV4O1xyXG4gICAgICAgIGNwSW5wdXRJbmNsdWRlW29iak5hbWVdLmNoZWNrZWQgPSB0cnVlO1xyXG4gICAgICAgIGNwSW5wdXRSZXNldFtvYmpOYW1lXS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgICAgICB1cGRhdGVDb2xvckpTT04oKTtcclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiBpbnB1dENvbG9yUGlja2VySGFuZGxlcigpIHtcclxuICAgIHZhciBvYmpOYW1lID0gXCJfXCIgKyB0aGlzLmlkLnNsaWNlKDE2KTtcclxuICAgIGZvciAodmFyIG9iaiBpbiBjb2xvclBpY2tlci5jb2xvclNjaGVtZSkge1xyXG4gICAgICAgIGlmIChvYmpOYW1lID09PSBvYmoudG9Mb3dlckNhc2UoKSkge1xyXG4gICAgICAgICAgICBvYmpOYW1lID0gb2JqO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNvbG9yUGlja2VyLmNvbG9yU2NoZW1lW29iak5hbWVdID0gY29sb3JQaWNrZXIuaGV4VG9SR0IodGhpcy52YWx1ZSk7XHJcbiAgICBjcElucHV0SGV4W29iak5hbWVdLnZhbHVlID0gdGhpcy52YWx1ZTtcclxuICAgIGNwSW5wdXRJbmNsdWRlW29iak5hbWVdLmNoZWNrZWQgPSB0cnVlO1xyXG4gICAgY3BJbnB1dFJlc2V0W29iak5hbWVdLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgdXBkYXRlQ29sb3JKU09OKCk7XHJcbn1cclxuZnVuY3Rpb24gaW5wdXRDb2xvckluY2x1ZGVIYW5kbGVyKCkge1xyXG4gICAgdmFyIG9iak5hbWUgPSBcIl9cIiArIHRoaXMuaWQuc2xpY2UoMTcpO1xyXG4gICAgZm9yICh2YXIgb2JqIGluIGNvbG9yUGlja2VyLmNvbG9yU2NoZW1lKSB7XHJcbiAgICAgICAgaWYgKG9iak5hbWUgPT09IG9iai50b0xvd2VyQ2FzZSgpKSB7XHJcbiAgICAgICAgICAgIG9iak5hbWUgPSBvYmo7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuY2hlY2tlZCkge1xyXG4gICAgICAgIGNvbG9yUGlja2VyLmNvbG9yU2NoZW1lW29iak5hbWVdID0gY29sb3JQaWNrZXIuaGV4VG9SR0IoY3BJbnB1dFBpY2tlcltvYmpOYW1lXS52YWx1ZSk7XHJcbiAgICAgICAgY3BJbnB1dEhleFtvYmpOYW1lXS52YWx1ZSA9IGNwSW5wdXRQaWNrZXJbb2JqTmFtZV0udmFsdWU7XHJcbiAgICAgICAgY3BJbnB1dFJlc2V0W29iak5hbWVdLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgfVxyXG4gICAgdXBkYXRlQ29sb3JKU09OKCk7XHJcbn1cclxuZnVuY3Rpb24gaW5wdXRDb2xvclJlc2V0SGFuZGxlcigpIHtcclxuICAgIHZhciBvYmpOYW1lID0gXCJfXCIgKyB0aGlzLmlkLnNsaWNlKDE1KTtcclxuICAgIGZvciAodmFyIG9iaiBpbiBjb2xvclBpY2tlci5jb2xvclNjaGVtZSkge1xyXG4gICAgICAgIGlmIChvYmpOYW1lID09PSBvYmoudG9Mb3dlckNhc2UoKSkge1xyXG4gICAgICAgICAgICBvYmpOYW1lID0gb2JqO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNvbG9yUGlja2VyLmNvbG9yU2NoZW1lW29iak5hbWVdID0gbnVsbDtcclxuICAgIGNwSW5wdXRIZXhbb2JqTmFtZV0udmFsdWUgPSAnJztcclxuICAgIGNwSW5wdXRQaWNrZXJbb2JqTmFtZV0udmFsdWUgPSAnIzAwMDAwMCc7XHJcbiAgICBjcElucHV0SW5jbHVkZVtvYmpOYW1lXS5jaGVja2VkID0gZmFsc2U7XHJcbiAgICBjcElucHV0UmVzZXRbb2JqTmFtZV0uc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgIHVwZGF0ZUNvbG9ySlNPTigpO1xyXG59XHJcbmZ1bmN0aW9uIHRhYmxlUlBhdHRlcm4oKSB7XHJcbiAgICBycGdUYWJsZS5pbm5lckhUTUwgPSAnJztcclxuICAgIGZvciAodmFyIGwgPSAwOyBsIDwgcmFuZFBhdHRlcm5HZW4ucm93OyBsKyspIHtcclxuICAgICAgICB2YXIgcm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndHInKTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJhbmRQYXR0ZXJuR2VuLmNvbHVtbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBlbGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGQnKTtcclxuICAgICAgICAgICAgZWxlbS5jbGFzc05hbWUgPSAndGFibGUtZ3JpZCc7XHJcbiAgICAgICAgICAgIHZhciBpbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcclxuICAgICAgICAgICAgaW1nLmNsYXNzTmFtZSA9ICd0YWJsZS1ycGF0dGVybi1pbWFnZSc7XHJcbiAgICAgICAgICAgIGltZy5zcmMgPSBcIi4vYXNzZXRzL1wiICsgbm90ZUltYWdlLmJsYW5rO1xyXG4gICAgICAgICAgICBpbWcuYWx0ID0gbm90ZUltYWdlLmJsYW5rLnNsaWNlKDAsIC00KTtcclxuICAgICAgICAgICAgZWxlbS5hcHBlbmRDaGlsZChpbWcpO1xyXG4gICAgICAgICAgICByb3cuYXBwZW5kQ2hpbGQoZWxlbSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJwZ1RhYmxlLmFwcGVuZENoaWxkKHJvdyk7XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gaW5wdXRSUGF0dGVyblJvd0hhbmRsZXIoKSB7XHJcbiAgICB2YXIgdmFsID0gTWF0aC5taW4oTWF0aC5hYnMocGFyc2VGbG9hdCh0aGlzLnZhbHVlKSkgfHwgMSwgNCk7XHJcbiAgICB0aGlzLnZhbHVlID0gdmFsO1xyXG4gICAgcmFuZFBhdHRlcm5HZW4ucm93ID0gdmFsO1xyXG4gICAgdGFibGVSUGF0dGVybigpO1xyXG59XHJcbmZ1bmN0aW9uIGlucHV0UlBhdHRlcm5Db2x1bW5IYW5kbGVyKCkge1xyXG4gICAgdmFyIHZhbCA9IE1hdGgubWluKE1hdGguYWJzKHBhcnNlRmxvYXQodGhpcy52YWx1ZSkpIHx8IDEsIDgpO1xyXG4gICAgdGhpcy52YWx1ZSA9IHZhbDtcclxuICAgIHJhbmRQYXR0ZXJuR2VuLmNvbHVtbiA9IHZhbDtcclxuICAgIHRhYmxlUlBhdHRlcm4oKTtcclxufVxyXG5mdW5jdGlvbiBpbnB1dFJQYXR0ZXJuR2VuZXJhdGVIYW5kbGVyKCkge1xyXG4gICAgdmFyIHJwZ1RhYmxlSW1hZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGFibGUtcnBhdHRlcm4taW1hZ2UnKTtcclxuICAgIHJwZ1RhYmxlSW1hZ2UuZm9yRWFjaChmdW5jdGlvbiAoaW1hZ2UpIHtcclxuICAgICAgICBpbWFnZS5zcmMgPSAnLi9hc3NldHMvYmxhbmsucG5nJztcclxuICAgICAgICBpbWFnZS5hbHQgPSAnYmxhbmsnO1xyXG4gICAgICAgIGltYWdlLmNsYXNzTmFtZSA9ICd0YWJsZS1ycGF0dGVybi1pbWFnZSc7XHJcbiAgICB9KTtcclxuICAgIHJhbmRQYXR0ZXJuR2VuLm5vdGVSZWQgPSBwYXJzZUludChycGdJbnB1dE5SZWQudmFsdWUpIHx8IDA7XHJcbiAgICByYW5kUGF0dGVybkdlbi5ub3RlQmx1ZSA9IHBhcnNlSW50KHJwZ0lucHV0TkJsdWUudmFsdWUpIHx8IDA7XHJcbiAgICByYW5kUGF0dGVybkdlbi5ub3RlQm9tYiA9IHBhcnNlSW50KHJwZ0lucHV0TkJvbWIudmFsdWUpIHx8IDA7XHJcbiAgICByYW5kUGF0dGVybkdlbi5ub0RvdCA9IHJwZ0lucHV0Tm9Eb3QuY2hlY2tlZDtcclxuICAgIHJhbmRQYXR0ZXJuR2VuLmxpbWl0ID0gcnBnSW5wdXRMaW1pdC5jaGVja2VkO1xyXG4gICAgcmFuZFBhdHRlcm5HZW4udG90YWwgPSBwYXJzZUludChycGdJbnB1dFRvdGFsLnZhbHVlKSB8fCAwO1xyXG4gICAgcmFuZFBhdHRlcm5HZW4ucGFyaXR5ID0gcnBnSW5wdXRQYXJpdHkuY2hlY2tlZDtcclxuICAgIHJhbmRQYXR0ZXJuR2VuLnBhcml0eUV4dGVuZCA9IHBhcnNlSW50KHJwZ0lucHV0UGFyaXR5RXh0ZW5kLnZhbHVlKSB8fCAwO1xyXG4gICAgcmFuZFBhdHRlcm5HZW4ucGFyaXR5UmVkID0gcnBnSW5wdXRQYXJpdHlOUmVkLmNoZWNrZWQ7XHJcbiAgICByYW5kUGF0dGVybkdlbi5wYXJpdHlCbHVlID0gcnBnSW5wdXRQYXJpdHlOQmx1ZS5jaGVja2VkO1xyXG4gICAgdmFyIGdyaWQgPSByYW5kUGF0dGVybkdlbi5nZW5lcmF0ZSgpO1xyXG4gICAgZm9yICh2YXIgaiA9IDA7IGogPCBncmlkLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgaWYgKGdyaWRbal0gIT09IG51bGwpIHtcclxuICAgICAgICAgICAgcnBnVGFibGVJbWFnZVtqXS5zcmMgPSBcIi4vYXNzZXRzL1wiICsgKGdyaWRbal0uX25vdGVEaXJlY3Rpb24gIT09IDggfHwgcnBnSW5wdXROb0RvdC5jaGVja2VkXHJcbiAgICAgICAgICAgICAgICA/IG5vdGVJbWFnZVtncmlkW2pdLl9ub3RlVHlwZV1cclxuICAgICAgICAgICAgICAgIDogbm90ZUltYWdlW2dyaWRbal0uX25vdGVUeXBlICsgM10pO1xyXG4gICAgICAgICAgICBycGdUYWJsZUltYWdlW2pdLmFsdCA9IG5vdGVJbWFnZVtncmlkW2pdLl9ub3RlVHlwZV0uc2xpY2UoMCwgLTQpO1xyXG4gICAgICAgICAgICBpZiAoZ3JpZFtqXS5fbm90ZURpcmVjdGlvbiAhPT0gOCkge1xyXG4gICAgICAgICAgICAgICAgcnBnVGFibGVJbWFnZVtqXS5jbGFzc05hbWUgKz0gXCIgXCIgKyBub3RlUm90YXRpb25bZ3JpZFtqXS5fbm90ZURpcmVjdGlvbl07XHJcbiAgICAgICAgICAgICAgICBycGdUYWJsZUltYWdlW2pdLmFsdCArPSBcIiBcIiArIG5vdGVSb3RhdGlvbltncmlkW2pdLl9ub3RlRGlyZWN0aW9uXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=