import React from "react"
import PropTypes from "prop-types"
import Link from "../Link"
import RichText from "../RichText"

const Breadcrumbs = ({ items, ariaLabel, enableLastLink, ...props }) => {
  return (
    <nav data-cy='Breadcrumbs' className='Breadcrumbs' aria-label={ariaLabel} {...props}>
      <ol className='h6 flex items-center' data-cy='Breadcrumbs-list'>
        {items.map(({ to, text }, index) => {
          return (
            <li key={text} className='flex items-center' data-cy='Breadcrumbs-item'>
              {index > 0 && (
                <RichText aria-hidden className='px-0.5'>
                  {">"}
                </RichText>
              )}
              {index + 1 === items.length && !enableLastLink ? (
                <RichText>{text}</RichText>
              ) : (
                <Link
                  className='text-navy-06 hover:text-orange-04  cursor-pointer'
                  label={text}
                  to={to}
                >
                  {text}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

Breadcrumbs.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      to: PropTypes.string,
      text: PropTypes.string,
    })
  ).isRequired,
  ariaLabel: PropTypes.string,
  enableLastLink: PropTypes.bool,
}

Breadcrumbs.defaultProps = {
  ariaLabel: "Breadcrumb Navigation",
  enableLastLink: false,
}

export default Breadcrumbs
