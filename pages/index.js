import { BOOKING_URL } from "../lib/config";
import Layout from "../components/Layout";
import Head from "next/head";
import { useRouter } from "next/router";
import { translations } from "../lib/translations";

export default function Home() {
  const { locale } = useRouter();
  const t = translations[locale] || translations.si;

  return (
    <Layout>
      <Head>
        <title>{t.homeTitle}</title>
        <meta name="description" content={t.homeSubtitle} />
      </Head>

      <h1>{t.homeTitle}</h1>
      <p>{t.homeSubtitle}</p>

      <h2>{t.homeBookingTitle}</h2>
      <p>
        <a
  href={BOOKING_URL}
  target="_blank"
  rel="noreferrer"
  style={{
    display: "inline-block",
    background: "#2f6f4e",
    color: "white",
    padding: "12px 18px",
    borderRadius: "10px",
    fontWeight: "bold",
    textDecoration: "none",
    marginTop: "10px"
  }}
>
  {t.homeBookingBooking}
</a>
      </p>
      <p>{t.homeBookingDirect}</p>
    </Layout>
  );
}
