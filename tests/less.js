import fs from 'fs';

import { suite } from 'uvu';
import * as assert from 'uvu/assert';

import less from 'less';

import plugin from '../dist/plugins/less';

const input = fs.readFileSync('./tests/mocks/input.less', 'utf8');
const output = fs.readFileSync('./tests/mocks/output.css', 'utf8');

const test = suite('less');

test('should compile to expected less', async () => {
    const result = await less.render(input, {
        plugins: [plugin],
    });
    assert.equal(result.css, output);
});

test.run();
