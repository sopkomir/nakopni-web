"use client";

import { useState } from "react";
import { navigation } from "../data/navigation";
import Link from "next/link";

export default function Header() {

  const [open, setOpen] = useState(false);

  const links: Record<string, string> = {
    Domov: "/",
    Rozhovory: "/rozhovory",
    Komentáre: "/komentare",
    Blogy: "/blogy",
    "Zemplínsky dialóg": "/videa",
  };

  return (
    <header className="border-b border-gray-200 bg-white">

      <div className="py-4">

        <div className="grid lg:grid-cols-[260px_1fr] gap-10 items-end">

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
                uppercase
                leading-[0.9]
                tracking-tight
                mb-4
                text-[#8e8e93]
              "
              style={{
               fontFamily: "'Anton', sans-serif",
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

                {navigation.map((item) => (

                  <li key={item}>

                    <Link
                      href={links[item]}
                      className="
                        hover:text-orange-500
                        transition-colors
                      "
                    >
                      {item}
                    </Link>

                  </li>

                ))}

              </ul>

            </nav>

          </div>

        </div>

        {/* MOBILE BUTTON */}
        <div className="flex justify-end md:hidden mt-6">

          <button
            className="text-3xl font-black"
            onClick={() => setOpen(!open)}
          >
            ☰
          </button>

        </div>

        {/* MOBILE MENU */}
        {open && (

          <nav className="md:hidden mt-6 border-t border-gray-200 pt-6">

            <ul className="flex flex-col gap-4 text-sm font-bold uppercase">

              {navigation.map((item) => (

                <li key={item}>

                  <Link
                    href={links[item]}
                    className="hover:text-orange-500 transition-colors"
                  >
                    {item}
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