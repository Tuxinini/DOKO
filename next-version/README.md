# Planta interactiva — versión Next.js (referencia)

Equivalente en React/Next.js de la planta interactiva ya implementada en `index.html` + `css/styles.css` + `js/main.js`. **No está conectada a ningún proyecto Next.js real** — el sitio en producción sigue siendo HTML/CSS/JS puro, tal como define `PLAN.md` §3. Esta carpeta existe solo como referencia lista para el día en que el sitio migre a un framework.

## Uso

```tsx
import FloorplanAcabados from "@/next-version/FloorplanAcabados";

export default function Page() {
  return <FloorplanAcabados titulo="Apartamento Centriktown" />;
}
```

Sin props usa los datos de ejemplo (`zonasCentriktown`, las mismas 4 zonas y fotos que hoy están en `js/main.js`). Para otro apartamento, pasa tu propia lista:

```tsx
<FloorplanAcabados
  titulo="Apartamento Girasoles"
  zonas={[
    { id: "sala", nombre: "Sala", rect: { x: 20, y: 130, w: 360, h: 150 }, fotos: ["/proyectos/girasoles/sala-1.jpg"] },
    // ...
  ]}
/>
```

`rect` ubica el espacio dentro de un plano de 400×300 unidades (ver `VIEWBOX` en el componente) — no son porcentajes a mano como en la versión HTML, así que agregar o mover espacios es solo cambiar números en `data`.

## Diferencias con la versión de producción

- **Autocontenido**: trae su propio lightbox (no reutiliza uno externo), porque en un proyecto Next.js nuevo no existe ya el que hay en `js/main.js`.
- **`<img>` plano**, no `next/image` — para que el componente funcione sin configurar dominios de imágenes. Cambiar a `next/image` es la primera optimización recomendada en producción.
- **CSS Modules**, no las variables `:root` de `styles.css` — la paleta de marca está duplicada como variables locales en `floorplan-acabados.module.css` para que el componente no dependa de nada del proyecto host.
- Requiere React 18+ y App Router (usa `"use client"`); en Pages Router funciona igual quitando esa directiva si el archivo no la necesita.

## Qué falta para producción

1. Servir las fotos desde `/public/proyectos/` (o el CDN que se use) y ajustar las rutas en `zonasCentriktown`.
2. Cambiar `<img>` por `next/image` con `sizes` apropiado.
3. Si el resto del sitio usa Tailwind, es válido reescribir los estilos como clases utilitarias — el CSS Module actual es intencionalmente independiente de cualquier design system para poder copiarse a cualquier proyecto.
