import type { Metadata } from 'next'
import Link from 'next/link'
import './globals.css'

export const metadata: Metadata = {
  title: 'Next Notion Blog',
  description: 'A blog powered by Notion',
  icons: { icon: '/favicon.ico' },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="p-4">
        <header className="mb-6">
          <Link
            href="/"
            className="hover:underline hover:text-blue-500 font-bold"
          >
            Home
          </Link>
        </header>
        <main className="max-w-[600px] mx-auto px-4">{children}</main>
      </body>
    </html>
  )
}
