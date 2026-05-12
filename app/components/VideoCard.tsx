import Link from "next/link";
import Image from "next/image";
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
    <Link
      href={`https://www.youtube.com/watch?v=${youtubeId}`}
      target="_blank"
    >
      <article className="
        border-b
        pb-6
        group
        cursor-pointer
        transition-transform
        hover:-translate-y-[2px]
      ">

      <Image
        src={`https://i.ytimg.com/vi/${youtubeId}/maxresdefault.jpg`}
        alt={title}
        width={640}
        height={360}
        loading="lazy"
        className="
          mb-4
          w-full
          aspect-video
          object-cover
          animate-imageReveal
        "
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