import clsx from 'clsx'

type ToDoProps = {
  children: JSX.Element[]
  checked: boolean
}

export const ToDo = ({ checked, children }: ToDoProps) => {
  return (
    <div className="flex items-center">
      <CheckBox checked={checked} />
      {children}
    </div>
  )
}

const CheckBox = ({ checked }: { checked: boolean }) => {
  return (
    <div
      className={clsx(
        'mr-2 w-4 h-4 border-2 border-slate-700',
        checked && 'bg-blue-500 border-blue-500 flex items-center'
      )}
    >
      {checked && <span className="text-xs text-slate-50">✓</span>}
    </div>
  )
}
