import Link from "next/link";

import { blogs } from "../../data/blogs";
import Sidebar from "../../components/Sidebar";

export const revalidate = 300;

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function BlogPage({ params }: Props) {

  const { slug } = await params;

  const blog = blogs.find(
    (item) => item.slug === slug
  );

  if (!blog) {
    return (
      <main className="py-20">

        <h1 className="text-5xl font-black mb-6">
          Blog neexistuje
        </h1>

        <Link
          href="/blogy"
          className="font-bold hover:text-orange-500"
        >
          ← Späť na blogy
        </Link>

      </main>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 mt-10">

      <article className="max-w-3xl">

        <Link
          href="/blogy"
          className="inline-block text-sm uppercase tracking-wide font-bold text-gray-500 hover:text-orange-500 mb-10"
        >
          ← Späť na blogy
        </Link>

        <div className="text-sm uppercase tracking-[0.25em] text-gray-500 font-bold mb-6">
          Blog
        </div>

        <h1 className="text-5xl md:text-7xl font-black leading-none mb-6">
          {blog.title}
        </h1>

        <div className="text-sm text-gray-500 mb-8">
          {blog.author}
        </div>

        <img
          src={blog.image}
          alt={blog.title}
          className="w-full aspect-[16/8] object-cover mb-8"
        />

        <p className="text-2xl text-gray-700 leading-relaxed mb-10">
          {blog.excerpt}
        </p>

        <div className="prose prose-lg max-w-none prose-p:text-[22px] prose-p:leading-relaxed">

          <p>
            Blogová sekcia je osobnejšia,
            subjektívnejšia a menej newsroomovo formálna.
          </p>

          <p>
            Má byť priestorom pre názory,
            skúsenosti a autentické pohľady autorov.
          </p>

          <p>
            Dobré médiá potrebujú nielen správy,
            ale aj silné osobné hlasy.
          </p>

        </div>

      </article>

      <aside className="hidden lg:block">

        <div className="sticky top-28">
          <Sidebar />
        </div>

      </aside>

    </div>
  );
}