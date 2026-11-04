# IDEATHON: automatización propuesta

El flujo de GitHub Actions valida los PR a `develop` y `main`. Un push a `main` construye y verifica la imagen y pública una etiqueta por commit en GitHub Packages. El paquete incluye los videos públicos y debe hacerse público en GitHub Packages antes de que la VPS pueda descargarlo sin credenciales. Las descargas de medios y dependencias requieren la autorización acordada antes de lanzar estas pruebas.

El entorno de GitHub `production` requiere aprobación de OctaLuna, admite autoaprobación y está restringido a `main`. El job de despliegue permanece desactivado mientras la variable de repositorio `IDEATHON_DEPLOY_ENABLED` sea distinta de `true`. No activar está variable hasta que el responsable de la VPS apruebe y verifique la preparacion y el plan de rollback, y se apruebe expresamente el primer despliegue.

## Entrada SSH propuestá para revisión

Los archivos `deploy/ideathon-ssh-entry.sh` y `deploy/ideathon-release.sh` son candidatos para una instalacion controlada por el administrador; no están instalados ni probados en la VPS. El primero invoca al segundo mediante sudo sin interacción, pasando solo el comando original. El segundo acepta exclusivamente un SHA de commit y un digest de imagen, toma un bloqueo, comprueba espacio y actualiza solo `ideathon-web` mediante un override propio; no ejecuta `down`, `prune` ni modifica la configuración original compartida. Si fallan las comprobaciones, intenta restaurar la configuración anterior del servicio.

Para está arquitectura hace falta una cuenta SSH dedicada, una clave exclusiva forzada a la entrada SSH y una regla sudo estricta que permita solamente el script root-owned. Los scripts, el directorio de estado y el archivo sudoers deben ser propiedad de root y no ser modificables por la cuenta de despliegue. La cuenta no debe pertenecer al grupo docker: ese grupo equivale a privilegios elevados. Aun asi, el wrapper autorizado ejecuta Docker como root y requiere una revisión de seguridad del administrador; la restricción no elimina ese riesgo.

Antes de instalar nada, el administrador debe revisar los dos scripts exactos y autorizar explicitamente la creacion de la cuenta, la clave forzada, el directorio `/var/lib/ideathon-deploy`, el archivo local de configuración `/etc/ideathon-deploy.conf`, los scripts instalados en `/usr/local/libexec/ideathon-ssh-entry` y `/usr/local/sbin/ideathon-release`, y la regla sudo especifica. Los comandos de instalacion y su rollback se entregaran con los hashes del commit aprobado. No copiar ni guardar claves privadas en el repositorio ni en el chat.

## Configuracion de GitHub pendiente

Despues de revisar y autorizar el acceso, configurar las variables de repositorio `IDEATHON_DEPLOY_HOST` e `IDEATHON_DEPLOY_USER`, y los secretos de entorno `IDEATHON_DEPLOY_KEY` e `IDEATHON_KNOWN_HOSTS`. El ultimo debe contener la clave pública de servidor confirmada por el administrador; el fingerprint no reemplaza el archivo known_hosts. Una vez que GitHub Packages sea público, la imagen se haya probado y se haya verificado la proteccion de `production`, habilitar el despliegue solamente con aprobación expresa.

Los trabajos de CI y el wrapper no se han ejecutado integralmente todavia. La prueba local previa utilizo una imagen anterior. No públicar ni activar el flujo hasta probarlo y revisar los resultados. No hay CI obligatorio en las ramas hasta que un workflow exitoso establezca su nombre de comprobacion.

## Recuperacion

El script conserva la imagen anterior y la configuración previa de su override; intenta restaurarlas si falla el servicio o sus comprobaciones. Si el rollback falla, detiene el proceso y requiere intervencion. Antes del primer despliegue se debe acordar con infraestructura una recuperacion manual concreta de `ideathon-web` y verificar la disponibilidad de la imagen anterior. No ejecutar `docker compose down`, limpiezas globales ni operaciónes sobre otros servicios.
