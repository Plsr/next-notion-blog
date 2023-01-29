import { listPages } from '@/util/posts'
import Link from 'next/link'

export default async function Home() {
  const pagesList = await listPages()

  return (
    <div>
      <h2 className="text-xl font-bold mb-6">All posts</h2>
      {pagesList.map((page) => (
        <Link key={page.id} href={`posts/${page.id}`}>
          <div className="mb-4">
            <h3 className="text-lg font-bold">{page.title}</h3>
            <span className="text-sm text-slate-500">{page.publishedAt}</span>
          </div>
        </Link>
      ))}
    </div>
  )
}
