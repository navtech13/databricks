import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import Link from "../../Link"
import RichText from "../../RichText"
import Button from "../../Button"

const Tile = ({
  title,
  subtitle,
  description,
  price,
  disclaimer,
  eyebrow,
  unit,
  cta,
}) => {
  const asterisk = "*"
  const [disclState, setDisclState] = useState(false)
  useEffect(() => {
    if (disclaimer && disclaimer.includes(asterisk)) {
      setDisclState(true)
    } else {
      setDisclState(false)
    }
  }, [])
  const tileContent = (
    <div className='shadow-legacy-card-normal border-gray-lines hover:border-b-orange-03 hover:shadow-legacy-card-hover flex h-full w-full flex-col border border-b-2 transition-all delay-75 duration-75 ease-linear'>
      {(title || eyebrow) && (
        <div className='bg-navy-04 py-2 text-center text-white'>
          {eyebrow && <div className='h6'>{eyebrow}</div>}
          <RichText as='h4'>{title}</RichText>
          {subtitle && (
            <RichText as='h5' className='text-2'>
              {subtitle}
            </RichText>
          )}
        </div>
      )}
      <div className='bg-gray-warm-light flex h-full flex-col items-center px-6 pt-2 pb-2.5'>
        <RichText className='b3 flex-1'>{description}</RichText>
        <p className='text-navy-06 text-5 mt-2.5 text-center'>
          {price ? (
            <>
              {price}
              {disclState && <sup className='text-4'>{asterisk}</sup>}
              {unit}
            </>
          ) : (
            "-"
          )}
        </p>
        {disclaimer && (
          <RichText className='h5 text-navy-06 whitespace-pre-line text-center'>
            {disclaimer}
          </RichText>
        )}
        {cta && (
          <Button
            as={Link}
            variant='primary'
            to={cta.to}
            className='my-4 text-center'
          >
            {cta.label}
          </Button>
        )}
      </div>
    </div>
  )

  return (
    <>
      {cta ? (
        <Link
          to={cta.to}
          className='text-gray-text hover:text-gray-text hover:no-underline'
        >
          {tileContent}
        </Link>
      ) : (
        <>{tileContent}</>
      )}
    </>
  )
}

Tile.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  description: PropTypes.string.isRequired,
  eyebrow: PropTypes.string,
  price: PropTypes.string,
  disclaimer: PropTypes.string,
  cta: PropTypes.shape({
    label: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
  }).isRequired,
  unit: PropTypes.string,
}

Tile.defaultProps = {
  eyebrow: null,
  price: null,
  subtitle: null,
  disclaimer: null,
  unit: "",
}

export default Tile
