import Layout from "../components/Layout";
import Head from "next/head";
import { useState } from "react";

export default function Gallery() {
  const [category, setCategory] = useState("apartment");

  const apartmentImages = [
    "/gallery/01.jpg",
    "/gallery/02.jpg",
    "/gallery/03.jpg",
    "/gallery/04.jpg",
    "/gallery/05.jpg",
    "/gallery/06.jpg",
    "/gallery/07.jpg",
    "/gallery/08.jpg",
    "/gallery/09.jpg",
    "/gallery/10.jpg",
    "/gallery/11.jpg",
    "/gallery/12.jpg",
    "/gallery/13.jpg",
    "/gallery/14.jpg",
    "/gallery/15.jpg",
    "/gallery/16.jpg",
  ];

  const awardImages = [
    "/gallery/booking-award-2026.png",
    "/gallery/booking-award-social.png",
  ];

  const images = category === "apartment" ? apartmentImages : awardImages;

  return (
    <Layout>
      <Head>
        <title>Gallery – Pirc Apartment</title>
        <meta
          name="description"
          content="Photo gallery of Pirc Apartment and Booking.com awards."
        />
      </Head>

      <h1>Gallery</h1>

      {/* CATEGORY BUTTONS */}
      <div className="galleryFilter">
        <button
          onClick={() => setCategory("apartment")}
          className={category === "apartment" ? "active" : ""}
        >
          Apartment
        </button>

        <button
          onClick={() => setCategory("awards")}
          className={category === "awards" ? "active" : ""}
        >
          Awards 🏆
        </button>
      </div>

      {/* IMAGE GRID */}
      <div className="galleryGrid">
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={
              src.includes("award")
                ? "Booking.com Traveller Review Award 2026 – Rated 9.4"
                : "Pirc Apartment interior"
            }
            className="galleryImage"
          />
        ))}
      </div>
    </Layout>
  );
}
