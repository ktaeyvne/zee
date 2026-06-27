import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
var repoBase = process.env.GITHUB_ACTIONS ? '/zee/' : './';
export default defineConfig({
    base: repoBase,
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    server: {
        host: true,
        port: 5173,
        open: true,
    },
    build: {
        target: 'esnext',
        sourcemap: false,
        cssCodeSplit: true,
        chunkSizeWarningLimit: 1000,
    },
});
