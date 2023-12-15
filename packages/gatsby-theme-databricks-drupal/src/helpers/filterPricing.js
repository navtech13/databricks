import { useContext } from "react"
import { PricingContext } from "databricks-ui"

const filterPricing = (items) => {
  const { cloud, region, plan } = useContext(PricingContext)

  // Filter pricing data based on cloud, region, and plan
  const filteredItems = items?.filter(({ entity: { fieldItem } }) => {
    if (!fieldItem) {
      return true
    }

    const {
      entity: {
        fieldPricingPlans,
        fieldPricingClouds,
        fieldPricingRegions,
        fieldPricingVisibility,
      },
    } = fieldItem

    // 2nd condition is a hack for the translation caused error
    const defaultIsShown = (fieldPricingVisibility === "visible" || fieldPricingVisibility === "visível")
    const cloudMatch =
      cloud && fieldPricingClouds?.length > 0
        ? fieldPricingClouds.filter((str) =>
            str.toLowerCase().includes(cloud.toLowerCase())
          ).length > 0
        : defaultIsShown
    const regionMatch =
      region && fieldPricingRegions?.length > 0
        ? fieldPricingRegions.includes(region.value)
        : defaultIsShown
    const planMatch =
      plan && fieldPricingPlans?.length > 0
        ? fieldPricingPlans.includes(plan)
        : defaultIsShown

    // visibility visible
    if (defaultIsShown) {
      return cloudMatch && regionMatch && planMatch
    }
    // visibility hidden
    if (cloudMatch || regionMatch || planMatch) {
      return false
    }
    return true
  })

  return filteredItems
}

export default filterPricing
