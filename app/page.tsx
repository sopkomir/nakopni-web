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
    <main className="mx-auto max-w-[1500px] px-6 py-10">

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_380px]">

        {/* LEFT COLUMN */}
        <div>

          <FeaturedHero post={data.featured} />

          <ReportazeGrid posts={reportaze} />

          <div className="space-y-6">

            {data.komentare.map((post: any) => (
              <ArticleCard
                key={post._id}
                post={post}
              />
            ))}

          </div>

          <PhotoArticleSection
            post={data.fotoclanok}
          />

        </div>

        {/* RIGHT COLUMN */}
        <aside>

          <div className="lg:sticky lg:top-24">

            <Sidebar />

          </div>

        </aside>

      </div>

    </main>
  )
}