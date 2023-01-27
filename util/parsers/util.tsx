import { TextAtom } from '@/components/textAtom'
import { RichTextItemResponse } from '@notionhq/client/build/src/api-endpoints'

export const createTextAtoms = (textParts: RichTextItemResponse[]) => {
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
