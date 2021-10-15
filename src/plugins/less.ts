import { colord } from 'colord';
import { colorful, darken, lighten, rotate, mix } from '../lib/index';
import { Less, RgbaColor } from '../types';

function rgbaToLessColor(rgba: RgbaColor): Less.ColorObject {
    return {
        color: [rgba.r, rgba.g, rgba.b],
        alpha: rgba.a,
    };
}

function toLess(less: Less.Static, func: Function, args: Array<unknown>) {
    const newColor = func(...args);
    const lessColor = rgbaToLessColor(newColor.rgba);
    return new less.tree.Color(lessColor.color, lessColor.alpha);
}

function normalizeColor(color: Less.NodeColor): string {
    if (color.value) {
        return colord(color.value).toHex();
    } else if (color.rgb) {
        return colord({
            r: color.rgb[0],
            g: color.rgb[1],
            b: color.rgb[2],
            a: color.alpha,
        }).toHex();
    }
    return '#000';
}

function normalizeAmount(amount: Less.NodeValue, max = 100, round = 2): number {
    let { value } = amount;
    switch (amount.unit?.backupUnit) {
        case '%':
            if (max !== 100) value = value * max / 100;
            break;
        case undefined:
        case null:
            if (value > 1) value = value / max;
            break;
    }
    return Math.round(value * Math.pow(10, round)) / Math.pow(10, round);
}

const plugin = {
    install(less: Less.Static, pluginManager: any, functions: Less.PluginFunctions) {
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

        functions.add('cie_rotate', (color: Less.NodeColor, amount: Less.NodeValue) => {
            const colorNormalized = normalizeColor(color);
            const amountNormalized = normalizeAmount(amount, 360);
            return toLess(less, rotate, [colorNormalized, amountNormalized]);
        });

        functions.add('cie_colorful', (color: Less.NodeColor, amount: Less.NodeValue) => {
            const colorNormalized = normalizeColor(color);
            const amountNormalized = normalizeAmount(amount);
            return toLess(less, colorful, [colorNormalized, amountNormalized]);
        });

        functions.add('cie_mix', (color1: Less.NodeColor, color2: Less.NodeColor, amount: Less.NodeValue) => {
            const colorNormalized1 = normalizeColor(color1);
            const colorNormalized2 = normalizeColor(color2);
            const amountNormalized = normalizeAmount(amount, 1);
            return toLess(less, mix, [colorNormalized1, colorNormalized2, amountNormalized]);
        });
    },
};


export default plugin;
