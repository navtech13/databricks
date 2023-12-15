import React from "react"

const MainNavigationContext = React.createContext({
  setActiveSubmenu: () => {},
  activeSubmenu: {},
  desktopTop: null,
  setDesktopTop: () => {},
})

export default MainNavigationContext
