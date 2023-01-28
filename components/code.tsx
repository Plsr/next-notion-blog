import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import SyntaxHighlighter from 'react-syntax-highlighter'

type CodeProps = {
  code: string
  language: string
}

export const Code = ({ code, language }: CodeProps) => {
  // return (
  //   <SyntaxHighlighter language={language} style={docco}>
  //     {code}
  //   </SyntaxHighlighter>
  // )
  return <div>{code}</div>
}
