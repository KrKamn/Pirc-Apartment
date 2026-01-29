import Layout from "../components/Layout";
import Head from "next/head";
import { useRouter } from "next/router";
import { translations } from "../lib/translations";

export default function Privacy() {
  const { locale } = useRouter();
  const t = translations[locale] || translations.si;

  return (
    <Layout>
      <Head>
        <title>{t.privacyTitle} – {t.brand}</title>
        <meta name="description" content={t.privacyMeta} />
      </Head>

      <h1>{t.privacyTitle}</h1>
      <p>{t.privacyText}</p>
    </Layout>
  );
}
