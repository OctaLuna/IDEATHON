---
name: code-formatter
description: Format IDEATHON source and check formatting with Prettier.
---

# Code formatter

Run `bun run format:check` before finishing a change. `bun run format` formats the project harness and test files. The Git pre-commit hook uses lint-staged to format staged application source; do not manually reformat unrelated files. Prettier settings live in `.prettierrc.json`.
