import React from "react"
import PropTypes from "prop-types"
import { ContentWrapper, Image } from "databricks-ui"
import { Link } from "gatsby"
import dbLogo from "../../../databricks-ui/static/images/wt/databricksLogo.svg"

const FooterWT = ({}) => {
  function OneTrustClickHandler(e) {
    e.preventDefault()
    if (typeof OneTrust !== "undefined") {
      // eslint-disable-next-line no-undef
      OneTrust.ToggleInfoDisplay()
    }
  }

  return (
    <div className='bg-navy-06 w-full pt-2.5'>
      <ContentWrapper>
        <div className='flex min-h-[92px] items-center justify-between py-5'>
          <Link to='https://www.databricks.com'>
            <Image src={dbLogo} />
          </Link>
        </div>
        <div className='border-gray-warm-light border-t pt-5 text-white'>
          <div className='flex flex-col gap-4 md:flex-row md:items-center'>
            <Link to='/dataaisummit/worldtour/events-policy' className='text-white'>
              Events Policy
            </Link>
            <Link
              to='/dataaisummit/worldtour/code-of-conduct'
              className='text-white'
            >
              Code of Conduct
            </Link>
            <Link to='/privacypolicy' className='text-white'>
              Privacy Policy
            </Link>
            <Link to='/legal/terms-of-use' className='text-white'>
              Terms of Use
            </Link>
            <Link className='text-white' to='#' onClick={OneTrustClickHandler}>
              Your Privacy Choices
            </Link>
            <Link
              className='text-white'
              to='https://www.databricks.com/legal/privacynotice#dbadditionalinformation'
            >
              Your California Privacy Rights
            </Link>
            <img
              alt='Global Privacy Control Icon'
              src='https://www.databricks.com/sites/default/files/2022-12/gpcicon_tiny.png'
              data-ot-ignore='1'
              className='inline-block h-2 w-4'
            />
          </div>
          <p className='text-1.25 py-5'>
            &copy; Databricks 2023. All rights reserved. Apache, Apache Spark, Spark,
            and the Spark logo are trademarks of the Apache Software Foundation. The
            Apache Software Foundation has no affiliation with and does not endorse
            the materials provided at this event.
          </p>
        </div>
      </ContentWrapper>
    </div>
  )
}

FooterWT.propTypes = {}

export default FooterWT
