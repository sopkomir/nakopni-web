import VideoCard from "../components/VideoCard";

import { getLatestVideos } from "../lib/youtube";

export default async function VideaPage() {

  const videos = await getLatestVideos();

  return (
    <main className="mt-10">

      <a
        href="/"
        className="inline-block text-sm uppercase tracking-wide font-bold text-gray-500 hover:text-orange-500 mb-10"
      >
        ← Späť na homepage
      </a>

      <div className="mb-12">

        <div className="text-sm uppercase tracking-[0.3em] text-gray-500 font-bold mb-4">
          Videá
        </div>

        <h1 className="text-5xl md:text-7xl font-black leading-none">
          Video rozhovory
        </h1>

      </div>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-10">

        {videos.slice(0, 10).map((video: any) => (

          <VideoCard
            key={video.id.videoId}
            slug={video.id.videoId}
            title={video.snippet.title}
            youtubeId={video.id.videoId}
            views={`${Number(video.views).toLocaleString("sk-SK")} zhliadnutí`}
            date={new Date(
              video.snippet.publishedAt
            ).toLocaleDateString("sk-SK")}
          />

        ))}

      </section>

    </main>
  );
}