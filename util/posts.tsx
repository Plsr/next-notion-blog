import { Client } from "@notionhq/client";
import { PageObjectResponse, PartialPageObjectResponse, ParagraphBlockObjectResponse, BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

const notion = new Client({
  auth: process.env.NOTION_AUTH,
});
const databaseId = process.env.DB_ID;

const SUPPORTED_BLOCKS = ['paragraph'];

export const foo = async () => {
  const res = await notion.databases.query({ database_id: databaseId! });
  const posts = publishedPosts(res.results)

  const blocks = await notion.blocks.children.list({ block_id: posts[0].id })
  return (
    <>{blocks.results.map(block => parseBlock(block as BlockObjectResponse))}</>
  )
  
}


const parseBlock = (block:  BlockObjectResponse) => {
  if (!SUPPORTED_BLOCKS.includes(block.type)) {
    console.warn(`Encountered unsupported block type: ${block.type}`)
    return null
  }

  // TODO: Map parse function to block type
  return parseParagraphBlock(block as ParagraphBlockObjectResponse)
}

const parseParagraphBlock = (block: ParagraphBlockObjectResponse) => {
  console.log('Parsing paragraph')
  console.log(block)
  const paragraph = block.paragraph.rich_text
  console.log(paragraph[0])
  return <p>{paragraph[0].plain_text}</p>
}

const publishedPosts = (pages: PageObjectResponse[] | PartialPageObjectResponse[]) => {
  return pages.filter(page => {
    const tags = (page as PageObjectResponse).properties["Tags"]
    return tags.type === 'multi_select' && tags.multi_select.find(entry => entry.name === 'published')
  })
}
