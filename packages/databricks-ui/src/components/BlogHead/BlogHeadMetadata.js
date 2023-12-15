import React from "react"
import PropTypes from "prop-types"
import RichText from "../RichText"

const BlogHeadMetadata = ({ children, ...props }) => {
  return (
    <RichText className='h6' {...props}>
      {children}
    </RichText>
  )
}

BlogHeadMetadata.propTypes = {
  children: PropTypes.node.isRequired,
}

export default BlogHeadMetadata
