import React from "react"
import { Script } from "gatsby"

// eslint-disable-next-line import/prefer-default-export
export const wrapPageElement = ({ element }) => {
  return (
    <>
      {element}
      <Script
        key='utms-script'
        src='https://www.databricks.com/sites/default/files/utm/db-utms.js?v=1.1'
      />
    </>
  )
}
