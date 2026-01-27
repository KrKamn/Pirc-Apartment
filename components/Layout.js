import Link from "next/link";
import { useEffect, useState } from "react";

export default function Layout({ children }) {
  const [mode, setMode] = useState("day");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 20) {
      setMode("day");
    } else {
      setMode("night");
    }
  }, []);

  return (
    <div className={`background ${mode}`}>
      <nav className="nav">
        <Link href="/">Domov</Link>
        <Link href="/availability">Razpoložljivost</Link>
        <Link href="/ljubljana">Ljubljana</Link>
        <Link href="/contact">Kontakt</Link>
        <Link href="/privacy">GDPR</Link>
      </nav>

      <main className="content">
        {children}
      </main>
    </div>
  );
}
