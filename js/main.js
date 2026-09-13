/* ==========================================================================
   DÔKO Studio — JavaScript mínimo
   0. Preloader  1. Menú móvil  1b. Nav activo  1c. Parallax/contador del hero
   2. Scroll reveal  3. Año del footer  4. Formulario  5. Filtro de galería
   6. Lightbox (carrusel por zona)  7. Recorrido interactivo (video por espacio)
   ========================================================================== */

// 0. Preloader: cicla 4 fotos reales mientras el sitio termina de cargar -----
// Se cierra cuando pasan AMBAS cosas: la página terminó de cargar (evento
// "load") y el reel alcanzó a mostrar sus 4 fotos al menos una vez — así
// nunca se ve un parpadeo de medio segundo en conexiones rápidas, ni bloquea
// la página más de ~6s si "load" nunca llega a disparar (p. ej. un recurso
// que se cuelga).
(function () {
  const preloader = document.getElementById("preloader");
  if (!preloader) return;

  const slides = preloader.querySelectorAll(".preloader-slide");
  const nombreEl = document.getElementById("preloaderNombre");
  const barra = document.getElementById("preloaderBarFill");
  const reducido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const pasoMs = 650; // tiempo que cada foto queda activa
  const duracionReel = reducido ? 0 : pasoMs * slides.length;

  document.body.style.overflow = "hidden";

  function mostrar(i) {
    slides.forEach((s, n) => s.classList.toggle("is-active", n === i));
    if (nombreEl) nombreEl.textContent = slides[i].dataset.nombre || "";
    if (barra) barra.style.width = `${((i + 1) / slides.length) * 100}%`;
  }

  mostrar(0);

  let indice = 0;
  let intervalo = null;
  if (!reducido && slides.length > 1) {
    intervalo = window.setInterval(() => {
      indice = (indice + 1) % slides.length;
      mostrar(indice);
    }, pasoMs);
  }

  function ocultarPreloader() {
    if (intervalo) window.clearInterval(intervalo);
    if (barra) barra.style.width = "100%";
    preloader.classList.add("is-hidden");
    preloader.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    window.setTimeout(() => preloader.remove(), 550);
  }

  const cargaCompleta =
    document.readyState === "complete"
      ? Promise.resolve()
      : new Promise((resolve) => window.addEventListener("load", resolve, { once: true }));
  const cargaConTope = Promise.race([
    cargaCompleta,
    new Promise((resolve) => window.setTimeout(resolve, 6000)),
  ]);
  const reelCompleto = new Promise((resolve) => window.setTimeout(resolve, duracionReel));

  Promise.all([cargaConTope, reelCompleto]).then(ocultarPreloader);
})();

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

// 1b. Nav activo: resalta el enlace de la sección que el visitante está
// viendo, para que sepa dónde está en la página sin tener que adivinar.
const navLinks = document.querySelectorAll('.nav a[href^="#"]');
const seccionesNav = [...navLinks]
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

if (seccionesNav.length) {
  // Banda angosta cerca del centro del viewport: la sección que la cruza
  // primero al hacer scroll es la que se marca activa.
  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
          link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`);
        });
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  seccionesNav.forEach((seccion) => navObserver.observe(seccion));
}

// 1c. Hero: parallax de la foto (scroll + mouse) y contador animado ----------
// El titular grande necesitaba movimiento real alrededor, no solo aparecer y
// quedarse quieto. Todo respeta prefers-reduced-motion (no corre nada) y el
// tilt de mouse solo se activa con puntero fino (no en táctil).
(function () {
  const reducido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const heroSection = document.querySelector(".hero");
  const heroFoto = document.querySelector(".hero-media img");

  if (heroSection && heroFoto && !reducido) {
    // Un solo estado combinado (scroll + mouse) para no pisarse entre sí:
    // cada fuente actualiza su parte y se renderiza junto en un rAF.
    const despl = { scroll: 0, mouseX: 0, mouseY: 0 };
    let pendiente = false;

    function render() {
      heroFoto.style.transform = `translate(${despl.mouseX}px, ${despl.scroll + despl.mouseY}px)`;
      pendiente = false;
    }
    function pedirRender() {
      if (!pendiente) {
        window.requestAnimationFrame(render);
        pendiente = true;
      }
    }

    window.addEventListener(
      "scroll",
      () => {
        despl.scroll = Math.min(window.scrollY * 0.12, 45); // tope: nunca se siente descontrolado
        pedirRender();
      },
      { passive: true }
    );

    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      heroSection.addEventListener("mousemove", (e) => {
        const rect = heroSection.getBoundingClientRect();
        despl.mouseX = -(((e.clientX - rect.left) / rect.width) - 0.5) * 16;
        despl.mouseY = -(((e.clientY - rect.top) / rect.height) - 0.5) * 16;
        pedirRender();
      });
      heroSection.addEventListener("mouseleave", () => {
        despl.mouseX = 0;
        despl.mouseY = 0;
        pedirRender();
      });
    }
  }

  // Contador animado: los números de la barra de estadísticas suben desde 0
  // cuando entran en pantalla en vez de aparecer ya escritos. Funciona con
  // cualquier formato ("+50", "100%", "1 año") vía una sola expresión regular.
  const cifras = document.querySelectorAll(".hero-stats strong");
  if (cifras.length && !reducido) {
    const cifrasObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          obs.unobserve(entry.target);
          const el = entry.target;
          const textoFinal = el.textContent.trim();
          const match = textoFinal.match(/^(\D*)(\d+)(.*)$/);
          if (!match) return; // formato inesperado: se deja el texto tal cual
          const [, prefijo, numero, sufijo] = match;
          const meta = parseInt(numero, 10);
          const duracionMs = 1100;
          const inicio = performance.now();

          function paso(ahora) {
            const progreso = Math.min((ahora - inicio) / duracionMs, 1);
            const suavizado = 1 - Math.pow(1 - progreso, 3); // ease-out cúbico
            el.textContent = `${prefijo}${Math.round(meta * suavizado)}${sufijo}`;
            if (progreso < 1) window.requestAnimationFrame(paso);
            else el.textContent = textoFinal; // valor exacto al final, sin sorpresas de redondeo
          }
          window.requestAnimationFrame(paso);
        });
      },
      { threshold: 0.6 }
    );
    cifras.forEach((el) => cifrasObserver.observe(el));
  }
})();

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
// Por ahora simula el envío (breve estado "Enviando…" en el botón, para que
// se sienta una acción real en curso) y muestra la confirmación animada.
const form = document.getElementById("contactForm");
const formNote = document.getElementById("formNote");
const formSubmit = document.getElementById("formSubmit");
const textoEnvioOriginal = formSubmit.textContent;

form.addEventListener("submit", (e) => {
  e.preventDefault();
  formSubmit.disabled = true;
  formSubmit.textContent = "Enviando…";
  formNote.classList.remove("is-visible");

  window.setTimeout(() => {
    formSubmit.disabled = false;
    formSubmit.textContent = textoEnvioOriginal;
    formNote.classList.add("is-visible");
    form.reset();
  }, 600);
});

// 5. Filtro de proyectos por zona + carrusel único --------------------------
// Reemplaza la cinta decorativa + la cuadrícula de botones que había antes
// (dos formas de ver las mismas fotos, redundantes entre sí). Una sola
// fuente de datos por zona alimenta el carrusel Y el lightbox.
const filterChips = document.querySelectorAll(".filter-chip");
const carruselTrack = document.getElementById("carruselTrack");
const carruselPrev = document.querySelector(".carrusel-prev");
const carruselNext = document.querySelector(".carrusel-next");

const PROYECTOS = {
  sala: {
    titulo: "Sala — Apartamento Centriktown",
    fotos: ["assets/proyectos/sala-1.jpg", "assets/proyectos/sala-2.jpg", "assets/proyectos/sala-3.jpg"],
  },
  cocina: {
    titulo: "Cocina — Apartamento Centriktown",
    fotos: ["assets/proyectos/cocina-1.jpg", "assets/proyectos/cocina-2.jpg", "assets/proyectos/cocina-3.jpg"],
  },
  bano: {
    titulo: "Baño — Apartamento Centriktown",
    fotos: ["assets/proyectos/bano-1.jpg", "assets/proyectos/bano-2.jpg"],
  },
  habitacion: {
    titulo: "Habitación — Apartamento Centriktown",
    fotos: ["assets/proyectos/habitacion-1.jpg", "assets/proyectos/habitacion-2.jpg", "assets/proyectos/habitacion-3.jpg"],
  },
  // Sin fotos reales todavía — el carrusel muestra una tarjeta especial en
  // vez de desaparecer por completo (ver PLAN.md §6 para reemplazarlas).
  "antes-despues": { titulo: "Antes y después", fotos: [] },
};

// Reconstruye el carrusel con las fotos de la zona elegida (o todas). Cada
// tarjeta es una foto real y clicable — abre el lightbox ya posicionado en
// esa foto exacta, no siempre en la primera.
function actualizarCarrusel(zona) {
  const zonasAMostrar =
    zona === "todos" ? Object.keys(PROYECTOS).filter((z) => PROYECTOS[z].fotos.length > 0) : [zona];

  const tarjetas = [];
  zonasAMostrar.forEach((z) => {
    const info = PROYECTOS[z];
    if (!info) return;
    info.fotos.forEach((src, indice) => {
      tarjetas.push(
        `<button type="button" class="carrusel-card" role="listitem" data-zona="${z}" data-indice="${indice}">` +
          `<img src="${src}" alt="${info.titulo}" loading="lazy"></button>`
      );
    });
  });

  if (tarjetas.length === 0 && zona === "antes-despues") {
    // Tratamiento especial: adelanta el slider de transformación prometido
    // en el roadmap (PLAN.md Fase 4) en vez de un texto de placeholder plano —
    // sin fotos inventadas, solo la promesa visual de lo que viene.
    carruselTrack.innerHTML =
      '<div class="carrusel-card ph antes-despues" role="listitem" aria-label="Antes y después — muy pronto">' +
      '<div class="ad-lado ad-antes">Antes</div>' +
      '<div class="ad-lado ad-despues">Después</div>' +
      '<span class="ad-badge">Muy pronto</span>' +
      "</div>";
  } else if (tarjetas.length === 0) {
    carruselTrack.innerHTML = '<div class="carrusel-card ph" role="listitem">Fotos próximamente</div>';
  } else {
    carruselTrack.innerHTML = tarjetas.join("");
  }
  carruselTrack.scrollTo({ left: 0 });
}

carruselTrack.addEventListener("click", (e) => {
  const tarjeta = e.target.closest(".carrusel-card:not(.ph)");
  if (!tarjeta) return;
  const info = PROYECTOS[tarjeta.dataset.zona];
  if (!info) return;
  abrirLightbox(info.titulo, info.fotos, Number(tarjeta.dataset.indice), tarjeta);
});

// Desplaza el carrusel una "página" (ancho de tarjeta + separación) por clic.
function anchoTarjetaCarrusel() {
  const tarjeta = carruselTrack.querySelector(".carrusel-card");
  return tarjeta ? tarjeta.getBoundingClientRect().width + 20 : 340;
}
if (carruselPrev && carruselNext) {
  carruselPrev.addEventListener("click", () => carruselTrack.scrollBy({ left: -anchoTarjetaCarrusel(), behavior: "smooth" }));
  carruselNext.addEventListener("click", () => carruselTrack.scrollBy({ left: anchoTarjetaCarrusel(), behavior: "smooth" }));
}

// Cambia la foto activa del lienzo del recorrido interactivo (.fp-canvas) a
// la de la zona dada. Si la zona no tiene foto en el lienzo (p. ej. "todos" o
// "antes-después", que no son espacios recorribles en video), se deja la
// última foto activa en vez de apagar el lienzo entero.
function mostrarFotoCanvas(zona) {
  const fotos = document.querySelectorAll(".fp-canvas-photo");
  const coincide = [...fotos].some((foto) => foto.dataset.zona === zona);
  if (!coincide) return;
  fotos.forEach((foto) => foto.classList.toggle("is-active", foto.dataset.zona === zona));
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
    actualizarCarrusel(zona);
    mostrarFotoCanvas(zona);
  });
});

actualizarCarrusel("todos"); // estado inicial: todas las fotos reales

// Atrapa el foco con Tab/Shift+Tab dentro de un diálogo modal abierto, para
// que no se escape hacia contenido oculto detrás del backdrop (lightbox y
// recorrido en video comparten esta lógica).
function atraparFoco(e, contenedor) {
  if (e.key !== "Tab") return;
  const focosables = contenedor.querySelectorAll(
    'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
  );
  if (focosables.length === 0) return;
  const primero = focosables[0];
  const ultimo = focosables[focosables.length - 1];
  if (e.shiftKey && document.activeElement === primero) {
    e.preventDefault();
    ultimo.focus();
  } else if (!e.shiftKey && document.activeElement === ultimo) {
    e.preventDefault();
    primero.focus();
  }
}

// 6. Lightbox: carrusel de fotos por zona --------------------------------------
// Lo abre cualquier tarjeta del carrusel de #proyectos (bloque "5"), ya
// posicionado en la foto exacta que se tocó, no siempre en la primera.
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

// titulo/fotos vienen de PROYECTOS[zona] (bloque "5"); indiceInicial abre
// directamente en la foto que se tocó en el carrusel, no siempre en la
// primera; elementoOrigen es a quien se le devuelve el foco al cerrar.
function abrirLightbox(titulo, fotos, indiceInicial, elementoOrigen) {
  if (!fotos || fotos.length === 0) return;

  lightboxUltimoFoco = elementoOrigen || document.activeElement;
  lightboxTitle.textContent = titulo || "";
  lightboxTrack.innerHTML = fotos
    .map((foto) => {
      const esFotoReal = /\.(jpe?g|png|webp)$/i.test(foto);
      return esFotoReal
        ? `<img class="lightbox-slide" src="${foto}" alt="${titulo || ""}" loading="lazy">`
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
  irASlide(indiceInicial || 0);

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
  atraparFoco(e, lightbox);
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

// 7. Recorrido interactivo de acabados ------------------------------------------
// Cada pin es una entrada visual a los mismos datos de siempre, flotando
// sobre un lienzo de fotos reales (.fp-canvas) en vez de un plano dibujado:
// al pasar el mouse o el foco por un pin, su foto se vuelve la activa en el
// lienzo (previsualización); al tocarlo, la cámara (todo el stage, pines
// incluidos) hace zoom hacia ese punto, se activa el chip de esa zona (filtra
// la galería de fotos y actualiza la cinta, por si el visitante quiere fotos
// fijas después) y, cuando el acercamiento termina, se abre el recorrido en
// video saltando justo al momento en que se entra a ese espacio. Al
// cerrarlo, la cámara vuelve a la vista general (ver alejarCamara() en
// cerrarRecorrido()).
const floorplanStage = document.querySelector(".floorplan-stage");
const fpPins = document.querySelectorAll(".fp-pin");
const prefiereMovimientoReducido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Registro único por espacio: centro (% del stage, para el zoom de cámara —
// mismas coordenadas que left/top de cada .fp-pin en el HTML) y el segundo
// exacto del recorrido en video. Antes vivían en dos objetos separados
// (centrosZona / capitulosVideo) con las mismas 4 claves repetidas; un solo
// lugar evita que se desincronicen al agregar un espacio.
const ZONAS = {
  habitacion: { centro: { x: 23.75, y: 25 }, segundoVideo: 60 },
  bano: { centro: { x: 50, y: 25 }, segundoVideo: 48 },
  cocina: { centro: { x: 76.25, y: 25 }, segundoVideo: 9 },
  sala: { centro: { x: 50, y: 68.33 }, segundoVideo: 27 },
};

function acercarCamara(zona) {
  const centro = ZONAS[zona] && ZONAS[zona].centro;
  if (!floorplanStage || !centro) return;
  floorplanStage.style.transformOrigin = `${centro.x}% ${centro.y}%`;
  floorplanStage.classList.add("is-zoomed");
}

function alejarCamara() {
  if (floorplanStage) floorplanStage.classList.remove("is-zoomed");
}

// Abre el recorrido cuando el acercamiento de cámara termina de verdad, en
// vez de copiar a mano la duración de la transición CSS (que se podía
// desincronizar si alguna de las dos cambiaba sin tocar la otra): se escucha
// transitionend sobre la propiedad transform, con un margen de seguridad leído
// de la duración real declarada en CSS por si el evento no llega a disparar.
function acercarCamaraYAbrirRecorrido(zona) {
  const chip = document.querySelector(`.filter-chip[data-filter="${zona}"]`);
  mostrarFotoCanvas(zona);
  acercarCamara(zona);
  if (chip) chip.click(); // ya filtra la galería y actualiza la cinta

  if (prefiereMovimientoReducido || !floorplanStage) {
    abrirRecorrido(zona);
    return;
  }

  let abierto = false;
  const abrirUnaVez = () => {
    if (abierto) return;
    abierto = true;
    floorplanStage.removeEventListener("transitionend", alTerminarZoom);
    abrirRecorrido(zona);
  };
  const alTerminarZoom = (e) => {
    if (e.target === floorplanStage && e.propertyName === "transform") abrirUnaVez();
  };
  floorplanStage.addEventListener("transitionend", alTerminarZoom);

  const duracionMs = parseFloat(getComputedStyle(floorplanStage).transitionDuration || "0") * 1000;
  window.setTimeout(abrirUnaVez, duracionMs + 80);
}

fpPins.forEach((pin) => {
  pin.addEventListener("click", () => acercarCamaraYAbrirRecorrido(pin.dataset.zona));
  // Previsualización: pasar el mouse o el foco por un pin adelanta su foto en
  // el lienzo antes de comprometerse a tocarlo.
  pin.addEventListener("mouseenter", () => mostrarFotoCanvas(pin.dataset.zona));
  pin.addEventListener("focus", () => mostrarFotoCanvas(pin.dataset.zona));
});

// Recorrido: video real del apartamento, con un capítulo (segundo exacto)
// por espacio — grabado en una sola toma en primera persona, sin cámara 360,
// así que no permite mirar alrededor: se salta a cada momento y se reproduce
// hacia adelante. Duración total: 1:21.
const recorrido = document.getElementById("recorrido");
const recorridoVideo = document.getElementById("recorridoVideo");
const recorridoCapitulos = document.querySelectorAll(".recorrido-capitulo");
let recorridoUltimoFoco = null;

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
  const segundo = ZONAS[zona] && ZONAS[zona].segundoVideo;
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
    const segundo = ZONAS[btn.dataset.zona] && ZONAS[btn.dataset.zona].segundoVideo;
    if (segundo === undefined) return;
    saltarA(segundo);
    recorridoCapitulos.forEach((b) => b.classList.toggle("is-active", b === btn));
  });
});

document.addEventListener("keydown", (e) => {
  if (!recorrido.classList.contains("is-open")) return;
  if (e.key === "Escape") cerrarRecorrido();
  atraparFoco(e, recorrido);
});
