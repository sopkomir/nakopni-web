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

      {/* HLAVNÝ FOTOČLÁNOK */}

      <Link
        href={`/fotoclanok/${mainPost.slug.current}`}
        className="group block"
      >

        <div className="mb-4">

          <div
            className="
              mb-4
              text-sm
              font-semibold
              uppercase
              tracking-[0.15em]
              text-zinc-500
            "
          >
            HUMOR
          </div>

          <h2
            className="
              flex
              items-right
              gap-4
              pl-8
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
                .width(1600)
                .height(900)
                .url()}
              alt={mainPost.title}
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

      {/* DVA MENŠIE FOTOČLÁNKY */}

      {secondaryPosts.length > 0 && (

        <div className="mt-10 grid gap-8 md:grid-cols-2">

          {secondaryPosts.map((post) => (

            <Link
              key={post._id}
              href={`/fotoclanok/${post.slug.current}`}
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

                <span>{post.title}</span>
              </h3>

              {post.image && (

                <div className="overflow-hidden rounded-xl">

                  <Image
                    src={urlForImage(post.image)
                      .width(900)
                      .height(500)
                      .url()}
                    alt={post.title}
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