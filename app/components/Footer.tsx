import Link from "next/link";
import { PortableText } from "@portabletext/react";

interface FooterProps {
  settings: any;
}

export default function Footer({ settings }: FooterProps) {
  return (
    <footer className="mt-20 border-t border-zinc-200 pt-8 pb-10 text-sm">

      <div className="flex flex-col gap-8 lg:flex-row lg:justify-between">

        {/* Ľavá časť */}
        <div className="max-w-2xl">

          <h3 className="mb-3 text-lg font-bold">
            {settings?.siteTitle || "Nakopni.sk"}
          </h3>

          <div className="leading-7 text-zinc-600 prose prose-sm max-w-none">
            {settings?.footerText && (
              <PortableText value={settings.footerText} />
            )}
          </div>

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
            {settings?.publisher}
          </div>

          {settings?.address && (
            <div className="whitespace-pre-line">
              {settings.address}
            </div>
          )}

          {settings?.ico && (
            <div>
              IČO: {settings.ico}
            </div>
          )}

          {settings?.registration && (
            <div>
              Registrácia:
              <br />
              {settings.registration}
            </div>
          )}

         {settings?.editorEmail && (
            <div className="mt-3">
              <a
                href={`mailto:${settings.editorEmail}`}
                className="hover:text-orange-500"
              >
                {settings.editorEmail}
              </a>
            </div>
          )}

          {settings?.phone && (
            <div>
              <a
                href={`tel:${settings.phone}`}
                className="hover:text-orange-500"
              >
                {settings.phone}
              </a>
            </div>
          )}

        </div>

      </div>

      <div className="mt-8 border-t border-zinc-200 pt-5 text-xs text-zinc-500">

        © {new Date().getFullYear()}{" "}
        {settings?.copyright || "Nakopni.sk. Všetky práva vyhradené."}

      </div>

    </footer>
  );
}