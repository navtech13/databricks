import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { FooterSimple } from "databricks-ui"
import { menuMapper, menuLangMapper } from "../utils/menu-mapper"

const FooterMinimal = () => {
  return (
    <StaticQuery
      query={graphql`
        query FooterMinimalQuery {
          footerMenu: drupal {
            menu: menuByName(name: "footer-minimal", language: EN) {
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
            menu: menuByName(name: "footer-minimal", language: DE) {
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
            menu: menuByName(name: "footer-minimal", language: FR) {
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
            menu: menuByName(name: "footer-minimal", language: IT) {
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
            menu: menuByName(name: "footer-minimal", language: JA) {
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
            menu: menuByName(name: "footer-minimal", language: KO) {
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
            menu: menuByName(name: "footer-minimal", language: BR) {
              title: name
              links {
                ...MenuLink
                links {
                  ...MenuLink
                }
              }
            }
          }
        }
      `}
      render={(data) => {
        const footerData = menuMapper(menuLangMapper(data, "footerMenu").links, true)

        return <FooterSimple items={footerData} />
      }}
    />
  )
}

export default FooterMinimal
