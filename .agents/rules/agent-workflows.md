---
trigger: always_on
description: Shared quality gates and skill selection for this project.
---

# Agent workflow

- For a new UI direction, use the `frontend-design` skill. For explicit Impeccable commands, audits, critique, polish, or focused refinement, use the `impeccable` skill.
- Before completing implementation, run lint, tests, and build. If a check fails, fix the issue and rerun it; if it cannot be run, state that clearly.
- Do not claim a check passed without its command completing successfully.
- Keep edits scoped to the task and avoid reformatting unrelated files.
