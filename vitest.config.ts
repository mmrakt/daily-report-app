/// <reference types="vitest" />
import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: ['./test/setupTests.ts'],
        coverage: {
            reporter: ['text', 'html'],
            include: ['src/'],
        },
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src/'),
        },
    },
})
