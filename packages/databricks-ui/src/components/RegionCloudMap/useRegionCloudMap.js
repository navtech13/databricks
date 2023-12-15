import { useState } from "react"
import AllCloudRegionsMap from "../../../static/images/01-cloud-regions-all.png"
import AWSCloudRegionsMap from "../../../static/images/02-cloud-regions-aws.png"
import AzureCloudRegionsMap from "../../../static/images/03-cloud-regions-azure.png"
import GoogleCloudRegionsMap from "../../../static/images/04-cloud-regions-google.png"

const UseRegionCloudMap = (regions) => {
  const fallBackData = [
    {
      id: 1,
      color: "orange-04",
      title: "All",
      link: null,
      image: {
        src: AllCloudRegionsMap,
        url: "image container",
      },
    },
    {
      id: 2,
      label: "AWS",
      color: "yellow-600",
      link: null,
      image: {
        src: AWSCloudRegionsMap,
        alr: "image container",
      },
    },
    {
      id: 3,
      label: "Azure",
      color: "blue-500",
      link: null,
      image: {
        url: AzureCloudRegionsMap,
        alt: "image container",
      },
    },
    {
      id: 4,
      label: "Google",
      color: "green-04",
      link: null,
      image: {
        url: GoogleCloudRegionsMap,
        alt: "image container",
      },
    },
  ]

  const colorMap = {
    All: "orange-04",
    AWS: "yellow-600",
    Azure: "blue-500",
    Google: "green-04",
  }

  const regionalCloudMaps = regions
    ? regions.map((region) => ({
        ...region,
        color: colorMap[region.title],
      }))
    : fallBackData

  const [activeTab, setActiveTab] = useState({
    ...regionalCloudMaps[0],
  })
  const [isZoomOpen, setIsZoomOpen] = useState(false)

  const handleTabClick = (map) => {
    setActiveTab(map)
  }

  const handleZoomClick = () => {
    setIsZoomOpen(!isZoomOpen)
  }

  return {
    isZoomOpen,
    activeTab,
    regionalCloudMaps,
    handleTabClick,
    handleZoomClick,
  }
}

export default UseRegionCloudMap
