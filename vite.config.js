import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { federation } from '@module-federation/vite';

// eslint-disable-next-line no-undef
const isTest = process.env.NODE_ENV === 'test' || process.env.VITEST;

export default defineConfig({
  plugins: [
    react(),
    ...(isTest 
      ? [] 
      : [federation({
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
      })
      ]),  
  ],
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: './src/test/setup.js',
    deps: {
      inline: [/@module-federation\/vite/]
    }
  },
  resolve: {
    alias: {
      "@": "./components",
    },
  },
})