# IDEATHON: GitHub Actions y producción

Los pull requests a `develop` y `main` verifican el código, compilan una imagen Linux/amd64 y prueban el PDF y los ocho videos. Cada push a `main` publica una imagen inmutable en GHCR y la despliega automáticamente, después de que `verify` termine correctamente. El trabajo confirma que el commit siga siendo el último de `main` y fija la imagen por digest.

El despliegue usa el entorno `production-auto`, sin aprobación manual. `IDEATHON_DEPLOY_ENABLED` debe permanecer en `true` para mantener la automatización.

## Medios

Vercel Blob devuelve HTTP 403 para los videos. Hasta trasladar esos medios a un almacén administrado junto con el proyecto, el workflow los sincroniza desde el dominio público actual `https://ideathon.adm-ucb.lat` antes de compilar. La página publicada debe seguir sirviendo los archivos de medios para que los siguientes builds puedan obtenerlos.

Conservar una copia independiente de los videos para poder recuperarlos si la VPS deja de estar disponible. El proyecto `ideathon-2026` de Vercel utiliza el mismo origen temporal para sus compilaciones.

## Acceso y aislamiento del servidor

El secreto SSH de Actions es una clave Ed25519 exclusiva para IDEATHON, con frase de paso. La entrada correspondiente en `authorized_keys` fuerza `/home/adminkaaiya/.local/bin/ideathon-release-entry` y deshabilita shell interactivo y forwarding. La rutina actualiza únicamente `ideathon-web`, espera su healthcheck y verifica el PDF, los rangos de video y HTTPS público. Si falla, restaura el valor anterior de `IDEATHON_IMAGE_TAG` y el contenedor previo. Usa el candado común para serializar despliegues de esta plataforma.

El workflow no modifica Caddy, DNS, PostgreSQL, Redis, Porerekua ni Amazonía. La ruta de Caddy existente sigue apuntando a `ideathon-web:80`. En esta automatización ya no se usa el acceso anterior `ideathon-actions` ni el entrypoint root-owned de la VPS.

## Configuración de GitHub

Variables de repositorio:

- `IDEATHON_DEPLOY_ENABLED=true`
- `IDEATHON_DEPLOY_HOST=201.131.41.89`
- `IDEATHON_DEPLOY_USER=adminkaaiya`

Secretos de repositorio:

- `IDEATHON_DEPLOY_KEY`
- `IDEATHON_DEPLOY_KEY_PASSPHRASE`
- `IDEATHON_KNOWN_HOSTS`

No guardar claves privadas ni frases de paso en el repositorio. Verificar la huella SSH antes de actualizar `IDEATHON_KNOWN_HOSTS`.
