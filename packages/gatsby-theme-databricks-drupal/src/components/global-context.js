import { createContext } from "react"

const GlobalContext = createContext({
  context: {},
  setContext: () => {},
})

export default GlobalContext
