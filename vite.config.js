import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
export default defineConfig({
  plugins: [svelte()],
  server: {
    port: 8000,
    headers: {
      "X-Custom-Header": "value",
      "X-Another-Custom-Header": "anotherValue",
      "Cross-Origin-Embedder-Policy": "require-corp",
      "Cross-Origin-Opener-Policy": "same-origin",
    },
  },
  build: {
    outDir: "build/dist",
    rollupOptions: {
      output: {
        format: "es", // Use 'es' format for workers
      },
    },
  },
  worker: {
    format: "es", // Ensure workers use 'es' format
  },
});
