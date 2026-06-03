import Image from "next/image";
import ViewCounter from "../components/ViewCounter";
import { client } from "../lib/sanity";
import { articleQuery } from "../lib/queries";
import { urlFor } from "../lib/image";
import Breadcrumbs from "../components/Breadcrumbs";
import LightboxImage from "../components/LightboxImage";
import DisqusComments from "../components/DisqusComments";

import { PortableText } from "@portabletext/react";

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
  <ViewCounter articleId={article._id} />

  return (
  <>
    <ViewCounter articleId={article._id} />

    <main className="bg-white text-black">

      <div className="mx-auto max-w-7xl px-4 py-10">
        <Breadcrumbs
          category={article.category}
          title={article.title}
        />
        {/* HERO */}
        <article className="mb-16">

          <div className="grid gap-10 lg:grid-cols-[420px_minmax(0,1fr)] items-start">

            {/* LEFT IMAGE */}
            {article.image && (
              <div className="relative overflow-hidden rounded-3xl">

                <Image
                  src={urlFor(article.image)
                    .width(900)
                    .height(900)
                    .url()}
                  alt={article.title}
                  width={900}
                  height={900}
                  className="w-full h-auto object-cover rounded-3xl"
                />

              </div>
            )}

            {/* RIGHT CONTENT */}
            <div>

              <div className="flex flex-wrap items-center gap-3 mb-5">

                <span className="bg-black text-white dark:bg-white dark:text-black text-sm px-3 py-1 rounded-full capitalize">
                  {article.category}
                </span>

                {article.publishedAt && (
                  <span className="text-gray-500 text-sm">
                    {new Date(article.publishedAt).toLocaleDateString("sk-SK")}
                  </span>
                )}

                <span className="text-gray-400 text-sm">
                  •
                </span>

                <span className="text-gray-500 text-sm">
                  {article.views ?? 0} prečítaní
                </span>

              </div>

              <h1 className="text-4xl md:text-6xl font-black leading-tight tracking-tight mb-8">
                {article.title}
              </h1>

              {article.excerpt && (
                <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl">
                  {article.excerpt}
                </p>
              )}

            </div>

          </div>

        </article>

        {/* CONTENT + SIDEBAR */}
        <div className="grid gap-16 lg:grid-cols-[minmax(0,1fr)_340px]">

          {/* ARTICLE CONTENT */}
          <div>

            <div className="prose prose-lg max-w-none prose-neutral text-black">

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

            {/* COMMENTS */}
            <section className="mt-24 border-t border-zinc-200 dark:border-zinc-800 pt-12">

              <h2 className="text-3xl font-black mb-8">
                Diskusia
              </h2>

              <DisqusComments
                slug={article.slug.current}
                title={article.title}
              />

            </section>

          </div>

          {/* SIDEBAR */}
          <aside className="hidden lg:block">

            <div className="sticky top-24 space-y-8">

              <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 p-6">

                <h3 className="text-xl font-bold mb-4">
                  O článku
                </h3>

                <div className="space-y-4 text-sm text-zinc-600 dark:text-zinc-400">

                  <div>
                    <div className="font-medium text-black dark:text-white mb-1">
                      Kategória
                    </div>

                    <div className="capitalize">
                      {article.category}
                    </div>
                  </div>

                  {article.publishedAt && (
                    <div>
                      <div className="font-medium text-black dark:text-white mb-1">
                        Publikované
                      </div>

                      <div>
                        {new Date(article.publishedAt).toLocaleDateString("sk-SK")}
                      </div>
                    </div>
                  )}

                  <div>
                    <div className="font-medium text-black dark:text-white mb-1">
                      Prečítania
                    </div>

                    <div>
                      {article.views ?? 0}
                    </div>
                  </div>

                </div>

              </div>

            </div>

          </aside>

        </div>

      </div>

    </main>
  );
}