---
name: code-formatter
description: Format IDEATON source and check formatting with Prettier.
---

# Code formatter

Run `bun run format:check` before finishing a change. Format project source and root docs/config with `bun run format`. The Git pre-commit hook uses lint-staged to format staged application source and root-level project files; do not manually reformat unrelated files. Prettier settings live in `.prettierrc.json`.
