/* eslint-disable react/destructuring-assignment */
import React, { useEffect, useState } from "react"
import { Script, graphql } from "gatsby"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import ReactHtmlParser from "react-html-parser"
import { useLocation } from "@reach/router"
import { checkCookieConsent } from "gatsby-theme-databricks-drupal/src/helpers/eventTracking"
import getQueryParam from "gatsby-theme-databricks-drupal/src/helpers/getQueryParam"
import BaseLayout from "gatsby-theme-databricks-drupal/src/components/base-layout"
import {
  Hero,
  Link,
  RichText,
  StickyNavigation,
  ContentWrapper,
} from "databricks-ui"
import Cookies from "js-cookie"

const JobDetail = ({ data, pageContext, location: { pathname } }) => {
  const job = data.greenhouseJob
  const menuData = data.drupal?.paragraphsLibraryItemById.paragraphs.entity
  const urlPath = useLocation()
  const [cookieConsent, setCookieConsent] = useState(false)

  const seo = {
    skipMetaImage: true,
    // metaTags: article.entityMetatags,
    image:
      "https://www.databricks.com/wp-content/uploads/2022/04/databricks-careers-og-image.png",
    urls: {
      current: pathname,
    },
  }
  function checkConsent() {
    const loadForm = () => {
      if (!window.Grnhse) {
        setTimeout(loadForm, 500)
      } else {
        window.Grnhse.Settings.scrollOnLoad = false
        window.Grnhse.Iframe.load(job.gh_Id)
      }
    }

    // check cookie consent
    const oneTrustCookie = Cookies.get("OptanonConsent")
    if (
      typeof oneTrustCookie !== "undefined" &&
      getQueryParam("groups", oneTrustCookie)
    ) {
      if (checkCookieConsent("C0002") && checkCookieConsent("C0004")) {
        // load form if cookie consented
        setCookieConsent(true)
        loadForm()
      }
    }
  }

  useEffect(() => {
    function addOneTrustConsentChangedEvent() {
      if (typeof OneTrust !== "undefined") {
        window.OneTrust.OnConsentChanged(() => {
          checkConsent()
        })
      } else {
        setTimeout(addOneTrustConsentChangedEvent, 300)
      }
    }
    addOneTrustConsentChangedEvent()
    checkConsent()
  }, [job.gh_Id, cookieConsent])

  const JobForm = (job) => {
    if (!job.questions || !job.gh_Id) return null
    return (
      <div id='grnhse_app' className='bg-gray-cool'>
        {!cookieConsent && (
          <ContentWrapper>
            <h3 className='py-5'>
              To apply,{" "}
              <button type='button' onClick={openOneTrust}>
                click here
              </button>{" "}
              and accept cookies
            </h3>
          </ContentWrapper>
        )}
      </div>
    )
  }

  function openOneTrust() {
    if (typeof OneTrust !== "undefined") {
      // eslint-disable-next-line no-undef
      window.OneTrust.ToggleInfoDisplay()
    }
  }

  function scrollToApplication() {
    checkConsent()
    const appForm = document.getElementById("apply")
    appForm.scrollIntoView({ behavior: "smooth" }, true)
  }

  const locations = job.location?.name
  if (pageContext.embedGreenhouseForm) {
    job.embedGreenhouseForm = pageContext.embedGreenhouseForm
    seo.link = [
      {
        hrefLang: "en",
        rel: "alternate",
        href: `https://www.databricks.com${urlPath.pathname}`,
      },
    ]
    seo.pageMeta = [
      {
        id: "gh_id",
        name: "gh:id",
        content: job.gh_Id,
      },
      {
        id: "careers_title",
        property: "og:title",
        content: job.title,
      },
      {
        id: "careers_description",
        property: "og:description",
        content: `${job.title}, ${locations}. Join us! Together we can use data to solve the challenges of tomorrow`,
      },
      {
        id: "careers_url",
        property: "og:url",
        content: `https://www.databricks.com${pathname}`,
      },
      {
        id: "careers_image",
        property: "og:image",
        content:
          "https://www.databricks.com/wp-content/uploads/2022/04/databricks-careers-og-image.png",
      },
      {
        id: "careers_description",
        name: "description",
        content: `${job.title}, ${locations}. Join us! Together we can use data to solve the challenges of tomorrow.`,
      },
    ]
  }

  const menuItems = menuData.fieldLinks?.map((item) => {
    return {
      to: item.url?.path,
      label: item.title,
    }
  })
  const stringifyjobcontent = JSON.stringify(job.content)
  const replacejobcontent = stringifyjobcontent.replace(
    /\&lt;p\&gt;(?:\s|\&amp;nbsp;)*\&lt;\/p\&gt;/gi,
    ""
  )
  const parsedjobcontent = JSON.parse(replacejobcontent)
  return (
    <>
      <BaseLayout
        className='job-detail-page'
        variant='default'
        seo={seo}
        skipToMain
        useMainTag={false}
      >
        <>
          <Helmet script={seo.scripts} meta={seo.pageMeta} link={seo.link}>
            <title>{job.title}</title>
          </Helmet>
        </>
        <StickyNavigation
          key={menuData.uuid}
          showBorder
          colorVariant='warmLight'
          items={menuItems}
          className='mb-4'
        />
        <div className='inner-wrapper'>
          <Link to='/company/careers/open-positions'>Back to search results</Link>
        </div>
        <Hero title={job.title} variant='bannerWhite' container={false}>
          {locations}
          <p>
            <button
              type='button'
              onClick={() => scrollToApplication()}
              data-cy='Button'
              className='b4 btn-primary mr-2 mt-2.5 inline-block py-1 px-2.5 transition duration-200 ease-in-out hover:no-underline'
            >
              Apply now
            </button>
          </p>
        </Hero>
        <main id='main'>
          <section>
            <div className='inner-wrapper'>
              <RichText
                variant='blog'
                className='rich-text-body b2 w-full lg:w-7/12'
              >
                <div
                  dangerouslySetInnerHTML={{
                    __html: ReactHtmlParser(parsedjobcontent),
                  }}
                />
              </RichText>
            </div>
            <div id='apply' className='mt-4 w-full'>
              <JobForm {...job} />
            </div>
          </section>
        </main>
      </BaseLayout>
      <Script
        src={`https://boards.greenhouse.io/embed/job_board/js?for=${pageContext.greenhouseBoardToken}`}
      />
    </>
  )
}
export default JobDetail

export const query = graphql`
  query JobPostQuery($id: String!) {
    greenhouseJob(id: { eq: $id }) {
      id
      gh_Id
      absolute_url
      internal_job_id
      updated_at
      offices {
        id
        name
      }
      location {
        name
      }
      departments {
        name
      }
      title
      content
      questions {
        label
        required
        fields {
          name
          type
          values {
            label
            value
          }
        }
      }
    }
    drupal {
      paragraphsLibraryItemById(id: "2") {
        paragraphs {
          entity {
            ...ParagraphSecondaryMenu
          }
        }
      }
    }
  }
`

JobDetail.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
  data: PropTypes.shape({
    drupal: PropTypes.shape({
      landingPage: PropTypes.shape({
        title: PropTypes.string,
        entityMetatags: PropTypes.arrayOf(PropTypes.shape({})),
        fieldComponents: PropTypes.arrayOf(PropTypes.shape({})),
        fieldDisplayBackgroundImage: PropTypes.bool,
      }),
    }),
    greenhouseJob: PropTypes.string,
  }).isRequired,
  pageContext: PropTypes.shape().isRequired,
}
