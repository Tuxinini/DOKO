/* ==========================================================================
   DÔKO Studio — JavaScript mínimo
   1. Menú móvil  2. Scroll reveal  3. Año del footer  4. Formulario
   5. Filtro de galería  6. Lightbox (carrusel por zona)
   ========================================================================== */

// 1. Menú móvil -------------------------------------------------------------
const navToggle = document.getElementById("navToggle");
const nav = document.getElementById("nav");

navToggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", open);
});

// Cerrar el menú al elegir una sección
nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

// 2. Animación de entrada al hacer scroll ------------------------------------
// Todo elemento con la clase .reveal aparece con fade + subida al entrar en pantalla.
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

// 3. Año dinámico del footer --------------------------------------------------
document.getElementById("year").textContent = new Date().getFullYear();

// 4. Formulario de contacto ---------------------------------------------------
// TODO (Fase 3 del PLAN.md): conectar a Formspree o redirigir a WhatsApp.
// Por ahora solo muestra la confirmación y limpia los campos.
const form = document.getElementById("contactForm");
const formNote = document.getElementById("formNote");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  formNote.hidden = false;
  form.reset();
});

// 5. Filtro de galería por zona (carrusel deslizable en móvil + cinta infinita) -
const filterChips = document.querySelectorAll(".filter-chip");
const galleryTiles = document.querySelectorAll(".gallery .ph-tile");
const gallery = document.querySelector(".gallery");
const marquee = document.querySelector(".marquee");
const marqueeTrack = document.getElementById("marqueeTrack");

// Mismas fotos que data-fotos de cada tarjeta, listadas aquí para poder
// armar la cinta infinita filtrada por zona sin duplicar las rutas a mano.
const fotosProyecto = [
  { zona: "sala", src: "assets/proyectos/sala-1.jpg" },
  { zona: "sala", src: "assets/proyectos/sala-2.jpg" },
  { zona: "sala", src: "assets/proyectos/sala-3.jpg" },
  { zona: "cocina", src: "assets/proyectos/cocina-1.jpg" },
  { zona: "cocina", src: "assets/proyectos/cocina-2.jpg" },
  { zona: "cocina", src: "assets/proyectos/cocina-3.jpg" },
  { zona: "bano", src: "assets/proyectos/bano-1.jpg" },
  { zona: "bano", src: "assets/proyectos/bano-2.jpg" },
  { zona: "habitacion", src: "assets/proyectos/habitacion-1.jpg" },
  { zona: "habitacion", src: "assets/proyectos/habitacion-2.jpg" },
  { zona: "habitacion", src: "assets/proyectos/habitacion-3.jpg" },
];

// Reconstruye la cinta infinita mostrando solo las fotos de la zona elegida.
// Si esa zona no tiene fotos reales todavía (p. ej. Fachada), la cinta se oculta.
function actualizarMarquee(zona) {
  const fotos =
    zona === "todos" ? fotosProyecto : fotosProyecto.filter((f) => f.zona === zona);

  if (fotos.length === 0) {
    marquee.classList.add("is-hidden");
    return;
  }
  marquee.classList.remove("is-hidden");

  const html = fotos
    .map((f) => `<img src="${f.src}" alt="" loading="lazy">`)
    .join("");
  marqueeTrack.innerHTML = html + html; // duplicado: loop infinito sin costura

  // Ritmo proporcional a la cantidad de fotos, para que la velocidad de
  // desplazamiento se sienta pareja sin importar cuántas fotos haya.
  marqueeTrack.style.animationDuration = `${Math.max(fotos.length * 3.5, 10)}s`;
}

filterChips.forEach((chip) => {
  chip.addEventListener("click", () => {
    filterChips.forEach((c) => {
      c.classList.remove("is-active");
      c.setAttribute("aria-pressed", "false");
    });
    chip.classList.add("is-active");
    chip.setAttribute("aria-pressed", "true");

    const zona = chip.dataset.filter;
    galleryTiles.forEach((tile) => {
      const coincide = zona === "todos" || tile.dataset.zona === zona;
      tile.classList.toggle("is-hidden", !coincide);
    });

    actualizarMarquee(zona);
    gallery.scrollTo({ left: 0, behavior: "smooth" });
  });
});

actualizarMarquee("todos"); // estado inicial: cinta con todas las fotos

// 6. Lightbox: carrusel de fotos por zona --------------------------------------
// Cada tarjeta de la galería abre su propio carrusel (distinto por zona),
// leyendo las fotos desde su atributo data-fotos (separadas por "|").
const lightbox = document.getElementById("lightbox");
const lightboxTitle = document.getElementById("lightboxTitle");
const lightboxContador = document.getElementById("lightboxContador");
const lightboxTrack = lightbox.querySelector(".lightbox-track");
const lightboxDots = lightbox.querySelector(".lightbox-dots");
const lightboxPrev = lightbox.querySelector(".lightbox-prev");
const lightboxNext = lightbox.querySelector(".lightbox-next");

let lightboxIndex = 0;
let lightboxTotal = 0;
let lightboxUltimoFoco = null;

function irASlide(indice) {
  lightboxIndex = (indice + lightboxTotal) % lightboxTotal;
  lightboxTrack.style.transform = `translateX(-${lightboxIndex * 100}%)`;
  lightboxTrack.querySelectorAll(".lightbox-slide").forEach((slide, i) => {
    slide.classList.toggle("is-active", i === lightboxIndex);
  });
  lightboxDots.querySelectorAll(".lightbox-dot").forEach((dot, i) => {
    dot.classList.toggle("is-active", i === lightboxIndex);
  });
  lightboxContador.textContent = `${lightboxIndex + 1} / ${lightboxTotal}`;
}

function abrirLightbox(tile) {
  const fotos = (tile.dataset.fotos || "").split("|").filter(Boolean);
  if (fotos.length === 0) return;

  lightboxUltimoFoco = tile;
  lightboxTitle.textContent = tile.dataset.titulo || "";
  lightboxTrack.innerHTML = fotos
    .map((foto) => {
      const esFotoReal = /\.(jpe?g|png|webp)$/i.test(foto);
      return esFotoReal
        ? `<img class="lightbox-slide" src="${foto}" alt="${tile.dataset.titulo || ""}" loading="lazy">`
        : `<div class="ph lightbox-slide">FOTO: ${foto}</div>`;
    })
    .join("");
  lightboxDots.innerHTML = fotos
    .map(
      (_, i) =>
        `<button type="button" class="lightbox-dot" data-index="${i}" aria-label="Ir a la foto ${i + 1}"></button>`
    )
    .join("");

  lightboxTotal = fotos.length;
  irASlide(0);

  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  lightbox.querySelector(".lightbox-close").focus();
}

function cerrarLightbox() {
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  if (lightboxUltimoFoco) lightboxUltimoFoco.focus();
}

galleryTiles.forEach((tile) => {
  tile.addEventListener("click", () => abrirLightbox(tile));
});

lightbox.querySelectorAll("[data-lightbox-close]").forEach((el) => {
  el.addEventListener("click", cerrarLightbox);
});

lightboxPrev.addEventListener("click", () => irASlide(lightboxIndex - 1));
lightboxNext.addEventListener("click", () => irASlide(lightboxIndex + 1));

lightboxDots.addEventListener("click", (e) => {
  if (e.target.matches(".lightbox-dot")) {
    irASlide(Number(e.target.dataset.index));
  }
});

document.addEventListener("keydown", (e) => {
  if (!lightbox.classList.contains("is-open")) return;
  if (e.key === "Escape") cerrarLightbox();
  if (e.key === "ArrowLeft") irASlide(lightboxIndex - 1);
  if (e.key === "ArrowRight") irASlide(lightboxIndex + 1);
});

// Deslizar con el dedo dentro del carrusel
let lightboxToqueX = 0;
lightboxTrack.addEventListener(
  "touchstart",
  (e) => {
    lightboxToqueX = e.touches[0].clientX;
  },
  { passive: true }
);

lightboxTrack.addEventListener("touchend", (e) => {
  const delta = e.changedTouches[0].clientX - lightboxToqueX;
  if (Math.abs(delta) > 40) {
    irASlide(delta < 0 ? lightboxIndex + 1 : lightboxIndex - 1);
  }
});
