import { ImageResponse } from "next/og";
import { groq } from "next-sanity";
import { client } from "@/app/lib/sanity";
import { urlForImage } from "@/app/lib/image";

export const runtime = "nodejs";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = await client.fetch(
    groq`
      *[
        _type == "fotoclanok" &&
        slug.current == $slug
      ][0]{
        title,
        image
      }
    `,
    { slug }
  );

  const imageUrl = post?.image
    ? urlForImage(post.image)
        .width(1200)
        .height(630)
        .fit("crop")
        .url()
    : null;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          display: "flex",
          overflow: "hidden",
          background: "#FFF",
        }}
      >
        {imageUrl && (
        <div
            style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "#ffffff",
            padding: 40,
            }}
        >
            <img
            src={imageUrl}
            alt=""
            style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
            }}
            />
        </div>
        )}
        

        {/* Logo */}
        <img
          src="https://www.nakopni.sk/logo-og.png"
          alt=""
          style={{
            position: "absolute",
            top: 40,
            left: 40,
            width: 260,
          }}
        />

        {/* Označenie */}
        <div
          style={{
            position: "absolute",
            top: 42,
            right: 40,
            background: "#000",
            color: "#fff",
            padding: "12px 24px",
            borderRadius: 999,
            fontSize: 28,
            fontWeight: 700,
          }}
        >
          FOTOČLÁNOK
        </div>

        {/* Titulok */}
        <div
          style={{
            position: "absolute",
            left: 50,
            bottom: 95,
            right: 50,
            color: "white",
            fontSize: 58,
            fontWeight: 800,
            lineHeight: 1.1,
          }}
        >
          {post.title}
        </div>

        {/* slogan */}
        <div
          style={{
            position: "absolute",
            left: 50,
            bottom: 40,
            color: "#ff7a00",
            fontSize: 28,
            fontWeight: 600,
          }}
        >
          Hľadáme riešenia ako nakopnúť Slovensko
        </div>
      </div>
    ),
    size
  );
}