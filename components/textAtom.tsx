import { ReactNode } from 'react'
import clsx from 'clsx'

type TextAtomProps = {
  children: ReactNode
  italic?: boolean
  bold?: boolean
  underline?: boolean
  strikethrough?: boolean
  href?: string
}

export const TextAtom = ({
  children,
  italic,
  bold,
  underline,
  strikethrough,
  href,
}: TextAtomProps) => {
  const classNames = clsx(
    italic && 'italic',
    bold && 'font-bold',
    underline && 'underline',
    strikethrough && 'line-through',
    !!href && 'text-blue-500 underline'
  )

  if (!!href) {
    return (
      <a href={href} className={classNames}>
        {children}
      </a>
    )
  }
  return <span className={classNames}>{children}</span>
}
