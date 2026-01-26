import Head from "next/head";
import Card from "../components/Card";
import "../styles/globals.css";

export default function Home() {
  return (
    <>
      <Head>
        <title>Apartma Sončni Razgled</title>
        <meta name="description" content="Apartma za do 5 oseb" />
      </Head>

      <main className="container">
        <h1>Apartma Sončni Razgled</h1>
        <p>Apartma za do 5 oseb, idealen za družine in pare.</p>

        <Card
          title="Udoben apartma"
          text="2 spalnici, dnevni prostor, kuhinja, balkon"
        />

        <section>
          <h2>Kontakt</h2>
          <p>Email: info@apartma.si</p>
          <p>Telefon: +386 40 123 456</p>
        </section>

        <section>
          <h2>Razpoložljivost</h2>
          <p>Koledar je sinhroniziran z Booking.com</p>
        </section>
      </main>
    </>
  );
}
