import { Figure } from '@/components/figure'
import { ImageBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import { createTextAtoms } from './util'

export const parseImages = (block: ImageBlockObjectResponse) => {
  // We only support file type images for now
  if (block.image.type !== 'file') return null

  return (
    <Figure
      src={block.image.file.url}
      caption={createTextAtoms(block.image.caption)}
    />
  )
}
