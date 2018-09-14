import butternut from 'rollup-plugin-butternut';
import babel from 'rollup-plugin-babel';
import pkg from './package.json'

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
            name: 'rotator',
            file: 'dist/rotator.umd.js',
            format: 'umd',
            banner
        },
        plugins: [
            babel({
                exclude: ['node_modules/**']
            })
        ]
    },
    {
        input: 'src/main.js',
        output: {
            name: 'rotator',
            file: 'dist/rotator.umd.min.js',
            format: 'umd',
            banner
        },
        plugins: [
            babel({
                exclude: ['node_modules/**']
            }),
            butternut()
        ]
    },
    {
        input: 'src/main.js',
        output: [
            { file: 'dist/rotator.cjs.js', format: 'cjs', banner },
            { file: 'dist/rotator.esm.js', format: 'es', banner }
        ],
        plugins: [
            babel({
                exclude: ['node_modules/**']
            })
        ]
    }
];
