'use client'

import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import SyntaxHighlighter from 'react-syntax-highlighter'

type CodeProps = {
  code: string
  language: string
}

export const Code = ({ code, language }: CodeProps) => {
  return (
    <div className="mb-4">
      <SyntaxHighlighter
        customStyle={{ fontSize: '0.8rem' }}
        language={language}
        style={docco}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  )
}
