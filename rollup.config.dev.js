import serve from 'rollup-plugin-serve';

export default [
    {
        input: 'src/main.js',
        output: [
            {
                file: 'sandbox/dist/rotator.esm.js',
                format: 'es',
                sourcemap: 'inline'
            }
        ]
    },
    {
        input: 'sandbox/src/main.js',
        output: {
            file: 'sandbox/dist/bundle.js',
            format: 'iife',
            sourcemap: 'inline'
        },
        plugins: [
            serve({
                port: 8080,
                contentBase: ['sandbox']
            })
        ]
    }
];
