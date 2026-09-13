# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Dos segmentos, atendidos por igual:
- Compradores de un apartamento/casa nueva entregada en **obra gris** (incluye VIS) que necesitan terminarla desde cero.
- Dueños de una **casa usada/antigua** que quieren una remodelación integral.

Ambos operan en **Bogotá, zona norte** (cobertura real del negocio; reemplaza el antiguo placeholder "Ciudad y alrededores").

## Product Purpose

Landing page de una sola página cuyo objetivo es generar contactos (cotizaciones) vía WhatsApp y formulario para servicios de remodelación: terminación de obra gris y renovación integral de casas usadas. Éxito = solicitudes de cotización, no solo visitas.

## Positioning

Especialistas en terminación de **obra gris / VIS** — conocen ese proceso específico (entrega en obra gris hasta acabado final) con una profundidad que un remodelador genérico no tiene. Este es el mecanismo diferenciador a reforzar en copy y casos mostrados, sin excluir el segmento de casas usadas.

## Operating Context

- Sitio estático de una sola página, sin CMS ni backend.
- Canales de contacto reales: WhatsApp `+57 305 798 9724` y correo `camiloromeroe@gmail.com`.
- La fuente de verdad de diseño es el manual de marca oficial del cliente (`diseño Doko/Referentes visuales - moodboard.pdf` y la plantilla de cotización), guardado fuera del repo (excluido en `.gitignore`, no borrar del disco).
- 6 años de trayectoria confirmados por el cliente (el manual de marca dice "más de cinco años").

## Capabilities and Constraints

- **HTML + CSS + JS puros. Sin frameworks, sin build tools, sin npm** — debe poder abrirse con doble clic en `index.html` o cualquier servidor estático. No cambiar el stack sin razón explícita.
- Un solo archivo por tipo: `index.html`, `css/styles.css`, `js/main.js`.
- Contenido en español, tono profesional-cercano.
- Dirección de diseño ya decidida (lujo oscuro fiel al manual de marca) — no se re-abre sin aprobación del cliente.
- Pendiente sin resolver: destino real del formulario de contacto (hoy no envía a ningún lado), testimonios son de muestra (no reales), redes sociales del footer apuntan a `#`, fotos de Fachada y Antes/Después siguen en placeholder (el único proyecto real disponible, "Centriktown", no incluye esas tomas).

## Brand Commitments

- Marca: **DÔKO Studio**. Tagline oficial: *"Precisión, estética, confianza."* (Cardo itálica, color café, en el footer).
- Paleta oficial (variables CSS, nunca hex sueltos): Negro ratón `#191919`, Celeste oscuro `#1A3E46`, Azul petróleo `#0E5B6D`, azul claro `#3D93A6`, Naranja `#EB5B34`, Café claro `#A95D39`, Crema `#FFF5F0`.
- Tipografía: **Poppins** (sustituto de Mont, fuente de marca no disponible gratis) para titulares/cuerpo; **Cardo** itálica para toda frase o palabra de énfasis.
- Header claro con logo a color; negro protagonista en hero/diferenciales/contacto/footer.
- La palabra destacada en azul petróleo (`.destacado`) es **exclusiva del título del hero** — no replicar en otros títulos.

## Evidence on Hand

- Proyecto real terminado: apartamento VIS **"Centriktown"** — 11 fotos reales (sala, cocina, baño, habitación) ya integradas en hero, tarjetas de servicio, galería filtrable y cinta infinita.
- No hay fotos de fachada ni de "antes/después" de ningún proyecto todavía — esas zonas de la galería siguen en placeholder de texto.
- Testimonios actuales son de muestra, no reales — pendientes de reemplazo.

## Product Principles

- El manual de marca oficial es la autoridad final de diseño: cualquier decisión de color, tipografía o tono se valida contra él antes de improvisar.
- Priorizar evidencia real (fotos de proyectos terminados) sobre placeholders; reemplazar `.ph` en cuanto haya material nuevo del cliente.
- Cada sección existe para acercar al visitante a cotizar (WhatsApp/formulario), no solo para informar.
- Mantener el sitio sin frameworks ni dependencias — sigue abriéndose con doble clic.
- Reforzar la especialización en obra gris/VIS como ángulo distintivo, sin excluir el segmento de casas usadas.
