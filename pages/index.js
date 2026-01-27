import Layout from "../components/Layout";
import Head from "next/head";

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Apartma Sončni Razgled</title>
      </Head>

      <h1>Apartma Sončni Razgled</h1>
      <p>Apartma za do 5 oseb v bližini Ljubljane.</p>

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

