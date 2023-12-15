import React from "react"

const LayoutContext = React.createContext({
  setHoverActive: () => {},
  mobileOpen: "none",
  setMobileOpen: () => {},
})

export default LayoutContext
