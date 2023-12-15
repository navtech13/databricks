import React from "react"
import PropTypes from "prop-types"
import IconResolver from "../IconResolver"
import RichText from "../RichText"
import Wrapper from "../ContentWrapper"
import FormCustomFreeTrial from "../FormCustom"

const TrialBlade = ({ listItems, subtitle, title, entity }) => {
  return (
    <Wrapper className='relative bg-green-100 py-12 after:absolute after:bottom-0 after:right-0 after:z-[-1] after:h-[320px] after:w-[320px]  after:rounded-tl-full after:bg-green-200 after:content-[""] lg:after:h-[512px] lg:after:w-[512px]'>
      <div className='grid grid-cols-1 md:grid-cols-12'>
        <div className='md:col-start-1 md:col-end-7'>
          {title && (
            <h1 className='text-navy-800 mb-6 font-medium lg:max-w-[426px]'>
              {title}
            </h1>
          )}
          {subtitle && <h3 className='text-navy-800'>{subtitle}</h3>}
          {listItems?.map((item) => {
            const { headline, body } = item
            return (
              <div className='mt-3 flex' key={headline}>
                <IconResolver token='checkedCircle' className='min-w-4 mr-2' />
                <div>
                  {headline && <h4 className='mb-1'>{headline}</h4>}
                  {body && (
                    <RichText className='text-gray-text links-text-gray-text'>
                      {body}
                    </RichText>
                  )}
                </div>
              </div>
            )
          })}
        </div>
        <div className='relative z-20 mt-8 md:col-start-8 md:col-end-13 md:mt-0'>
          <FormCustomFreeTrial
            entity={entity}
            buttonVariant='secondary'
            disableHash
          />
        </div>
      </div>
    </Wrapper>
  )
}

TrialBlade.propTypes = {
  entity: PropTypes.shape({
    fieldFreeTrialDisplayType: PropTypes.string,
    fieldCloudType: PropTypes.string,
    fieldTitle: PropTypes.string,
    fieldLink: PropTypes.shape({
      title: PropTypes.string,
      url: PropTypes.shape({
        path: PropTypes.string,
      }),
    }),
    uuid: PropTypes.string,
  }).isRequired,
  listItems: PropTypes.arrayOf(
    PropTypes.shape({
      headline: PropTypes.string,
      body: PropTypes.string,
    })
  ).isRequired,
  subtitle: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
}

export default TrialBlade
