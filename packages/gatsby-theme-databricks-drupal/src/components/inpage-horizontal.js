import React, { useState } from "react"
import {
  InPageNavigationHorizontal,
  InPageNavigationVertical,
  InPageMobileMenu,
} from "databricks-ui"
import smoothScrollEffect from "../../../databricks-ui/src/utils/smoothScrollEffect"

const InPageHorizontal = ({ entity }) => {
  const [current, setCurrent] = useState(null)

  const links = entity.fieldLinks.map((item) => ({
    label: item?.title,
    to: item?.url?.path,
  }))

  // add autohighlight functionality
  smoothScrollEffect(links, setCurrent, null)

  const mobileMenu = (
    <InPageNavigationVertical links={links} current={current && `#${current}`} />
  )

  return (
    <InPageMobileMenu mobileMenu={mobileMenu}>
      <InPageNavigationHorizontal links={links} />
    </InPageMobileMenu>
  )
}

export default InPageHorizontal
