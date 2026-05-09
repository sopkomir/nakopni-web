export default function ArticlesLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <main className="max-w-5xl mx-auto px-6 py-16">
        {children}
      </main>
    );
  }