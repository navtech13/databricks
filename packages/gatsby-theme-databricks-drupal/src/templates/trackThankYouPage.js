/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import PropTypes from "prop-types"
import { graphql, navigate } from "gatsby"
import { Button, IconResolver, RichText, SelectCheckbox } from "databricks-ui"
import { useBreakpoint } from "databricks-ui/src/utils/use-breakpoint"
import EmbedVideo from "databricks-ui/src/components/EmbedVideo"
import PlaySlider from "databricks-ui/src/components/PlaySlider/PlaySlider"
import EmbedPdf from "databricks-ui/src/components/EmbedPdf"
import BaseLayout from "../components/base-layout"
import AssetCard from "../components/asset-card"
import { componentResolver } from "../utils/component-resolver"
import { downloadFromUrl, validateFileFormat } from "../utils/downloadAsset"
import getKnownLead, {
  identifyUser,
  refreshLeadCookie,
  submitLeadForm,
} from "../helpers/mktoLead"
import useTranslate from "../utils/translate"
import eventTracking, { sendRudderStackPageView } from "../helpers/eventTracking"

const identifyEvent = async (counter = 0) => {
  if (counter > 5) {
    console.log("Lead information not found after 5 tries")
  } else {
    const success = await identifyUser()

    if (!success) {
      setTimeout(() => {
        identifyEvent(counter + 1)
      }, 2000)
    }
  }
}

const SLIDER_BREAKPOINTS = {
  0: {
    slidesPerView: 1,
    spaceBetween: 16,
  },
  320: {
    slidesPerView: 1.35,
    spaceBetween: 16,
  },
  425: {
    slidesPerView: 1.5,
    spaceBetween: 16,
  },
  480: {
    slidesPerView: 1.7,
    spaceBetween: 16,
  },
  520: {
    slidesPerView: 2,
    spaceBetween: 16,
  },
  640: {
    slidesPerView: 2.4,
    spaceBetween: 16,
  },
  740: {
    slidesPerView: 3,
    spaceBetween: 16,
  },
  992: {
    slidesPerView: 4,
    spaceBetween: 16,
  },
}

const TrackThankYouPage = ({
  data: { drupal },
  location: { pathname, search },
  pageContext,
}) => {
  const { thankYouPage } = drupal
  const { translate } = useTranslate()
  const isDesktop = useBreakpoint("xl")
  const sliderRef = useRef()
  const [isCollapsed, setIsCollapsed] = useState(true)
  const [activeId, setActiveId] = useState(pageContext.id)
  const [activeFile, setActiveFile] = useState("")
  const DEFAULT_OPTION = { label: translate("All"), value: "all" }
  const [selectedAssets, setSelectedAssets] = useState([DEFAULT_OPTION])
  const track = pageContext?.track

  const bottomCTA = componentResolver(thankYouPage.fieldBottomContent)

  const handleResourceClick = async (resource) => {
    if (resource.id !== activeId) {
      setActiveId(resource.id)

      if (!isDesktop) setIsCollapsed(true)

      // submit marketo form
      const referrerUrl = `${process.env.GATSBY_DEPLOY_URL}${resource.url}-track`
      window.history.replaceState({}, "", `${referrerUrl}/thank-you`)
      sendRudderStackPageView(resource.title)
      const language = pageContext?.language ? pageContext?.language : "EN"
      const success = await submitLeadForm(
        "1001",
        referrerUrl,
        language,
        true,
        resource.campaignId ? resource.campaignId : null,
        "content_track"
      )
      getKnownLead()
        .then(async (response) => {
          if (response && !response?.newCookie && !response?.known) {
            refreshLeadCookie()
          }
        })
        .catch((e) => console.log(e))

      if (!success) {
        // redirect user back to content form of requested resource
        navigate(referrerUrl)
      } else {
        // trigger Track Content Viewed event
        const eventData = {
          event: "Track Content Viewed",
          trackId: track.id,
          trackName: track.title,
          trackSequenceTotal: track.resourceCount,
          trackSequenceCurrent: resource.order,
          contentType: resource.category,
          contentId: resource.id,
          contentName: resource.title,
          contentSourceUrl: `${process.env.GATSBY_DEPLOY_URL}${resource.url}`,
          supplementalContentDisplayed: track.supplementalContentDisplayed,
        }
        eventTracking(eventData)
      }
    }
  }

  const data = useMemo(() => {
    const assetOptions = []
    let resourceList = []
    let description
    let downloadLabel
    let selectLabel
    let selectedResource

    if (track?.resources) {
      const { resources, ctaLabel, dropdownLabel } = track
      if (ctaLabel) downloadLabel = ctaLabel
      if (dropdownLabel) selectLabel = dropdownLabel

      const resourceTracks = resources.map((resource) => {
        const active = activeId === resource.id

        if (active && activeFile !== resource?.asset) {
          setActiveFile(resource?.asset)
        }

        if (active) {
          selectedResource = resource
        }

        return (
          <AssetCard
            key={resource.id}
            resource={resource}
            onClick={handleResourceClick}
            isActive={active}
          />
        )
      })
      resourceList.push(resourceTracks)
    }

    if (track.description) {
      description = track.description
    }

    // Get valid asset options for the dropdown
    track?.ctas?.forEach((item) => {
      if (validateFileFormat(item.url)) {
        assetOptions.push({
          label: item.title,
          value: item.url,
        })
      }
    })

    // 10 items max
    resourceList = resourceList.flat().slice(0, 10)
    const sliderResourceList = resourceList.map((content, id) => ({ id, content }))

    return {
      resourceList,
      sliderResourceList,
      assetOptions,
      downloadLabel,
      selectLabel,
      description,
      selectedResource,
    }
  }, [activeFile, activeId])

  useEffect(() => {
    const searchParams = new URLSearchParams(search)
    const formId = searchParams.get("form-id")
    const language = searchParams.get("language")

    identifyEvent()

    // if arrived by skip form
    const submitForm = async (counter = 0) => {
      if (counter > 5) {
        console.log("Lead information not found after 5 tries")
        return
      }

      const success = await submitLeadForm(
        formId,
        `${window.location}`,
        language,
        false
      )
      if (!success) {
        setTimeout(() => {
          submitForm(counter + 1)
        }, 2000)
      } else {
        getKnownLead()
          .then(async (response) => {
            // Tracks the redirect as a "Fill out form" activity
            // once the use lands on the resource ty page, the cookie will be refreshed if
            // there was an existing cookie and the user was an unknown lead
            if (response && !response?.newCookie && !response?.known) {
              refreshLeadCookie()
            }
          })
          .catch((e) => console.log(e))
      }
    }

    if (formId && language) {
      submitForm()
    }

    // trigger Track Content Viewed event for initial page load
    if (data.selectedResource) {
      const eventData = {
        event: "Track Content Viewed",
        trackId: track.id,
        trackName: track.title,
        trackSequenceTotal: track.resourceCount,
        trackSequenceCurrent: data.selectedResource.order,
        contentType: data.selectedResource.category,
        contentId: data.selectedResource.id,
        contentName: data.selectedResource.title,
        contentSourceUrl: `${process.env.GATSBY_DEPLOY_URL}${data.selectedResource.url}`,
        supplementalContentDisplayed: track.supplementalContentDisplayed,
      }
      eventTracking(eventData)
    }
  }, [])

  const downloadAsset = () => {
    selectedAssets.forEach(({ value: url }) => {
      const isValidAsset = validateFileFormat(url)
      const isNotDefault = url !== "all"

      if (isNotDefault && isValidAsset) {
        downloadFromUrl(url)

        // trigger Track Supplemental Content Downloaded event
        const eventData = {
          event: "Track Supplemental Content Downloaded",
          trackId: track.id,
          trackName: track.title,
          trackSequenceTotal: track.resourceCount,
          trackSequenceCurrent: data.selectedResource.order,
          contentType: data.selectedResource.category,
          contentId: data.selectedResource.id,
          contentName: data.selectedResource.title,
          contentSourceUrl: `${process.env.GATSBY_DEPLOY_URL}${data.selectedResource.url}`,
          supplementalContentType: "notebook",
          supplementalContentSourceUrl: `${process.env.GATSBY_DEPLOY_URL}${url}`,
        }
        eventTracking(eventData)
      } else if (isNotDefault) {
        console.log("Error: Could not download the file, not supported format.")
      }
    })
  }

  const handleSlide = (direction) => {
    return () => {
      if (sliderRef.current) {
        if (direction === "left") {
          sliderRef.current.swiper.slidePrev()
        }

        if (direction === "right") {
          sliderRef.current.swiper.slideNext()
        }
      }
    }
  }

  const RecommendedTracks = useCallback(() => {
    const isExtended = !isDesktop && !isCollapsed

    const horizontalTrackControls = !isDesktop && (
      <div className='mx-1/3 py-1.6 flex justify-center px-2 text-white'>
        {!isCollapsed && (
          <button type='button' aria-label='Previous' onClick={handleSlide("left")}>
            <IconResolver token='chevronLeft' />
          </button>
        )}
        <span
          className='text-1.2 mx-auto flex items-center text-xs uppercase'
          role='button'
          tabIndex='0'
          onClick={() => setIsCollapsed((prev) => !prev)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              setIsCollapsed((prev) => !prev)
            }
          }}
        >
          <IconResolver
            token={isCollapsed ? "plus" : "minus"}
            className='w-1.6 h-1.6 p-0.4 mr-0.5'
          />
          {translate("card.tag.recommended")}
        </span>
        {!isCollapsed && (
          <button type='button' aria-label='Next' onClick={handleSlide("right")}>
            <IconResolver token='chevronRight' />
          </button>
        )}
      </div>
    )

    return (
      <div className='min-h-[50px]'>
        <div
          className={`max-h-full xl:overflow-y-scroll${
            isExtended ? " bg-navy-06 absolute bottom-12 w-full" : ""
          }`}
        >
          {horizontalTrackControls}
          {isDesktop ? (
            <div>{data.resourceList}</div>
          ) : !isCollapsed ? (
            <PlaySlider
              items={data.sliderResourceList}
              controls={false}
              columns={[1, 2, 3]}
              autoplay={false}
              ref={sliderRef}
              breakpoints={SLIDER_BREAKPOINTS}
            />
          ) : (
            <></>
          )}
        </div>
      </div>
    )
  }, [data.resourceList, isDesktop, isCollapsed])

  const renderedAsset = useMemo(() => {
    if (!activeFile) {
      return <></>
    }

    return (
      <div className='bg-navy-06 text-white xl:w-3/4'>
        {activeFile?.includes(".pdf") ? (
          <EmbedPdf src={activeFile} fallbackLabel={data.downloadLabel} />
        ) : (
          // video src
          <div className='relative h-full min-h-[32rem] w-full xl:min-h-[0]'>
            <EmbedVideo
              videoSrc={activeFile}
              className='!absolute h-full w-full pt-0'
              key={activeFile}
            />
          </div>
        )}
      </div>
    )
  }, [activeFile])

  const seo = {
    metaTags: thankYouPage.entityMetatags,
    image: thankYouPage?.fieldMedia?.entity?.fieldMediaImage,
    urls: {
      current: pathname,
    },
    translations: pageContext?.pathAliasTranslations,
    forceNoRobots: true,
  }

  return (
    <>
      <BaseLayout
        className='thank-you-page'
        variant='simple'
        headerBgColor='bg-gray-warm-medium'
        seo={seo}
      >
        {data?.description && (
          <RichText className='inner-wrapper h4 my-1.6 lg:my-3'>
            {data.description}
          </RichText>
        )}
        <section className='bg-navy-06'>
          <div className='relative flex flex-col-reverse xl:h-[85vh] xl:flex-row'>
            <div className='bg-navy-06 z-20 flex flex-col justify-between xl:w-1/4 xl:bg-white'>
              <RecommendedTracks />
              {data.assetOptions?.length > 0 && (
                <div className='border-gray-lines flex items-end justify-center gap-2 border-t bg-white p-2.5'>
                  <div className='min-w-[200px]'>
                    <span className='text-navy-600'>
                      {data.selectLabel || "Get the Notebook"}
                    </span>
                    <SelectCheckbox
                      id='asset-options'
                      onChange={setSelectedAssets}
                      value={selectedAssets}
                      options={data.assetOptions}
                    />
                  </div>
                  <Button
                    as='button'
                    variant='primary'
                    className='h-[39px] py-[2px] leading-5'
                    onClick={downloadAsset}
                  >
                    {data.downloadLabel || "Download"}
                  </Button>
                </div>
              )}
            </div>
            {!isCollapsed && (
              <div className='bg-nav-gray absolute top-0 z-10 h-full w-full opacity-80' />
            )}
            {renderedAsset}
          </div>
        </section>
        {bottomCTA}
      </BaseLayout>
    </>
  )
}

TrackThankYouPage.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
  data: PropTypes.shape({
    drupal: PropTypes.shape({
      thankYouPage: PropTypes.shape({
        title: PropTypes.string,
        fieldMedia: PropTypes.shape({
          entity: PropTypes.shape({
            fieldMediaImage: PropTypes.shape({}),
          }),
        }),
        entityMetatags: PropTypes.arrayOf(PropTypes.shape({})),
        fieldTopContent: PropTypes.arrayOf(PropTypes.shape({})),
        fieldBottomContent: PropTypes.arrayOf(PropTypes.shape({})),
      }),
    }),
  }).isRequired,
}

export const pageQuery = graphql`
  query thankYou($vid: String!, $language: Drupal_LanguageId!) {
    drupal {
      thankYouPage: nodeRevisionById(id: $vid, language: $language) {
        ...NodeThankYou
      }
    }
  }
`

export default TrackThankYouPage
