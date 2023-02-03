import { getPageByFilter, getPageData, listPages } from '@/util/posts'
import { notFound } from 'next/navigation'

export const revalidate = 60

export async function generateStaticParams() {
  const pagesList = await listPages({
    filter: {
      property: 'url',
      rich_text: {
        is_not_empty: true,
      },
    },
  })

  return pagesList.map((page) => ({
    slug: page.url,
  }))
}

type PostPageProps = {
  params: {
    slug: string
  }
}

export default async function PostPage({ params }: PostPageProps) {
  if (!params || !params.slug) notFound()

  const pageData = await getPageByFilter({
    filter: {
      property: 'url',
      rich_text: {
        equals: params.slug,
      },
    },
  })

  if (!pageData) notFound()

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
