import { videos } from "../data/videos";
import VideoCard from "./VideoCard";

export default function Videos() {
  return (
    <section className="grid md:grid-cols-2 gap-10">

      {videos.map((video) => (

        <VideoCard
          key={video.slug}
          slug={video.slug}
          title={video.title}
          youtubeId={video.youtubeId}
          views={video.views}
          date={video.date}
        />

      ))}

    </section>
  );
}