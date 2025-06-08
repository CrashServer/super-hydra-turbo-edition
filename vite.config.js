import { defineConfig } from 'vite';

export default defineConfig({ 
    define: {
        global: 'globalThis',
    },
    optimizeDeps: {
        include: ['hydra-synth']
    },
    server: {
        fs: {
            allow: ['..']
        },
        port: 3000,
        host: '0.0.0.0'
        }
});