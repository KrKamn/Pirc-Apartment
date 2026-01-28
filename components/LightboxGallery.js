import { useEffect, useMemo, useRef, useState } from "react";

export default function LightboxGallery({ images, alts }) {
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);

  // swipe state
  const startXRef = useRef(null);
  const lastXRef = useRef(null);
  const draggingRef = useRef(false);

  const safeAlts = useMemo(() => {
    if (alts && alts.length === images.length) return alts;
    return images.map(() => "Pirc Apartment Ljubljana – apartma za do 5 oseb");
  }, [alts, images]);

  const close = () => setOpen(false);

  const prev = () => setIdx((i) => (i - 1 + images.length) % images.length);
  const next = () => setIdx((i) => (i + 1) % images.length);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, images.length]);

  const openAt = (i) => {
    setIdx(i);
    setOpen(true);
  };

  // ----- Swipe handlers (touch + pointer) -----
  const SWIPE_THRESHOLD_PX = 60;

  const onTouchStart = (e) => {
    if (!e.touches?.length) return;
    draggingRef.current = true;
    startXRef.current = e.touches[0].clientX;
    lastXRef.current = startXRef.current;
  };

  const onTouchMove = (e) => {
    if (!draggingRef.current || !e.touches?.length) return;
    lastXRef.current = e.touches[0].clientX;
  };

  const onTouchEnd = () => {
    if (!draggingRef.current) return;
    draggingRef.current = false;

    const startX = startXRef.current;
    const endX = lastXRef.current;
    startXRef.current = null;
    lastXRef.current = null;

    if (startX == null || endX == null) return;

    const dx = endX - startX;
    if (Math.abs(dx) < SWIPE_THRESHOLD_PX) return;

    if (dx < 0) next(); // swipe left -> next
    else prev(); // swipe right -> prev
  };

  // Pointer events (deluje tudi na nekaterih mobilnih brskalnikih)
  const onPointerDown = (e) => {
    // samo primarni prst / gumb
    if (e.pointerType === "mouse" && e.buttons !== 1) return;
    draggingRef.current = true;
    startXRef.current = e.clientX;
    lastXRef.current = e.clientX;
  };

  const onPointerMove = (e) => {
    if (!draggingRef.current) return;
    lastXRef.current = e.clientX;
  };

  const onPointerUp = () => {
    if (!draggingRef.current) return;
    draggingRef.current = false;

    const startX = startXRef.current;
    const endX = lastXRef.current;
    startXRef.current = null;
    lastXRef.current = null;

    if (startX == null || endX == null) return;

    const dx = endX - startX;
    if (Math.abs(dx) < SWIPE_THRESHOLD_PX) return;

    if (dx < 0) next();
    else prev();
  };

  return (
    <>
      {/* Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 12,
        }}
      >
        {images.map((src, i) => (
          <button
            key={src}
            onClick={() => openAt(i)}
            style={{
              border: "none",
              padding: 0,
              cursor: "pointer",
              borderRadius: 12,
              overflow: "hidden",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              background: "transparent",
            }}
            aria-label={`Odpri sliko ${i + 1}`}
          >
            <img
              src={src}
              alt={safeAlts[i]}
              loading="lazy"
              style={{
                width: "100%",
                height: 200,
                objectFit: "cover",
                display: "block",
              }}
            />
          </button>
        ))}
      </div>

      {/* Lightbox overlay */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={close}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.85)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            padding: 16,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "relative",
              width: "min(1100px, 100%)",
              maxHeight: "85vh",
              display: "grid",
              gap: 10,
              touchAction: "pan-y", // omogoči vertikalni scroll, horizontalni swipe pa zaznamo mi
            }}
          >
            {/* Top bar */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                color: "white",
              }}
            >
              <div style={{ fontSize: 14, opacity: 0.9 }}>
                {idx + 1} / {images.length}
              </div>

              <button
                onClick={close}
                style={{
                  border: "none",
                  background: "transparent",
                  color: "white",
                  fontSize: 28,
                  cursor: "pointer",
                  lineHeight: 1,
                }}
                aria-label="Zapri"
              >
                ×
              </button>
            </div>

            {/* Image area (swipe target) */}
            <div
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerUp}
              style={{
                background: "rgba(255,255,255,0.06)",
                borderRadius: 14,
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                maxHeight: "80vh",
                userSelect: "none",
              }}
            >
              <img
                src={images[idx]}
                alt={safeAlts[idx]}
                draggable={false}
                style={{
                  width: "100%",
                  height: "auto",
                  maxHeight: "80vh",
                  objectFit: "contain",
                  display: "block",
                }}
              />
            </div>

            {/* Controls */}
            <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
              <button
                onClick={prev}
                style={{
                  padding: "10px 14px",
                  borderRadius: 10,
                  border: "2px solid white",
                  background: "transparent",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                ← Prejšnja
              </button>
              <button
                onClick={next}
                style={{
                  padding: "10px 14px",
                  borderRadius: 10,
                  border: "2px solid white",
                  background: "transparent",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                Naslednja →
              </button>
            </div>

            <div style={{ color: "white", fontSize: 12, opacity: 0.8, textAlign: "center" }}>
              Telefon: swipe levo/desno · Tipke: ← → · ESC zapre
            </div>
          </div>
        </div>
      )}
    </>
  );
}
