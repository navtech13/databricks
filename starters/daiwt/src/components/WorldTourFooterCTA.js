import { Button, Wrapper } from "databricks-ui"
import { Link } from "gatsby"
import React from "react"
import ctaImage from "../images/wt-cta-bg.svg"

function WorldTourFooterCTA() {
  return (
    <Wrapper>
      <div
        className='relative m-auto flex w-full flex-col items-center border'
        style={{
          minHeight: "177px",
          justifyContent: "space-evenly",
          backgroundImage: `url("${ctaImage}")`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          top: "60px",
        }}
      >
        <h3>Register today to save your spot</h3>
        <Button
          variant='primary'
          className='w-30 rounded-full'
          to='/dataaisummit/worldtour#locations'
          as={Link}
        >
          Find an event near you
        </Button>
      </div>
    </Wrapper>
  )
}

export default WorldTourFooterCTA
