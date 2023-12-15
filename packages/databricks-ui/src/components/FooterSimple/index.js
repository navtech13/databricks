import React from "react"
import PropTypes from "prop-types"
import Link from "../Link"

const FooterSimple = ({ items, className, ...props }) => {
  // eslint-disable-next-line no-lone-blocks
  {
    /* TODO: Figure out more elegant way to handle OneTrust click events instead of hardcoding into this component */
  }
  function OneTrustClickHandler(e) {
    e.preventDefault()
    if (typeof OneTrust !== "undefined") {
      // eslint-disable-next-line no-undef
      OneTrust.ToggleInfoDisplay()
    }
  }

  return (
    <footer
      data-cy='FooterSimple'
      className='b7 text-navy-02 flex flex-wrap justify-center gap-2 px-2.5 py-2.5'
      {...props}
    >
      {items.map(({ label, to }) => {
        if (to) {
          const additionalClassNamesArray = []
          let additionalClassNamesStr = ""
          // eslint-disable-next-line no-undef-init
          let clickHandler = undefined
          if (to && to.includes("#yourprivacychoices")) {
            additionalClassNamesArray.push(`db${to.replace(/[^A-Za-z0-9]/g, "")}`)
            clickHandler = OneTrustClickHandler
          }
          additionalClassNamesStr = additionalClassNamesArray.join(" ")
          return (
            <Link
              key={label}
              className={`text-navy-02 ${additionalClassNamesStr}`}
              to={to}
              onClick={clickHandler}
            >
              {label}
            </Link>
          )
        }
        return <div key={label}>{label}</div>
      })}
      <div>
        <img
          alt='Global Privacy Control Icon'
          src='https://www.databricks.com/sites/default/files/2022-12/gpcicon_small.png'
          data-ot-ignore='1'
          className='dbgpcicon inline-block max-h-2 w-auto'
        />
      </div>
    </footer>
  )
}

FooterSimple.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      to: PropTypes.string,
    })
  ).isRequired,
  className: PropTypes.string,
}

FooterSimple.defaultProps = {
  className: "",
}

export default FooterSimple
