import Layout from "../components/Layout";
import Head from "next/head";

export default function Home() {
  return (
    <Layout>
      <Head>
  <title>Pirc Apartment | Ljubljana</title>
  <meta
    name="description"
    content="Pirc Apartment – apartma za do 5 oseb v Ljubljani. Udobna nastanitev za pare in družine."
  />
</Head>

      <h1>Pirc Apartment</h1>
      <p>Apartma za do 5 oseb v bližini centra Ljubljane.</p>

      <h2>Rezervacija</h2>
      <p>
        <a href="https://www.booking.com" target="_blank">
          Rezerviraj preko Booking.com
        </a>
      </p>
      <p>
        Ali pišite direktno za ugodnejšo ceno.
      </p>
    </Layout>
  );
}

