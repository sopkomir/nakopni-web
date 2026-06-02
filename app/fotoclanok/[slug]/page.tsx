import { client } from "@/app/lib/sanity";
import { groq } from "next-sanity";
import Image from "next/image";

import { urlForImage } from "@/app/lib/image";

const query = groq`
*[
  _type == "fotoclanok" &&
  slug.current == $slug
][0]{
  _id,
  title,
  image,
  publishedAt
}
`;

export default async function PhotoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = await client.fetch(query, {
    slug,
  });

  if (!post) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-10">
        Fotočlánok nebol nájdený.
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">

      <h1 className="mb-8 flex items-center gap-4 text-5xl font-black">

        <span className="h-4 w-4 shrink-0 bg-orange-500" />

        {post.title}

      </h1>

      {post.image && (
        <Image
          src={urlForImage(post.image)
            .width(2000)
            .url()}
          alt={post.title}
          width={2000}
          height={1333}
          className="h-auto w-full rounded-2xl"
        />
      )}

    </main>
  );
}