import clsx from 'clsx'

type ListProps = {
  children: JSX.Element[][]
  type: 'ordered' | 'unordered'
}

export const List = ({ children, type }: ListProps) => {
  const wrapperClass = 'ml-8 mb-4'

  const listItems = () => (
    <>
      {children.map((child) => (
        <li
          className={clsx(
            type === 'ordered' && 'list-disc',
            type === 'unordered' && 'list-decimal'
          )}
          key={'asd'}
        >
          {child}
        </li>
      ))}
    </>
  )

  if (type === 'ordered') {
    return <ol className={wrapperClass}>{listItems()}</ol>
  }

  return <ul className={wrapperClass}>{listItems()}</ul>
}
