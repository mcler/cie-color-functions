import { colorful, darken, lighten, rotate, mix } from '../lib/index';
import { Less, RgbaColor } from '../types';

function rgbaToLessColor(rgba: RgbaColor): Less.ColorObject {
    return {
        color: [rgba.r, rgba.g, rgba.b],
        alpha: rgba.a,
    };
}

function toLess(less: any, func: Function, args: Array<unknown>) {
    const newColor = func(...args);
    const lessColor = rgbaToLessColor(newColor.rgba);
    return new less.tree.Color(lessColor.color, lessColor.alpha);
}

const plugin = {
    install(less: Less.Static, pluginManager: any, functions: Less.PluginFunctions) {
        functions.add('cie_darken', (color: any, amount: any) => {
            return toLess(less, darken, [color.value, amount.value]);
        });

        functions.add('cie_lighten', (color: any, amount: any) => {
            return toLess(less, lighten, [color.value, amount.value]);
        });

        functions.add('cie_rotate', (color: any, amount: any) => {
            return toLess(less, rotate, [color.value, amount.value]);
        });

        functions.add('cie_colorful', (color: any, amount: any) => {
            return toLess(less, colorful, [color.value, amount.value]);
        });

        functions.add('cie_mix', (color1: any, color2: any, amount: any) => {
            return toLess(less, mix, [color1.value, color2.value, amount.value]);
        });
    },
};


export default plugin;
