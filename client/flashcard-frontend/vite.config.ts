import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    host: true, // Allows external connections
    port: parseInt(process.env.PORT) || 3000, // Uses Railway's PORT environment variable
  },
  preview: {
    port: parseInt(process.env.PORT) || 4173, // Ensure the preview server binds to the correct port
  },
});
