import { useEffect, useMemo, useState } from "react";

export default function LightboxGallery({ images, alts }) {
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);

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

            {/* Image */}
            <div
              style={{
                background: "rgba(255,255,255,0.06)",
                borderRadius: 14,
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                maxHeight: "80vh",
              }}
            >
              <img
                src={images[idx]}
                alt={safeAlts[idx]}
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
              Tipke: ← → za listanje, ESC za zaprtje
            </div>
          </div>
        </div>
      )}
    </>
  );
}
