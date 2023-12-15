import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { MainNavigationTopHorizontal } from "databricks-ui"
import { useLanguageContext } from "./language-provider"
import image from "../../../databricks-ui/static/images/db-nav-mobile-logo-black.svg"

const mapSecondaryLinks = ({ title, url }) => {
  return {
    label: title,
    to: url?.path,
  }
}

const mapLinks = (entity, depth = 0, parentLabel = "") => {
  if (!entity) {
    return null
  }
  const {
    text,
    url,
    links,
    fieldItemDescription,
    fieldOverrideUrl,
    fieldWidth,
    fieldNumber,
  } = entity

  const mappedLinks = links?.map((link) => mapLinks(link, depth + 1, text))

  const mappedItem = {
    idPrefix: `${parentLabel.replace(/\s+/g, "-").toLowerCase()}-`,
    label: text,
    to: fieldOverrideUrl?.url?.path || url?.path,
    links: mappedLinks,
    description: fieldItemDescription,
    column: fieldNumber,
    width: fieldWidth,
  }

  // @TODO:
  // the old menu had a slightly different structure due to the promotion blocks
  // they are no longer being used, so we should update the component so that this
  // logic is not needed
  if (depth === 0) {
    return {
      ...mappedItem,
      links: [{ label: "links", links: mappedLinks }],
    }
  }
  return mappedItem
}

const menuMap = {
  megaMenu: "default",
  footer: "bottom",
  mainCta: "sticky",
}

const mapItems = (entity) => {
  if (!entity) {
    return null
  }
  const { links: menuItems, key, subheader } = entity
  return (
    <MainNavigationTopHorizontal.Menu menuType={menuMap[key]} key={key}>
      {menuItems?.map((menuItem) => {
        if (!menuItem) {
          return null
        }
        const { label, to, type, links, items, linkVariant } = menuItem
        return (
          <MainNavigationTopHorizontal.Item
            idPrefix={`${key
              .replace(/[\sA-Z]+/g, (match) =>
                match.trim() === "" ? "-" : `-${match}`
              )
              .toLowerCase()}-`}
            key={label}
            label={label}
            to={to}
            type={type}
            links={links}
            linkVariant={linkVariant}
            items={items}
            subheader={subheader}
          />
        )
      })}
    </MainNavigationTopHorizontal.Menu>
  )
}

const MainNavigation = () => {
  const { currentLanguage } = useLanguageContext()
  return (
    <StaticQuery
      query={graphql`
        query MainNavMegaMenuQuery {
          mainNavigation: drupal {
            settings: siteSettingEntityQuery(
              filter: {
                conditions: [
                  { operator: EQUAL, field: "type", value: ["header_logos"] }
                  { operator: EQUAL, field: "status", value: ["1"] }
                ]
              }
            ) {
              linkEN: entities(language: EN) {
                ...SiteSettingEntityHeaderLogos
              }
              linkFR: entities(language: FR) {
                ...SiteSettingEntityHeaderLogos
              }
              linkDE: entities(language: DE) {
                ...SiteSettingEntityHeaderLogos
              }
              linkIT: entities(language: IT) {
                ...SiteSettingEntityHeaderLogos
              }
              linkJA: entities(language: JA) {
                ...SiteSettingEntityHeaderLogos
              }
              linkKO: entities(language: KO) {
                ...SiteSettingEntityHeaderLogos
              }
              linkBR: entities(language: BR) {
                ...SiteSettingEntityHeaderLogos
              }
            }
            menuEN: menuByName(name: "simple-mega-menu", language: EN) {
              ...MainNavMegaMenu
            }
            menuFR: menuByName(name: "simple-mega-menu", language: FR) {
              ...MainNavMegaMenu
            }
            menuDE: menuByName(name: "simple-mega-menu", language: DE) {
              ...MainNavMegaMenu
            }
            menuIT: menuByName(name: "simple-mega-menu", language: IT) {
              ...MainNavMegaMenu
            }
            menuJA: menuByName(name: "simple-mega-menu", language: JA) {
              ...MainNavMegaMenu
            }
            menuKO: menuByName(name: "simple-mega-menu", language: KO) {
              ...MainNavMegaMenu
            }
            menuBR: menuByName(name: "simple-mega-menu", language: BR) {
              ...MainNavMegaMenu
            }
          }
        }
      `}
      render={(data) => {
        const settings =
          data.mainNavigation.settings?.[
            `link${currentLanguage?.id.toUpperCase()}`
          ]?.[0] || data.mainNavigation.settings?.linkEN?.[0]

        const menu =
          data.mainNavigation[`menu${currentLanguage?.id.toUpperCase()}`] ||
          data.mainNavigation.menuEN

        const footerLinks = settings?.fieldBottomSection || settings?.menuFooter

        const mainNavigationData = {
          menus: [
            { key: "megaMenu", links: menu?.links?.map((links) => mapLinks(links)) },
            {
              key: "footer",
              links: footerLinks?.map((item) => ({
                ...mapSecondaryLinks(item?.entity?.fieldLink || item),
                linkVariant: item?.entity?.fieldTopnavLinkStyle,
                type: "bottom",
              })),
            },
            {
              key: "mainCta",
              links: settings?.mainCtas?.map((item, i) => ({
                ...mapSecondaryLinks(item),
                type: i + 1 === settings.mainCtas.length ? "button" : "text",
              })),
            },
          ],
        }

        const [footer, ctas] = mainNavigationData?.menus?.slice(1).map(mapItems)
        mainNavigationData.menus[0].subheader = footer
        const megaMenu = mapItems(mainNavigationData.menus[0])

        return (
          <>
            <MainNavigationTopHorizontal
              image={{
                alt: settings?.fieldDesktopImage.image.alt,
                logo: { src: image, alt: "Homepage" },
                to: `/${currentLanguage?.prefix || ""}`.replace("/en", "/"),
              }}
              ctas={ctas}
              footer={footer}
            >
              {megaMenu}
            </MainNavigationTopHorizontal>
          </>
        )
      }}
    />
  )
}

export default MainNavigation
