import React from "react"
import PropTypes from "prop-types"
import RichText from "../RichText"
import TextLink from "../TextLink"

/*
  Special case for Footer: If #yourprivacychoices, add classname to link to match WP classnames
*/
const FooterDisclaimer = ({ children, links, ...props }) => {
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
    <div className='b7 footer-region' {...props}>
      <RichText className='border-navy-04 mb-2.5 border-b pb-2.5 lg:mb-1 lg:pb-1'>
        <div className='max-w-[405px] lg:max-w-full'>{children}</div>
      </RichText>
      {links && (
        <ul>
          {links.map((item, i) => {
            const additionalClassNamesArray = []
            let additionalClassNamesStr = ""
            // eslint-disable-next-line no-undef-init
            let clickHandler = undefined
            if (item.to && item.to.includes("#yourprivacychoices")) {
              additionalClassNamesArray.push(
                `db${item.to.replace(/[^A-Za-z0-9]/g, "")}`
              )
              clickHandler = OneTrustClickHandler
            }
            additionalClassNamesStr = additionalClassNamesArray.join(" ")
            return (
              <li key={item.to} className='inline-block'>
                {i > 0 && <span aria-hidden>|</span>}
                <TextLink
                  className={`hover:text-orange-04 mx-1 text-white transition-all duration-200 ease-in-out first:ml-0 ${additionalClassNamesStr}`}
                  variant='A'
                  to={item.to}
                  label={item.label}
                  onClickCallback={clickHandler}
                >
                  {item.label}
                </TextLink>
              </li>
            )
          })}
          <li key='dbgpcicon' className='inline-block'>
            <img
              alt='Global Privacy Control Icon'
              src='https://www.databricks.com/sites/default/files/2022-12/gpcicon_small.png'
              data-ot-ignore='1'
              className='dbgpcicon inline-block max-h-2 w-auto'
              width='31'
              height='15'
            />
          </li>
        </ul>
      )}
    </div>
  )
}

FooterDisclaimer.propTypes = {
  children: PropTypes.node.isRequired,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      to: PropTypes.string,
    })
  ),
}

FooterDisclaimer.defaultProps = {
  links: undefined,
}

export default FooterDisclaimer
