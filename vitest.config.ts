import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";

export default defineConfig({
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
  plugins: [react()],
  test: {
    environment: "jsdom",
    maxWorkers: 1,
    pool: "threads",
    setupFiles: ["./src/test/setup.ts"],
    restoreMocks: true,
  },
});
