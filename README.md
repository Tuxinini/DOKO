# DÔKO Studio — Landing Page

Landing page de servicios de remodelación de viviendas: terminación de casas en **obra gris** y renovación integral de **casas usadas**. Estética de lujo oscuro con la paleta de marca DÔKO (negro, naranja y verde azulado).

## Vista rápida

Sin dependencias ni build: abrir `index.html` con doble clic, o servirla localmente:

```bash
python -m http.server 8000
# → http://localhost:8000
```

## Estructura

```
├── index.html        # Página completa (única página del sitio)
├── css/styles.css    # Sistema de diseño — paleta en :root, usar siempre las variables
├── js/main.js        # Menú móvil, scroll-reveal, año dinámico, formulario
├── assets/           # Logos e ícono de la marca
└── PLAN.md           # Guía del proyecto: decisiones, pendientes y roadmap
```

## Estado

**Fase 1 (base) completa.** Falta el contenido real del cliente: fotos de proyectos, número de WhatsApp, testimonios y destino del formulario. Todos los pendientes están marcados con `TODO:` en `index.html` y documentados en [PLAN.md](PLAN.md) §5–§6.

**Antes de contribuir, leer [PLAN.md](PLAN.md)** — contiene la dirección de diseño aprobada, la paleta oficial y las reglas del proyecto (sin frameworks, español, variables CSS).

## Publicación

Pensada para GitHub Pages: Settings → Pages → rama `main`, carpeta raíz (`/`).
