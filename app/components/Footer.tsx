import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-zinc-200 pt-8 pb-10 text-sm">

      <div className="flex flex-col gap-8 lg:flex-row lg:justify-between">

        {/* Ľavá časť */}
        <div className="max-w-2xl">

          <h3 className="mb-3 text-lg font-bold">
            Nakopni.sk
          </h3>

          <p className="leading-7 text-zinc-600">
            Nezávislý regionálny spravodajský portál prinášajúci
            reportáže, komentáre, videá a pozitívne príbehy
            z regiónu Zemplína.
          </p>

          <div className="mt-5 flex flex-wrap gap-6 text-sm font-medium">

            <Link
              href="/o-nas"
              className="transition-colors hover:text-orange-500"
            >
              O nás
            </Link>

            <Link
              href="/kontakt"
              className="transition-colors hover:text-orange-500"
            >
              Kontakt
            </Link>

            <Link
              href="/gdpr"
              className="transition-colors hover:text-orange-500"
            >
              GDPR
            </Link>

            <Link
              href="/cookies"
              className="transition-colors hover:text-orange-500"
            >
              Cookies
            </Link>

          </div>

        </div>

        {/* Pravá časť */}

        <div className="text-sm leading-7 text-zinc-600">

          <div className="font-semibold text-black">
            Vydavateľ
          </div>

          <div>
            Občianske združenie Nakopni
          </div>

          <div>
            Topolianska 2750/12
            <br />
            071 01 Michalovce
          </div>

          <div>
            IČO: 57703779
          </div>

          <div>
            Registrácia:
            <br />
            VVS/1-900/90-74660
          </div>

        </div>

      </div>

      <div className="mt-8 border-t border-zinc-200 pt-5 text-xs text-zinc-500">

        © {new Date().getFullYear()} Nakopni.sk. Všetky práva vyhradené.

      </div>

    </footer>
  );
}