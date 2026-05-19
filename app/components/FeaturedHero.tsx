import Link from 'next/link'
import Image from 'next/image'

import { urlForImage } from '../lib/image'

interface Props {
  post: any
}

export default function FeaturedHero({ post }: Props) {
  if (!post) return null

  return (
    <Link
      href={`/${post.slug.current}`}
      className="group mb-12 block overflow-hidden rounded-3xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900"
    >
      <div className="grid gap-0 lg:grid-cols-2">
        {/* LEFT */}
        <div className="flex flex-col justify-center p-8 md:p-12">
          <div className="mb-4">
            <span className="rounded-full bg-zinc-100 px-4 py-1 text-sm dark:bg-zinc-800">
              Featured
            </span>
          </div>

          <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-5xl">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="mt-6 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
              {post.excerpt}
            </p>
          )}

          <div className="mt-8 inline-flex items-center text-sm font-medium">
            Čítať článok
            <span className="ml-2 transition-transform group-hover:translate-x-1">
              →
            </span>
          </div>
        </div>

        {/* RIGHT */}
        <div className="relative min-h-[320px]">
          {post.image && (
            <Image
              src={urlForImage(post.image)
                .width(1400)
                .height(900)
                .url()}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          )}
        </div>
      </div>
    </Link>
  )
}