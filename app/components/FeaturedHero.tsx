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
      className="
        group
        mb-12
        block
        overflow-hidden
        rounded-3xl
        border
        border-zinc-200
        bg-white
      "
    >
      <div className="p-8 md:p-12">

        <div className="mb-4">
          <span className="rounded-full bg-zinc-100 px-4 py-1 text-sm text-black">
            Všimnite si
          </span>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">

          <div className="flex min-w-0 items-start gap-4">

            <span className="mt-3 h-4 w-4 shrink-0 bg-orange-500" />

            <h1 className="text-4xl font-bold leading-tight tracking-tight text-black md:text-5xl">
              {post.title}
            </h1>

          </div>

          {post.image && (
            <Image
              src={urlForImage(post.image)
                .width(700)
                .height(400)
                .url()}
              alt={post.title}
              width={700}
              height={400}
              className="
                w-full
                max-w-[340px]
                rounded-xl
                object-cover
                shrink-0
              "
            />
          )}

        </div>

        {post.author && (
          <p className="mt-8 text-sm font-medium text-zinc-700">
            {post.author}
          </p>
        )}

        {post.publishedAt && (
          <p className="mt-1 text-sm text-zinc-500">
            {new Date(post.publishedAt).toLocaleDateString('sk-SK', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </p>
        )}

        {post.excerpt && (
          <p className="mt-8 max-w-4xl text-xl leading-relaxed text-zinc-700">
            {post.excerpt}
          </p>
        )}

        <div className="mt-8 inline-flex items-center text-sm font-medium text-black">
          Čítať článok

          <span className="ml-2 transition-transform group-hover:translate-x-1">
            →
          </span>
        </div>

      </div>
    </Link>
  )
}