import React from "react"
import PropTypes from "prop-types"
import RichText from "../RichText"

const TextColumnItem = ({ children, columnSize, ...props }) => {
  return (
    <RichText {...props} className={`h4 mb-2.5 w-6/12 px-2 font-bold ${columnSize}`}>
      {children}
    </RichText>
  )
}

TextColumnItem.propTypes = {
  children: PropTypes.node.isRequired,
  columnSize: PropTypes.string,
}

TextColumnItem.defaultProps = {
  columnSize: "md:w-2/12",
}

export default TextColumnItem
