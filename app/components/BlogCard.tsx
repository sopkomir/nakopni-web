import Link from "next/link";

type BlogCardProps = {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  author: string;
};

export default function BlogCard({
  slug,
  title,
  excerpt,
  image,
  author,
}: BlogCardProps) {
  return (
    <Link href={`/blogs/${slug}`}>

      <article className="group border-b border-gray-200 pb-8 hover:opacity-80 transition-opacity">

        <img
          src={image}
          alt={title}
          className="w-full aspect-[16/9] object-cover mb-5"
        />

        <div className="text-sm uppercase tracking-widest text-gray-500 font-bold mb-3">
          {author}
        </div>

        <h2 className="text-3xl md:text-5xl font-black leading-tight mb-4 group-hover:text-orange-500 transition-colors">
          {title}
        </h2>

        <p className="text-lg text-gray-600 leading-relaxed">
          {excerpt}
        </p>

      </article>

    </Link>
  );
}