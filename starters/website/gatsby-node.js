/* eslint-disable no-loop-func */
const path = require("path")
const fs = require("fs")
// eslint-disable-next-line import/no-extraneous-dependencies
const ReactHtmlParser = require("html-react-parser")
const login = require("../../packages/gatsby-theme-databricks-drupal/src/auth/login")

const { createRemoteFileNode } = require(`gatsby-source-filesystem`)

const PRICING_ENV_PARAM = process.env.GATSBY_PRICING_ENV
  ? `env=${process.env.GATSBY_PRICING_ENV}`
  : null

exports.onPreInit = async () => {
  console.log("building website pages")

  // get aws/gcp/cards pricing data and save
  const token = await login.fetchOauthToken(
    process.env.GATSBY_DRUPAL_URL,
    process.env.DRUPAL_AUTH_USERNAME,
    process.env.DRUPAL_AUTH_PASSWORD,
    process.env.DRUPAL_AUTH_CLIENT_ID,
    process.env.DRUPAL_AUTH_CLIENT_SECRET
  )
  if (!token?.access_token) {
    return
  }
  fetchPricingData("AWS", token.access_token)
  fetchPricingData("GCP", token.access_token)
  fetchPricingCardData(token.access_token)
}

const fetchPricingData = (cloud, bearerToken) => {
  const pricingPath = "./public/data/pricing"
  if (!fs.existsSync(pricingPath)) {
    fs.mkdirSync(pricingPath, { recursive: true })
  }

  fetch(
    `${process.env.GATSBY_DRUPAL_URL}/dbapi/pricing/get?cloud=${cloud}${
      PRICING_ENV_PARAM ? `&${PRICING_ENV_PARAM}` : ""
    }`,
    {
      headers: { Authorization: `Bearer ${bearerToken}` },
    }
  )
    .then((res) => res.json())
    .then((response) => {
      fs.writeFileSync(
        `${pricingPath}/${cloud}.json`,
        JSON.stringify(response),
        (err) => {
          if (err) throw err
          console.log(`${cloud} pricing data written to file`)
        }
      )
    })
    .catch(function (err) {
      throw `error fetching ${cloud} data: ${err}`
    })
}

const fetchPricingCardData = (bearerToken) => {
  const pricingPath = "./public/data/pricing"
  fetch(
    `${process.env.GATSBY_DRUPAL_URL}/dbapi/pricing/get-cards${
      PRICING_ENV_PARAM ? `?${PRICING_ENV_PARAM}` : ""
    }`,
    {
      headers: { Authorization: `Bearer ${bearerToken}` },
    }
  )
    .then((res) => res.json())
    .then((response) => {
      fs.writeFileSync(
        `${pricingPath}/cards.json`,
        JSON.stringify(response).replace(/"\s+|\s+"/g, '"'),
        (err) => {
          if (err) throw err
          console.log(`Card pricing data written to file`)
        }
      )
    })
    .catch(function (err) {
      throw `error fetching card data: ${err}`
    })
}

const mediaImageFragment = `... on Drupal_MediaImage {
  gatsbyImageFile {
    publicURL
  }
  mid
  remoteSourceSet {
    originalImage {
      publicURL
    }
    sources {
      width
      imageData {
        publicURL
      }
    }
  }
  placeholderRatio
  fieldMediaImage {
    url
    alt
    width
    height
    ResponsiveImageStructured(style: wide)
  }
}`

const customerFragment = `id: nid
title
body {
  viewModeFieldFormatter(mode: TEASER)
}
fieldTopContent {
  entity {
    __typename
    ... on Drupal_ParagraphHeroWithColumns {
      fieldTitle
      fieldCtas {
        url {
          path
        }
        title
      }
    }
  }
}
fieldDisplayBackgroundImage
fieldCustomerLogo {
  entity {
    ${mediaImageFragment}
  }
}
fieldGatedAssetForm {
  entity {
    ... on Drupal_ParagraphSlideUpForm {
      __typename
      uuid
      fieldItem {
        entity {
          ... on Drupal_ParagraphModalMarketoForm {
            id
            fieldAlignment
            fieldFormId
            fieldCtaLabel
            fieldTitle
            fieldEnabled
            fieldKey
          }
        }
      }
      fieldCount
      fieldTitle
      fieldForceSubmission: fieldBoolean
      fieldSkipForm: fieldEnabled
      fieldReversed: fieldHot
      fieldDescription {
        processed
      }
      fieldImage {
        entity {
          ... on Drupal_MediaImage {
            gatsbyImageFile {
              publicURL
              childImageSharp {
                gatsbyImageData(placeholder: BLURRED, layout: FULL_WIDTH)
              }
            }
            fieldMediaImage {
              url
              alt
              width
              height
            }
          }
        }
      }
      fieldItems {
        entity {
          ... on Drupal_ParagraphTrialBladeListItem {
            __typename
            uuid
            fieldTitle
            fieldDescription {
              processed
            }
          }
        }
      }
    }
  }
}
customerWallInformation: fieldCustomAlert {
  entity {
    ... on Drupal_ParagraphCustomerWallInformation {
      __typename
      fieldDescription {
        viewModeFieldFormatter(mode: PREVIEW)
      }
      fieldLink {
        url {
          path
        }
        title
      }
      fieldImage {
        entity {
          ${mediaImageFragment}
        }
      }
    }
  }
}
fieldFeatured
fieldUrl {
  url {
    path
  }
  title
}
fieldCloud {
  entity {
    entityId
  }
}
fieldRegions {
  entity {
    entityId
  }
}
fieldPlatform {
  entity {
    entityId
  }
}
fieldIndustries {
  entity {
    entityId
  }
}
fieldTags {
  entity {
    entityId
  }
}
fieldUseCase {
  entity {
    entityId
  }
}`

const slideUpFragment = `
  ... on Drupal_ParagraphSlideUpForm {
    __typename
    uuid
    fieldItem {
      entity {
        ... on Drupal_ParagraphModalMarketoForm {
          fieldFormId
          fieldCtaLabel
          fieldTitle
          fieldEnabled
          fieldKey
        }
      }
    }
    fieldCount
    fieldTitle
    fieldForceSubmission: fieldBoolean
    fieldSkipForm: fieldEnabled
    fieldReversed: fieldHot
    fieldDescription {
      processed
    }
    fieldImage {
      entity {
        ... on Drupal_MediaImage {
          gatsbyImageFile {
            publicURL
            childImageSharp {
              gatsbyImageData(placeholder: BLURRED, layout: FULL_WIDTH)
            }
          }
          fieldMediaImage {
            url
            alt
            width
            height
          }
        }
      }
    }
    fieldItems {
      entity {
        ... on Drupal_ParagraphTrialBladeListItem {
          __typename
          uuid
          fieldTitle
          fieldDescription {
            processed
          }
        }
      }
    }
  }
`

const demoFragment = `id: nid
title
created: entityCreated(format: "F j, Y g:i a")
body {
  processed
}
fieldGatedAssetForm {
  entity {
    ${slideUpFragment}
  }
}
demoCenterInformation: fieldCustomAlert {
  entity {
    ... on Drupal_ParagraphDemoCenterInformation {
      __typename
      fieldDescription {
        processed
      }
      fieldFeatured
      fieldBoolean
      fieldHot
      fieldNew
      fieldImage {
        entity {
          ${mediaImageFragment}
        }
      }
    }
  }
}
fieldCustomPrefooterCta {
  entity {
    ... on Drupal_ParagraphMarketoForm {
      __typename
      fieldCampaignId
      fieldTitle
      fieldFormId
      fieldFormVariant
      fieldBoolean
      fieldDisableFormPrefill
      fieldFormCta
      fieldThankYouUrl {
        url {
          path
        }
      }
      fieldEnabled
      fieldKey
      fieldDescription {
        processed
      }
      fieldBody {
        processed
      }
    }
  }
}
entityUrl {
  path
}
fieldCategories {
  entity {
    entityLabel
    entityId
  }
}
fieldTags {
  entity {
    entityId
  }
}
fieldUseCase {
  entity {
    entityId
  }
}
fieldIndustries {
  entity {
    entityId
  }
}
fieldProductCategory {
  entity {
    entityId
    entityLabel
  }
}`

const partnerFragment = `
  id: nid
  title
  fieldUrl {
    title
    url {
      path
    }
  }
  fieldFeatured
  fieldMedia {
    entity {
      ${mediaImageFragment}
    }
  }
  fieldPartnerType {
    entity {
      name
    }
  }
  fieldRegions {
    entity {
      entityId
      name
    }
  }
  fieldUseCase {
    entity {
      name
    }
  }
  fieldProductCategory {
    entity {
      name
    }
  }
  body {
    viewModeFieldFormatter(mode: TEASER)
  }
`

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const languageLimit = process.env.GATSBY_QUERY_LIMIT_LANGUAGE || "en"

  const [availableLanguages] = await graphql(`
    {
      drupal {
        availableLanguages {
          name
          prefix
          id
          isDefault
        }
      }
    }
  `).then((result) => [
    result.data.drupal.availableLanguages.filter((language) => language),
  ])

  const customerHubInfo = {}
  const partnerSearchInfo = {}
  const demoCenterInfo = {}
  const glossaryInfo = {}
  const resourcesInfo = {}
  const resourcesTypeInfo = {}
  const eventsData = {}

  let defaultLanguage = languageLimit

  let status = '["1"]'
  let revision = "DEFAULT"
  if (process.env.IS_STAGING === "true" || process.env.NODE_ENV !== "production") {
    status = '["0", "1"]'
    revision = "LATEST"
  }
  await Promise.all(
    availableLanguages.map(async ({ id }) => {
      defaultLanguage = id
      const graphQLLanguage = defaultLanguage.toUpperCase().replace(/-/g, "_")
      const termFragment = `entities(language: ${graphQLLanguage}) {
		  entityId
		  entityLabel
		}`

      const glossaryFragment = () => `
        glossary: nodeQuery(
          filter: {
            conditions: [
              { operator: EQUAL, field: "type", value: ["glossaries"] }
               { operator: IN, field: "status", value: ${status} }
            ]
          }
          sort: { field: "created", direction: DESC }
          limit: 100000
        ) {
          entities(language: ${graphQLLanguage}) {
            ... on Drupal_NodeGlossaries {
              nid
              uuid
              title
              fieldHideFromGlossaryIndex
              status
              body {
                value
              }
		          fieldComponents {
                entity {
                  ... on Drupal_ParagraphRichtext {
                    id
                    fieldBody {
                      value
                    }
                  }
                }
              }
              entityUrl {
                path
              }
            }
          }
        }`
      const resourcesFragment = () => `
        resources: nodeQuery(
          filter: {
            conditions: [
              { operator: EQUAL, field: "type", value: ["resource"] }
              { operator: EQUAL, field: "status", value: ["1"] }
              {
                operator: NOT_EQUAL
                field: "field_hide_from_resources"
                value: ["1"]
              }
            ]
          }
          sort: { field: "created", direction: DESC }
          limit: 1000
        ) {
          entities(language: ${graphQLLanguage}) {
            ... on Drupal_NodeResource {
              nid
              uuid
              title
              fieldBlurb
              fieldEnableSkipForm
              entityUrl {
                path
              }
              fieldEventUrl {
                url {
                  path
                }
              }
              fieldSidebarComponents {
                entity {
                  ... on Drupal_ParagraphMarketoForm {
                    fieldFormId
                    fieldThankYouUrl {
                      url {
                        path
                      }
                    }
                  }
                }
              }
              path {
                alias
              }
              publish_date: created
              fieldMedia {
                entity {
                  ${mediaImageFragment}
                  thumbnail {
                    derivative(style: WIDE) {
                      height
                      width
                    }
                  }
                }
              }
              fieldResourceOverviewImage {
                entity {
                  ${mediaImageFragment}
                }
              }
              fieldCategory {
                entity {
                  name
                }
              }
              fieldHideFromResources
              entityLanguage {
                id
              }
            }
          }
        }`
      const eventsFragment = `
        events: nodeQuery(
          filter: {
            conditions: [
              { operator: EQUAL, field: "type", value: ["events"] }
              { operator: IN, field: "status", value: ${status} }
            ]
          }
          sort: { field: "created", direction: DESC }
          limit: 1000
        ) {
          events: entities(language: ${graphQLLanguage}) {
            ...on Drupal_NodeEvents {
              nid
              uuid
              title
              status
              body {
                value
              }
              entityUrl {
                path
              }
              fieldEventLocation
              fieldEventRegions {
                entity {
                  description {
                    value
                  }
                  name
                }
              }
              fieldEventTags {
                entity {
                  description {
                    value
                  }
                  name
                }
              }
              fieldDateTimeTimezone {
                startDate
                endDate
                timezone
              }
              fieldEventType {
                entity {
                  name
                  description {
                    value
                  }
                }
              }
              fieldEventUrl {
                uri
                title
                url {
                  path
                }
              }
              fieldThumbnail {
                entity {
                  ... on Drupal_MediaImage {
                    mid
                    uuid
                    fieldMediaImage {
                      alt
                      height
                      targetId
                      title
                      url
                      width
                    }
                  }
                }
              }
            }
          }
        }
        event_regions: taxonomyTermQuery(
          limit: 100
          offset: 0
          sort: { field: "name", direction: ASC }
          filter: {
            conditions: [{ operator: EQUAL, field: "vid", value: ["event_regions"] }]
          }
        ) {
          regions: entities(language: ${graphQLLanguage}) {
            ...on Drupal_TaxonomyTermEventRegions {
              entityLabel
              tid
              uuid
              name
            }
          }
        }
        event_types: taxonomyTermQuery(
          limit: 100
          offset: 0
          sort: { field: "name", direction: ASC }
          filter: {
            conditions: [{ operator: EQUAL, field: "vid", value: ["event_types"] }]
          }
        ) {
          types: entities(language: ${graphQLLanguage}) {
            ...on Drupal_TaxonomyTermEventTypes {
              entityLabel
              tid
              uuid
              name
            }
          }
        }
      `

      const termArguments = (vid) => `
        revisions: ${revision}
        sort: {field: "weight", direction: ASC, language: ${graphQLLanguage}}
        limit: ${process.env.GATSBY_QUERY_LIMIT}
        filter: {
          conditions: [
            {operator: EQUAL, field: "vid", value: ["${vid}"]}
            {operator: IN, field: "status", value: ${status}}
          ]
        }`
      await graphql(`
          {
            drupal {
              cloudTerms: taxonomyTermQuery(${termArguments("cloud")}) {
                ${termFragment}
              }
              regionTerms: taxonomyTermQuery(${termArguments("region")}) {
                ${termFragment}
              }
              platformTerms: taxonomyTermQuery(${termArguments("platform")}) {
                ${termFragment}
              }
              industryTerms: taxonomyTermQuery(${termArguments("industry")}) {
                ${termFragment}
              }
              solutionTerms: taxonomyTermQuery(${termArguments(
                "customer_solution"
              )}) {
                ${termFragment}
              }
              difficultyTerms: taxonomyTermQuery(${termArguments("difficulty")}) {
                ${termFragment}
              }
              demoUseCaseTerms: taxonomyTermQuery(${termArguments("use_cases")}) {
                ${termFragment}
              }
              demoTypeTerms: taxonomyTermQuery(${termArguments("demo_type")}) {
                ${termFragment}
              }
              productTerms: taxonomyTermQuery(${termArguments("product_category")}) {
                ${termFragment}
              }
              techPartnerTerms: taxonomyTermQuery(${termArguments(
                "customer_tech_partner"
              )}) {
                ${termFragment}
              }
			        resource_type: taxonomyTermQuery(
                limit: 300
                offset: 0
                sort: { field: "name", direction: ASC }
                filter: {
                  conditions: [
                    { operator: EQUAL, field: "vid", value: ["resource_category"] }
                  ]
                }
              ) {
                entities(language: ${graphQLLanguage}) {
                  entityLabel
                  ... on Drupal_TaxonomyTermResourceCategory {
                    tid
                    uuid
                    name
                  }
                }
              }
              customerNodes: nodeQuery(
                revisions: ${revision}
                sort: { field: "field_weight", direction: DESC, language: ${graphQLLanguage} }
                filter: {
                  conditions: [
                    { operator: EQUAL, field: "type", value: ["customer"] }
                    {operator: IN, field: "status", value: ${status}}
                    { operator: EQUAL, field: "langcode", value: "${defaultLanguage.toUpperCase()}" }
                  ]
                }
                limit: ${process.env.GATSBY_QUERY_LIMIT}
              ) {
                entities(language: ${graphQLLanguage}) {
                  __typename
                  entityUrl {
                    path
                  }
                  ... on Drupal_NodeCustomer {
                    ${customerFragment}
                  }
                }
              }
              ${glossaryFragment()}
              ${resourcesFragment()}
              ${eventsFragment}
              demoCenterNodes: nodeQuery(
                revisions: ${revision}
                sort: { field: "field_weight", direction: DESC, language: ${graphQLLanguage} }
                filter: {
                  conditions: [
                    { operator: EQUAL, field: "type", value: ["demo_page"] }
                    { operator: IN, field: "status", value: ${status} }
                  ]
                }
                limit: ${process.env.GATSBY_QUERY_LIMIT}
              ) {
                entities(language: ${graphQLLanguage}) {
                  __typename
                  entityUrl {
                    path
                  }
                  entityTranslation(language: ${graphQLLanguage}) {
                    entityLanguage {
                      name
                    }
                  }
                  ... on Drupal_NodeDemoPage {
                    ${demoFragment}
                  }
                }
              }
              partnerNodes: nodeQuery(
                revisions: ${revision}
                sort: { field: "created", direction: DESC, language: ${graphQLLanguage} }
                filter: {
                  conditions: [
                    { operator: EQUAL, field: "type", value: ["partner"] }
                    {operator: IN, field: "status", value: ${status}}
                    { operator: EQUAL, field: "langcode", value: "${defaultLanguage.toUpperCase()}" }
                  ]
                }
                limit: ${process.env.GATSBY_QUERY_LIMIT}
              ) {
                entities(language: ${graphQLLanguage}) {
                  __typename
                  ... on Drupal_NodePartner {
                    ${partnerFragment}
                  }
                }
              }
            }
          }`).then((result) => {
        // demo pages
        if (result.data?.drupal?.demoCenterNodes?.entities) {
          const demos = result.data.drupal.demoCenterNodes.entities
            .map((entity) => {
              if (!entity?.demoCenterInformation?.entity) {
                return null
              }
              const demoCenter = entity.demoCenterInformation.entity
              const badges = [
                demoCenter.fieldFeatured ? "featured" : undefined,
                demoCenter.fieldNew ? "new" : undefined,
                demoCenter.fieldHot ? "hot" : undefined,
              ]

              // eslint-disable-next-line consistent-return
              return {
                title: entity.title,
                created: entity.created,
                url: entity.entityUrl?.path,
                featured: demoCenter.fieldFeatured,
                description:
                  demoCenter.fieldDescription?.processed || entity.body?.processed,
                image: demoCenter.fieldImage,
                lock: entity.demoCenterInformation.fieldBoolean,
                slideUp: entity.fieldGatedAssetForm,
                badges,
                types: entity.fieldCategories,
                industries: entity.fieldIndustries,
                difficulty: entity.fieldTags,
                platform: entity.fieldUseCase,
                product: entity.fieldProductCategory,
                gated: entity.fieldCustomPrefooterCta?.entity,
                language: entity.entityTranslation,
                id: entity.id,
              }
            })
            .filter(Boolean)
          demoCenterInfo[id] = {
            terms: {
              industry: result.data.drupal.industryTerms?.entities || [],
              product: result.data.drupal.productTerms?.entities || [],
              type: result.data.drupal.demoTypeTerms?.entities || [],
              platform: result.data.drupal.demoUseCaseTerms?.entities || [],
              difficulty: result.data.drupal.difficultyTerms?.entities || [],
            },
            demos,
          }
        }

        glossaryInfo[`glossary${graphQLLanguage}`] = result.data.drupal?.glossary
        resourcesInfo[`resources${graphQLLanguage}`] = result.data.drupal?.resources
        resourcesTypeInfo[`resourcetype${graphQLLanguage}`] =
          result.data.drupal?.resource_type
        eventsData[`events${graphQLLanguage}`] = result.data.drupal?.events?.events
        eventsData[`regions${graphQLLanguage}`] =
          result.data.drupal?.event_regions?.regions
        eventsData[`types${graphQLLanguage}`] =
          result.data.drupal?.event_types?.types

        // customer pages
        if (result.data?.drupal?.customerNodes?.entities) {
          const customers = result.data.drupal.customerNodes.entities.map(
            (entity) => {
              let mappedEntity = entity
              if (!entity.customerWallInformation) {
                delete mappedEntity.customerWallInformation
                return mappedEntity
              }
              // Avoid having replicated info by overriding field data with specific customer wall data.
              mappedEntity = {
                ...entity,
                fieldCustomerLogo:
                  entity.customerWallInformation.entity.fieldImage ||
                  entity.fieldCustomerLogo,
                body:
                  entity.customerWallInformation.entity.fieldDescription ||
                  entity.body,
                slideUp: entity.fieldGatedAssetForm,
                fieldUrl:
                  entity.customerWallInformation.entity.fieldLink || entity.fieldUrl,
              }
              delete mappedEntity.customerWallInformation
              return mappedEntity
            }
          )
          customerHubInfo[id] = {
            terms: {
              cloud: result.data.drupal.cloudTerms?.entities || [],
              region: result.data.drupal.regionTerms?.entities || [],
              platform: result.data.drupal.platformTerms?.entities || [],
              industry: result.data.drupal.industryTerms?.entities || [],
              solution: result.data.drupal.solutionTerms?.entities || [],
              techPartner: result.data.drupal.techPartnerTerms?.entities || [],
            },
            customers,
          }
        }

        // partner pages
        if (result.data?.drupal?.partnerNodes?.entities) {
          const partners = result.data.drupal.partnerNodes.entities.map((entity) => {
            if (
              entity.fieldPartnerType?.entity &&
              !partnerSearchInfo[entity.fieldPartnerType.entity.name]
            ) {
              partnerSearchInfo[entity.fieldPartnerType.entity.name] = {}
            }
            return {
              title: entity.title,
              fieldUrl: entity.fieldUrl,
              fieldMedia: entity.fieldMedia,
              body: entity.body,
              fieldRegions: entity.fieldRegions,
              fieldUseCase: entity.fieldProductCategory,
              fieldProductCategory: entity.fieldProductCategory,
              fieldPartnerType: entity.fieldPartnerType?.entity?.name,
              id: entity.id,
              fieldFeatured: entity.fieldFeatured,
            }
          })

          Object.keys(partnerSearchInfo).forEach((partnerType) => {
            partnerSearchInfo[partnerType][id] = partners.filter((item) => {
              return item.fieldPartnerType === partnerType
            })
          })
        }
      })
    })
  )

  return graphql(`
  {
    drupal {
      availableLanguages {
        name
        prefix
        id
      }
	    glossaryPages: nodeQuery(
        revisions: ${revision}
        sort: {field: "created", direction: DESC}
        filter: {conditions: [
          {operator: EQUAL, field: "type", value: ["glossaries"]},
          {operator: IN, field: "status", value: ${status}}
          ]
        }
        limit: ${process.env.GATSBY_QUERY_LIMIT || "10000"}
      ) {
        entities {
          id: entityId
          entityUrl {
            path
          }
          ... on Drupal_NodeGlossaries {
            nid
            vid: vid
          }
          entityTranslations {
            entityLanguage {
              id
            }
            entityUrl {
              path
            }
          }
        }
      }
	  eventPages: nodeQuery(
        revisions: ${revision}
        sort: {field: "created", direction: DESC}
        filter: {conditions: [{operator: EQUAL, field: "type", value: ["events"]}, {operator: IN, field: "status", value: ${status}}]}
        limit: ${process.env.GATSBY_QUERY_LIMIT || "10000"}
      ) {
        entities {
          id: entityId
          entityUrl {
            path
          }
          ... on Drupal_NodeEvents {
            nid
            vid: vid
          }
          entityTranslations {
            entityLanguage {
              id
            }
            entityUrl {
              path
            }
          }
        }
      }
      generalPages: nodeQuery(
        revisions: ${revision}
        sort: {field: "created", direction: DESC}
        filter: {conditions: [
          {operator: EQUAL, field: "type", value: ["pages"]},
          {operator: IN, field: "status", value: ${status}}
          ]
        }
        limit: ${process.env.GATSBY_QUERY_LIMIT || "10000"}
      ) {
        entities {
          id: entityId
          entityUrl {
            path
          }
          entityTranslations {
            entityLanguage {
              id
            }
            entityUrl {
              path
            }
          }
          ... on Drupal_NodePages {
            nid
            vid: vid
          }
        }
      }
      demoPages: nodeQuery(
        revisions: ${revision}
        sort: {field: "created", direction: DESC}
        filter: {conditions: [
          {operator: EQUAL, field: "type", value: ["demo_page"]},
          {operator: IN, field: "status", value: ${status}}
          ]
        }
        limit: ${process.env.GATSBY_QUERY_LIMIT || "10000"}
      ) {
        entities {
          id: entityId
          entityUrl {
            path
          }
          entityTranslations {
            entityLanguage {
              id
            }
            entityUrl {
              path
            }
          }
          ... on Drupal_NodeDemoPage {
            nid
            vid: vid
          }
        }
      }
      solutionAccelerators: nodeQuery(
        revisions: ${revision}
        sort: {field: "created", direction: DESC}
        filter: {conditions: [
          {operator: EQUAL, field: "type", value: ["solution_accelerator"]},
          {operator: IN, field: "status", value: ${status}}
          ]
        }
        limit: ${process.env.GATSBY_QUERY_LIMIT || "10000"}
        ) {
          entities {
            id: entityId
            entityUrl {
              path
            }
            entityTranslations {
              entityLanguage {
                id
              }
              entityUrl {
                path
              }
            }
            ... on Drupal_NodeSolutionAccelerator {
              nid
              vid: vid
            }
          }
        }
    }
  }
`).then((result) => {
    if (result.errors) {
      throw result.errors
    }

    const createLanguagePages = (
      pathAlias,
      pathAliasTranslations,
      template,
      id,
      vid,
      context
    ) => {
      pathAliasTranslations.forEach((language) => {
        const prefix = language.entityLanguage.length
          ? `/${language.entityLanguage.id}`
          : ""

        const translatedPath = pathAliasTranslations.find(
          (translation) =>
            translation?.entityLanguage?.id === language.entityLanguage.id
        )
        let nodePath = translatedPath
          ? translatedPath.entityUrl.path
          : `${prefix}${pathAlias}`

        // convert /home path alias to "/" for homepages
        if (nodePath.match(/^(\/\w\w)?\/home$/gi)) {
          nodePath = nodePath.replace("/home", "/")
        }

        createPage({
          path: nodePath,
          component: path.resolve(
            `../../packages/gatsby-theme-databricks-drupal/src/templates/${template}`
          ),
          context: {
            langPrefix: prefix,
            language: language.entityLanguage.id.toUpperCase().replace(/-/g, "_"),
            pathAliasTranslations,
            ...(id && { id }),
            ...(vid && { vid }),
            ...context,
          },
        })
      })
    }

    // Create Glossary page

    const { entities: glossaryPages } = result.data.drupal.glossaryPages

    glossaryPages.forEach((glossaryPage) => {
      const pathAlias = glossaryPage.entityUrl.path
      const pathAliasTranslations = glossaryPage.entityTranslations
      const revisionId = `${glossaryPage.vid}`

      createLanguagePages(
        pathAlias,
        pathAliasTranslations,
        "glossaryPage.js",
        glossaryPage.id,
        revisionId
      )
    })

    // Create Event page
    // @TODO: Check this code, currently eventPage.js template doesn't exist

    // const { entities: eventPages } = result.data.drupal.eventPages

    // eventPages.forEach((eventPage) => {
    //   const pathAlias = eventPage.entityUrl.path
    //   const pathAliasTranslations = eventPage.entityTranslations
    //   const revisionId = `${eventPage.vid}`

    //   createLanguagePages(
    //     pathAlias,
    //     pathAliasTranslations,
    //     "eventPage.js",
    //     eventPage.id,
    //     revisionId
    //   )
    // })

    // Create Search pages.

    createPage({
      path: "search",
      component: path.resolve(
        `../../packages/gatsby-theme-databricks-drupal/src/templates/searchPage.js`
      ),
      context: {
        langPrefix: "",
        language: "EN",
      },
    })

    // Create general pages.

    const { entities: generalPages } = result.data.drupal.generalPages

    // eslint-disable-next-line consistent-return
    generalPages.forEach((generalPage) => {
      const pathAlias = generalPage.entityUrl.path
      const revisionId = `${generalPage.vid}`
      const pathAliasTranslations = generalPage.entityTranslations
      const tryDatabricksPaths = [
        "/try-databricks",
        "/try-databricks-aws",
        "/try-databricks-azure",
      ]
      if (tryDatabricksPaths.includes(pathAlias)) {
        return createLanguagePages(
          pathAlias,
          pathAliasTranslations,
          "tryDatabricks.js",
          generalPage.id,
          revisionId
        )
      }
      if (pathAlias.match(/^(\/\w\w)?\/home$/)) {
        return createLanguagePages(
          pathAlias,
          pathAliasTranslations,
          "homePage.js",
          generalPage.id,
          revisionId
        )
      }
      if (pathAlias.match(/^(\/\w\w)?\/glossary$/)) {
        return createLanguagePages(
          pathAlias,
          pathAliasTranslations,
          "generalPage.js",
          generalPage.id,
          revisionId,
          { globalContext: { glossaryInfo } }
        )
      }
      if (pathAlias.match(/^(\/\w\w)?\/resources$/)) {
        return createLanguagePages(
          pathAlias,
          pathAliasTranslations,
          "generalPage.js",
          generalPage.id,
          revisionId,
          { globalContext: { resourcesInfo, resourcesTypeInfo } }
        )
      }
      if (pathAlias.match(/^(\/\w\w)?\/events$/)) {
        return createLanguagePages(
          pathAlias,
          pathAliasTranslations,
          "generalPage.js",
          generalPage.id,
          revisionId,
          { globalContext: { eventsData } }
        )
      }
      // /company/newsroom and /company/newsroom/press-releases
      if (pathAlias.match(/.+\/newsroom(?:\/press-releases(\/.*)?)?$/)) {
        return createLanguagePages(
          pathAlias,
          pathAliasTranslations,
          "newsroomPage.js",
          generalPage.id,
          revisionId,
        )
      }
      createLanguagePages(
        pathAlias,
        pathAliasTranslations,
        "generalPage.js",
        generalPage.id,
        revisionId
      )
    })
    // Create solution accelerator pages.

    const { entities: solutionAccelerators } =
      result.data.drupal.solutionAccelerators

    solutionAccelerators.forEach((solutionAcceleratorPage) => {
      const pathAlias = solutionAcceleratorPage.entityUrl.path
      const pathAliasTranslations = solutionAcceleratorPage.entityTranslations
      const revisionId = `${solutionAcceleratorPage.vid}`

      createLanguagePages(
        pathAlias,
        pathAliasTranslations,
        "solutionAccelerators.js",
        solutionAcceleratorPage.id,
        revisionId
      )
    })

    // Create demo pages.

    const { entities: demoPages } = result.data.drupal.demoPages

    demoPages.forEach((demoPage) => {
      const pathAlias = demoPage.entityUrl.path
      const pathAliasTranslations = demoPage.entityTranslations
      const revisionId = `${demoPage.vid}`

      createLanguagePages(
        pathAlias,
        pathAliasTranslations,
        "demoPage.js",
        demoPage.id,
        revisionId
      )
    })

    // Create customer hub jsons.
    if (fs.existsSync(`./public/data/customerHub/`)) {
      fs.rmSync(`./public/data/customerHub/`, { recursive: true })
    }
    fs.mkdirSync(`./public/data/customerHub/`, { recursive: true })
    Object.keys(customerHubInfo).forEach((language) => {
      fs.writeFileSync(
        `./public/data/customerHub/${language}.json`,
        JSON.stringify(customerHubInfo[language])
      )
    })

    // Create demo center jsons.
    if (fs.existsSync(`./public/data/demoCenter/`)) {
      fs.rmSync(`./public/data/demoCenter/`, { recursive: true })
    }
    fs.mkdirSync(`./public/data/demoCenter/`, { recursive: true })
    Object.keys(demoCenterInfo).forEach((language) => {
      fs.writeFileSync(
        `./public/data/demoCenter/${language}.json`,
        JSON.stringify(demoCenterInfo[language])
      )
    })

    // Create partner search jsons.
    if (fs.existsSync(`./public/data/partner/`)) {
      fs.rmSync(`./public/data/partner/`, { recursive: true })
    }
    fs.mkdirSync(`./public/data/partner/`, { recursive: true })
    Object.keys(partnerSearchInfo).forEach((partnerType) => {
      const parsedPartnerType = partnerType
        .split("/")
        .join("slash")
        .split(" ")
        .join("-")
        .toLowerCase()
      fs.mkdirSync(`./public/data/partner/${parsedPartnerType}/`, {
        recursive: true,
      })
      Object.keys(partnerSearchInfo[partnerType]).forEach((language) => {
        fs.writeFileSync(
          `./public/data/partner/${parsedPartnerType}/${language}.json`,
          JSON.stringify(partnerSearchInfo[partnerType][language])
        )
      })
    })
  })
}

exports.createResolvers = ({ actions, getCache, createNodeId, createResolvers }) => {
  const { createNode } = actions
  const filenameRegex = RegExp(/([^/]+)(?=\.\w+$)/)

  const createInlineImages = (source) => {
    const images = []

    // eslint-disable-next-line consistent-return
    const getInlineImage = (htmlNode) => {
      // Stop search if no node was found
      if (!htmlNode || !htmlNode.props) {
        return null
      }

      // If image was found, push src to images array
      if (htmlNode.type === "img") {
        images.push(htmlNode.props.src)
      }

      // Handle case when children is array
      if (htmlNode.props.children && Array.isArray(htmlNode.props.children)) {
        htmlNode.props.children.forEach((child) => {
          // Repeat process for each child
          getInlineImage(child)
        })
      }

      // handle case when children is object and not array
      if (
        htmlNode.props.children &&
        !Array.isArray(htmlNode.props.children) &&
        htmlNode.props.children.props
      ) {
        // Repeat process for only child
        getInlineImage(htmlNode.props.children)
      }
    }

    const inlineImagesFields = ReactHtmlParser.default(source)
    inlineImagesFields.forEach((htmlNode) => {
      getInlineImage(htmlNode)
    })

    if (images.length < 1) {
      return null
    }

    return (
      images.map((inlineImage) => {
        let imageUrl = process.env.GATSBY_DRUPAL_URL + inlineImage
        if (inlineImage.startsWith("https://")) {
          imageUrl = inlineImage
        }
        const fileNode = createRemoteFileNode({
          url: imageUrl,
          getCache,
          createNode,
          createNodeId,
        }).catch((err) => {
          throw err
        })
        return fileNode
      }) || []
    )
  }

  const svgResolver = {
    image: {
      type: "File",
      resolve: (source) => {
        if (!source.entity.url.endsWith("svg")) {
          return null
        }

        return createRemoteFileNode({
          url: source.entity.url,
          getCache,
          createNode,
          createNodeId,
          httpHeaders: {
            Authorization: `Basic ${process.env.DRUPAL_AUTH_TOKEN}`,
          },
          name: source.entity.filename.split(".")[0],
        }).catch((err) => {
          console.log("caught error:", err)
        })
      },
    },
  }

  const resolvers = {
    Drupal_FieldSiteSettingEntityHeaderLogosFieldMobileImage: svgResolver,
    Drupal_FieldSiteSettingEntityHeaderLogosFieldDesktopImage: svgResolver,
    Drupal_NodeUser: {
      avatarImage: {
        type: `File`,
        resolve(source) {
          if (!source.fieldAvatar) {
            return null
          }
          return createRemoteFileNode({
            url: source.fieldAvatar,
            getCache,
            createNode,
            createNodeId,
            name: source.title,
          }).catch((err) => {
            console.log("caught error:", err)
          })
        },
      },
    },
    Drupal_NodePost: {
      inlineSnippets: {
        type: `[String]`,
        resolve(source) {
          if (!source.body || !source.body.value) {
            return null
          }

          const getSnippetFromHtmlNode = (htmlNode) => {
            if (!htmlNode?.props) {
              return null
            }

            // TODO
            // Hamza to ask OH
            if (htmlNode.type === "pre" && htmlNode.props.children) {
              return htmlNode.props.children.toString()
            }

            return null
          }

          const parsedBody = ReactHtmlParser.default(source.body.value)
          const inlineSnippets = parsedBody
            .map((htmlnode) => {
              return getSnippetFromHtmlNode(htmlnode)
            })
            .filter((htmlnode) => {
              return htmlnode != null
            })

          return inlineSnippets
        },
      },
      inlineImages: {
        type: ["File"],
        resolve(source) {
          if (
            !source.body ||
            !source.body.value ||
            process.env.GATSBY_BLOG_INLINE_IMAGES !== "enabled"
          ) {
            return null
          }
          const inlineimgs = createInlineImages(source.body.value)
          return inlineimgs
        },
      },
    },
    Drupal_ParagraphPromotion: {
      inlineImages: {
        type: `[File]`,
        resolve(source) {
          if (!source.fieldBody || !source.fieldBody.value) {
            return null
          }
          const inlineimgs = createInlineImages(source.fieldBody.value)
          return inlineimgs
        },
      },
    },
  }

  createResolvers(resolvers)
}
