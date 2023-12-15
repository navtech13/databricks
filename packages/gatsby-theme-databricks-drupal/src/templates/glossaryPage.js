import React, { useMemo } from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import { Button, Link, Cta, Breadcrumbs } from "databricks-ui"
import { Image } from "databricks-ui/src/components"
import { useBreakpoint } from "databricks-ui/src/utils/use-breakpoint"
import backgroundImageDefault from "databricks-ui/static/images/bg-glossary-landing.png"
import backgroundImageTabletDefault from "databricks-ui/static/images/bg-landing-tablet.png"
import HtmlParser from "../helpers/htmlParser"
import BaseLayout from "../components/base-layout"
import { useCurrentPrefix } from "../utils/current-prefix"
import useTranslate from "../utils/translate"
import resolveImage from "../utils/resolve-image"
import { componentResolver } from "../utils/component-resolver"

const styles = {
  wrapper:
    "xxl:max-w-[1456px] mx-auto lg:flex w-11/12 max-w-[508px] md:max-w-[704px] lg:max-w-[966px] xl:max-w-[1146px] pb-5 justify-center",
}

const GlossaryPage = ({
  data: { drupal },
  location,
  pageContext,
  backgroundImage,
  backgroundImageTablet,
  hasBackgroundImage,
}) => {
  const { glossaryPage, glossarySidebar } = drupal
  const components = componentResolver(glossaryPage.fieldComponents, pageContext)
  const prefix = useCurrentPrefix()
  const styles = {
    wrapper:
      "xxl:max-w-[1456px] mx-auto lg:flex w-11/12 max-w-[508px] md:max-w-[704px] lg:max-w-[966px] xl:max-w-[1146px] pb-5 justify-center",
  }
  const modifiedBodyValue = <HtmlParser content={glossaryPage?.body?.value} />
  const isDesktop = useBreakpoint("lg")
  const { translate } = useTranslate()
  const seo = {
    metaTags: glossaryPage.entityMetatags,
    image: glossaryPage?.fieldMedia?.entity?.fieldMediaImage,
    urls: {
      current: location.pathname,
    },
    translations: pageContext?.pathAliasTranslations,
  }

  const typeMap = [
    {
      text: translate("All"),
      to: `${prefix}/glossary`,
    },
    {
      text: `${glossaryPage.title}`,
      to: ``,
    },
  ]

  const image = isDesktop
    ? backgroundImage
    : backgroundImageTablet || backgroundImage

  const additionalResources = (
    <>
      {glossaryPage.fieldAdditionalResources.length > 0 && (
        <h2>{translate("glossary.additional-resources")}</h2>
      )}
      <ul className='!pl-0'>
        {glossaryPage.fieldAdditionalResources.map((itemResources) => (
          <li className='!ml-0 list-none !pl-0'>
            <Link
              className='text-2 text-navy-06 hover:text-navy-03 active:text-navy-06 arrow-icon block cursor-pointer'
              to={itemResources.uri}
            >
              {itemResources.title}
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
  const topContent = useMemo(() => {
    if (glossaryPage.fieldTopBannerDisplay) {
      return (
        <div className='mr-2.5'>
          <Link to={glossaryPage.fieldTopBannerImageLink.uri}>
            <Image
              className='w-full p-2'
              {...resolveImage(glossaryPage.fieldTopBannerImage)}
            />
          </Link>
        </div>
      )
    }

    if (!glossaryPage.fieldHideCta) {
      return (
        <div className='my-5 mt-0 py-5 pt-1'>
          <Cta
            ctas={[
              {
                to: `${prefix}/try-databricks?itm_data=BlogPosts-GetStarted-Trial`,
                text: translate("blog.try-free.cta"),
              },
            ]}
          >
            {translate("blog.try-free.body")}
          </Cta>
        </div>
      )
    }

    return null
  }, [glossaryPage])

  return (
    <div className='overflow-hidden'>
      {hasBackgroundImage && backgroundImage && (
        <div className='page-background-image relative'>
          <Image
            className='absolute z-[-1] w-[768px] md:w-[1023px] lg:w-full'
            aria-hidden
            {...image}
          />
        </div>
      )}
      <BaseLayout className='glossary-page' variant='default' seo={seo} skipToMain>
        <section>
          <div className={styles.wrapper}>
            <div className='lg:w-8/12 xl:w-8/12'>
              <div className='mb-8 pt-5'>
                <h1 className='text-5 mb-0.5' data-cy='title'>
                  {glossaryPage.title}
                </h1>
                <Breadcrumbs
                  className='mt-6'
                  enableLastLink={false}
                  items={typeMap}
                />
                {topContent && <div className='mt-4'>{topContent}</div>}
              </div>
              {glossaryPage?.body?.value ? (
                <>
                  <div className='rich-text-blog' data-cy='content'>
                    <div className='rich-text-glossary'>{modifiedBodyValue}</div>
                    {additionalResources}
                  </div>
                </>
              ) : (
                <>
                  {components}
                  <div className='rich-text-blog' data-cy='content'>
                    {additionalResources}
                  </div>
                </>
              )}
              <Button href={`${prefix}` + "/glossary"} className='mb-6'>
                {translate("glossary.back-to-glossary")}
              </Button>
            </div>

            {glossaryPage.fieldShowHideGlossaryCta && (
              <div className='pt-5 lg:w-4/12 lg:pl-3 xl:w-4/12'>
                <Link
                  to={
                    glossarySidebar.entities[0].fieldGlossaryComponent.entity
                      .fieldLink.uri
                  }
                >
                  <img
                    src={
                      glossarySidebar.entities[0].fieldGlossaryComponent.entity
                        .fieldImage.entity.fieldMediaImage.url
                    }
                    alt={
                      glossarySidebar.entities[0].fieldGlossaryComponent.entity
                        .fieldImage.entity.fieldMediaImage.alt
                    }
                  />
                </Link>
                <p>{glossarySidebar.entities[0].fieldSidebarShortDescription}</p>
                <Link
                  to={
                    glossarySidebar.entities[0].fieldGlossaryComponent.entity
                      .fieldLink.uri
                  }
                >
                  {
                    glossarySidebar.entities[0].fieldGlossaryComponent.entity
                      .fieldLink.title
                  }
                </Link>
                {glossaryPage.fieldShowHideGlossaryBlurb && (
                  <p>
                    {glossaryPage.fieldGlossaryRightColumnBlu.value
                      .replace(/(<([^>]+)>)/gi, "")
                      .replace(/&nbsp;/gi, " ")}
                  </p>
                )}
              </div>
            )}
          </div>
        </section>
      </BaseLayout>
    </div>
  )
}

GlossaryPage.propTypes = {
  data: PropTypes.shape({
    drupal: PropTypes.shape({
      glossaryPage: PropTypes.shape({
        title: PropTypes.string,
        entityMetatags: PropTypes.arrayOf(PropTypes.shape({})),
        body: PropTypes.shape({
          value: PropTypes.string,
        }),
        fieldHideCta: PropTypes.bool,
        entityUrl: PropTypes.shape({
          path: PropTypes.string,
        }),
      }),
    }),
  }).isRequired,

  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
  hasBackgroundImage: PropTypes.bool,
  backgroundImage: PropTypes.shape({}),
  backgroundImageTablet: PropTypes.shape({}),
}

GlossaryPage.defaultProps = {
  backgroundImage: {
    src: backgroundImageDefault,
    alt: "",
  },
  backgroundImageTablet: {
    src: backgroundImageTabletDefault,
    alt: "",
  },
  hasBackgroundImage: true,
}

export const pageQuery = graphql`
  query glossary($vid: String!, $language: Drupal_LanguageId!) {
    drupal {
      glossaryPage: nodeRevisionById(id: $vid, language: $language) {
        ...NodeGlossaries
      }
      glossarySidebar: siteSettingEntityQuery(
        filter: {
          conditions: [
            { operator: EQUAL, field: "type", value: ["glossary_sidebar"] }
            { operator: EQUAL, field: "status", value: ["1"] }
          ]
        }
      ) {
        entities(language: $language) {
          ... on Drupal_SiteSettingEntityGlossarySidebar {
            id
            name
            fieldGlossaryComponent {
              entity {
                id
                ... on Drupal_ParagraphImage {
                  id
                  fieldImage {
                    entity {
                      path {
                        alias
                        pid
                        langcode
                        pathauto
                      }
                      ... on Drupal_MediaImage {
                        mid
                        uuid
                        fieldMediaImage {
                          width
                          url
                          title
                          targetId
                          height
                          alt
                        }
                      }
                    }
                  }
                  fieldLink {
                    title
                    uri
                    url {
                      path
                    }
                    options
                  }
                }
              }
            }
            fieldSidebarShortDescription
          }
        }
      }
    }
  }
`

export default GlossaryPage
