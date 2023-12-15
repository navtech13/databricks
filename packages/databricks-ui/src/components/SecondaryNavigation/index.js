import React, { useState } from "react"
import PropTypes from "prop-types"
import SecondaryNavigationMenu from "./SecondaryNavigationMenu"
import Icon from "../IconResolver"

const SecondaryNavigation = ({
  title,
  id,
  links,
  mobileLabel,
  className,
  ...props
}) => {
  const [mobile, setMobile] = useState(false)
  return (
    <nav
      data-cy='SecondaryNavigation'
      className={`bg-gray-warm-light lg:pt-8 ${className}`}
      aria-labelledby={id}
      {...props}
    >
      <div className='flex justify-between px-2 py-1.5 lg:pb-4 lg:pt-0'>
        <h2 className='h5 font-medium lg:font-bold' id={id}>
          {title}
        </h2>
        <button
          type='button'
          aria-expanded={mobile}
          aria-label={mobileLabel}
          className='text-orange-04 lg:hidden'
          onClick={() => setMobile(!mobile)}
        >
          <Icon token={mobile ? "close" : "chevronDown"} />
        </button>
      </div>
      <SecondaryNavigationMenu
        className={`${mobile ? "block" : "hidden"} lg:block`}
        links={links}
      />
    </nav>
  )
}

SecondaryNavigation.propTypes = {
  title: PropTypes.string.isRequired,
  links: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  id: PropTypes.string,
  className: PropTypes.string,
  mobileLabel: PropTypes.string,
}

SecondaryNavigation.defaultProps = {
  id: "secondary-nav",
  className: "",
  mobileLabel: "Toggle Mobile Menu",
}

export default SecondaryNavigation
