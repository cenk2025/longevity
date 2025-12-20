import { defineConfig } from 'vite';

export default defineConfig({
    base: '/longevity/', // GitHub Pages path (use '/' for custom domain on Vercel)
    build: {
        outDir: 'dist',
        assetsDir: 'assets',
        sourcemap: false,
        minify: 'esbuild',
        rollupOptions: {
            output: {
                manualChunks: {
                    vendor: ['@supabase/supabase-js']
                }
            }
        }
    },
    server: {
        port: 5173,
        open: true
    }
});
