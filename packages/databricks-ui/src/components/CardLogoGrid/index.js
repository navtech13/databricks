import React from "react"
import PropTypes from "prop-types"
import IconResolver from "../IconResolver"
import CardLogo from "../CardLogo"

const CardLogoGrid = ({ items, buttonLabel, buttonOnClick }) => {
  return (
    <div
      data-cy='CardLogoGrid'
      className='flex flex-col items-center gap-4 md:gap-5 lg:gap-6'
    >
      <div className='grid w-full grid-cols-3 gap-1 md:gap-5 lg:grid-cols-8 lg:gap-4'>
        {items.map((item) => (
          <div className='mx-auto aspect-square w-full' key={item.id}>
            <CardLogo {...item} />
          </div>
        ))}
      </div>
      {buttonLabel && (
        <button
          onClick={buttonOnClick}
          className='text-orange-04 b4 flex flex-col items-center gap-0.5 underline'
          type='button'
        >
          <span>{buttonLabel}</span>
          <IconResolver aria-hidden className='rotate-90' token='arrowRight' />
        </button>
      )}
    </div>
  )
}

CardLogoGrid.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  buttonLabel: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.any),
  ]),
  buttonOnClick: PropTypes.func,
}

CardLogoGrid.defaultProps = {
  buttonLabel: undefined,
  buttonOnClick: () => null,
}

export default CardLogoGrid
