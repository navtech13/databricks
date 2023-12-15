import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { FooterBlock } from "databricks-ui"
import { menuMapper, menuLangMapper } from "../utils/menu-mapper"
import { componentResolver } from "../utils/component-resolver"

const Footer = () => {
  return (
    <StaticQuery
      query={graphql`
        query FooterQuery {
          footerMenu: drupal {
            menu: menuByName(name: "footer", language: EN) {
              title: name
              links {
                ...MenuLink
                links {
                  ...MenuLink
                }
              }
            }
          }
          footerMenuDE: drupal {
            menu: menuByName(name: "footer", language: DE) {
              title: name
              links {
                ...MenuLink
                links {
                  ...MenuLink
                }
              }
            }
          }
          footerMenuFR: drupal {
            menu: menuByName(name: "footer", language: FR) {
              title: name
              links {
                ...MenuLink
                links {
                  ...MenuLink
                }
              }
            }
          }
          footerMenuIT: drupal {
            menu: menuByName(name: "footer", language: IT) {
              title: name
              links {
                ...MenuLink
                links {
                  ...MenuLink
                }
              }
            }
          }
          footerMenuJA: drupal {
            menu: menuByName(name: "footer", language: JA) {
              title: name
              links {
                ...MenuLink
                links {
                  ...MenuLink
                }
              }
            }
          }
          footerMenuKO: drupal {
            menu: menuByName(name: "footer", language: KO) {
              title: name
              links {
                ...MenuLink
                links {
                  ...MenuLink
                }
              }
            }
          }
          footerMenuBR: drupal {
            menu: menuByName(name: "footer", language: BR) {
              title: name
              links {
                ...MenuLink
                links {
                  ...MenuLink
                }
              }
            }
          }
          footer: drupal {
            settings: siteSettingEntityQuery(
              filter: {
                conditions: [
                  { operator: EQUAL, field: "type", value: ["footer"] }
                  { operator: EQUAL, field: "status", value: ["1"] }
                ]
              }
            ) {
              entities {
                ...SiteSettingFooter
              }
            }
          }
          footerDE: drupal {
            settings: siteSettingEntityQuery(
              filter: {
                conditions: [
                  { operator: EQUAL, field: "type", value: ["footer"] }
                  { operator: EQUAL, field: "status", value: ["1"] }
                ]
              }
            ) {
              entities(language: DE) {
                ...SiteSettingFooter
              }
            }
          }
          footerFR: drupal {
            settings: siteSettingEntityQuery(
              filter: {
                conditions: [
                  { operator: EQUAL, field: "type", value: ["footer"] }
                  { operator: EQUAL, field: "status", value: ["1"] }
                ]
              }
            ) {
              entities(language: FR) {
                ...SiteSettingFooter
              }
            }
          }
          footerIT: drupal {
            settings: siteSettingEntityQuery(
              filter: {
                conditions: [
                  { operator: EQUAL, field: "type", value: ["footer"] }
                  { operator: EQUAL, field: "status", value: ["1"] }
                ]
              }
            ) {
              entities(language: IT) {
                ...SiteSettingFooter
              }
            }
          }
          footerJA: drupal {
            settings: siteSettingEntityQuery(
              filter: {
                conditions: [
                  { operator: EQUAL, field: "type", value: ["footer"] }
                  { operator: EQUAL, field: "status", value: ["1"] }
                ]
              }
            ) {
              entities(language: JA) {
                ...SiteSettingFooter
              }
            }
          }
          footerKO: drupal {
            settings: siteSettingEntityQuery(
              filter: {
                conditions: [
                  { operator: EQUAL, field: "type", value: ["footer"] }
                  { operator: EQUAL, field: "status", value: ["1"] }
                ]
              }
            ) {
              entities(language: KO) {
                ...SiteSettingFooter
              }
            }
          }
          footerBR: drupal {
            settings: siteSettingEntityQuery(
              filter: {
                conditions: [
                  { operator: EQUAL, field: "type", value: ["footer"] }
                  { operator: EQUAL, field: "status", value: ["1"] }
                ]
              }
            ) {
              entities(language: BR) {
                ...SiteSettingFooter
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
          menus: menuMapper(menuLangMapper(data, "footerMenu").links, true).map(
            ({ links, ...parent }) => [parent, ...links]
          ),
        }

        const footerLang = menuLangMapper(data, "footer", "settings")

        const firstColumn = componentResolver(
          footerLang.entities[0].fieldFirstColumn
        )

        const secondColumn = componentResolver(
          footerLang.entities[0].fieldSecondColumn
        )

        const bottomSection = componentResolver(
          footerLang.entities[0].fieldBottomSection
        )

        footerData.disclaimer = {
          links: menuMapper(menuLangMapper(data, "footerLegal")?.links, true),
          copyright: bottomSection,
        }

        footerData.items = [
          <div className='hidden flex-1 md:block' key={1}>
            <div className='border-navy-04 first-column h6 w-16 border-l pl-2.5'>
              {firstColumn}
            </div>
          </div>,
          <div className='b6 flex-1 ' key={2}>
            <div className='second-column flex max-w-[160px] flex-col gap-3 leading-5 md:leading-6 lg:gap-5'>
              {secondColumn}
            </div>
          </div>,
        ]
        return <FooterBlock {...footerData} />
      }}
    />
  )
}

export default Footer
