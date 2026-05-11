import Link from "next/link";
import { urlFor } from "../lib/image";
import { client } from "../lib/sanity";
import { articlesQuery } from "../lib/queries";

export default async function Hero() {
  const articles = await client.fetch(articlesQuery);

  const featured = articles[0];

  if (!featured) return null;

  return (
    <article className="pt-2 group cursor-pointer">
      <div className="grid md:grid-cols-2 gap-8 items-stretch">

        <div className="flex flex-col">

          <div className="uppercase text-xs tracking-widest text-gray-500 font-bold mb-4">
            {featured.category}
          </div>

          <h2 className="text-4xl lg:text-5xl leading-[0.95] font-black leading-tight mb-6 group-hover:text-orange-500 transition-colors">
            <Link href={`/articles/${featured.slug.current}`}>
              {featured.title}
            </Link>
          </h2>

          <p className="text-xl text-gray-600 leading-relaxed">
            {featured.excerpt}
          </p>

        </div>

        {featured.image && (
          <img
            src={urlFor(featured.image).url()}
            alt={featured.title}
            className="w-full h-full object-cover min-h-[420px]"
          />
        )}

      </div>
    </article>
  );
}