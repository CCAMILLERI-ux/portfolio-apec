import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// base relative + routage par hash : le build s'ouvre sur n'importe quel
// hébergement statique (sous-dossier compris) sans règle de réécriture.
export default defineConfig({
  base: './',
  plugins: [react()],
})
