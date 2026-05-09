import Sidebar from "../components/Sidebar";

export default function VideaPage() {
  return (
    <main className="mt-10">
      <a
      href="/"
      className="inline-block text-sm uppercase tracking-wide font-bold text-gray-500 hover:text-orange-500 mb-10"
      >
      ← Späť na homepage
      </a>
      <div className="mb-12">

        <div className="text-sm uppercase tracking-[0.3em] text-gray-500 font-bold mb-4">
          Videá
        </div>

        <h1 className="text-5xl md:text-7xl font-black leading-none">
          Video rozhovory
        </h1>

      </div>

      <Sidebar />

    </main>
  );
}