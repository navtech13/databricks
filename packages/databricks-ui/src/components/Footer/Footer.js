import React from "react"
import PropTypes from "prop-types"

const Footer = ({ children, ...props }) => {
  return (
    <footer
      data-cy='Footer'
      className='site-footer bg-navy-06 px-2 text-white'
      {...props}
    >
      <div className='xxl:max-w-[1456px] mx-auto max-w-[508px] pt-5 pb-6 md:max-w-[704px] lg:max-w-[966px] lg:py-8 xl:max-w-[1146px] '>
        {children}
      </div>
    </footer>
  )
}

Footer.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Footer
