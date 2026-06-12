import VideoCard from "./VideoCard";

import { getLatestVideos } from "../lib/youtube";

export default async function Sidebar() {

  const videos =
    await getLatestVideos();

  const latestVideos =
    Array.isArray(videos)
      ? videos.slice(0, 5)
      : [];

  return (
    <aside className="sticky top-10">

      

      <div className="space-y-6">

        {latestVideos.map((video: any) => (

          <VideoCard
            key={video.id.videoId}
            slug={video.id.videoId}
            title={video.snippet.title}
            youtubeId={video.id.videoId}
            views={`${Number(
              video.views || 0
            ).toLocaleString("sk-SK")} zhliadnutí`}
            date={
              video.snippet.publishedAt
                ? new Date(
                    video.snippet.publishedAt
                  ).toLocaleDateString("sk-SK")
                : ""
            }
          />

        ))}

      </div>
      {/* PARTNER */}
      <div className="mt-10">

        <img
          src="/boka-kniha.webp"
          alt="Kniha"
          className="block w-full h-auto rounded-2xl"
        />

      </div>

    </aside>
  );
}