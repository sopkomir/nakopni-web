import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export async function renderOgImage({
  title,
  image,
}: {
  title: string;
  image: string;
}) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          position: "relative",
          display: "flex",
          background: "#000",
        }}
      >
        <img
          src={image}
          alt=""
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(0,0,0,0) 20%, rgba(0,0,0,.82) 100%)",
          }}
        />

        <div
          style={{
            position: "absolute",
            left: 50,
            right: 50,
            bottom: 40,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              color: "#fff",
              fontSize: 58,
              fontWeight: 800,
              lineHeight: 1.08,
              maxWidth: 1000,
            }}
          >
            {title}
          </div>

          <div
            style={{
              marginTop: 26,
              display: "flex",
              alignItems: "center",
              gap: 18,
            }}
          >
            <img
              src="/logo_nakopni.svg"
              width={42}
              height={42}
              alt=""
            />

            <div
              style={{
                color: "#ffffff",
                fontSize: 28,
                fontWeight: 700,
              }}
            >
              nakopni.sk
            </div>
          </div>
        </div>
      </div>
    ),
    size
  );
}