export const revalidate = 300;

import Comments from "../components/Comments";
import Sidebar from "../components/Sidebar";

import { client } from "../lib/sanity";
import { reportazeQuery } from "../lib/queries";

export default async function ReportazePage() {

  const reportaze = await client.fetch(reportazeQuery);

  return (
    <div className="mt-10 flex flex-col gap-10 xl:flex-row">

      <main className="flex-1">

        <a
          href="/"
          className="mb-10 inline-block text-sm font-bold uppercase tracking-wide text-gray-500 hover:text-orange-500"
        >
          ← Späť na hlavnú stránku
        </a>

        <div className="mb-12">

          <div className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-gray-500">
            Reportáže
          </div>

          <h1 className="text-5xl leading-none md:text-7xl">
            Reportáže z rôznych kútov Slovenska a sveta
          </h1>

        </div>

        <Comments articles={reportaze} />

      </main>

      <aside className="w-full xl:w-[360px]">

        <div className="sticky top-28">
          <Sidebar />
        </div>

      </aside>

    </div>
  );
}