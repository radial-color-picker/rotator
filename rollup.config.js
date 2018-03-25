import butternut from 'rollup-plugin-butternut';

export default [
    {
        input: 'src/main.js',
        output: { name: 'rotator', file: 'dist/rotator.umd.js', format: 'umd' }
    },
    {
        input: 'src/main.js',
        output: { name: 'rotator', file: 'dist/rotator.umd.min.js', format: 'umd' },
        plugins: [butternut()]
    },
    {
        input: 'src/main.js',
        output: [
            { file: 'dist/rotator.cjs.js', format: 'cjs' },
            { file: 'dist/rotator.esm.js', format: 'es' }
        ]
    }
];
