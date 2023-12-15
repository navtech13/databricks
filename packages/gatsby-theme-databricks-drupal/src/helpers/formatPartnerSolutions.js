import resolveImage from "../utils/resolve-image"

function formatPartnerSolutions(entity) {
  const partnerSolutionsData = entity?.partnerSolutionsCards

  if (!partnerSolutionsData?.length) {
    return {
      regionFilters: [],
      industryFilters: [],
      partnerFilters: [],
      items: [],
    }
  }
  const partnerSolutions = partnerSolutionsData.map((partnerData) => {
    const solutionEntity =
      partnerData?.entity?.fieldReference?.entity ||
      partnerData.entity ||
      partnerData
    if (!solutionEntity) {
      return null
    }
    const overrideMetadata = solutionEntity.overrideData?.entity

    const solutionTitle =
      overrideMetadata?.fieldTitle || solutionEntity.solutionTitle

    const solutionUrl =
      overrideMetadata?.fieldLink?.url.path ||
      solutionEntity.fieldLink?.url.path ||
      solutionEntity.entityUrl?.path

    const solutionUrlTitle =
      overrideMetadata?.fieldLink?.title || solutionEntity.fieldLink?.url.title

    const partnerTitle = solutionEntity.fieldPartner?.entity.partnerTitle
    const solutionImage =
      overrideMetadata?.fieldImage ||
      solutionEntity.fieldImage ||
      solutionEntity.fieldPartner?.entity.fieldMedia
    const image = solutionImage && resolveImage(solutionImage)

    const regions = solutionEntity.fieldRegions?.map((region) => {
      return region.entity.entityLabel
    })
    const industries = solutionEntity.fieldIndustries?.map((region) => {
      return region.entity.entityLabel
    })
    const id = solutionEntity.uuid
    return {
      solutionTitle,
      solutionUrl,
      solutionUrlTitle,
      partnerTitle,
      regions,
      industries,
      image,
      id,
    }
  })

  const regionsData = []
  const industriesData = []
  const partnersData = []

  const formatFilter = (items) => {
    const formattedItems = items.map((item) => {
      return {
        value: item,
        label: item.split("&amp;").join("&"),
      }
    })
    return formattedItems
  }

  const addTaxonomyToFilter = (item, filter) => {
    if (filter === "region" && !regionsData.includes(item)) {
      regionsData.push(item)
    }
    if (filter === "industry" && !industriesData.includes(item)) {
      industriesData.push(item)
    }
    if (filter === "partner" && !partnersData.includes(item)) {
      partnersData.push(item)
    }
  }
  partnerSolutions.forEach((partner) => {
    addTaxonomyToFilter(partner.partnerTitle, "partner")
    partner.regions.forEach((region) => {
      addTaxonomyToFilter(region, "region")
    })
    partner.industries.forEach((industry) => {
      addTaxonomyToFilter(industry, "industry")
    })
  })
  return {
    regionFilters: formatFilter(regionsData),
    industryFilters: formatFilter(industriesData),
    partnerFilters: formatFilter(partnersData),
    items: partnerSolutions,
  }
}

export function getUniqueArray(array, filterItem = "value") {
  if (!array?.length) {
    return []
  }
  const uniqueArray = array.filter((obj, index, self) => {
    return index === self.findIndex((t) => t[filterItem] === obj[filterItem])
  })
  return uniqueArray
}

export default formatPartnerSolutions
