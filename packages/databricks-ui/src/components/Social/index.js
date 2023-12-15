import React from "react"
import PropTypes from "prop-types"
import TextLink from "../TextLink"
import RichText from "../RichText"
import IconResolver from "../IconResolver"

const Social = ({ children, items, className, ...props }) => {
  return (
    <div
      className={`border-navy-01 flex items-center justify-between border-t pt-1 ${className}`}
      {...props}
    >
      <RichText className='b5'>{children}</RichText>
      <ul className='flex pl-4' data-cy='Social'>
        {items.map(({ token, label, to }) => {
          return (
            <TextLink
              key={to}
              variant='a'
              target='_blank'
              to={to}
              role='listitem'
              className='flex items-center pl-2.5'
              aria-label={label}
            >
              <IconResolver
                className='text-navy-03 hover:text-navy-06 h-auto w-2.5 transition-colors duration-200'
                token={token}
              />
            </TextLink>
          )
        })}
      </ul>
    </div>
  )
}

Social.propTypes = {
  children: PropTypes.node.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.shape({
        alt: PropTypes.string.isRequired,
      }).isRequired,
      to: PropTypes.string.isRequired,
    })
  ).isRequired,
  className: PropTypes.string,
}

Social.defaultProps = {
  className: "",
}

export default Social
