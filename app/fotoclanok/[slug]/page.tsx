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
  params: { slug: string };
}) {
  const post = await client.fetch(query, {
    slug: params.slug,
  });

  if (!post) return null;

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">

      <h1 className="mb-8 flex items-center gap-4 text-5xl font-black">

        <span className="h-4 w-4 bg-orange-500 shrink-0" />

        {post.title}

      </h1>

      {post.image && (
        <Image
          src={urlForImage(post.image)
            .width(2000)
            .height(1200)
            .url()}
          alt={post.title}
          width={2000}
          height={1200}
          className="w-full rounded-2xl"
        />
      )}

    </main>
  );
}