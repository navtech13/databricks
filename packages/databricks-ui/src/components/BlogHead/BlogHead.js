import React from "react"
import PropTypes from "prop-types"
import RichText from "../RichText"

const BlogHead = ({ children, title, subtitle, ...props }) => {
  return (
    <header className='mb-2.5' {...props}>
      <h1 className='mb-4 font-medium'>{title}</h1>
      {subtitle && <RichText className='h2 my-4'>{subtitle}</RichText>}
      <div className='flex flex-col md:flex-row '>{children}</div>
    </header>
  )
}

BlogHead.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
}

BlogHead.defaultProps = {
  children: undefined,
  subtitle: undefined,
}

export default BlogHead
