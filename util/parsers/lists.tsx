import { List } from '@/components/list'
import {
  OrderedListBlockObjectResponse,
  UnorderedListBlockObjectResponse,
} from '../posts'
import { createTextAtoms } from './util'

export const parseList = (
  block: UnorderedListBlockObjectResponse | OrderedListBlockObjectResponse
) => {
  const isOrderedList = block.type === 'ordered_list'
  // Very verbose, but cannot get TypeScript to comply currently
  const children = isOrderedList
    ? block.children.map((child) =>
        createTextAtoms(child.numbered_list_item.rich_text)
      )
    : block.children.map((child) =>
        createTextAtoms(child.bulleted_list_item.rich_text)
      )

  return <List type={isOrderedList ? 'ordered' : 'unordered'}>{children}</List>
}
