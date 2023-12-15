import PropTypes from "prop-types"
import React from "react"
import { navigate } from "gatsby"
import img from "../../../../../../assets/global/images/Icon Container.svg"

function SearchComponentSideBar({ activateSearchPopup, isMobile }) {
  return (
    <section
      className='bg-navy-06 active:bg-almost-black order-none my-0 mx-auto mt-2 flex h-3 w-16 flex-none cursor-pointer flex-row items-center gap-1 self-stretch rounded-[25px] p-2'
      data-cy='SearchComponentSideBar'
    >
      <img src={img} alt='' className='relative -left-0.5 h-2.5 w-4' />
      <div
        role='button'
        style={{ backgroundColor: "transparent" }}
        className='text-navy-02 -ml-1 w-8 cursor-pointer bg-transparent text-xs outline-none'
        onClick={() => (isMobile ? navigate("/search") : activateSearchPopup())}
        onKeyDown={() => (isMobile ? navigate("/search") : activateSearchPopup())}
        tabIndex={0}
      >
        Search
      </div>
    </section>
  )
}

SearchComponentSideBar.propTypes = {
  activateSearchPopup: PropTypes.func.isRequired,
  isMobile: PropTypes.bool,
}

SearchComponentSideBar.defaultProps = {
  isMobile: false,
}

export default SearchComponentSideBar
