import minify from 'rollup-plugin-babel-minify';
import babel from 'rollup-plugin-babel';
import pkg from './package.json';

const banner = `/**
 * radial-color-picker/rotator v${pkg.version}
 *
 * https://github.com/radial-color-picker/rotator
 *
 * Copyright (c) 2018-present, Rosen Kanev
 * Released under the MIT License.
 */`;

export default [
    {
        input: 'src/main.js',
        output: {
            name: 'Rotator',
            file: pkg.browser,
            format: 'umd',
            banner,
        },
        plugins: [
            babel({
                exclude: ['node_modules/**'],
            }),
        ],
    },
    {
        input: 'src/main.js',
        output: {
            name: 'Rotator',
            file: 'dist/rotator.umd.min.js',
            format: 'umd',
            banner,
        },
        plugins: [
            babel({
                exclude: ['node_modules/**'],
            }),
            minify({
                comments: false,
                bannerNewLine: true,
            }),
        ],
    },
    {
        input: 'src/main.js',
        output: [
            { file: pkg.main, format: 'cjs', banner },
            { file: pkg.module, format: 'es', banner },
        ],
        plugins: [
            babel({
                exclude: ['node_modules/**'],
            }),
        ],
    },
];
