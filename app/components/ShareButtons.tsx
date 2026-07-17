"use client";

import { useEffect, useState } from "react";

interface Props {
  title: string;
  url: string;
}

function IconButton({
  href,
  title,
  children,
}: {
  href: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={title}
      title={title}
      className="
        flex
        h-11
        w-11
        items-center
        justify-center
        rounded-full
        border
        border-zinc-300
        text-zinc-700
        transition-all
        duration-200
        hover:-translate-y-1
        hover:border-orange-500
        hover:text-orange-500
      "
    >
      {children}
    </a>
  );
}

export default function ShareButtons({ title, url }: Props) {
  const [copied, setCopied] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 768px)");

    const update = () => {
      setIsMobile(media.matches);
    };

    update();

    media.addEventListener("change", update);

    return () => media.removeEventListener("change", update);
  }, []);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const canShare =
    typeof navigator !== "undefined" &&
    typeof navigator.share === "function";

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      alert("Nepodarilo sa skopírovať odkaz.");
    }
  }

  async function shareNative() {
    if (!navigator.share) return;

    try {
      await navigator.share({
        title,
        url,
      });
    } catch {
      // používateľ zrušil zdieľanie
    }
  }

  const items = [
        {
      title: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
          <path d="M22 12A10 10 0 1 0 10.44 21.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.88 3.77-3.88 1.09 0 2.23.2 2.23.2v2.45h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z"/>
        </svg>
      ),
    },
    {
      title: "X",
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      icon: (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
          <path d="M18.9 2H22l-6.8 7.7L23.2 22H17l-4.9-6.5L6.4 22H3.3l7.2-8.3L.8 2h6.4l4.4 5.9L18.9 2ZM17.8 20h1.7L5.7 4H3.8Z"/>
        </svg>
      ),
    },
    {
      title: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      icon: (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
          <path d="M4.98 3.5A1.5 1.5 0 1 1 5 6.5a1.5 1.5 0 0 1-.02-3ZM3.5 8h3V21h-3V8Zm5.5 0h2.88v1.77h.04c.4-.76 1.38-1.77 2.84-1.77C17.8 8 20 9.67 20 13.3V21h-3v-6.4c0-1.53-.03-3.5-2.13-3.5-2.14 0-2.47 1.67-2.47 3.39V21h-3V8Z"/>
        </svg>
      ),
    },
    {
      title: "WhatsApp",
      href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      icon: (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
          <path d="M12 2a10 10 0 0 0-8.7 15l-1.2 5 5.1-1.3A10 10 0 1 0 12 2Zm5.6 14.2c-.2.6-1.3 1.2-1.8 1.2-.5.1-1.2.2-3.8-.9-3.1-1.3-5.1-4.5-5.3-4.7-.2-.2-1.3-1.7-1.3-3.2s.8-2.3 1.1-2.6c.3-.3.6-.4.8-.4h.6c.2 0 .5-.1.7.5.3.7.9 2.4 1 2.6.1.2.1.4 0 .6-.1.2-.2.4-.4.6-.2.2-.4.5-.6.6-.2.2-.4.4-.2.8.2.4 1 1.6 2.2 2.5 1.5 1.2 2.8 1.6 3.2 1.8.4.2.6.2.8-.1.2-.3.9-1 1.1-1.4.3-.3.5-.3.8-.2.3.1 2 .9 2.3 1 .3.2.6.3.7.5.1.2.1 1-.1 1.6Z"/>
        </svg>
      ),
    },
  ];
  return (
  <section className="mt-10 border-y border-zinc-200 py-6">
    <div className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500">
      Zdieľať článok
    </div>

    {isMobile && canShare ? (
      <>
        <button
          onClick={shareNative}
          className="
            flex
            w-full
            items-center
            justify-center
            rounded-lg
            bg-orange-500
            px-5
            py-3
            text-base
            font-semibold
            text-white
            transition-all
            duration-200
            hover:bg-orange-600
            active:scale-[0.98]
          "
        >
          📲 Zdieľať článok
        </button>

        <div className="mt-4 flex justify-center">
          <button
            onClick={copyLink}
            title="Kopírovať odkaz"
            className="rounded-full border border-zinc-300 px-4 py-2 text-sm text-zinc-700 transition hover:border-orange-500 hover:text-orange-500"
          >
            🔗 Kopírovať odkaz
          </button>
        </div>

        {copied && (
          <div className="mt-3 text-center text-sm font-medium text-green-600">
            ✓ Odkaz skopírovaný
          </div>
        )}
      </>
    ) : (
      <>
        <div className="flex flex-wrap items-center gap-3">
          {items.map((item) => (
            <IconButton
              key={item.title}
              href={item.href}
              title={item.title}
            >
              {item.icon}
            </IconButton>
          ))}

          <button
            onClick={copyLink}
            title="Kopírovať odkaz"
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-full
              border
              border-zinc-300
              text-zinc-700
              transition-all
              duration-200
              hover:-translate-y-1
              hover:border-orange-500
              hover:text-orange-500
            "
          >
            🔗
          </button>
        </div>

        {copied && (
          <div className="mt-3 text-sm font-medium text-green-600">
            ✓ Odkaz skopírovaný
          </div>
        )}
      </>
    )}
  </section>
);
}