import { defineConfig } from 'vite'
import path from 'node:path';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig({
    plugins: [
        dts({
            insertTypesEntry: true,
        }),
    ],
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'rdjs-wheel',
            formats: ['es','umd'],
            fileName: (format) => `rdjs-wheel.${format}.js`
        },
        assetsDir: 'src/assets',
        sourcemap: true,
        rollupOptions: {
            external: ['react', 'react-dom', 'styled-components','react-router-dom','react-redux','redux'],
            output: {
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM',
                    'styled-components': 'styled',
                }
            },
        },
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    }
})


