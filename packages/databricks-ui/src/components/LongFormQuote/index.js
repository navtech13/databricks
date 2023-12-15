import React from "react"
import PropTypes from "prop-types"
import RichText from "../RichText"
import IconResolver from "../IconResolver"

const LongFormQuote = ({ children, source, ...props }) => {
  return (
    <blockquote {...props} data-cy='LongFormQuote'>
      <IconResolver aria-hidden token='quote' className='text-orange-04 -mb-0.5' />
      <div className='border-orange-04 ml-2 mb-4 border-b' />
      <RichText className='h3 mb-4'>{children}</RichText>
      <RichText className='h4 mb-4'>{source}</RichText>
      <IconResolver aria-hidden token='quote' className='text-orange-04 -mb-0.5' />
      <div className='border-orange-04 ml-2 border-b' />
    </blockquote>
  )
}

LongFormQuote.propTypes = {
  children: PropTypes.node.isRequired,
  source: PropTypes.string.isRequired,
}

export default LongFormQuote
