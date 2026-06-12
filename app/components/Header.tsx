"use client";

import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [open, setOpen] = useState(false);

  const links = [
    {
      label: "Nakopni.sk",
      href: "/",
    },
    {
      label: "Reportáže",
      href: "/reportaze",
    },
    {
      label: "Komentáre",
      href: "/komentare",
    },
    {
      label: "Zemplínsky dialóg",
      href: "/videa",
    },
    {
      label: "Biznis",
      href: "/biznis",
    },
  ];

  return (
    <header className="border-b border-gray-200 bg-white">

      <div className="mx-auto max-w-[1500px] px-4">

        <div className="grid items-center gap-8 lg:grid-cols-[320px_1fr_280px]">

          {/* LOGO */}
          <div>

            <Link href="/">

              <img
                src="/logo_nakopni.svg"
                alt="Nakopni.sk"
                className="h-36 w-auto"
              />

            </Link>

          </div>

          {/* STRED */}
          <div className="flex flex-col items-start justify-end">

            <div className="inline-block">

              {/* SLOGAN */}
              <div
                className="
                  mb-3
                  uppercase
                  leading-[0.9]
                  tracking-tight
                  text-[#8e8e93]
                "
                style={{
                  fontFamily: "'Oswald', sans-serif",
                  fontSize: "clamp(1rem, 1.4vw, 2rem)",
                }}
              >
                Hľadáme riešenia ako nakopnúť Slovensko
              </div>

              {/* DESKTOP MENU */}
              <nav className="hidden md:block">

                <ul
                  className="
                    flex
                    flex-nowrap
                    gap-7
                    text-base
                    uppercase
                    tracking-wide
                  "
                  style={{
                    fontFamily: "'Oswald', sans-serif",
                  }}
                >

                  {links.map((link) => (

                    <li key={link.href}>

                      <Link
                        href={link.href}
                        className="
                          whitespace-nowrap
                          transition-colors
                          hover:text-orange-500
                        "
                      >
                        {link.label}
                      </Link>

                    </li>

                  ))}

                </ul>

              </nav>

            </div>

          </div>

          {/* PARTNER */}
          <div className="hidden lg:flex justify-end self-start">

            <a
              href="https://www.michalovskenoviny.sk"
              target="_blank"
              rel="noopener noreferrer"
            >

              <img
                src="/partner-boka.webp"
                alt="Bok Reklama"
                className="max-w-[260px] h-auto"
              />

            </a>

          </div>

        </div>

        {/* MOBILE BUTTON */}
        <div className="mt-6 flex justify-end md:hidden">

          <button
            className="text-3xl font-black"
            onClick={() => setOpen(!open)}
          >
            ☰
          </button>

        </div>

        {/* MOBILE MENU */}
        {open && (

          <nav className="mt-6 border-t border-gray-200 pt-6 md:hidden">

            <ul className="flex flex-col gap-4 text-sm font-bold uppercase">

              {links.map((link) => (

                <li key={link.href}>

                  <Link
                    href={link.href}
                    className="transition-colors hover:text-orange-500"
                  >
                    {link.label}
                  </Link>

                </li>

              ))}

            </ul>

          </nav>

        )}

      </div>

    </header>
  );
}