import { colord, Colord } from './colord';
import { AnyColor, LabaColor, LchaColor } from '../types';
import { clamp } from './utils';

// https://www.w3.org/TR/css-color-4/#specifying-lab-lch
export const LAB_MAX_LIGHTNESS = 400;
export const LCH_MAX_HUE = 360;
export const LCH_MAX_COLORFULNESS = 230;

/**
 * Осветление цвета
 */
export function lighten(color: AnyColor, amount = 0): Colord {
    const oldLab = colord(color).toLab();
    const newLab: LabaColor = {
        ...oldLab,
        l: clamp(oldLab.l + amount, 0, LAB_MAX_LIGHTNESS),
    };

    return colord(newLab);
}

/**
 * Затемнение цвета
 */
export function darken(color: AnyColor, amount = 0): Colord {
    return lighten(color, 0 - amount);
}

/**
 * Изменение тона
 */
export function rotate(color: AnyColor, amount = 0): Colord {
    const oldColord = colord(color);
    const oldLch = oldColord.toLch();
    const newLch: LchaColor = {
        ...oldLch,
        h: ((oldLch.h + amount) % LCH_MAX_HUE),
    };

    return colord(newLch);
}

export const spin = rotate;

/**
 * Increase saturation
 */
export function saturate(color: AnyColor, amount = 0): Colord {
    const oldColord = colord(color);

    // return existing color if saturation is zero
    if (oldColord.toHsl().s === 0) {
        return oldColord;
    }

    const oldLch = oldColord.toLch();
    const newLch: LchaColor = {
        ...oldLch,
        c: clamp(oldLch.c + amount, 0, LCH_MAX_COLORFULNESS),
    };

    return colord(newLch);
}

/**
 * Decrease saturation
 */
export function desaturate(color: AnyColor, amount = 0): Colord {
    return saturate(color, 0 - amount);
}

/**
 * Mix colors
 */
export function mix(color1: AnyColor, color2: AnyColor, ratio = 0): Colord {
    // colord mixes colors via Lab color space, so no need to convert them manually
    return colord(color1).mix(color2, ratio);
}
