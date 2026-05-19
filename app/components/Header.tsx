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

      <div className="py-4">

        <div className="grid items-end gap-10 lg:grid-cols-[260px_1fr]">

          {/* LOGO */}
          <div>

            <Link href="/">

              <img
                src="/logo_nakopni.png"
                alt="Nakopni.sk"
                className="h-32 w-auto"
              />

            </Link>

          </div>

          {/* RIGHT SIDE */}
          <div className="flex flex-col justify-end">

            {/* SLOGAN */}
            <div
              className="
                mb-4
                uppercase
                leading-[0.9]
                tracking-tight
                text-[#8e8e93]
              "
              style={{
                fontFamily: "'Oswald', sans-serif",
                fontSize: "clamp(1.5rem, 2.2vw, 2.8rem)",
              }}
            >
              Hľadáme riešenia ako nakopnúť Slovensko
            </div>

            {/* DESKTOP MENU */}
            <nav className="hidden md:block">

              <ul
                className="
                  flex
                  flex-wrap
                  gap-8
                  text-lg
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