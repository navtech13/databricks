import React from "react"
import "react-medium-image-zoom/dist/styles.css"

import Zoom from "react-medium-image-zoom"
import PropTypes from "prop-types"
import { Link } from "databricks-ui"
import Image from "../Image"
import styles from "./styles"
import Wrapper from "../Wrapper"
import UseRegionCloudMap from "./useRegionCloudMap"

const RegionCloudMap = ({ title, regions }) => {
  const { regionalCloudMaps, activeTab, handleTabClick, handleZoomClick } =
    UseRegionCloudMap(regions)

  return (
    <Wrapper className={styles.sectionTitle} title={title}>
      <div className={styles.wrapper}>
        <div className={styles.tabsBar}>
          {regionalCloudMaps.map((region) => (
            <>
              <button
                type='button'
                key={region.id}
                className={styles.tabButton({
                  activeTabLabel: activeTab.title,
                  label: region.title,
                })}
                onClick={() => handleTabClick(region)}
              >
                <span>
                  <span className={styles.tabButtonVignette(region.color)} />
                  {region.title}
                </span>
              </button>
            </>
          ))}
        </div>
        <div className={styles.tabContentWrapper}>
          {regionalCloudMaps.map((region) => (
            <div
              key={region.title}
              className={styles.tabContent({
                activeTab: activeTab.title,
                currentTab: region.title,
                hasLink: !!region.link,
              })}
            >
              {region.link && (
                <Link className={styles.supportedLink} to={region.link?.url}>
                  {region.link?.title}
                </Link>
              )}
              <Zoom>
                <Image
                  loading='eager'
                  onClick={handleZoomClick}
                  className={styles.image}
                  alt={region.image.alt}
                  src={region.image.url}
                />
              </Zoom>
            </div>
          ))}
        </div>
      </div>
    </Wrapper>
  )
}

RegionCloudMap.propTypes = {
  title: PropTypes.string,
  regions: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      link: PropTypes.shape({
        title: PropTypes.string,
        url: PropTypes.string,
      }),
      image: PropTypes.shape({
        alt: PropTypes.string,
        url: PropTypes.string,
      }),
    })
  ),
}

RegionCloudMap.defaultProps = {
  title: "Cloud regions",
  regions: [],
}

export default RegionCloudMap
