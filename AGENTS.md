# Guía de IDEATHON

IDEATHON es un sitio en español para el evento escolar de innovación de la UCB. La aplicación es una SPA de React 19, TypeScript, Vite, React Router, Tailwind CSS 4, GSAP y Motion. Mantén el contenido y los datos verificables en español y respeta la identidad, hechos y rutas existentes del evento.

## Comandos

- Instalar dependencias: `bun install`
- Desarrollo: `bun run dev`
- Formato: `bun run format` / `bun run format:check`
- TypeScript: `bun run typecheck`
- Lint: `bun run lint`
- Tests: `bun run test`
- Build: `bun run build`
- Verificación completa: `bun run verify`
- Preparar medios locales: `bun run media:prepare`
- Comprobar reproducción con Playwright: `bun run test:media` (con Vite en marcha)

El lockfile del proyecto es `bun.lock`. No agregues secretos a archivos versionados; `.env.example` solo documenta nombres de variables.

## Arquitectura

- `src/app/`: configuración del router, layout principal y recuperación de scroll.
- `src/pages/`: adaptadores pequeños que conectan rutas con funcionalidades.
- `src/features/`: pantallas y datos por dominio (`home`, `reports`, `videos`, `methodology`, `partners`, `theme`).
- `src/components/layout/` y `src/components/decorative/`: piezas compartidas.
- `src/hooks/`: hooks reutilizables, incluido movimiento reducido y cuenta regresiva.
- `src/config/`: identidad del sitio, rutas y fechas del evento.
- `src/animations/gsap.ts`: registro compartido de GSAP y sus plugins.
- `src/styles/`: estilos globales y tokens.

Prefiere los componentes y datos tipados existentes antes de duplicarlos. Conserva los hechos y rutas verificables; evita inventar detalles sobre los emprendimientos.

## UI y accesibilidad

- Usa `frontend-design` para establecer la dirección visual de una interfaz nueva.
- Usa Impeccable para un comando explícito, auditoría, crítica o refinamiento.
- Conserva el sistema visual existente salvo que la tarea pida rediseñarlo.
- Mantén acceso por teclado, layouts responsive y `prefers-reduced-motion`.
- Anima principalmente `transform` y `opacity`; limpia listeners, timelines y contexto GSAP.
- Los reproductores de video se montan al abrirlos y usan controles nativos; no solicitan los MP4 al cargar la página.

## Skills del proyecto

- `.agents/skills/frontend-design/` y `.agents/skills/impeccable/`: diseño y refinamiento visual.
- `.agents/skills/test-runner/`, `code-formatter/` y `project-auditor/`: tests, formato y revisión técnica.
- Las skills de marketing importadas se describen en sus respectivos `SKILL.md`.
- `.claude/skills/` conserva la copia para Claude Code; `.agent/skills/` contiene las adaptaciones de Antigravity.

## Hooks y calidad

- `.githooks/pre-commit` aplica formato a archivos preparados, ejecuta lint y bloquea binarios o archivos mayores a 5 MiB.
- `.githooks/pre-push` ejecuta la suite Vitest.
- Antigravity usa `.agents/hooks.json`; Codex usa `.codex/hooks.json`; Claude Code usa `.claude/settings.json`.
- Los hooks de parada ejecutan las comprobaciones del agente. Antes de dar una tarea por terminada, ejecuta `bun run verify` y reporta cualquier comprobación pendiente.

## Medios locales

`bun run media:prepare` lee los originales temporales en `BORRAR/` y crea MP4 optimizados, pósteres, logos y un manifiesto. `public/media/videos/` está ignorado por Git. Para repetir el proceso en otro equipo, recupera los originales. No agregues a Git las fuentes ni los MP4.
