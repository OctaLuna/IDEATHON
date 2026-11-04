# Despliegue en VPS

La VPS necesita Git, Docker Engine y Docker Compose. El proxy existente administra el dominio y HTTPS. Este servicio escucha por defecto en `127.0.0.1:8080` del servidor, por lo que el proxy instalado en el host puede reenviar tráfico HTTP a esa dirección. Si el proxy está en otro contenedor, conéctalo a la red de Compose y usa el servicio `web` en el puerto 80; no uses `127.0.0.1` dentro de ese otro contenedor.

## Primera instalación

```sh
git clone https://github.com/OctaLuna/IDEATHON.git
cd IDEATHON
git checkout main
```

Los ocho MP4 no están en Git. Elige una de estas opciones antes de construir:

1. Descargarlos una vez del almacén público actual, sin token:

   ```sh
   docker compose --profile media run --rm media-fetch
   ```

   Para otro almacén público, define `MEDIA_BLOB_BASE_URL` con su origen HTTPS antes del comando. La descarga requiere que el almacén siga disponible. Se sustituyen los videos locales existentes.

2. Copiar manualmente los ocho MP4 optimizados a `public/media/videos/`, conservando los nombres indicados en `src/features/videos/data/media-manifest.json`. Por ejemplo, desde el equipo que los contiene: `scp public/media/videos/*.mp4 usuario@servidor:/ruta/IDEATHON/public/media/videos/` (crea primero el directorio en la VPS).

Después construye y levanta el servicio:

```sh
docker compose up -d --build
```

La construcción comprueba los ocho videos y sus pósteres y falla si faltan. El PDF, el logo y todos los medios se sirven desde la imagen construida; el contenedor en ejecución no depende de Blob. La aplicación no necesita variables de entorno para mostrarse. Los MP4 siguen fuera de Git.

Para cambiar la dirección o puerto del host, define `IDEATHON_BIND_ADDRESS` e `IDEATHON_PORT` al ejecutar Compose. Por ejemplo, `IDEATHON_PORT=8081 docker compose up -d --build`. Ajusta el destino del proxy de acuerdo con ello. Evita publicar el puerto en todas las interfaces cuando solo el proxy deba acceder.

## Actualización y comprobación

```sh
git pull --ff-only origin main
docker compose up -d --build
docker compose ps
curl -I http://127.0.0.1:8080/metodologia
curl -I http://127.0.0.1:8080/media/docs/guia-rapida-del-equipo.pdf
curl -I -H 'Range: bytes=0-1023' http://127.0.0.1:8080/media/videos/NOMBRE-DEL-VIDEO.mp4
```

Sustituye el nombre del video por uno del manifiesto: la respuesta por rango debe ser `206 Partial Content`. Un archivo inexistente debe devolver `404`. También abre el dominio HTTPS y comprueba la guía, su descarga, las rutas directas y la reproducción. Si se añaden o cambian videos, vuelve a copiarlos o sincronizarlos antes del build. Los archivos descargados permanecen en `public/media/videos/` entre actualizaciones.

Vercel conserva su configuración y su proceso de sincronización durante la transición. Esta guía prepara la instalación; no configura el proxy ni los certificados.
