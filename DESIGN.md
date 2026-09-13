---
name: DÔKO Studio
description: Landing page de remodelación de viviendas — obra gris y casas usadas, lujo oscuro fiel al manual de marca
colors:
  obsidian-black: "#191919"
  deep-night-blue: "#1A3E46"
  deep-petrol-blue: "#0E5B6D"
  muted-turquoise: "#3D93A6"
  vivid-terracotta: "#EB5B34"
  terracotta-deep: "#D44E2A"
  earthy-brown: "#A95D39"
  warm-cream: "#FFF5F0"
  white: "#FFFFFF"
  warm-gray: "#6B625D"
  sand-line: "#E4DED4"
  ghost-line: "rgba(255, 255, 255, 0.14)"
typography:
  display:
    fontFamily: "Poppins, Segoe UI, sans-serif"
    fontSize: "clamp(2.75rem, 7vw, 5.5rem)"
    fontWeight: 700
    lineHeight: 1.02
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Poppins, Segoe UI, sans-serif"
    fontSize: "clamp(2.25rem, 5.5vw, 4.25rem)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Poppins, Segoe UI, sans-serif"
    fontSize: "1.4rem"
    fontWeight: 700
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Poppins, Segoe UI, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "Poppins, Segoe UI, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 700
    letterSpacing: "0.18em"
  accent:
    fontFamily: "Cardo, Georgia, serif"
    fontStyle: "italic"
    fontWeight: 400
rounded:
  sm: "12px"
  md: "22px"
  pill: "999px"
spacing:
  xs: "8px"
  sm: "14px"
  md: "24px"
  lg: "32px"
  xl: "56px"
  2xl: "96px"
components:
  button-primary:
    backgroundColor: "{colors.vivid-terracotta}"
    textColor: "{colors.white}"
    rounded: "{rounded.pill}"
    padding: "14px 30px"
  button-primary-hover:
    backgroundColor: "{colors.terracotta-deep}"
  button-black:
    backgroundColor: "{colors.obsidian-black}"
    textColor: "{colors.white}"
    rounded: "{rounded.pill}"
    padding: "14px 30px"
  filter-chip:
    backgroundColor: "{colors.white}"
    textColor: "{colors.warm-gray}"
    rounded: "{rounded.pill}"
    padding: "8px 18px"
  filter-chip-active:
    backgroundColor: "{colors.vivid-terracotta}"
    textColor: "{colors.white}"
  card:
    backgroundColor: "{colors.white}"
    rounded: "{rounded.md}"
    padding: "22px"
  panel-dark:
    backgroundColor: "{colors.deep-night-blue}"
    rounded: "{rounded.md}"
    padding: "28px 24px 24px"
  input-field:
    backgroundColor: "{colors.warm-cream}"
    textColor: "{colors.obsidian-black}"
    rounded: "{rounded.sm}"
    padding: "12px 14px"
---

# Design System: DÔKO Studio

## Overview

**Creative North Star: "El Estudio de Precisión"**

DÔKO vende exactitud y oficio, no solo decoración: la mayoría de sus proyectos son apartamentos entregados en obra gris que necesitan un plan de precisión para llegar a terminados. El sistema visual traduce eso en una precisión editorial en la estructura — retículas de bordes finos, eyebrows tipográficos, cifras destacadas, tipografía sans-serif firme — combinada con calidez humana en los acentos: el naranja vivo, las itálicas de énfasis y las fotos reales de proyectos terminados evitan que el negro protagonista se sienta corporativo o frío.

El negro ("Negro Obsidiana") domina las secciones de mayor peso narrativo (hero, diferenciales, contacto, footer), alternando con paneles claros en crema y blanco que respiran entre bloques oscuros. Un único acento vivo —el naranja terracota— hace todo el trabajo de llamado a la acción y énfasis; el resto de la paleta permanece contenida a propósito.

**Key Characteristics:**
- Negro protagonista alternado con paneles claros — nunca gris intermedio como fondo de sección.
- Un solo acento vivo por pantalla (naranja); el azul petróleo queda para detalles secundarios (eyebrows, cifras, números de proceso).
- Motivo circular fino heredado literalmente de las portadas del manual de marca.
- Itálica de énfasis siempre en Cardo, nunca fingida sobre Poppins.
- Titulares grandes y dramáticos (H1 hasta `5.5rem`) con tracking negativo — el titular domina la pantalla, no la comparte en igualdad con el resto del contenido.
- Grano sutil (`feTurbulence` inline, sin archivo) sobre todas las superficies oscuras — textura editorial/impresa, no plástico digital liso.
- Retículas de 3–4 columnas rotas a propósito con un desfase vertical (`margin-top` alternado) en escritorio — nunca perfectamente parejas.

## Colors

Paleta contenida y de alto contraste: negro dominante, un acento cálido único y dos acentos secundarios de uso puntual.

### Primary
- **Naranja Terracota Vivo** (`#EB5B34`): el único acento vivo del sistema — botones primarios, CTAs, cifras destacadas, itálicas de énfasis, estado activo de chips y hotspots. Se usa con moderación deliberada: si aparece en cada elemento de una pantalla, se está usando mal.
- **Terracota Profundo** (`#D44E2A`): estado hover del naranja primario — nunca un color independiente, solo la respuesta a interacción.

### Secondary
- **Azul Profundo de Obra** (`#0E5B6D`): acento secundario de "solidez operativa" — eyebrows, círculos numerados del proceso, la palabra destacada del hero sobre fondo claro, labels de formulario.
- **Turquesa Atenuado** (`#3D93A6`): versión clara del azul de obra, reservada exclusivamente para la palabra destacada del hero cuando el fondo es oscuro (mantiene legibilidad donde el azul profundo se perdería).

### Tertiary
- **Café Tierra** (`#A95D39`): uso puntual único — el tagline oficial en el footer, en Cardo itálica. No expandir a otros contextos sin motivo de marca.

### Neutral
- **Negro Obsidiana** (`#191919`): fondo protagonista de las secciones oscuras y color de texto sobre fondos claros.
- **Azul Noche Profundo** (`#1A3E46`): superficie elevada sobre negro — tarjetas y paneles oscuros (planta interactiva, lightbox, recorrido de video).
- **Crema Cálida** (`#FFF5F0`): fondo de secciones claras alternas y de los campos de formulario dentro de la tarjeta blanca.
- **Blanco** (`#FFFFFF`): tarjetas claras, texto sobre fondo oscuro.
- **Gris Cálido** (`#6B625D`): texto secundario/descriptivo sobre fondo claro (párrafos de tarjetas, chips).
- **Línea Arena** (`#E4DED4`): bordes sutiles sobre fondo claro.
- **Línea Fantasma** (`rgba(255,255,255,0.14)`): bordes sutiles sobre fondo oscuro (retículas, divisores de stats, paneles).

### Named Rules
**The One Warm Accent Rule.** El naranja terracota es el único color "vivo" del sistema. El azul de obra y el café son acentos de apoyo, nunca compiten con el naranja por atención en la misma pantalla.

## Typography

**Display Font:** Poppins (con Segoe UI, sans-serif como respaldo) — sustituto de Mont, la tipografía de marca oficial no disponible gratuitamente.
**Body Font:** Poppins (mismo stack que Display).
**Accent Font:** Cardo (con Georgia, serif como respaldo), siempre en itálica.

**Character:** Un sans-serif geométrico firme (Poppins 700) para toda la estructura, roto deliberadamente por una serif itálica cálida (Cardo) en cada punto de énfasis — el contraste entre los dos es la firma tipográfica de la marca.

### Hierarchy
- **Display** (700, `clamp(2.75rem, 7vw, 5.5rem)`, line-height 1.02, tracking `-0.02em`): H1, exclusivo del hero. Escala deliberadamente grande y dramática — no un titular tímido compitiendo con el resto de la página.
- **Headline** (700, `clamp(2.25rem, 5.5vw, 4.25rem)`, line-height 1.05, tracking `-0.02em`): H2, títulos de sección.
- **Title** (700, `1.4rem`, tracking `-0.01em`): H3, subtítulos dentro de tarjetas y bloques.
- **Body** (400, `1rem`, line-height 1.65): párrafos generales.
- **Label** (700, `0.75rem`–`0.92rem`, letter-spacing `0.18em`, mayúsculas): eyebrows y navegación.
- **Accent** (400 itálica, tamaño heredado del contexto): palabra o frase de énfasis dentro de títulos (naranja), citas de testimonios, tagline del footer (café).

### Named Rules
**The Cardo-Only Italic Rule.** Cualquier texto en cursiva usa `var(--font-accent)` (Cardo). Nunca `font-style: italic` sobre Poppins — no se cargan sus cortes itálicos y el efecto se ve roto.

## Layout

Contenedor centrado de `1160px` con `24px` de padding lateral (`--ancho`). Ritmo de sección generoso: `96px` de padding vertical en escritorio, `72px` en móvil (`≤720px`).

Grillas por sección: hero en dos columnas asimétricas (`1.15fr / 0.85fr`), tarjetas de servicio y testimonios en 3 columnas, diferenciales en retícula 2×2 con bordes internos, proceso en 4 columnas, galería en 3 columnas. Todas colapsan a 1–2 columnas en `≤960px`.

Un patrón recurrente de "elemento flotante": la barra de estadísticas del hero y el recorrido interactivo se superponen a la sección siguiente con `transform: translateY(50%)` o simplemente posición negativa, compensado con padding-top extra en la sección que las recibe.

**Ruptura editorial de la retícula (`≥961px` únicamente):** las tarjetas de servicios/testimonios (`.cards-3`) y los 4 pasos del proceso (`.steps`) llevan un desfase vertical vía `margin-top` — nunca vía `transform`, para no chocar con la animación de `.reveal` sobre el mismo elemento. Servicios/testimonios: exterior +20px, centro -28px (un arco suave). Proceso: 32px → 16px → 0 → -16px (una escalera ascendente, sugiriendo la progresión del proceso). Por debajo de `961px` el desfase se apaga por completo — en una sola columna se vería como un error de alineación, no como una decisión.

**Grano sobre superficies oscuras:** `--grano` (una `feTurbulence` SVG inline, sin archivo externo) se aplica a `::after` de `.hero`, `.section-dark`, `.footer`, `.cta-band` y `.floorplan` — `opacity: 0.05`, `mix-blend-mode: overlay`. Cada una de esas cinco superficies fuerza `isolation: isolate` (o, en el caso del recorrido interactivo dentro de una sección clara, `z-index: 0` sobre el ya existente arco decorativo) para que el grano en `z-index: -1` quede garantizado detrás de todo su contenido sin depender de reglas de apilamiento implícitas.

**Banda CTA con foto real:** dejó de ser naranja plano — ahora es una foto real (`.cta-band-photo`) con un velo naranja→negro en gradiente (`.cta-band-overlay`) encima, mismo principio que el resto del sistema: evidencia fotográfica real en vez de un bloque de color decorativo.

**Movimiento del hero:** la foto del hero vive absoluta y sobredimensionada (70px de margen vertical) dentro de un `.hero-media` que la recorta — ese margen es el "viaje" que usan el parallax de scroll (hasta 45px) y la inclinación por mouse (hasta 16px, solo con `hover:hover` + `pointer:fine`) sin dejar huecos. Los números de `.hero-stats` cuentan desde 0 al entrar en pantalla. Todo se desactiva por completo con `prefers-reduced-motion`.

**Móvil (`≤720px`):** la galería de proyectos se convierte en un carrusel horizontal con `scroll-snap`, y el menú de navegación pasa a un panel desplegable con hamburguesa animada a X.

## Elevation & Depth

El sistema usa una sola sombra ambiental (`--sombra: 0 22px 55px rgba(0,0,0,0.22)`) de forma generosa en paneles que "flotan" — la barra de estadísticas, el recorrido interactivo, los paneles de lightbox/recorrido, el formulario de contacto — no como una jerarquía estructural estricta, sino como una capa atmosférica que refuerza la sensación de lujo en cualquier superficie que se sienta elevada. Los elementos oscuros y flotantes (barra de estadísticas, panel del lightbox, panel del recorrido) suman a esa sombra neutra un segundo glow con matiz de marca (`0 0 70–90px rgba(14, 91, 109, 0.4–0.45)`, petróleo) para no sentirse genéricos. Las secciones oscuras completas (hero, `.section-dark`, el recorrido interactivo) comparten además los mismos dos glows radiales de fondo (petróleo + naranja tenue) en vez de un negro plano — antes solo el hero y el recorrido los tenían, y el resto de paneles oscuros se sentía una familia aparte. Las tarjetas claras (servicios, galería) usan en cambio una sombra más chica con un matiz cálido café (`rgba(60, 40, 28, ...)`, no negro puro) como respuesta directa al hover, no en reposo.

### Shadow Vocabulary
- **Ambient glow** (`box-shadow: 0 22px 55px rgba(0, 0, 0, 0.22)`): paneles y elementos flotantes — atmósfera de lujo, no jerarquía.
- **Ambient glow con marca** (suma `0 0 70–90px rgba(14, 91, 109, 0.4–0.45)` a la anterior): elementos oscuros flotantes (barra de estadísticas, paneles de lightbox/recorrido) — la misma idea, con el matiz petróleo de marca en vez de un negro genérico.
- **Hover lift** (`box-shadow: 0 16px 38px rgba(60, 40, 28, 0.22)` / `0 18px 45px rgba(60, 40, 28, 0.16)`): tarjetas y tiles de galería al pasar el mouse — matiz cálido café, no negro puro.

### Named Rules
**The Ambient-Not-Structural Rule.** La sombra grande no comunica "esto está por encima de aquello" — comunica "esto es una superficie de lujo". Se reserva para paneles ya identificados como flotantes, no se añade a elementos nuevos solo para darles jerarquía.

## Shapes

Dos lenguajes de forma conviven a propósito: rectángulos con esquinas suaves (`--radio: 22px` para tarjetas y paneles, `--radio-sm: 12px` para inputs, thumbnails de la cinta y el viewport del lightbox) y píldora completa (`border-radius: 999px`) para todo elemento clickeable — botones, chips de filtro, insignias de conteo. Esa dualidad es deliberada: la píldora marca "esto se puede tocar", el radio suave marca "esto es contenido".

El motivo circular fino (arco de `460px`, `1px` de borde blanco al 14% de opacidad) detrás del texto del hero es una firma visual tomada literalmente de las portadas del manual de marca — no se repite en otras secciones.

## Components

### Buttons
- **Shape:** píldora completa (`border-radius: 999px`).
- **Primary:** fondo naranja terracota, texto blanco, `padding: 14px 30px`; hover oscurece a terracota profundo y eleva `translateY(-2px)`.
- **Light (sobre fondo oscuro):** transparente con borde blanco al 55%; hover invierte a fondo blanco/texto negro.
- **Black (sobre banda naranja):** fondo negro obsidiana, texto blanco; hover pasa a azul noche profundo.

### Chips
- **Style:** píldora, borde `1.5px` línea arena, fondo blanco, texto gris cálido.
- **State:** hover invierte borde y texto a naranja; estado activo (`is-active`) rellena en naranja con texto blanco.

### Cards / Containers
- **Corner Style:** `22px` (radio estándar).
- **Background:** blanco (tarjetas claras) o azul noche profundo (paneles sobre negro).
- **Shadow Strategy:** ambient glow en paneles flotantes; hover lift en tarjetas claras (ver Elevation & Depth).
- **Border:** `1px` línea arena (claro) o línea fantasma (oscuro).
- **Internal Padding:** `22px`–`36px` según densidad de contenido.

### Inputs / Fields
- **Style:** fondo crema cálida (incluso dentro de una tarjeta blanca — capa de contraste deliberada), borde línea arena, radio `12px`.
- **Focus:** borde pasa a naranja + halo `box-shadow: 0 0 0 3px rgba(235, 91, 52, 0.16)`.

### Navigation
- **Style:** header sticky claro con fondo translúcido (`rgba(255,255,255,0.94)` + `backdrop-filter: blur(10px)`), borde inferior línea arena.
- **Estados:** enlaces heredan color de tinta, hover a naranja. El enlace de la sección visible se marca automáticamente en naranja con un punto debajo (scroll-spy vía `IntersectionObserver`, bloque "1b. Nav activo" en `js/main.js`) — el visitante siempre sabe dónde está en la página.
- **Móvil:** hamburguesa de tres líneas que se transforma en X; panel desplegable blanco a pantalla completa bajo el header.

### Recorrido Interactivo (componente de firma)
Tarjeta oscura con la misma atmósfera del hero — dos glows radiales (petróleo + naranja tenue) sobre negro obsidiana y el arco circular fino repetido en una esquina — en vez de un negro plano; sin esa atmósfera la tarjeta se sentía una caja genérica desconectada del resto de la marca. Ya no aloja un plano dibujado: aloja un **lienzo de fotos reales** (una foto por espacio, superpuestas por opacidad como el preloader) con un pin flotando por espacio. Pasar el mouse o el foco por un pin adelanta su foto en el lienzo — previsualización antes de comprometerse — y revela un llamado explícito ("▶ Recorrido") que deja claro que ese pin abre el recorrido en video, no las fotos; el nombre del espacio siempre está visible, sin el texto extra encima cuando está en reposo. La fila de chips de abajo sigue siendo la vía para fotos fijas — dos formas complementarias de explorar la misma zona, no la misma acción duplicada. Al hacer clic, todo el escenario (lienzo + pines) escala mediante `transform` hacia el centro de ese espacio (`scale(2.4)` escritorio / `scale(1.8)` móvil) — una cámara literal acercándose — y abre el panel de recorrido en video con capítulos. Un degradado oscuro sobre el lienzo mantiene los pines legibles sin importar qué tan clara sea la foto activa. Un párrafo puente sobre la tarjeta ("Así se distribuye este apartamento…") conecta el titular editorial de la sección con el recorrido.

## Do's and Don'ts

### Do:
- **Do** usar el naranja terracota como único acento vivo por pantalla — reservarlo para CTAs, estados activos e itálicas de énfasis.
- **Do** usar siempre `var(--font-accent)` (Cardo) para cualquier itálica; nunca fingirla sobre Poppins.
- **Do** usar la forma píldora (`border-radius: 999px`) para todo elemento clickeable — botones, chips, insignias.
- **Do** reservar el turquesa atenuado (`--azul-claro`) exclusivamente para texto que deba leerse sobre fondo oscuro y siga siendo la palabra destacada.
- **Do** añadir la clase `.reveal` a cualquier sección nueva para heredar la animación de entrada al scroll.
- **Do** incluir una alternativa para `prefers-reduced-motion` en cualquier animación nueva — todas las existentes (reveal, Ken Burns, cámara del recorrido, parallax del hero) ya la tienen.
- **Do** darle a todo control clickeable nuevo un estado `:active` (scale o translateY sutil, 0.15–0.2s) además del hover — el feedback de presión es lo que hace sentir una interfaz viva, no solo decorada.

### Don't:
- **Don't** replicar el `<span class="destacado">` azul del hero en ningún otro título — es exclusivo de esa sección por decisión del cliente.
- **Don't** introducir sombras nuevas fuera de `--sombra` y los dos pares de hover-shadow ya existentes — el vocabulario de sombra debe permanecer un conjunto cerrado y ambiental, no una escala de jerarquía.
- **Don't** usar valores hex sueltos — siempre las variables CSS de `:root`.
- **Don't** mezclar el lenguaje de forma: un elemento clickeable no debe llevar el radio suave de tarjeta (`22px`) en vez de píldora, ni viceversa para contenedores de contenido.
