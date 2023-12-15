import React, { useState, useContext } from "react"
import PropTypes from "prop-types"
import { ImageCard, Grid, Wrapper } from "databricks-ui"
import { useLanguageContext } from "./language-provider"
import GlobalContext from "./global-context"
import useTranslate from "../utils/translate"
import Headlines from "./headlines"

const FeaturedStories = ({ count }) => {
  const { translate } = useTranslate()
  const { currentLanguage } = useLanguageContext()
  const context = useContext(GlobalContext)

  if (!context) {
    return <></>
  }

  const featuredEntities = context?.featuredStories?.entities

  const featuredFiltered =
    featuredEntities &&
    featuredEntities.filter(
      (item) => item.entityLanguage.id === currentLanguage.id.toLowerCase()
    )

  const headlinesEntities = context?.headlines?.entities

  const headLinesFiltered =
    headlinesEntities &&
    headlinesEntities.filter(
      (item) => item.entityLanguage.id === currentLanguage.id.toLowerCase()
    )

  if (
    (!featuredFiltered || featuredFiltered.length <= 0) &&
    (!headLinesFiltered || headLinesFiltered.length <= 0)
  ) {
    return <></>
  }

  const [featuredStories] = useState(
    featuredFiltered.filter((item) => item.fieldNewsFeaturedStory)
  )
  const dateOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }

  return (
    <div className='featured-stories'>
      <Wrapper className='bg-gray-warm-light'>
        <div className='mb-8'>
          <h2 className='mb-4'>{translate("featured.stories")}</h2>
          <Grid columns={3.5} gap={1}>
            {featuredStories.slice(0, count).map((item) => (
              <ImageCard
                thumbnail={item.fieldNewsLogo?.entity?.fieldMediaImage}
                subtitle={new Date(item.fieldNewsDate?.value).toLocaleDateString(
                  "en-US",
                  dateOptions
                )}
                title={item.title}
                cta={item.fieldNewsCtaLink}
              />
            ))}
          </Grid>
        </div>
        <Headlines data={headLinesFiltered} />
      </Wrapper>
    </div>
  )
}

FeaturedStories.propTypes = {
  count: PropTypes.number,
}

FeaturedStories.defaultProps = {
  count: 3,
}

export default FeaturedStories
