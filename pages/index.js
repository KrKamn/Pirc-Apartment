import { BOOKING_URL } from "../lib/config";
import Layout from "../components/Layout";
import Head from "next/head";
import { useRouter } from "next/router";
import { translations } from "../lib/translations";

export default function Home() {
  const { locale } = useRouter();
  const t = translations[locale] || translations.si;

  const ctaHint =
    locale === "de"
      ? "Sofortige Bestätigung • Kostenlose Stornierung (je nach Tarif)"
      : locale === "en"
      ? "Instant confirmation • Free cancellation (depends on rate)"
      : "Takojšnja potrditev • Brezplačna odpoved (odvisno od tarife)";

  return (
    <Layout>
      <Head>
        <title>{t.homeTitle}</title>
        <meta name="description" content={t.homeSubtitle} />

        {/* SEO Keywords */}
        <meta
          name="keywords"
          content="Pirc Apartment, apartment Ljubljana, Bežigrad apartment, Booking award 2026, 9.4 rating accommodation Ljubljana"
        />

        {/* Open Graph (social sharing preview) */}
        <meta
          property="og:title"
          content="Pirc Apartment – Awarded 9.4 on Booking.com (2026)"
        />
        <meta
          property="og:description"
          content="Awarded 9.4/10 by verified guests on Booking.com in 2026."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://pirc-apartment.si/booking-award-2026.png"
        />
        <meta property="og:url" content="https://pirc-apartment.si" />

        {/* Structured Data for Google */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LodgingBusiness",
              name: "Pirc Apartment",
              url: "https://pirc-apartment.si/",
              image: "https://pirc-apartment.si/booking-award-2026.png",
              telephone: "+38631347049", // <- preveri
              priceRange: "€€", // <- izberi €, €€, €€€
              address: {
                "@type": "PostalAddress",
                streetAddress: "Dunajska cesta 86",
                addressLocality: "Ljubljana",
                postalCode: "1000",
                addressCountry: "SI",
              },
              award: "Booking.com Traveller Review Award 2026",
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: 9.4,
                bestRating: 10,
                ratingCount: 174, // <- zamenjaj z realnim številom ocen
              },
            }),
          }}
        />
      </Head>

      <h1>{t.homeTitle}</h1>
      <p>{t.homeSubtitle}</p>

      {/* 🏆 Booking Award */}
      <section className="awardSection" aria-label="Booking.com award">
        <div className="awardContent">
          <div className="awardText">
            <h2>🏆 Booking.com Traveller Review Award 2026</h2>
            <p>
              {locale === "de" ? (
                <>
                  Bewertet mit <strong>9.4 / 10</strong> von verifizierten Gästen.
                </>
              ) : locale === "en" ? (
                <>
                  Rated <strong>9.4 / 10</strong> by verified guests.
                </>
              ) : (
                <>
                  Ocenjeno <strong>9.4 / 10</strong> s strani preverjenih gostov.
                </>
              )}
            </p>
          </div>

          <img
            src="/booking-award-2026.png"
            alt="Booking.com Traveller Review Award 2026 – Rated 9.4"
            className="awardImage"
            loading="lazy"
          />
        </div>
      </section>

      <h2>{t.homeBookingTitle}</h2>

      {/* ✅ Premium CTA */}
      <div className="ctaWrap">
        <a
          href={BOOKING_URL}
          target="_blank"
          rel="noreferrer"
          className="ctaButton"
          aria-label={t.homeBookingBooking}
        >
          <span className="ctaIcon" aria-hidden="true">
            🏨
          </span>
          <span className="ctaText">
            <span className="ctaTitle">{t.homeBookingBooking}</span>
            <span className="ctaSub">{ctaHint}</span>
          </span>
          <span className="ctaArrow" aria-hidden="true">
            →
          </span>
        </a>

        <div className="ctaHint">{t.homeBookingDirect}</div>
      </div>
    </Layout>
  );
}
