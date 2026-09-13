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

// Resalta en la planta el espacio que corresponde a la zona activa. Si la
// zona no tiene un espacio en la planta (p. ej. "todos" o "fachada"), no
// queda ninguno resaltado.
function resaltarEspacioPlanta(zona) {
  document.querySelectorAll(".fp-room").forEach((room) => {
    room.classList.toggle("is-active", room.id === `fp-${zona}`);
  });
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
    resaltarEspacioPlanta(zona);
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
  alejarCamara(); // si se abrió desde la planta, la cámara vuelve a la vista general
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

// 7. Planta interactiva de acabados --------------------------------------------
// Cada espacio de la planta es una entrada visual a los mismos datos de
// siempre: al tocarlo, la cámara (toda la planta, hotspots incluidos) hace
// zoom hacia ese espacio, se activa el chip de esa zona (filtra la galería de
// fotos y actualiza la cinta, por si el visitante quiere fotos fijas después)
// y, cuando el acercamiento termina, se abre el recorrido en video saltando
// justo al momento en que se entra a ese espacio. Al cerrarlo, la cámara
// vuelve a la vista general (ver alejarCamara() en cerrarRecorrido()).
const floorplanStage = document.querySelector(".floorplan-stage");
const fpHotspots = document.querySelectorAll(".fp-hotspot");
const prefiereMovimientoReducido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Centro de cada espacio en % del stage (mismas coordenadas que left/top/width/
// height de cada .fp-hotspot en el HTML) — es el punto hacia el que "vuela" la
// cámara. Si se agrega un espacio nuevo, agregar aquí su centro también.
const centrosZona = {
  habitacion: { x: 23.75, y: 25 },
  bano: { x: 50, y: 25 },
  cocina: { x: 76.25, y: 25 },
  sala: { x: 50, y: 68.33 },
};

function acercarCamara(zona) {
  const centro = centrosZona[zona];
  if (!floorplanStage || !centro) return;
  floorplanStage.style.transformOrigin = `${centro.x}% ${centro.y}%`;
  floorplanStage.classList.add("is-zoomed");
}

function alejarCamara() {
  if (floorplanStage) floorplanStage.classList.remove("is-zoomed");
}

fpHotspots.forEach((hotspot) => {
  hotspot.addEventListener("click", () => {
    const zona = hotspot.dataset.zona;
    const chip = document.querySelector(`.filter-chip[data-filter="${zona}"]`);

    acercarCamara(zona);
    if (chip) chip.click(); // ya resalta la planta, filtra la galería y actualiza la cinta

    // El recorrido se abre justo cuando el acercamiento termina (mismos 0.48s
    // de .floorplan-stage.is-zoomed en styles.css); se omite la espera si el
    // usuario prefiere menos movimiento.
    window.setTimeout(
      () => {
        abrirRecorrido(zona);
      },
      prefiereMovimientoReducido ? 0 : 460
    );
  });
});

// Recorrido: video real del apartamento, con un capítulo (segundo exacto)
// por espacio — grabado en una sola toma en primera persona, sin cámara 360,
// así que no permite mirar alrededor: se salta a cada momento y se reproduce
// hacia adelante. Duración total: 1:21.
const recorrido = document.getElementById("recorrido");
const recorridoVideo = document.getElementById("recorridoVideo");
const recorridoCapitulos = document.querySelectorAll(".recorrido-capitulo");
let recorridoUltimoFoco = null;

const capitulosVideo = {
  cocina: 9,
  sala: 27,
  bano: 48,
  habitacion: 60,
};

// Salta el video al segundo indicado y lo reproduce. Si todavía no se cargaron
// los metadatos (readyState 0 — puede pasar en el primer clic con conexiones
// lentas), currentTime se ignora en silencio, así que se espera al evento
// "loadedmetadata" antes de saltar. Con preload="metadata" + faststart (ver
// index.html/PLAN.md), esto normalmente ya está listo de antemano.
function saltarA(segundo) {
  function saltar() {
    recorridoVideo.currentTime = segundo;
    recorridoVideo.play().catch(() => {});
  }
  if (recorridoVideo.readyState === 0) {
    recorridoVideo.addEventListener("loadedmetadata", saltar, { once: true });
  } else {
    saltar();
  }
}

function abrirRecorrido(zona) {
  const segundo = capitulosVideo[zona];
  if (segundo === undefined) return;

  recorridoUltimoFoco = document.activeElement;

  // El video se hace visible ANTES de pedirle que reproduzca: como no tiene
  // pista de audio, Chrome lo pausa solo ("paused to save power") si play()
  // se llama en el mismo instante en que el contenedor deja de ser
  // visibility:hidden — antes de que el navegador pinte el cambio. La
  // pequeña espera le da tiempo a registrar que el video ya es visible.
  recorrido.classList.add("is-open");
  recorrido.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  recorrido.querySelector(".lightbox-close").focus();

  recorridoCapitulos.forEach((btn) => btn.classList.toggle("is-active", btn.dataset.zona === zona));

  window.setTimeout(() => saltarA(segundo), 20);
}

function cerrarRecorrido() {
  recorridoVideo.pause();
  recorrido.classList.remove("is-open");
  recorrido.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  alejarCamara();
  if (recorridoUltimoFoco) recorridoUltimoFoco.focus();
}

recorrido.querySelectorAll("[data-recorrido-close]").forEach((el) => {
  el.addEventListener("click", cerrarRecorrido);
});

recorridoCapitulos.forEach((btn) => {
  btn.addEventListener("click", () => {
    const segundo = capitulosVideo[btn.dataset.zona];
    if (segundo === undefined) return;
    saltarA(segundo);
    recorridoCapitulos.forEach((b) => b.classList.toggle("is-active", b === btn));
  });
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && recorrido.classList.contains("is-open")) cerrarRecorrido();
});
