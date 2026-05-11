import VideoCard from "./VideoCard";

import { getLatestVideos } from "../lib/youtube";

export default async function Sidebar() {

  const videos = await getLatestVideos();

  return (
    <aside className="sticky top-10">

      <div className="uppercase text-xs tracking-widest text-gray-500 font-bold mb-6">
        Video rozhovory
      </div>

      <div className="space-y-6">

        {videos.slice(0, 5).map((video: any) => (

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

      </div>

    </aside>
  );
}