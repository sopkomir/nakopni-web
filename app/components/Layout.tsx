import Hero from "./Hero";
import Sidebar from "./Sidebar";
import Comments from "./Comments";
import MiniArticles from "./MiniArticles";

export default function Layout() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-[1.7fr_0.8fr] gap-6 mt-10">

      <div className="space-y-16">

        <section id="rozhovory">
          <Hero />
        </section>

        <section id="komentare">
          <Comments />
        </section>

        <section id="blogy">
          <MiniArticles />
        </section>

      </div>

      <aside id="videa">
        <Sidebar />
      </aside>

    </section>
  );
}