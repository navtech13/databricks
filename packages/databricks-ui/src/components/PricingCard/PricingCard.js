import React from "react"
import PropTypes from "prop-types"
import { TextLink, Button, RichText, Link } from ".."

const PricingCard = ({
  type,
  content,
  eyebrow,
  price,
  productSpend,
  cta,
  variant,
}) => {
  if (variant === "warm") {
    return (
      <div className='shadow-legacy-card-normal border-gray-lines hover:border-b-orange-03 hover:shadow-legacy-card-hover flex h-full w-full flex-col border border-b-2 transition-all delay-75 duration-75 ease-linear'>
        <div className='bg-navy-04 py-2'>
          <h4 className='text-center text-white'>{type}</h4>
        </div>
        <div className='bg-gray-warm-light flex h-full flex-col items-center px-6 pt-2 pb-6'>
          <RichText dangerouslySetInnerHTML={{ __html: content }} />
          <div className='mt-auto flex flex-col items-center'>
            {price ? (
              <p className='text-navy-06 text-5'>
                ${price} /<span className='text-orange-04 text-3.5 ml-1'>DBU</span>
              </p>
            ) : (
              <p>-</p>
            )}
            {cta && (
              <Button variant='primary' to={cta.url} className='mt-4 text-center'>
                {cta.title}
              </Button>
            )}
          </div>
        </div>
      </div>
    )
  }

  const cardContent = (
    <div className='flex h-full flex-col p-2.5'>
      {eyebrow && (
        // Figma did not use an existing token for this color
        <div style={{ color: "#2E7D32" }} className='b4 mb-1.5 font-bold'>
          {eyebrow}
        </div>
      )}
      <h3 className='text-navy-06 mb-2'>{type}</h3>
      {price ? (
        <p className='text-gray-text pb-2 font-bold'>
          <span className=''>Starting at </span>
          <span className='text-3.5 font-normal'>${price}</span>
          <span> / </span>
          <span className='text-orange-04'>DBU</span>
        </p>
      ) : (
        <p className='text-gray-text pb-2 font-bold'>{productSpend}</p>
      )}
      <div
        className='border-t-gray-lines text-navy-06 border-t pt-2 pb-2'
        dangerouslySetInnerHTML={{ __html: content }}
      />
      {cta && (
        <div className='mt-auto flex'>
          <TextLink
            as='span'
            variant='A'
            className='arrow-icon text-orange-04 hover:text-orange-05 active:text-orange-04 cursor-pointer hover:underline active:no-underline'
          >
            {cta.title}
          </TextLink>
        </div>
      )}
    </div>
  )

  return (
    <div className='shadow-card-normal hover:shadow-card-hover-accent w-full bg-white transition-all delay-75 duration-75 ease-linear'>
      {cta ? (
        <Link
          to={cta?.url}
          className='text-gray-text hover:text-gray-text hover:no-underline'
        >
          {cardContent}
        </Link>
      ) : (
        <>{cardContent}</>
      )}
    </div>
  )
}

PricingCard.propTypes = {
  type: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  eyebrow: PropTypes.string,
  productSpend: PropTypes.string,
  cta: PropTypes.shape({
    url: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
  variant: PropTypes.oneOf(["A", "B"]),
}

PricingCard.defaultProps = {
  productSpend: "",
  eyebrow: null,
  variant: "A",
}

export default PricingCard
