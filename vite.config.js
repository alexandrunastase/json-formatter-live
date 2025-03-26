import {defineConfig} from 'vite';
import vituum from 'vituum'
import pages from 'vituum/plugins/pages'
import tailwindcss from '@vituum/vite-plugin-tailwindcss';
import twig from '@vituum/vite-plugin-twig';
import {resolve} from 'path';

export default defineConfig({
    plugins: [
        vituum(),
        tailwindcss(),
        twig({
            root: './src'
        })
    ],
    build: {
        outDir: 'dist',
        rollupOptions: {
            input: [
                './src/emails/*.{json,latte,twig,liquid,njk,hbs,pug,html}',
                './src/pages/**/*.{json,latte,twig,liquid,njk,hbs,pug,html}',
                '!./src/pages/**/*.{latte,twig,liquid,njk,hbs,pug,html}.json'
            ]
        },
    },
    publicDir: 'public',
    server: {
        port: 3000,
        open: true,
        watch: {
            usePolling: true,
        },
    }
});
