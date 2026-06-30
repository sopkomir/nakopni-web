import Link from "next/link";
import Image from "next/image";
import AudioPlayer from "./AudioPlayer";

import { urlForImage } from "../lib/image";

interface ArticleCardProps {
  post: {
    _id: string;
    title: string;
    slug: {
      current: string;
    };
    excerpt?: string;
    publishedAt?: string;
    image?: any;
    category?: string;
    views?: number;
    audio?: {
      asset?: {
        url: string;
      };
    };
  };
}

export default function ArticleCard({
  post,
}: ArticleCardProps) {
  return (
    <article className="border-b border-zinc-200 pb-8">

      <div className="flex flex-col gap-4 md:flex-row md:gap-5">

        {/* IMAGE */}
        {post.image && (
          <Link
            href={`/${post.slug.current}`}
            className="
              block
              w-full
              overflow-hidden
              rounded-xl
              bg-zinc-100
              md:w-[160px]
              md:shrink-0
            "
          >
            <Image
              src={urlForImage(post.image)
                .width(1200)
                .fit("max")
                .url()}
              alt={post.title}
              width={1200}
              height={1200}
              className="
                w-full
                h-auto
                transition-transform
                duration-500
                hover:scale-105
              "
            />
          </Link>
        )}

        {/* CONTENT */}
        <div className="min-w-0 flex-1">

          {/* META */}
          <div className="mb-3 flex flex-wrap items-center gap-3 text-sm text-zinc-500">

            <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs">
              Komentár
            </span>

            {post.publishedAt && (
              <time>
                {new Date(post.publishedAt).toLocaleDateString("sk-SK", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </time>
            )}

            <span>•</span>

            <span>
              {post.views ?? 0} prečítaní
            </span>

          </div>

          {/* TITLE */}
          <Link
            href={`/${post.slug.current}`}
            className="group"
          >
            <div className="flex items-start gap-3">

              <span className="mt-2 h-3 w-3 shrink-0 bg-orange-500" />

              <h2
                className="
                  text-2xl
                  font-bold
                  leading-tight
                  tracking-tight
                  text-black
                  transition-colors
                  duration-200
                  group-hover:text-orange-500
                "
              >
                {post.title}
              </h2>

            </div>
          </Link>

          {/* EXCERPT */}
          {post.excerpt && (
            <p
              className="
                mt-3
                line-clamp-3
                text-base
                leading-7
                text-zinc-700
              "
            >
              {post.excerpt}
            </p>
          )}

          {/* AUDIO */}
          <AudioPlayer url={post.audio?.asset?.url} />

        </div>

      </div>

    </article>
  );
}