import { round } from './utils';
import { Color, ColorArray, deltaE00, toRGBArray } from './color';
import { colorScheme, myCustomColor, ColorScheme, EnvironmentColor } from './envColor';

export default class ColorPicker {
    static list: EnvironmentColor = colorScheme;

    private _colorScheme: ColorScheme = {
        _colorLeft: null,
        _colorRight: null,
        _envColorLeft: null,
        _envColorRight: null,
        _envColorLeftBoost: null,
        _envColorRightBoost: null,
        _obstacleColor: null,
    };

    constructor(private _environmentColor: string = 'Default Custom') {
        this.update();
    }

    get colorScheme(): ColorScheme {
        return this._colorScheme;
    }
    get environmentColor(): string {
        return this._environmentColor;
    }
    set environmentColor(val: string) {
        this._environmentColor = val;
        this.update();
    }

    update() {
        if (ColorPicker.list[this._environmentColor]) {
            for (const part in this._colorScheme) {
                const p = part as keyof ColorScheme;
                this._colorScheme[p] = ColorPicker.list[this._environmentColor][p] || null;
            }
        }
    }
    public getColorHex(color: Color): string {
        if (color == null) {
            return '#000000';
        }
        return this.rgbaToHex(color);
    }
    private decToHex(val: number): string {
        let hex = val.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    }
    private hexToDec(val: string): number {
        return parseInt(val, 16);
    }
    private cDenorm(val: number): number {
        return val > 1 && !(val < 0) ? 255 : round(val * 255);
    }
    private cNorm(val: number): number {
        return val / 255;
    }
    private rgbaToHex(c: Color) {
        let color: Color = { r: 0, g: 0, b: 0 };
        for (const val in c) {
            const v = val as keyof Color;
            if (typeof c[v] === 'number') {
                color[v] = this.cDenorm(c[v]);
            }
        }
        return `#${this.decToHex(color.r)}${this.decToHex(color.g)}${this.decToHex(color.b)}`;
    }
    public hexToRGB(hex: string) {
        return {
            r: this.cNorm(this.hexToDec(hex.slice(1, 3))),
            g: this.cNorm(this.hexToDec(hex.slice(3, 5))),
            b: this.cNorm(this.hexToDec(hex.slice(5, 7))),
        };
    }
}
const colorPicker = new ColorPicker();

const cpOptionColorScheme = document.querySelector<HTMLSelectElement>('#cp-option-colorscheme')!;
const cpShowCustom = document.querySelector<HTMLInputElement>('#cp-show-custom')!;
const cpInputHex: { [key: string]: HTMLInputElement } = {};
const cpInputPicker: { [key: string]: HTMLInputElement } = {};
const cpInputInclude: { [key: string]: HTMLInputElement } = {};
const cpInputReset: { [key: string]: HTMLInputElement } = {};
for (const obj in colorPicker.colorScheme) {
    const part: string = obj.replace(/^\_/, '').toLowerCase();
    cpInputHex[obj] = document.querySelector<HTMLInputElement>(`#cp-input-hex-${part}`)!;
    cpInputPicker[obj] = document.querySelector<HTMLInputElement>(`#cp-input-picker-${part}`)!;
    cpInputInclude[obj] = document.querySelector<HTMLInputElement>(`#cp-input-include-${part}`)!;
    cpInputReset[obj] = document.querySelector<HTMLInputElement>(`#cp-input-reset-${part}`)!;
}
const cpTextDENC = document.querySelector<HTMLSpanElement>('#cp-output-de-nc')!;
const cpTextDELA = document.querySelector<HTMLSpanElement>('#cp-output-de-la')!;
const cpTextDERA = document.querySelector<HTMLSpanElement>('#cp-output-de-ra')!;
const cpTextAreaIOJSON = document.querySelector<HTMLTextAreaElement>('#cp-io-colorjson')!;
const cpErrorJSON = document.querySelector<HTMLElement>('#cp-error-colorjson')!;

cpOptionColorScheme.addEventListener('change', optionColorSchemeHandler);
for (const obj in colorPicker.colorScheme) {
    cpInputHex[obj].addEventListener('change', inputColorHexHandler);
    cpInputPicker[obj].addEventListener('change', inputColorPickerHandler);
    cpInputInclude[obj].addEventListener('click', inputColorIncludeHandler);
    cpInputReset[obj].addEventListener('click', inputColorResetHandler);
    cpInputReset[obj].style.display = 'none';
}
const cpCustomText = 'Custom';
let option = document.createElement('option');
option.value = cpCustomText;
option.textContent = cpCustomText;
cpOptionColorScheme.append(option);
for (const cs in ColorPicker.list) {
    option = document.createElement('option');
    option.value = cs;
    option.textContent = cs;
    cpOptionColorScheme.append(option);
}
cpShowCustom.addEventListener('change', updateShowCustomHandler);
function updateShowCustomHandler(this: HTMLInputElement) {
    for (let i = cpOptionColorScheme.options.length - 1; i >= 0; i--) {
        cpOptionColorScheme.remove(i);
    }
    ColorPicker.list = colorScheme;
    if (this.checked) {
        ColorPicker.list = { ...colorScheme, ...myCustomColor };
    }
    for (const cs in ColorPicker.list) {
        option = document.createElement('option');
        option.value = cs;
        option.textContent = cs;
        cpOptionColorScheme.append(option);
    }
}

cpTextAreaIOJSON.addEventListener('change', inputJSONColorHandler);

function optionColorSchemeHandler(this: HTMLOptionElement) {
    if (this.value !== cpCustomText) {
        for (const obj in colorPicker.colorScheme) {
            cpInputHex[obj].value = '';
            cpInputPicker[obj].value = '#000000';
            cpInputInclude[obj].checked = false;
            cpInputReset[obj].style.display = 'none';
        }
        colorPicker.environmentColor = this.value;
        for (const obj in colorPicker.colorScheme) {
            const c = obj as keyof ColorScheme;
            if (colorPicker.colorScheme[c]) {
                const hexColor = colorPicker.getColorHex(colorPicker.colorScheme[c]!);
                cpInputHex[c].value = hexColor;
                cpInputPicker[c].value = hexColor;
                cpInputInclude[c].checked = colorPicker.colorScheme[c] ? true : false;
                cpInputReset[c].style.display = 'block';
            }
        }
        updateDeltaE();
        updateColorJSON();
    }
}
function inputJSONColorHandler(this: HTMLTextAreaElement) {
    for (const obj in colorPicker.colorScheme) {
        cpInputHex[obj].value = '';
        cpInputPicker[obj].value = '#000000';
        cpInputInclude[obj].checked = false;
        cpInputReset[obj].style.display = 'none';
    }
    cpErrorJSON.innerHTML = '';
    const colorType = [
        '_colorLeft',
        '_colorRight',
        '_envColorLeft',
        '_envColorRight',
        '_envColorLeftBoost',
        '_envColorRightBoost',
        '_obstacleColor',
    ];
    let parsedJSON: { [key: string]: Color } = {};
    try {
        if (/^{/.test(this.value.trim())) {
            parsedJSON = JSON.parse(this.value.trim());
        } else {
            parsedJSON = JSON.parse(`{${this.value.trim().replace(/\,$/, '')}}`);
        }
    } catch (err) {
        console.error(err);
        cpErrorJSON.innerHTML = err + '<br>';
    }
    for (const obj in parsedJSON) {
        const c = obj as keyof ColorScheme;
        if (colorType.includes(c)) {
            colorPicker.colorScheme[c] = parsedJSON[c];
            const hexColor = colorPicker.getColorHex(parsedJSON[c]);
            cpInputHex[c].value = hexColor;
            cpInputPicker[c].value = hexColor;
            cpInputInclude[c].checked = true;
            cpInputReset[c].style.display = 'block';
        }
    }
    updateDeltaE();
    updateColorJSON();
}
function updateDeltaE() {
    const noteLeft = colorPicker.colorScheme._colorLeft;
    const noteRight = colorPicker.colorScheme._colorRight;
    const arrowColor: ColorArray = [1, 1, 1];
    if (noteLeft) {
        cpTextDELA.textContent = round(deltaE00(toRGBArray(noteLeft), arrowColor), 2).toString();
    } else {
        cpTextDELA.textContent = 'N/A';
    }
    if (noteRight) {
        cpTextDERA.textContent = round(deltaE00(toRGBArray(noteRight), arrowColor), 2).toString();
    } else {
        cpTextDERA.textContent = 'N/A';
    }
    if (noteLeft && noteRight) {
        cpTextDENC.textContent = round(
            deltaE00(toRGBArray(noteLeft), toRGBArray(noteRight)),
            2
        ).toString();
    } else {
        cpTextDENC.textContent = 'N/A';
    }
}
function updateColorJSON() {
    const parsed: { [key: string]: object } = {};
    for (const obj in colorPicker.colorScheme) {
        const c = obj as keyof ColorScheme;
        if (cpInputInclude[c].checked) {
            parsed[c] = colorPicker.colorScheme[c]!;
        }
    }
    cpTextAreaIOJSON.value = JSON.stringify(parsed, null, 4);
}
function inputColorHexHandler(this: HTMLInputElement) {
    // pepega
    if (/^\#?[0-9a-fA-F]{6,8}/.test(this.value.trim())) {
        let objName = `_${this.id.slice(13)}` as keyof ColorScheme;
        for (const obj in colorPicker.colorScheme) {
            if (objName === obj.toLowerCase()) {
                objName = obj as keyof ColorScheme;
            }
        }
        const colorHex = this.value.trim().replace(/^\#?/, '#').slice(0, 7);
        colorPicker.colorScheme[objName] = colorPicker.hexToRGB(colorHex);
        cpInputHex[objName].value = colorHex;
        cpInputPicker[objName].value = colorHex;
        cpInputInclude[objName].checked = true;
        cpInputReset[objName].style.display = 'block';
        updateDeltaE();
        updateColorJSON();
    }
}
function inputColorPickerHandler(this: HTMLInputElement) {
    let objName = `_${this.id.slice(16)}` as keyof ColorScheme;
    for (const obj in colorPicker.colorScheme) {
        if (objName === obj.toLowerCase()) {
            objName = obj as keyof ColorScheme;
        }
    }
    colorPicker.colorScheme[objName] = colorPicker.hexToRGB(this.value);
    cpInputHex[objName].value = this.value;
    cpInputInclude[objName].checked = true;
    cpInputReset[objName].style.display = 'block';
    updateDeltaE();
    updateColorJSON();
}
function inputColorIncludeHandler(this: HTMLInputElement) {
    let objName = `_${this.id.slice(17)}` as keyof ColorScheme;
    for (const obj in colorPicker.colorScheme) {
        if (objName === obj.toLowerCase()) {
            objName = obj as keyof ColorScheme;
        }
    }
    if (this.checked) {
        colorPicker.colorScheme[objName] = colorPicker.hexToRGB(cpInputPicker[objName].value);
        cpInputHex[objName].value = cpInputPicker[objName].value;
        cpInputReset[objName].style.display = 'block';
    }
    updateDeltaE();
    updateColorJSON();
}
function inputColorResetHandler(this: HTMLInputElement) {
    let objName = `_${this.id.slice(15)}` as keyof ColorScheme;
    for (const obj in colorPicker.colorScheme) {
        if (objName === obj.toLowerCase()) {
            objName = obj as keyof ColorScheme;
        }
    }
    colorPicker.colorScheme[objName] = null;
    cpInputHex[objName].value = '';
    cpInputPicker[objName].value = '#000000';
    cpInputInclude[objName].checked = false;
    cpInputReset[objName].style.display = 'none';
    updateDeltaE();
    updateColorJSON();
}
