import Link from "next/link";

type VideoCardProps = {
  slug: string;
  title: string;
  youtubeId: string;
  views: string;
  date: string;
};

export default function VideoCard({
  slug,
  title,
  youtubeId,
  views,
  date,
}: VideoCardProps) {
  return (
    <Link href={`/videa/${slug}`}>
      <article className="border-b pb-6 group cursor-pointer">

      <img
        src={`https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`}
        alt={title}
        className="mb-4 w-full aspect-video object-cover"
      />

        <h3 className="text-2xl font-black leading-snug mb-2 transition-colors group-hover:text-orange-500">
          {title}
        </h3>

        <p className="text-sm text-gray-500">
          {views} • {date}
        </p>

      </article>
    </Link>
  );
}