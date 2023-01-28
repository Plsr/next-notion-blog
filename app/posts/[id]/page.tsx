import { getPage } from '@/util/posts'
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

  const pageContent = await getPage(pageId)
  return <main>{pageContent}</main>
}
