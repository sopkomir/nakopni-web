"use client";

interface Props {
  title: string;
  url: string;
}

export default function ShareButtons({ title, url }: Props) {

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const share = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    x: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedUrl}`,
  };

  async function copyLink() {
    await navigator.clipboard.writeText(url);
    alert("Odkaz bol skopírovaný.");
  }

  return (
    <div className="mt-8">

      <div className="mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-500">
        Zdieľať článok
      </div>

      <div className="flex flex-wrap gap-3">

        <ShareLink href={share.facebook}>f</ShareLink>

        <ShareLink href={share.x}>𝕏</ShareLink>

        <ShareLink href={share.linkedin}>in</ShareLink>

        <ShareLink href={share.whatsapp}>WA</ShareLink>

        <ShareLink href={share.telegram}>TG</ShareLink>

        <ShareLink href={share.email}>✉</ShareLink>

        <button
          onClick={copyLink}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-300 transition hover:border-orange-500 hover:text-orange-500"
          title="Kopírovať odkaz"
        >
          🔗
        </button>

      </div>

    </div>
  );
}

function ShareLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-300 font-bold transition hover:border-orange-500 hover:text-orange-500"
    >
      {children}
    </a>
  );
}