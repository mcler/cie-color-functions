import { suite } from 'uvu';
import * as assert from 'uvu/assert';

import * as palette from '../src/lib/palette';

const test = suite('palette');

const baseColor = '#f00';
const baseColorAlpha = '#f003';

test('Boundary values', () => {
    assert.equal(palette.createPaletteStop(baseColor, 0).toHex(), '#ffffff');
    assert.equal(palette.createPaletteStop(baseColor, 500).toHex(), '#ff0000');
    assert.equal(palette.createPaletteStop(baseColor, 1000).toHex(), '#000000');
});

test('Outside of boundary values', () => {
    assert.equal(palette.createPaletteStop(baseColor, -100).toHex(), '#ffffff');
    assert.equal(palette.createPaletteStop(baseColor, 1100).toHex(), '#000000');
});

test('Linear values', () => {
    assert.equal(palette.createPaletteStop(baseColor, 250, 'linear').toHex(), '#ff9f80');
    assert.equal(palette.createPaletteStop(baseColor, 750, 'linear').toHex(), '#7a1b0b');
});

test('Linear values with alpha', () => {
    assert.equal(palette.createPaletteStop(baseColorAlpha, 250, 'linear').toHex(), '#ff9f8033');
    assert.equal(palette.createPaletteStop(baseColorAlpha, 750, 'linear').toHex(), '#7a1b0b33');
});

test.run();
