import { defineConfig } from "vite";
export default defineConfig({
  server: {
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
