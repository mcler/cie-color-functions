import path from 'path';
import glob from 'glob';
import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';

const getRollupPluginsConfig = (compilerOptions) => [
    typescript({
        tsconfigOverride: { compilerOptions },
    }),
    terser({
        ecma: 5,
        module: true,
        toplevel: true,
        compress: { pure_getters: true },
        format: { wrap_func_args: false },
    }),
];

// Find available plugins
const files = [
    {
        input: 'src/index.ts',
        name: 'index',
    },
    ...glob.sync('./src/plugins/*.ts').map((input) => ({
        input,
        name: `plugins/${path.parse(input).name}`,
    })),
];

const outputs = files.reduce((array, { input, name }, idx) => [
    ...array,
    {
        input,
        output: {
            file: `dist/${name}.mjs`,
            format: 'es',
        },
        plugins: getRollupPluginsConfig({ declaration: name === 'index' }),
    },
    {
        input,
        output: {
            file: `dist/${name}.cjs`,
            format: 'cjs',
        },
        plugins: getRollupPluginsConfig({ declaration: false }),
    },
], []);

// Bundle both formats according to NodeJS guide
// https://nodejs.org/api/packages.html#packages_approach_2_isolate_state
export default outputs;
