import React, { useState } from "react"
import PropTypes from "prop-types"
import TextLink from "../TextLink"
import RichText from "../RichText"
import Image from "../Image"

const HorizontalTab = ({ tabData, headlineTag }) => {
  const [activeTab, setActiveTab] = useState(tabData[0].label)

  const handleClick = (label) => {
    setActiveTab(label)
  }

  const Component = headlineTag

  return (
    <div className='flex flex-col'>
      <div className='border-gray-lines scroll-bar-transparent flex flex-row overflow-x-scroll border-b'>
        {tabData.slice(0, 6).map(({ label, id }) => (
          <button
            type='button'
            key={id}
            className={`b4 hover:text-orange-04 text-gray-text min-w-max cursor-pointer p-2 text-center ${
              activeTab === label ? " text-navy-06 border-orange-04 border-b-2" : ""
            }`}
            onClick={() => handleClick(label)}
          >
            {label}
          </button>
        ))}
        <div className='to-transparen absolute right-0 order-1 h-6 w-10 flex-none flex-grow-0 bg-gradient-to-l from-white' />
      </div>
      <div className='mt-3 gap-3 md:mt-4'>
        {tabData.slice(0, 6).map(({ content, id }, index) =>
          activeTab === tabData[index].label ? (
            <div
              key={id}
              className='flex flex-col justify-between gap-3 md:flex-row'
            >
              <div className='flex flex-col gap-2 self-start md:w-6/12'>
                <Component>{content.headline}</Component>
                <RichText className=' b4'>{content.body}</RichText>
                <TextLink variant='A' className=' arrow-icon' to={content.cta.to}>
                  {content.cta.label}
                </TextLink>
              </div>
              {content?.image && <Image className=' md:w-5/12' {...content.image} />}
            </div>
          ) : null
        )}
      </div>
    </div>
  )
}

HorizontalTab.propTypes = {
  headlineTag: PropTypes.oneOf(["h4", "h5"]),
  tabData: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
    })
  ).isRequired,
}

HorizontalTab.defaultProps = {
  headlineTag: "h4",
}

export default HorizontalTab
