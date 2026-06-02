import Link from "next/link";
import Image from "next/image";

import { urlForImage } from "../lib/image";

interface Props {
  post: any;
}

export default function PhotoArticleSection({ post }: Props) {
  if (!post) return null;

  return (
    <section className="mt-16 border-t border-zinc-200 pt-12">

      <Link
        href={`/fotoclanok/${post.slug.current}`}
        className="group block"
      >

        {post.image && (
          <div className="relative mb-8 overflow-hidden rounded-2xl">
            <Image
              src={urlForImage(post.image)
                .width(1600)
                .url()}
              alt={post.title}
              width={1600}
              height={900}
              className="w-full transition-transform duration-500 group-hover:scale-[1.02]"
            />
          </div>
        )}

        <h2 className="flex items-center gap-4 text-4xl font-black leading-tight">

          <span className="h-4 w-4 bg-orange-500 shrink-0" />

          {post.title}

        </h2>

      </Link>

    </section>
  );
}