import VideoCard from "./VideoCard";

import { getLatestVideos } from "../lib/youtube";

export default async function Videos() {

  const videos = await getLatestVideos();

  return (
    <section className="grid md:grid-cols-1 gap-10">

      {videos.map((video: any) => (

        <VideoCard
          key={video.id.videoId}
          slug={video.id.videoId}
          title={video.snippet.title}
          youtubeId={video.id.videoId}
          views=""
          date={new Date(video.snippet.publishedAt).toLocaleDateString("sk-SK")}
        />

      ))}

    </section>
  );
}