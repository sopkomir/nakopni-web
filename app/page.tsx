import { client } from './lib/sanity'
import { homepageQuery, latestReportazeQuery } from './lib/queries'
import ReportazeGrid from './components/ReportazeGrid'
import Sidebar from './components/Sidebar'
import ArticleCard from './components/ArticleCard'
import FeaturedHero from './components/FeaturedHero'

export const revalidate = 60

export default async function HomePage() {
  const [data, reportaze] = await Promise.all([
  client.fetch(homepageQuery),
  client.fetch(latestReportazeQuery),
  ])

  const featured = data.featured

  const excludedIds = [
  featured?._id,
  ...reportaze.map((post: any) => post._id),
  ]

  const posts = data.posts.filter(
  (post: any) => !excludedIds.includes(post._id)
  )

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">

      {/* HERO */}
      <FeaturedHero post={featured} />
      <ReportazeGrid posts={reportaze} />
      {/* CONTENT */}
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_360px]">

        {/* LEFT */}
        <div className="space-y-6">

          {posts.map((post: any) => (
            <ArticleCard
              key={post._id}
              post={post}
            />
          ))}

        </div>

        {/* RIGHT */}
        <aside className="hidden lg:block space-y-10">

          {/* STICKY SIDEBAR */}
          <div className="sticky top-24">

            <Sidebar />

          </div>

        </aside>

      </div>

    </main>
  )
}