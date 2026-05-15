import CommentCard from "./CommentCard";

type Props = {
  articles: any[];
};

export default function Interviews({
  articles,
}: Props) {

  return (
    <section className="space-y-10">

      {articles.map((article: any) => (

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