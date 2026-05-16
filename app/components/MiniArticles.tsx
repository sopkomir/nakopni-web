import Link from "next/link";

import { urlFor } from "../lib/image";

type Props = {
  articles?: any[];
};

export default function MiniArticles({
  articles = [],
}: Props) {

  return (

    <section className="mt-16">

      <div className="grid md:grid-cols-2 gap-x-10 gap-y-10">

        {articles
          .filter(
            (article) =>
              article?.slug?.current
          )
          .map((article: any) => (

            <Link
              key={article._id}
              href={`/${article.slug.current}`}
              className="
                flex
                gap-4
                border-b
                pb-6
                hover:opacity-80
                transition
              "
            >

              {article?.image && (

                <img
                  src={urlFor(article.image).url()}
                  alt={article.title}
                  className="
                    w-28
                    h-28
                    object-cover
                    flex-shrink-0
                  "
                />

              )}

              <div className="flex-1">

                <div className="
                  text-xs
                  uppercase
                  tracking-widest
                  text-gray-500
                  font-bold
                  mb-2
                ">
                  Blog
                </div>

                <h2 className="
                  text-xl
                  leading-tight
                  mb-2
                ">
                  {article.title}
                </h2>

                <div className="
                  text-sm
                  text-gray-500
                  mb-2
                ">
                  {article.author} •{" "}
                  {article.publishedAt
                    ? new Date(
                        article.publishedAt
                      ).toLocaleDateString("sk-SK")
                    : ""}
                </div>

                <p className="
                  text-gray-700
                  text-sm
                  leading-relaxed
                ">
                  {article.excerpt}
                </p>

              </div>

            </Link>

          ))}

      </div>

    </section>
  );
}