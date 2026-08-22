import type { Metadata } from "next";
import Link from "next/link";
import { getReadingTime } from "../lib/readingTime";
import Image from "next/image";
import ViewCounter from "../components/ViewCounter";
import { client } from "../lib/sanity";
import {
  articleQuery,
  pageQuery,
  relatedArticlesByAuthorQuery,
} from "../lib/queries";
import { urlFor } from "../lib/image";
import Breadcrumbs from "../components/Breadcrumbs";
import LightboxImage from "../components/LightboxImage";
import DisqusComments from "../components/DisqusComments";
import ShareButtons from "../components/ShareButtons";
import PortableContent from "../components/PortableContent";
import SupportCard from "../components/SupportCard";
export const revalidate = 300;

async function getArticle(slug: string) {
  return await client.fetch(articleQuery, { slug });
}

async function getPage(slug: string) {
  return await client.fetch(pageQuery, { slug });
}

// ← SEM vlož generateMetadata

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {

  const { slug } = await params;

  const article = await getArticle(slug);

  if (!article) {
    return {
      title: "Nakopni.sk",
    };
  }

  const image = article.image
  ? urlFor(article.image)
      .width(1200)
      .height(630)
      .fit("clip")
      .auto("format")
      .url()
  : "https://www.nakopni.sk/og-image.jpg";

  return {
    title: article.title,
    description: article.excerpt,

    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: `https://www.nakopni.sk/${article.slug.current}`,
      siteName: "Nakopni.sk",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
      locale: "sk_SK",
      type: "article",
    },

    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      images: [image],
    },
  };
}

// ↓ až potom pokračuje



export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const article = await getArticle(slug);
const page = await getPage(slug);
const readingTime = article ? getReadingTime(article.content) : 1;

const relatedArticles =
  article?.author?._id
    ? await client.fetch(relatedArticlesByAuthorQuery, {
        authorId: article.author._id,
        articleId: article._id,
      })
    : [];
  const schema = article
  ? {
      "@context": "https://schema.org",
      "@type": "NewsArticle",

      headline: article.title,

      description: article.excerpt,

      datePublished: article.publishedAt,

      dateModified: article.publishedAt,

      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `https://www.nakopni.sk/${article.slug.current}`,
      },

      image: article.image
        ? [
            urlFor(article.image)
              .width(1200)
              .height(630)
              .fit("fill")
              .bg("fff")
              .auto("format")
              .url(),
          ]
        : [],

      author: {
        "@type": "Person",
        name: article.author?.name ?? "Redakcia Nakopni.sk",
      },

      publisher: {
        "@type": "Organization",

        name: "Nakopni.sk",

        logo: {
          "@type": "ImageObject",
          url: "https://www.nakopni.sk/logo-og.png",
        },
      },
    }
  : null;

  console.log("ARTICLE:", article);
  console.log("PAGE:", page);

  if (!article && !page) {
  return <div>Stránka neexistuje.</div>;
}

if (!article && page) {
  return (
    <main className="bg-white text-black">
      <div className="mx-auto max-w-5xl px-4 py-12">

        <h1 className="mb-6 text-5xl font-bold">
          {page.title}
        </h1>

        {page.excerpt && (
          <p className="mb-10 text-xl leading-relaxed text-zinc-600">
            {page.excerpt}
          </p>
        )}

        {page.image && (
          <Image
            src={urlFor(page.image).width(1600).url()}
            alt={page.title}
            width={1600}
            height={900}
            className="mb-10 w-full rounded-3xl"
          />
        )}

        <PortableContent value={page.content} />

      </div>
    </main>
  );
}


  return (
  <>
    {schema && (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema),
        }}
      />
    )}
    <ViewCounter articleId={article._id} />

    <main className="bg-white text-black">

      <div className="mx-auto max-w-7xl px-4 py-10">
        <Breadcrumbs
          category={article.category?.title}
          categorySlug={article.category?.slug?.current}
          title={article.title}
        />
        {/* HERO */}
        <article className="mb-16">

          <div className="grid gap-8 lg:grid-cols-[520px_minmax(0,1fr)] items-start">

            {/* FOTO */}
            {article.image && (
              <div className="overflow-hidden rounded-3xl">

                <Image
                  src={urlFor(article.image)
                    .width(1200)
                    .url()}
                  alt={article.title}
                  width={1200}
                  height={900}
                  className="
                    w-full
                    h-auto
                    rounded-3xl
                  "
                />

              </div>
            )}

            {/* TEXT */}
            <div>

              <div className="flex flex-wrap items-center gap-3 mb-4">

                <span className="bg-black text-white text-sm px-3 py-1 rounded-full capitalize">
                  {article.category?.title}
                </span>

                {article.publishedAt && (
                  <span className="text-zinc-500 text-sm">
                    {new Date(article.publishedAt).toLocaleDateString("sk-SK")}
                  </span>
                )}

                <span className="text-zinc-400">•</span>

                <span className="text-zinc-500 text-sm">
                  Prečítaní: {article.views ?? 0} 
                </span>

                <span className="text-zinc-400">•</span>

                <span className="text-zinc-500 text-sm">
                  {readingTime} min čítania
                </span>

              </div>

              <h1
                className="
                  text-4xl
                  md:text-6xl
                  leading-[1.05]
                  tracking-[0.02em]
                  mb-6
                "
              >
                {article.title}
              </h1>

              {article.excerpt && (
  <p
    className="
      text-lg
      md:text-xl
      leading-relaxed
      text-zinc-700
      max-w-3xl
    "
  >
    {article.excerpt}
          </p>
        )}

        {article.author && (
          <div className="mt-8 flex items-center gap-4 border-y border-zinc-200 py-5">
            {article.author.photo && (
              <Image
                src={urlFor(article.author.photo).width(120).height(120).url()}
                alt={article.author.name}
                width={64}
                height={64}
                className="h-16 w-16 rounded-full object-cover"
              />
            )}

            <div>
              <Link
                href={`/autori/${article.author.slug.current}`}
                className="text-lg font-semibold hover:text-orange-600 transition-colors"
              >
                {article.author.name}
              </Link>

              {article.author.role && (
                <div className="text-sm text-zinc-500">
                  {article.author.role}
                </div>
              )}
            </div>
          </div>
        )}

        

              {article.audio?.asset?.url && (
                <div className="mt-8 rounded-2xl border border-zinc-200 bg-zinc-50 p-5">
                  <div className="mb-3 flex items-center gap-2 text-lg font-semibold text-orange-600">
                    🎧 Vypočujte si komentár
                  </div>

                  <audio controls className="w-full">
                    <source
                      src={article.audio.asset.url}
                      type="audio/mpeg"
                    />
                    Váš prehliadač nepodporuje prehrávanie audia.
                  </audio>
                </div>
              )}

            </div>

          </div>

        </article>

        {/* CONTENT + SIDEBAR */}
        <div className="grid gap-16 lg:grid-cols-[minmax(0,1fr)_340px]">

          {/* ARTICLE CONTENT */}
          <div>

          <PortableContent value={article.content} />

          <ShareButtons
  title={article.title}
  url={`https://www.nakopni.sk/${article.slug.current}`}
/>

{relatedArticles.length > 0 && (
  <section className="mt-16">
    <div className="mb-6">
      <h2 className="text-2xl font-bold">
        Ďalšie články od autora
      </h2>

      {article.author?.name && (
        <p className="mt-2 text-sm text-zinc-500">
          Ďalšie články autora {article.author.name}
        </p>
      )}
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {relatedArticles.slice(0, 2).map((related: any) => (
        <Link
          key={related._id}
          href={`/${related.slug.current}`}
          className="group overflow-hidden rounded-3xl border border-zinc-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
        >
          {related.image && (
            <div className="relative aspect-[16/9] overflow-hidden">
              <Image
                src={urlFor(related.image)
                  .width(800)
                  .height(450)
                  .url()}
                alt={related.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          )}

          <div className="p-6">

            {related.publishedAt && (
              <div className="mb-3 text-xs uppercase tracking-widest text-zinc-500">
                {new Date(related.publishedAt).toLocaleDateString("sk-SK")}
              </div>
            )}

            <h3 className="text-xl font-bold leading-tight transition-colors duration-300 group-hover:text-orange-500">
              {related.title}
            </h3>

            {related.excerpt && (
              <p className="mt-3 text-sm leading-relaxed text-zinc-600 line-clamp-3">
                {related.excerpt}
              </p>
            )}

            <div className="mt-5 text-sm font-semibold text-orange-500 transition-transform duration-300 group-hover:translate-x-1">
              Čítať článok →
            </div>

          </div>
        </Link>
      ))}
    </div>
  </section>
)}

<SupportCard />

            {/* COMMENTS */}
            <section className="mt-24 border-t border-zinc-200 pt-12">

              <h2 className="text-3xl font-black mb-8">
                Diskusia
              </h2>

              <DisqusComments
                slug={article.slug.current}
                title={article.title}
              />

            </section>

          </div>

          {/* SIDEBAR */}
          <aside className="hidden lg:block text-zinc-800">

            <div className="sticky top-24 space-y-8">

              <div className="rounded-3xl border border-zinc-200 p-6">

                <h3 className="text-xl font-bold mb-4">
                  O článku
                </h3>

                <div className="space-y-4 text-sm text-zinc-800">

                  <div>
                    <div className="font-medium text-black mb-1">
                      Kategória
                    </div>

                    <div className="capitalize">
                      {article.category?.title}
                    </div>
                  </div>

                  {article.publishedAt && (
                    <div>
                      <div className="font-medium text-black mb-1">
                        Publikované
                      </div>

                      <div>
                        {new Date(article.publishedAt).toLocaleDateString("sk-SK")}
                      </div>
                    </div>
                  )}

                  <div>
                    <div className="font-medium text-black mb-1">
                      Prečítania
                    </div>

                    <div>
                      {article.views ?? 0}
                    </div>
                  </div>

                </div>

              </div>

            </div>

          </aside>

        </div>

      </div>

    </main>
     </>
  );
}