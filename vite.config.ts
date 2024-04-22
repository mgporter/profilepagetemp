import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import dsv from "@rollup/plugin-dsv"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact(), dsv()],
  resolve: {
    alias: [
      {find: '@', replacement: "/src/screenshots/webp_full"}
    ]
  }
})
