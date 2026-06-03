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

      {/* IMAGE */}
      {post.image && (

        <div className="relative aspect-[16/9] overflow-hidden">

          <Image
            src={urlForImage(post.image)
              .width(1600)
              .height(900)
              .url()}
            alt={post.title}
            fill
            className="
              object-cover
              transition-transform
              duration-700
              group-hover:scale-105
            "
          />

        </div>

      )}

      {/* CONTENT */}
      <div className="p-8 md:p-10">

        <div className="mb-4">

          <span className="rounded-full bg-zinc-100 px-4 py-1 text-sm text-black">
            Všimnite si
          </span>

        </div>

        <div className="flex items-start gap-4">

          <span className="mt-4 h-4 w-4 shrink-0 bg-orange-500" />

          <h1 className="text-4xl font-black leading-tight text-black md:text-5xl">
            {post.title}
          </h1>

        </div>

        {/* AUTHOR */}
        {post.author && (

          <div className="mt-4 text-sm font-medium text-zinc-500">
            Autor: {post.author}
          </div>

        )}

        {post.excerpt && (

          <p className="mt-6 text-lg leading-relaxed text-zinc-600">
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