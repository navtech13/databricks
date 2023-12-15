import React from "react"
import GoToArrow from "../../../../../../../assets/global/images/icn_arrow.svg"

function SideImageCards() {
  return (
    <>
      <div className='side_image_cards border-r-gray-lines md:w-[262px] md:border-r'>
        <img
          src='https://www.databricks.com/sites/default/files/2023-08/menu-promo-world-tour-2023.png'
          alt=''
          className='w-30 h-16'
        />
        {/* <h5 className='flex-none order-none font-normal font-mono text-xs leading-6 mb-1 mt-2.5 not-italic tracking-widest text-[12px] text-gray-text tracking-[.08em]'>DATA+AI WORLD TOUR</h5> */}
        <h3 className='text-2 order-1 mt-2.5 flex-none self-stretch text-base font-normal not-italic leading-6'>
          Join Generation AI
        </h3>
        <br />
        <a
          href='https://www.databricks.com/dataaisummit/worldtour?itm_data=search-daiwt23'
          className='text-1.75 order-3 flex flex-none cursor-pointer items-center text-sm font-normal not-italic leading-5'
        >
          Register now
          <img className='mx-0.5 my-0.5 h-1.5 w-3' src={GoToArrow} alt='' />
        </a>
      </div>
    </>
  )
}

export default SideImageCards
