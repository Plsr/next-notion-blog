import { ReactNode } from 'react'
import clsx from 'clsx'

type ParagraphProps = {
  children: ReactNode
  italic?: boolean
  bold?: boolean
  underline?: boolean
  strikethrough?: boolean
}

export const Paragraph = ({
  children,
  italic,
  bold,
  underline,
  strikethrough,
}: ParagraphProps) => {
  return (
    <span
      className={clsx(
        italic && 'italic',
        bold && 'font-bold',
        underline && 'underline',
        strikethrough && 'line-through'
      )}
    >
      {children}
    </span>
  )
}
