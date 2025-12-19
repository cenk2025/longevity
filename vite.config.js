import { defineConfig } from 'vite';

export default defineConfig({
    base: '/longevity/',
    build: {
        outDir: 'dist',
        assetsDir: 'assets',
        sourcemap: false,
        minify: 'esbuild',
        rollupOptions: {
            output: {
                manualChunks: {
                    'supabase': ['@supabase/supabase-js']
                }
            }
        }
    },
    server: {
        port: 5173,
        open: true
    }
});
