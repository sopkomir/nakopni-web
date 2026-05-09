import Comments from "../components/Comments";

export default function KomentarePage() {
  return (
    <main className="mt-10">

      <div className="mb-12">

        <div className="text-sm uppercase tracking-[0.3em] text-gray-500 font-bold mb-4">
          Komentáre
        </div>

        <h1 className="text-5xl md:text-7xl font-black leading-none">
          Komentáre a analýzy
        </h1>

      </div>

      <Comments />

    </main>
  );
}