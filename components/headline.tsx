import { ReactNode } from 'react'

type HeadlineProps = {
  children: ReactNode
  level: number
}
export const Headline = ({ children, level }: HeadlineProps) => {
  if (level === 1) {
    return <h2 className="text-3xl font-bold mb-6 mt-4">{children}</h2>
  }

  if (level === 2) {
    return <h3 className="text-2xl font-bold mb-4 mt-4">{children}</h3>
  }

  if (level === 3) {
    return <h4 className="text-xl font-bold mb-2 mt-4">{children}</h4>
  }

  return null
}
