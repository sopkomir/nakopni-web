import Link from 'next/link'
import Image from 'next/image'

import { urlForImage } from '../lib/image'

interface Props {
  post: any
}

export default function FeaturedHero({ post }: Props) {
  if (!post) return null

  const shortExcerpt =
    post.excerpt?.length > 200
      ? post.excerpt.slice(0, 230) + '...'
      : post.excerpt

  return (
    <Link
      href={`/${post.slug.current}`}
      className="group mb-8 block"
    >
      <div
        className="
          flex
          flex-col
          gap-4

          md:flex-row
          md:items-start
          md:gap-4

          lg:gap-2
        "
      >

        {/* TEXT */}
        <div className="flex-1 min-w-0">

          <div className="flex items-start gap-3">

            <span className="mt-2 h-4 w-4 shrink-0 bg-orange-500" />

            <div>

              <h1
                className="
                  max-w-[500px]
                  text-xl
                  font-bold
                  leading-tight
                  text-black
                  transition-colors
                  duration-200
                  group-hover:text-orange-500
                  sm:text-2xl
                  lg:text-3xl
                "
              >
                {post.title}
              </h1>

              {shortExcerpt && (
                <p
                  className="
                    mt-4
                    max-w-[520px]
                    text-base
                    leading-8
                    text-zinc-700
                  "
                >
                  {shortExcerpt}
                </p>
              )}

            </div>

          </div>

        </div>

        {/* FOTO */}
        {post.image && (
          <div
            className="
              w-full

              md:w-[280px]
              md:flex-shrink-0

              lg:w-[360px]
            "
          >
            <Image
              src={urlForImage(post.image)
                .width(720)
                .height(405)
                .url()}
              alt={post.title}
              width={720}
              height={405}
              className="
                aspect-video
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