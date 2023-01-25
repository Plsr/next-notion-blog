import { foo } from '@/util/posts'

export default async function Home() {
  const notionFoo = await foo()
  return <main>{notionFoo}</main>
}
