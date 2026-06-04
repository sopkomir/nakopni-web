import Link from 'next/link'
import Image from 'next/image'

import { urlForImage } from '../lib/image'

interface Props {
  post: any
}

export default function FeaturedHero({ post }: Props) {
  if (!post) return null

  const shortExcerpt =
    post.excerpt?.length > 120
      ? post.excerpt.slice(0, 120) + '...'
      : post.excerpt

  return (
    <Link
      href={`/${post.slug.current}`}
      className="group mb-8 block"
    >
      <div
        className="
          grid
          items-start
          gap-3
          lg:grid-cols-[1fr_360px]
        "
      >

        {/* TEXT */}
        <div>

          <div className="flex items-start gap-4">

            <span className="mt-3 h-4 w-4 shrink-0 bg-orange-500" />

            <h1
              className="
                text-4xl
                font-bold
                leading-tight
                text-black
                lg:text-5xl
              "
            >
              {post.title}
            </h1>

          </div>

          {shortExcerpt && (
            <p
              className="
                mt-3
                max-w-xl
                text-base
                leading-7
                text-zinc-700
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