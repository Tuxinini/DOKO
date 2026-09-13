"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./floorplan-acabados.module.css";

export interface ZonaAcabado {
  id: string;
  nombre: string;
  fotos: string[];
  /** Posición y tamaño del espacio dentro del viewBox de la planta (ver VIEWBOX más abajo). */
  rect: { x: number; y: number; w: number; h: number };
}

const VIEWBOX = { w: 400, h: 300 };
const MARCO = { x: 20, y: 20, w: 360, h: 260 };

// Mismos datos y fotos que hoy vive en js/main.js (fotosProyecto) — apartamento
// Centriktown. Ajustar las rutas si las fotos se sirven desde /public/proyectos.
export const zonasCentriktown: ZonaAcabado[] = [
  {
    id: "habitacion",
    nombre: "Habitación",
    rect: { x: 20, y: 20, w: 150, h: 110 },
    fotos: ["/proyectos/habitacion-1.jpg", "/proyectos/habitacion-2.jpg", "/proyectos/habitacion-3.jpg"],
  },
  {
    id: "bano",
    nombre: "Baño",
    rect: { x: 170, y: 20, w: 60, h: 110 },
    fotos: ["/proyectos/bano-1.jpg", "/proyectos/bano-2.jpg"],
  },
  {
    id: "cocina",
    nombre: "Cocina",
    rect: { x: 230, y: 20, w: 150, h: 110 },
    fotos: ["/proyectos/cocina-1.jpg", "/proyectos/cocina-2.jpg", "/proyectos/cocina-3.jpg"],
  },
  {
    id: "sala",
    nombre: "Sala",
    rect: { x: 20, y: 130, w: 360, h: 150 },
    fotos: ["/proyectos/sala-1.jpg", "/proyectos/sala-2.jpg", "/proyectos/sala-3.jpg"],
  },
];

interface Props {
  /** Espacios a mostrar en la planta. Por defecto, el apartamento Centriktown. */
  zonas?: ZonaAcabado[];
  /** Nombre del apartamento/proyecto, usado solo para accesibilidad. */
  titulo?: string;
}

/**
 * Planta interactiva de acabados: equivalente en Next.js/React de la sección
 * homónima de index.html. Al tocar un espacio, se resalta en la planta y —
 * tras un breve acercamiento de cámara — se abre un lightbox con sus fotos.
 * Autocontenido: no depende de datos ni JS externos al componente.
 */
export default function FloorplanAcabados({ zonas = zonasCentriktown, titulo = "el apartamento" }: Props) {
  const [zonaActivaId, setZonaActivaId] = useState<string | null>(null);
  const [lightboxZona, setLightboxZona] = useState<ZonaAcabado | null>(null);
  const [indice, setIndice] = useState(0);
  const ultimoFoco = useRef<HTMLButtonElement | null>(null);

  function elegirZona(zona: ZonaAcabado, origen: HTMLButtonElement) {
    setZonaActivaId(zona.id);
    ultimoFoco.current = origen;

    const prefiereMovimientoReducido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.setTimeout(
      () => {
        setIndice(0);
        setLightboxZona(zona);
      },
      prefiereMovimientoReducido ? 0 : 260
    );
  }

  function cerrarLightbox() {
    setLightboxZona(null);
    ultimoFoco.current?.focus();
  }

  useEffect(() => {
    if (!lightboxZona) return;

    function onKeyDown(e: KeyboardEvent) {
      if (!lightboxZona) return;
      if (e.key === "Escape") cerrarLightbox();
      if (e.key === "ArrowLeft") setIndice((i) => (i - 1 + lightboxZona.fotos.length) % lightboxZona.fotos.length);
      if (e.key === "ArrowRight") setIndice((i) => (i + 1) % lightboxZona.fotos.length);
    }

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightboxZona]);

  return (
    <div className={styles.floorplan} aria-label={`Planta interactiva de ${titulo}`}>
      <p className={styles.hint}>Toca un espacio de la planta para ver sus acabados</p>

      <div className={styles.stage}>
        <svg className={styles.svg} viewBox={`0 0 ${VIEWBOX.w} ${VIEWBOX.h}`} aria-hidden focusable="false">
          <rect className={styles.wall} x={MARCO.x} y={MARCO.y} width={MARCO.w} height={MARCO.h} />
          {zonas.map((zona) => (
            <rect
              key={zona.id}
              className={zonaActivaId === zona.id ? `${styles.room} ${styles.roomActive}` : styles.room}
              x={zona.rect.x}
              y={zona.rect.y}
              width={zona.rect.w}
              height={zona.rect.h}
            />
          ))}
        </svg>

        {zonas.map((zona) => (
          <button
            key={zona.id}
            type="button"
            className={styles.hotspot}
            style={{
              left: `${(zona.rect.x / VIEWBOX.w) * 100}%`,
              top: `${(zona.rect.y / VIEWBOX.h) * 100}%`,
              width: `${(zona.rect.w / VIEWBOX.w) * 100}%`,
              height: `${(zona.rect.h / VIEWBOX.h) * 100}%`,
            }}
            onClick={(e) => elegirZona(zona, e.currentTarget)}
          >
            <span className={styles.hotspotLabel}>{zona.nombre}</span>
            <span className={styles.hotspotCount}>{zona.fotos.length} fotos</span>
          </button>
        ))}
      </div>

      {lightboxZona && (
        <div className={styles.lightbox} role="dialog" aria-modal="true" aria-label={lightboxZona.nombre}>
          <div className={styles.lightboxBackdrop} onClick={cerrarLightbox} />
          <div className={styles.lightboxPanel}>
            <button type="button" className={styles.lightboxClose} onClick={cerrarLightbox} aria-label="Cerrar galería">
              ×
            </button>
            <h3 className={styles.lightboxTitle}>{lightboxZona.nombre}</h3>
            <p className={styles.lightboxContador}>
              {indice + 1} / {lightboxZona.fotos.length}
            </p>
            <div className={styles.lightboxViewport}>
              <div className={styles.lightboxTrack} style={{ transform: `translateX(-${indice * 100}%)` }}>
                {lightboxZona.fotos.map((foto) => (
                  // Referencia autocontenida: cambiar por next/image en producción.
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={foto} className={styles.lightboxSlide} src={foto} alt={lightboxZona.nombre} loading="lazy" />
                ))}
              </div>
              <button
                type="button"
                className={`${styles.lightboxArrow} ${styles.prev}`}
                aria-label="Foto anterior"
                onClick={() => setIndice((i) => (i - 1 + lightboxZona.fotos.length) % lightboxZona.fotos.length)}
              >
                ‹
              </button>
              <button
                type="button"
                className={`${styles.lightboxArrow} ${styles.next}`}
                aria-label="Foto siguiente"
                onClick={() => setIndice((i) => (i + 1) % lightboxZona.fotos.length)}
              >
                ›
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
