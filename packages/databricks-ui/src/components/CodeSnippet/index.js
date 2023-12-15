import React from "react"
import PropTypes from "prop-types"
import { Light as SyntaxHighlighter } from "react-syntax-highlighter"

import js from "react-syntax-highlighter/dist/esm/languages/hljs/javascript"
import php from "react-syntax-highlighter/dist/esm/languages/hljs/php"
import py from "react-syntax-highlighter/dist/esm/languages/hljs/python"
import java from "react-syntax-highlighter/dist/esm/languages/hljs/java"
import sql from "react-syntax-highlighter/dist/esm/languages/hljs/sql"
import shell from "react-syntax-highlighter/dist/esm/languages/hljs/bash"
import customSqlLanguage from "./customSqlLanguage"

import theme from "./theme"

SyntaxHighlighter.registerLanguage("javascript", js)
SyntaxHighlighter.registerLanguage("php", php)
SyntaxHighlighter.registerLanguage("python", py)
SyntaxHighlighter.registerLanguage("java", java)
SyntaxHighlighter.registerLanguage("sql", sql)
SyntaxHighlighter.registerLanguage("shell", shell)
SyntaxHighlighter.registerLanguage("db-sql", customSqlLanguage)

const CodeSnippet = ({ children, language, ...props }) => {
  const formattedChildren = children.replace(/^\n+|\n+$/g, "")

  return (
    <SyntaxHighlighter language={language} style={theme} {...props}>
      {formattedChildren}
    </SyntaxHighlighter>
  )
}

CodeSnippet.propTypes = {
  language: PropTypes.string,
  children: PropTypes.node.isRequired,
}

CodeSnippet.defaultProps = {
  language: undefined,
}
export default CodeSnippet
