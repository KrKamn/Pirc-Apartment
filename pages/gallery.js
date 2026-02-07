import Layout from "../components/Layout";
import Head from "next/head";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/router";
import { translations } from "../lib/translations";

export default function Gallery() {
  const { locale } = useRouter();
  const t = translations[locale] || translations.si;

  const ui =
    {
      si: {
        title: "Galerija",
        apartment: "Apartma",
        awards: "Nagrade",
        meta: "Galerija apartmaja in Booking.com nagrad.",
        close: "Zapri",
        prev: "Prejšnja",
        next: "Naslednja",
      },
      en: {
        title: "Gallery",
        apartment: "Apartment",
        awards: "Awards",
        meta: "Photo gallery of the apartment and Booking.com awards.",
        close: "Close",
        prev: "Previous",
        next: "Next",
      },
      de: {
        title: "Galerie",
        apartment: "Apartment",
        awards: "Auszeichnungen",
        meta: "Fotogalerie des Apartments und Booking.com Auszeichnungen.",
        close: "Schließen",
        prev: "Zurück",
        next: "Weiter",
      },
    }[locale] || {
      title: "Galerija",
      apartment: "Apartma",
      awards: "Nagrade",
      meta: "Galerija apartmaja in Booking.com nagrad.",
      close: "Zapri",
      prev: "Prejšnja",
      next: "Naslednja",
    };

  const [category, setCategory] = useState("apartment");

  const apartmentImages = useMemo(
    () => [
      "/gallery/01.jpg",
      "/gallery/02.jpg",
      "/gallery/03.jpg",
      "/gallery/04.jpg",
      "/gallery/05.jpg",
      "/gallery/06.jpg",
      "/gallery/07.jpg",
      "/gallery/08.jpg",
      "/gallery/09.jpg",
      "/gallery/10.jpg",
      "/gallery/11.jpg",
      "/gallery/12.jpg",
      "/gallery/13.jpg",
      "/gallery/14.jpg",
      "/gallery/15.jpg",
      "/gallery/16.jpg",
    ],
    []
  );

  const awardImages = useMemo(
    () => ["/gallery/booking-award-2026.png", "/gallery/booking-award-social.png"],
    []
  );

  const images = category === "apartment" ? apartmentImages : awardImages;

  const altApartment =
    locale === "de"
      ? "Pirc Apartment – Innenraum"
      : locale === "en"
      ? "Pirc Apartment – interior"
      : "Pirc Apartment – notranjost";

  const altAward =
    locale === "de"
      ? "Booking.com Traveller Review Award 2026 – Bewertung 9.4"
      : locale === "en"
      ? "Booking.com Traveller Review Award 2026 – Rated 9.4"
      : "Booking.com Traveller Review Award 2026 – Ocena 9.4";

  // Lightbox state
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const openAt = (idx) => {
  // prepreči da telefon “skoči” po strani
  window.scrollTo({ top: 0, left: 0, behavior: "instant" });

  setActiveIndex(idx);
  setOpen(true);

  // še enkrat po renderju (mobile včasih scrolla po odprtju)
  setTimeout(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, 0);
};

  const close = () => setOpen(false);

  const prev = () => setActiveIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setActiveIndex((i) => (i + 1) % images.length);

  // prevent page scroll when lightbox open
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  // keyboard navigation
  useEffect(() => {
    if (!open) return;

    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, images.length]);

  // swipe handling
  const touchRef = useRef({ x0: 0, y0: 0, x: 0, y: 0, dragging: false });

  const onTouchStart = (e) => {
    const t0 = e.touches?.[0];
    if (!t0) return;
    touchRef.current = { x0: t0.clientX, y0: t0.clientY, x: t0.clientX, y: t0.clientY, dragging: true };
  };

  const onTouchMove = (e) => {
    if (!touchRef.current.dragging) return;
    const t1 = e.touches?.[0];
    if (!t1) return;
    touchRef.current.x = t1.clientX;
    touchRef.current.y = t1.clientY;
  };

  const onTouchEnd = () => {
    if (!touchRef.current.dragging) return;
    touchRef.current.dragging = false;

    const dx = touchRef.current.x - touchRef.current.x0;
    const dy = touchRef.current.y - touchRef.current.y0;

    // horizontal swipe only
    if (Math.abs(dx) > 45 && Math.abs(dy) < 60) {
      if (dx > 0) prev();
      else next();
    }
  };

  const activeSrc = images[activeIndex];

  return (
    <Layout>
      <Head>
        <title>
          {ui.title} – {t.brand}
        </title>
        <meta name="description" content={ui.meta} />
      </Head>

      <h1>{ui.title}</h1>

      {/* CATEGORY BUTTONS */}
      <div className="galleryFilter" role="tablist" aria-label="Gallery categories">
        <button
          type="button"
          onClick={() => setCategory("apartment")}
          className={category === "apartment" ? "active" : ""}
          aria-selected={category === "apartment"}
        >
          {ui.apartment}
        </button>

        <button
          type="button"
          onClick={() => setCategory("awards")}
          className={category === "awards" ? "active" : ""}
          aria-selected={category === "awards"}
        >
          {ui.awards} 🏆
        </button>
      </div>

      {/* IMAGE GRID */}
      <div className="galleryGrid">
        {images.map((src, i) => (
          <button
  key={src + i}
  type="button"
  className="galleryThumb"
  onMouseDown={(e) => e.preventDefault()}
  onTouchStart={(e) => e.preventDefault()}
  onClick={() => openAt(i)}
  aria-label="Open image"
>
            <img
              src={src}
              alt={src.includes("award") ? altAward : altApartment}
              className="galleryImage"
              loading="lazy"
            />
          </button>
        ))}
      </div>

      {/* LIGHTBOX */}
      {open ? (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="Image viewer" onClick={close}>
          <div
            className="lightboxInner"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <button type="button" className="lightboxClose" onClick={close} aria-label={ui.close}>
              ✕
            </button>

            <button type="button" className="lightboxNav left" onClick={prev} aria-label={ui.prev}>
              ‹
            </button>

            <img
              src={activeSrc}
              alt={activeSrc?.includes("award") ? altAward : altApartment}
              className="lightboxImage"
              draggable="false"
            />

            <button type="button" className="lightboxNav right" onClick={next} aria-label={ui.next}>
              ›
            </button>

            <div className="lightboxHint">
              {locale === "de"
                ? "Wischen oder Pfeile benutzen"
                : locale === "en"
                ? "Swipe or use arrows"
                : "Swipe ali uporabi puščice"}
            </div>
          </div>
        </div>
      ) : null}
    </Layout>
  );
}
