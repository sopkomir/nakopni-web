import Image from "next/image";
import Link from "next/link";
import FacebookComments from "../components/FacebookComments";
import { urlFor } from "../lib/image";
import { client } from "../lib/sanity";
import { PortableText } from '@portabletext/react';
import Sidebar from "../components/Sidebar";
type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ArticlePage({ params }: Props) {

  const { slug } = await params;
  const query = `*[_type == "article" && slug.current == $slug][0] {
    title,
    image,
    excerpt,
    content,
    author,
    publishedAt
  }`;
  const article = await client.fetch(query, { slug });

  if (!article) {
    return (
      <div className="py-20">
        <h1 className="text-5xl font-black mb-6">
          Článok neexistuje
        </h1>

        <Link
          href="/"
          className="font-bold hover:text-orange-500"
        >
          ← Späť na homepage
        </Link>
      </div>
    );
  }

  const plainText =
  article.content
    ?.map((block: any) =>
      block.children
        ?.map((child: any) => child.text)
        .join("")
    )
    .join(" ") || "";

  const words = plainText.trim().split(/\s+/).length;

  const readingTime = Math.ceil(words / 200);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_300px] gap-12 xl:gap-14 mt-10">

      <article className="max-w-[1220px]">

        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-gray-500 hover:text-orange-500 transition-colors mb-10"
        >
          ← Späť na homepage
        </Link>

        <div className="text-sm uppercase tracking-[0.25em] text-gray-500 font-bold mb-6">
          {article.category}
        </div>

        <h1 className="text-5xl md:text-7xl font-black leading-none mb-8">
          {article.title}
        </h1>

        <Image
          src={urlFor(article.image).url()}
          alt={article.title}
          width={1400}
          height={800}
          priority
          className="w-full max-h-[520px] object-cover mb-8"
        />

        <p className="text-2xl text-gray-700 leading-relaxed mb-10">
          {article.excerpt}
        </p>

        <div className="flex items-center gap-3 text-sm text-gray-500 mb-10">

          {article.author && (
            <>
              <span>{article.author}</span>
              <span>•</span>
            </>
          )}

          {article.publishedAt && (
            <>
              <span>
                {new Date(article.publishedAt).toLocaleDateString("sk-SK")}
              </span>

              <span>•</span>
            </>
          )}

          <span>{readingTime} min čítania</span>

        </div>

        <div
          className="
            max-w-none
            text-[21px]
            leading-[2]
            text-gray-900
            font-normal
            space-y-8
            tracking-[0.01em]
          "
        >
          <PortableText
            value={article.content}
            components={{
              block: {
                h2: ({ children }: any) => (
                  <h2 className="text-4xl font-black mt-16 mb-6">
                    {children}
                  </h2>
                ),

                h3: ({ children }: any) => (
                  <h3 className="text-3xl font-bold mt-12 mb-5">
                    {children}
                  </h3>
                ),
            },
              marks: {
                link: ({ children, value }: any) => (
                  <a
                    href={value.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      text-orange-500
                      underline
                      underline-offset-4
                      hover:text-orange-600
                      transition-colors
                    "
                  >
                    {children}
                  </a>
                ),
              },
            }}
          />
        </div>
        <section className="mt-20">

          <h2 className="text-3xl font-black mb-8">
            Diskusia
          </h2>

          <FacebookComments
            url={`https://nakopni.sk/${slug}`}
          />

        </section>

      </article>

      <aside className="hidden lg:block">

        <div className="sticky top-28">
          <Sidebar />
        </div>

      </aside>

    </div>
  );
}