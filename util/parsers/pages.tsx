import { Code } from '@/components/code'
import {
  BlockObjectResponse,
  ParagraphBlockObjectResponse,
} from '@notionhq/client/build/src/api-endpoints'
import { CustomBlockObjectResponse, transformBlocksList } from '../transformers'
import { parseHeading } from './headings'
import { parseImages } from './images'
import { parseList } from './lists'
import { parseParagraphBlock } from './paragraphs'
import { parseQuote } from './quote'
import { parseTodos } from './todos'

const HEADING_BLOCKS = ['heading_1', 'heading_2', 'heading_3']
const SUPPORTED_BLOCKS = [
  'paragraph',
  ...HEADING_BLOCKS,
  'unordered_list',
  'ordered_list',
  'quote',
  'image',
  'code',
  'to_do',
]

export const parsePageContents = (page: BlockObjectResponse[]) => {
  const transformedBlocks = transformBlocksList(page)
  return (
    <>
      {transformedBlocks.map((block) =>
        parseBlock(block as CustomBlockObjectResponse)
      )}
    </>
  )
}

const parseBlock = (block: CustomBlockObjectResponse) => {
  if (!SUPPORTED_BLOCKS.includes(block.type)) {
    console.warn(`Encountered unsupported block type: ${block.type}`)
    return null
  }

  // TODO: Map parse function to block type
  if (block.type === 'paragraph') {
    return parseParagraphBlock(block as ParagraphBlockObjectResponse)
  }

  if (
    block.type === 'heading_1' ||
    block.type === 'heading_2' ||
    block.type === 'heading_3'
  ) {
    return parseHeading(block)
  }

  if (block.type === 'unordered_list' || block.type === 'ordered_list') {
    return parseList(block)
  }

  if (block.type === 'quote') {
    return parseQuote(block)
  }

  if (block.type === 'image') {
    return parseImages(block)
  }

  if (block.type === 'code') {
    return (
      <Code
        code={block.code.rich_text[0].plain_text}
        language={block.code.language}
      />
    )
  }

  if (block.type === 'to_do') {
    return parseTodos(block)
  }
}
