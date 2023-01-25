
import { Inter } from '@next/font/google'
import { foo } from '@/util/posts'

const inter = Inter({ subsets: ['latin'] })



export default async function Home() {
  const notionFoo = await foo()
  console.log(notionFoo)
  return (
    <main>
      {notionFoo}
    </main>
  )
}
