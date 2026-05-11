import MiniArticles from "../components/MiniArticles";
import Sidebar from "../components/Sidebar";

import { client } from "../lib/sanity";
import { articlesQuery } from "../lib/queries";

export default async function BlogyPage() {

  const articles = await client.fetch(articlesQuery);

  const blogs = articles.filter(
    (article: any) =>
      article.category === "blog"
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10 mt-10">

      <main>

        <a
          href="/"
          className="inline-block text-sm uppercase tracking-wide font-bold text-gray-500 hover:text-orange-500 mb-10"
        >
          ← Späť na homepage
        </a>

        <div className="mb-12">

          <div className="text-sm uppercase tracking-[0.3em] text-gray-500 font-bold mb-4">
            Blogy
          </div>

          <h1 className="text-5xl md:text-7xl font-black leading-none">
            Názory, eseje a osobné pohľady
          </h1>

        </div>

        <MiniArticles articles={blogs} />

      </main>

      <aside className="hidden lg:block">

        <div className="sticky top-28">
          <Sidebar />
        </div>

      </aside>

    </div>
  );
}