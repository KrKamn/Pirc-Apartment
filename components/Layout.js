import Link from "next/link";
import { useEffect, useState } from "react";

function getHourInLjubljana() {
  const now = new Date();
  // dobi uro v Europe/Ljubljana ne glede na uporabnikovo lokacijo
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Ljubljana",
    hour: "2-digit",
    hour12: false,
  }).formatToParts(now);

  const hour = Number(parts.find((p) => p.type === "hour")?.value ?? "12");
  return hour;
}

export default function Layout({ children }) {
  const [mode, setMode] = useState("day");

  useEffect(() => {
    const hour = getHourInLjubljana();
    setMode(hour >= 6 && hour < 20 ? "day" : "night");
  }, []);

  return (
    <div className={`background ${mode}`}>
      <nav className="nav">
        <Link href="/">Domov</Link>
        <Link href="/gallery">Galerija</Link>
        <Link href="/availability">Razpoložljivost</Link>
        <Link href="/ljubljana">Ljubljana</Link>
        <Link href="/contact">Kontakt</Link>
        <Link href="/privacy">GDPR</Link>
      </nav>

      <main className="content">{children}</main>
    </div>
  );
}
