import React from "react"

// Lazy loading PricingContext causes build issues, look for alternative implementation
const PricingContext = React.createContext({
  cloud: null,
  setCloud: () => {},
  plan: null,
  setPlan: () => {},
  region: null,
  setRegion: () => {},
  availableRadioButtons: null,
  setAvailableRadioButtons: () => {},
})

export default PricingContext
