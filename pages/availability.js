import Layout from "../components/Layout";

export default function Availability() {
  return (
    <Layout>
      <h1>Razpoložljivost</h1>

      <p>Koledar je sinhroniziran z Booking.com</p>

      <iframe
        src="https://www.booking.com/hotel/si/example.sl.html"
        width="100%"
        height="600"
        style={{ border: 0 }}
      ></iframe>

      <h2>Direktna rezervacija</h2>
      <p>
        Pošlji povpraševanje na <strong>info@apartma.si</strong>
      </p>
    </Layout>
  );
}
