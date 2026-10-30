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
