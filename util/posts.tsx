import { Code } from '@/components/code'
import { Client } from '@notionhq/client'
import {
  PageObjectResponse,
  PartialPageObjectResponse,
  BlockObjectResponse,
} from '@notionhq/client/build/src/api-endpoints'
import { isConstructorDeclaration } from 'typescript'
import { parsePage } from './parsers/pages'

const notion = new Client({
  auth: process.env.NOTION_AUTH,
})
const databaseId = process.env.DB_ID

export const getPage = async (id: string) => {
  const blocks = await notion.blocks.children.list({ block_id: id })
  const results = blocks.results
  return parsePage(results as BlockObjectResponse[])
}

export const listPages = async () => {
  const res = await notion.databases.query({ database_id: databaseId! })
  const posts = publishedPosts(res.results) as PageObjectResponse[]
  const postsList = posts
    .filter((posts) => posts.object === 'page')
    .map((post) => {
      return {
        title: getPageTitle(post),
        id: post.id,
        publishedAt: getPagePublishedAt(post),
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
    return new Date('01.02.1970')
  return publishedAtObject.date.start
}

const getPageTitle = (page: PageObjectResponse) => {
  const titleObject = Object.values(page.properties).find(
    (propertyObject) => propertyObject.type === 'title'
  )

  // Additional type check to make TS happy
  if (!titleObject || titleObject.type !== 'title') return undefined

  return titleObject.title[0].plain_text
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
