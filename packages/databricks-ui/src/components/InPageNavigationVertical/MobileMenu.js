import React, { useEffect, useState, useRef } from "react"
import PropTypes from "prop-types"
import Modal from "react-modal"
import IconResolver from "../IconResolver"

const MobileMenuWrapper = ({ children, mobileMenu, openLabel, closeLabel }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isCompact, setIsCompact] = useState(true)
  const scrollTo = useRef()
  const mobileRef = useRef()

  useEffect(() => {
    const handleResize = () => {
      let compact = false
      if (mobileRef?.current) {
        if (window.innerHeight < 450) {
          compact = true
        }
        setIsCompact(compact)
      }
      setIsOpen(false)
    }
    window.addEventListener("resize", handleResize)
    const handleChange = (e) => {
      scrollTo.current = window.location.hash.replace("#", "")
    }
    window.addEventListener("hashchange", handleChange)
    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("hashchange", handleChange)
    }
  }, [scrollTo, setIsCompact, mobileRef])

  const afterClose = () => {
    const hashElement = document.getElementById(scrollTo.current || "")
    if (!hashElement) {
      return
    }
    hashElement.scrollIntoView()
    scrollTo.current = null
  }

  return (
    <>
      <div className='hidden lg:block'>{children}</div>
      <div className='lg:hidden'>
        <button
          type='button'
          aria-label={openLabel}
          onClick={() => setIsOpen(true)}
          className='bg-navy-06 fixed top-12 left-0 z-20 flex h-6 w-4 items-center justify-center rounded-r rounded-br'
        >
          <IconResolver className='text-white' token='menuBars' />
        </button>
        <Modal
          isOpen={isOpen}
          onRequestClose={() => setIsOpen(false)}
          onAfterClose={afterClose}
          onAfterOpen={(e) => {
            if (
              e.contentEl.querySelector("nav").clientHeight + 90 >
              window.innerHeight
            ) {
              setIsCompact(true)
              return
            }
            setIsCompact(false)
          }}
          className={`inPageNavigation h-full w-[360px] max-w-[85%] cursor-default border-none bg-white bg-none p-0 ${
            isCompact ? "pt-6" : "pt-12"
          } outline-none transition-transform duration-200`}
          overlayClassName='inPageNavigation bg-almost-black cursor-zoom-out z-30 fixed inset-0'
          closeTimeoutMS={200}
        >
          <button
            type='button'
            aria-label={closeLabel}
            onClick={() => setIsOpen(false)}
          >
            <IconResolver
              className='text-gray-secondary absolute right-3 top-4'
              token='close'
            />
          </button>
          <div
            ref={mobileRef}
            className='max-h-[calc(100vh-80px)] overflow-auto'
            onClick={(e) => {
              if (e.target.tagName === "A") {
                setTimeout(() => setIsOpen(false), 300)
              }
            }}
          >
            {mobileMenu || children}
          </div>
        </Modal>
      </div>
    </>
  )
}

MobileMenuWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  mobileMenu: PropTypes.node,
  openLabel: PropTypes.string,
  closeLabel: PropTypes.string,
}

MobileMenuWrapper.defaultProps = {
  mobileMenu: undefined,
  openLabel: "Open Menu",
  closeLabel: "Close Menu",
}

export default MobileMenuWrapper
