import Image from "next/image";

export default function Gallery({ images }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "16px",
      }}
    >
      {images.map((src) => (
        <div
          key={src}
          style={{
            borderRadius: "12px",
            overflow: "hidden",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          }}
        >
          <Image
            src={src}
            alt="Apartma Sončni Razgled"
            width={1200}
            height={800}
            style={{
              width: "100%",
              height: "auto",
              display: "block",
            }}
          />
        </div>
      ))}
    </div>
  );
}
