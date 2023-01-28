import { getPage } from '@/util/posts'

type PostPageProps = {
  params: {
    id: string
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const pageContent = await getPage(params.id)
  return <main>{pageContent}</main>
}
