"use client";

import { useEffect, useState } from "react";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setVisible(true);
    }
  }, []);

  function acceptAll() {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
  }

  function acceptNecessary() {
    localStorage.setItem("cookie-consent", "necessary");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 left-1/2 z-50 w-[95%] max-w-3xl -translate-x-1/2 rounded-xl border border-zinc-200 bg-white p-6 shadow-2xl">

      <h3 className="mb-2 text-lg font-bold">
        🍪 Cookies
      </h3>

      <p className="mb-5 text-sm leading-6 text-zinc-600">
        Nakopni.sk používa nevyhnutné cookies na správne fungovanie
        stránky a po vašom súhlase aj analytické cookies na zlepšovanie
        obsahu.
      </p>

      <div className="flex flex-wrap gap-3">

        <button
          onClick={acceptAll}
          className="rounded-lg bg-orange-500 px-5 py-2 font-semibold text-white transition hover:bg-orange-600"
        >
          Prijať všetky
        </button>

        <button
          onClick={acceptNecessary}
          className="rounded-lg border border-zinc-300 px-5 py-2 font-semibold transition hover:bg-zinc-100"
        >
          Len nevyhnutné
        </button>

      </div>

    </div>
  );
}