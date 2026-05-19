import Link from "next/link";

interface BreadcrumbsProps {
  category?: string;
  title: string;
}

export default function Breadcrumbs({
  category,
  title,
}: BreadcrumbsProps) {

  const categoryMap: Record<string, string> = {
    komentar: "Komentáre",
    blog: "Blog",
    rozhovor: "Rozhovory",
  };

  const categoryHrefMap: Record<string, string> = {
    komentar: "/komentare",
    blog: "/blogy",
    rozhovor: "/rozhovory",
  };

  return (
    <nav
      aria-label="Breadcrumb"
      className="mb-8 text-sm text-zinc-500"
    >

      <ol className="flex flex-wrap items-center gap-2">

        {/* HOME */}
        <li>
          <Link
            href="/"
            className="transition-colors hover:text-black dark:hover:text-white"
          >
            Domov
          </Link>
        </li>

        {/* CATEGORY */}
        {category && (
          <>
            <li>/</li>

            <li>
              <Link
                href={categoryHrefMap[category] || "#"}
                className="transition-colors hover:text-black dark:hover:text-white"
              >
                {categoryMap[category] || category}
              </Link>
            </li>
          </>
        )}

        {/* TITLE */}
        <li>/</li>

        <li className="text-black dark:text-white font-medium truncate max-w-[240px]">
          {title}
        </li>

      </ol>

    </nav>
  );
}