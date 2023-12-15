import React from "react"
import PropTypes from "prop-types"
import {
  AcceleratorCard,
  DrawerCard,
  IndustryCardItems,
  ThreeCardCluster,
} from "databricks-ui"
import { SlideUpWrapper } from "./slide-up"
import resolveSlideUp from "../utils/resolve-slide-up"
import resolveImage from "../utils/resolve-image"
import { useKnownLead } from "../utils/known-lead"

const ThreeCardClusterWrapper = ({ entity }) => {
  const isKnownLead = useKnownLead()
  if (!entity) {
    return null
  }
  const mainCard = entity.fieldItem?.entity
  const cards = entity.fieldItems
  const isMainSlide = !isKnownLead && resolveSlideUp(mainCard.fieldLink?.url)
  return (
    <ThreeCardCluster>
      <SlideUpWrapper url={mainCard.fieldLink?.url}>
        {mainCard?.__typename === "Drupal_ParagraphDrawerCard" ? (
          <DrawerCard
            variant='large'
            title={mainCard.fieldTitle}
            eyebrow={mainCard.fieldSectionTitle}
            image={resolveImage(mainCard.fieldImage)}
            description={mainCard.fieldDescription?.processed}
            videoTime={mainCard.fieldKey}
            lock
            {...(!isMainSlide && {
              source: mainCard.fieldLink?.url?.path,
              lock: false,
            })}
          />
        ) : (
          <IndustryCardItems
            title={mainCard?.fieldTitle}
            image={resolveImage(mainCard?.fieldImage)}
            ctaLink={!isMainSlide && mainCard?.fieldLink.url.path}
            ctaLabel={mainCard?.fieldLink.title}
            relatedLinks={mainCard?.fieldItems}
          />
        )}
      </SlideUpWrapper>
      {cards?.slice(0, 2).map((element) => {
        const card = element.entity
        const typename = card.__typename
        const isSlide = !isKnownLead && resolveSlideUp(card.fieldLink?.url)
        return (
          <SlideUpWrapper
            url={card.fieldLink?.url}
            key={`${card.fieldTitle}${card.fieldDescription?.processed}${isKnownLead}`}
          >
            {typename === "Drupal_ParagraphDrawerCard" ? (
              <DrawerCard
                key={card.uuid}
                variant='small'
                title={card.fieldTitle}
                eyebrow={card.fieldSectionTitle}
                image={resolveImage(card.fieldImage)}
                description={card.fieldDescription?.processed}
                videoTime={card.fieldKey}
                lock
                {...(!isSlide && {
                  source: card.fieldLink?.url?.path,
                  lock: false,
                })}
              />
            ) : (
              <AcceleratorCard
                partner={card.fieldAcceleratorPartnerTerm?.entity.name}
                content={card.fieldTitle}
                href={!isSlide && card.fieldLink?.url?.path}
                badges={[
                  card.fieldFeatured ? "featured" : undefined,
                  card.fieldNew ? "new" : undefined,
                  card.fieldHot ? "hot" : undefined,
                ]}
              />
            )}
          </SlideUpWrapper>
        )
      })}
    </ThreeCardCluster>
  )
}

ThreeCardClusterWrapper.propTypes = {
  entity: PropTypes.shape({
    fieldItems: PropTypes.arrayOf(PropTypes.shape({})),
    fieldItem: PropTypes.shape({
      entity: PropTypes.shape({}),
    }),
  }).isRequired,
}

export default ThreeCardClusterWrapper
