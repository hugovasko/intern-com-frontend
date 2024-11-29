import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: true, // Needed for docker container
    port: 3000, // Changes default port to 3000
    watch: {
      usePolling: true, // Needed for changes detection in Docker
    },
  },
});
