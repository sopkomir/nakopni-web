import ShareButtons from "@/app/components/ShareButtons";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { groq } from "next-sanity";

import { client } from "@/app/lib/sanity";
import { urlForImage } from "@/app/lib/image";

const query = groq`

{
  "post": *[
    _type == "fotoclanok" &&
    slug.current == $slug
  ][0]{
    _id,
    title,
    slug,
    image,
    publishedAt
  },

  "allPosts": *[
    _type == "fotoclanok"
  ] | order(publishedAt desc){
    _id,
    title,
    slug,
    image,
    publishedAt
  },

  "related": *[
    _type == "fotoclanok" &&
    slug.current != $slug
  ]
  | order(publishedAt desc)[0...4]{
    _id,
    title,
    slug,
    image,
    publishedAt
  }
}
`;
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {

  const { slug } = await params;

  const post = await client.fetch(
    groq`
      *[
        _type == "fotoclanok" &&
        slug.current == $slug
      ][0]{
        title,
        slug,
        image
      }
    `,
    { slug }
  );

  if (!post) {
    return {
      title: "Fotočlánok | Nakopni.sk",
    };
  }

  const image = post.image
    ? urlForImage(post.image)
        .width(1200)
        .height(630)
        .url()
    : "https://www.nakopni.sk/og-image.jpg";

  return {
    title: post.title,

    openGraph: {
      title: post.title,
      url: `https://www.nakopni.sk/fotoclanok/${post.slug.current}`,
      siteName: "Nakopni.sk",
      type: "article",

      images: [
        {
          url: image,
          width: 1200,
          height: 630,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: post.title,
      images: [image],
    },
  };
}

export default async function PhotoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const data = await client.fetch(query, {
    slug,
  });

  const post = data.post;

  if (!post) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-10">
        Fotočlánok nebol nájdený.
      </main>
    );
  }

  const currentIndex = data.allPosts.findIndex(
    (item: any) => item.slug.current === slug
  );

  const previousPost =
    currentIndex < data.allPosts.length - 1
      ? data.allPosts[currentIndex + 1]
      : null;

  const nextPost =
    currentIndex > 0
      ? data.allPosts[currentIndex - 1]
      : null;

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <Link
        href="/"
        className="
          inline-block
          mb-10
          text-sm
          font-bold
          uppercase
          tracking-wide
          text-gray-500
          transition-colors
          hover:text-orange-500
        "
      >
        ← Späť na hlavnú stránku
      </Link>
      {/* HLAVNÝ FOTOČLÁNOK */}

      <h1 className="mb-8 flex items-center gap-4 text-5xl font-bold">

        <span className="h-4 w-4 shrink-0 bg-orange-500" />

        {post.title}

      </h1>

      {post.image && (
        <Image
          src={urlForImage(post.image)
            .width(2400)
            .fit("max")
            .url()}
          alt={post.title}
          width={2400}
          height={2400}
          className="w-full h-auto rounded-2xl"
          priority
        />
      )}

      {/* PREDCHÁDZAJÚCI / ĎALŠÍ */}

      {(previousPost || nextPost) && (

        <section className="mt-12 border-t border-zinc-200 pt-8">

          <div className="grid gap-6 md:grid-cols-2">

            <div>
              {previousPost && (
                <Link
                  href={`/fotoclanok/${previousPost.slug.current}`}
                  className="group block"
                >

                  <div className="mb-2 text-sm uppercase tracking-wider text-zinc-500">
                    ← Predchádzajúci
                  </div>

                  <div className="text-xl font-bold transition-colors group-hover:text-orange-500">
                    {previousPost.title}
                  </div>

                </Link>
              )}
            </div>

            <div className="text-left md:text-right">
              {nextPost && (
                <Link
                  href={`/fotoclanok/${nextPost.slug.current}`}
                  className="group block"
                >

                  <div className="mb-2 text-sm uppercase tracking-wider text-zinc-500">
                    Ďalší →
                  </div>

                  <div className="text-xl font-bold transition-colors group-hover:text-orange-500">
                    {nextPost.title}
                  </div>

                </Link>
              )}
            </div>

          </div>

        </section>

      )}

      {/* ĎALŠIE FOTOČLÁNKY */}

      {data.related?.length > 0 && (

        <section className="mt-20 border-t border-zinc-200 pt-12">

          <div className="mb-8 text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500">
            Ďalšie fotočlánky
          </div>

          <div className="grid gap-10 md:grid-cols-2">

            {data.related.map((item: any) => (

              <Link
                key={item._id}
                href={`/fotoclanok/${item.slug.current}`}
                className="group block"
              >

                <h3
                  className="
                    mb-4
                    flex
                    items-start
                    gap-3
                    text-2xl
                    font-bold
                    leading-tight
                    transition-colors
                    duration-200
                    group-hover:text-orange-500
                  "
                >

                  <span className="mt-2 h-3 w-3 shrink-0 bg-orange-500" />

                  <span>{item.title}</span>

                </h3>

                {item.image && (
                  <Image
                    src={urlForImage(item.image)
                      .width(1400)
                      .fit("max")
                      .url()}
                    alt={item.title}
                    width={1400}
                    height={1400}
                    className="w-full h-auto rounded-xl"
                  />
                )}

              </Link>

            ))}

          </div>

        </section>

      )}

    </main>
  );
}