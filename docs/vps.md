# Preparación Docker de IDEATHON

El dominio previsto es `ideathon.adm-ucb.lat`. Otra persona administra DNS, Cloudflare y Caddy. El servidor ya ejecuta `ideathon-web` dentro del proyecto Compose compartido `tedx-facultyweek-platform`. No modifiques ese proyecto ni ejecutes sus comandos de despliegue hasta acordar con infraestructura el procedimiento específico y recibir autorización de despliegue.

## Preparación y prueba local

Necesitas Docker Engine y Docker Compose. Los ocho MP4 no están en Git. Cópialos a `public/media/videos/`, con los nombres de `src/features/videos/data/media-manifest.json`. En el equipo local también está disponible `docker compose --profile media run --rm media-fetch`, que descarga los ocho archivos desde el almacén público configurado; esta operación requiere acceso externo y reemplaza los videos existentes después de validarlos.

Para construir una imagen identificada por commit y probarla en un proyecto Compose local aislado, verifica primero que `git status --short` no muestre cambios sin confirmar; de otro modo la etiqueta no identifica todo el contenido compilado:

```sh
export IDEATHON_IMAGE="ideathon:$(git rev-parse --short=12 HEAD)"
export IDEATHON_PORT=18080
docker compose -p ideathon-local build web
docker compose -p ideathon-local up -d --no-build web
IDEATHON_TEST_URL=http://127.0.0.1:18080 node scripts/test-container.mjs
docker compose -p ideathon-local stop web
```

En PowerShell, usa `$env:IDEATHON_IMAGE = "ideathon:$(git rev-parse --short=12 HEAD)"`, `$env:IDEATHON_PORT = "18080"` y `$env:IDEATHON_TEST_URL = "http://127.0.0.1:18080"` antes de los comandos correspondientes. La compilación falla si falta un video o póster requerido. La imagen final sirve localmente el PDF, los ocho MP4 y sus pósteres; no necesita conexión a Blob en ejecución.

El puerto por defecto del servicio local es `127.0.0.1:8080`, configurable con `IDEATHON_BIND_ADDRESS` e `IDEATHON_PORT`. La prueba usa 18080 para evitar conflictos habituales. No publiques el puerto en todas las interfaces sin acordarlo con infraestructura.

## Integración institucional pendiente

Caddy corre en un contenedor y comparte una red con el `ideathon-web` existente. Su dirección `127.0.0.1` es la del propio contenedor Caddy, no la del host ni la del nuevo servicio. La persona responsable de Caddy y Cloudflare debe acordar la red, el nombre DNS interno y el puerto antes de configurar la ruta del dominio. La integración no está implementada ni validada en la VPS.

La imagen anterior observada es `tedx-platform-ideathon:release-20261026-v2`. Antes de publicar, el responsable debe confirmar que sigue disponible, identificar la imagen actualmente activa, acordar el cambio mínimo sobre el servicio existente y documentar los comandos exactos de recuperación. No ejecutar limpiezas, reinicios generales ni `docker compose down` sobre el proyecto compartido. El servidor tenía 4,4 GB libres durante la auditoría; verificar de nuevo el espacio con infraestructura antes de construir o importar imágenes.

Vercel conserva su configuración actual durante la transición. Esta guía prepara y verifica la imagen; el primer despliegue requiere un plan específico y autorización independientes.
