/* eslint-disable */
import React, { useState, useEffect } from "react"
import getKnownLead from "../helpers/mktoLead"

const useKnownLead = () => {
  const [isKnownLead, setIsKnownLead] = useState(false)
  useEffect(() => {
    getKnownLead().then(
      (response) => response?.known && response?.subscribed && setIsKnownLead(true)
    )
  }, [])
  return isKnownLead
}

export { useKnownLead }
