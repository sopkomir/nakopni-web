"use client";

import { useState } from "react";
import { navigation } from "../data/navigation";
import Link from "next/link";
export default function Header() {

  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-200">

      <div className="flex items-center justify-between gap-10 py-6">

        <div className="flex items-center gap-10">
        <Link href="/">
          <h1 className="text-4xl md:text-5xl">
          <img
            src="/logoN.svg"
            alt="Nakopni.sk"
            className="h-16 w-auto"
          />
          </h1>
        </Link>
          <nav className="hidden md:block">
            <ul className="flex gap-7 text-sm font-bold uppercase tracking-wide">

            {navigation.map((item) => {

              const links: Record<string, string> = {
                Domov: "/",
                Rozhovory: "/rozhovory",
                Komentáre: "/komentare",
                Blogy: "/blogy",
                "Zemplínsky dialóg": "/videa",
              };

              return (
                <li key={item}>
                  <Link
                    href={links[item]}
                    className="hover:text-orange-500 transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              );
              })}

            </ul>
          </nav>

        </div>

        <button
          className="md:hidden text-3xl font-black"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>

      </div>

      {open && (
        <nav className="md:hidden mt-6 border-t border-gray-200 pt-6">

          <ul className="flex flex-col gap-4 text-sm font-bold uppercase">

            {navigation.map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="hover:text-orange-500 transition-colors"
                >
                  {item}
                </a>
              </li>
            ))}

          </ul>

        </nav>
      )}

    </header>
  );
}