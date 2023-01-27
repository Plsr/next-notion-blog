import { Paragraph } from '@/components/paragraph'
import { ParagraphBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import { createTextAtoms } from './util'

export const parseParagraphBlock = (block: ParagraphBlockObjectResponse) => {
  const paragraph = block.paragraph.rich_text
  if (!paragraph.length) return null

  return <Paragraph>{createTextAtoms(paragraph)}</Paragraph>
}
