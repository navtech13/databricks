import React from "react"
import PropTypes from "prop-types"
import TextLink from "../TextLink"
import RichText from "../RichText"

const Pagination = ({ children, previousLink, nextLink, ...props }) => {
  return (
    <div data-cy='Pagination' className='h6 flex items-center' {...props}>
      {previousLink && (
        <TextLink variant='A' {...previousLink}>
          {"<"}
        </TextLink>
      )}
      <RichText className='text-orange-04 px-0.5'>{children}</RichText>
      {nextLink && (
        <TextLink variant='A' {...nextLink}>
          {">"}
        </TextLink>
      )}
    </div>
  )
}

Pagination.propTypes = {
  children: PropTypes.node.isRequired,
  previousLink: PropTypes.shape({}),
  nextLink: PropTypes.shape({}),
}

Pagination.defaultProps = {
  previousLink: undefined,
  nextLink: undefined,
}

export default Pagination
