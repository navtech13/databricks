import React from "react"
import PropTypes from "prop-types"
import Grid from "../Grid"
import FeaturedIndustryCard from "../FeaturedIndustryCard/FeaturedIndustryCard"

const FeaturedIndustryCardList = ({ title, items }) => {
  return (
    <div>
      <h2 className='mt-10 mb-4 lg:mt-16'>{title}</h2>
      <Grid columns={2} gap={3}>
        {items.map((card) => {
          const cta = {
            link: card.entity?.fieldSolutionsIndustryPage,
            label: card.entity?.fieldCtaLabel,
          }
          return (
            <FeaturedIndustryCard
              key={card.entity.uuid}
              title={card.entity?.fieldTitle}
              content={card.entity?.fieldSubtitle}
              type={card.entity?.type}
              icon={card.entity?.fieldImage}
              cta={cta}
              logos={card.entity?.fieldImages}
            />
          )
        })}
      </Grid>
    </div>
  )
}

FeaturedIndustryCardList.propTypes = {
  title: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.shape({})),
}

FeaturedIndustryCardList.defaultProps = {
  title: "",
  items: [],
}

export default FeaturedIndustryCardList
