import obsidianmd from "eslint-plugin-obsidianmd";
import { defineConfig, globalIgnores } from "eslint/config";

// biome owns format and general lint; eslint keeps only the Obsidian review-bot rules.
const obsidianRulesOnly = (config) => ({
  ...config,
  rules: Object.fromEntries(
    Object.entries(config.rules ?? {}).filter(([name]) => name.startsWith("obsidianmd/")),
  ),
});

export default defineConfig(
  globalIgnores(["main.js", "eslint.config.mjs"]),
  {
    languageOptions: {
      parserOptions: { projectService: true, tsconfigRootDir: import.meta.dirname },
    },
  },
  ...obsidianmd.configs.recommended.map(obsidianRulesOnly),
);
