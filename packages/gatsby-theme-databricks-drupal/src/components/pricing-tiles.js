import React, { useContext, useEffect, useState } from "react"
import PropTypes from "prop-types"
import {
  PricingContext,
  PricingTiles as TilesComponent,
  Wrapper,
  LoadingSpinner,
} from "databricks-ui"
import filterPricing from "../helpers/filterPricing"

const cloudMap = {
  aws: "AWS",
  azure: "Azure",
  google: "GCP",
}

const PricingTiles = ({ items, title }) => {
  const { cloud, plan, region, setAvailableRadioButtons } =
    useContext(PricingContext)
  const [priceMap, setPriceMap] = useState(null)
  const filteredItems = filterPricing(items)

  useEffect(() => {
    // Get JSON from /data/pricing/cards.json and set it to the pricing context
    fetch("/data/pricing/cards.json")
      .then((response) => response.json())
      .then((data) => {
        setPriceMap(data)
      })
  }, [setPriceMap])

  useEffect(() => {
    if (!priceMap || !items.length) {
      return
    }

    const keys = []

    items.forEach(({ entity }) => {
      if (!keys.includes(entity.fieldKey)) {
        keys.push(entity.fieldKey)
      }
    })

    const availableFilters = {}

    Object.keys(priceMap).forEach((plan) => {
      // Look for plans in priceMap
      Object.keys(priceMap[plan]).forEach((cloud) => {
        keys.forEach((key) => {
          let includeKey = false
          if (!priceMap[plan][cloud][key]) {
            return
          }

          if (typeof priceMap[plan][cloud][key] === "string") {
            includeKey = true
          }

          if (typeof priceMap[plan][cloud][key] === "object") {
            Object.keys(priceMap[plan][cloud][key]).forEach((region) => {
              if (priceMap[plan][cloud][key][region]) {
                includeKey = true
              }
            })
          }

          if (!includeKey) {
            return
          }
          // reverse cloudMap
          const cloudKey = Object.keys(cloudMap).find(
            (key) => cloudMap[key] === cloud
          )

          // Initialize an empty array if cloudKey is missing in availableFilters
          if (!availableFilters.hasOwnProperty(cloudKey)) {
            availableFilters[cloudKey] = []
          }
          // Add the plan to availableFilters[cloudKey] if not already present
          if (!availableFilters[cloudKey].includes(plan)) {
            availableFilters[cloudKey].push(plan)
          }
        })
      })
    })
    setAvailableRadioButtons(availableFilters)
  }, [priceMap, items])

  if (!filteredItems.length) {
    return <></>
  }

  const cloudName = cloudMap[cloud]

  const tiles = filteredItems
    ?.map(({ entity }) => {
      if (!priceMap) {
        return null
      }
      const price =
        priceMap[plan]?.[cloudName]?.[entity.fieldKey]?.[region?.value] ||
        priceMap[plan]?.[cloudName]?.[entity.fieldKey]

      if (!price || typeof price !== "string") {
        return null
      }

      // ensure price has at least two decimal places
      const decimal = price.split(".")[1]
      const formattedPrice = `${price}${
        decimal.length < 2 ? "0".repeat(2 - decimal.length) : ""
      }`
      // add dollar sign if missing
      const pricePlan = formattedPrice.startsWith("$")
        ? formattedPrice
        : `$${formattedPrice}`

      const tileTitle = `${entity.fieldTitle?.split("/br").join("<br/>")}`

      return {
        title: tileTitle,
        subtitle: entity.fieldSubtitle,
        eyebrow: entity.fieldIntro,
        description: entity.fieldDescription.processed,
        price: pricePlan,
        disclaimer: entity.fieldDisclaimer,
        ...(entity.fieldLink && {
          cta: {
            label: entity.fieldLink.title,
            to: entity.fieldLink.url.path,
          },
        }),
      }
    })
    .filter((item) => item)

  return (
    <Wrapper title={title}>
      {priceMap ? (
        <TilesComponent tiles={tiles} />
      ) : (
        <div className='flex h-12 w-full items-center justify-center'>
          <LoadingSpinner />
        </div>
      )}
    </Wrapper>
  )
}

PricingTiles.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  title: PropTypes.string,
}

PricingTiles.defaultProps = {
  title: undefined,
}

export default PricingTiles
