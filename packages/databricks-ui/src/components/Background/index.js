import React from "react"
import PropTypes from "prop-types"
import backgroundLeft from "../../../static/images/bg-variant-1.svg"
import backgroundRight from "../../../static/images/bg-variant-2.svg"

const backgroundMaps = {
  anchored_left: `url(${backgroundLeft})`,
  anchored_right: `url(${backgroundRight})`,
}

const Background = ({ children, variant }) => {
  return (
    <div
      style={{
        backgroundImage: backgroundMaps[variant] || "none",
      }}
      className='relative overflow-hidden bg-[length:100%_auto] bg-[center_top_282px] bg-no-repeat'
    >
      {children}
    </div>
  )
}

Background.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(["disabled", "anchored_left", "anchored_right"]),
}

Background.defaultProps = {
  variant: "disabled",
}

export default Background
