import Link from 'next/link'
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
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
