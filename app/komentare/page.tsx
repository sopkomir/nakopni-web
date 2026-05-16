import Comments from "../components/Comments";
import Sidebar from "../components/Sidebar";

import { client } from "../lib/sanity";
import { articlesQuery } from "../lib/queries";

export default async function KomentarePage() {

  const articles = await client.fetch(articlesQuery);

  const comments = articles
    .filter(
      (article: any) =>
        article.category === "komentar" &&
        article.publishedAt
    )
    .sort(
      (a: any, b: any) =>
        new Date(b.publishedAt).getTime() -
        new Date(a.publishedAt).getTime()
    );

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-10 mt-10">

      <main>

        <a
          href="/"
          className="inline-block text-sm uppercase tracking-wide font-bold text-gray-500 hover:text-orange-500 mb-10"
        >
          ← Späť na homepage
        </a>

        <div className="mb-12">

          <div className="text-sm uppercase tracking-[0.3em] text-gray-500 font-bold mb-4">
            Komentáre
          </div>

          <h1 className="text-5xl md:text-7xl leading-none">
            Komentáre a analýzy
          </h1>

        </div>

        <Comments articles={comments} />

      </main>

      <aside className="block">

        <div className="sticky top-28">
          <Sidebar />
        </div>

      </aside>

    </div>
  );
}