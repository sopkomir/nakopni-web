import Link from "next/link";
import Image from "next/image";

import { urlForImage } from "../lib/image";

interface Props {
  posts: any[];
}

export default function PhotoArticleSection({
  posts,
}: Props) {
  if (!posts?.length) return null;

  const featured = posts[0];
  const secondary = posts.slice(1, 3);

  return (
    <section className="mt-16 border-t border-zinc-200 pt-12">

      <h2 className="mb-8 text-sm font-semibold uppercase tracking-[0.25em] text-zinc-500">
        Humor
      </h2>

      {/* HLAVNÝ ČLÁNOK */}

      <Link
        href={`/fotoclanok/${featured.slug.current}`}
        className="group block"
      >

        <h3 className="mb-6 flex items-center gap-3 text-3xl font-bold leading-tight transition-colors group-hover:text-orange-500">

          <span className="h-4 w-4 shrink-0 bg-orange-500" />

          {featured.title}

        </h3>

        {featured.image && (
          <div className="overflow-hidden rounded-2xl">

            <Image
              src={urlForImage(featured.image)
                .width(1600)
                .height(900)
                .url()}
              alt={featured.title}
              width={1600}
              height={900}
              className="w-full transition-transform duration-500 group-hover:scale-[1.02]"
            />

          </div>
        )}

      </Link>

      {/* DVA MENŠIE */}

      <div className="mt-10 grid gap-8 md:grid-cols-2">

        {secondary.map((post) => (

          <Link
            key={post._id}
            href={`/fotoclanok/${post.slug.current}`}
            className="group block"
          >

            {post.image && (
              <div className="mb-4 overflow-hidden rounded-xl">

                <Image
                  src={urlForImage(post.image)
                    .width(800)
                    .height(450)
                    .url()}
                  alt={post.title}
                  width={800}
                  height={450}
                  className="w-full transition-transform duration-500 group-hover:scale-[1.03]"
                />

              </div>
            )}

            <h4 className="flex items-start gap-3 text-xl font-bold leading-tight transition-colors group-hover:text-orange-500">

              <span className="mt-2 h-3 w-3 shrink-0 bg-orange-500" />

              <span>{post.title}</span>

            </h4>

          </Link>

        ))}

      </div>

    </section>
  );
}