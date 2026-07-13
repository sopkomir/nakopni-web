import Link from "next/link";

interface BreadcrumbsProps {
  category?: string;
  categorySlug?: string;
  title: string;
}

export default function Breadcrumbs({
  category,
  categorySlug,
  title,
}: BreadcrumbsProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="mb-8 text-sm text-zinc-500"
    >
      <ol className="flex flex-wrap items-center gap-2">

        {/* DOMOV */}
        <li>
          <Link
            href="/"
            className="transition-colors hover:text-black"
          >
            Domov
          </Link>
        </li>

        {/* KATEGÓRIA */}
        {category && categorySlug && (
          <>
            <li>/</li>

            <li>
              <Link
                href={`/${categorySlug}`}
                className="transition-colors hover:text-black"
              >
                {category}
              </Link>
            </li>
          </>
        )}

        {/* NÁZOV ČLÁNKU */}
        <li>/</li>

        <li className="max-w-[260px] truncate font-medium text-black">
          {title}
        </li>

      </ol>
    </nav>
  );
}