import React from "react"
import PropTypes from "prop-types"
import {
  createMemorySource,
  createHistory,
  LocationProvider as ReachProvider,
} from "@reach/router"

const LocationProvider = ({ children }) => {
  // for some types of tests you want a memory source
  const source = createMemorySource("/")
  const history = createHistory(source)

  return <ReachProvider history={history}>{children}</ReachProvider>
}

LocationProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default LocationProvider
