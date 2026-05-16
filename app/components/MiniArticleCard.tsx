import Link from "next/link";

export default function MiniArticles({
  articles,
}: any) {

  return (

    <div className="space-y-10">

      {articles.map((article: any) => {

        if (!article?.slug?.current) {
          return null;
        }

        return (

          <Link
            key={article._id}
            href={`/${article.slug.current}`}
            className="
              block
              border-b
              pb-8
              hover:opacity-80
              transition
            "
          >

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
              text-2xl
              md:text-3xl
              leading-tight
              mb-3
            ">
              {article.title}
            </h2>

            <div className="
              text-sm
              text-gray-500
              mb-3
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
              leading-relaxed
            ">
              {article.excerpt}
            </p>

          </Link>

        );
      })}

    </div>
  );
}