import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { componentResolver } from "../utils/component-resolver"

const GlobalCustomerPrefooter = () => {
  return (
    <StaticQuery
      query={graphql`
        query GlobalCustomerPrefooterQuery {
          CustomerPrefooter: drupal {
            settings: siteSettingEntityQuery(
              filter: {
                conditions: [
                  { operator: EQUAL, field: "type", value: ["customer_template"] }
                  { operator: EQUAL, field: "status", value: ["1"] }
                ]
              }
            ) {
              entities {
                ... on Drupal_SiteSettingEntityCustomerTemplate {
                  fieldItem {
                    entity {
                      ...ParagraphCalloutRow
                    }
                  }
                }
              }
            }
          }
        }
      `}
      render={(data) => {
        const { CustomerPrefooter } = data

        if (!CustomerPrefooter.settings.entities?.[0]?.fieldItem?.entity) {
          return null
        }

        const prefooter = [
          { entity: CustomerPrefooter.settings.entities[0].fieldItem.entity },
        ]

        return componentResolver(prefooter)
      }}
    />
  )
}

export default GlobalCustomerPrefooter
