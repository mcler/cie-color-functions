import { colord } from './colord';
import { AnyColor, LabaColor, LchaColor, InternalColor } from "../types";
import { clamp } from './utils';

 // https://www.w3.org/TR/css-color-4/#specifying-lab-lch
const LAB_MAX_LIGHTNESS = 400;
const LCH_MAX_HUE = 360;
const LCH_MAX_COLORFULNESS = 230;

/**
 * Осветление цвета
 */
export function lighten(color: AnyColor, amount = 0): InternalColor {
    const oldLab = colord(color).toLab();
    const newLab: LabaColor = {
        ...oldLab,
        l: clamp(oldLab.l + amount, 0, LAB_MAX_LIGHTNESS),
    };
    const newColord = colord(newLab);
    return {
        rgba: newColord.toRgb(),
        hex: newColord.toHex(),
    };
}

/**
 * Затемнение цвета
 */
export function darken(color: AnyColor, amount = 0): InternalColor {
    return lighten(color, 0 - amount);
}

export function rotate(color: AnyColor, amount = 0): InternalColor {
    const oldColord = colord(color)
    const oldLch = oldColord.toLch();
    const newLch: LchaColor = {
        ...oldLch,
        h: ((oldLch.h + amount) % LCH_MAX_HUE),
    };
    const newColord = colord(newLch);
    return {
        rgba: newColord.toRgb(),
        hex: newColord.toHex(),
    };
}

export function colorful(color: AnyColor, amount = 0): InternalColor {
    const oldColord = colord(color);
    const oldLch = oldColord.toLch();
    const newLch: LchaColor = {
        ...oldLch,
        c: clamp(oldLch.c + amount, 0, LCH_MAX_COLORFULNESS),
    };
    const newColord = colord(newLch);
    return {
        rgba: newColord.toRgb(),
        hex: newColord.toHex(),
    };
}

export function mix(color1: AnyColor, color2: AnyColor, ratio = 0): InternalColor {
    const newColord = colord(color1).mix(color2, ratio);
    return {
        rgba: newColord.toRgb(),
        hex: newColord.toHex(),
    };
}

// saturate('#f00', 1);
