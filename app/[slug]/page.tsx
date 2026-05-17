import Image from "next/image";

import { client } from "../lib/sanity";
import { articleQuery } from "../lib/queries";
import { urlFor } from "../lib/image";

import { PortableText } from "@portabletext/react";

import DisqusComments from "../components/DisqusComments";

async function getArticle(slug: string) {
  return await client.fetch(articleQuery, { slug });
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {

  const { slug } = await params;

  const article = await getArticle(slug);

  if (!article) {
    return <div>Článok neexistuje.</div>;
  }

  return (
    <article className="max-w-5xl mx-auto px-4 py-10">

      <div className="flex flex-col md:flex-row gap-8 items-start mb-12">

        {article.image && (
          <Image
            src={urlFor(article.image).width(600).height(600).url()}
            alt={article.title}
            width={600}
            height={600}
            className="w-64 h-64 object-cover rounded-2xl flex-shrink-0"
          />
        )}

        <div className="flex-1">

          <div className="flex items-center gap-3 mb-5">

            <span className="bg-black text-white text-sm px-3 py-1 rounded-full capitalize">
              {article.category}
            </span>

            {article.publishedAt && (
              <span className="text-gray-500 text-sm">
                {new Date(article.publishedAt).toLocaleDateString("sk-SK")}
              </span>
            )}

          </div>

          <h1 className="text-5xl font-black leading-tight mb-6">
            {article.title}
          </h1>

          {article.excerpt && (
            <p className="text-xl text-gray-600 leading-relaxed mb-6">
              {article.excerpt}
            </p>
          )}

          <div className="text-gray-500 text-sm">
            1 284 prečítaní
          </div>

        </div>

      </div>

      <div className="prose prose-lg max-w-none">
        <PortableText value={article.content} />
      </div>

      <section className="mt-20">

        <h2 className="text-3xl font-black mb-8">
          Diskusia
        </h2>

        <DisqusComments
          slug={article.slug.current}
          title={article.title}
        />

      </section>

    </article>
  );
}