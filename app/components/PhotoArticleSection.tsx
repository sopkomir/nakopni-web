import Link from "next/link";
import Image from "next/image";

import { urlForImage } from "../lib/image";

interface Props {
  post: any;
}

export default function PhotoArticleSection({ post }: Props) {
  if (!post) return null;

  const secondaryPosts = post.relatedPosts || [];

  return (
    <section className="mt-16 border-t border-zinc-200 pt-12">

      {/* HLAVNÝ FOTOČLÁNOK */}
      <Link
        href={`/fotoclanok/${post.slug.current}`}
        className="group block"
      >

        <h2
          className="
            mb-6
            flex
            items-center
            gap-4
            pl-8
            text-4xl
            font-bold
            leading-tight
            transition-colors
            group-hover:text-orange-500
          "
        >
          <span className="h-4 w-4 shrink-0 bg-orange-500" />

          {post.title}
        </h2>

        {post.image && (
          <div className="overflow-hidden rounded-2xl">

            <Image
              src={urlForImage(post.image)
                .width(1600)
                .height(900)
                .url()}
              alt={post.title}
              width={1600}
              height={900}
              className="
                w-full
                transition-transform
                duration-500
                group-hover:scale-[1.02]
              "
            />

          </div>
        )}

      </Link>

      {/* DVA MENŠIE POD TÝM */}
      {secondaryPosts.length > 0 && (

        <div className="mt-10 grid gap-8 md:grid-cols-2">

          {secondaryPosts.slice(0, 2).map((item: any) => (

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
                      .width(900)
                      .height(500)
                      .url()}
                    alt={item.title}
                    width={900}
                    height={500}
                    className="
                      w-full
                      transition-transform
                      duration-500
                      group-hover:scale-[1.03]
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