import { getPage } from '@/util/posts'
import { notFound } from 'next/navigation'

type PostPageProps = {
  params: {
    id: string
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const pageId = params?.id

  if (!pageId) notFound()

  const pageContent = await getPage(pageId)
  return <main>{pageContent}</main>
}
