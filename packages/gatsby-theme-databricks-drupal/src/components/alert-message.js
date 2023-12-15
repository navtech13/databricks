import React from "react"
import PropTypes from "prop-types"
import { AlertMessage } from "databricks-ui"
import { StaticQuery, graphql } from "gatsby"
import bgImage from "../../../databricks-ui/static/images/helloBanner-backgroundImage-1.png"
import { componentResolver } from "../utils/component-resolver"
import { useLanguageContext } from "./language-provider"

const Alert = ({ isHidden, ...props }) => {
  if (isHidden) {
    return <></>
  }

  return <AlertMessage backgroundImage={{ src: bgImage, alt: "bg" }} {...props} />
}

export const GlobalAlert = () => {
  const { currentLanguage } = useLanguageContext()

  return (
    <StaticQuery
      query={graphql`
        query GlobalAlertQuery {
          globalAlert: drupal {
            settings: siteSettingEntityQuery(
              filter: {
                conditions: [
                  { operator: EQUAL, field: "type", value: ["header_logos"] }
                  { operator: EQUAL, field: "status", value: ["1"] }
                ]
              }
            ) {
              availableTranslations: entities {
                ... on Drupal_SiteSettingEntityHeaderLogos {
                  id
                  name
                  entityTranslations {
                    entityLanguage {
                      id
                    }
                  }
                }
              }
              EN: entities(language: EN) {
                ... on Drupal_SiteSettingEntityHeaderLogos {
                  fieldHideGlobalAlert
                  fieldItem {
                    entity {
                      ...ParagraphAlert
                    }
                  }
                }
              }
              IT: entities(language: IT) {
                ... on Drupal_SiteSettingEntityHeaderLogos {
                  fieldHideGlobalAlert
                  fieldItem {
                    entity {
                      ...ParagraphAlert
                    }
                  }
                }
              }
              JA: entities(language: JA) {
                ... on Drupal_SiteSettingEntityHeaderLogos {
                  fieldHideGlobalAlert
                  fieldItem {
                    entity {
                      ...ParagraphAlert
                    }
                  }
                }
              }
              KO: entities(language: KO) {
                ... on Drupal_SiteSettingEntityHeaderLogos {
                  fieldHideGlobalAlert
                  fieldItem {
                    entity {
                      ...ParagraphAlert
                    }
                  }
                }
              }
              FR: entities(language: FR) {
                ... on Drupal_SiteSettingEntityHeaderLogos {
                  fieldHideGlobalAlert
                  fieldItem {
                    entity {
                      ...ParagraphAlert
                    }
                  }
                }
              }
              DE: entities(language: DE) {
                ... on Drupal_SiteSettingEntityHeaderLogos {
                  fieldHideGlobalAlert
                  fieldItem {
                    entity {
                      ...ParagraphAlert
                    }
                  }
                }
              }
              BR: entities(language: BR) {
                ... on Drupal_SiteSettingEntityHeaderLogos {
                  fieldHideGlobalAlert
                  fieldItem {
                    entity {
                      ...ParagraphAlert
                    }
                  }
                }
              }
              ZH_CN: entities(language: ZH_CN) {
                ... on Drupal_SiteSettingEntityHeaderLogos {
                  fieldHideGlobalAlert
                  fieldItem {
                    entity {
                      ...ParagraphAlert
                    }
                  }
                }
              }
              ZH_HK: entities(language: ZH_HK) {
                ... on Drupal_SiteSettingEntityHeaderLogos {
                  fieldHideGlobalAlert
                  fieldItem {
                    entity {
                      ...ParagraphAlert
                    }
                  }
                }
              }
              ZH_TW: entities(language: ZH_TW) {
                ... on Drupal_SiteSettingEntityHeaderLogos {
                  fieldHideGlobalAlert
                  fieldItem {
                    entity {
                      ...ParagraphAlert
                    }
                  }
                }
              }
              ES_ES: entities(language: ES_ES) {
                ... on Drupal_SiteSettingEntityHeaderLogos {
                  fieldHideGlobalAlert
                  fieldItem {
                    entity {
                      ...ParagraphAlert
                    }
                  }
                }
              }
              ES_MX: entities(language: ES_MX) {
                ... on Drupal_SiteSettingEntityHeaderLogos {
                  fieldHideGlobalAlert
                  fieldItem {
                    entity {
                      ...ParagraphAlert
                    }
                  }
                }
              }
            }
          }
        }
      `}
      render={(data) => {
        const { globalAlert } = data
        const { entityTranslations } = globalAlert.settings.availableTranslations[0]
        const availableTranslations = entityTranslations.map(
          (e) => e.entityLanguage.id
        )
        const currentLangAlert =
          globalAlert?.settings[currentLanguage?.id || "EN"][0]?.fieldItem?.entity
        const currentLangHideAlert =
          globalAlert?.settings[currentLanguage?.id || "EN"][0]?.fieldHideGlobalAlert
        const alertEN = globalAlert.settings.EN[0].fieldItem?.entity
        const hideAlertEN = globalAlert.settings.EN[0].fieldHideGlobalAlert
        const isLanguageAvailable = availableTranslations?.includes(
          currentLanguage?.id?.toLowerCase()
        )

        if (isLanguageAvailable && !currentLangHideAlert) {
          const alert = [
            {
              entity: currentLangAlert
            },
          ]
          return componentResolver(alert)
        }
        if (!isLanguageAvailable && !hideAlertEN) {
          const alert = [
            {
              entity: alertEN
            },
          ]
          return componentResolver(alert)
        }
      }}
    />
  )
}

Alert.propTypes = {
  isHidden: PropTypes.bool,
}

Alert.defaultProps = {
  isHidden: false,
}

export default Alert
