import { ToDo } from '@/components/todo'
import { ToDoBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import { createTextAtoms } from './util'

export const parseTodos = (block: ToDoBlockObjectResponse) => {
  return (
    <ToDo checked={block.to_do.checked}>
      {createTextAtoms(block.to_do.rich_text)}
    </ToDo>
  )
}
