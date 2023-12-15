import React, { useState } from "react"
import PropTypes from "prop-types"
import LayoutContext from "./LayoutContext"
import { FooterBlock, MainNavigationBlock } from "../../blocks"
// import "@fontsource/dm-sans"
// import "@fontsource/dm-mono"
// import "@fontsource/inter"

const Layout = ({ mainNavigation, footer, children }) => {
  const [mobileOpen, setMobileOpen] = useState("none")
  const [hoverActive, setHoverActive] = useState(false)
  const [top, setTop] = useState(false)

  return (
    <LayoutContext.Provider
      value={{ mobileOpen, setMobileOpen, setHoverActive, top, setTop }}
    >
      <MainNavigationBlock {...mainNavigation} />
      <div
        aria-hidden
        className={
          hoverActive
            ? "lg:bg-nav-gray right-0 top-0 bottom-0 left-0 z-10 lg:fixed lg:bg-opacity-60"
            : " "
        }
      />
      <div className='lg:ml-20'>
        {children}
        <FooterBlock {...footer} />
      </div>
    </LayoutContext.Provider>
  )
}

Layout.propTypes = {
  mainNavigation: PropTypes.shape({}).isRequired,
  footer: PropTypes.shape({}).isRequired,
  children: PropTypes.node.isRequired,
}

Layout.defaultProps = {}

export default Layout
