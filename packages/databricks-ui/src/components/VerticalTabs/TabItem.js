import React, { useRef, useLayoutEffect, useState } from "react"
import PropTypes from "prop-types"
import IconResolver from "../IconResolver"
import Link from "../Link"
import Image from "../Image"
import RichText from "../RichText"
import { useBreakpoint } from "../../utils/use-breakpoint"

const TabItem = ({
  id,
  title,
  subtitle,
  children,
  subchildren,
  customer,
  className,
  mediaWidth,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const isTablet = useBreakpoint("md", true)
  const containerRef = useRef(null)
  const handleChange = () => {
    if (!isTablet) {
      setIsOpen(!isOpen)
      return
    }
    const firstColumn = containerRef.current.querySelector(".first-column")
    const secondColumn = containerRef.current.querySelector(".second-column")
    const currentHeight = containerRef.current.offsetHeight
    if (isOpen) {
      let height = secondColumn
        ? secondColumn.children[0].offsetHeight +
          secondColumn.children[1].offsetHeight
        : 0

      height = Math.max(
        firstColumn.children[0].offsetHeight + firstColumn.children[1].offsetHeight,
        height
      )
      containerRef.current.style.height = `${currentHeight}px`

      requestAnimationFrame(
        () => (containerRef.current.style.height = `${height}px`)
      )

      setTimeout(() => {
        setIsOpen(!isOpen)
      }, 210)
      setTimeout(() => {
        containerRef.current.style.removeProperty("height")
      }, 225)
      return
    }
    containerRef.current.style.height = `${currentHeight}px`
    setIsOpen(!isOpen)
    setTimeout(() => {
      const thirdColumn = containerRef.current.querySelector(".third-column")
      const thirdHeight = thirdColumn ? thirdColumn?.offsetHeight : 0
      const height = Math.max(
        firstColumn?.offsetHeight + thirdHeight,
        secondColumn?.offsetHeight
      )
      containerRef.current.style.height = `${height}px`
    }, 100)
    setTimeout(() => {
      containerRef.current.style.removeProperty("height")
    }, 300)
  }
  useLayoutEffect(() => {}, [isOpen])
  return (
    <div
      id={id}
      ref={containerRef}
      className={`flex w-full flex-wrap justify-between overflow-hidden text-left transition-all duration-200 ${className}`}
      {...props}
    >
      <div className='first-column z-10 md:w-7/12'>
        <h3 className='w-full font-bold'>
          <button
            className='text-left'
            onClick={() => {
              handleChange()
            }}
            type='button'
          >
            {title}
          </button>
        </h3>
        <button
          type='button'
          onClick={() => {
            handleChange()
          }}
          className='h4 relative z-10 flex pt-1 text-left'
        >
          <IconResolver
            className='mr-1 mt-1 h-2 min-h-[14px] w-2 min-w-[14px] text-blue-700'
            token={isOpen ? "minus" : "plus"}
          />
          {subtitle}
        </button>
        {isOpen && subchildren && (
          <RichText className='b4 pt-1.5 md:mt-3'>{subchildren}</RichText>
        )}
        {isOpen && children && (
          <div className='pt-3 md:mt-4 md:hidden'>{children}</div>
        )}
      </div>
      {customer && (
        <div className='second-column z-10 mt-3 md:mt-0 md:w-4/12'>
          {customer.eyebrow && (
            <button
              className='block'
              type='button'
              onClick={() => {
                handleChange()
              }}
            >
              <div className='h6 font-bold'>{customer.eyebrow}</div>
            </button>
          )}
          {customer.image && (
            <button
              type='button'
              className='w-[130px] md:w-[180px]'
              onClick={() => {
                handleChange()
              }}
            >
              <Image
                {...customer.image}
                placeholderRatio={null}
                className='pt-1.5 md:pt-2'
                imageOptions={{
                  className:
                    "max-h-5 max-h-[30px] max-w-[130px] md:max-w-[180px] object-contain object-left",
                  objectFit: "contain",
                }}
              />
            </button>
          )}
          {isOpen && (
            <>
              {customer.text && (
                <RichText className='mt-2 md:mt-3'>{customer?.text}</RichText>
              )}
              {customer.cta?.to && customer.cta?.label && (
                <Link
                  className='arrow-icon arrow-icon-tertiary tertiary-underline mt-1.5 block text-blue-700 hover:text-blue-700 hover:no-underline md:mt-3'
                  to={customer?.cta.to}
                >
                  {customer?.cta.label}
                </Link>
              )}
            </>
          )}
        </div>
      )}
      {isOpen && children && (
        <div
          className={`third-column hidden pt-4 md:block
            w-${mediaWidth}/12
          `}
        >
          {children}
        </div>
      )}
    </div>
  )
}

TabItem.propTypes = {
  className: PropTypes.string,
  mediaWidth: PropTypes.string,
  id: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  children: PropTypes.node,
  subchildren: PropTypes.string,
  customer: PropTypes.shape({
    eyebrow: PropTypes.string,
    image: PropTypes.string,
    text: PropTypes.string,
    cta: PropTypes.shape({
      to: PropTypes.string,
      label: PropTypes.string,
    }),
  }),
}

TabItem.defaultProps = {
  className: "",
  id: undefined,
  title: undefined,
  subtitle: undefined,
  children: undefined,
  subchildren: undefined,
  customer: undefined,
  mediaWidth: "12",
}

export default TabItem
