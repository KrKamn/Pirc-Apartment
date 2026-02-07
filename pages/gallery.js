import Layout from "../components/Layout";
import Head from "next/head";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/router";
import { translations } from "../lib/translations";
import { createPortal } from "react-dom";

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

  // Portal mount
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Scroll lock (prepreči “skok” in scrolling spodaj)
  const scrollYRef = useRef(0);

  const lockScroll = () => {
    scrollYRef.current = window.scrollY || 0;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollYRef.current}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
  };

  const unlockScroll = () => {
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.left = "";
    document.body.style.right = "";
    document.body.style.width = "";
    window.scrollTo(0, scrollYRef.current);
  };

  const openAt = (idx, e) => {
    // prepreči focus/scroll skoke na mobilnih brskalnikih
    if (e?.currentTarget?.blur) e.currentTarget.blur();
    if (e?.preventDefault) e.preventDefault();

    setActiveIndex(idx);
    setOpen(true);
    lockScroll();
  };

  const close = () => {
    setOpen(false);
    unlockScroll();
  };

  const prev = () => setActiveIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setActiveIndex((i) => (i + 1) % images.length);

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

    if (Math.abs(dx) > 45 && Math.abs(dy) < 60) {
      if (dx > 0) prev();
      else next();
    }
  };

  const activeSrc = images[activeIndex];

  // Inline styles for overlay (da je 100% fixed, tudi če CSS conflict)
  const overlay = open ? (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 999999,
        background: "rgba(0,0,0,0.92)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 14,
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Image viewer"
      onClick={close}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 1000,
          maxHeight: "95vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        onClick={(e) => e.stopPropagation()}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <button
          type="button"
          onClick={close}
          aria-label={ui.close}
          style={{
            position: "absolute",
            top: -8,
            right: -8,
            width: 42,
            height: 42,
            borderRadius: 999,
            border: "none",
            background: "rgba(255,255,255,0.2)",
            color: "#fff",
            cursor: "pointer",
            fontSize: 18,
          }}
        >
          ✕
        </button>

        <button
          type="button"
          onClick={prev}
          aria-label={ui.prev}
          style={{
            position: "absolute",
            left: 10,
            top: "50%",
            transform: "translateY(-50%)",
            width: 46,
            height: 46,
            borderRadius: 999,
            border: "none",
            background: "rgba(255,255,255,0.2)",
            color: "#fff",
            cursor: "pointer",
            fontSize: 28,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          ‹
        </button>

        <img
          src={activeSrc}
          alt={activeSrc?.includes("award") ? altAward : altApartment}
          draggable="false"
          style={{
            width: "auto",
            height: "auto",
            maxWidth: "100%",
            maxHeight: "90vh",
            objectFit: "contain",
            borderRadius: 14,
            margin: "0 auto",
          }}
        />

        <button
          type="button"
          onClick={next}
          aria-label={ui.next}
          style={{
            position: "absolute",
            right: 10,
            top: "50%",
            transform: "translateY(-50%)",
            width: 46,
            height: 46,
            borderRadius: 999,
            border: "none",
            background: "rgba(255,255,255,0.2)",
            color: "#fff",
            cursor: "pointer",
            fontSize: 28,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          ›
        </button>

        <div
          style={{
            position: "absolute",
            bottom: 10,
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: 12,
            color: "rgba(255,255,255,0.85)",
            background: "rgba(0,0,0,0.25)",
            padding: "6px 10px",
            borderRadius: 999,
          }}
        >
          {locale === "de"
            ? "Wischen oder Pfeile benutzen"
            : locale === "en"
            ? "Swipe or use arrows"
            : "Swipe ali uporabi puščice"}
        </div>
      </div>
    </div>
  ) : null;

  return (
    <Layout>
      <Head>
        <title>
          {ui.title} – {t.brand}
        </title>
        <meta name="description" content={ui.meta} />
      </Head>

      <h1>{ui.title}</h1>

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

      <div className="galleryGrid">
        {images.map((src, i) => (
          <button
            key={src + i}
            type="button"
            className="galleryThumb"
            onClick={(e) => openAt(i, e)}
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

      {/* PORTAL: lightbox gre direktno v body -> vedno takoj na ekranu */}
      {mounted && open ? createPortal(overlay, document.body) : null}
    </Layout>
  );
}
