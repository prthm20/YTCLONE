import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import discardUnused from 'postcss-discard-unused';

export default defineConfig({
  plugins: [
    react(),
  ],
  
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  
  build: {
    outDir: 'build', // Set the output directory to 'build'
  },
  publicDir: 'public',
  
  css: {
    postcss: {
      plugins: [
        tailwindcss,
        autoprefixer,
        discardUnused({
          keyframes: false,
          // Additional options if needed
        }),
      ],
    },
  },
});