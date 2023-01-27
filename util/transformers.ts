import {
  BlockObjectResponse,
  BulletedListItemBlockObjectResponse,
  NumberedListItemBlockObjectResponse,
} from '@notionhq/client/build/src/api-endpoints'

export type CustomBlockObjectResponse =
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

export const transformBlocksList = (blockList: BlockObjectResponse[]) => {
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
