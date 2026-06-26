export default function CookiesPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10">

      <h1 className="mb-8 text-4xl font-bold">
        Cookies
      </h1>

      <div className="space-y-6 leading-8 text-zinc-700">

        <p>
          Web Nakopni.sk používa cookies na zabezpečenie správneho
          fungovania stránky a na anonymné meranie návštevnosti.
        </p>

        <h2 className="text-2xl font-semibold">
          Nevyhnutné cookies
        </h2>

        <p>
          Sú potrebné na správne fungovanie webu
          a nemožno ich vypnúť.
        </p>

        <h2 className="text-2xl font-semibold">
          Analytické cookies
        </h2>

        <p>
          Pomáhajú nám pochopiť,
          ako návštevníci používajú web,
          aby sme mohli zlepšovať jeho obsah.
        </p>

        <h2 className="text-2xl font-semibold">
          Zmena nastavení
        </h2>

        <p>
          Nastavenia cookies môžete kedykoľvek zmeniť
          vo svojom internetovom prehliadači.
        </p>

      </div>

    </main>
  );
}