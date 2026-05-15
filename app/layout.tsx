import "./globals.css";
import { Oswald } from "next/font/google";
import Header from "./components/Header";
import Footer from "./components/Footer";

const oswald = Oswald({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-oswald",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sk">
      <body className={oswald.variable}>

      <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-6">

          <Header />

          {children}

          <Footer />

        </div>

      </body>
    </html>
  );
}