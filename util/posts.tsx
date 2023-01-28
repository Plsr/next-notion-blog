import { Code } from '@/components/code'
import { Client } from '@notionhq/client'
import {
  PageObjectResponse,
  PartialPageObjectResponse,
  ParagraphBlockObjectResponse,
  BlockObjectResponse,
} from '@notionhq/client/build/src/api-endpoints'
import { parseHeading } from './parsers/headings'
import { parseImages } from './parsers/images'
import { parseList } from './parsers/lists'
import { parseParagraphBlock } from './parsers/paragraphs'
import { parseQuote } from './parsers/quote'
import { CustomBlockObjectResponse, transformBlocksList } from './transformers'

const notion = new Client({
  auth: process.env.NOTION_AUTH,
})
const databaseId = process.env.DB_ID

const HEADING_BLOCKS = ['heading_1', 'heading_2', 'heading_3']
const SUPPORTED_BLOCKS = [
  'paragraph',
  ...HEADING_BLOCKS,
  'unordered_list',
  'ordered_list',
  'quote',
  'image',
  'code',
]

export const foo = async () => {
  const res = await notion.databases.query({ database_id: databaseId! })
  const posts = publishedPosts(res.results)

  const blocks = await notion.blocks.children.list({ block_id: posts[0].id })
  const results = blocks.results

  const transformedBlocks = transformBlocksList(
    results as BlockObjectResponse[]
  )
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
    console.log(block.code.rich_text)
    return (
      <Code
        code={block.code.rich_text[0].plain_text}
        language={block.code.language}
      />
    )
  }
}

const publishedPosts = (
  pages: PageObjectResponse[] | PartialPageObjectResponse[]
) => {
  return pages.filter((page) => {
    const tags = (page as PageObjectResponse).properties['Tags']
    return (
      tags.type === 'multi_select' &&
      tags.multi_select.find((entry) => entry.name === 'published')
    )
  })
}
