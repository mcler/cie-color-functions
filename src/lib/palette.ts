/* eslint-disable default-param-last */
import BezierEasing from 'bezier-easing';
import { colord, Colord } from './colord';
import { clamp } from './utils';
import { AnyColor } from '../types';

export const STOP_MIN = 0;
export const STOP_BASE = 500;
export const STOP_MAX = 1000;

export const CHROMA_STOP_BASE = 500;
export const MIX_STOP_BASE = 500;

const WHITE = '#fff';
const BLACK = '#000';

function normalizeStop(stop: number) {
    return (stop <= MIX_STOP_BASE ? stop : STOP_MAX - stop) / MIX_STOP_BASE;
}

/**
 * Linear function
 * @param stop
 * @returns
 */
export function linear(stop: number) {
    return normalizeStop(stop);
}

/**
 * Default easing function `default`
 * @param stop
 * @returns
 */
export function easeDefault(stop: number) {
    const stopValue = normalizeStop(stop);
    const params = stopValue < MIX_STOP_BASE ? [0, 0.15, 0.75, 1] : [0.75, 0, 0, 1];
    return BezierEasing(params[0], params[1], params[2], params[3])(stopValue);
}

/**
 * Easing function `ease`
 * @param stop
 * @returns
 */
export function ease(stop: number) {
    const stopValue = normalizeStop(stop);
    return BezierEasing(0.25, 0.1, 0.25, 1)(stopValue);
}

/**
 * Easing function `ease-in`
 * @param stop
 * @returns
 */
export function easeIn(stop: number) {
    const stopValue = normalizeStop(stop);
    return BezierEasing(0.42, 0, 1, 1)(stopValue);
}

/**
 * Easing function `ease-out`
 * @param stop
 * @returns
 */
export function easeOut(stop: number) {
    const stopValue = normalizeStop(stop);
    return BezierEasing(0, 0, 0.58, 1)(stopValue);
}

/**
 * Easing function `ease-in-out`
 * @param stop
 * @returns
 */
export function easeInOut(stop: number) {
    const stopValue = normalizeStop(stop);
    return BezierEasing(0.42, 0, 0.58, 1)(stopValue);
}

/**
 * Easing function `ease-in-out-sine`
 * @param stop
 * @returns
 */
export function easeInOutSine(stop: number) {
    const stopValue = normalizeStop(stop);
    return BezierEasing(0.37, 0, 0.63, 1)(stopValue);
}

/**
 * Easing function
 * f(0)=0; f(500)=1; f(1000)=0;
 */
export type EaseFunction = (_: number) => number;

/**
 * Easing function enum
 */
export type EaseFunctionName = 'default' | 'linear'
    | 'ease' | 'easeIn' | 'easeOut' | 'easeInOut'
    | 'easeInOutSine';

function getEase(from: EaseFunction | EaseFunctionName): EaseFunction {
    if (from instanceof Function) {
        return from;
    }

    if (typeof from === 'string') {
        switch (from) {
            case 'linear':
                return linear;
            case 'ease':
                return ease;
            case 'easeIn':
                return easeIn;
            case 'easeOut':
                return easeOut;
            case 'easeInOut':
                return easeInOut;
            case 'easeInOutSine':
                return easeInOutSine;
            case 'default':
            default:
                return easeDefault;
        }
    }

    return easeDefault;
}

/**
 * Create color palette stop value
 * @param baseColor Base color (stop === 500)
 * @param stop Palette stop value (0..1000)
 * @param mixBy Shade mix function or name ('default' | 'linear' | 'ease' | 'easeIn' | 'easeOut' | 'easeInOut' | 'easeInOutSine')
 * @returns {Colord} New color
 */
export function createPaletteStop(
    baseColor: AnyColor,
    stop: number,
    mixBy: EaseFunction | EaseFunctionName = 'default',
): Colord {
    const stopValue = clamp(stop, STOP_MIN, STOP_MAX);
    const color500 = colord(baseColor);

    if (stopValue !== MIX_STOP_BASE) {
        const mixColor = colord(stopValue < MIX_STOP_BASE ? WHITE : BLACK).alpha(color500.alpha());
        const mixRatio = clamp(getEase(mixBy)(stopValue), 0, 1);

        return mixColor.mix(color500, mixRatio);
    }

    return colord(baseColor);
}

/**
 * Default palette stops
 */
export const PALETTE_STOPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

/**
 * Create color palette
 * @param baseColor Base color (stopq === 500)
 * @param mixBy Shade mix function or name ('default' | 'linear' | 'ease' | 'easeIn' | 'easeOut' | 'easeInOut' | 'easeInOutSine')
 * @returns {Colord} New color
 */
export function createPalette(
    baseColor: AnyColor,
    mixBy: EaseFunction | EaseFunctionName = easeOut,
): Record<string, Colord> {
    return PALETTE_STOPS.reduce((palette, stop) => ({
        ...palette,
        [String(stop)]: createPaletteStop(baseColor, stop, mixBy),
    }), {});
}
