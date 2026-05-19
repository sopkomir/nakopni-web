import { client } from './lib/sanity'
import { homepageQuery } from './lib/queries'

import Sidebar from './components/Sidebar'
import ArticleCard from './components/ArticleCard'
import FeaturedHero from './components/FeaturedHero'

export const revalidate = 60

export default async function HomePage() {
  const data = await client.fetch(homepageQuery)

  const featured = data.featured
  const posts = data.posts.filter(
    (post: any) => post._id !== featured?._id
  )

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      {/* HERO */}
      <FeaturedHero post={featured} />

      {/* CONTENT */}
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_360px]">
        {/* LEFT */}
        <div className="space-y-6">
          {posts.map((post: any) => (
            <ArticleCard key={post._id} post={post} />
          ))}
        </div>

        {/* RIGHT */}
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <Sidebar />
          </div>
        </aside>
      </div>
    </main>
  )
}