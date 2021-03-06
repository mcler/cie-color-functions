import { suite } from 'uvu';
import * as assert from 'uvu/assert';

import * as operations from '../src/lib/operations';

const test = suite('operations');

test('should compute values', () => {
    assert.equal(operations.lighten('#c00', 10).toHex(), '#ec361b');
    assert.equal(operations.darken('#c00', 10).toHex(), '#ac0000');
    assert.equal(operations.desaturate('#c00', 20).toHex(), '#ba341c');
    assert.equal(operations.saturate('#c00', 20).toHex(), '#de0000');
    assert.equal(operations.rotate('#c00', 60).toHex(), '#606d00');
    assert.equal(operations.rotate('#c00', 120).toHex(), '#00812f');
});

test('should stay the same if color rotation is multiplication of 360deg', () => {
    assert.equal(operations.rotate('#c00', 0).toHex(), '#cc0000');
    assert.equal(operations.rotate('#c00', 360).toHex(), '#cc0000');
    assert.equal(operations.rotate('#c00', 720).toHex(), '#cc0000');
    assert.equal(operations.rotate('#c00', -360).toHex(), '#cc0000');
    assert.equal(operations.rotate('#c00', -720).toHex(), '#cc0000');
});

test('should compute values with alpha', () => {
    assert.equal(operations.lighten('#c003', 10).toHex(), '#ec361b33');
    assert.equal(operations.darken('#c003', 10).toHex(), '#ac000033');
    assert.equal(operations.desaturate('#c003', 20).toHex(), '#ba341c33');
    assert.equal(operations.saturate('#c003', 20).toHex(), '#de000033');
});

test('should leave untouched boundary values', () => {
    assert.equal(operations.lighten('#fff', 10).toHex(), '#ffffff');
    assert.equal(operations.darken('#000', 10).toHex(), '#000000');
    assert.equal(operations.desaturate('#000', 20).toHex(), '#000000');
    assert.equal(operations.desaturate('#333', 20).toHex(), '#333333');
    assert.equal(operations.desaturate('#fff', 20).toHex(), '#ffffff');
    assert.equal(operations.saturate('#000', 20).toHex(), '#000000');
    assert.equal(operations.saturate('#333', 20).toHex(), '#333333');
    assert.equal(operations.saturate('#fff', 20).toHex(), '#ffffff');
    assert.equal(operations.saturate('#f00', 20).toHex(), '#ff0000');
});

test.run();
