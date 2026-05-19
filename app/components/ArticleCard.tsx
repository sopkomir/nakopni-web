import Link from "next/link";
import Image from "next/image";

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
  };
}

export default function ArticleCard({
  post,
}: ArticleCardProps) {

  return (
    <Link
      href={`/${post.slug.current}`}
      className="group block border-b border-zinc-200 pb-10 transition-colors dark:border-zinc-800"
    >

      <article className="flex gap-6">

        {/* IMAGE */}
        {post.image && (

          <div className="relative h-[160px] w-[160px] flex-shrink-0 overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-800 md:h-[180px] md:w-[180px]">

            <Image
              src={urlForImage(post.image)
                .width(600)
                .height(600)
                .url()}
              alt={post.title}
              fill
              className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
            />

          </div>

        )}

        {/* CONTENT */}
        <div className="min-w-0 flex-1">

          {/* META */}
          <div className="mb-4 flex flex-wrap items-center gap-3 text-sm text-zinc-500 dark:text-zinc-400">

            {post.category && (
              <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs dark:bg-zinc-800">
                {post.category}
              </span>
            )}

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
          <h2 className="text-3xl font-bold leading-tight tracking-tight transition-colors group-hover:text-zinc-600 dark:group-hover:text-zinc-300">

            {post.title}

          </h2>

          {/* EXCERPT */}
          {post.excerpt && (
            <p className="mt-4 line-clamp-2 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">

              {post.excerpt}

            </p>
          )}

          {/* CTA */}
          <div className="mt-6 inline-flex items-center text-sm font-medium">

            Čítať článok

            <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>

          </div>

        </div>

      </article>

    </Link>
  );
}