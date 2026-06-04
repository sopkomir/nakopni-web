import Link from 'next/link'
import Image from 'next/image'

import { urlForImage } from '../lib/image'

interface Props {
  post: any
}

export default function FeaturedHero({ post }: Props) {
  if (!post) return null

  const shortExcerpt =
    post.excerpt?.length > 220
      ? post.excerpt.slice(0, 220) + '...'
      : post.excerpt

  return (
    <Link
      href={`/${post.slug.current}`}
      className="group mb-10 block"
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_340px]">

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
                mt-6
                max-w-2xl
                text-base
                leading-8
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
                .width(700)
                .height(400)
                .url()}
              alt={post.title}
              width={700}
              height={400}
              className="
                w-full
                rounded-xl
                object-cover
              "
            />

          </div>

        )}

      </div>
    </Link>
  )
}