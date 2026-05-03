'use client'

import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter'
import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript'
import ts from 'react-syntax-highlighter/dist/esm/languages/hljs/typescript'
import bash from 'react-syntax-highlighter/dist/esm/languages/hljs/bash'
import python from 'react-syntax-highlighter/dist/esm/languages/hljs/python'
import css from 'react-syntax-highlighter/dist/esm/languages/hljs/css'
import json from 'react-syntax-highlighter/dist/esm/languages/hljs/json'

SyntaxHighlighter.registerLanguage('javascript', js)
SyntaxHighlighter.registerLanguage('typescript', ts)
SyntaxHighlighter.registerLanguage('bash', bash)
SyntaxHighlighter.registerLanguage('python', python)
SyntaxHighlighter.registerLanguage('css', css)
SyntaxHighlighter.registerLanguage('json', json)

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
