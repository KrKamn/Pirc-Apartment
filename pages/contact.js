import Layout from "../components/Layout";

export default function Contact() {
  return (
    <Layout>
      <h1>Kontakt</h1>
      <p>Email: info@apartma.si</p>
      <p>Telefon: +386 40 123 456</p>

      <h2>Lokacija</h2>
      <iframe
        src="https://www.google.com/maps?q=Ljubljana&output=embed"
        width="100%"
        height="300"
        style={{ border: 0 }}
        loading="lazy"
      ></iframe>
    </Layout>
  );
}
