import GoogleAnalytics from "./components/GoogleAnalytics";
import "./globals.css";
import { Oswald, Inter } from "next/font/google";
import CookieBanner from "./components/CookieBanner";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { client } from "./lib/sanity";
import { siteSettingsQuery } from "./lib/queries";
import type { Metadata } from "next";

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-oswald",
});

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.nakopni.sk"),

  title: {
    default: "Nakopni.sk | Regionálny spravodajský portál",
    template: "%s | Nakopni.sk",
  },

  description:
    "Nezávislý regionálny spravodajský portál prinášajúci reportáže, komentáre, rozhovory a pozitívne príbehy zo Zemplína.",

  openGraph: {
    title: "Nakopni.sk",
    description:
      "Nezávislý regionálny spravodajský portál zo Zemplína.",
    url: "https://www.nakopni.sk",
    siteName: "Nakopni.sk",
    locale: "sk_SK",
    type: "website",

    images: [
      {
        url: "/og-image.jpg",
        alt: "Nakopni.sk",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Nakopni.sk",
    description:
      "Nezávislý regionálny spravodajský portál zo Zemplína.",
      images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const settings = await client.fetch(siteSettingsQuery);

  const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",

  name: settings?.siteTitle ?? "Nakopni.sk",

  url: "https://www.nakopni.sk",

  logo: settings?.logo
    ? {
        "@type": "ImageObject",
        url: settings.logo.asset.url,
      }
    : {
        "@type": "ImageObject",
        url: "https://www.nakopni.sk/logo-og.png",
      },

  description: settings?.siteDescription,

  email: settings?.businessEmail,

  telephone: settings?.phone,

  address: settings?.address,

  sameAs: [
    settings?.facebook,
    settings?.instagram,
    settings?.youtube,
    settings?.linkedin,
  ].filter(Boolean),
};

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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-6 bg-white">

          <Header settings={settings} />

          {children}

          <Footer settings={settings} />

          <CookieBanner />

          <GoogleAnalytics />

        </div>
      </body>
    </html>
  );
}