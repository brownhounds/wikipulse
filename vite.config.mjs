import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig({
    build: {
        // Vite 8's default Oxc minifier mangles class names with no working
        // option to keep them. The @component decorator reads class.name to
        // derive the custom-element tag, so we use esbuild minify instead
        // (esbuild installed as a separate dep in v8) which honors keepNames.
        minify: 'esbuild',
    },
    esbuild: {
        keepNames: true,
        minifyIdentifiers: false,
    },
    resolve: {
        alias: {
            '#src': resolve(import.meta.dirname, 'src'),
        },
    },
});
