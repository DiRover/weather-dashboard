import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import {resolve} from 'path';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
    resolve: {
        alias: {
            '@': resolve(__dirname, './src'),
            '@assets': path.resolve(__dirname, './src/assets'),
        },
    },
    plugins: [react(), tailwindcss(), svgr()],
});
