import Link from "next/link";
import { interviews } from "../data/interviews";

export default function Interviews() {
  return (
    <section className="space-y-10">

      {interviews.map((item) => (

        <Link
          key={item.slug}
          href={`/rozhovory/${item.slug}`}
        >

          <article className="grid grid-cols-[140px_1fr] gap-6 border-b border-gray-200 pb-8 hover:opacity-80 transition-opacity">

            <img
              src={item.image}
              alt={item.title}
              className="w-[140px] h-[140px] object-cover"
            />

            <div>

              <h2 className="text-3xl font-black leading-tight mb-3">
                {item.title}
              </h2>

              <div className="text-sm text-gray-500 mb-3">
                {item.author}
              </div>

              <p className="text-lg text-gray-600 leading-relaxed">
                {item.excerpt}
              </p>

            </div>

          </article>

        </Link>

      ))}

    </section>
  );
}