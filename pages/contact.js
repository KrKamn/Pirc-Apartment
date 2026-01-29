import { CONTACT } from "../lib/config";
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

      <p><strong>{t.contactEmail}:</strong> <a href={`mailto:${CONTACT.email}`}>
  {CONTACT.email}
</a></p>
      <p><strong>{t.contactPhone}:</strong> <a href={`tel:${CONTACT.phone}`}>
  {CONTACT.phone}
</a></p>

      <h2>{t.contactLocation}</h2>
      <a href={CONTACT.mapsLink} target="_blank" rel="noreferrer">
        {t.contactOpenMaps}
      </a>

<p style={{marginTop:"10px"}}>
  {CONTACT.address}
</p>

<div style={{ marginTop: "20px" }}>
  <iframe
    src="https://www.google.com/maps?q=Dunajska+cesta+86,+Ljubljana&output=embed"
    width="100%"
    height="350"
    style={{ border: 0, borderRadius: "12px" }}
    loading="lazy"
  ></iframe>
</div>
    </Layout>
  );
}
