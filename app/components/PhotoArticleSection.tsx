import Link from "next/link";
import Image from "next/image";

import { urlForImage } from "../lib/image";

interface Props {
  posts: any[];
}

export default function PhotoArticleSection({ posts }: Props) {
  if (!posts?.length) return null;

  const mainPost = posts[0];
  const secondaryPosts = posts.slice(1, 3);

  return (
    <section className="mt-16 border-t border-zinc-200 pt-12">

      {/* NADPIS SEKCIE */}
      <div className="mb-5 text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500">
        Humor
      </div>

      {/* HLAVNÝ FOTOČLÁNOK */}
      <Link
        href={`/fotoclanok/${mainPost.slug.current}`}
        className="group block"
      >
        <div className="mb-6 flex justify-end">

          <h2
            className="
              flex
              items-center
              gap-4
              text-4xl
              font-bold
              leading-tight
              transition-colors
              duration-200
              group-hover:text-orange-500
            "
          >
            <span className="h-4 w-4 shrink-0 bg-orange-500" />

            {mainPost.title}
          </h2>

        </div>

        {mainPost.image && (

          <div className="overflow-hidden rounded-2xl">

            <Image
              src={urlForImage(mainPost.image)
                .width(2200)
                .fit("max")
                .url()}
              alt={mainPost.title}
              width={2200}
              height={2200}
              className="
                block
                w-full
                h-auto
                transition-transform
                duration-500
                group-hover:scale-[1.01]
              "
            />

          </div>

        )}

      </Link>

      {/* DVA MENŠIE FOTOČLÁNKY */}
      {secondaryPosts.length > 0 && (

        <div className="mt-10 grid gap-10 md:grid-cols-2">

          {secondaryPosts.map((item: any) => (

            <Link
              key={item._id}
              href={`/fotoclanok/${item.slug.current}`}
              className="group block"
            >

              <h3
                className="
                  mb-4
                  flex
                  items-start
                  gap-3
                  text-2xl
                  font-bold
                  leading-tight
                  transition-colors
                  duration-200
                  group-hover:text-orange-500
                "
              >
                <span className="mt-2 h-3 w-3 shrink-0 bg-orange-500" />

                <span>{item.title}</span>

              </h3>

              {item.image && (

                <div className="overflow-hidden rounded-xl">

                  <Image
                    src={urlForImage(item.image)
                      .width(1400)
                      .fit("max")
                      .url()}
                    alt={item.title}
                    width={1400}
                    height={1400}
                    className="
                      block
                      w-full
                      h-auto
                      transition-transform
                      duration-500
                      group-hover:scale-[1.02]
                    "
                  />

                </div>

              )}

            </Link>

          ))}

        </div>

      )}

    </section>
  );
}