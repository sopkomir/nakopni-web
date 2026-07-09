import Link from "next/link";
import Image from "next/image";

import { client } from "../lib/sanity";
import { authorsQuery } from "../lib/queries";
import { urlFor } from "../lib/image";

export const revalidate = 300;

export default async function AuthorsPage() {

  const authors = await client.fetch(authorsQuery);

  return (
    <main className="mx-auto max-w-6xl px-4 py-12">

      <div className="mb-12">

        <div className="text-sm uppercase tracking-[0.3em] text-gray-500 font-bold mb-4">
          Redakcia
        </div>

        <h1 className="text-5xl md:text-7xl leading-none">
          Autori
        </h1>

      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

        {authors.map((author: any) => (

          <Link
            key={author._id}
            href={`/autori/${author.slug.current}`}
            className="group rounded-2xl border border-zinc-200 p-6 hover:border-orange-500 transition-colors"
          >

            {author.photo && (

              <Image
                src={urlFor(author.photo).width(400).height(400).url()}
                alt={author.name}
                width={400}
                height={400}
                className="mb-5 aspect-square rounded-full object-cover"
              />

            )}

            <h2 className="text-2xl font-bold group-hover:text-orange-500">
              {author.name}
            </h2>

            {author.role && (

              <p className="mt-2 text-zinc-600">
                {author.role}
              </p>

            )}

          </Link>

        ))}

      </div>

    </main>
  );
}