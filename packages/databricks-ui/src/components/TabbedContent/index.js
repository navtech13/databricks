import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import RichText from "../RichText"
import Wrapper from "../Wrapper"

const variantMap = {
  light: {
    labelStyles: "bg-oat-medium text-navy-800 hover:bg-white",
    activeState: "bg-green-300 hover:bg-green-300",
    container: "bg-oat-light pt-4 pb-6",
    textColor: "text-navy-800",
  },
  dark: {
    labelStyles: "bg-navy-700 text-white hover:bg-navy-600",
    activeState: "bg-green-300 text-navy-800 hover:bg-green-300",
    container: "bg-navy-800 pt-4 pb-6",
    textColor: "text-white",
  },
  orange: {
    labelStyles: "bg-oat-medium text-navy-800 hover:bg-white",
    activeState: "bg-orange-500 hover:bg-orange-500",
    container: "bg-oat-light",
    textColor: "text-navy-800",
  },
}

const convertToHash = (string) => string.toLowerCase().replace(" ", "-")

const TabbedContent = ({ tabData, variant, title, eyebrow, tabAlignment }) => {
  const currentVariant = variantMap[variant]
  const [activeTab, setActiveTab] = useState(0)
  const [tabDirection, setTabDirection] = useState(null)

  const tabAlign = {
    left: "start",
    center: "center flex-wrap md:w-8/12 lg:w-10/12 mx-auto",
    right: "end",
  }

  useEffect(() => {
    const param = window.location.hash.replace("#", "")
    tabData.find(({ label }, i) => {
      if (convertToHash(label) === param) {
        setActiveTab(i)
        return true
      }
    })
  }, [tabData])

  const handleClick = (index, label) => {
    const direction = activeTab > index ? "left" : "right"
    window.location.hash = convertToHash(label)
    setActiveTab(index)
    setTabDirection(direction)
  }

  const activeClassAnimation =
    tabDirection === "right"
      ? "animate-tab-to-right-active"
      : "animate-tab-to-left-active"
  const classAnimation =
    tabDirection === "right" ? "animate-tab-to-right" : "animate-tab-to-left"

  return (
    <div className={`${currentVariant.container} flex flex-col`}>
      <Wrapper className='!my-0'>
        {eyebrow && (
          <p className='text-2 mb-3 text-center font-mono uppercase leading-5 text-orange-700'>
            {eyebrow}
          </p>
        )}
        {title && (
          <RichText
            className={`${currentVariant.textColor} text-4 mx-auto mb-8 w-10/12 text-center font-medium leading-10 tracking-[0.036em] md:w-8/12 lg:text-[56px] lg:leading-[70px]`}
          >
            {title}
          </RichText>
        )}
        <div
          className={`justify-${tabAlign[tabAlignment]} scroll-bar-transparent flex flex-row gap-2 overflow-x-scroll`}
        >
          {tabData?.slice(0, 7).map(({ label, id }, i) => (
            <button
              type='button'
              key={id}
              className={`text-2 flex h-5 min-w-max items-center rounded-[20px] py-1 px-1.5 font-medium lg:h-5 lg:py-1.5 lg:px-2 ${
                activeTab === i
                  ? currentVariant.activeState
                  : currentVariant.labelStyles
              }`}
              onClick={() => handleClick(i, label)}
            >
              <span>{label}</span>
            </button>
          ))}
        </div>
        {tabData?.slice(0, 7).map(({ children, id }, index) =>
          activeTab === index ? (
            <div
              key={id}
              className={`mt-8 gap-3  ${
                activeTab === index ? activeClassAnimation : classAnimation
              }
             `}
            >
              <div className={`${currentVariant.textColor}`}>{children}</div>
            </div>
          ) : null
        )}
      </Wrapper>
    </div>
  )
}

TabbedContent.propTypes = {
  title: PropTypes.string,
  eyebrow: PropTypes.string,
  tabData: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
    })
  ).isRequired,
  variant: PropTypes.oneOf(["light", "dark", "orange"]),
  tabAlignment: PropTypes.oneOf(["left", "center", "right"]),
}

TabbedContent.defaultProps = {
  title: undefined,
  eyebrow: undefined,
  variant: "light",
  tabAlignment: "left",
}

export default TabbedContent
