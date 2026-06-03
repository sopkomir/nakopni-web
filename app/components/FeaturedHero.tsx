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

      <div className="grid gap-0 lg:grid-cols-[2fr_1fr]">

        {/* LEFT */}
        <div className="flex flex-col justify-center p-8 md:p-12">

          <div className="mb-4">

            <span className="rounded-full bg-zinc-100 px-4 py-1 text-sm text-black">
              Všimnite si
            </span>

          </div>

          <div className="flex items-start gap-4">

            <span className="mt-4 h-4 w-4 flex-shrink-0 bg-orange-500" />

            <h1 className="text-4xl font-bold leading-tight tracking-tight text-black">
              {post.title}
            </h1>

          </div>

          {(post.author || post.publishedAt) && (
            <div className="mt-4 text-sm text-zinc-500">

              {post.author}

              {post.author && post.publishedAt && ' • '}

              {post.publishedAt &&
                new Date(post.publishedAt).toLocaleDateString('sk-SK', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}

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

        {/* RIGHT */}
        <div className="relative min-h-[260px] lg:min-h-[320px]">

          {post.image && (

            <Image
              src={urlForImage(post.image)
                .width(1200)
                .height(800)
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

          )}

        </div>

      </div>

    </Link>
  )
}