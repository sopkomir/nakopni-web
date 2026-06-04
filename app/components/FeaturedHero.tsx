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
      className="group mb-10 block"
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_340px]">

        {/* LEFT */}

        <div>

          <div className="mb-4">
            <span className="rounded-full bg-zinc-100 px-4 py-1 text-sm text-black">
              Všimnite si
            </span>
          </div>

          <div className="flex items-start gap-4">

            <span className="mt-3 h-4 w-4 shrink-0 bg-orange-500" />

            <h1 className="text-5xl font-bold leading-tight tracking-tight text-black">
              {post.title}
            </h1>

          </div>

          <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-zinc-500">

            {post.author && (
              <span className="font-medium text-zinc-700">
                {post.author}
              </span>
            )}

            {post.author && post.publishedAt && (
              <span>•</span>
            )}

            {post.publishedAt && (
              <span>
                {new Date(post.publishedAt).toLocaleDateString('sk-SK', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </span>
            )}

          </div>

          {post.excerpt && (
            <p className="mt-6 max-w-3xl text-xl leading-relaxed text-zinc-700">
              {post.excerpt}
            </p>
          )}

          <div className="mt-6 inline-flex items-center text-sm font-medium text-black">

            Čítať článok

            <span className="ml-2 transition-transform group-hover:translate-x-1">
              →
            </span>

          </div>

        </div>

        {/* FOTO */}

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
              rounded-lg
              object-cover
            "
          />

        )}

      </div>
    </Link>
  )
}