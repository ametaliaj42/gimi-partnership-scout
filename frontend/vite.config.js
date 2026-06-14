import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/*
 * base must match the GitHub repository name so asset paths resolve correctly
 * on GitHub Pages (e.g. /gimi-partnership-scout/ for a repo named gimi-partnership-scout).
 * Update this value if the repository is renamed.
 */
export default defineConfig({
  plugins: [react()],
  base: '/gimi-partnership-scout/',
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
});
