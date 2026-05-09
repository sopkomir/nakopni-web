import "./globals.css";

import Header from "./components/Header";
import Footer from "./components/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sk">
      <body>

      <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-6">

          <Header />

          {children}

          <Footer />

        </div>

      </body>
    </html>
  );
}