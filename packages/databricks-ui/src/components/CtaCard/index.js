import React from "react"
import PropTypes from "prop-types"
import Button from "../Button"
import Link from "../Link"
import RichText from "../RichText"
import Grid from "../Grid"
import { useBreakpoint } from "../../utils/use-breakpoint"

const CtaCard = ({ children, cta, cards }) => {
  const isDesktop = useBreakpoint("lg")

  const buttonElement = cta && (
    <Button as={Link} variant='primary' className='self-start lg:mt-4' to={cta.to}>
      {cta.label}
    </Button>
  )

  return (
    <div
      className='flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-10 xl:gap-16'
      data-cy='CtaCard'
    >
      <div className='w-full lg:w-5/12 xl:w-1/2'>
        <RichText className='b2 rich-text-body b2'>{children}</RichText>
        {isDesktop && buttonElement}
      </div>
      <Grid className='w-full lg:w-7/12 lg:gap-4 xl:w-1/2' gap={2} columns={2}>
        {cards}
      </Grid>
      {!isDesktop && buttonElement}
    </div>
  )
}

CtaCard.propTypes = {
  children: PropTypes.node.isRequired,
  cta: PropTypes.shape({
    to: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }),
  cards: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
}

CtaCard.defaultProps = {
  cta: undefined,
}

export default CtaCard
