import { Quote } from '@/components/quote'
import { QuoteBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import { createTextAtoms } from './util'

export const parseQuote = (block: QuoteBlockObjectResponse) => {
  return <Quote>{createTextAtoms(block.quote.rich_text)}</Quote>
}
