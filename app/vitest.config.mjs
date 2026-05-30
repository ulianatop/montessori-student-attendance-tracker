import { defineConfig } from 'vitest/config';

export default defineConfig({
  // This tells Vitest: "Stop running as a single project. Use my workspace router!"
  workspace: './vitest.workspace.mjs',
});