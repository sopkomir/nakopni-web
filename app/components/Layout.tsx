export const revalidate = 60;
import Hero from "./Hero";
import Sidebar from "./Sidebar";
import Comments from "./Comments";
import MiniArticles from "./MiniArticles";

import { client } from "../lib/sanity";

import {
  featuredQuery,
  commentsQuery,
  blogsQuery,
} from "../lib/queries";

export default async function Layout() {

  const featured = await client.fetch(featuredQuery);

  const comments = await client.fetch(commentsQuery);

  const blogs = await client.fetch(blogsQuery);

  return (
    <section className="grid grid-cols-1 xl:grid-cols-[1.7fr_0.8fr] gap-6 mt-10">

      <div className="space-y-16">

        <section id="rozhovory">
          <Hero article={featured} />
        </section>

        <section id="komentare">
          <Comments articles={comments.slice(0, 3)} />
        </section>

        <section id="blogy">
          <MiniArticles articles={blogs} />
        </section>

      </div>
      {/* 
      <aside id="videa">
        <Sidebar />
      </aside>
        */}
    </section>
  );
}