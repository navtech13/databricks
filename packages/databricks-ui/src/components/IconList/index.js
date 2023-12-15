import React from "react"
import PropTypes from "prop-types"
import IconResolver from "../IconResolver"
import Link from "../Link"

const IconList = ({ items, className, variant, basis, sameTab, ...props }) => {
  const variantMap = {
    A: "hover:text-navy-03 active:text-navy-02 text-navy-06",
    B: "hover:text-navy-01 active:text-navy-03 text-white",
  }

  return (
    <ul data-cy='IconList' className={`iconList flex flex-wrap gap-1.5 ${className}`} {...props}>
      {items?.map(({ icon, to }, i) => (
        <li
          key={icon}
          className={(i + 1) % basis === 0 ? "basis-1/3" : ""}
          data-cy='IconList-item'
        >
          <Link
            target={sameTab ? "" : "_blank"}
            rel='noopener noreferrer'
            className={`${variantMap[variant]} transition-colors duration-100`}
            to={to}
            aria-label={icon}
          >
            <IconResolver width='24px' height='24px' token={icon} />
          </Link>
        </li>
      ))}
    </ul>
  )
}

IconList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  className: PropTypes.string,
  basis: PropTypes.string,
  variant: PropTypes.oneOf(["A", "B"]),
  sameTab: PropTypes.bool,
}

IconList.defaultProps = {
  className: "",
  variant: "A",
  basis: "3",
  sameTab: false,
}

export default IconList
