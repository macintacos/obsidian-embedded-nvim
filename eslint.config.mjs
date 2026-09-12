import { defineConfig, globalIgnores } from "eslint/config";
import obsidianmd from "eslint-plugin-obsidianmd";

// biome owns format and general lint; eslint keeps only the Obsidian review-bot rules.
const obsidianRulesOnly = (config) => ({
  ...config,
  rules: Object.fromEntries(
    Object.entries(config.rules ?? {}).filter(([name]) => name.startsWith("obsidianmd/")),
  ),
});

export default defineConfig(
  // main.js is the build output; this config is outside the tsconfig project `projectService`
  // needs. Widening hk's eslint glob to .mjs also needs `--no-warn-ignored`.
  globalIgnores(["main.js", "eslint.config.mjs"]),
  {
    languageOptions: {
      parserOptions: { projectService: true, tsconfigRootDir: import.meta.dirname },
    },
  },
  ...obsidianmd.configs.recommended.map(obsidianRulesOnly),
);
