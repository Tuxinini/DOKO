# DOKO Studio — Landing Page de Remodelaciones

Plan de acción y guía del proyecto. **Leer este archivo completo antes de tocar el código.**

---

## 1. Resumen del proyecto

- **Cliente/Marca:** DÔKO Studio
- **Negocio:** Remodelación de casas — terminación de casas en **obra gris** y remodelación integral de **casas usadas**.
- **Objetivo de la página:** Generar contactos (cotizaciones) vía WhatsApp y formulario. Transmitir elegancia, profesionalismo y confianza.
- **Idioma:** Español.

## 2. Dirección de diseño (DECIDIDA — no cambiar sin aprobación del cliente)

Se evaluaron 4 opciones de estética y el cliente eligió el **lujo oscuro**. Ese diseño fue luego **ajustado para ser 100% fiel al manual de marca oficial** que el cliente aportó en `diseño Doko/` (`Referentes visuales - moodboard.pdf` = brand guidelines 2026; `Copia de Plantilla Cotización DOKO STUDIO.pdf` = aplicación real de la marca en un documento). Ese manual es la **fuente de verdad** para cualquier decisión de color, tipografía o tono — ante cualquier duda de diseño, consultarlo antes de improvisar.

- **Negro protagonista** ("Negro ratón") en hero, sección de diferenciales, contacto y footer, alternando con crema y blanco.
- Titulares en **sans-serif bold (Poppins, sustituto de Mont)**; la frase/palabra de énfasis en **serif itálica (Cardo)** color naranja — el patrón tipográfico exacto del manual de marca.
- Header **claro** con el **logo a color**.
- Detalles editoriales: eyebrows con cuadrito naranja, retícula con bordes finos en diferenciales, banda CTA naranja, datos de contacto en filas.
- **Barra de estadísticas flotante** que cabalga entre el hero negro y la sección clara.
- **Arco circular fino** detrás del texto del hero (`.hero-text::before`) — motivo decorativo tomado literalmente de las portadas del manual de marca.
- Tagline oficial **"Precisión, estética, confianza."** en el footer, en Cardo itálica color café.
- La primera palabra del título del hero va en azul petróleo con `<span class="destacado">` — **decisión del cliente: solo en el hero**, no replicar en otros títulos.
- Animaciones sobrias: aparición al scroll con entrada escalonada, hovers con elevación/zoom leve, brillos radiales estáticos en hero y banda CTA.

### Paleta oficial (variables en `css/styles.css` — usar SIEMPRE las variables, nunca hex sueltos)

Hex exactos tomados del manual de marca (`diseño Doko/Referentes visuales - moodboard.pdf`, página "Paleta de color"):

| Variable CSS      | Hex       | Nombre oficial   | Uso                                                        |
|-------------------|-----------|------------------|-------------------------------------------------------------|
| `--negro`         | `#191919` | Negro ratón      | Fondos oscuros protagonistas (hero, diferenciales, contacto, footer) |
| `--negro-suave`   | `#1A3E46` | Celeste oscuro   | Tarjetas y barras sobre fondo negro                         |
| `--azul`          | `#0E5B6D` | Azul petróleo    | Acento secundario: eyebrows, números de proceso, etiquetas  |
| `--azul-claro`    | `#3D93A6` | (tinte derivado) | Versión clara del azul petróleo, legible sobre fondos oscuros (palabra destacada del hero) |
| `--naranja`       | `#EB5B34` | Naranja          | Acento principal: botones, CTA, cursivas, cifras             |
| `--cafe`          | `#A95D39` | Café claro       | Acento terciario, uso puntual (tagline del footer)           |
| `--crema`         | `#FFF5F0` | Crema            | Secciones claras alternas                                    |
| `--tinta`         | `#191919` | Negro ratón      | Texto sobre fondos claros                                    |

Colores del manual **no usados aún** en la web (disponibles si se necesitan): `Azul claro #E1F8FD` (para fondos muy pálidos o tags).

### Tipografía oficial

- **Mont** (fuente principal de marca) → sustituida por **Poppins** (Google Fonts) por no estar disponible gratuitamente. Se usa en `--font-display` y `--font-body`, peso 700 en titulares.
- **Cardo** (fuente secundaria oficial, sí disponible en Google Fonts) → `--font-accent`, itálica, para toda frase o palabra de énfasis (equivalente exacto al uso del manual de marca).
- Regla: cualquier texto en cursiva debe usar `var(--font-accent)`, nunca `font-style: italic` sobre Poppins (no se cargan sus cortes itálicos).

### Branding

Copias listas para usar en `assets/`: `logo.png` (color, para el header claro), `logo-blanco.png` (para footer y fondos oscuros), `icono.png` (favicon). El manual de marca y la plantilla de cotización oficial están en `diseño Doko/` — **no versionada** (excluida en `.gitignore` para mantener el repo liviano, ~8.5MB de PDFs), pero es la referencia de diseño más importante del proyecto: no borrarla del disco. Las referencias visuales antiguas y el branding original en bruto están en `_archivo/` (también excluida, no borrar).

## 3. Stack técnico (decidido — no cambiar sin razón)

- **HTML + CSS + JavaScript puros. Sin frameworks, sin build tools, sin npm.**
- Se abre directamente con doble clic en `index.html` o con cualquier servidor estático.
- Un solo archivo por tipo: `index.html`, `css/styles.css`, `js/main.js`.
- JS mínimo: menú móvil, scroll-reveal con `IntersectionObserver`, año dinámico del footer, filtro de galería por zona.

## 4. Estructura de la página (ya construida)

| # | Sección (id)        | Contenido |
|---|---------------------|-----------|
| 1 | Header sticky claro | Logo a color, navegación, botón CTA "Cotizar ahora" |
| 2 | `#inicio` (Hero)    | Negro con brillos, titular Poppins+Cardo, 2 CTAs, **foto real** (sala del proyecto Centriktown), barra de estadísticas flotante |
| 3 | `#servicios`        | Crema. 3 tarjetas con **fotos reales**: Obra gris, Casas usadas, Acabados y diseño |
| 4 | `#por-que`          | Negro. Retícula 2×2 de diferenciales con bordes finos |
| 5 | `#proceso`          | Blanco. 4 pasos en tarjetas crema con círculos verdes |
| 6 | Banda CTA           | Naranja, con botón negro a WhatsApp |
| 7 | `#proyectos`        | Crema. **Recorrido interactivo** — pines sobre un lienzo de fotos reales por espacio (toca uno → recorrido en video) — ver §6d, luego chips de filtro por zona y un **carrusel único** de fotos reales (swipe en móvil, flechas en escritorio) — ver §6b. Cada tarjeta abre un **lightbox** con su propio carrusel animado (contador, zoom Ken Burns), ya posicionado en la foto exacta que se tocó |
| 8 | `#testimonios`      | Blanco. 3 tarjetas con citas en serif itálica |
| 9 | `#contacto`         | Negro. Datos en filas + formulario en tarjeta blanca |
| 10| Footer              | Negro. Logo blanco, navegación, redes |

## 5. Datos pendientes del cliente (placeholders en el código)

- [x] **WhatsApp y correo reales** — ya aplicados (`+57 305 798 9724` / `camiloromeroe@gmail.com`), tomados del bloque "CONTACTO" de `diseño Doko/Copia de Plantilla Cotización DOKO STUDIO.pdf`. Si ese contacto debe ser distinto en la web pública (p. ej. una línea comercial dedicada en vez de un correo personal), avisar para actualizarlo — buscar `573057989724` y `camiloromeroe@gmail.com` en `index.html`.
- [ ] **Cobertura real** (ciudad/zona) — sigue como placeholder genérico "Ciudad y alrededores".
- [x] **Fotos reales de Sala, Cocina, Baño y Habitación** — ya aplicadas (ver §6b), tomadas de un proyecto real terminado (apartamento VIS "Centriktown"). El chip **Fachada** se quitó del todo (ese proyecto no incluía fotos de fachada); **Antes/Después** se dejó como chip con una tarjeta especial adelantando el slider prometido en Fase 4 — ese proyecto tampoco tiene tomas de "antes" (carpeta `Terminados/`, solo fotos "después"). Si llega un proyecto con fachada o con registro de antes/después, agregarlo siguiendo el patrón de §6 (Fachada tendría que agregarse de nuevo como chip + entrada en `PROYECTOS`).
- [x] **Fotos reales en hero y tarjetas de servicio** — ya aplicadas, reutilizando las mismas 11 fotos del proyecto Centriktown (ver §6b). Cuando haya fotos de más proyectos, lo ideal es variar estas portadas para no repetir siempre el mismo apartamento.
- [ ] **Testimonios reales** (nombre + texto). Los actuales son de muestra.
- [ ] **Redes sociales** en el footer (los enlaces apuntan a `#`).
- [ ] **Destino del formulario**: hoy no envía a ningún lado (solo muestra confirmación). Opciones: Formspree, correo, o redirigir a WhatsApp con el texto prellenado.
- [ ] **Años de trayectoria exactos**: el manual de marca dice "más de cinco años"/"más de [X] años" — confirmar la cifra exacta si se quiere citar en la web.

## 6. Cómo reemplazar/agregar fotos reales de proyectos

Una sola fuente de datos por zona, el objeto `PROYECTOS` en `js/main.js` (bloque "5. Filtro de proyectos por zona + carrusel único"), alimenta el carrusel de fotos **y** el lightbox — ya no hay `data-fotos` repartido en botones de HTML como en versiones anteriores del sitio.

**Zona con fotos reales** (patrón usado en Sala/Cocina/Baño/Habitación):
```js
cocina: {
  titulo: "Cocina — Nombre del proyecto",
  fotos: ["assets/proyectos/cocina-1.jpg", "assets/proyectos/cocina-2.jpg", "assets/proyectos/cocina-3.jpg"],
},
```

**Zona sin fotos todavía** (patrón usado en Antes/Después, el único chip que queda sin fotos reales — Fachada se quitó del todo por no tener contenido): `fotos: []`.
```js
"antes-despues": { titulo: "Antes y después", fotos: [] },
```
`actualizarCarrusel()` detecta esta zona por nombre y muestra una tarjeta especial (`.antes-despues`, mitad textura oscura tipo "antes" + mitad crema tipo "después", con una insignia naranja "Muy pronto") en vez de una tarjeta de texto genérica — adelanta visualmente el slider de transformación de Fase 4 sin inventar fotos. Cualquier otra zona nueva sin fotos cae al placeholder genérico ("Fotos próximamente").

**Para agregar/reemplazar fotos de un proyecto:**
1. Optimizar las imágenes: máx. 1400px de ancho, JPG ≤ 300 KB, y **corregir la orientación EXIF** antes de subirlas (las fotos de celular vienen rotadas por metadata). Script usado en este proyecto — `PIL.ImageOps.exif_transpose()` antes de redimensionar y comprimir; ver ejemplo en el historial de commits o pedir que se regenere.
2. Guardarlas en `assets/proyectos/` con el patrón `zona-N.jpg` (p. ej. `cocina-1.jpg`, `cocina-2.jpg`).
3. Actualizar el array `fotos` de esa zona en `PROYECTOS` — el carrusel y el lightbox se reconstruyen solos, no hay nada más que tocar.
4. Actualizar `titulo` si quieres que el lightbox muestre el nombre del proyecto/cliente.

**Origen de las fotos actuales:** apartamento VIS "Centriktown" (proyecto real terminado), fotos originales sin procesar archivadas en `_archivo/fotos-centriktown/` (no versionado, se queda solo en este disco). Los zips de Google Drive originales (~8.8 GB, incluyen video) están en `Terminados/`, también fuera del repositorio (`.gitignore`) — no borrar ninguna de las dos carpetas sin respaldo.

## 6b. Carrusel de proyectos, filtro por zona y lightbox

Antes había dos piezas separadas y redundantes — una cinta decorativa de scroll automático y una cuadrícula de botones que abría el lightbox — reemplazadas por **un solo carrusel** (`.carrusel-proyectos`) que hace ambas cosas: es la evidencia fotográfica visible por defecto y la puerta de entrada al lightbox.

**Filtro por zona (bloque "5"):** los chips (`Todos`, `Sala`, `Cocina`, `Baño`, `Habitación`, `Antes/Después`) reconstruyen el carrusel vía `actualizarCarrusel(zona)` a partir de `PROYECTOS` — una tarjeta por foto real (no por zona), así que "Todos" muestra las 11 fotos completas, no solo 5 portadas.

**Un solo carrusel para escritorio y móvil:** `.carrusel-track` es un `overflow-x: auto` con `scroll-snap-type: x mandatory` — el swipe táctil nativo lo mueve en móvil, y dos botones `.carrusel-arrow` (`scrollBy` de un ancho de tarjeta) lo mueven en escritorio (se ocultan en `≤720px`, donde el swipe ya basta). Ya no hace falta una implementación de grilla para desktop y otra de scroll-snap para móvil como antes.

**Para agregar una nueva zona** (p. ej. "Terraza"): agregar el botón `<button class="filter-chip" data-filter="terraza">Terraza</button>` en `.gallery-filters`, y su entrada correspondiente en `PROYECTOS` (`terraza: { titulo: "...", fotos: [...] }`). No hace falta tocar el resto del JS.

**Lightbox (bloque "6"):** al hacer clic en cualquier tarjeta del carrusel se abre `abrirLightbox(titulo, fotos, indiceInicial, elementoOrigen)` ya posicionado en **esa foto exacta** (no siempre la primera de la zona):
- Transición fade + slide con `cubic-bezier`, flechas, puntos, swipe táctil, navegación por teclado ←/→/Esc, foco accesible.
- **Contador "N / total"** (`#lightboxContador`) bajo el título, actualizado en cada cambio de slide.
- **Zoom Ken Burns**: la foto activa recibe la clase `.is-active` y se anima con un `scale(1 → 1.06)` muy lento (`transition: transform 6s`) mientras está visible — efecto editorial sutil, se desactiva con `prefers-reduced-motion`.

Las mismas fotos de `PROYECTOS` también se reutilizan como portada del **hero** (`sala-1.jpg`) y de las **3 tarjetas de servicios** (`habitacion-1.jpg`, `cocina-2.jpg`, `bano-1.jpg`). El patrón para reemplazarlas es el mismo que en §6: quitar la clase `.ph` del contenedor y usar un `<img>` real; el CSS ya trae las reglas `img.ph-hero` y `.card img.ph-card` para que la foto llene el marco con `object-fit: cover`.

## 6d. Recorrido interactivo (lienzo de fotos + pines) y video

Antes de los chips de filtro, `#proyectos` tiene un **recorrido interactivo** (`.floorplan`): un lienzo de fotos reales (`.fp-canvas`, una `<img class="fp-canvas-photo">` por espacio superpuestas por opacidad, mismo mecanismo que el preloader) con un pin (`.fp-pin`) flotando por espacio (Habitación, Baño, Cocina, Sala). Antes esto era un plano SVG dibujado a mano (líneas + rectángulos por habitación) — se reemplazó porque, aunque técnicamente estaba bien resuelto, se sentía un diagrama de arquitecto ajeno al resto de la sección, que es puramente fotográfica.

Pasar el mouse o el foco por un pin **previsualiza** su foto en el lienzo (crossfade); el nombre del espacio siempre es visible, y un llamado explícito ("▶ Recorrido") solo aparece al interactuar — a propósito distinto del texto "N fotos" de la galería, porque este botón no abre fotos: abre el **recorrido en video** de ese espacio. Las fotos fijas siguen viviendo en la fila de chips + galería de abajo; son dos formas complementarias de explorar la misma zona, no la misma acción duplicada.

**Un solo registro de datos por zona** (`js/main.js`, bloque "7. Recorrido interactivo"): el objeto `ZONAS` guarda, por cada espacio, su `centro` (punto en % del stage hacia el que "vuela" la cámara, y también la posición `left`/`top` de su pin en el HTML) y su `segundoVideo` (minuto exacto del recorrido). Antes eran dos objetos separados (`centrosZona` / `capitulosVideo`) con las mismas 4 claves repetidas — si vas a agregar un espacio nuevo, solo hay un lugar que tocar en JS.

Al tocar un pin: `mostrarFotoCanvas(zona)` deja su foto como la activa en el lienzo, la cámara hace zoom hacia ese punto (`.floorplan-stage.is-zoomed`, ver §"Recorrido interactivo" en `css/styles.css`), se dispara el chip de filtro de esa misma zona (así la galería y la cinta quedan sincronizadas para cuando el visitante cierre el video) y, cuando el zoom termina de verdad (evento `transitionend` sobre `transform`, no un timeout copiado a mano), se abre el modal `.recorrido` saltando al segundo exacto de `ZONAS[zona].segundoVideo`.

**Para agregar un espacio nuevo:**
1. Agregar su `<img class="fp-canvas-photo" data-zona="...">` dentro de `.fp-canvas` en `index.html` (portada de esa zona).
2. Agregar su `<button class="fp-pin" data-zona="...">` posicionado en `%` (`left`/`top`) sobre el lienzo, con `.fp-pin-dot`, `.fp-pin-label` y `.fp-pin-cta`.
3. Agregar su entrada a `ZONAS` en `js/main.js` (`centro` + `segundoVideo`) — usar las mismas coordenadas del pin.
4. Si el espacio también debe filtrarse en la galería: agregar su `filter-chip` y sus tarjetas `data-zona` como en §6.

## 7. Roadmap por fases

### Fase 1 — Base (✅ HECHA)
Estructura completa, sistema de diseño de lujo oscuro elegido entre 4 opciones, responsive, animaciones básicas, repositorio Git inicializado.

### Fase 1b — Fidelidad de marca (✅ HECHA)
Ajuste de paleta, tipografía (Poppins+Cardo) y motivos decorativos para que el diseño sea 100% fiel al manual de marca oficial aportado por el cliente. Contacto real (WhatsApp/correo) aplicado. Ver §2 para el detalle completo.

### Fase 2 — Contenido real (siguiente)
1. Reemplazar todos los `TODO:` del §5.
2. Insertar fotos reales (§6).
3. Ajustar textos con la voz del cliente (precios, cobertura, años de experiencia).

### Fase 3 — Funcionalidad
1. Conectar el formulario (Formspree o wa.me prellenado — lo más simple).
2. Botón flotante de WhatsApp (opcional).
3. SEO: `<title>`, meta description y Open Graph/Twitter Card con foto real ya están en `index.html` — falta pasar `og:image`/`twitter:image` a URL absoluta una vez se confirme el dominio final de publicación.
4. Publicar con GitHub Pages (Settings → Pages → rama `main`, carpeta raíz).

### Fase 4 — Pulido (solo si se pide)
1. ✅ Lightbox en la galería de proyectos.
2. Slider de antes/después de remodelaciones (gran argumento de venta).
3. ✅ Contador animado de las cifras del hero. Micro-animaciones adicionales (`:active` en todos los controles, focus-trap en modales) ya aplicadas.

### Fase 5 — Pase editorial (más impacto visual, misma dirección aprobada)
El cliente pidió más "riqueza" visual sin cambiar la dirección de lujo oscuro ya decidida (§2) — esto la ejecuta con más fuerza, no la reemplaza:
- Titulares mucho más grandes y con tracking negativo (ver §2 y DESIGN.md).
- Grano sutil sobre todas las superficies oscuras (hero, secciones oscuras, footer, banda CTA, recorrido interactivo).
- Parallax de scroll + inclinación por mouse en la foto del hero (respeta `prefers-reduced-motion` y dispositivos táctiles).
- Retículas de servicios/testimonios/proceso con desfase vertical en escritorio, en vez de perfectamente parejas.
- Banda CTA con foto real + velo naranja, en vez de naranja plano.
- Fotos del hero, tarjetas y galería más grandes (más presencia, menos "encajonadas").

## 8. Reglas para quien continúe (humano o IA)

1. **No introducir frameworks ni dependencias.** Todo debe seguir abriéndose con doble clic.
2. **Usar las variables CSS existentes** para cualquier color o espaciado nuevo.
3. Mantener el contenido **en español** y el tono profesional-cercano.
4. Cada sección nueva debe llevar la clase `reveal` para heredar la animación de entrada.
5. El destacado verde (`.destacado`) es exclusivo del título del hero.
6. Probar en móvil (≤ 480px), tablet y escritorio antes de dar por terminado un cambio.
7. La carpeta `_archivo/` (referencias y branding original) no se versiona; no borrarla del disco.
