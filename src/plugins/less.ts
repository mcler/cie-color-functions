import { colord, Colord } from 'colord';
import {
    darken, lighten,
    desaturate, saturate,
    rotate,
    mix,
    createPaletteStop,
} from '../lib/index';
import { Less, RgbaColor } from '../types';

function rgbaToLessColor(rgba: RgbaColor): Less.ColorObject {
    return {
        color: [rgba.r, rgba.g, rgba.b],
        alpha: rgba.a,
    };
}

function toLess(less: Less.Static, func: (..._: any[]) => Colord, args: Array<unknown>) {
    const newColor = func(...args);
    const lessColor = rgbaToLessColor(newColor.toRgb());
    return new less.tree.Color(lessColor.color, lessColor.alpha);
}

function normalizeColor(color: Less.NodeColor): string {
    if (color.value) {
        return colord(color.value).toHex();
    }
    if (color.rgb) {
        return colord({
            r: color.rgb[0],
            g: color.rgb[1],
            b: color.rgb[2],
            a: color.alpha,
        }).toHex();
    }
    return '#000';
}

function normalizeAmount(amount: Less.NodeValue, min?: number, max?: number): number {
    let { value } = amount;
    switch (amount.unit?.backupUnit) {
        case '%':
            if (max !== undefined) value = (value * max) / 100;
            break;
        case 'deg':
        case undefined:
        case null:
        default:
            //
            break;
    }
    return Number(value);
}

export const CieColorFunctionsPlugin = {
    install(less: Less.Static, pluginManager: unknown, functions: Less.PluginFunctions) {
        functions.add('cie_darken', (color: Less.NodeColor, amount: Less.NodeValue) => {
            const colorNormalized = normalizeColor(color);
            const amountNormalized = normalizeAmount(amount);
            return toLess(less, darken, [colorNormalized, amountNormalized]);
        });

        functions.add('cie_lighten', (color: Less.NodeColor, amount: Less.NodeValue) => {
            const colorNormalized = normalizeColor(color);
            const amountNormalized = normalizeAmount(amount);
            return toLess(less, lighten, [colorNormalized, amountNormalized]);
        });

        functions.add('cie_spin', (color: Less.NodeColor, amount: Less.NodeValue) => {
            const colorNormalized = normalizeColor(color);
            const amountNormalized = normalizeAmount(amount);
            return toLess(less, rotate, [colorNormalized, amountNormalized]);
        });

        functions.add('cie_desaturate', (color: Less.NodeColor, amount: Less.NodeValue) => {
            const colorNormalized = normalizeColor(color);
            const amountNormalized = normalizeAmount(amount);
            return toLess(less, desaturate, [colorNormalized, amountNormalized]);
        });

        functions.add('cie_saturate', (color: Less.NodeColor, amount: Less.NodeValue) => {
            const colorNormalized = normalizeColor(color);
            const amountNormalized = normalizeAmount(amount);
            return toLess(less, saturate, [colorNormalized, amountNormalized]);
        });

        functions.add(
            'cie_mix',
            (color1: Less.NodeColor, color2: Less.NodeColor, amount: Less.NodeValue) => {
                const colorNormalized1 = normalizeColor(color1);
                const colorNormalized2 = normalizeColor(color2);
                const amountNormalized = 1 - (normalizeAmount(amount) / 100);
                return toLess(less, mix, [colorNormalized1, colorNormalized2, amountNormalized]);
            },
        );

        functions.add(
            'cie_palette_stop',
            (color: Less.NodeColor, amount: Less.NodeValue) => {
                const colorNormalized = normalizeColor(color);
                return toLess(less, createPaletteStop, [colorNormalized, amount.value]);
            },
        );
    },
};
