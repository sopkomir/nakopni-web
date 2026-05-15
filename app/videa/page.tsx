import Link from "next/link";
import Pagination from "../components/Pagination";
import VideoCard from "../components/VideoCard";
import { getLatestVideos } from "../lib/youtube";

type Props = {
  searchParams: Promise<{
    page?: string;
  }>;
};

export default async function VideaPage({
  searchParams,
}: Props) {

  const params = await searchParams;

  const currentPage =
    Number(params.page) || 1;

  const videosPerPage = 12;

  const videos =
    await getLatestVideos() || [];

  if (videos.length === 0) {
    return (
      <main className="mt-10">

        <h1 className="text-4xl font-black">
          Videá sa nepodarilo načítať
        </h1>

      </main>
    );
  }

  const totalPages = Math.ceil(
    videos.length / videosPerPage
  );

  const start =
    (currentPage - 1) * videosPerPage;

  const paginatedVideos =
    videos.slice(
      start,
      start + videosPerPage
    );

  return (
    <main className="mt-10">

      <a
        href="/"
        className="
          inline-block
          text-sm
          uppercase
          tracking-wide
          font-bold
          text-gray-500
          hover:text-orange-500
          mb-10
        "
      >
        ← Späť na homepage
      </a>

      <div className="mb-12">

        <div
          className="
            text-sm
            uppercase
            tracking-[0.3em]
            text-gray-500
            font-bold
            mb-4
          "
        >
          Zemplínsky dialóg
        </div>

        <h1 className="text-5xl md:text-7xl font-black leading-none">
          Rozhovory a diskusie
        </h1>

      </div>

      <section
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-3
          gap-8
          items-start
        "
      >

        {paginatedVideos.map((video: any) => (

          <VideoCard
            key={video.id.videoId}
            slug={video.id.videoId}
            title={video.snippet.title}
            youtubeId={video.id.videoId}
            views={`${Number(
              video.views
            ).toLocaleString("sk-SK")} zhliadnutí`}
            date={new Date(
              video.snippet.publishedAt
            ).toLocaleDateString("sk-SK")}
          />

        ))}

      </section>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        basePath="/videa"
      />  

    </main>
  );
}