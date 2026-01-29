import Layout from "../components/Layout";
import Head from "next/head";
import { useRouter } from "next/router";
import { translations } from "../lib/translations";

export default function Ljubljana() {
  const { locale } = useRouter();
  const t = translations[locale] || translations.si;

  return (
    <Layout>
      <Head>
        <title>{t.navLjubljana} – {t.brand}</title>
        <meta name="description" content={t.ljubljanaMeta} />
      </Head>

      <h1>{t.ljubljanaTitle}</h1>
      <p>{t.ljubljanaText}</p>
    </Layout>
  );
}
