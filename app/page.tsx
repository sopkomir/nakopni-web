import { client } from './lib/sanity'
import { homepageQuery, latestReportazeQuery } from './lib/queries'
import PhotoArticleSection from './components/PhotoArticleSection'
import FeaturedHero from './components/FeaturedHero'
import ReportazeGrid from './components/ReportazeGrid'
import Sidebar from './components/Sidebar'
import ArticleCard from './components/ArticleCard'

export const revalidate = 60

export default async function HomePage() {
  const [data, reportaze] = await Promise.all([
    client.fetch(homepageQuery),
    client.fetch(latestReportazeQuery),
  ])

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">

      <FeaturedHero post={data.featured} />

      <ReportazeGrid posts={reportaze} />

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_360px]">

        <div className="space-y-6">

          {data.komentare.map((post: any) => (
            <ArticleCard
              key={post._id}
              post={post}
            />
          ))}

          <PhotoArticleSection
            post={data.fotoclanok}
          />

        </div>

        <aside className="hidden lg:block">

          <div className="sticky top-24">
            <Sidebar />
          </div>

        </aside>

      </div>

    </main>
  )
}