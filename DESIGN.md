---
name: IDEATHON · UCB Sede La Paz
description: Sistema visual del sitio del encuentro escolar de innovación IDEATHON.
colors:
  warm-paper: "#f6f2e9"
  surface: "#ffffff"
  pale-blue: "#eef3ff"
  ink: "#111111"
  muted-ink: "#4b5563"
  cobalt: "#1f3fd1"
  energy-yellow: "#ffd23f"
  coral-orange: "#ff6b35"
  mint: "#22c55e"
typography:
  display:
    fontFamily: "Bricolage Grotesque, Unbounded, system-ui, sans-serif"
    fontWeight: 900
  body:
    fontFamily: "DM Sans, Plus Jakarta Sans, system-ui, sans-serif"
    fontWeight: 400
  label:
    fontFamily: "Plus Jakarta Sans, system-ui, sans-serif"
    fontWeight: 700
    letterSpacing: "0.03em"
rounded:
  small: "0.75rem"
  medium: "1rem"
  large: "1.5rem"
  pill: "9999px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "24px"
components:
  button-primary:
    backgroundColor: "{colors.energy-yellow}"
    textColor: "{colors.ink}"
    typography: "{typography.display}"
    rounded: "{rounded.large}"
    padding: "14px 24px"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.display}"
    rounded: "{rounded.large}"
    padding: "14px 24px"
  navigation-active:
    backgroundColor: "{colors.cobalt}"
    textColor: "{colors.surface}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "6px 14px"
  search-field:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.small}"
    padding: "10px 14px"
  methodology-step-card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.large}"
    padding: "24px"
---

# Design System: IDEATHON · UCB Sede La Paz

## Overview

**Creative North Star: "Taller de ideas en movimiento"**

La interfaz acompaña a estudiantes y colegios desde el primer contacto con IDEATHON hasta la preparación de su propuesta. Presenta la información institucional con claridad y la envuelve en un lenguaje gráfico activo: papel cálido con retícula tenue, titulares expresivos, trazos oscuros y bloques de color que señalan acciones y etapas.

La composición conserva la identidad ya establecida. Los elementos se sienten táctiles, como piezas impresas y stickers colocados sobre una mesa de trabajo. Las animaciones GSAP y CSS existentes forman parte de esa experiencia; deben conservar su ritmo y su alternativa para movimiento reducido.

**Key Characteristics:**

- Fondo cálido con retícula de papel y superficies blancas.
- Cobalto, amarillo y naranja como acentos principales; verde menta para estados de avance.
- Bordes oscuros definidos y sombras cortas desplazadas.
- Tipografía de titulares con carácter y cuerpo de lectura claro.
- Movimiento intencional con soporte para `prefers-reduced-motion`.

## Colors

La paleta combina papel cálido y tinta oscura con acentos brillantes que orientan la atención sin cambiar la jerarquía de la información.

### Primary

- **Cobalto activo** (`#1f3fd1`): navegación seleccionada, énfasis y acciones secundarias.

### Secondary

- **Amarillo energía** (`#ffd23f`): llamada principal, hitos y elementos destacados.
- **Naranja coral** (`#ff6b35`): énfasis de ideación y mensajes breves.

### Tertiary

- **Verde menta** (`#22c55e`): progreso y confirmaciones.
- **Azul cielo suave** (`#a9c7ff`): apoyo gráfico puntual.

### Neutral

- **Papel cálido** (`#f6f2e9`): fondo de la página en tema claro.
- **Blanco superficie** (`#ffffff`): tarjetas, campos y controles.
- **Azul niebla** (`#eef3ff`): superficie secundaria clara.
- **Tinta** (`#111111`): texto principal, contornos y sombras.
- **Tinta secundaria** (`#4b5563`): texto de apoyo.

En tema oscuro se conservan los acentos y se sustituyen las superficies por azul noche (`#0a1128`), índigo profundo (`#121c45`) e índigo elevado (`#1a2760`). El texto principal pasa a papel cálido (`#f6f2e9`), el texto secundario a lavanda gris (`#a9b4d6`), el cobalto a azul eléctrico (`#4f6bff`) y el verde menta a (`#4ade80`).

**The Action Color Rule.** El amarillo identifica la acción principal; el cobalto marca selección y navegación activa. Mantén esas funciones reconocibles.

## Typography

- **Display Font:** Bricolage Grotesque (fallback: Unbounded, system sans-serif)
- **Body Font:** DM Sans (fallback: Plus Jakarta Sans, system sans-serif)
- **Label Font:** Plus Jakarta Sans

**Character:** Los titulares son compactos y enérgicos; el cuerpo conserva una lectura cómoda en español. Las etiquetas usan peso y espaciado para distinguir datos breves sin competir con los títulos.

### Hierarchy

- **Display** (peso 800–900): bienvenida y títulos principales, con escala responsive.
- **Headline** (peso 700–900): encabezados de sección y nombres de etapas.
- **Title** (peso 700–800): títulos de tarjetas y controles importantes.
- **Body** (peso 400–600): explicaciones y datos; prioriza líneas cómodas en móvil.
- **Label** (peso 700–800, espaciado cercano a `0.03em`): etiquetas compactas, badges y datos tabulares.

## Layout

La página principal usa un hero centrado sobre la retícula y secciones largas con una idea principal por bloque. Los botones y datos importantes aparecen cerca del contenido al que pertenecen. La guía metodológica organiza sus etapas como una línea narrativa alternada en escritorio y una secuencia vertical en pantallas estrechas.

Las tarjetas pasan de una columna en móvil a varias columnas desde los breakpoints responsive existentes (`sm` a 640px y `lg` a 1024px, según Tailwind). Conserva espacio suficiente entre bloques y permite que los textos largos en español se envuelvan sin desbordar.

## Elevation & Depth

La profundidad es gráfica y estructural: contornos oscuros y sombras sólidas, cortas y desplazadas, no una pila de sombras difusas. Los tokens existentes incluyen `4px 4px 0 var(--shadow-color)` y `6px 6px 0 var(--shadow-color)`; algunos stickers usan offsets de `5px` en amarillo, azul o naranja.

**The Cutout Shadow Rule.** Usa la sombra desplazada para reforzar superficies táctiles. No la sustituyas por sombras suaves genéricas en botones y tarjetas existentes.

## Shapes

Las esquinas son redondeadas, con radios pequeños en campos, medianos en controles y grandes en tarjetas y CTAs. Los chips de navegación usan forma de píldora. Los bordes de 2px o 3px en tinta oscura mantienen el carácter de piezas recortadas.

## Components

### Buttons

- **Primary:** amarillo energía, texto oscuro, Bricolage Grotesque en negrita, borde de 2px y sombra corta desplazada.
- **Secondary:** superficie blanca, texto oscuro y el mismo contorno y tratamiento táctil.
- **Hover / Focus:** conserva el levantamiento corto y el foco visible; el estado activo puede comprimirse levemente.

### Chips

- **Style:** etiquetas compactas de forma píldora o rectángulo redondeado, con borde fino.
- **State:** selección en cobalto con texto blanco; estado inactivo en superficie clara con texto oscuro.

### Cards / Containers

- **Corner Style:** radios grandes en tarjetas destacadas y medianos en tarjetas pequeñas.
- **Background:** blanco en tema claro y superficies índigo en tema oscuro.
- **Shadow Strategy:** offset sólido oscuro de 4–6px.
- **Border:** tinta oscura de 2–3px.
- **Internal Padding:** escala responsive existente, por ejemplo `p-5`, `p-6` y `sm:p-8`.

### Inputs / Fields

- **Style:** campo de búsqueda de superficie blanca, borde de 2px, radio de 12px y texto de cuerpo.
- **Focus:** anillo visible en cobalto; el placeholder usa el color secundario de texto.

### Navigation

La navegación de escritorio se agrupa en una cápsula clara; el enlace activo usa fondo cobalto. En móvil se conserva el menú superpuesto y sus enlaces tipo sticker. Mantén los estados distinguibles con teclado además de color.

### Methodology Step Card

La tarjeta de etapa presenta código de paso, título y explicación junto a un nodo con icono. El badge de número y el nodo de color forman parte de la línea visual del cronograma; no conviertas la secuencia en una lista genérica de paneles.

## Do's and Don'ts

### Do:

- **Do** conserva la paleta, las tipografías, los contornos y las sombras del sitio al actualizar contenido.
- **Do** mantén las animaciones actuales de GSAP y CSS, incluyendo limpieza de contexto y respeto a `prefers-reduced-motion`.
- **Do** usa cobalto para selección, amarillo para la acción principal y naranja para énfasis editorial corto.
- **Do** conserva los layouts responsive y comprueba textos extensos en móvil.

### Don't:

- **Don't** rediseñes la identidad visual en una tarea de contenido o metodología.
- **Don't** elimines, ralentices o reemplaces las animaciones actuales sin una petición explícita.
- **Don't** añadas sombras difusas o una paleta neutra ajena al sistema táctil existente.
- **Don't** dependas solo del color o de la animación para comunicar estado o información.
