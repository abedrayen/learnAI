// Alternative Vite config for GitHub Pages with repository path
// If your GitHub Pages URL is: https://username.github.io/repo-name/
// Uncomment and use this config, or update base in vite.config.ts

import { defineConfig } from 'vite';

// Replace 'your-repo-name' with your actual repository name
const REPO_NAME = 'your-repo-name';

export default defineConfig({
  base: `/${REPO_NAME}/`,  // Use this if deploying to a repository (not user page)
  // base: './',            // Use this for user/organization pages or root deployment
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: undefined,
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    }
  }
});

