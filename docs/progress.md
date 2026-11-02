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
