import Layout from "../components/Layout";
import Head from "next/head";
import { useRouter } from "next/router";
import { translations } from "../lib/translations";

export default function Contact() {
  const { locale } = useRouter();
  const t = translations[locale] || translations.si;

  return (
    <Layout>
      <Head>
        <title>{t.contactTitle} – {t.brand}</title>
        <meta name="description" content={t.contactMeta} />
      </Head>

      <h1>{t.contactTitle}</h1>

      <p><strong>{t.contactEmail}:</strong> info@apartma.si</p>
      <p><strong>{t.contactPhone}:</strong> +386 40 123 456</p>

      <h2>{t.contactLocation}</h2>
      <a href="https://maps.google.com/?q=Ljubljana" target="_blank" rel="noreferrer">
        {t.contactOpenMaps}
      </a>
    </Layout>
  );
}
