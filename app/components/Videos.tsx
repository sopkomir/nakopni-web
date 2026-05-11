import VideoCard from "./VideoCard";

import { getLatestVideos } from "../lib/youtube";

type Props = {
  limit?: number;
};

export default async function Videos({
  limit,
}: Props) {

  const videos = await getLatestVideos();

  const displayedVideos = limit
    ? videos.slice(0, limit)
    : videos;

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-10">

      {displayedVideos.map((video: any) => (

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