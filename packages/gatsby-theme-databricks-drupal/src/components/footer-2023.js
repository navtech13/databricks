import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { FooterBlock2023 } from "databricks-ui"
import { menuMapper, menuLangMapper } from "../utils/menu-mapper"
import { componentResolver } from "../utils/component-resolver"

const Footer = () => {
  return (
    <StaticQuery
      query={graphql`
        query FooterQuery2023 {
          footerMenu: drupal {
            menu: menuByName(name: "footer2023", language: EN) {
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
          footerMenuDE: drupal {
            menu: menuByName(name: "footer2023", language: DE) {
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
          footerMenuFR: drupal {
            menu: menuByName(name: "footer2023", language: FR) {
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
          footerMenuIT: drupal {
            menu: menuByName(name: "footer2023", language: IT) {
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
          footerMenuJA: drupal {
            menu: menuByName(name: "footer2023", language: JA) {
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
          footerMenuKO: drupal {
            menu: menuByName(name: "footer2023", language: KO) {
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
          footerMenuBR: drupal {
            menu: menuByName(name: "footer2023", language: BR) {
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
          footer: drupal {
            settings: siteSettingEntityQuery(
              filter: {
                conditions: [
                  { operator: EQUAL, field: "type", value: ["footer_2023"] }
                  { operator: EQUAL, field: "status", value: ["1"] }
                ]
              }
            ) {
              entities {
                ...SiteSettingFooter2023
              }
            }
          }
          footerDE: drupal {
            settings: siteSettingEntityQuery(
              filter: {
                conditions: [
                  { operator: EQUAL, field: "type", value: ["footer_2023"] }
                  { operator: EQUAL, field: "status", value: ["1"] }
                ]
              }
            ) {
              entities(language: DE) {
                ...SiteSettingFooter2023
              }
            }
          }
          footerFR: drupal {
            settings: siteSettingEntityQuery(
              filter: {
                conditions: [
                  { operator: EQUAL, field: "type", value: ["footer_2023"] }
                  { operator: EQUAL, field: "status", value: ["1"] }
                ]
              }
            ) {
              entities(language: FR) {
                ...SiteSettingFooter2023
              }
            }
          }
          footerIT: drupal {
            settings: siteSettingEntityQuery(
              filter: {
                conditions: [
                  { operator: EQUAL, field: "type", value: ["footer_2023"] }
                  { operator: EQUAL, field: "status", value: ["1"] }
                ]
              }
            ) {
              entities(language: IT) {
                ...SiteSettingFooter2023
              }
            }
          }
          footerJA: drupal {
            settings: siteSettingEntityQuery(
              filter: {
                conditions: [
                  { operator: EQUAL, field: "type", value: ["footer_2023"] }
                  { operator: EQUAL, field: "status", value: ["1"] }
                ]
              }
            ) {
              entities(language: JA) {
                ...SiteSettingFooter2023
              }
            }
          }
          footerKO: drupal {
            settings: siteSettingEntityQuery(
              filter: {
                conditions: [
                  { operator: EQUAL, field: "type", value: ["footer_2023"] }
                  { operator: EQUAL, field: "status", value: ["1"] }
                ]
              }
            ) {
              entities(language: KO) {
                ...SiteSettingFooter2023
              }
            }
          }
          footerBR: drupal {
            settings: siteSettingEntityQuery(
              filter: {
                conditions: [
                  { operator: EQUAL, field: "type", value: ["footer_2023"] }
                  { operator: EQUAL, field: "status", value: ["1"] }
                ]
              }
            ) {
              entities(language: BR) {
                ...SiteSettingFooter2023
              }
            }
          }
          footerLegal: drupal {
            menu: menuByName(name: "footer-legal") {
              title: name
              links {
                ...MenuLink
              }
            }
          }
          footerLegalDE: drupal {
            menu: menuByName(name: "footer-legal", language: DE) {
              title: name
              links {
                ...MenuLink
              }
            }
          }
          footerLegalFR: drupal {
            menu: menuByName(name: "footer-legal", language: FR) {
              title: name
              links {
                ...MenuLink
              }
            }
          }
          footerLegalIT: drupal {
            menu: menuByName(name: "footer-legal", language: IT) {
              title: name
              links {
                ...MenuLink
              }
            }
          }
          footerLegalJA: drupal {
            menu: menuByName(name: "footer-legal", language: JA) {
              title: name
              links {
                ...MenuLink
              }
            }
          }
          footerLegalKO: drupal {
            menu: menuByName(name: "footer-legal", language: KO) {
              title: name
              links {
                ...MenuLink
              }
            }
          }
          footerLegalBR: drupal {
            menu: menuByName(name: "footer-legal", language: BR) {
              title: name
              links {
                ...MenuLink
              }
            }
          }
        }
      `}
      render={(data) => {
        const footerData = {
          menus: menuMapper(menuLangMapper(data, "footerMenu").links, true, true).map(
            ({ links, ...parent }) => [parent, ...links]
          ),
        }
        const footerLang = menuLangMapper(data, "footer", "settings")
        // Social Section
        const socialSection = componentResolver(
          footerLang.entities[0].fieldFirstColumn
        )
        // Career Section
        const careerSection = componentResolver(
          footerLang.entities[0].fieldSecondColumn
        )
        // Legal, Privacy, and Terms Section
        const legalSection = componentResolver(
          footerLang.entities[0].fieldBottomSection
        )
        // Address Section
        const addressSection = footerLang.entities[0].fieldRichtext?.processed

        // Footer image
        const footerImage = componentResolver([footerLang.entities[0]?.fieldItem])

        footerData.disclaimer = {
          links: menuMapper(menuLangMapper(data, "footerLegal").links, true),
          copyright: legalSection,
        }
        footerData.image = footerImage
        footerData.addressSection = addressSection
        footerData.socialSection = socialSection
        footerData.careerSection = careerSection

        return <FooterBlock2023 {...footerData} />
      }}
    />
  )
}

export default Footer
