
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "../lib/image";

type Props = {
  article: any;
};

export default function Hero({ article }: Props) {

  if (!article) return null;

  return (
    <article className="pt-2 group cursor-pointer">

      <div className="grid md:grid-cols-2 gap-8 items-stretch">

        <div className="flex flex-col">

          <div className="uppercase text-xs tracking-widest text-gray-500 font-bold mb-4">
            {article.category?.title}
          </div>

          <h2 className="text-4xl lg:text-5xl leading-[0.95] leading-tight mb-6 group-hover:text-orange-500 transition-colors">

            {article.slug?.current ? (

              <Link href={`/${article.slug.current}`}>
                {article.title}
              </Link>

            ) : (

              <span>{article.title}</span>

            )}

          </h2>

          <p className="text-xl text-gray-600 leading-relaxed">
            {article.excerpt}
          </p>

        </div>

        {article.image && (

          <Image
            src={urlFor(article.image).url()}
            alt={article.title}
            width={1200}
            height={800}
            priority
            className="
              w-full
              h-full
              object-cover
              min-h-[420px]
              animate-imageReveal
            "
          />

        )}

      </div>

    </article>
  );
}