import Hero from "./Hero";
import Sidebar from "./Sidebar";
import Comments from "./Comments";
import MiniArticles from "./MiniArticles";

import { client } from "../lib/sanity";
import { articlesQuery } from "../lib/queries";

export default async function Layout() {

  const articles = await client.fetch(articlesQuery);

  const featured = articles.find(
    (article: any) => article.featured
  );

  const comments = articles
  .filter(
    (article: any) =>
      article.category === "komentar" &&
      !article.featured &&
      article.publishedAt
  )
  .sort(
    (a: any, b: any) =>
      new Date(b.publishedAt).getTime() -
      new Date(a.publishedAt).getTime()
  )
  .slice(0, 3);
  
  const blogs = articles
  .filter(
    (article: any) =>
      article.category === "blog" &&
      !article.featured &&
      article.publishedAt
  );
  return (
    <section className="grid grid-cols-1 lg:grid-cols-[1.7fr_0.8fr] gap-6 mt-10">

      <div className="space-y-16">

        <section id="rozhovory">
          <Hero article={featured} />
        </section>

        <section id="komentare">
          <Comments articles={comments} />
        </section>

        <section id="blogy">
          <MiniArticles articles={blogs} />
        </section>

      </div>

      <aside id="videa">
        <Sidebar />
      </aside>

    </section>
  );
}