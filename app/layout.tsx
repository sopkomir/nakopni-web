import "./globals.css";

import { Oswald, Inter } from "next/font/google";

import CookieBanner from "./components/CookieBanner";
import Header from "./components/Header";
import Footer from "./components/Footer";

import { client } from "./lib/sanity";
import { siteSettingsQuery } from "./lib/queries";

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-oswald",
});

const inter = Inter({
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const settings = await client.fetch(siteSettingsQuery);

  return (
    <html lang="sk">
      <body
        className={`
          ${inter.className}
          ${oswald.variable}
          bg-white
          text-black
        `}
      >
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-6 bg-white">

          <Header settings={settings} />

          {children}

          <Footer settings={settings} />

          <CookieBanner />

        </div>
      </body>
    </html>
  );
}