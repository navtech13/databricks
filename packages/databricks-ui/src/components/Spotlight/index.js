import React from "react"
import propTypes from "prop-types"
import Card from "../Card"
import Button from "../Button"
import LinkComponent from "../Link"

const generateSpotlightCardKey = (card) => {
  return `c_spotlight_${card.uuid}`
}

const Spotlight = ({ cards, title, cta }) => {
  return (
    <section>
      {title && (
        <h2 className='text-3 md:text-4 pb-6 text-center font-medium'>{title} </h2>
      )}
      <div className='grid gap-4 pb-8 md:grid-cols-2 lg:grid-cols-4'>
        {cards.map((card) => (
          <Card
            key={generateSpotlightCardKey(card)}
            eyebrow={card.eyebrow}
            variant='spotlight'
            image={card.image}
            description={card.description}
            cta={card.cta}
          />
        ))}
      </div>
      {cta?.to && cta?.text && (
        <div className='flex justify-center'>
          <Button as={LinkComponent} variant='secondary' to={cta.to}>
            {cta.text}
          </Button>
        </div>
      )}
    </section>
  )
}

export default Spotlight

Spotlight.propTypes = {
  title: propTypes.string,
  cta: propTypes.shape({
    to: propTypes.string,
    text: propTypes.string,
  }),
  cards: propTypes.arrayOf(
    propTypes.shape({
      uuid: propTypes.string,
      eyebrow: propTypes.string,
      description: propTypes.string,
      variant: propTypes.string,
      cta: propTypes.shape({
        to: propTypes.string,
        text: propTypes.string,
      }),
      image: propTypes.shape({
        src: propTypes.string,
        alt: propTypes.string,
      }),
    })
  ),
}

Spotlight.defaultProps = {
  title: "",
  cta: {
    to: "",
    text: "",
  },
  cards: [],
}
