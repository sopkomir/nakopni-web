import Link from "next/link";

type MiniArticleCardProps = {
  title: string;
  category: string;
  slug: string;
  author: string;
  publishedAt: string;
};

export default function MiniArticleCard({
  title,
  category,
  slug,
  author,
  publishedAt,
}: MiniArticleCardProps) {

  return (

    <Link href={`/${slug}`}>

      <article className="border-b border-gray-200 pb-4 group cursor-pointer">

        <div className="text-[11px] uppercase tracking-widest text-gray-500 font-bold mb-2">
          {category}
        </div>

        <h3 className="text-2xl font-black leading-tight hover:text-orange-500 transition-colors cursor-pointer mb-3">
          {title}
        </h3>

        <div className="text-sm text-gray-500">

          {author}

          <span className="mx-2">•</span>

          {new Date(publishedAt).toLocaleDateString("sk-SK")}

        </div>

      </article>

    </Link>
  );
}