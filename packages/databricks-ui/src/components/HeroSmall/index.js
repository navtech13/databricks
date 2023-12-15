import React from "react"
import PropTypes from "prop-types"
import Button from "../Button"
import RichText from "../RichText"
import Link from "../Link"

const HeroSmall = ({ title, description, ctas }) => {
  return (
    <div className='lg:inner-wrapper' data-cy='HeroSmall'>
      <section className='w-full px-2 py-8 md:w-2/3 md:px-4 lg:w-1/2 lg:px-0'>
        <RichText className='h2'>{title}</RichText>
        <RichText className='b2 mt-2'>{description}</RichText>
        {ctas?.length > 0 && (
          <div className='mt-3 flex flex-col items-start gap-2 md:flex-row md:gap-3'>
            <Button as={Link} variant='primary' to={ctas[0].to}>
              {ctas[0].text}
            </Button>
            {ctas[1] && (
              <Button as={Link} variant='secondary' to={ctas[1].to}>
                {ctas[1].text}
              </Button>
            )}
          </div>
        )}
      </section>
    </div>
  )
}

HeroSmall.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  ctas: PropTypes.arrayOf(
    PropTypes.shape({
      to: PropTypes.string,
      text: PropTypes.string,
    })
  ),
}

HeroSmall.defaultProps = {
  ctas: undefined,
}

export default HeroSmall
