import React from "react"
import PropTypes from "prop-types"
import { Button, ContentWrapper, Image } from "databricks-ui"
import { Link } from "gatsby"
import logo from "../../../databricks-ui/static/images/wt/wtLogo.svg"
import dbLogo from "../../../databricks-ui/static/images/wt/dbLogo.svg"

const HeaderWT = ({}) => {
  return (
     <div className='bg-navy-06 w-full lg:fixed lg:z-20 lg:top-0'>
      <ContentWrapper>
        <div className='flex min-h-[92px] items-center justify-between'>
          <div className='flex w-1/3 items-center justify-between'>
            <Link to='/dataaisummit/worldtour'>
              <Image className='max-w-[181px]' src={logo} />
            </Link>
            <Link to='https://www.databricks.com'>
              <Image className='hidden max-w-[151px] lg:block' src={dbLogo} />
            </Link>
          </div>
          <div className='text-align-right w-1/2 md:w-1/4'>
            <Button as={Link} to='#locations' variant='whiteRounded'>
              Explore events
            </Button>
          </div>
        </div>
      </ContentWrapper>
    </div>
  )
}

HeaderWT.propTypes = {}

export default HeaderWT
