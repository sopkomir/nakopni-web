import VideoCard from "./VideoCard";

import { getLatestVideos } from "../lib/youtube";

export default async function Videos() {

  const videos = await getLatestVideos();

  if (!videos || videos.length === 0) {
    return (
      <div className="text-gray-500">
        Žiadne videá.
      </div>
    );
  }

  return (
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
  );
}