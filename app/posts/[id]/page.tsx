import { getPageData } from '@/util/posts'
import { notFound } from 'next/navigation'
import { validate } from 'uuid'

type PostPageProps = {
  params: {
    id: string
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const pageId = params?.id

  if (!pageId || !validate(pageId)) notFound()

  const pageData = await getPageData(pageId)
  return (
    <main>
      <h2 className="text-xl font-bold">{pageData.metadata.title}</h2>
      <small className="block text-xs text-slate-500 mb-6">
        {pageData.metadata.publishedAt}
      </small>
      <div>{pageData.content}</div>
    </main>
  )
}
