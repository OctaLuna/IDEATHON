---
name: project-auditor
description: Audit IDEATON changes for correctness, accessibility, performance, and consistency with its React and Vite architecture.
---

# Project auditor

Review the changed UI and related data for route correctness, responsive behavior, keyboard access, meaningful labels, reduced-motion support, and consistency with the current UCB visual system. Check for avoidable re-renders, uncleaned event listeners or GSAP contexts, duplicated content, and accidental secrets or large generated assets. Run `bun run lint`, `bun run test`, and `bun run build`; report concrete findings and verification evidence.
