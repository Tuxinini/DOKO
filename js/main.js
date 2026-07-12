/* ==========================================================================
   DÔKO Studio — JavaScript mínimo
   1. Menú móvil  2. Scroll reveal  3. Año del footer  4. Formulario
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
