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

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">

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