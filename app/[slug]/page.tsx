import Image from "next/image";

import { client } from "../lib/sanity";
import { articleQuery } from "../lib/queries";
import { urlFor } from "../lib/image";
import LightboxImage from "../components/LightboxImage";
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
    <article className="max-w-5xl mx-auto px-4 py-10 bg-white text-black">

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

      <div className="prose prose-lg max-w-none prose-neutral">

        <PortableText
          value={article.content}

          components={{

            types: {

              image: ({ value }) => (
              <LightboxImage
              src={urlFor(value).width(1200).url()}
              alt=""
              />
              ),

              gallery: ({ value }) => (

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-10">

                  {value.images?.map(
                    (image: any, index: number) => (

                      <Image
                        key={index}
                        src={urlFor(image).width(800).url()}
                        alt=""
                        width={800}
                        height={600}
                        className="rounded-2xl object-cover"
                      />

                    )
                  )}

                </div>

              ),

              youtube: ({ value }) => {

                const videoId =
                  value.url.split("v=")[1];

                return (

                  <div className="my-10">

                    <iframe
                      width="100%"
                      height="500"
                      src={`https://www.youtube.com/embed/${videoId}`}
                      allowFullScreen
                      className="rounded-2xl"
                    />

                  </div>

                );
              },

            },

          }}
        />

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