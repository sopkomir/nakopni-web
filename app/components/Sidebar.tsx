import VideoCard from "./VideoCard";

import { getLatestVideos } from "../lib/youtube";

export default async function Sidebar() {

  const videos =
    await getLatestVideos() || [];

  const validVideos = (videos || [])
    .filter(
      (video: any) =>
        video?.id?.videoId &&
        video?.snippet?.title &&
        video?.snippet?.publishedAt
    )
    .slice(0, 5);

  return (
    <aside className="sticky top-10">

      <div className="uppercase text-xs tracking-widest text-gray-500 font-bold mb-6">
        Zemplínsky dialóg
      </div>

      <div className="space-y-6">

        {validVideos.map((video: any) => (

          <VideoCard
            key={video.id.videoId}
            slug={video.id.videoId}
            title={video.snippet.title}
            youtubeId={video.id.videoId}
            views={`${Number(
              video.views || 0
            ).toLocaleString("sk-SK")} zhliadnutí`}
            date={
              video?.snippet?.publishedAt
                ? new Date(
                    video.snippet.publishedAt
                  ).toLocaleDateString("sk-SK")
                : ""
            }
          />

        ))}

      </div>

    </aside>
  );
}