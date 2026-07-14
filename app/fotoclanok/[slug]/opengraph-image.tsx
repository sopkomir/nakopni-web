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
      .width(1000)
      .url()
  : null;

    console.log(imageUrl);

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          background: "#ffffff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        {/* Logo */}
        <img
          src="https://www.nakopni.sk/logo-og.png"
          alt=""
          style={{
            position: "absolute",
            top: 25,
            left: 25,
            width: 210,
          }}
        />

        {imageUrl && (
          <img
            src={imageUrl}
            alt=""
            style={{
              maxWidth: "1080px",
              maxHeight: "540px",
              width: "auto",
              height: "auto",
              objectFit: "contain",
              border: "1px solid #e5e5e5",
            }}
          />
        )}
      </div>
    ),
    size
  );
}