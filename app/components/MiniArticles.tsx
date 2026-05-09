import MiniArticleCard from "./MiniArticleCard";
import { miniArticles } from "../data/miniArticles";

export default function MiniArticles() {
  return (
    <section className="mt-16">

      <div className="grid md:grid-cols-2 gap-x-10 gap-y-8">

        {miniArticles.map((article) => (
          <MiniArticleCard
            key={article.title}
            title={article.title}
            category={article.category}
            slug={article.slug}
          />
        ))}

      </div>

    </section>
  );
}