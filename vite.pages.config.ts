import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
export default defineConfig({
  root:fileURLToPath(new URL('./web',import.meta.url)),
  base:'./',
  publicDir:fileURLToPath(new URL("./public",import.meta.url)),
  plugins:[react()],
  server:{host:'127.0.0.1',port:4173},
  build:{outDir:'../.pages-build',emptyOutDir:true,assetsInlineLimit:0},
});
