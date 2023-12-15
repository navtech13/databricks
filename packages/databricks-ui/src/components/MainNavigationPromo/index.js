import React from "react"
import Image from "../Image"
import DataAiSummitLogo from "../../../static/images/data-ai-2023-logo.svg"

const MainNavigationPromo = () => {
  return (
    <div
      className='bg-almost-black mt-4 hidden lg:block'
      data-cy='MainNavigationPromo'
    >
      <div className='p-2.5'>
        <a
          href='/dataaisummit?itm_data=events-hp-nav-dais23'
          className='hover:no-underline'
        >
          <Image src={DataAiSummitLogo} />
          <p className='text-green-02 pt-2 text-center'>JUNE 26-29</p>
        </a>
      </div>
      <a
        className='bg-green-02 text-almost-black hover:text-almost-black block w-full p-1 text-center font-medium hover:bg-white hover:no-underline'
        href='/dataaisummit?itm_data=events-hp-nav-dais23'
      >
        REGISTER NOW
      </a>
    </div>
  )
}

MainNavigationPromo.propTypes = {}

export default MainNavigationPromo
