import { videos } from "../../data/videos";
import Link from "next/link";

export const revalidate = 300;

export default async function VideoDetailPage({
    params,
  }: {
    params: Promise<{ slug: string }>;
  }) {
    const { slug } = await params;
  const video = videos.find(
    (video) => video.slug === slug
  );

  if (!video) {
    return (
      <div>
        
      </div>
    );
  }

  return (
    <main className="mt-10 max-w-4xl">

      <Link
        href="/videa"
        className="inline-block text-sm uppercase tracking-wide font-bold text-gray-500 hover:text-orange-500 mb-10"
      >
        ← Späť na videá
      </Link>

      <div className="mb-10">

        <div className="text-sm uppercase tracking-[0.3em] text-gray-500 font-bold mb-4">
          Video rozhovor
        </div>

        <h1 className="text-5xl md:text-7xl font-black leading-none mb-6">
          {video.title}
        </h1>

        <div className="text-sm text-gray-500">
          {video.views} • {video.date}
        </div>

      </div>

      <div className="aspect-video mb-10">
       <iframe
            className="w-full h-full rounded-2xl"
            src={`https://www.youtube.com/embed/${video.youtubeId}`}
            title={video.title}
            allowFullScreen
        />
       </div>
       <p className="text-xl leading-8 text-gray-700">
        {video.description}
       </p>

      <p className="text-xl text-gray-700 leading-relaxed">
        Tu bude neskôr embednuté YouTube video a popis rozhovoru.
      </p>

    </main>
  );
}