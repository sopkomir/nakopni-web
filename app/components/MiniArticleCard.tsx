import Link from "next/link";
type MiniArticleCardProps = {
    title: string;
    category: string;
    slug: string;
  };
  
  export default function MiniArticleCard({
    title,
    category,
    slug,
  }: MiniArticleCardProps) {
    return (
      <Link href={`/blogy/${slug}`}>
      <article className="border-b border-gray-200 pb-4 group cursor-pointer">
  
        <div className="text-[11px] uppercase tracking-widest text-gray-500 font-bold mb-2">
          {category}
        </div>
  
        <h3 className="text-2xl font-black leading-tight hover:text-orange-500 transition-colors cursor-pointer">
          {title}
        </h3>
  
      </article>
      </Link>
    );
  }