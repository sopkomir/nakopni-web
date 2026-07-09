import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";

import { client } from "../../lib/sanity";
import { authorQuery } from "../../lib/queries";
import { urlFor } from "../../lib/image";

export const revalidate = 300;

export default async function AuthorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {

  const { slug } = await params;

  const author = await client.fetch(authorQuery, { slug });

  if (!author) {
    return <div>Autor neexistuje.</div>;
  }

  return (

    <main className="mx-auto max-w-6xl px-4 py-12">

      <Link
        href="/autori"
        className="mb-10 inline-block text-sm uppercase font-bold text-zinc-500 hover:text-orange-500"
      >
        ← Späť na autorov
      </Link>

      <div className="mb-16 grid gap-10 lg:grid-cols-[260px_1fr]">

        {author.photo && (

          <Image
            src={urlFor(author.photo).width(600).height(600).url()}
            alt={author.name}
            width={600}
            height={600}
            className="aspect-square rounded-full object-cover"
          />

        )}

        <div>

          <h1 className="text-5xl font-black">
            {author.name}
          </h1>

          {author.role && (

            <p className="mt-4 text-xl text-zinc-500">
              {author.role}
            </p>

          )}

          {author.bio && (

            <div className="prose mt-8 max-w-none">

              <PortableText value={author.bio} />

            </div>

          )}

        </div>

      </div>

      <hr className="mb-12" />

      <h2 className="mb-8 text-3xl font-black">

        Články autora

      </h2>

      <div className="space-y-8">

        {author.articles?.map((article: any) => (

          <Link
            key={article._id}
            href={`/${article.slug.current}`}
            className="block border-b border-zinc-200 pb-8 hover:text-orange-500"
          >

            <h3 className="text-2xl font-bold">

              {article.title}

            </h3>

            {article.excerpt && (

              <p className="mt-3 text-zinc-600">

                {article.excerpt}

              </p>

            )}

          </Link>

        ))}

      </div>

    </main>

  );
}