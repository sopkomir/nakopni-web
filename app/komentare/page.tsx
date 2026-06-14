export const dynamic = "force-dynamic";
export const revalidate = 0;
import Comments from "../components/Comments";
import Sidebar from "../components/Sidebar";
import { client } from "../lib/sanity";
import { commentsQuery } from "../lib/queries";

export default async function KomentarePage() {

  const comments = await client.fetch(commentsQuery);

  return (
    <div className="flex flex-col xl:flex-row gap-10 mt-10">

      <main className="flex-1">

        <a
          href="/"
          className="inline-block text-sm uppercase tracking-wide font-bold text-gray-500 hover:text-orange-500 mb-10"
        >
          ← Späť na hlavnú stránku
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
     
      <aside className="w-full xl:w-[360px]">

        <div className="sticky top-28">
          <Sidebar />
        </div>

      </aside>
    
    </div>
  );
}