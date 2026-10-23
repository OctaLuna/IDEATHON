# IDEATHON — Plataforma Web Creativa & Juvenil UCB

Sitio web oficial, informativo e interactivo para el evento **IDEATHON**, organizado por la carrera de Administración de Empresas de la Universidad Católica Boliviana (UCB) con premios otorgados por Samuel Doria Medina. Diseñado con una identidad visual _"collage juvenil / streetwear editorial"_ inspirada en la cultura creativa urbana, con tipografías display expresivas, garabatos vectoriales dibujados a mano, stickers con efecto parallax e ingeniería de animación fluida mediante GSAP.

---

### User Review & Critical Decisions

> [!IMPORTANT]
> Confirmaciones registradas en la fase de alineación inicial:

- **Flujo de Inscripción ("Inscríbete")**: Modal interactivo de 4 pasos con validación en tiempo real (Colegio y tutor, Integrantes del equipo [3 a 5 estudiantes], Idea preliminar de innovación y Generación de Credencial/Ticket de participación).
- **Interacción de Stickers y Collage**: Parallax suave ligado a la posición del cursor/scroll con inclinación (_tilt_) y microinteracciones de rebote (_back.out_) en hover.
- **Detalle de Cronograma y Ticket**: Entrada digital estilo ticket con código de barras y borde troquelado, cronograma completo hora por hora con filtros de bloque, modal con mapa interactivo del Campus UCB La Paz y descarga de archivo de calendario (.ics).
- **Transición de Tema Claro / Oscuro**: Expansión circular animada (`clip-path: circle`) originada en las coordenadas exactas del botón de cambio, con rotación del icono Sol/Luna y persistencia en `localStorage`.

---

## 1. Overview & Core Concept

- **Qué es Ideathon**: Es un certamen de innovación y emprendimiento escolar de la UCB para colegios de La Paz y Bolivia. Equipos de promoción y prepromoción (3 a 5 estudiantes + 1 profesor tutor) formulan soluciones a desafíos reales y compiten por mentorías, visitas empresariales exclusivas y premios otorgados por Samuel Doria Medina.
- **Audiencia Objetivo**: Estudiantes bolivianos de 5to y 6to de secundaria (prepromoción y promoción), profesores asesores, directores de colegio y la comunidad universitaria.
- **Tono y Voz**: Enérgico, motivador, juvenil y cercano (tuteo boliviano amigable: _"animate", "mostrá tu talento", "transformá tu realidad"_), sin perder el rigor institucional de la UCB.
- **Objetivo Principal**: Comunicar las bases, inspirar a los jóvenes y facilitar el registro de equipos mediante una experiencia visual vibrante y moderna.

---

## 2. User Experience & Visual Design

### A. Estética Visual: Collage Juvenil / Streetwear Editorial

- **Atmósfera**: Inspirada en las referencias visuales (Nexa, Theo Wilder, editoriales urbanas) con titulares de gran impacto, stickers angulados (-3° a 3°), cinta adhesiva decorativa, bordes rasgados, texturas de cuadrícula sutil y garabatos dibujados a mano (coronas, destellos, flechas, subrayados y caritas felices).
- **Paleta de Colores**:
  - `Azul UCB Eléctrico`: `#1F3FD1` (Dominante de marca, ~50%)
  - `Azul Profundo`: `#0B1F8F` (Contrastes y sombras)
  - `Amarillo Sol`: `#FFD23F` (Acento principal, stickers, botón de inscripción)
  - `Naranja Coral`: `#FF6B35` (Acentos secundarios, etiquetas dinámicas)
  - `Celeste Cielo`: `#A9C7FF` (Superficies secundarias y acentos suaves)
  - `Crema Fondo Claro`: `#F6F2E9` (Lienzo editorial neutro y cálido)
  - `Negro Tinta`: `#111111` (Bordes definidos de 2px a 3px y tipografía)
  - `Verde Menta`: `#3DDC97` (Detalles de éxito y validación)
  - `Modo Oscuro`: Fondo Azul Noche `#0A1128`, tarjetas `#121C45`, textos en crema brillante.
- **Tipografía**:
  - **Titulares Display**: _Bricolage Grotesque_ / _Unbounded_ (pesos 800-900), con escalado fluido `clamp()`.
  - **Acentos y Garabatos**: _Caveat Brush_ y _Permanent Marker_ para notas adhesivas, garabatos y sellos.
  - **Cuerpo y Navegación**: _DM Sans_ / _Plus Jakarta Sans_ para lectura limpia y legible.
  - **Datos y Códigos**: Monospace para el ticket, cronómetros y numeración tabular.

### B. Rutas y Arquitectura de Pantallas

1. **Inicio (`/`)**:
   - _Hero Section_: Titular cinemático animado con SplitText _"TU IDEA PUEDE CAMBIAR EL MUNDO"_, badges flotantes con micro-parallax, stickers interactivos, CTAs _"Inscríbete"_ y _"Ver cronograma"_, y placeholder de estudiantes en blob azul.
   - _Banda de Estadísticas_: Contadores numéricos que suben dinámicamente (`30+ Colegios`, `500+ Estudiantes`, `3 Empresas Aliadas`, `Bs 10.000+ en Premios & Experiencias`).
   - _¿Qué es Ideathon?_: Bloques estilo tarjetas de recortes con beneficios clave para alumnos.
   - _Explorador por Categorías_: 4 tarjetas con inclinación y hover elástico conectadas a las demás secciones.
   - _Marquee Infinito_: Cinta reactiva a la velocidad de scroll con texto dinámico.
   - _Preguntas Frecuentes_: Acordeón con animación suave de apertura y cierre.
   - _Bloque CTA Cohete_: Sección final de alto impacto con cohete SVG en ascenso y acceso al registro.
2. **Empresas Aliadas (`/empresas`)**:
   - Tarjetas editoriales de _Fundación Samuel Doria Medina_ y _Fundación Jubileo_.
   - Resumen institucional, áreas de impacto, por qué son aliadas estratégicas para Ideathon y botón para expandir detalles con animación de morphing/Flip.
3. **Metodología (`/metodologia`)**:
   - Ruta serpenteante de 8 pasos desde la inscripción hasta el gran pitch final ante el jurado.
   - Trazo de camino SVG que se dibuja progresivamente con ScrollTrigger y un marcador cohete que avanza sobre el trayecto.
4. **Premios (`/premios`)**:
   - Podio interactivo con tarjetas de 1º, 2º y 3º lugar, recompensas detalladas (visitas exclusivas, mentorías directas con ejecutivos, trofeos y kits oficiales).
   - Botón interactivo de confeti celebratorio y nota de confirmación de bases.
5. **La Carrera de Administración UCB (`/carrera`)**:
   - Perfil profesional del administrador moderno, áreas clave de formación (Estrategia, Finanzas, Innovación, Marketing Digital y Liderazgo), campo laboral y vinculación directa al portal de admisiones UCB.
6. **Cronograma & Ticket Oficial (`/cronograma`)**:
   - Tarjeta "Ticket de Acceso" troquelada con código de barras generado, fecha, hora, ubicación en Campus Tupuraya/San Pablo La Paz, cuenta regresiva en vivo, descarga de evento `.ics` y modal de mapa.
   - Agenda cronológica desglosada por fases y horas del día del evento.

---

## 3. Key Product Decisions & Trade-Offs

- **Animaciones GSAP con Fallbacks Seguros**: Registro único de plugins (`ScrollTrigger`, `Flip`, `MotionPath`). Para el trazo vectorial SVG se implementa un cálculo matemático de `strokeDasharray` / `strokeDashoffset` sincronizado con ScrollTrigger para máxima compatibilidad y rendimiento fluido.
- **Rutas con React Router**: Uso de `BrowserRouter` con `useLocation()` para disparar transiciones de cortina azul entre páginas y reset automático del scroll a la parte superior.
- **Gestión de Datos Centralizada**: Toda la información de empresas, pasos metodológicos, premios, cronograma y miembros de la carrera se almacena en `src/data/` en archivos TypeScript fuertemente tipados, facilitando su edición posterior sin tocar el markup visual.
- **Inclusión y Rendimiento (`prefers-reduced-motion`)**: Verificación automática de preferencias del sistema para desactivar el parallax y los giros continuos en caso de que el usuario lo tenga configurado.

---

## 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────────────────────┐
│                          IDEATHON WEB APP                               │
│                                                                        │
│   ┌────────────────────────────────────────────────────────────────┐   │
│   │  Navbar (Logo, Links, ThemeToggle [Circular Clip], CTA Modal)   │   │
│   └────────────────────────────────────────────────────────────────┘   │
│                                   │                                    │
│   ┌───────────────────────────────┴────────────────────────────────┐   │
│   │                 React Router View Switcher                     │   │
│   │   /              /empresas        /metodologia                 │   │
│   │   [Inicio]       [Aliados Flip]   [Ruta SVG Scroll]            │   │
│   │                                                                │   │
│   │   /premios       /carrera         /cronograma                  │   │
│   │   [Podio + Glow] [Perfil UCB]     [Ticket + Countdown + .ics]  │   │
│   └────────────────────────────────────────────────────────────────┘   │
│                                   │                                    │
│   ┌───────────────────────────────┴────────────────────────────────┐   │
│   │  Global Overlays:                                              │   │
│   │  • PageTransitionCurtain (Cortina azul UCB)                    │   │
│   │  • RegistrationModal (Multi-step con validación)               │   │
│   │  • InteractiveMapModal (Campus UCB La Paz)                     │   │
│   │  • CustomCursor (Círculo magnético reactivo en Desktop)        │   │
│   │  • ThemeTransitionOverlay (Clip-path expansivo)                │   │
│   └────────────────────────────────────────────────────────────────┘   │
│                                   │                                    │
│   ┌────────────────────────────────────────────────────────────────┐   │
│   │  Footer (Logo, Redes, Formulario Newsletter, Créditos UCB)     │   │
│   └────────────────────────────────────────────────────────────────┘   │
└────────────────────────────────────────────────────────────────────────┘
```

### Component & State Mapping:

- **`ThemeContext`**: Administra `'light'` vs `'dark'`, detecta `prefers-color-scheme`, guarda en `localStorage` y ejecuta la animación de clip-path circular originada en las coordenadas `(x, y)` del evento click.
- **`RegistrationContext` / Modal**: Estado del formulario en 4 pasos, validación de integrantes (3 a 5 alumnos con colegio y tutor), y generación de credencial descargable o visualizable.
- **`useGSAP`**: Integrado con `gsap.context()` y limpieza automática en `unmount` en todos los componentes animados para evitar memory leaks.
- **`src/data/`**:
  - `companies.ts`: Fichas completas de Fundación Samuel Doria Medina y Fundación Jubileo.
  - `methodology.ts`: Los 8 pasos del proceso de innovación escolar.
  - `prizes.ts`: Podio y beneficios del certamen.
  - `program.ts`: Horarios, fechas, coordenadas y enlaces de calendario.
  - `career.ts`: Presentación y malla de Administración de Empresas UCB.
  - `media.ts`: Configuración centralizada de stickers, placeholders y assets.
