import VideoCard from "./VideoCard";
import { videos } from "../data/videos";
export default function Sidebar() {
    return (
      <aside>
  
        <div className="uppercase text-xs tracking-widest text-gray-500 font-bold mb-6">
          Video rozhovory
        </div>
  
        <div className="space-y-6">

        {videos.map((video) => (
        <VideoCard
        key={video.title}
        title={video.title}
        youtubeId={video.youtubeId}
        views={video.views}
        slug={video.slug}
        date={video.date}
        />
        ))}

        </div>
  
      </aside>
    );
  }