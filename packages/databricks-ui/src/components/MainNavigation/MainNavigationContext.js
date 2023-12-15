import React from "react"

const MainNavigationContext = React.createContext({
  setHoverActive: () => {},
  mobileOpen: "none",
  setMobileOpen: () => {},
  top: null,
  setTop: () => {},
})

export default MainNavigationContext
