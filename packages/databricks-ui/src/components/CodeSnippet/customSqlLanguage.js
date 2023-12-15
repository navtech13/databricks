const customSqlLanguage = () => {
  return {
    subLanguage: "sql",
    contains: [
      {
        className: "keyword",
        begin: "CREATE VOLUME",
        end: / /,
      },
    ],
  }
}

export default customSqlLanguage
