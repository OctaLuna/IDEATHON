# IDEATHON UCB Colegios 2026

Sitio en español para el evento escolar de innovación de la UCB. La aplicación es una SPA con React 19, TypeScript, Vite, React Router, Tailwind CSS 4, GSAP y Motion.

## Requisitos y comandos

- Node.js 20.19+ y Bun 1.4+
- `bun install`: instalar dependencias según `bun.lock`
- `bun run dev`: iniciar Vite en `http://localhost:3000`
- `bun run format` / `bun run format:check`: aplicar o revisar formato
- `bun run typecheck`: comprobar TypeScript
- `bun run lint`: ejecutar ESLint
- `bun run test`: ejecutar Vitest y React Testing Library
- `bun run build`: crear el bundle de producción
- `bun run verify`: formato, TypeScript, lint, tests y build
- `bun run test:media`: comprobar reproducción local con Playwright; requiere el servidor en marcha
- `bun run visual:baseline`, `bun run test:visual`, `bun run visual:compare`: capturar y comparar la interfaz en cuatro tamaños, dos temas y las rutas principales

## Estructura

- `src/app/`: router, layout y recuperación de scroll
- `src/pages/`: adaptadores delgados para las rutas
- `src/features/`: pantallas, componentes y datos organizados por dominio
- `src/components/`: elementos compartidos de layout y decoración
- `src/hooks/`: hooks comunes
- `src/config/`: rutas, identidad y configuración del evento
- `src/animations/`: registro común de plugins GSAP
- `src/styles/`: tokens y estilos globales
- `.agents/skills/`: skills compartidas del proyecto
- `.githooks/` y `.agents/hooks/`: controles de Git y del ciclo de agentes

## Cápsulas de video

Los originales se preparan con `bun run media:prepare`. El script usa FFprobe para revisar codecs, duración y orientación, FFmpeg para crear versiones H.264/AAC y pósteres, y copia las marcas de los socios.

Los MP4 generados quedan en `public/media/videos/`, que Git ignora para evitar commits grandes. Los pósteres, logos y `src/features/videos/data/media-manifest.json` se conservan en el proyecto. El material original se elimina tras comprobar la salida; para repetir el proceso en otro equipo hay que recuperar los originales y volver a ejecutar el script.

La página de videos solicita un MP4 solo al abrir el reproductor. Los controles nativos del navegador permiten reproducir, pausar y usar pantalla completa; las cápsulas verticales conservan su proporción.

## Git

`core.hooksPath` apunta a `.githooks`. El pre-commit formatea archivos preparados, ejecuta lint y bloquea binarios no permitidos o archivos mayores a 5 MiB. El pre-push ejecuta Vitest. Los MP4 optimizados y las fuentes temporales se mantienen fuera de Git.
