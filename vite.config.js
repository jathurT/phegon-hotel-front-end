import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0", // Allows access from any IP
    port: 5173, // Runs the development server on port 5173
  },
  root: ".", // Ensure the root is set to the current directory
  publicDir: "public", // If your index.html is in a public folder
  build: {
    outDir: "dist", // Ensure the build output goes to the dist directory
    emptyOutDir: true, // Clears the dist directory before building
  },
});