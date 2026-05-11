import Link from "next/link";
import { urlFor } from "../../lib/image";
import { client } from "../../lib/sanity";
import { PortableText } from '@portabletext/react';
import { articles } from "../../data/articles";
import Videos from "../../components/Videos";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ArticlePage({ params }: Props) {

  const { slug } = await params;
  const query = `*[_type == "article" && slug.current == $slug][0] { title, image, excerpt, content }`;
  const article = await client.fetch(query, { slug });

  if (!article) {
    return (
      <div className="py-20">
        <h1 className="text-5xl font-black mb-6">
          Článok neexistuje
        </h1>

        <Link
          href="/"
          className="font-bold hover:text-orange-500"
        >
          ← Späť na homepage
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_300px] gap-12 xl:gap-14 mt-10">

      <article className="max-w-[1220px]">

        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-gray-500 hover:text-orange-500 transition-colors mb-10"
        >
          ← Späť na homepage
        </Link>

        <div className="text-sm uppercase tracking-[0.25em] text-gray-500 font-bold mb-6">
          {article.category}
        </div>

        <h1 className="text-5xl md:text-7xl font-black leading-none mb-8">
          {article.title}
        </h1>

        <img
        src={urlFor(article.image).url()}
        alt={article.title}
        className="w-full max-h-[520px] object-cover mb-8"
        />

        <p className="text-2xl text-gray-700 leading-relaxed mb-10">
          {article.excerpt}
        </p>

        <div
          className="
            max-w-none
            text-[20px]
            leading-[1.95]
            text-gray-900
            font-light
            space-y-8
          "
        >
          <PortableText value={article.content} />
        </div>

      </article>

      <aside className="hidden lg:block">

        <div className="sticky top-28">
          <Videos />
        </div>

      </aside>

    </div>
  );
}