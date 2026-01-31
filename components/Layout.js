import { CONTACT } from "../lib/config";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { translations } from "../lib/translations";

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
  const t = translations[locale] || translations.si;

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
        {/* OMEJITEV ŠIRINE HEADERJA */}
        <div className="headerInner">
          <div className="brandRow">
            {/* LOGO = HOME */}
            <Link
              href="/"
              className="brand"
              onClick={() => setMenuOpen(false)}
              aria-label="Home"
              title="Home"
            >
              <Image
                src="/logo.svg"
                alt="Pirc Apartment"
                width={160}
                height={52}
                priority
              />
            </Link>

            <div className="headerActions">
              <Link
                href="/availability"
                className="bookNow"
                onClick={() => setMenuOpen(false)}
              >
                {t.bookNow}
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
              {t.navHome}
            </Link>
            <Link href="/gallery" onClick={() => setMenuOpen(false)}>
              {t.navGallery}
            </Link>
            <Link href="/availability" onClick={() => setMenuOpen(false)}>
              {t.navAvailability}
            </Link>
            <Link href="/ljubljana" onClick={() => setMenuOpen(false)}>
              {t.navLjubljana}
            </Link>
            <Link href="/contact" onClick={() => setMenuOpen(false)}>
              {t.navContact}
            </Link>
            <Link href="/privacy" onClick={() => setMenuOpen(false)}>
              {t.navPrivacy}
            </Link>
          </nav>
        </div>
      </header>

      {/* CONTENT CARD */}
      <main className="content">{children}</main>

      {/* Floating CALL button (mobile only) */}
      <a href={`tel:${CONTACT.phone}`} className="callFab" aria-label="Call">
        📞
      </a>
    </div>
  );
}
