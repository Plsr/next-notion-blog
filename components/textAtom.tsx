import { ReactNode } from 'react'
import clsx from 'clsx'

type TextAtomProps = {
  children: ReactNode
  italic?: boolean
  bold?: boolean
  underline?: boolean
  strikethrough?: boolean
  code?: boolean
  href?: string
}

export const TextAtom = ({
  children,
  italic,
  bold,
  underline,
  strikethrough,
  code,
  href,
}: TextAtomProps) => {
  const classNames = clsx(
    italic && 'italic',
    bold && 'font-bold',
    underline && 'underline',
    strikethrough && 'line-through',
    code &&
      'font-monospace bg-slate-100 px-2 py-1 rounded text-slate-600 text-xs'
  )

  const wrappedChildren = !!href ? (
    <a href={href} className="text-blue-500 underline">
      {children}
    </a>
  ) : (
    <>{children}</>
  )

  if (code) {
    return <code className={classNames}>{wrappedChildren}</code>
  }

  return <span className={classNames}>{wrappedChildren}</span>
}
