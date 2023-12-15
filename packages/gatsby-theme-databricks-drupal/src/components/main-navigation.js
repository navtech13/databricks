import React, { useState } from "react"
import { StaticQuery, graphql } from "gatsby"
import { MainNavigationBlock } from "databricks-ui"
import { menuMapper, menuLangMapper } from "../utils/menu-mapper"
import { useLanguageContext } from "./language-provider"

const MainNavigation = ({ ActivateSearch, variant }) => {
  const { defaultLanguage } = useLanguageContext()
  const [NavigationPopup, setNavigationPopup] = useState(false)
  return (
    <StaticQuery
      query={graphql`
        query LayoutQuery {
          menuLogos: drupal {
            settings: siteSettingEntityQuery(
              filter: {
                conditions: [
                  { operator: EQUAL, field: "type", value: ["header_logos"] }
                  { operator: EQUAL, field: "status", value: ["1"] }
                ]
              }
            ) {
              entities {
                ... on Drupal_SiteSettingEntityHeaderLogos {
                  fieldMobileImage {
                    image {
                      src: publicURL
                      alt: name
                    }
                    entity {
                      url
                      filename
                    }
                  }
                  fieldDesktopImage {
                    image {
                      src: publicURL
                      alt: name
                    }
                    entity {
                      url
                      filename
                    }
                  }
                }
              }
            }
          }
          mainNavigation: drupal {
            menu: menuByName(name: "main") {
              title: name
              links {
                ...MenuLink
                links {
                  ...MenuLink
                  items: fieldParagraphs {
                    __typename
                    entityTranslation(language: EN) {
                      ...ParagraphPromotion
                    }
                  }
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
          mainNavigationDE: drupal {
            menu: menuByName(name: "main", language: DE) {
              title: name
              links {
                ...MenuLink
                links {
                  ...MenuLink
                  items: fieldParagraphs {
                    __typename
                    entityTranslation(language: DE) {
                      ...ParagraphPromotion
                    }
                  }
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
          mainNavigationFR: drupal {
            menu: menuByName(name: "main", language: FR) {
              title: name
              links {
                ...MenuLink
                links {
                  ...MenuLink
                  items: fieldParagraphs {
                    __typename
                    entityTranslation(language: FR) {
                      ...ParagraphPromotion
                    }
                  }
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
          mainNavigationIT: drupal {
            menu: menuByName(name: "main", language: IT) {
              title: name
              links {
                ...MenuLink
                links {
                  ...MenuLink
                  items: fieldParagraphs {
                    __typename
                    entityTranslation(language: IT) {
                      ...ParagraphPromotion
                    }
                  }
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
          mainNavigationJA: drupal {
            menu: menuByName(name: "main", language: JA) {
              title: name
              links {
                ...MenuLink
                links {
                  ...MenuLink
                  items: fieldParagraphs {
                    __typename
                    entityTranslation(language: JA) {
                      ...ParagraphPromotion
                    }
                  }
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
          mainNavigationKO: drupal {
            menu: menuByName(name: "main", language: KO) {
              title: name
              links {
                ...MenuLink
                links {
                  ...MenuLink
                  items: fieldParagraphs {
                    __typename
                    entityTranslation(language: KO) {
                      ...ParagraphPromotion
                    }
                  }
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
          mainNavigationBR: drupal {
            menu: menuByName(name: "main", language: BR) {
              title: name
              links {
                ...MenuLink
                links {
                  ...MenuLink
                  items: fieldParagraphs {
                    __typename
                    entityTranslation(language: BR) {
                      ...ParagraphPromotion
                    }
                  }
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
          mainNavigationCta: drupal {
            menu: menuByName(name: "main-cta") {
              title: name
              links {
                ...MenuLink
              }
            }
          }
          mainNavigationCtaDE: drupal {
            menu: menuByName(name: "main-cta", language: DE) {
              title: name
              links {
                ...MenuLink
              }
            }
          }
          mainNavigationCtaFR: drupal {
            menu: menuByName(name: "main-cta", language: FR) {
              title: name
              links {
                ...MenuLink
              }
            }
          }
          mainNavigationCtaIT: drupal {
            menu: menuByName(name: "main-cta", language: IT) {
              title: name
              links {
                ...MenuLink
              }
            }
          }
          mainNavigationCtaJA: drupal {
            menu: menuByName(name: "main-cta", language: JA) {
              title: name
              links {
                ...MenuLink
              }
            }
          }
          mainNavigationCtaKO: drupal {
            menu: menuByName(name: "main-cta", language: KO) {
              title: name
              links {
                ...MenuLink
              }
            }
          }
          mainNavigationCtaBR: drupal {
            menu: menuByName(name: "main-cta", language: BR) {
              title: name
              links {
                ...MenuLink
              }
            }
          }
        }
      `}
      render={(data) => {
        const menuLinks = menuLangMapper(data, "main").links
        const [homeLink, ...mainLinks] = menuMapper(menuLinks, defaultLanguage)
        const ctaMenuLinks = menuLangMapper(data, "cta").links

        const mainNavigation = {
          variant,
          image: {
            to: homeLink.to,
            alt: homeLink.label,
            desktop: data.menuLogos.settings.entities[0].fieldDesktopImage.image,
            mobile: data.menuLogos.settings.entities[0].fieldMobileImage.image,
          },
          navigation_behavior: {
            ToggleSearchVariable: NavigationPopup,
            ToggleSearchComponent() {
              setNavigationPopup((e) => !e)
              ActivateSearch()
            },
          },
          menus: [
            {
              divider: true,
              links: mainLinks,
            },
            {
              links: menuMapper(ctaMenuLinks, defaultLanguage).map(
                (value, index) => ({
                  ...value,
                  type: index === 0 ? "button" : "text",
                })
              ),
            },
          ],
        }

        return <MainNavigationBlock {...mainNavigation} />
      }}
    />
  )
}

export default MainNavigation
