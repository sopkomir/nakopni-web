import MiniArticleCard from "./MiniArticleCard";

type Props = {
  articles: any[];
};

export default function MiniArticles({ articles }: Props) {

  return (
    <section className="mt-16">

      <div className="grid md:grid-cols-2 gap-x-10 gap-y-8">

        {articles.map((article) => (

          <MiniArticleCard
          key={article._id}
          title={article.title}
          category={article.category}
          slug={article.slug.current}
          author={article.author}
          publishedAt={article.publishedAt}
          />

        ))}

      </div>

    </section>
  );
}