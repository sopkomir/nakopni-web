import CommentCard from "./CommentCard";

import { client } from "../lib/sanity";
import { articlesQuery } from "../lib/queries";

export default async function Interviews() {

  const articles = await client.fetch(articlesQuery);

  const interviews = articles.filter(
    (article: any) =>
      article.category === "rozhovor"
  );

  return (
    <section className="space-y-10">

      {interviews.map((article: any) => (

        <CommentCard
          key={article._id}
          slug={article.slug.current}
          title={article.title}
          description={article.excerpt}
          image={article.image}
          author={article.author}
          date={new Date(
            article.publishedAt
          ).toLocaleDateString("sk-SK")}
        />

      ))}

    </section>
  );
}