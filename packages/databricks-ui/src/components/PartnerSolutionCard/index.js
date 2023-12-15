import React from "react"
import PropTypes from "prop-types"
import IconResolver from "../IconResolver"
import Image from "../Image"
import Link from "../Link"

const PartnerSolutionCard = ({ logo, eyebrow, title, cta }) => {
  return (
    <Link
      to={cta?.to}
      className='border-gray-lines md:hover:shadow-shadow-2 group flex min-h-[176px] flex-col gap-4 border bg-white p-3 duration-150 hover:no-underline md:hover:ease-in'
    >
      <div className='flex flex-row items-start justify-between'>
        <div className='h-6 max-h-6'>
          <Image
            className='h-full w-20'
            imageOptions={{
              className: "max-h-6 object-contain object-left w-full h-full",
            }}
            {...logo}
          />
        </div>
        <IconResolver
          className='text-navy-400 h-auto w-1 transition-colors md:group-hover:text-orange-600'
          token='linkArrow'
        />
      </div>
      <div className='flex flex-col gap-1'>
        <span className='text-1.25 text-gray-text font-mono uppercase leading-none'>
          {eyebrow}
        </span>
        <h4 className='text-navy-800'>{title}</h4>
      </div>
    </Link>
  )
}

PartnerSolutionCard.propTypes = {
  logo: PropTypes.shape({}),
  eyebrow: PropTypes.string,
  title: PropTypes.string,
  cta: PropTypes.shape({
    to: PropTypes.string,
    text: PropTypes.string,
  }),
}

PartnerSolutionCard.defaultProps = {
  logo: undefined,
  eyebrow: undefined,
  title: undefined,
  cta: undefined,
}

export default PartnerSolutionCard
