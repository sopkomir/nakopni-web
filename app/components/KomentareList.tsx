import Link from "next/link";

interface Props {
  posts: any[];
}

export default function KomentareList({ posts }: Props) {
  if (!posts?.length) return null;

  return (
    <section className="my-12">

      <div className="grid gap-x-16 gap-y-5 md:grid-cols-2">

        {posts.map((post, index) => (

          <Link
            key={post._id}
            href={`/${post.slug.current}`}
            className="group"
          >

            <div className="flex gap-3">

              <span className="text-zinc-500">
                {index + 1}.
              </span>

              <h3
                className="
                  text-xl
                  font-semibold
                  leading-snug
                  transition-colors
                  group-hover:text-orange-500
                "
              >
                {post.author?.name
                  ? `${post.author.name}: ${post.title}`
                  : post.title}
              </h3>

            </div>

          </Link>

        ))}

      </div>

    </section>
  );
}