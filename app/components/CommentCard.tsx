import Link from "next/link";
import Image from "next/image";
import { urlFor } from "../lib/image";
type CommentCardProps = {
  title: string;
  description: string;
  image: any;
  slug: string;
  author: string;
  date: string;
};

export default function CommentCard({
  title,
  description,
  image,
  slug,
  author,
  date,
}: CommentCardProps) {
  return (
    <Link href={`/${slug}`}>

<article className="group grid grid-cols-[110px_1fr] md:grid-cols-[160px_1fr] gap-4 md:gap-6 border-b border-gray-200 pb-8 transition-opacity hover:opacity-90">

        <Image
          src={urlFor(image).url()}
          alt={title}
          width={160}
          height={160}
          className="
            w-[110px]
            h-[110px]
            md:w-[160px]
            md:h-[160px]
            object-cover
            flex-shrink-0
            animate-imageReveal
          "
        />

        <div>

          <h3 className="text-2xl md:text-4xl font-black leading-tight mb-2 transition-colors group-hover:text-orange-500">
            {title}
          </h3>

          <div className="text-sm text-gray-500 mb-2">
          {author} • {date}
          </div>

          <p className="text-base md:text-xl text-gray-600 leading-relaxed">
            {description}
          </p>

        </div>

      </article>

    </Link>
  );
}