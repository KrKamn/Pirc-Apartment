import Link from "next/link";
import { useEffect, useState } from "react";

function getHourInLjubljana() {
  const now = new Date();
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Ljubljana",
    hour: "2-digit",
    hour12: false,
  }).formatToParts(now);
  return Number(parts.find((p) => p.type === "hour")?.value ?? "12");
}

export default function Layout({ children }) {
  const [mode, setMode] = useState("day");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const hour = getHourInLjubljana();
    setMode(hour >= 6 && hour < 20 ? "day" : "night");
  }, []);

  return (
    <div className={`background ${mode}`}>
      <header className="header">
        <div className="brandRow">
          <Link href="/" className="brand">
            Pirc Apartment
          </Link>

          <div className="headerActions">
            <Link href="/availability" className="bookNow">
              Book now
            </Link>

            <button
              className="menuBtn"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Meni"
              aria-expanded={menuOpen}
            >
              ☰
            </button>
          </div>
        </div>

        <nav className={`nav ${menuOpen ? "open" : ""}`}>
          <Link href="/" onClick={() => setMenuOpen(false)}>Domov</Link>
          <Link href="/gallery" onClick={() => setMenuOpen(false)}>Galerija</Link>
          <Link href="/availability" onClick={() => setMenuOpen(false)}>Razpoložljivost</Link>
          <Link href="/ljubljana" onClick={() => setMenuOpen(false)}>Ljubljana</Link>
          <Link href="/contact" onClick={() => setMenuOpen(false)}>Kontakt</Link>
          <Link href="/privacy" onClick={() => setMenuOpen(false)}>GDPR</Link>
        </nav>
      </header>

      <main className="content">{children}</main>
    </div>
  );
}
