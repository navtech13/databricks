import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import {
  LegalPageContent,
  RichText,
  Wrapper,
  InPageNavigationVertical,
  MobileMenu,
  StickyWrapper,
} from "databricks-ui"
import BaseLayout from "../components/base-layout"
import { componentResolver } from "../utils/component-resolver"
import useTranslate from "../utils/translate"
import HtmlParser from "../helpers/htmlParser"

// eslint-disable-next-line no-unused-vars
import { menuMapper, menuLangMapper } from "../utils/menu-mapper"
import stringSlugify from "../helpers/stringSlugify"

const LegalPage = ({ data: { drupal }, location: { pathname }, pageContext }) => {
  const { legalPage, legalSubnav } = drupal
  const components = componentResolver(legalPage?.fieldComponents)
  const topComponents = componentResolver(legalPage?.fieldTopContent)
  const containerRef = React.useRef()

  const hasHero = topComponents?.length === 0

  const { translate } = useTranslate()

  let modifiedBodyValue
  if (legalPage?.body?.processed) {
    modifiedBodyValue = <HtmlParser content={legalPage.body.processed} />
  }

  // TODO: implement SEO image
  const seo = {
    metaTags: legalPage?.entityMetatags,
    urls: {
      current: pathname,
    },
    translations: pageContext?.pathAliasTranslations,
  }

  const menuLinks = menuMapper(
    legalSubnav?.links.map((link) => ({
      ...link,
      url: link?.url,
    })),
    true
  )

  const mainComponents = (
    <div>
      {hasHero && (
        <h2 className='mb-1' data-cy='title'>
          {legalPage.title}
        </h2>
      )}
      <RichText className='rich-text-body'>{modifiedBodyValue}</RichText>
    </div>
  )

  return (
    <BaseLayout
      className={`legal-page legal-page${stringSlugify(pathname)}`}
      variant='default'
      seo={seo}
      skipToMain
      useMainTag={false}
    >
      <LegalPageContent title={legalPage?.title} header={translate("legal.header")}>
        <div className='legal-hero'>{topComponents}</div>
        {legalPage?.fieldShowSidebarNavigation &&
          legalPage?.body &&
          modifiedBodyValue && (
            <main id='main'>
              <div className='flex w-full flex-col'>
                <Wrapper>
                  <div className={`${hasHero ? "lg:pt-8" : ""}  w-full`}>
                    <div
                      ref={containerRef}
                      className='relative flex flex-row items-start lg:gap-4'
                    >
                      <div className='lg:min-w-[262px]'>
                        <StickyWrapper containerRef={containerRef}>
                          <MobileMenu>
                            <InPageNavigationVertical
                              skipToMain
                              skipLink='#legal-main'
                              links={menuLinks}
                            />
                          </MobileMenu>
                        </StickyWrapper>
                      </div>
                      <div id='legal-main'>{mainComponents}</div>
                    </div>
                  </div>
                </Wrapper>
              </div>
            </main>
          )}
        {!legalPage?.fieldShowSidebarNavigation &&
          legalPage?.body &&
          modifiedBodyValue && (
            <Wrapper>
              <div className={`${hasHero ? "lg:pt-8" : ""}  w-full`}>
                {mainComponents}
              </div>
            </Wrapper>
          )}

        {components && (
          <Wrapper className='legal-wrapper mx-auto grow md:w-11/12'>
            <div className={`lg:w-${legalPage?.fieldColumnWidth || "6"}/12`}>
              {components}
            </div>
          </Wrapper>
        )}
      </LegalPageContent>
    </BaseLayout>
  )
}

LegalPage.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
  data: PropTypes.shape({
    drupal: PropTypes.shape({
      legalPage: PropTypes.shape({
        title: PropTypes.string,
        fieldShowSidebarNavigation: PropTypes.bool,
        entityMetatags: PropTypes.arrayOf(PropTypes.shape({})),
        fieldComponents: PropTypes.arrayOf(PropTypes.shape({})),
        body: PropTypes.shape({
          processed: PropTypes.string,
        }),
      }),
      legalSubnav: PropTypes.shape({
        title: PropTypes.string,
        links: PropTypes.arrayOf,
      }),
    }),
  }).isRequired,
}

export const pageQuery = graphql`
  query legalPage($vid: String!, $language: Drupal_LanguageId!) {
    drupal {
      legalPage: nodeRevisionById(id: $vid, language: $language) {
        ...NodeLegal
      }

      legalSubnav: menuByName(name: "legal", language: $language) {
        title: name
        links {
          ...MenuLink
          links {
            ...MenuLink
            links {
              ...MenuLink
            }
          }
        }
      }
    }
  }
`

export default LegalPage
