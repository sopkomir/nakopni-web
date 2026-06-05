import Link from 'next/link'
import Image from 'next/image'

import { urlForImage } from '../lib/image'

interface Props {
  post: any
}

export default function FeaturedHero({ post }: Props) {
  if (!post) return null

  const shortExcerpt =
    post.excerpt?.length > 90
      ? post.excerpt.slice(0, 90) + '...'
      : post.excerpt

  return (
    <Link
      href={`/${post.slug.current}`}
      className="group mb-6 block"
    >
      <div
        className="
          grid
          items-start
          gap-2
          lg:grid-cols-[480px_360px]
        "
      >

        {/* TEXT */}
        <div className="max-w-[480px]">

          <div className="flex items-start gap-3">

            <span className="mt-2 h-4 w-4 shrink-0 bg-orange-500" />

            <h1
              className="
                text-2xl
                lg:text-3xl
                font-bold
                leading-tight
                text-black
                transition-colors
                duration-200
                group-hover:text-orange-500
              "
            >
              {post.title}
            </h1>

          </div>

          {shortExcerpt && (
            <p
              className="
                mt-3
                text-base
                leading-7
                text-zinc-700
                transition-colors
                duration-200
                group-hover:text-orange-500
              "
            >
              {shortExcerpt}
            </p>
          )}

        </div>

        {/* FOTO */}
        {post.image && (
          <div className="w-full">

            <Image
              src={urlForImage(post.image)
                .width(720)
                .height(405)
                .url()}
              alt={post.title}
              width={720}
              height={405}
              className="
                w-full
                rounded-lg
                object-cover
              "
            />

          </div>
        )}

      </div>
    </Link>
  )
}