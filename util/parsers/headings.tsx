import { Headline } from '@/components/headline'
import {
  Heading1BlockObjectResponse,
  Heading2BlockObjectResponse,
  Heading3BlockObjectResponse,
} from '@notionhq/client/build/src/api-endpoints'
import { createTextAtoms } from './util'

export const parseHeading = (
  block:
    | Heading1BlockObjectResponse
    | Heading2BlockObjectResponse
    | Heading3BlockObjectResponse
) => {
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

  if (!text.length) return null

  const level = headlineLevels[block.type]

  return <Headline level={level}>{createTextAtoms(text)}</Headline>
}

const headlineLevels = {
  heading_1: 1,
  heading_2: 2,
  heading_3: 3,
}
