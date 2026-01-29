import { CONTACT } from "../lib/config";
import Layout from "../components/Layout";
import Head from "next/head";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { translations } from "../lib/translations";

function iso(d) {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function buildMonthGrid(year, monthIndex) {
  const first = new Date(year, monthIndex, 1);
  const startDow = (first.getDay() + 6) % 7; // pon=0
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();

  const cells = [];
  for (let i = 0; i < startDow; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, monthIndex, d));
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

export default function Availability() {
  const { locale } = useRouter();
  const t = translations[locale] || translations.si;

  const [booked, setBooked] = useState(new Set());
  const [loading, setLoading] = useState(true);

  const [view, setView] = useState(() => {
    const now = new Date();
    return { y: now.getFullYear(), m: now.getMonth() };
  });

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        const r = await fetch("/api/availability");
        const j = await r.json();
        if (!alive) return;
        setBooked(new Set(j.booked || []));
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const cells = useMemo(() => buildMonthGrid(view.y, view.m), [view]);

  const prevMonth = () => {
    setView((v) => {
      const m = v.m - 1;
      if (m < 0) return { y: v.y - 1, m: 11 };
      return { y: v.y, m };
    });
  };

  const nextMonth = () => {
    setView((v) => {
      const m = v.m + 1;
      if (m > 11) return { y: v.y + 1, m: 0 };
      return { y: v.y, m };
    });
  };

  const monthName = new Date(view.y, view.m, 1).toLocaleString(
    locale === "si" ? "sl-SI" : locale === "de" ? "de-DE" : "en-GB",
    { month: "long", year: "numeric" }
  );

  const directMailHref = useMemo(() => {
    const subject = encodeURIComponent(`${t.brand} – ${t.availabilityTitle}`);
    const body = encodeURIComponent(
      `${t.availabilityIntro}\n\nCheck-in: ${checkIn || "-"}\nCheck-out: ${checkOut || "-"}`
    );
    // zamenjaj email po potrebi
    return `mailto:${CONTACT.email}?subject=${subject}&body=${body}`;
  }, [t, checkIn, checkOut]);

  // TODO: zamenjaj s pravim URL-jem tvoje Booking nastanitve
  const bookingUrl = "https://www.booking.com";

  return (
    <Layout>
      <Head>
        <title>{t.availabilityTitle} – {t.brand}</title>
        <meta name="description" content={t.availabilityMeta} />
      </Head>

      <h1>{t.availabilityTitle}</h1>
      <p>{t.availabilityIntro}</p>

      {loading ? <p>{locale === "de" ? "Laden…" : locale === "en" ? "Loading…" : "Nalagam…"}</p> : null}

      <div style={{ display: "flex", gap: 12, alignItems: "center", margin: "12px 0" }}>
        <button onClick={prevMonth}>←</button>
        <strong style={{ textTransform: "capitalize" }}>{monthName}</strong>
        <button onClick={nextMonth}>→</button>

        <span style={{ marginLeft: "auto", fontSize: 13, opacity: 0.85 }}>
          <span style={{ padding: "2px 8px", borderRadius: 999, background: "#e8f5e9" }}>
            {locale === "de" ? "Frei" : locale === "en" ? "Available" : "Prosto"}
          </span>{" "}
          <span style={{ padding: "2px 8px", borderRadius: 999, background: "#ffebee" }}>
            {locale === "de" ? "Belegt" : locale === "en" ? "Booked" : "Zasedeno"}
          </span>
        </span>
      </div>

      {/* Dnevi v tednu */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 6 }}>
        {[
          locale === "de" ? "Mo" : locale === "en" ? "Mon" : "Pon",
          locale === "de" ? "Di" : locale === "en" ? "Tue" : "Tor",
          locale === "de" ? "Mi" : locale === "en" ? "Wed" : "Sre",
          locale === "de" ? "Do" : locale === "en" ? "Thu" : "Čet",
          locale === "de" ? "Fr" : locale === "en" ? "Fri" : "Pet",
          locale === "de" ? "Sa" : locale === "en" ? "Sat" : "Sob",
          locale === "de" ? "So" : locale === "en" ? "Sun" : "Ned",
        ].map((d) => (
          <div key={d} style={{ fontSize: 12, opacity: 0.75, textAlign: "center" }}>
            {d}
          </div>
        ))}

        {cells.map((d, idx) => {
          if (!d) return <div key={idx} style={{ height: 40 }} />;

          const k = iso(d);
          const isBooked = booked.has(k);

          return (
            <div
              key={idx}
              style={{
                height: 40,
                borderRadius: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: isBooked ? "#ffebee" : "#e8f5e9",
                fontWeight: 700,
                opacity: isBooked ? 0.9 : 1,
              }}
              title={isBooked ? "Booked" : "Available"}
            >
              {d.getDate()}
            </div>
          );
        })}
      </div>

      <hr style={{ margin: "22px 0" }} />

      <h2>{locale === "de" ? "Buchung" : locale === "en" ? "Booking" : "Rezervacija"}</h2>

      <div style={{ display: "grid", gap: 10, maxWidth: 520 }}>
        <label>
          {locale === "de" ? "Anreise" : locale === "en" ? "Check-in" : "Prihod"}
          <input
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            type="date"
            style={{ display: "block", width: "100%", padding: 10 }}
          />
        </label>

        <label>
          {locale === "de" ? "Abreise" : locale === "en" ? "Check-out" : "Odhod"}
          <input
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            type="date"
            style={{ display: "block", width: "100%", padding: 10 }}
          />
        </label>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <a
            href={directMailHref}
            style={{
              padding: "10px 14px",
              borderRadius: 10,
              background: "#111",
              color: "#fff",
              textDecoration: "none",
              fontWeight: 700,
            }}
          >
            {locale === "de" ? "Direkt anfragen (E-Mail)" : locale === "en" ? "Book direct (email)" : "Rezerviraj direktno (email)"}
          </a>

          <a
            href={bookingUrl}
            target="_blank"
            rel="noreferrer"
            style={{
              padding: "10px 14px",
              borderRadius: 10,
              border: "2px solid #111",
              color: "#111",
              textDecoration: "none",
              fontWeight: 700,
              background: "transparent",
            }}
          >
            {locale === "de" ? "Über Booking.com buchen" : locale === "en" ? "Book on Booking.com" : "Rezerviraj preko Booking.com"}
          </a>
        </div>

        <p style={{ fontSize: 13, opacity: 0.8 }}>
          {locale === "de"
            ? "Belegung wird automatisch über Booking.com iCal synchronisiert (osvežitev lahko traja nekaj časa)."
            : locale === "en"
            ? "Availability is synced automatically via Booking.com iCal (updates may take some time)."
            : "Zasedenost se sinhronizira preko Booking.com iCal (osvežitev lahko traja nekaj časa)."}
        </p>
      </div>
    </Layout>
  );
}
