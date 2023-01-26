import { ReactNode } from 'react'

type ParagraphProps = {
  children: ReactNode | ReactNode[]
}
export const Paragraph = ({ children }: ParagraphProps) => {
  return <p className="mb-2">{children}</p>
}
