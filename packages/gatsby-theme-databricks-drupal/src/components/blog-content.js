import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"
import { BlogContent as BlogContentComponent } from "databricks-ui"
import { useLanguageContext } from "./language-provider"
import { menuMapper, menuLangMapper } from "../utils/menu-mapper"
import { componentResolver } from "../utils/component-resolver"

const BlogContent = ({ featuredImage, showSidebar, children, sidebarOverride }) => {
  const { currentLanguage } = useLanguageContext()
  return (
    <StaticQuery
      query={graphql`
        query BlogContentQuery {
          secondaryNavigation: drupal {
            menu: menuByName(name: "blog-menu", language: EN) {
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
          secondaryNavigationDE: drupal {
            menu: menuByName(name: "blog-menu", language: DE) {
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
          secondaryNavigationFR: drupal {
            menu: menuByName(name: "blog-menu", language: FR) {
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
          secondaryNavigationIT: drupal {
            menu: menuByName(name: "blog-menu", language: IT) {
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
          secondaryNavigationJA: drupal {
            menu: menuByName(name: "blog-menu", language: JA) {
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
          secondaryNavigationKO: drupal {
            menu: menuByName(name: "blog-menu", language: KO) {
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
          secondaryNavigationBR: drupal {
            menu: menuByName(name: "blog-menu", language: BR) {
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
          blogSidebarEN: drupal {
            settings: siteSettingEntityQuery(
              filter: {
                conditions: [
                  { operator: EQUAL, field: "type", value: ["blog_sidebar"] }
                  { operator: EQUAL, field: "status", value: ["1"] }
                ]
              }
            ) {
              entities(language: EN) {
                ...SiteSettingBlogSidebar
              }
            }
          }
          blogSidebarDE: drupal {
            settings: siteSettingEntityQuery(
              filter: {
                conditions: [
                  { operator: EQUAL, field: "type", value: ["blog_sidebar"] }
                  { operator: EQUAL, field: "status", value: ["1"] }
                ]
              }
            ) {
              entities(language: DE) {
                ...SiteSettingBlogSidebar
              }
            }
          }
          blogSidebarFR: drupal {
            settings: siteSettingEntityQuery(
              filter: {
                conditions: [
                  { operator: EQUAL, field: "type", value: ["blog_sidebar"] }
                  { operator: EQUAL, field: "status", value: ["1"] }
                ]
              }
            ) {
              entities(language: FR) {
                ...SiteSettingBlogSidebar
              }
            }
          }
          blogSidebarIT: drupal {
            settings: siteSettingEntityQuery(
              filter: {
                conditions: [
                  { operator: EQUAL, field: "type", value: ["blog_sidebar"] }
                  { operator: EQUAL, field: "status", value: ["1"] }
                ]
              }
            ) {
              entities(language: IT) {
                ...SiteSettingBlogSidebar
              }
            }
          }
          blogSidebarJA: drupal {
            settings: siteSettingEntityQuery(
              filter: {
                conditions: [
                  { operator: EQUAL, field: "type", value: ["blog_sidebar"] }
                  { operator: EQUAL, field: "status", value: ["1"] }
                ]
              }
            ) {
              entities(language: JA) {
                ...SiteSettingBlogSidebar
              }
            }
          }
          blogSidebarKO: drupal {
            settings: siteSettingEntityQuery(
              filter: {
                conditions: [
                  { operator: EQUAL, field: "type", value: ["blog_sidebar"] }
                  { operator: EQUAL, field: "status", value: ["1"] }
                ]
              }
            ) {
              entities(language: KO) {
                ...SiteSettingBlogSidebar
              }
            }
          }
          blogSidebarBR: drupal {
            settings: siteSettingEntityQuery(
              filter: {
                conditions: [
                  { operator: EQUAL, field: "type", value: ["blog_sidebar"] }
                  { operator: EQUAL, field: "status", value: ["1"] }
                ]
              }
            ) {
              entities(language: BR) {
                ...SiteSettingBlogSidebar
              }
            }
          }
        }
      `}
      render={(data) => {
        const menuLinks = menuLangMapper(data, "secondary")
        const formattedMenus = {
          title: menuLinks?.title,
          links: menuLinks ? menuMapper(menuLinks?.links, true) : [],
        }

        const verifySidebarLang =
          data.blogSidebarEN?.settings?.entities[0]?.entityTranslations.filter(
            (item) => item.entityLanguage.id.toUpperCase() === currentLanguage.id
          )

        const currentSidebarLang =
          verifySidebarLang.length > 0
            ? `blogSidebar${currentLanguage.id}`
            : `blogSidebarEN`

        const sidebarItems =
          sidebarOverride?.length > 0
            ? componentResolver(sidebarOverride)
            : componentResolver(
                data[currentSidebarLang]?.settings?.entities[0]?.fieldComponents
              )

        return (
          <BlogContentComponent
            secondaryNavigation={formattedMenus}
            featuredImage={featuredImage}
            {...(showSidebar && { sidebarItems })}
          >
            {children}
          </BlogContentComponent>
        )
      }}
    />
  )
}

BlogContent.propTypes = {
  featuredImage: PropTypes.shape({}),
  children: PropTypes.node.isRequired,
  showSidebar: PropTypes.node,
  sidebarOverride: PropTypes.node,
}

BlogContent.defaultProps = {
  featuredImage: undefined,
  showSidebar: undefined,
}

export default BlogContent
