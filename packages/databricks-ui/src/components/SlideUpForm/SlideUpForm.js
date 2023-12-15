import React from "react"
import PropTypes from "prop-types"
import Image from "../Image"
import RichText from "../RichText"
import IconResolver from "../IconResolver"
import { SemiCircle } from "../FormCustom"
import "./styles.css"

const SlideUpForm = ({
  children,
  title,
  description,
  reversed,
  image,
  listItems,
}) => {
  return (
    <div className='inner-wrapper min-h-[850px] overflow-hidden md:min-h-[600px] xl:min-h-[550px]'>
      <div
        className={`absolute bottom-0 hidden md:block ${
          reversed ? "left-0 -translate-x-1/2" : "right-0 translate-x-1/2"
        } right-0 w-[640px] xl:w-[1024px]`}
      >
        <SemiCircle color='green-200' />
      </div>
      {title && (
        <h2
          className={`h1 md:h2 font-medium md:font-normal ${
            image ? "" : "md:hidden"
          } mb-8 md:mb-6 xl:ml-[calc(8.333%-32px)] xl:w-5/12`}
        >
          {title}
        </h2>
      )}
      <div
        className={`relative z-10 flex flex-col-reverse gap-2 xl:gap-4 ${
          image ? "" : "items-start"
        } ${reversed ? "md:flex-row-reverse" : "md:flex-row"} justify-center`}
      >
        {/* text block */}
        <div className='xxl:w-4/12 w-full md:w-6/12 xl:w-5/12'>
          {title && (
            <h2
              className={`h1 mb-8 hidden ${
                image ? "" : "md:block"
              } font-medium md:mb-6`}
            >
              {title}
            </h2>
          )}
          {image && <Image className='mb-4' {...image} />}
          <RichText>{description}</RichText>
          {!image &&
            listItems?.map((item) => {
              const { headline, body } = item
              return (
                <div className='mt-3 flex' key={headline}>
                  <IconResolver
                    token='checkedCircle'
                    className='mr-2 min-w-[32px]'
                  />
                  <div>
                    {headline && <h4 className='mb-1'>{headline}</h4>}
                    {body && (
                      <RichText className='text-gray-text b5 links-text-gray-text'>
                        {body}
                      </RichText>
                    )}
                  </div>
                </div>
              )
            })}
        </div>
        <div className='xxl:w-2/12 hidden md:block md:w-1/12' />
        {/* form block */}
        <div className='w-full md:w-5/12 xl:min-h-[508px] xl:w-4/12'>
          <div className='mktoSlideUpFormWrapper pb-8 md:pb-0'>{children}</div>
        </div>
      </div>
    </div>
  )
}
SlideUpForm.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  reversed: PropTypes.bool,
  listItems: PropTypes.arrayOf(
    PropTypes.shape({
      headline: PropTypes.string,
      body: PropTypes.string,
    })
  ),
}

SlideUpForm.defaultProps = {
  title: "",
  description: "",
  image: "",
  children: undefined,
  reversed: false,
  listItems: undefined,
}

export default SlideUpForm
