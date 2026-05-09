import Link from "next/link";

import { interviews } from "../../data/interviews";
import Sidebar from "../../components/Sidebar";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function InterviewPage({ params }: Props) {

  const { slug } = await params;

  const interview = interviews.find(
    (item) => item.slug === slug
  );

  if (!interview) {
    return (
      <main className="py-20">

        <h1 className="text-5xl font-black mb-6">
          Rozhovor neexistuje
        </h1>

        <Link
          href="/rozhovory"
          className="font-bold hover:text-orange-500"
        >
          ← Späť na rozhovory
        </Link>

      </main>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 mt-10">

      <article className="max-w-3xl">

        <Link
          href="/rozhovory"
          className="inline-block text-sm uppercase tracking-wide font-bold text-gray-500 hover:text-orange-500 mb-10"
        >
          ← Späť na rozhovory
        </Link>

        <div className="text-sm uppercase tracking-[0.25em] text-gray-500 font-bold mb-6">
          Rozhovor
        </div>

        <h1 className="text-5xl md:text-7xl font-black leading-none mb-6">
          {interview.title}
        </h1>

        <div className="text-sm text-gray-500 mb-8">
          {interview.author}
        </div>

        <img
          src={interview.image}
          alt={interview.title}
          className="w-full aspect-[16/8] object-cover mb-8"
        />

        <p className="text-2xl text-gray-700 leading-relaxed mb-10">
          {interview.excerpt}
        </p>

        <div className="prose prose-lg max-w-none prose-p:text-[22px] prose-p:leading-relaxed">

          <p>
            Slovensko potrebuje viac regionálnych tém,
            menej PR politiky a viac reálnych riešení.
          </p>

          <p>
            Rozhovory ako tento majú ukázať,
            že krajina sa nedá riadiť iba z Bratislavy.
          </p>

          <p>
            Ľudia chcú počuť konkrétne návrhy,
            nie marketingové slogany.
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