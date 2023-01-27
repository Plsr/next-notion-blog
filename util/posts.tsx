import { Headline } from '@/components/headline'
import { Paragraph } from '@/components/paragraph'
import { TextAtom } from '@/components/textAtom'
import { Client } from '@notionhq/client'
import {
  PageObjectResponse,
  PartialPageObjectResponse,
  ParagraphBlockObjectResponse,
  BlockObjectResponse,
  Heading1BlockObjectResponse,
  Heading2BlockObjectResponse,
  Heading3BlockObjectResponse,
  RichTextItemResponse,
  NumberedListItemBlockObjectResponse,
  BulletedListItemBlockObjectResponse,
} from '@notionhq/client/build/src/api-endpoints'
import { parseHeading } from './parsers/headings'
import { parseList } from './parsers/lists'
import { parseParagraphBlock } from './parsers/paragraphs'
import { createTextAtoms } from './parsers/util'

const notion = new Client({
  auth: process.env.NOTION_AUTH,
})
const databaseId = process.env.DB_ID

const HEADING_BLOCKS = [
  'heading_1',
  'heading_2',
  'heading_3',
  'unordered_list',
  'ordered_list',
]
const SUPPORTED_BLOCKS = ['paragraph', ...HEADING_BLOCKS]

export const foo = async () => {
  const res = await notion.databases.query({ database_id: databaseId! })
  const posts = publishedPosts(res.results)

  const blocks = await notion.blocks.children.list({ block_id: posts[0].id })
  const results = blocks.results
  // console.log(blocks.results)
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

type CustomBlockObjectResponse =
  | BlockObjectResponse
  | UnorderedListBlockObjectResponse
  | OrderedListBlockObjectResponse

export type UnorderedListBlockObjectResponse = {
  type: 'unordered_list'
  children: BulletedListItemBlockObjectResponse[]
}
export type OrderedListBlockObjectResponse = {
  type: 'ordered_list'
  children: NumberedListItemBlockObjectResponse[]
}

// From: [p, p, h, p, bli, bli, bli, p, bli, bli, bli]
// To: [p, p, h, p, ul, p, ul]
// TODO: Refactor
// TODO: Finde a better place for this
// TODO: Document
const transformBlocksList = (blockList: BlockObjectResponse[]) => {
  const listIndizes: {
    type: string
    indizes: number[]
    blocks: BlockObjectResponse[]
  }[] = [] // Groups of indizes, may need objects here bc need type
  const skipIndizes: number[] = [] // flat array, just so we don't do dup stuff

  blockList.forEach((block, index) => {
    if (
      (block.type === 'bulleted_list_item' ||
        block.type === 'numbered_list_item') &&
      !skipIndizes.includes(index)
    ) {
      console.log('Will need to combine some blocks here')
      const startingIndex = index
      const currentType = block.type
      const slicedBlocksList = blockList.slice(startingIndex)
      const indizes = [startingIndex]

      for (let i = 1; i < slicedBlocksList.length; i++) {
        if (slicedBlocksList[i].type !== currentType) break
        indizes.push(startingIndex + i)
      }

      listIndizes.push({
        type: currentType,
        indizes,
        blocks: indizes.map((i) => blockList[i]),
      })
      skipIndizes.push(...indizes)
    }
  })

  const blockListCopy = [...blockList] as CustomBlockObjectResponse[]
  let deletedIndizesCount = 0 // If we remove from the array, we need to adapt the following indizes
  listIndizes.forEach((index) => {
    blockListCopy.splice(
      index.indizes[0] - deletedIndizesCount,
      index.indizes.length,
      {
        type:
          index.type === 'bulleted_list_item'
            ? 'unordered_list'
            : 'ordered_list',
        children: index.blocks,
      } as UnorderedListBlockObjectResponse | OrderedListBlockObjectResponse
    )
    deletedIndizesCount += index.indizes.length - 1
  })

  return blockListCopy
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
