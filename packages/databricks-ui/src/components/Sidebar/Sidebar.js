import React from "react"
import PropTypes from "prop-types"
import Image from "../Image"
import Link from "../Link"

const Sidebar = ({ image, children, className, ...props }) => {
  return (
    <nav className={`bg-nav-gray fixed h-full w-20 py-4 ${className}`} {...props}>
      <Link aria-label={image.alt} to={image.to}>
        <Image className='mb-4 px-2.5' src={image.src} alt={image.alt} />
      </Link>
      {children}
    </nav>
  )
}

Sidebar.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  image: PropTypes.shape({
    src: PropTypes.string,
    alt: PropTypes.string,
    to: PropTypes.string,
  }).isRequired,
}

Sidebar.defaultProps = {
  className: "",
}

export default Sidebar
