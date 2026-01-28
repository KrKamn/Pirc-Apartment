import Layout from "../components/Layout";
import Head from "next/head";
import Gallery from "../components/Gallery";
import { useRouter } from "next/router";
import { translations } from "../lib/translations";

export default function GalleryPage() {
  const { locale } = useRouter();
  const t = translations[locale];

  const images = [
    "/gallery/01.jpg",
    "/gallery/02.jpg",
    "/gallery/03.jpg",
    "/gallery/04.jpg",
    // dodaj po potrebi
  ];

  return (
    <Layout>
      <Head>
        <title>{t.galleryTitle} – {t.title}</title>
        <meta
          name="description"
          content="Galerija apartmaja Sončni Razgled"
        />
      </Head>

      <h1>{t.galleryTitle}</h1>
      <p>{t.galleryIntro || ""}</p>

      <Gallery images={images} />
    </Layout>
  );
}
