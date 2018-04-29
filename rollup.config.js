import butternut from 'rollup-plugin-butternut';
import babel from 'rollup-plugin-babel';

export default [
    {
        input: 'src/main.js',
        output: { name: 'rotator', file: 'dist/rotator.umd.js', format: 'umd' },
        plugins: [
            babel({
                exclude: ['node_modules/**'],
            }),
        ]
    },
    {
        input: 'src/main.js',
        output: { name: 'rotator', file: 'dist/rotator.umd.min.js', format: 'umd' },
        plugins: [
            babel({
                exclude: ['node_modules/**'],
            }),
            butternut()
        ]
    },
    {
        input: 'src/main.js',
        output: [
            { file: 'dist/rotator.cjs.js', format: 'cjs' },
            { file: 'dist/rotator.esm.js', format: 'es' }
        ],
        plugins: [
            babel({
                exclude: ['node_modules/**'],
            })
        ]
    }
];
