import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

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

  const router = useRouter();
  const { locale, asPath } = router;

  useEffect(() => {
    const hour = getHourInLjubljana();
    setMode(hour >= 6 && hour < 20 ? "day" : "night");
  }, []);

  const setLang = (lng) => {
    router.push(asPath, asPath, { locale: lng });
    setMenuOpen(false);
  };

  return (
    <div className={`background ${mode}`}>
      <header className="header">
        <div className="brandRow">
          <Link href="/" className="brand" onClick={() => setMenuOpen(false)}>
            Pirc Apartment
          </Link>

          <div className="headerActions">
            <Link
              href="/availability"
              className="bookNow"
              onClick={() => setMenuOpen(false)}
            >
              Book now
            </Link>

            <div className="langSwitch" aria-label="Language switch">
              <button
                type="button"
                onClick={() => setLang("si")}
                className={locale === "si" ? "active" : ""}
              >
                SLO
              </button>
              <button
                type="button"
                onClick={() => setLang("en")}
                className={locale === "en" ? "active" : ""}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLang("de")}
                className={locale === "de" ? "active" : ""}
              >
                DE
              </button>
            </div>

            <button
              className="menuBtn"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Menu"
              aria-expanded={menuOpen}
            >
              ☰
            </button>
          </div>
        </div>

        <nav className={`nav ${menuOpen ? "open" : ""}`}>
          <Link href="/" onClick={() => setMenuOpen(false)}>
            Domov
          </Link>
          <Link href="/gallery" onClick={() => setMenuOpen(false)}>
            Galerija
          </Link>
          <Link href="/availability" onClick={() => setMenuOpen(false)}>
            Razpoložljivost
          </Link>
          <Link href="/ljubljana" onClick={() => setMenuOpen(false)}>
            Ljubljana
          </Link>
          <Link href="/contact" onClick={() => setMenuOpen(false)}>
            Kontakt
          </Link>
          <Link href="/privacy" onClick={() => setMenuOpen(false)}>
            GDPR
          </Link>
        </nav>
      </header>

      <main className="content">{children}</main>
    </div>
  );
}
