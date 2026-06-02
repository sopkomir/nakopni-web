import Link from "next/link";
import Image from "next/image";

import { urlFor } from "../lib/image";

interface Props {
  posts: any[];
}

export default function ReportazeGrid({ posts }: Props) {
  return (

    <section className="mb-16">

      <div className="mb-8 flex items-center justify-between">

        <h2 className="text-3xl font-black">
          Najnovšie reportáže
        </h2>

        <Link
          href="/reportaze"
          className="text-sm font-bold uppercase tracking-wide text-orange-500 hover:opacity-70"
        >
          Všetky reportáže →
        </Link>

      </div>

      <div className="grid gap-8 md:grid-cols-3">

        {posts.map((post) => (

          <Link
            key={post._id}
            href={`/${post.slug.current}`}
            className="group"
          >

            <article>

              {/* IMAGE */}
              <div className="relative mb-5 aspect-[16/9] overflow-hidden rounded-2xl">

                {post.image && (

                  <Image
                    src={urlFor(post.image).width(1200).url()}
                    alt={post.title}
                    fill
                    className="
                      object-cover
                      transition-transform
                      duration-500
                      group-hover:scale-105
                    "
                  />

                )}

              </div>

              {/* TITLE */}
              <div className="mb-3 flex items-start gap-3">

                <span className="mt-2 h-3 w-3 flex-shrink-0 bg-orange-500" />

                <h3
                  className="
                    text-2xl
                    font-black
                    leading-tight
                    transition-colors
                    group-hover:text-orange-500
                  "
                >
                  {post.title}
                </h3>

              </div>

              {/* EXCERPT */}
              {post.excerpt && (

                <p className="line-clamp-3 text-gray-600">
                  {post.excerpt}
                </p>

              )}

            </article>

          </Link>

        ))}

      </div>

    </section>

  );
}