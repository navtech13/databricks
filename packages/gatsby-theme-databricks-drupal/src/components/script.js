import React from "react"
import { Script } from "gatsby"
import { gtmHead } from "../scripts/gtm"
import { munchkinHead } from "../scripts/munchkin"

const ScriptComponent = () => {
  return (
    <>
      <Script key='munchkinScript' src={munchkinHead} type='text/javascript' />
      <Script key='maxmind' src='//js.maxmind.com/js/apis/geoip2/v2.1/geoip2.js' />
      {process.env.GATSBY_GTM_ID && process.env.GATSBY_GTM_ID !== "DISABLED" && (
        <Script
          key='gtmScript'
          dangerouslySetInnerHTML={{ __html: gtmHead }}
          className='optanon-category-C0001'
        />
      )}
    </>
  )
}

export default ScriptComponent
