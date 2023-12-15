import React from "react"

// Base Layout Context for handling multiple sticky navs on the top of the page
const BaseLayoutContext = React.createContext({
  navTop: null,
  navHeight: null,
  addNavTop: () => {},
  delNavTop: () => {},
  setNavHeight: () => {},
  cookiesConsent: null,
})

export default BaseLayoutContext
