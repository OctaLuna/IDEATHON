# Registro de progreso

## 2026-10-23

- Marca: consolidar la identidad del proyecto y los textos públicos como IDEATHON.
- Fecha límite: extender el plazo de postulación al 26 de octubre de 2026.
- Organizador: retirar de toda la web la referencia a Administración de Empresas y conservar UCB/Facultad.
- Metodología: ordenar Design Thinking (usuario, problemas, idea/solución), Lean Canvas, prototipado y exposición; documentar el contexto de producto y el sistema visual/animaciones existentes en PRODUCT.md y DESIGN.md.
- Herramientas: actualizar Impeccable a 4.7.0, conservar sus licencias y hooks de calidad, y configurar el selector visual para Vite.

## 2026-10-30

- Vercel: añadir fallback de rutas SPA y fijar `dist` como salida de producción.
- Medios: mantener los MP4 fuera de Git, reactivar la biblioteca y añadir carga/sincronización con Blob; el build verifica que los ocho estén en `dist/media/videos/` antes de publicar.
- Auditoría: corregir contraste de textos y el salto de encabezado en la guía metodológica sin cambiar el sistema visual ni las animaciones; revisar hallazgos y verificaciones en `docs/audit-2026-10-30.md`.
- Publicación pendiente: el entorno no tiene sesión de Vercel ni origen/token de Blob configurados, así que no se cargaron medios ni se inició un despliegue de producción.
- Identidad: auditoría exhaustiva de la marca confirmando su completa estandarización como IDEATHON en código, configuración, metadatos y documentación.

## 2026-11-02

- Vercel: vincular el proyecto existente `ideathon-2026`, crear y conectar el almacén público `ideathon-videos`, y configurar su origen para Production y Preview.
- Medios: subir los ocho MP4 optimizados a Blob y corregir el cargador para evitar un conflicto entre las credenciales OIDC y el token de escritura en Windows. Los archivos y las credenciales locales permanecen fuera de Git.
- Publicación: desplegar la rama `main` en producción y comprobar en los registros que los ocho videos y sus pósteres se incluyen en `dist`. Las rutas directas y la reproducción se verificaron en el sitio publicado; los ocho MP4 respondieron con HTTP 200.
- Calidad: `npm run verify` pasó completo y la prueba de medios pasó contra el despliegue público. Se usó npm porque Bun no está disponible en este equipo.
- Apertura: ocultar enlaces a Reportes y Videos hasta el 6 de noviembre de 2026 a las 09:00 en Bolivia; activar la navegación sin recargar y conservar el acceso por URL directa.
- Responsive: revisar cinco rutas en seis anchos y ambos temas con Playwright; corregir una carrera en el menú móvil y respetar movimiento reducido.
- Capacidad: ejecutar en local etapas de 30, 100 y 300 usuarios virtuales y registrar resultados y límites de Vercel en `docs/capacity-2026-11-02.md`.
- Producción: comprobar 100 solicitudes simultáneas al HTML inicial y otras 100 visitas simuladas que descargaron HTML y recursos principales en Vercel (800 respuestas HTTP 200); verificar una visita con Playwright y registrar el alcance en el informe de capacidad.

## 2026-11-03

- Metodología: incorporar la guía rápida original con visor para escritorio, vista previa móvil y enlaces para abrirla y descargarla; se confirmó que el PDF copiado es idéntico al original.
- Portada y socios: retirar la descarga del calendario, corregir la línea visible sobre la tarjeta de la jornada y añadir el logo de Fundación Jubileo conservando el diseño y las animaciones.
- VPS: añadir Docker Compose, compilación con Bun y Nginx con rutas SPA, PDF, archivos ausentes y video por rangos. Documentar en `docs/vps.md` la conexión al proxy, los comandos y las opciones de copiar o descargar los ocho MP4, que permanecen fuera de Git. La configuración de Vercel se conserva.
- Calidad: `npm run verify` y `npm run test:media` aprobados. Playwright comprobó guía, descarga, logo y portada en 320, 390, 768, 1024 y 1440 px, temas claro y oscuro, movimiento reducido y fechas anterior y posterior a la activación. En Docker se verificaron rutas directas, PDF, 404 y respuestas 206 de los ocho videos. Se usó npm localmente porque Bun no está en el PATH; la imagen se construyó con Bun.

## 2026-11-04

- Metodología: trasladar la guía rápida debajo de los ocho pasos y antes de la explicación de ideación, conservando su visor y descarga.

## 2026-11-04 — Preparación institucional

- Docker: permitir etiquetar la imagen local por commit y añadir una comprobación local de rutas, PDF, errores y rangos de los ocho videos.
- VPS: actualizar la guía para reflejar Caddy, el servicio IDEATHON existente y la coordinación y autorización requeridas antes de publicar.
- Validación local: rutas, PDF y rangos de ocho videos comprobados sobre una imagen ya existente; la reconstrucción de la imagen actual queda pendiente de autorización para descargar sus bases.
- Socios: incorporar el logo proporcionado de BancoSol en la tarjeta del auspiciador, conservando el estilo existente.
- CI/CD: preparar workflow de validación, públicación de imagen por commit y despliegue condicionado a aprobación; crear entorno production protegido y documentar la preparacion SSH pendiente.
- CI/CD: reconstrucción Docker local completada tras autorización; se comprobaron rutas, PDF, 404 y rangos de los ocho videos. La instalación SSH y el rollback en la VPS siguen pendientes de aprobación y prueba.
- Seguridad: mover las rutas y nombres internos de infraestructura a una configuración local protegida en la VPS, pendiente de instalación y revisión.
- CI/CD: validar en una simulación local aislada el flujo exitoso y el intento de recuperación ante una falla; no se ejecutó el despliegue real en la VPS.
- Seguridad: comprobar las etiquetas Compose antes de actualizar para rechazar cualquier contenedor ajeno a IDEATHON.
- Socios: sustituir BancoSol por Banco FIE en la ficha, la portada y el pie; incorporar información institucional, áreas de trabajo y logo oficial.
- VPS: confirmada por consulta del administrador la ruta activa de Caddy hacia ideathon-web:80; la preparacion SSH y el primer despliegue siguen pendientes de revision y autorizacion.
- VPS: creada la cuenta SSH dedicada y registrados los scripts verificados y secretos de produccion; despliegue desactivado. La clave autorizada aun no es legible para la cuenta y el ajuste de permisos quedo bloqueado por revision automatica. IDEATHON sigue saludable con la imagen anterior.
- VPS: tras autorizacion expresa, se ajusto la lectura de la clave publica; el archivo y su directorio permanecen bajo propiedad de root y la cuenta no puede modificarlos. Pendientes la prueba de acceso de Actions y la aprobacion del primer despliegue.
- VPS: primer despliegue intento reemplazar solo ideathon-web; se restauro automaticamente la imagen anterior por un falso fallo de rangos de BusyBox wget. Se corrigio la comprobacion y una prueba aislada confirmo respuesta 206 en los ocho videos y rechazo de un archivo ausente. La publicacion corregida queda pendiente de validacion y aprobacion.
- VPS: despliegue corregido aprobado y completado mediante GitHub Actions. IDEATHON quedo saludable en su red y alias existentes; rutas publicas y PDF respondieron 200 y los ocho videos respondieron 206 por rangos. Los demas contenedores continuaron en ejecucion. Espacio libre observado: 3,7 GB.
- Identidad: actualizar el foco de la barra e incorporarlo como icono de pestaña; sustituir el texto de marca por el logo transparente proporcionado, conservando UCB · LA PAZ. Verificado en ambos temas entre 320 y 1440 px, sin desbordamientos; npm run verify aprobado.
- Navegacion: retirar el foco de la barra superior y adaptar el ancho del logo a la pantalla; conservar el favicon. Playwright verifico logo, apertura y cierre del menu y ausencia de desbordes en 11 anchos de 280 a 1440 px, con ambos temas.
- Identidad: colocar UCB · LA PAZ al lado del logo y comprobar con Playwright su posicion, el menu y los anchos de 280 a 1440 px en ambos temas.
- Navegacion: integrar el logo con una etiqueta azul para UCB · LA PAZ, segun la propuesta elegida. Verificado con Playwright en ambos temas entre 280 y 1440 px y con npm run verify.
- CI/CD: ante la suspension del almacen Vercel Blob, usar temporalmente la VPS como origen de los ocho videos para las compilaciones de GitHub Actions e ideathon-2026. La VPS sigue sirviendo los medios localmente.
- Navegacion: restaurar la marca anterior con foco, texto IDEATHON y UCB - LA PAZ debajo, a solicitud del usuario; conservar el favicon y el origen temporal de medios.
- Git: conciliar main con develop para preservar el despliegue automatico actual y el origen temporal de videos de la VPS antes del PR a main.

## 2026-11-06

- Recursos: habilitar Videos desde ahora y mantener ocultos los enlaces de Reportes hasta nueva indicacion, sin bloquear su ruta directa. Actualizar la portada y la metodologia para no dirigir a la seccion oculta. Playwright comprobo antes y despues de las 09:00, en 320, 768 y 1440 px; test:media verifico la reproduccion local.
- Produccion: desplegados Videos visibles y Reportes ocultos; verificados antes y despues de las 09:00 en el sitio oficial, incluida la reproduccion. El primer intento se detuvo por espacio; se retiro solo una imagen IDEATHON antigua sin contenedores, recuperable desde GHCR, conservando la activa y la anterior. Tras el despliegue quedaron aproximadamente 1,8 GiB libres; solicitar revision de almacenamiento a infraestructura.

- Reportes: habilitar la seccion en local y sustituir los ejemplos por el analisis de Fundacion Jubileo de noviembre de 2026. Incorporar el PDF original, vistas previas, visor ampliado y descarga; mantener Videos visible. Verificados SHA-256 de la descarga y de dist, Playwright en 320, 390, 768, 1024 y 1440 px en ambos temas, cierre con Escape y verificacion completa con npm. Pendiente revision del usuario antes de publicar.
