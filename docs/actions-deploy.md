# IDEATHON: despliegue con GitHub Actions

Los PR a `develop` y `main` ejecutan la verificaci?n del proyecto, construyen una imagen Linux/amd64 y comprueban el PDF y los ocho videos. Un push a `main` publica una imagen p?blica en GitHub Packages, identificada por el commit y su digest.

El entorno `production` est? restringido a `main` y requiere aprobaci?n en GitHub. Con `IDEATHON_DEPLOY_ENABLED=true`, cada push validado a `main` espera esa aprobaci?n antes de actualizar la VPS. La publicaci?n comprueba que el commit siga siendo el ?ltimo de `main` y despliega por digest.

## VPS y acceso SSH

El 4 de noviembre de 2026 se instal? una cuenta SSH dedicada con una clave forzada a `deploy/ideathon-ssh-entry.sh`. La cuenta no pertenece al grupo Docker. El script de entrada invoca mediante sudo a `deploy/ideathon-release.sh`, que valida el comando, verifica el servicio y actualiza exclusivamente `ideathon-web` con un override propio, sin modificar el Compose compartido.

Los scripts instalados, su configuraci?n, el directorio de estado y la regla sudo pertenecen a root. La clave autorizada es legible por la cuenta, pero esta no puede modificarla. La regla permite ejecutar un script que opera Docker como root, por lo que requiere mantener la revisi?n de seguridad y la protecci?n de sus archivos.

Los scripts instalados en la VPS **no se actualizan autom?ticamente** al cambiar los archivos del repositorio. Antes de usar una nueva versi?n, una persona administradora debe revisar los cambios y sus hashes e instalarla de forma controlada. No guardar claves privadas en el repositorio ni en el chat.

Las variables de repositorio `IDEATHON_DEPLOY_HOST` e `IDEATHON_DEPLOY_USER` y los secretos del entorno `IDEATHON_DEPLOY_KEY` e `IDEATHON_KNOWN_HOSTS` est?n configurados. La identidad del servidor debe verificarse antes de modificar `IDEATHON_KNOWN_HOSTS`.

## Verificaci?n y recuperaci?n

El despliegue del 4 de noviembre de 2026 fue aprobado en GitHub y comprob? la salud del servicio, el PDF y las respuestas por rango de los videos. El dominio conserva la ruta existente de Caddy hacia `ideathon-web:80`.

El script conserva la configuraci?n anterior y trata de restaurar ?nicamente IDEATHON si fallan sus verificaciones. En el primer intento, una incompatibilidad de la comprobaci?n con BusyBox wget activ? el rollback; se corrigi? y se comprob? antes del despliegue exitoso. Si el rollback falla, requiere intervenci?n de infraestructura. Mantener disponible la imagen anterior y no ejecutar `docker compose down`, limpiezas globales ni operaciones sobre otros servicios.
