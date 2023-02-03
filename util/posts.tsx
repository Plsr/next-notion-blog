import { Client } from '@notionhq/client'
import {
  PageObjectResponse,
  BlockObjectResponse,
  QueryDatabaseParameters,
} from '@notionhq/client/build/src/api-endpoints'
import { parsePageContents } from './parsers/pages'

const notion = new Client({
  auth: process.env.NOTION_AUTH,
})
const databaseId = process.env.DB_ID

export const getPageData = async (id: string) => {
  const blocks = await notion.blocks.children.list({ block_id: id })
  const page = await notion.pages.retrieve({ page_id: id })

  const pageContent = parsePageContents(blocks.results as BlockObjectResponse[])
  const pageMetaData = getPageMetaData(page as PageObjectResponse)

  return {
    content: pageContent,
    metadata: { ...pageMetaData },
  }
}

const getPageMetaData = (page: PageObjectResponse) => {
  return {
    title: getPageTitle(page),
    publishedAt: getPagePublishedAt(page),
  }
}

type Filter = QueryDatabaseParameters['filter']

export const getPageByFilter = async ({ filter }: { filter: Filter }) => {
  const res = await notion.databases.query({
    database_id: databaseId!,
    filter,
  })

  if (res.results.length > 1) {
    return undefined
  }

  return await getPageData(res.results[0].id)
}

export const listPages = async ({
  filter = undefined,
}: {
  filter?: Filter
}) => {
  const res = await notion.databases.query({
    database_id: databaseId!,
    filter,
  })
  const posts = res.results as PageObjectResponse[]

  const postsList = posts
    .filter((posts) => posts.object === 'page')
    .map((post) => {
      return {
        title: getPageTitle(post),
        id: post.id,
        publishedAt: getPagePublishedAt(post),
        url: getPageUrl(post),
      }
    })
  return postsList.sort(
    (a, b) =>
      new Date(b.publishedAt).valueOf() - new Date(a.publishedAt).valueOf()
  )
}

const getPagePublishedAt = (page: PageObjectResponse) => {
  const publishedAtObject = page.properties.published_time

  if (publishedAtObject.type !== 'date' || !publishedAtObject.date)
    return new Date('01.02.1970').toDateString()
  return publishedAtObject.date.start
}

const getPageUrl = (page: PageObjectResponse) => {
  const urlObject = page.properties.url

  if (urlObject.type !== 'rich_text' || !urlObject.rich_text.length)
    return undefined
  return urlObject.rich_text[0].plain_text
}

const getPageTitle = (page: PageObjectResponse) => {
  const titleObject = Object.values(page.properties).find(
    (propertyObject) => propertyObject.type === 'title'
  )

  // Additional type check to make TS happy
  if (!titleObject || titleObject.type !== 'title') return undefined

  return titleObject.title[0].plain_text
}
