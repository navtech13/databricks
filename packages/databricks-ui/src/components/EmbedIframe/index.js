import React from "react"
import PropTypes from "prop-types"
import { ValueCalc } from "./ValueCalc"

export const EmbedIframe = ({ src, customTemplate }) => {
  if (customTemplate === "Value Calculator") {
    return <ValueCalc />
  }

  return (
    <div className='inner-wrapper'>
      <iframe height='800' src={src} width='100%' title={customTemplate} />
    </div>
  )
}

EmbedIframe.propTypes = {
  src: PropTypes.string,
  customTemplate: PropTypes.string.isRequired,
}
