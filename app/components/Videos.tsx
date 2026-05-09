const videos = [
    {
      title: "Peter Báthory a diaľnica na Zemplín",
      image:
        "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1200&auto=format&fit=crop",
      views: "774 zhliadnutí",
      time: "pred 2 týždňami",
    },
  
    {
      title: "Kedy bude Šírava fabrika na peniaze?",
      image:
        "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1200&auto=format&fit=crop",
      views: "911 zhliadnutí",
      time: "pred 1 mesiacom",
    },
  
    {
      title: "Ako vyčistiť našu krajinu?",
      image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
      views: "793 zhliadnutí",
      time: "pred 3 týždňami",
    },
  ];
  
  export default function Videos() {
    return (
      <section>
  
        <div className="text-sm uppercase tracking-[0.25em] text-gray-500 font-bold mb-6">
          Video rozhovory
        </div>
  
        <div className="flex flex-col gap-8">
  
          {videos.map((video) => (
            <article
              key={video.title}
              className="border-b border-gray-200 pb-8"
            >
  
              <img
                src={video.image}
                alt={video.title}
                className="w-full aspect-video object-cover mb-4"
              />
  
              <h3 className="text-[30px] font-extrabold leading-tight mb-2 hover:text-orange-500 transition-colors cursor-pointer">
                {video.title}
              </h3>
  
              <div className="text-sm text-gray-500">
                {video.views} • {video.time}
              </div>
  
            </article>
          ))}
  
        </div>
  
      </section>
    );
  }