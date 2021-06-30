import { round } from './util';
import { Color as Color } from './color';
import { colorScheme, ColorScheme } from './envColor';

export default class ColorPicker {
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
        if (colorScheme[this._environmentColor]) {
            for (const part in this._colorScheme) {
                this._colorScheme[part] = colorScheme[this._environmentColor][part] || null;
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
        let color: Color = { r: null, g: null, b: null };
        for (const v in c) {
            color[v] = this.cDenorm(c[v]);
        }
        return `#${this.decToHex(color.r)}${this.decToHex(color.g)}${this.decToHex(color.b)}${
            color.a !== undefined ? this.decToHex(color.a) : ''
        }`;
    }
    public hexToRGB(hex: string) {
        return {
            r: this.cNorm(this.hexToDec(hex.slice(1, 3))),
            g: this.cNorm(this.hexToDec(hex.slice(3, 5))),
            b: this.cNorm(this.hexToDec(hex.slice(5, 7))),
        };
    }
}
