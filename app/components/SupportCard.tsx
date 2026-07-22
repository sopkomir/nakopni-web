"use client";

import Image from "next/image";

const IBAN = "SK77 8330 0000 0026 0353 7586";

export default function SupportCard() {
  async function copyIBAN() {
    await navigator.clipboard.writeText(
      IBAN.replace(/\s/g, "")
    );

    alert("✔ IBAN bol skopírovaný.");
  }

  return (
    <section className="my-20 rounded-3xl border border-zinc-200 bg-zinc-50 p-8 md:p-10">

      <div className="grid gap-12 items-center lg:grid-cols-[1.4fr_340px]">

        <div>

          <h2 className="text-3xl font-black mb-4">
            ❤️ Páči sa vám tento článok?
          </h2>

          <p className="text-lg text-zinc-700 leading-relaxed mb-6">
            Dočítali ste až sem. Ak bol tento článok pre vás prínosný, pomôžte nám prinášať ďalšie overené správy zo Zemplína a východného Slovenska.
          </p>

          <p className="text-zinc-600 leading-relaxed mb-8">
            Nakopni.sk prináša nezávislé správy zo Zemplína a východného Slovenska.
            Ak vám naša práca dáva zmysel, môžete nás podporiť
            jednorazovým príspevkom vo výške <strong>5 €</strong> alebo ľubovoľnou sumou
            prostredníctvom transparentného účtu.
            </p>

          <div className="font-semibold text-sm uppercase tracking-wide text-zinc-500 mb-2">
            Transparentný účet
          </div>

          <div className="font-mono text-lg mb-6">
            {IBAN}
          </div>

          <button
            onClick={copyIBAN}
            className="w-full sm:w-auto rounded-xl bg-orange-500 hover:bg-orange-600 transition px-8 py-4 font-semibold text-white shadow-lg"
          >
            📋 Skopírovať IBAN
          </button>

        </div>

        <div className="text-center self-start pt-4">

          <Image
            src="/pay-by-square-5eur.jpg"
            alt="Podporte Nakopni.sk"
            width={300}
            height={300}
            className="mx-auto rounded-2xl bg-white p-4 shadow-lg"
          />

          <p className="mt-4 text-sm text-zinc-500">
            QR kód je pripravený na príspevok 5 €.
          </p>

        </div>

      </div>

    </section>
  );
}