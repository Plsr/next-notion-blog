import { ReactNode } from 'react'

type QuoteProps = {
  children: ReactNode | ReactNode[]
}
export const Quote = ({ children }: QuoteProps) => {
  return (
    <blockquote className="pl-4 border-l-2 border-l-slate-500 text-slate-600 mb-4">
      {children}
    </blockquote>
  )
}
