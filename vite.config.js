import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { federation } from '@module-federation/vite';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'host',
      remotes: {
        remote: {
          type: "module",
          name: "remote",
          entry: "http://localhost:5174/remoteEntry.js",
          entryGlobalName: "remote",
          shareScope: "default",
        }
      },
      filename: "remoteEntry.js",
      shared: {
        react: {
          singleton: true,
        },
        'react/': {
          singleton: true,
        },
      },
    }),  
  ],
  resolve: {
    alias: {
      "@": "./components",
    },
  },
})
