import Link from "next/link";

type Props = {
  currentPage: number;
  totalPages: number;
  basePath: string;
};

export default function Pagination({
  currentPage,
  totalPages,
  basePath,
}: Props) {

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex justify-center gap-3 mt-16 flex-wrap">

      {Array.from(
        { length: totalPages },
        (_, i) => i + 1
      ).map((page) => (

        <Link
          key={page}
          href={`${basePath}?page=${page}`}
          className={`
            px-4
            py-2
            border
            text-sm
            font-bold
            transition-colors

            ${
              currentPage === page
                ? "bg-black text-white border-black"
                : "border-gray-300 hover:border-black"
            }
          `}
        >
          {page}
        </Link>

      ))}

    </div>
  );
}