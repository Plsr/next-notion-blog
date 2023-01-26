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
} from '@notionhq/client/build/src/api-endpoints'

const notion = new Client({
  auth: process.env.NOTION_AUTH,
})
const databaseId = process.env.DB_ID

const SUPPORTED_BLOCKS = ['paragraph', 'heading_1', 'heading_2', 'heading_3']

export const foo = async () => {
  const res = await notion.databases.query({ database_id: databaseId! })
  const posts = publishedPosts(res.results)

  const blocks = await notion.blocks.children.list({ block_id: posts[0].id })
  return (
    <>
      {blocks.results.map((block) => parseBlock(block as BlockObjectResponse))}
    </>
  )
}

const parseBlock = (block: BlockObjectResponse) => {
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
}

const parseHeading = (
  block:
    | Heading1BlockObjectResponse
    | Heading2BlockObjectResponse
    | Heading3BlockObjectResponse
) => {
  console.log(block)
  let text
  switch (block.type) {
    case 'heading_1':
      text = block.heading_1.rich_text
      break
    case 'heading_2':
      text = block.heading_2.rich_text
      break
    case 'heading_3':
      text = block.heading_3.rich_text
      break
  }

  console.log(text)

  if (!text.length) return null

  const level = headlineLevels[block.type]

  return <Headline level={level}>{createTextAtoms(text)}</Headline>
}

const headlineLevels = {
  heading_1: 1,
  heading_2: 2,
  heading_3: 3,
}

const parseParagraphBlock = (block: ParagraphBlockObjectResponse) => {
  const paragraph = block.paragraph.rich_text
  if (!paragraph.length) return null

  return <Paragraph>{createTextAtoms(paragraph)}</Paragraph>
}

const createTextAtoms = (textParts: RichTextItemResponse[]) => {
  return textParts.map((textParts, index) => {
    return (
      <TextAtom
        key={textParts.plain_text + index}
        italic={textParts.annotations.italic}
        bold={textParts.annotations.bold}
        underline={textParts.annotations.underline}
        strikethrough={textParts.annotations.strikethrough}
        code={textParts.annotations.code}
        href={textParts.href || undefined}
      >
        {textWithLinebraks(textParts.plain_text)}
      </TextAtom>
    )
  })
}

const textWithLinebraks = (text: string) => {
  const textArray = text.split('\n')
  return textArray.map((text, index) =>
    index === 0 ? (
      <>{text}</>
    ) : (
      <>
        <br />
        {text}
      </>
    )
  )
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
