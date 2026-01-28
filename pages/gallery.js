import Head from "next/head";
import Layout from "../components/Layout";
import { useRouter } from "next/router";
import { translations } from "../lib/translations";

export default function GalleryPage() {
  const { locale } = useRouter();
  const t = translations[locale] || translations.si;

  const images = ["/gallery/01.jpg", "/gallery/02.jpg", "/gallery/03.jpg", "/gallery/04.jpg"];

  return (
    <Layout>
      <Head>
        <title>{t.galleryTitle} – {t.title}</title>
      </Head>

      <h1>{t.galleryTitle}</h1>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 12 }}>
        {images.map((src) => (
          <a key={src} href={src} target="_blank" rel="noreferrer">
            <img src={src} alt={t.galleryTitle} style={{ width: "100%", borderRadius: 12, display: "block" }} />
          </a>
        ))}
      </div>
    </Layout>
  );
}
