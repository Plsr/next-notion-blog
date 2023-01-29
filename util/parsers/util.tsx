import { TextAtom } from '@/components/textAtom'
import { RichTextItemResponse } from '@notionhq/client/build/src/api-endpoints'
import { validateHref } from './paragraphs'

export const createTextAtoms = (textParts: RichTextItemResponse[]) => {
  return textParts.map((textParts, index) => {
    const validatedHref = validateHref(textParts.href)

    return (
      <TextAtom
        key={textParts.plain_text + index}
        italic={textParts.annotations.italic}
        bold={textParts.annotations.bold}
        underline={textParts.annotations.underline}
        strikethrough={textParts.annotations.strikethrough}
        code={textParts.annotations.code}
        href={validatedHref}
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
