import Link from "next/link";

export default function Layout({ children }) {
  return (
    <div className="background">
      <nav className="nav">
        <Link href="/">Domov</Link>
        <Link href="/availability">Razpoložljivost</Link>
        <Link href="/ljubljana">Ljubljana</Link>
        <Link href="/contact">Kontakt</Link>
        <Link href="/privacy">GDPR</Link>
      </nav>
      <main className="content">{children}</main>
    </div>
  );
}
