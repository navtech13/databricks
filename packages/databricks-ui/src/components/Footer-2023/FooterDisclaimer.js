import React from "react"
import PropTypes from "prop-types"
import RichText from "../RichText"
import TextLink from "../TextLink"

const OneTrustClickHandler = (e) => {
  e.preventDefault()
  if (typeof OneTrust !== "undefined") {
    // eslint-disable-next-line no-undef
    OneTrust.ToggleInfoDisplay()
  }
}
const FooterDisclaimer = ({ children, links, ...props }) => {
  return (
    <div className='b7 footer-region lg:w-10/12' {...props}>
      <RichText className='border-navy-04 mb-1 border-b pb-1 lg:mb-1 lg:pb-1'>
        <div className='footer-disclaimer max-w-[405px] md:max-w-full'>
          {children}
        </div>
      </RichText>
      {links && (
        <ul>
          {links.map((item, index) => {
            const additionalClassNamesStr =
              item.to && item.to.includes("#yourprivacychoices")
                ? `db${item.to.replace(/[^A-Za-z0-9]/g, "")}`
                : ""
            const clickHandler =
              additionalClassNamesStr === "" ? undefined : OneTrustClickHandler
            return (
              <li key={item.to} className='inline-block'>
                {index > 0 && <span aria-hidden>|</span>}
                <TextLink
                  className={`tertiary-underline mx-1 text-white first:ml-0 hover:text-white ${additionalClassNamesStr}`}
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
              className='dbgpcicon inline-block max-h-[15px] w-auto'
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
