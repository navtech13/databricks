// Generic Fragments
export const MediaImage = `
  ... on MediaImage {
    fieldMediaImage {
      url
      alt
      width
      height
    }
  }
`

export const MediaVideo = `
  ... on MediaVideo {
    fieldMediaImage {
      url
      alt
      width
      height
    }
    fieldMediaVideoFile {
      entity {
        url
      }
    }
  }
`

export const MediaRemoteVideo = `
  ... on MediaRemoteVideo {
    thumbnail {
      url
    }
    fieldMediaImage {
      url
      alt
      width
      height
    }
    fieldMediaOembedVideo
  }
`

export const MediaLottieFile = `
  ... on MediaLottieFile {
    name
    fieldLoopAnimation
    fieldMediaLottieFile {
      entity {
        url
      }
    }
  }
`

export const MediaLottie = `
  ... on MediaLottie {
    name
    fieldLoopAnimation
    fieldMediaLottieFile {
      entity {
        url
      }
    }
  }
`

export const LocalImage = `
  ... on File {
    src: publicURL
    alt: name
    childImageSharp {
      gatsbyImageData(placeholder: BLURRED, layout: FULL_WIDTH)
    }
  }
`

export const TaxonomyTermTags = `
  ... on TaxonomyTermTags {
    tid
    name
  }
`

export const TaxonomyTermResourceCategories = `
  ... on TaxonomyTermResourceCategory {
    tid
    name
  }
`

export const TaxonomyTermCategories = `
  ... on TaxonomyTermCategories {
    tid
    name
    entityUrl {
      path
    }
    fieldSlug
    fieldImage {
      entity {
        ${MediaImage}
      }
    }
    parent {
     entity {
        ... on TaxonomyTermCategories {
          fieldSlug
          fieldImage {
            entity {
              ${MediaImage}
            }
          }
        }
      }
    }
  }
`

export const TaxonomyTermAcceleratorPartners = `
  ... on TaxonomyTermAcceleratorPartners {
    tid
    name
  }
`

export const TaxonomyTermIndustry = `
  ... on TaxonomyTermIndustry {
    tid
    name
  }
`

export const MenuLink = `
  ... on MenuLink {
    __typename
    text: label
    url {
      routed
      path
    }
    fieldOverrideUrl {
      url {
        routed
        path
      }
    }
  }
`

export const Metatag = `
  ... on Metatag {
    type: __typename
    key
    value
  }
`

// Paragraphs
// ${MediaLottie}

export const ParagraphSpacings = `
  ... on ParagraphSpacings {
    __typename
    uuid
    fieldTopSpacing
    fieldBottomSpacing
    fieldTopSpacingTablet
    fieldBottomSpacingTablet
    fieldTopSpacingDesktop
    fieldBottomSpacingDesktop
  }
`

export const ParagraphGridSpacings = `
  ... on ParagraphGridSpacings {
    __typename
    uuid
    spacingX: fieldBottomSpacing
    tabletSpacingX: fieldBottomSpacingTablet
    desktopSpacingX: fieldBottomSpacingDesktop
    spacingY: fieldTopSpacing
    tabletSpacingY: fieldTopSpacingTablet
    desktopSpacingY: fieldTopSpacingDesktop
  }
`
export const ParagraphLogos = `
  ... on ParagraphLogos {
    __typename
    uuid
    fieldImage {
      entity {
        ${MediaImage}
      }
    }
    fieldLink {
      title
      url {
        path
      }
    }
  }
`
export const ParagraphAnimatedLogoSlider = `
  ... on ParagraphAnimatedLogoSlider {
    __typename
    uuid
    fieldVariantAnimateSlider
    fieldTitle
    fieldLink {
      title
      url {
        path
      }
    }
    fieldItems {
      entity {
        ${ParagraphLogos}
      }
    }
    fieldSpacings {
      entity {
        ${ParagraphSpacings}
      }
    }
    fieldCta {
      title
      url {
        path
      }
    }
    fieldSliderSpeed
    fieldBackgroundToken
  }
`

export const ParagraphImage = `
  ... on ParagraphImage {
    __typename
    uuid
    fieldImage {
      entity {
        __typename
        ${MediaImage}
      }
    }
    fieldWidthColumns
    fieldDisplayShadow
    fieldInitialColumn
    fieldLink {
      url {
        path
      }
      title
    }
    fieldSpacings {
      entity {
        ${ParagraphSpacings}
      }
    }
  }
`

export const ParagraphRichText = `
  ... on ParagraphRichtext {
    __typename
    uuid
    fieldTitle
    fieldBody {
      processed
    }
    fieldSpacings {
      entity {
        ${ParagraphSpacings}
      }
    }
  }
`

export const ParagraphBigCombo = `
  ... on ParagraphBigCombo {
    __typename
    uuid
    fieldTitle
    fieldDescription {
      processed
    }
    fieldItems {
      entity {
        ${ParagraphRichText}
      }
    }
    fieldCtas {
      url {
        path
      }
      title
    }
    fieldSpacings {
      entity {
        ${ParagraphSpacings}
      }
    }
  }
`

export const ParagraphLabelAndLinks = `
... on ParagraphLabelAndLinks {
    __typename
    uuid
    fieldTitle
    fieldCtas {
      url {
        path
      }
      title
    }
  }
`

export const ParagraphLeadCombo = `
  ... on ParagraphLeadCombo {
    __typename
    uuid
    fieldTitle
    fieldDescription {
      processed
    }
    fieldCtasStyle
    fieldCtas {
      url {
        path
      }
      title
    }
    fieldSpacings {
      entity {
        ${ParagraphSpacings}
      }
    }
  }
`

export const ParagraphCustomBlock = `
  ... on ParagraphCustomBlock {
    __typename
    uuid
    fieldBlockType
  }
`

export const ParagraphIcon = `
  ... on ParagraphIcon {
    __typename
    uuid
    fieldIconName
    fieldLink {
      title
      url {
        path
      }
    }
  }
`

export const ParagraphIconList = `
  ... on ParagraphIconList {
    __typename
    uuid
    fieldItems {
      entity {
        ${ParagraphIcon}
      }
    }
  }
`

export const ParagraphGeneralCtaRowItem = `
  ... on ParagraphGeneralCtaRowItem {
    __typename
    uuid
    fieldBoolean
    fieldCtasectionVariant
    fieldLink {
      title
      attribute(key: "trigger_event")
      url {
        path
      }
    }
  }
`

export const ParagraphBulletedList = `
  ... on ParagraphBulletedList {
    __typename
    uuid
    fieldTitle
    fieldTextUnlimited
    fieldSpacings {
      entity {
        ${ParagraphSpacings}
      }
    }
  }
`

export const ParagraphCtaImageBlock = `
  ... on ParagraphCtaImageBlock {
    __typename
    uuid
    fieldSectionTitle
    fieldTitle
    fieldIntro
    fieldVerticalAlignment
    fieldDescription {
      processed
    }
    fieldWidthColumns
    fieldInitialColumn
    fieldImage {
      entity {
        __typename
        ${MediaImage}
        ${MediaVideo}
        ${MediaLottieFile}
        ${MediaRemoteVideo}
      }
    }
    fieldImagePosition
    fieldCtasStyle
    fieldImageModal
    fieldLink {
      url {
        path
      }
      title
    }
    fieldSpacings {
      entity {
        ${ParagraphSpacings}
      }
    }
    fieldItems {
      entity {
        ${ParagraphGeneralCtaRowItem}
      }
    }
    fieldCtasStyle
    fieldDisplayShadow
    fieldThankYouUrl {
      url {
        path
      }
    }
  }
`

export const ParagraphPromotion = `
  ... on ParagraphPromotion {
    __typename
    uuid
    fieldSubtitle
    fieldBody {
      processed
      value
    }
    fieldLink {
      url {
        path
      }
      title
    }
    fieldImage {
      entity {
        ${MediaImage}
      }
    }
    inlineImages {
      base
      publicURL
      childImageSharp {
        gatsbyImageData(placeholder: BLURRED, layout: FULL_WIDTH)
      }
    }
  }
`

export const MainNavMegaMenu = `
  ... on Menu {
    title: name
    links {
      ${MenuLink}
      fieldParagraphs {
        __typename
        ${ParagraphPromotion}
      }
      links {
        fieldWidth
        fieldNumber
        ${MenuLink}
        links {
          fieldItemDescription
          ${MenuLink}
          links {
            ${MenuLink}
            fieldItemDescription
          }
        }
      }
    }
  }
`

export const ParagraphMarketoForm = `
  ... on ParagraphMarketoForm {
    __typename
    fieldTitle
    fieldFormId
    fieldCampaignId
    fieldFormVariant
    fieldBoolean
    fieldDisableFormPrefill
    fieldThankYouUrl {
      url {
        path
      }
    }
    fieldEnabled
    fieldKey
    fieldBody {
      processed
    }
    fieldSpacings {
      entity {
        ${ParagraphSpacings}
      }
    }
  }
`

export const ParagraphMultiMedia = `
  ... on ParagraphMultiMedia {
    id
    fieldImage {
      entity {
        ${MediaImage}
      }
    }
    fieldBoolean
    fullWidth: fieldEnabled
    fieldSpacings {
      entity {
        ${ParagraphSpacings}
      }
    }
    fieldAlignment
    fieldAnimation
    fieldTopSpacing
    fieldBottomSpacing
    fieldDisplayShadow
    fieldBackgroundToken
    fieldColumnWidthDesktop
    fieldHorizontalAlignment
  }
`

export const ParagraphHeaderSection = `
... on ParagraphHeaderSection {
  __typename
  uuid
  fieldTitle
  fieldSubtitle
  fieldIntro
  fieldColumnWidthMobile
  fieldColumnWidthTablet
  fieldColumnWidthDesktop
  fieldHeaderColorVariant
  fieldSpacings {
    entity {
      ${ParagraphSpacings}
    }
  }
}
`

export const ParagraphMediaPlayer = `
  ... on ParagraphMediaPlayer {
    __typename
    uuid
    fieldImage {
      entity {
        ${MediaImage}
      }
    }
    fieldHeaderImage {
      entity {
        ${MediaImage}
      }
    }
    fieldBoolean
    fullWidth: fieldEnabled
    fieldNew
    fieldSpacings {
      entity {
        ${ParagraphSpacings}
      }
    }
  }
`

export const ParagraphSpeaker = `
  ... on ParagraphSpeaker {
    __typename
    uuid
    fieldRole
    fieldImage {
      entity {
        ${MediaImage}
      }
    }
    fieldTitle
    fieldCompany
    fieldDescription {
      processed
    }
    fieldBody {
      processed
    }
  }
`
export const ParagraphSpeakerList = `
  ... on ParagraphSpeakerList {
    __typename
    uuid
    fieldBoolean
    fieldSpeakerVariant
    fieldTitle
    fieldItems {
      entity {
        ${ParagraphSpeaker}
      }
    }
    fieldSpacings {
      entity {
        ${ParagraphSpacings}
      }
    }
  }
`

export const ParagraphCustomerHubCards = `
  ... on ParagraphCustomerHubCards {
    __typename
    uuid
    fieldTitle
    fieldDescription {
      processed
    }
    fieldSpacings {
      entity {
        ${ParagraphSpacings}
      }
    }
  }
`

export const ParagraphSpeakerListAccordion = `
  ... on ParagraphSpeakerListAccordion {
    __typename
    uuid
    fieldTitle
    fieldItems {
      entity {
        ${ParagraphSpeaker}
      }
    }
  }
`

export const ParagraphCta = `
  ... on ParagraphCta {
    __typename
    uuid
    fieldCtas {
      url {
        path
      }
      title
    }
    fieldTitle
    fieldDescription {
      processed
    }
  }
`

export const ParagraphCtaDownload = `
  ... on ParagraphCtaDownload {
    __typename
    uuid
    fieldAlignment
    fieldBody {
      value
    }
    fieldLink {
      title
      url {
        path
      }
    }
    fieldCtaLabel
    fieldKey
    fieldSpacings {
      entity {
        ${ParagraphSpacings}
      }
    }
  }
`

export const ParagraphAccordion = `
  ... on ParagraphAccordion {
    __typename
    uuid
    fieldItems {
      entity {
        ${ParagraphCtaDownload}
        ${ParagraphRichText}
        ${ParagraphSpeakerListAccordion}
      }
    }
    fieldDescription {
      processed
    }
  }
`

export const ParagraphAccordionList = `
  ... on ParagraphAccordionList {
    __typename
    uuid
    fieldTitle
    fieldAccordionListVariant
    fieldItems {
      entity {
        ${ParagraphAccordion}
      }
    }
    fieldSpacings {
      entity {
        ${ParagraphSpacings}
      }
    }
  }
`

export const ParagraphBasicAccordion = `
  ... on ParagraphBasicAccordion {
    __typename
    uuid
    fieldItemsDisplay
    fieldTitle
    fieldSectionTitle
    fieldAccordionListVariant
    fieldItems {
      entity {
        ${ParagraphAccordion}
      }
    }
    fieldSpacings {
      entity {
        ${ParagraphSpacings}
      }
    }
  }
`

export const ParagraphCard = `
  ... on ParagraphCard {
    __typename
    uuid
    fieldTitle
    fieldIntro
    fieldDescription {
      processed
    }
    fieldLink {
      url {
        path
      }
      title
    }
    fieldImage {
      entity {
        ${MediaImage}
      }
    }
    fieldLinks {
      url {
        path
      }
      title
    }
    fieldRemoveHover
  }
`

export const ParagraphCardList = `
  ... on ParagraphCardList {
    __typename
    uuid
    fieldTitle
    fieldDescription {
      processed
    }
    fieldEnabled
    fieldCardVariant
    fieldColumnCount
    fieldItems {
      entity {
        ${ParagraphCard}
      }
    }
    fieldSpacings {
      entity {
        ${ParagraphSpacings}
      }
    }
  }
`

export const ParagraphResource = `
  ... on ParagraphResource {
    __typename
    uuid
    fieldTitle
    fieldImage {
      entity {
        ${MediaImage}
      }
    }
    fieldDescription {
      processed
    }
    fieldLinks {
      url {
        path
      }
      title
    }
  }
`

export const ParagraphSectionId = `
  ... on ParagraphSectionId {
    __typename
    uuid
    fieldKey
  }
`

export const ParagraphResourceList = `
  ... on ParagraphResourceList {
    __typename
    uuid
    fieldTitle
    fieldColumnCount
    fieldResources {
      entity {
        ${ParagraphResource}
      }
    }
    fieldSpacings {
      entity {
        ${ParagraphSpacings}
      }
    }
  }
`

export const ParagraphCtaBlock = `
  ... on ParagraphCtablock {
    __typename
    uuid
    fieldTitle
    fieldSubtitle
    fieldImage {
      entity {
        ${MediaImage}
      }
    }
    fieldDescription {
      processed
    }
    fieldLink {
      url {
        path
      }
      title
    }
  }
`

export const ParagraphCtaBlockList = `
  ... on ParagraphCtablockList {
    __typename
    uuid
    fieldTitle
    fieldThankYouUrl {
      url {
        path
      }
      title
    }
    fieldColumnCount
    fieldCtaBlockVariant
    fieldEnabled
    fieldItems {
      entity {
        ${ParagraphCtaBlock}
      }
    }
    fieldSpacings {
      entity {
        ${ParagraphSpacings}
      }
    }
  }
`

export const ParagraphCalloutRow = `
  ... on ParagraphCalloutRow {
    __typename
    uuid
    fieldTitle
    fieldDescription {
      processed
    }
    fieldColorVariant
    fieldCtas {
      url {
        path
      }
      title
    }
    fieldSpacings {
      entity {
        ${ParagraphSpacings}
      }
    }
  }
`

export const ParagraphInnerMenu = `
  ... on ParagraphInnerMenu {
    __typename
    uuid
    fieldTitle
    fieldLinks {
      url {
        path
      }
      title
    }
    fieldSpacings {
      entity {
        ${ParagraphSpacings}
      }
    }
  }
`

export const ParagraphHero = `
  ... on ParagraphHero {
    __typename
    uuid
    fieldIntro
    fieldTitle
    fieldDescription {
      processed
    }
    fieldImage {
      entity {
        __typename
        ${MediaImage}
      }
    }
    fieldHeroVariant
    fieldCtas {
      url {
        path
      }
      title
    }
    fieldLink {
      url {
        path
      }
      title
    }
    fieldSpacings {
      entity {
        ${ParagraphSpacings}
      }
    }
  }
`

export const ParagraphCtaHexImage = `
  ... on ParagraphCtaHeximage {
    __typename
    uuid
    fieldTitle
    fieldDescription {
      processed
    }
    fieldImage {
      entity {
        ${MediaImage}
      }
    }
    fieldLink {
      url {
        path
      }
      title
    }
  }
`

export const ParagraphCtaHexImageList = `
  ... on ParagraphCtaHeximagelist {
    __typename
    uuid
    fieldTitle
    fieldCtas {
      url {
        path
      }
      title
    }
    fieldItems {
      entity {
        ${ParagraphCtaHexImage}
      }
    }
    fieldSpacings {
      entity {
        ${ParagraphSpacings}
      }
    }
  }
`

export const ParagraphHeroWithColumns = `
  ... on ParagraphHeroWithColumns {
    __typename
    uuid
    fieldVariant
    fieldTitle
    fieldSectionTitle
    fieldDescription {
      processed
    }
    fieldImage {
      entity {
        ${MediaImage}
      }
    }
    fieldHeaderImage {
      entity {
        ${MediaImage}
      }
    }
    fieldItems {
      entity {
        ${ParagraphRichText}
      }
    }
    fieldCtas {
      url {
        path
      }
      title
    }
    fieldSpacings {
      entity {
        ${ParagraphSpacings}
      }
    }
  }
`

export const ParagraphPromoRow = `
... on ParagraphPromoRow {
    fieldLink {
      url {
        path
      }
      title
    }
    fieldImage {
      entity {
        __typename
        ${MediaImage}
        ${MediaVideo}
        ${MediaLottieFile}
        ${MediaRemoteVideo}
      }
    }
    fieldTitle
    fieldSpacings {
      entity {
        ${ParagraphSpacings}
      }
    }
    fieldTopSpacing
    fieldBorderColor
    fieldBorderStyle
    fieldDescription {
      processed
      format
    }
    fieldBottomSpacing
    fieldTextUnlimited
    fieldBackgroundColor
    fieldBackgroundToken
    fieldTitleColorToken
    fieldTopSpacing
    fieldBottomSpacing
    fieldTopSpacingDesktop
    fieldBottomSpacingDesktop
  }
`

export const ParagraphLogoGrid = `
  ... on ParagraphLogoGrid {
    __typename
    uuid
    fieldTitle
    fieldLogoGridVariant
    fieldCount
    fieldColumnCount
    fieldBody {
      processed
    }
    fieldDescription {
      processed
    }
    fieldImages {
      entity {
        uuid
        ${MediaImage}
      }
    }
    fieldSpacings {
      entity {
        ${ParagraphSpacings}
      }
    }
    gridSpacings: fieldItem {
      entity {
        ${ParagraphGridSpacings}
      }
    }
  }
`

export const ParagraphTab = `
  ... on ParagraphTab {
    __typename
    uuid
    fieldTitle
    fieldThankYouUrl {
      uri
      title
    }
    fieldLink {
      url {
        path
      }
      title
    }
    fieldImage {
      entity {
        __typename
         ${MediaImage}
      }
    }
    fieldItems {
      entity {
        ${ParagraphRichText}
        ${ParagraphImage}
        ${ParagraphCardList}
        ${ParagraphPromoRow}
      }
    }
  }
`

export const ParagraphTabList = `
  ... on ParagraphTabList {
    __typename
    uuid
    fieldTitle
    fieldControlsPosition
    fieldItems {
      entity {
        ${ParagraphTab}
      }
    }
    fieldSpacings {
      entity {
        ${ParagraphSpacings}
      }
    }
  }
`

export const ParagraphCtaSection = `
  ... on ParagraphCtaSection {
    __typename
    uuid
    fieldCtasectionVariant
    fieldDescription {
      processed
    }
    fieldLink {
      url {
        path
      }
      title
    }
    fieldSpacings {
      entity {
        ${ParagraphSpacings}
      }
    }
  }
`
export const ParagraphCtaCards = `
  ... on ParagraphCtaCards {
    __typename
    uuid
    fieldTitle
    fieldDescription {
      processed
    }
    fieldLink {
      url {
        path
      }
      title
    }
    fieldItems {
      entity {
        ${ParagraphCard}
      }
    }
    fieldSpacings {
      entity {
        ${ParagraphSpacings}
      }
    }
  }
`

export const ParagraphQuote = `
  ... on ParagraphQuote {
    __typename
    uuid
    fieldTitle
	  fieldLogoPosition
    fieldDescription {
      processed
    }
    fieldQuoteVariant
    fieldImage {
      entity {
        ${MediaImage}
      }
    }
    fieldSpacings {
      entity {
        ${ParagraphSpacings}
      }
    }
  }
`

export const ParagraphQuoteCombo = `
  ... on ParagraphQuoteCombo {
    __typename
    uuid
    fieldAuthor: fieldTitle
    fieldImage {
      entity {
        ${MediaImage}
      }
    }
    fieldGraphic: fieldRelatedImage {
      entity {
        ${MediaImage}
      }
    }
    fieldLink {
      url {
        path
      }
      title
    }
    fieldDescription {
      processed
    }
    fieldSpacings {
      entity {
        ${ParagraphSpacings}
      }
    }
  }
`

export const ParagraphSlide = `
  ... on ParagraphSlide {
    __typename
    uuid
    fieldTitle
    fieldImage {
      entity {
        __typename
        ${MediaImage}
      }
    }
    headerTitle: fieldIntro
    fieldHeaderImage {
      entity {
        ${MediaImage}
      }
    }
    fieldBody {
      processed
    }
    footerData: fieldDescription {
      processed
    }
    fieldLink {
      url {
        path
      }
      title
    }
  }
`

export const ParagraphSlider = `
  ... on ParagraphSlider {
    __typename
    uuid
    fieldTitle
    fieldImageSize
    fieldControlsPosition
    fieldItems {
      entity {
        ${ParagraphSlide}
      }
    }
  }
`

export const ParagraphIntegrationCarouselCard = `
  ... on ParagraphIntegrationCarouselCard {
    __typename
    uuid
    fieldTitle
    fieldBackgroundToken
    fieldTitleColorToken
    fieldLink {
      url {
        path
      }
    }
    fieldImages {
      entity {
        ${MediaImage}
      }
    }
  }
`

export const ParagraphIntegrationCarousel = `
  ... on ParagraphIntegrationCarousel {
    __typename
    uuid
    fieldEnabled
    fieldItems {
      entity {
        ${ParagraphIntegrationCarouselCard}
      }
    }
  }
`

export const ParagraphCustomForm = `
  ... on ParagraphCustomForm {
    __typename
    uuid
    fieldTitle
    fieldCloudType
    fieldFreeTrialDisplayType
    fieldBackgroundToken
    fieldThankYouUrl {
      url {
        path
      }
    }
    fieldLink {
      url {
        path
      }
      title
    }
    fieldSpacings {
      entity {
        ${ParagraphSpacings}
      }
    }
  }
`

export const ParagraphVideoItem = `
  ... on ParagraphVideoItem {
    __typename
    uuid
    fieldTitle
    fieldIntro
    fieldEnabled
    fieldLink {
      url {
        path
      }
      title
    }
    fieldRole
    fieldSectionTitle
    fieldImage {
      entity {
        ${MediaImage}
      }
    }
  }
`

export const ParagraphVideoPlaylist = `
  ... on ParagraphVideoPlaylist {
    __typename
    uuid
    fieldTitle
    fieldImagePosition
    fieldItems {
      entity {
        ${ParagraphVideoItem}
      }
    }
    fieldSpacings {
      entity {
        ${ParagraphSpacings}
      }
    }
  }
`

export const ParagraphCardItem = `
  ... on ParagraphCardItem {
    __typename
    uuid
    fieldTitle
    fieldLink {
      url {
        path
      }
      title
    }
    fieldIntro
    fieldDescription {
      processed
    }
    fieldImage {
      entity {
        ${MediaImage}
      }
    }
  }
`

export const ParagraphVideoTranscriptItem = `
  ... on ParagraphVideoTranscriptItem {
    __typename
    uuid
    fieldTitle
    fieldCount
    fieldDescription {
      processed
    }
  }
`

export const ParagraphVideoTranscript = `
  ... on ParagraphVideoTranscript {
    __typename
    uuid
    fieldTitle
    showTimestamps: fieldBoolean
    fieldDescription {
      processed
    }
    fieldItems {
      entity {
        __typename
        uuid
        ${ParagraphVideoTranscriptItem}
      }
    }
    fieldSpacings {
      entity {
        ${ParagraphSpacings}
      }
    }
  }
`

export const ParagraphHorizontalTabItem = `
  ... on ParagraphHorizontalTabItem {
    __typename
    uuid
    fieldTitle
    fieldSectionTitle
    fieldDescription {
      processed
    }
    fieldLink {
      url {
        path
      }
      title
    }
    fieldImage {
      entity {
        ${MediaImage}
      }
    }
  }
`
export const ParagraphHorizontalTabs = `
  ... on ParagraphHorizontalTabs {
    __typename
    uuid
    fieldHeadlinesTag
    fieldItems {
      entity {
        ${ParagraphHorizontalTabItem}
      }
    }
    fieldSpacings {
      entity {
        ${ParagraphSpacings}
      }
    }
  }
`

export const ParagraphAlert = `
... on ParagraphAlert {
  __typename
  uuid
  fieldTitle
  fieldDescription {
    processed
  }
  fieldAlertVariant
  fieldLink {
    url {
      path
    }
    title
  }
  fieldImage {
    entity {
      ${MediaImage}
    }
  }
  isHidden: fieldBoolean
}
`

export const ParagraphCardSlider = `
  ... on ParagraphCardSlider {
    __typename
    uuid
    fieldTitle
    fieldCardSliderVariant
    fieldItems {
      entity {
        ${ParagraphCardItem}
      }
    }
    fieldSpacings {
      entity {
        ${ParagraphSpacings}
      }
    }
  }
`

export const ParagraphPricingVisibilityRule = `
  ... on ParagraphPricingVisibilityRule {
    __typename
    uuid
    fieldPricingVisibility
    fieldPricingPlans
    fieldPricingClouds
    fieldPricingRegions
  }
`

export const ParagraphPricingTableVisibilityRules = `
  ... on ParagraphPricingTableVisibilityRules {
    __typename
    uuid
    fieldCount
    fieldPricingPlans
    fieldPricingClouds
    fieldPricingElement
    fieldPricingRegions
    fieldPricingVisibility
  }
`

export const ParagraphFeaturedTextBox = `
  ... on ParagraphFeaturedTextBox {
    __typename
    uuid
    fieldDescription {
      processed
    }
    fieldLink {
      url {
        path
      }
      title
    }
    fieldImage {
      entity {
        ${MediaImage}
      }
    }
    fieldSpacings {
      entity {
        ${ParagraphSpacings}
      }
    }
  }
`
export const ParagraphTeamSliderItem = `
  ... on ParagraphTeamSliderItem {
    __typename
    uuid
    fieldItem {
      entity {
        ${ParagraphFeaturedTextBox}
      }
    }
    fieldItems {
      entity {
        ${ParagraphSpeaker}
      }
    }
  }
`
export const ParagraphTeamSlider = `
  ... on ParagraphTeamSlider {
    __typename
    uuid
    fieldTitle
    fieldDescription {
      processed
    }
    fieldItems {
      entity {
        ${ParagraphTeamSliderItem}
      }
    }
    fieldSpacings {
      entity {
        ${ParagraphSpacings}
      }
    }
  }
`
export const ParagraphHeavyRichtext = `
  ... on ParagraphHeavyRichtext {
    __typename
    uuid
    fieldBody {
      processed
    }
    fieldImages {
      entity {
        ${MediaImage}
      }
    }
    fieldSpacings {
      entity {
        ${ParagraphSpacings}
      }
    }
  }
`

export const ParagraphSwissContentItem = `
  ... on ParagraphSwissContentItem {
    id
    fieldTitle
    fieldLink {
      url {
        path
      }
      title
    }
    fieldDescription {
      value
    }
    fieldImage {
      entity {
        __typename
        ${MediaImage}
      }
    }
  }
`

export const ParagraphSwissContent = `
  ... on ParagraphSwissContent {
    uuid
    fieldTitle
    fieldDescription {
      value
    }
    fieldItems {
      entity {
        ${ParagraphSwissContentItem}
      }
    }
  }
`

export const ParagraphGeneralTextRow = `
  ... on ParagraphGeneralTextRow {
    __typename
    uuid
    fieldIntro
    fieldTextRowVariant
    fieldDescription {
      processed
    }
    fieldImage {
      entity {
        __typename
        ${MediaImage}
      }
    }
    fieldCtas {
      url {
        path
      }
      title
    }
    fieldLink {
      url {
        path
      }
      title
    }
    fieldBackgroundColor
    fieldWidthColumns
    fieldVideoSource
    fieldRichTitle {
      processed
    }
    fieldVerticalPadding
    fieldHorizontalAlignment
    fieldCtasStyle
    fieldSpacings {
      entity {
        ${ParagraphSpacings}
      }
    }
  }
`

export const ParagraphGeneralTextRowRightCta = `
  ... on ParagraphGeneralTextRowRightCta {
    __typename
    uuid
    fieldRichTitle {
      processed
    }
    fieldDescription {
      processed
    }
    fieldVerticalAlignment
    fieldLink {
      url {
        path
      }
      title
    }
    fieldWidthColumns
    fieldSpacings {
      entity {
        ${ParagraphSpacings}
      }
    }
  }
`

export const ParagraphModalMarketoForm = `
 ... on ParagraphModalMarketoForm {
    id
    fieldCampaignId
    fieldAlignment
    fieldFormId
    fieldCampaignId
    fieldCtaLabel
    fieldTitle
    fieldEnabled
    fieldKey
    fieldSpacings {
      entity {
        ${ParagraphSpacings}
      }
    }
  }
`

export const ParagraphColumnSpacing = `
  ... on ParagraphColumnSpacing {
    id
    fieldBottomSpacing
    fieldBottomSpacingTablet
    fieldBottomSpacingDesktop
  }
`
export const ParagraphHorizontalForm = `
  ... on ParagraphHorizontalForm {
    uuid
    __typename
    fieldTitle
    fieldDescription {
      processed
    }
    fieldBody {
      processed
    }
    fieldImage {
      entity {
        ${MediaImage}
      }
    }
    fieldBoolean
    fieldSpacings {
      entity {
        ${ParagraphSpacings}
      }
    }
    fieldItem {
      entity {
        ${ParagraphCustomForm}
        ${ParagraphMarketoForm}
      }
    }
  }
`

export const ParagraphColumns = `
  ...on ParagraphColumns {
    __typename
    uuid
    fieldTitle
    fieldBackgroundToken
    fieldColumns {
      entity {
        ...on ParagraphColumn {
          uuid
          fieldSpacings {
            entity {
              ${ParagraphColumnSpacing}
            }
          }
          fieldColumnWidthDesktop
          fieldColumnWidthMobile
          fieldColumnWidthTablet
          fieldItems {
            entity {
              ${ParagraphRichText}
              ${ParagraphHeavyRichtext}
              ${ParagraphCtaImageBlock}
              ${ParagraphLogoGrid}
              ${ParagraphSwissContent}
              ${ParagraphMarketoForm}
              ${ParagraphCardList}
              ${ParagraphGeneralTextRow}
              ${ParagraphGeneralTextRowRightCta}
            }
          }
        }
      }
    }
    fieldSpacings {
      entity {
        ${ParagraphSpacings}
      }
    }
  }
`

export const NodeCustomerTeaser = `
  ...on NodeCustomer {
    __typename
    uuid
    title
    fieldCustomerLogo {
      entity {
        ${MediaImage}
      }
    }
    body {
      summary: viewModeFieldFormatter(mode: TEASER)
    }
    path {
      alias
    }
    fieldAdminSettings {
      entity {
        ... on ParagraphCustomerFeaturedInformation {
          id
          fieldCompany
          fieldLink {
            title
            url {
              path
            }
          }
          fieldDescription {
            processed
            format
          }
          fieldTitle
        }
      }
    }
  }
`

export const ParagraphFeaturedCustomers = `
  ... on ParagraphFeaturedCustomers {
    __typename
    uuid
    fieldTitle
    fieldLink {
      url {
        path
      }
      title
    }
    highlightedCustomers: fieldRelatedPosts {
      entity {
        ${NodeCustomerTeaser}
      }
    }
    bottomCustomers: fieldCustomers {
      entity {
        ${NodeCustomerTeaser}
      }
    }
    fieldSpacings {
      entity {
        ${ParagraphSpacings}
      }
    }
  }
`

export const ParagraphFeatureItem = `
  ... on ParagraphFeatureItem {
    __typename
    uuid
    fieldSectionTitle
    fieldTitle
    fieldDescription {
      processed
    }
    fieldImage {
      entity {
        ${MediaImage}
      }
    }
  }
`

export const ParagraphFeatureList = `
  ... on ParagraphFeatureList {
    __typename
    uuid
    fieldTitle
    fieldItems {
      entity {
        ${ParagraphFeatureItem}
      }
    }
    fieldSpacings {
      entity {
        ${ParagraphSpacings}
      }
    }
  }
`

export const ParagraphPricingCardItem = `
  ... on ParagraphPricingCardItem {
    __typename
    uuid
    fieldKey
	fieldDisclaimer
    fieldIntro
    fieldTitle
	fieldSubtitle
    fieldDescription {
      processed
    }
    fieldLink {
      title
      url {
        path
      }
    }
    fieldItem {
      entity {
        ${ParagraphPricingVisibilityRule}
      }
    }
  }
`

export const ParagraphPricingCards = `
  ... on ParagraphPricingCards {
    __typename
    uuid
    fieldTitle
    fieldPricingCardVariant
    fieldItems {
      entity {
        ${ParagraphPricingCardItem}
      }
    }
  }
`

export const ParagraphDemoCenterLibrary = `
  ... on ParagraphDemoCenterLibrary {
    __typename
    uuid
    fieldTitle
    fieldSpacings {
      entity {
        ${ParagraphSpacings}
      }
    }
  }
`

export const ParagraphPricingCta = `
  ... on ParagraphPricingCta {
    __typename
    uuid
    fieldCtas {
      url {
        path
      }
      title
    }
  }`

export const ParagraphAssetPromoCard = `
  ... on ParagraphAssetPromoCard {
    __typename
    uuid
    fieldTitle
    fieldLink {
      url {
        path
      }
      title
    }
    fieldDescription {
      processed
    }
    fieldImage {
      entity {
        ${MediaImage}
      }
    }
    fieldSpacings {
      entity {
        ${ParagraphSpacings}
      }
    }
  }
`

export const ParagraphColumnRichtext = `
  ... on ParagraphColumnRichtext {
    __typename
    uuid
    fieldCount
    fieldDescription {
      processed
    }
  }
`

export const ParagraphPricingAccordionItem = `
  ... on ParagraphPricingAccordionItem {
    __typename
    uuid
    fieldTitle
    fieldDescription {
      processed
    }
    fieldItem {
      entity {
        ${ParagraphPricingVisibilityRule}
      }
    }
  }
`

export const ParagraphPricingRichtext = `
  ... on ParagraphPricingRichtext {
    __typename
    uuid
    fieldTitle
    fieldDescription {
      processed
    }
    fieldItem {
      entity {
        ${ParagraphPricingVisibilityRule}
      }
    }
  }
`

export const ParagraphBoolean = `
  ... on ParagraphBoolean {
    __typename
    uuid
    fieldCount
    fieldBoolean
  }
`

export const ParagraphPricingFeatureItem = `
  ... on ParagraphPricingFeatureItem {
    __typename
    uuid
    fieldEnabled
    fieldItems {
      entity {
        __typename
        uuid
        ${ParagraphColumnRichtext}
        ${ParagraphBoolean}
      }
    }
  }
`

export const ParagraphTableColumnPricing = `
  ... on ParagraphTableColumnPricing {
    __typename
    uuid
    fieldTitle
    fieldSubtitle
    fieldDescription {
      processed
    }
    fieldLink {
      url {
        path
      }
      title
    }
  }
`

export const ParagraphTableRowPricing = `
  ... on ParagraphTableRowPricing {
    __typename
    uuid
    fieldItems {
      entity {
        __typename
        ${ParagraphTableColumnPricing}
      }
    }
  }
`

export const ParagraphTableColumn = `
  ... on ParagraphTableColumn {
    __typename
    uuid
    fieldDescription {
      processed
    }
  }
`

export const ParagraphTableRowAccordion = `
  ... on ParagraphTableRowAccordion {
    __typename
    uuid
    fieldBoolean
    fieldItems {
      entity {
        __typename
        ${ParagraphTableColumn}
      }
    }
  }
`

export const ParagraphPricingFeatureTable = `
  ... on ParagraphPricingFeatureTable {
    __typename
    uuid
    fieldTitle
    fieldColumnCount
    fieldEnabled
    fieldResources {
      entity {
        __typename
        uuid
        ${ParagraphPricingTableVisibilityRules}
      }
    }
    fieldItem {
      entity {
        __typename
        uuid
        ${ParagraphPricingVisibilityRule}
      }
    }
    fieldItems {
      entity {
        __typename
        uuid
        ${ParagraphPricingFeatureItem}
      }
    }
  }
`

export const ParagraphPricingAccordion = `
  ... on ParagraphPricingAccordion {
    __typename
    uuid
    fieldTitle
    fieldItems {
      entity {
        ${ParagraphPricingAccordionItem}
      }
    }
  }
`

export const ParagraphPricingSection = `
  ... on ParagraphPricingSection {
    __typename
    uuid
    fieldRegionList
    fieldTitle
    fieldPricingFilters
    fieldAvailablePlans
    fieldAvailableClouds
    fieldItems {
      entity {
        __typename
        ${ParagraphPricingCards}
        ${ParagraphPricingFeatureTable}
        ${ParagraphPricingAccordion}
        ${ParagraphPricingCta}
        ${ParagraphPricingRichtext}
      }
    }
    fieldSpacings {
      entity {
        ${ParagraphSpacings}
      }
    }
  }
`

export const ParagraphPricingTable = `
  ... on ParagraphPricingTable {
    __typename
    uuid
    fieldTitle
    fieldDescription {
      processed
    }
    fieldColumnCount
    fieldResources {
      entity {
        __typename
        ${ParagraphRichText}
      }
    }
    fieldItems {
      entity {
        __typename
        ${ParagraphTableRowAccordion}
        ${ParagraphTableRowPricing}
      }
    }
    fieldSpacings {
      entity {
        ${ParagraphSpacings}
      }
    }
  }
`

export const ParagraphAccordionTable = `
  ... on ParagraphAccordionTable {
    __typename
    uuid
    fieldTitle
    fieldColumnCount
    fieldItemsDisplay
    fieldItems {
      entity {
        __typename
        ${ParagraphTableRowAccordion}
      }
    }
    fieldSpacings {
      entity {
        ${ParagraphSpacings}
      }
    }
  }
`

export const ParagraphTechnicalTableHeaderColumn = `
  ... on ParagraphTechnicalTableHeaderColumn {
    fieldDescription {
      processed
    }
    fieldCount
    fieldColumnCount
    fieldHorizontalAlignment
    fieldVerticalAlignment
    fieldColumnVerticalAlignment
    fieldColumnHorizontalAlignmen
  }
`

export const ParagraphTechnicalTableHeaderRow = `
  ... on ParagraphTechnicalTableHeaderRow {
    fieldItems {
      entity {
        ${ParagraphTechnicalTableHeaderColumn}
      }
    }
  }
`

export const ParagraphTechnicalTableColumn = `
  ... on ParagraphTechnicalTableColumn {
    fieldDescription {
      processed
    }
    fieldIconType
    fieldOrientation
    fieldCount
    fieldColumnCount
    fieldBackgroundToken
    fieldHorizontalAlignment
    fieldVerticalAlignment
  }
`

export const FieldParagraphTechnicalTableSubRowFieldItems = `
  ... on FieldParagraphTechnicalTableSubRowFieldItems {
    entity {
      ${ParagraphTechnicalTableColumn}
    }
  }
`

export const ParagraphTechnicalTableSubRow = `
  ... on ParagraphTechnicalTableSubRow {
    fieldItems {
      ${FieldParagraphTechnicalTableSubRowFieldItems}
    }
  }
`

export const ParagraphTechnicalTableRow = `
  ... on ParagraphTechnicalTableRow {
    fieldBackgroundToken
    fieldVerticalAlignment
    fieldHorizontalAlignment
    fieldItems {
      entity {
        ${ParagraphTechnicalTableColumn}
      }
    }
    fieldResources {
      entity {
        ${ParagraphTechnicalTableSubRow}
      }
    }
  }
`

export const ParagraphTechnicalTable = `
  ... on ParagraphTechnicalTable {
    __typename
    uuid
    fieldTechnicalTableVariant
    fieldAgendaItems {
      entity {
        ${ParagraphTechnicalTableHeaderRow}
      }
    }
    fieldItems {
      entity {
        ${ParagraphTechnicalTableRow}
      }
    }
  }
`

export const ParagraphSecondaryMenu = `
  ... on ParagraphSecondaryMenu {
    __typename
    uuid
    fieldTitle
    fieldLinks {
      url {
        path
      }
      title
    }
    fieldLink {
      url {
        path
      }
      title
    }
  }
`

export const ParagraphImageSliderItem = `
  ... on ParagraphImageSliderItem {
    __typename
    uuid
    fieldLink {
      url {
        path
      }
      title
    }
    fieldImage {
      entity {
        ${MediaImage}
      }
    }
  }
`

export const ParagraphImageSlider = `
  ... on ParagraphImageSlider {
    __typename
    uuid
    fieldCount
    fieldColumnCount
    fieldItems {
      entity {
        ${ParagraphImageSliderItem}
      }
    }
  }
`

export const ParagraphBigHero = `
  ... on ParagraphBigHero {
    __typename
    uuid
    fieldBody {
      processed
    }
    fieldColumnCount
    fieldCompany
    fieldCount
    fieldCtas {
      url {
        path
      }
      title
    }
    fieldFormCta
    fieldImage {
      entity {
        ${MediaImage}
      }
    }
    fieldRelatedImage {
      entity {
        ${MediaImage}
      }
    }
    fieldTypewriterMessages
    fieldSpacings {
      entity {
        ${ParagraphSpacings}
      }
    }
    fieldHeaderImage {
      entity {
        ${MediaImage}
      }
    }
  }
`

export const ParagraphFloatingBox = `
  ... on ParagraphFloatingBox {
    __typename
    uuid
    fieldColor {
      color
      opacity
    }
    fieldSecondaryColor {
      color
      opacity
    }
    fieldEnabled
    fieldOverlapSize
    fieldItems {
      entity {
        ${ParagraphCtaImageBlock}
      }
    }
    fieldSpacings {
      entity {
        ${ParagraphSpacings}
      }
    }
  }
`

export const ParagraphGeneralCtaRow = `
  ...on ParagraphGeneralCtaRow {
    __typename
    uuid
    fieldAlignment
    fieldItems {
      entity {
        ${ParagraphGeneralCtaRowItem}
      }
    }
    fieldSpacings {
      entity {
        ${ParagraphSpacings}
      }
    }
  }
`

export const ParagraphQuoteSliderItem = `
  ... on ParagraphQuoteSliderItem {
    __typename
    uuid
    fieldBody {
      processed
    }
    fieldDescription {
      processed
    }
  }
`
export const ParagraphBasicQuoteSlider = `
  ... on ParagraphBasicQuoteSlider {
    __typename
    uuid
    parentType
    fieldItems {
      entity {
        ${ParagraphQuoteSliderItem}
      }
    }
  }
`
export const ParagraphBoxedQuoteSliderItem = `
  ... on ParagraphBoxedQuoteSliderItem {
    __typename
    uuid
    fieldBody {
      processed
    }
    fieldDescription {
      processed
    }
    fieldImage {
      entity {
        ${MediaImage}
      }
    }
  }
`
export const ParagraphBoxedQuoteSlider = `
  ... on ParagraphBoxedQuoteSlider {
    __typename
    uuid
    parentType
    fieldSpacings {
      entity {
        ${ParagraphSpacings}
      }
    }
    fieldItems {
      entity {
        ${ParagraphBoxedQuoteSliderItem}
      }
    }
  }
`
export const ParagraphTextSliderItem = `
  ... on ParagraphTextSliderItem {
    __typename
    uuid
    fieldBody {
      processed
    }
    fieldLink {
      url {
        path
      }
      title
    }
    fieldBoolean
  }
`

export const ParagraphTrialBladeListItem = `
  ... on ParagraphTrialBladeListItem {
    __typename
    uuid
    fieldTitle
    fieldDescription {
      processed
    }
  }
`

export const ParagraphSlideUpForm = `
  ... on ParagraphSlideUpForm {
    __typename
    uuid
    fieldItem {
      entity {
        ${ParagraphModalMarketoForm}
      }
    }
    fieldLink {
      url {
        path
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
        ${MediaImage}
      }
    }
    fieldItems {
      entity {
        ${ParagraphTrialBladeListItem}
      }
    }
  }
`

export const ParagraphTrialBlade = `
  ... on ParagraphTrialBlade {
    __typename
    uuid
    fieldTitle
    fieldSubtitle
    fieldCloudType
    fieldThankYouUrl {
      url {
        path
      }
    }
    fieldSpacings {
      entity {
        ${ParagraphSpacings}
      }
    }
    fieldItems {
      entity {
        __typename
        uuid
        ${ParagraphTrialBladeListItem}
      }
    }
  }
`

export const ParagraphTextSlider = `
  ... on ParagraphTextSlider {
    __typename
    uuid
    parentType
    fieldCount
    fieldBackgroundToken
    fieldSpacings {
      entity {
        ${ParagraphSpacings}
      }
    }
    fieldItems {
      entity {
        __typename
        ${ParagraphTextSliderItem}
      }
    }
  }
`
export const ParagraphAcceleratorCard = `
  ... on ParagraphAcceleratorCard {
    __typename
    uuid
    fieldTitle
    fieldLink {
      uri
      url {
        path
      }
      title
    }
    fieldFeatured
    fieldHot
    fieldNew
    fieldAcceleratorPartnerTerm {
      entity {
        ${TaxonomyTermAcceleratorPartners}
      }
    }
    fieldIndustry {
      entity {
        ${TaxonomyTermIndustry}
      }
    }
  }
`
export const ParagraphFlatIconCard = `
  ... on ParagraphFlatIconCard {
    __typename
    uuid
    fieldRichTitle {
      processed
    }
    fieldDescription {
      processed
    }
    fieldBackgroundToken
    fieldEyebrow
    fieldCta {
      title
      url {
        path
      }
    }
    fieldImage {
      entity {
        ${MediaImage}
      }
    }
  }
`
export const ParagraphDrawerCard = `
  ... on ParagraphDrawerCard {
    __typename
    uuid
    fieldTitle
    fieldSectionTitle
    fieldKey
    fieldHot
    fieldFeatured
    fieldDescription {
      processed
    }
    fieldBoolean
    fieldLink {
      url {
        path
        associatedNode {
          ... on NodeDemoPage {
            nid
            title
            fieldGatedAssetForm {
              entity {
                ${ParagraphSlideUpForm}
              }
            }
          }
        }
      }
      title
    }
    fieldImage {
      entity {
        ${MediaImage}
      }
    }
  }
`
export const ParagraphListCardItem = `
  ... on ParagraphListCardItem {
    __typename
    uuid
    fieldTitle
    fieldLinks {
      url {
        path
      }
      title
    }
  }
`
export const ParagraphListCard = `
  ... on ParagraphListCard {
    __typename
    uuid
    fieldTitle
    fieldItems {
      entity {
        ${ParagraphListCardItem}
      }
    }
    fieldLink {
      url {
        path
      }
      title
    }
    fieldImage {
      entity {
        ${MediaImage}
      }
    }
  }
`
export const ParagraphThreeCardCluster = `
  ... on ParagraphThreeCardCluster {
    __typename
    uuid
    fieldItem {
      entity {
        ${ParagraphDrawerCard}
        ${ParagraphListCard}
      }
    }
    fieldItems {
      entity {
        ${ParagraphDrawerCard}
        ${ParagraphAcceleratorCard}
      }
    }
    fieldSpacings {
      entity {
        ${ParagraphSpacings}
      }
    }
  }
`
export const ParagraphSmallPromoBlock = `
  ... on ParagraphSmallPromoBlock {
    __typename
    uuid
    fieldSpacings {
      entity {
        ${ParagraphSpacings}
      }
    }
    fieldTitle
    fieldDescription {
      processed
    }
    fieldLink {
      url {
        path
      }
      title
    }
    fieldImage {
      entity {
        ${MediaImage}
      }
    }
  }
`

export const ParagraphFeaturedIndustryCard = `
  ... on ParagraphFeaturedIndustryCard {
    __typename
    uuid
    fieldTitle
    fieldSubtitle
    fieldImage {
      entity {
        __typename
        ${MediaImage}
      }
    }
    fieldLink {
      url {
        path
      }
    }
    fieldCtaLabel
    fieldImages {
      entity {
        __typename
        ${MediaImage}
      }
    }
    fieldSolutionsIndustryPage {
      entity {
        entityUrl {
          path
        }
      }
    }
  }
`

export const ParagraphFeaturedIndustryCardList = `
  ... on ParagraphFeaturedIndustryCardList {
    __typename
    uuid
    fieldTitle
    fieldItems {
      entity {
        ${ParagraphFeaturedIndustryCard}
      }
    }
  }
`

export const ParagraphTransparentCard = `
  ... on ParagraphTransparentCard {
    __typename
    uuid
    fieldLink {
      url {
        path
      }
      title
    }
    fieldTitle
    fieldBoolean
    fieldDescription {
      processed
    }
  }
`
export const ParagraphPartnerSolutionCard = `
  ... on ParagraphPartnerSolutionCard {
    __typename
    uuid
    fieldLink {
      url {
        path
      }
      title
    }
    fieldImage {
      entity {
        ${MediaImage}
      }
    }
    fieldTitle
    fieldSectionTitle
  }
`
export const ParagraphSmallTileCard = `
  ... on ParagraphSmallTileCard {
    __typename
    uuid
    fieldLink {
      url {
        path
      }
      title
    }
    fieldImage {
      entity {
        ${MediaImage}
      }
    }
    fieldTitle
    fieldKey
    fieldBoolean
    fieldBackgroundToken
    fieldRemoveHover
  }
`
export const ParagraphCardGrid = `
  ... on ParagraphCardGrid {
    __typename
    uuid
    fieldBottomSpacing
    fieldBottomSpacingDesktop
    fieldBottomSpacingTablet
    fieldColumnWidthDesktop
    fieldColumnWidthMobile
    fieldColumnWidthTablet
    fieldSpacings {
      entity {
        ${ParagraphSpacings}
      }
    }
    fieldItems {
      entity {
        __typename
        ${ParagraphFlatIconCard}
        ${ParagraphTransparentCard}
        ${ParagraphPartnerSolutionCard}
        ${ParagraphSmallTileCard}
        ${ParagraphAcceleratorCard}
      }
    }
  }
`

export const ParagraphAcceleratorCards = `
  ... on ParagraphAcceleratorCards {
    __typename
    uuid
    fieldTitle
    fieldItems {
      entity {
        ${ParagraphAcceleratorCard}
      }
    }
  }
`

export const ParagraphResourcesSection = `
  ... on ParagraphResourcesSection {
    __typename
    uuid
    fieldTitle
    fieldSubtitle
    fieldBackgroundResourceCard
    fieldItems {
      entity {
        ... on ParagraphResourceCard {
          fieldTitle
          fieldSubtitle
          fieldLinks {
            title
            url {
              path
            }
          }
        }
      }
    }
    fieldSpacings {
      entity {
        ${ParagraphSpacings}
      }
    }
  }
  `

export const ParagraphLargeCard = `
  ... on ParagraphLargeCard {
    __typename
    uuid
    fieldHeaderImage {
      entity {
        ${MediaImage}
      }
    }
    fieldImage {
      entity {
        ${MediaImage}
      }
    }
    fieldIntro
    fieldSubtitle
    fieldRichTitle {
      processed
    }
    fieldDescription {
      processed
    }
    fieldLink {
      title
      url {
        path
      }
    }
  }
`

export const ParagraphLargeStepSlider = `
  ... on ParagraphLargeStepSlider {
    __typename
    uuid
    fieldIntro
    fieldBody {
      processed
    }
    fieldRichTitle {
      processed
    }
    fieldItems {
      entity {
        __typename
        ${ParagraphLargeCard}
        ${ParagraphPartnerSolutionCard}
      }
    }
    fieldSpacings {
      entity {
        ${ParagraphSpacings}
      }
    }
  }
`

export const ParagraphPartnerSearch = `
  ...on ParagraphPartnerSearch {
    __typename
    uuid
    fieldTitle
    fieldPartnerType {
      entity {
        name
      }
    }
    fieldSpacings {
      entity {
        ${ParagraphSpacings}
      }
    }
  }
`

export const ParagraphVideoRow = `
  ... on ParagraphVideoRow {
    __typename
    uuid
    fieldTitle
    fieldDescription {
      processed
    }
    fieldImage {
      entity {
        ${MediaImage}
      }
    }
    fieldVideoPlaceholderImage {
      entity {
        ${MediaImage}
      }
    }
    fieldCtas {
      url {
        path
      }
      title
    }
    fieldVideoRowVariant
    fieldVideoSource
  }
`

export const ParagraphLargePageHeader = `
  ... on ParagraphLargePageHeader {
    __typename
    uuid
    fieldTitle
    fieldSubtitle
    fieldTitleColorToken
    fieldBody {
      processed
    }
    fieldCtas {
      url {
        path
      }
      title
    }
    fieldBackgroundToken
    widthDesktop: fieldWidthColumns
    widthTablet: fieldInitialColumn
    fieldImage {
      entity {
        __typename
        ${MediaImage}
      }
    }
    imageHeightDesktop: fieldCompany
    imageHeightTablet: fieldCtaLabel
    spacingDesktop: fieldImageColumnWidth
    spacingTablet: fieldSpacingBetweenTablet
    fieldSpacings {
      entity {
        ${ParagraphSpacings}
      }
    }
  }
`

export const ParagraphRelatedLinks = `
  ... on ParagraphRelatedLinks {
    __typename
    uuid
    fieldTitle
    fieldLinks {
      url {
        path
      }
      title
    }
  }
`

export const ParagraphIndustryCard = `
  ... on ParagraphIndustryCard {
    __typename
    uuid
    fieldTitle
    fieldCtaLabel
    fieldImage {
      entity {
        ${MediaImage}
      }
    }
    fieldItems {
      entity {
        ${ParagraphRelatedLinks}
      }
    }
    fieldSolutionsIndustryPage {
      entity {
        entityUrl {
          path
        }
      }
    }
    fieldIndustry {
      entity {
        name
      }
    }
  }
`

export const ParagraphIndustryCardList = `
  ... on ParagraphIndustryCardList {
    __typename
    uuid
    fieldTitle
    fieldItems {
      entity {
        ${ParagraphIndustryCard}
      }
    }
  }
`

export const ParagraphCustomerStory = `
  ... on ParagraphCustomerStory {
    __typename
    uuid
    fieldLink {
      url {
        path
      }
      title
    }
    fieldIntro
    fieldDescription {
      processed
    }
    fieldImage {
      entity {
        ${MediaImage}
      }
    }
  }
`
export const ParagraphVerticalTabItem = `
  ... on ParagraphVerticalTabItem {
    __typename
    uuid
    fieldTitle
    fieldSubtitle
    fieldWidthColumns
    fieldDescription {
      processed
    }
    fieldImage {
      entity {
        ${MediaImage}
        }
      }
    }
    fieldItem {
      entity {
        ${ParagraphCustomerStory}
      }
    }
  }
`

export const ParagraphVerticalTabs = `
  ... on ParagraphVerticalTabs {
    __typename
    uuid
    fieldItems {
      entity {
        ${ParagraphVerticalTabItem}
      }
    }
    fieldSpacings {
      entity {
        ${ParagraphSpacings}
      }
    }
  }
`
export const ParagraphHeroEventSpeaker = `
 ... on ParagraphHeroEventSpeaker {
    fieldTitle
    fieldRole
    fieldImage {
      entity {
        __typename
        ${MediaImage}
      }
    }
  }
`
export const ParagraphHeroEvent = `
  ... on ParagraphHeroEvent {
    fieldItems {
      entity {
        ${ParagraphHeroEventSpeaker}
      }
    }
    fieldLink {
      url {
        path
      }
      title
    }
    fieldImage {
      entity {
        __typename
        ${MediaImage}
      }
    }
    fieldHeaderImage {
      entity {
        __typename
        ${MediaImage}
      }
    }
    fieldTitle
    fieldSectionTitle
    fieldDescription {
      processed
    }
    fieldSpacings {
      entity {
        ${ParagraphSpacings}
      }
    }
  }
`

// Library Paragraphs

export const ParagraphInPageNavigationItem = `
  ... on ParagraphInPageNavigationItem {
    __typename
    uuid
    fieldLink {
      url {
        path
      }
      title
    }
    fieldItems {
      entity {
        ... on ParagraphInPageNavigationItem {
          fieldLink {
            url {
              path
            }
            title
          }
        }
      }
    }
  }
`

export const ParagraphInPageNavigation = `
  ... on ParagraphInPageNavigation {
    __typename
    uuid
    fieldBoolean
    fieldItems {
      entity {
        ${ParagraphInPageNavigationItem}
      }
    }
  }
`

export const ParagraphInPageNavigationHorizontal = `
  ... on ParagraphInPageNavigationHorizontal {
    __typename
    uuid
    fieldLinks {
      url {
        path
      }
      title
    }
  }
`

export const ParagraphsLibraryItem = `
  ... on ParagraphsLibraryItem {
    __typename
    uuid
    paragraphs {
      entity {
        ${ParagraphSecondaryMenu}
        ${ParagraphHero}
        ${ParagraphInPageNavigation}
        ${ParagraphInPageNavigationHorizontal}
      }
    }
  }
`

export const ParagraphFromLibrary = `
  ... on ParagraphFromLibrary {
    __typename
    uuid
    fieldReusableParagraph {
      entity {
        __typename
        ${ParagraphsLibraryItem}
      }
    }
    fieldSpacings {
      entity {
        ${ParagraphSpacings}
      }
    }
  }
`
export const ParagraphCertifications = `
  ... on ParagraphCertifications  {
    __typename
    uuid
    fieldAvailableClouds
    fieldDescription {
      processed
    }
    fieldLink {
      title
      url {
        path
      }
    }
    fieldImage {
      entity {
        ${MediaImage}
      }
    }
  }
`

export const ParagraphTrustCenterCertifications = `
  ... on ParagraphTrustCenterCertifications  {
    __typename
    uuid
    fieldTitle
    fieldItems {
      entity {
        ${ParagraphCertifications}
      }
    }
  }
`

export const ParagraphCustomComponent = `
  ... on ParagraphCustomComponent {
    __typename
    id
    fieldTitle
    fieldBody {
      processed
    }
    fieldComponentName
    fieldSpacings {
      entity {
        ${ParagraphSpacings}
      }
    }
  }
`

export const ParagraphIframeEmbed = `
  ... on ParagraphIframeEmbed {
    __typename
    uuid
    fieldIframeComponent
    fieldIframeUrl
  }
`

export const ParagraphInPageNavigationSticky = `
  ... on ParagraphInPageNavigationSticky {
    __typename
    uuid
    fieldLinks {
      url {
        path
      }
      title
    }
  }
`

export const ParagraphTabbedContentItem = `
  ... on ParagraphTabbedContentItem {
    __typename
    uuid
    fieldTitle
    fieldItems {
      entity {
        __typename
        ${ParagraphResourceList}
        ${ParagraphInnerMenu}
        ${ParagraphHero}
        ${ParagraphHeroWithColumns}
        ${ParagraphCalloutRow}
        ${ParagraphImage}
        ${ParagraphSpeakerList}
        ${ParagraphAccordionList}
        ${ParagraphCardList}
        ${ParagraphCta}
        ${ParagraphCtaBlockList}
        ${ParagraphLogoGrid}
        ${ParagraphSlider}
        ${ParagraphCtaImageBlock}
        ${ParagraphTabList}
        ${ParagraphCtaSection}
        ${ParagraphMarketoForm}
        ${ParagraphQuote}
        ${ParagraphRichText}
        ${ParagraphCtaCards}
        ${ParagraphVideoPlaylist}
        ${ParagraphCardSlider}
        ${ParagraphTeamSlider}
        ${ParagraphHeavyRichtext}
        ${ParagraphFeaturedCustomers}
        ${ParagraphCustomerHubCards}
        ${ParagraphFeatureList}
        ${ParagraphPricingCards}
        ${ParagraphPricingSection}
        ${ParagraphBigCombo}
        ${ParagraphLeadCombo}
        ${ParagraphFromLibrary}
        ${ParagraphFeaturedTextBox}
        ${ParagraphAssetPromoCard}
        ${ParagraphCustomComponent}
        ${ParagraphPricingTable}
        ${ParagraphAccordionTable}
        ${ParagraphImageSlider}
        ${ParagraphBigHero}
        ${ParagraphCtaHexImageList}
        ${ParagraphFloatingBox}
        ${ParagraphVideoRow}
        ${ParagraphGeneralCtaRow}
        ${ParagraphSwissContent}
        ${ParagraphBasicQuoteSlider}
        ${ParagraphLargePageHeader}
        ${ParagraphFeaturedIndustryCardList}
        ${ParagraphInPageNavigationHorizontal}
        ${ParagraphIndustryCardList}
        ${ParagraphAcceleratorCards}
        ${ParagraphColumns}
        ${ParagraphSecondaryMenu}
        ${ParagraphPartnerSearch}
        ${ParagraphLabelAndLinks}
        ${ParagraphBoxedQuoteSlider}
        ${ParagraphTextSlider}
        ${ParagraphHorizontalTabs}
        ${ParagraphBulletedList}
        ${ParagraphGeneralTextRow}
        ${ParagraphInPageNavigationSticky}
        ${ParagraphModalMarketoForm}
        ${ParagraphTrustCenterCertifications}
        ${ParagraphCtaDownload}
        ${ParagraphAnimatedLogoSlider}
        ${ParagraphThreeCardCluster}
      }
    }
  }
`

export const ParagraphTabbedContent = `
  ... on ParagraphTabbedContent {
    __typename
    uuid
    fieldIntro
    fieldRichTitle {
      processed
    }
    fieldPillsVariant
    fieldHorizontalAlignment
    fieldBoolean
    fieldItems {
      entity {
        ${ParagraphTabbedContentItem}
      }
    }
    fieldSpacings {
      entity {
        ${ParagraphSpacings}
      }
    }
  }
`

export const ParagraphSpotlight = `
  ... on ParagraphSpotlight {
    __typename
    uuid
    fieldTitle
    fieldLink {
      title
      url {
        path
      }
    }
    fieldItems {
      entity {
        ${ParagraphCard}
      }
    }
    fieldSpacings {
      entity {
        ${ParagraphSpacings}
      }
    }
  }
`

export const ParagraphLogoWheel = `
  ... on ParagraphLogoWheel {
    __typename
    fieldTitle
    fieldLink {
      url {
        path
      }
      title
    }
    fieldBody {
      processed
    }
    fieldImage {
      entity {
        ${MediaImage}
      }
    }
    fieldSpacings {
      entity {
        ${ParagraphSpacings}
      }
    }
  }
`

export const ParagraphWrapper = `
  ...on ParagraphWrapper {
    __typename
    uuid
    fieldTitle
    fieldWidthColumns
    fieldInitialColumn
    fieldBackgroundToken
    fieldColor {
      color
      opacity
    }
    fieldItems {
      entity {
        ${ParagraphRichText}
        ${ParagraphHeavyRichtext}
        ${ParagraphCtaImageBlock}
        ${ParagraphLogoGrid}
        ${ParagraphCardList}
        ${ParagraphResourceList}
        ${ParagraphQuote}
        ${ParagraphGeneralCtaRow}
        ${ParagraphThreeCardCluster}
        ${ParagraphSwissContent}
        ${ParagraphAssetPromoCard}
        ${ParagraphVideoTranscript}
        ${ParagraphAccordionList}
        ${ParagraphSpeakerList}
        ${ParagraphAccordionTable}
        ${ParagraphTrialBlade}
        ${ParagraphPromoRow}
        ${ParagraphIntegrationCarousel}
        ${ParagraphCtaBlockList}
        ${ParagraphBoxedQuoteSlider}
        ${ParagraphGeneralTextRowRightCta}
        ${ParagraphTechnicalTable}
        ${ParagraphSectionId}
        ${ParagraphHeaderSection}
        ${ParagraphSlider}
        ${ParagraphVideoPlaylist}
        ${ParagraphTabList}
        ${ParagraphTab}
        ${ParagraphFeaturedIndustryCardList}
        ${ParagraphLargeStepSlider}
        ${ParagraphCardGrid}
        ${ParagraphAcceleratorCards}
        ${ParagraphTabbedContent}
        ${ParagraphSpotlight}
        ${ParagraphResourcesSection}
        ${ParagraphAnimatedLogoSlider}
        ${ParagraphLogoWheel}
        ${ParagraphImage}
      }
    }
  }
`
export const ParagraphInPageNavigationContainer = `
  ... on ParagraphInPageNavigationContainer {
    __typename
    uuid
    fieldItem {
      entity {
        ${ParagraphInPageNavigation}
        ${ParagraphFromLibrary}
      }
    }
    fieldItems {
      entity {
        __typename
        ${ParagraphAccordionList}
        ${ParagraphCardList}
        ${ParagraphCta}
        ${ParagraphCtaBlockList}
        ${ParagraphCtaImageBlock}
        ${ParagraphGeneralCtaRow}
        ${ParagraphGeneralTextRow}
        ${ParagraphImage}
        ${ParagraphResourceList}
        ${ParagraphRichText}
        ${ParagraphSlider}
        ${ParagraphVideoPlaylist}
        ${ParagraphVideoRow}
        ${ParagraphVideoTranscript}
        ${ParagraphWrapper}
        ${ParagraphSwissContent}
        ${ParagraphAssetPromoCard}
        ${ParagraphSectionId}
        ${ParagraphModalMarketoForm}
        ${ParagraphBasicAccordion}
        ${ParagraphColumns}
        ${ParagraphAccordionTable}
        ${ParagraphTrustCenterCertifications}
        ${ParagraphTechnicalTable}
        ${ParagraphImageSlider}
        ${ParagraphLogoGrid}
        ${ParagraphPricingSection}
        ${ParagraphTabList}
        ${ParagraphQuoteCombo}
        ${ParagraphCustomComponent}
      }
    }
  }
`

export const ParagraphSlideOutForm = `
  ... on ParagraphSlideOutForm {
    __typename
    uuid
    fieldFormId
    fieldCampaignId
    fieldTitle
    fieldBoolean
    fieldFormVariant				
    fieldBody {
      processed
    }
    fieldThankYouUrl {
      url {
        path
      }
      title
    }
  }
`

export const ParagraphCloudRegion = `
  ... on ParagraphCloudRegion {
    __typename
    fieldTitle
    fieldLink {
      url {
        path
      }
      title
    }
    fieldImage {
      entity {
        ${MediaImage}
      }
    }
  }
`

export const FieldParagraphRegionalCloudMapFieldItems = `
  ... on FieldParagraphRegionalCloudMapFieldItems {
    __typename
    entity {
      ${ParagraphCloudRegion}
    }
  }
`

export const ParagraphRegionalCloudMap = `
  ... on ParagraphRegionalCloudMap {
    __typename
    uuid
    fieldTitle
    fieldItems {
      ${FieldParagraphRegionalCloudMapFieldItems}
    }
  }
`

export const NodePartner = `
  ... on NodePartner {
  title
  fieldSubtitle
  entityMetatags {
    ${Metatag}
  }
  fieldMedia {
    entity {
      ${MediaImage}
    }
  }
  fieldDisplayBackgroundImage
  fieldHideGlobalAlert
  fieldHideCustomAlert
  fieldCustomAlert {
    entity {
      ${ParagraphAlert}
    }
  }
  fieldSpacings {
    entity {
      ${ParagraphSpacings}
    }
  }
  fieldComponents {
    entity {
      __typename
      ${ParagraphResourceList}
      ${ParagraphInnerMenu}
      ${ParagraphHero}
      ${ParagraphHeroWithColumns}
      ${ParagraphCalloutRow}
      ${ParagraphImage}
      ${ParagraphSpeakerList}
      ${ParagraphAccordionList}
      ${ParagraphCardList}
      ${ParagraphCta}
      ${ParagraphCtaBlockList}
      ${ParagraphLogoGrid}
      ${ParagraphSlider}
      ${ParagraphCtaImageBlock}
      ${ParagraphTabList}
      ${ParagraphCtaSection}
      ${ParagraphMarketoForm}
      ${ParagraphCtaHexImageList}
      ${ParagraphQuote}
      ${ParagraphQuoteCombo}
      ${ParagraphRichText}
      ${ParagraphBigCombo}
      ${ParagraphLeadCombo}
      ${ParagraphCtaCards}
      ${ParagraphAccordionTable}
      ${ParagraphBasicAccordion}
      ${ParagraphPricingTable}
      ${ParagraphVideoPlaylist}
      ${ParagraphCardSlider}
      ${ParagraphTeamSlider}
      ${ParagraphWrapper}
      ${ParagraphFeaturedCustomers}
      ${ParagraphCustomerHubCards}
      ${ParagraphFeatureList}
      ${ParagraphPricingCards}
      ${ParagraphPricingSection}
      ${ParagraphFromLibrary}
      ${ParagraphCustomForm}
      ${ParagraphFeaturedTextBox}
      ${ParagraphAssetPromoCard}
      ${ParagraphCustomComponent}
      ${ParagraphHeavyRichtext}
      ${ParagraphVideoTranscript}
      ${ParagraphBigHero}
      ${ParagraphGeneralTextRow}
      ${ParagraphFloatingBox}
      ${ParagraphVideoRow}
      ${ParagraphImageSlider}
      ${ParagraphGeneralCtaRow}
      ${ParagraphSwissContent}
      ${ParagraphBasicQuoteSlider}
      ${ParagraphLargePageHeader}
      ${ParagraphFeaturedIndustryCardList}
      ${ParagraphIndustryCardList}
      ${ParagraphAcceleratorCards}
      ${ParagraphColumns}
      ${ParagraphSecondaryMenu}
      ${ParagraphPartnerSearch}
      ${ParagraphLabelAndLinks}
      ${ParagraphBoxedQuoteSlider}
      ${ParagraphTextSlider}
      ${ParagraphHorizontalTabs}
      ${ParagraphBulletedList}
    }
  }
}
`

export const NodePartnerSolution = `
  ... on NodePartnerSolution {
    solutionTitle: title
    uuid
    entityUrl {
      path
    }
    fieldIndustries {
      entity {
        entityLabel
      }
    }
    fieldRegions {
      entity {
        entityLabel
      }
    }
    fieldPartner {
      entity {
        ... on NodePartner {
          __typename
          partnerTitle: title
          fieldMedia {
            entity {
              ${MediaImage}
            }
          }
        }
      }
    }
    fieldSpacings {
      entity {
        ${ParagraphSpacings}
      }
    }
    entityMetatags {
      ${Metatag}
    }
    fieldComponents {
      entity {
        __typename
        ${ParagraphCtaImageBlock}
        ${ParagraphRichText}
        ${ParagraphGeneralTextRow}
        ${ParagraphGeneralCtaRow}
        ${ParagraphLargePageHeader}
        ${ParagraphResourceList}
      }
    }
    overrideData: fieldCustomPrefooterCta {
      entity {
        ... on ParagraphPartnerSolutionOverview {
          fieldTitle
          fieldLink {
            url {
              path
            }
            title
          }
          fieldImage {
            entity {
              ${MediaImage}
            }
          }
        }
      }
    }
  }
`

export const ParagraphPartnerSolutionSearchInternal = `
  ... on ParagraphPartnerSolutionSearchInternal {
    __typename
    uuid
    fieldReference {
      entity {
        ${NodePartnerSolution}
      }
    }
  }
`

export const ParagraphPartnerSolutionSearchCard = `
  ... on ParagraphPartnerSolutionSearchCard {
    __typename
    uuid
    solutionTitle: fieldTitle
    fieldLink {
      url {
        path
      }
    }
    fieldIndustries: fieldIndustry {
      entity {
        entityLabel
      }
    }
    fieldRegions: fieldTerms {
      entity {
        entityLabel
      }
    }
    fieldPartner: fieldReference {
      entity {
        ... on NodePartner {
          __typename
          partnerTitle: title
          fieldMedia {
            entity {
              ${MediaImage}
            }
          }
        }
      }
    }
    fieldImage {
      entity {
        ${MediaImage}
      }
    }
  }
`

export const ParagraphPartnerSolutionSearch = `
  ... on ParagraphPartnerSolutionSearch {
    __typename
    uuid
    fieldTitle
    fieldSpacings {
      entity {
        ${ParagraphSpacings}
      }
    }
    partnerSolutionsCards: fieldItems {
      entity {
        __typename
        uuid
        ${ParagraphPartnerSolutionSearchInternal}
        ${ParagraphPartnerSolutionSearchCard}
      }
    }
  }
`

export const ParagraphCustomerStoryTabStat = `
  ... on ParagraphCustomerStoryTabStat {
    __typename
    uuid
    fieldTitle
    fieldDescription {
      processed
    }
    fieldColumnWidthMobile
    fieldColumnWidthTablet
    fieldColumnWidthDesktop
  }
`

export const ParagraphCustomerStoryTabItem = `
  ... on ParagraphCustomerStoryTabItem {
    __typename
    uuid
    fieldTitle
    fieldBody {
      processed
    }
    fieldLink {
      url {
        path
      }
      title
    }
    fieldImage {
      entity {
        __typename
        ${MediaImage}
      }
    }
    fieldCtasStyle
    tabImage: fieldRelatedImage {
      entity {
        ${MediaImage}
      }
    }
    tabHeadline: fieldSectionTitle
    stats: fieldItems {
      entity {
        ${ParagraphCustomerStoryTabStat}
      }
    }
  }
`

export const ParagraphCustomerStoryTabs = `
  ... on ParagraphCustomerStoryTabs {
    __typename
    uuid
    isSwipableVariant: fieldBoolean
    fieldSpacings {
      entity {
        ${ParagraphSpacings}
      }
    }
    fieldItems {
      entity {
        ${ParagraphCustomerStoryTabItem}
      }
    }
  }
`

export const ParagraphDemoCenterInformation = `
  ... on ParagraphDemoCenterInformation {
    __typename
    uuid
    fieldHot
    fieldNew
    fieldImage {
      entity {
        ${MediaImage}
      }
    }
    fieldBoolean
    fieldFeatured
    fieldDescription {
      processed
    }
  }
`

export const ParagraphLabelRowColumn = `
  ... on ParagraphLabelRowColumn {
    __typename
    uuid
    fieldTitle
    fieldDescription {
      processed
    }
    fieldLinks {
      url {
        path
      }
      title
    }
  }
`

export const ParagraphLabelRow = `
  ... on ParagraphLabelRow {
    __typename
    uuid
    fieldTitle
    fieldColumns {
      entity {
        ${ParagraphLabelRowColumn}
      }
    }
    fieldItems {
      entity {
        ${ParagraphIcon}
      }
    }
    fieldSpacings {
      entity {
        ${ParagraphSpacings}
      }
    }
  }
`

export const NodeGlossaries = `
  ... on NodeGlossaries {
    nid
    uuid
    title
    status
    body {
      value
    }
	fieldComponents {
      entity {
        __typename
        ...ParagraphRichText
		    ...ParagraphCardList
      }
    }
    entityUrl {
      path
    }
    fieldAdditionalResources {
      options
      title
      uri
      url {
        path
      }
    }
    entityMetatags {
      ${Metatag}
    }
    fieldGlossaryRightColumnBlu {
      value
    }
    fieldHideFromGlossaryIndex
    fieldShowHideGlossaryCta
    fieldHideCta
    fieldTopBannerDisplay
    fieldTopBannerImage {
      entity {
        ${MediaImage}
      }
    }
    fieldTopBannerImageLink {
      title
      uri
      url {
        path
      }
    }
    fieldShowHideGlossaryBlurb
  }
`

// Nodes

export const NodeUser = `
  ... on NodeUser {
    entityId
    name: entityLabel
    entityUrl {
      path
    }
    fieldMedia {
      entity {
        ${MediaImage}
      }
    }
    fieldSlug
    fieldAvatar
    fieldAvatar
  }
`

export const NodePostTeaser = `
  ... on NodePost {
    title
    entityCreated(format: "F j, Y")
    entityUrl {
      path
    }
    fieldAuthors {
      entity {
        ${NodeUser}
      }
    }
    body {
      teaser: viewModeFieldFormatter(mode: TEASER)
    }
    fieldCategories {
      entity {
        ${TaxonomyTermCategories}
      }
    }
  }
`

export const NodeResourceTeaser = `
  ... on NodeResource {
    fieldCategory {
      entity {
        name
      }
    }
    fieldEnableSkipForm
    fieldSidebarComponents {
      entity {
        ... on ParagraphMarketoForm {
          fieldFormId
        }
      }
    }
    fieldMedia {
      entity {
        ${MediaImage}
      }
    }
    entityUrl {
      path
    }
    title
    body {
      summary: viewModeFieldFormatter(mode: TEASER)
    }
  }
`

export const NodeThankYouPage = `
  ... on NodeResource {
    fieldBlurb
    fieldImage {
      url
    }
    fieldResourceOverviewImage {
      entity {
       ${MediaImage}
      }
    }
    entityMetatags {
      ${Metatag}
    }
    fieldMedia {
      entity {
       ${MediaImage}
      }
    }
    fieldTopContent {
      entity {
        __typename
        uuid
        ${ParagraphRichText}
        ${ParagraphHero}
        ${ParagraphVideoPlaylist}
        ${ParagraphCtaImageBlock}
        ${ParagraphWrapper}
      }
    }
    fieldRelatedContent {
      entity {
        ... on ParagraphRelatedResource {
          id
          fieldTitle
          fieldRelatedPosts {
            entity {
              ${NodeResourceTeaser}
            }
          }
          fieldResources {
            entity {
              ... on ParagraphRelatedResources {
                id
                fieldBody {
                  value
                }
                fieldLink {
                  url {
                    path
                  }
                  title
                  options
                  uri
                }
                fieldRelatedImage {
                  entity {
                    ${MediaImage}
                  }
                }
                fieldTitle
              }
            }
          }
        }
      }
    }
    fieldBottomContent {
      entity {
        __typename
        uuid
        ${ParagraphCalloutRow}
      }
    }
  }
`

const NodePost = `
  ... on NodePost {
    title
    entityCreated(format: "F j, Y")
    entityUrl {
      path
    }
    entityMetatags {
      ${Metatag}
    }
    fieldTags {
      entity {
        ${TaxonomyTermTags}
      }
    }
    fieldMedia {
      entity {
        ${MediaImage}
      }
    }
    fieldAuthors {
      entity {
        ${NodeUser}
      }
    }
    body {
      processed
      value
    }
    bodyEmbedParagraphs {
      fieldUuid
      fieldParagraph {
        __typename
        ${ParagraphSecondaryMenu}
        ${ParagraphHero}
        ${ParagraphInPageNavigationContainer}
      }
    }
    fieldCategories {
      entity {
        ${TaxonomyTermCategories}
      }
    }
    fieldRelatedPosts {
      entity {
        __typename
        ${NodePostTeaser}
      }
    }
    fieldSidebarPromotion
	  fieldSidebarOverride
    fieldSidebarComponents {
      entity {
        ${ParagraphImage}
      }
    }
  }
`
// inlineSnippets

export const NodeLegal = `
  ... on NodeLegal {
    title
    fieldShowSidebarNavigation
    entityMetatags {
      ${Metatag}
    }
    fieldColumnWidth
    body {
      processed
    }
    fieldComponents {
      entity {
        __typename
        uuid
        ${ParagraphImage}
        ${ParagraphRichText}
      }
    }
    fieldTopContent {
      entity {
        __typename
        uuid
        ${ParagraphMarketoForm}
      }
    }
  }
`

export const NodeNews = `
  ...on NodeNews {
    uuid
    title
    fieldNewsCtaLink {
      title
      uri
    }
    fieldNewsCrnName
    fieldNewsDate {
      value
    }
    fieldNewsLogo {
      entity {
        ${MediaImage}
      }
    }
    fieldNewsFeaturedStory
  }
`
export const ResourceCard = `
  ... on NodeResource {
    title
    fieldCustomerLogo {
      entity {
        ${MediaImage}
      }
    }
  }
`

export const ParagraphChooseDemo = `
  ... on ParagraphChooseDemo {
    uuid
    fieldRichTitle{
      processed
    }
    fieldSubtitle
    fieldCtas {
      title
      url {
        path
      }
    }
    fieldSpacings {
      entity {
        ${ParagraphSpacings}
      }
    }
  }
`

export const NodeResource = `
  ... on NodeResource {
    title
    fieldKicker
    fieldEnableSkipForm
    fieldHeroBackgroundVariant
    fieldHeroColorOverride {
      color
      opacity
    }
    fieldColorPicker {
      color
      opacity
    }
    fieldTitleColor {
      color
      opacity
    }
    fieldSubtitleColor {
      color
      opacity
    }
    fieldHideDatabricksLogo
    fieldCustomHeaderLogos {
      description
      entity {
        ... on File {
          url
        }
      }
    }
    fieldLogos {
      entity {
        ${MediaImage}
      }
    }
    fieldThumbnail {
      entity {
        ${MediaImage}
      }
    }
    entityMetatags {
      ${Metatag}
    }
    fieldMedia {
      entity {
        ${MediaImage}
      }
    }
    fieldSubtitle
    fieldRelatedPosts {
      entity {
        ${ResourceCard}
      }
    }
    fieldCustomAlert {
      entity {
        __typename
        ${ParagraphAlert}
      }
    }
    fieldHideGlobalAlert
    fieldHideCustomAlert
    fieldCategory {
      entity {
        ${TaxonomyTermResourceCategories}
      }
    }
    body {
      processed
    }
    fieldComponents {
      entity {
        __typename
        ${ParagraphImage}
        ${ParagraphSpeakerList}
        ${ParagraphAccordionList}
        ${ParagraphBasicAccordion}
        ${ParagraphCardList}
        ${ParagraphCta}
        ${ParagraphCtaBlockList}
        ${ParagraphVideoPlaylist}
        ${ParagraphRichText}
        ${ParagraphSectionId}
      }
    }
    fieldSidebarComponents {
      entity {
        __typename
        ${ParagraphMarketoForm}
      }
    }
    fieldLegalDisclaimer {
      processed
    }
  }
`

export const NodePages = `
  ... on NodePages {
    title
    entityMetatags {
      ${Metatag}
    }
    fieldTopBannerDisplay
    entityUrl {
      ... on EntityCanonicalUrl {
        pathAlias
        pathInternal
        breadcrumb {
          text
          url {
            path
            routed
          }
        }
      }
    }
    fieldDisplayBackgroundImage
    fieldBackgroundStyle
    fieldHideGlobalAlert
    fieldHideCustomAlert
    fieldShowSidebarNavigation
    fieldGated
    fieldUrl {
      url {
        path
      }
    }
    fieldBlurb
    fieldCustomAlert {
      entity {
        ${ParagraphAlert}
      }
    }
    fieldSpacings {
      entity {
        ${ParagraphSpacings}
      }
    }
    fieldComponents {
      entity {
        __typename
        ${ParagraphResourceList}
        ${ParagraphInnerMenu}
        ${ParagraphHero}
        ${ParagraphHeroWithColumns}
        ${ParagraphCalloutRow}
        ${ParagraphImage}
        ${ParagraphSpeakerList}
        ${ParagraphAccordionList}
        ${ParagraphCardList}
        ${ParagraphCta}
        ${ParagraphCtaBlockList}
        ${ParagraphLogoGrid}
        ${ParagraphSlider}
        ${ParagraphCtaImageBlock}
        ${ParagraphTabList}
        ${ParagraphCtaSection}
        ${ParagraphMarketoForm}
        ${ParagraphQuote}
        ${ParagraphRichText}
        ${ParagraphCtaCards}
        ${ParagraphVideoPlaylist}
        ${ParagraphCardSlider}
        ${ParagraphTeamSlider}
        ${ParagraphWrapper}
        ${ParagraphHeavyRichtext}
        ${ParagraphFeaturedCustomers}
        ${ParagraphCustomerHubCards}
        ${ParagraphFeatureList}
        ${ParagraphPricingCards}
        ${ParagraphPricingSection}
        ${ParagraphBigCombo}
        ${ParagraphLeadCombo}
        ${ParagraphFromLibrary}
        ${ParagraphFeaturedTextBox}
        ${ParagraphAssetPromoCard}
        ${ParagraphCustomComponent}
        ${ParagraphPricingTable}
        ${ParagraphAccordionTable}
        ${ParagraphImageSlider}
        ${ParagraphBigHero}
        ${ParagraphCtaHexImageList}
        ${ParagraphFloatingBox}
        ${ParagraphVideoRow}
        ${ParagraphGeneralCtaRow}
        ${ParagraphSwissContent}
        ${ParagraphBasicQuoteSlider}
        ${ParagraphLargePageHeader}
        ${ParagraphFeaturedIndustryCardList}
        ${ParagraphInPageNavigationContainer}
        ${ParagraphInPageNavigationHorizontal}
        ${ParagraphIndustryCardList}
        ${ParagraphAcceleratorCards}
        ${ParagraphDemoCenterLibrary}
        ${ParagraphColumns}
        ${ParagraphSecondaryMenu}
        ${ParagraphPartnerSearch}
        ${ParagraphLabelAndLinks}
        ${ParagraphBoxedQuoteSlider}
        ${ParagraphTextSlider}
        ${ParagraphHorizontalTabs}
        ${ParagraphBulletedList}
        ${ParagraphGeneralTextRow}
        ${ParagraphGeneralTextRowRightCta}
        ${ParagraphInPageNavigationSticky}
        ${ParagraphModalMarketoForm}
        ${ParagraphTrialBlade}
        ${ParagraphIntegrationCarousel}
        ${ParagraphTrustCenterCertifications}
        ${ParagraphPartnerSolutionSearch}
        ${ParagraphMultiMedia}
        ${ParagraphCtaDownload}
        ${ParagraphAnimatedLogoSlider}
        ${ParagraphSlideOutForm}
        ${ParagraphThreeCardCluster}
        ${ParagraphLargeStepSlider}
        ${ParagraphPromoRow}
        ${ParagraphHeaderSection}
        ${ParagraphCustomerStoryTabs}
        ${ParagraphResourcesSection}
        ${ParagraphMediaPlayer}
        ${ParagraphHeroEvent}
        ${ParagraphTechnicalTable}
        ${ParagraphSectionId}
        ${ParagraphChooseDemo}
        ${ParagraphSpotlight}
        ${ParagraphHorizontalForm}
        ${ParagraphSmallPromoBlock}
        ${ParagraphLogoWheel}
        ${ParagraphRegionalCloudMap}
        ${ParagraphIframeEmbed}
        ${ParagraphQuoteCombo}
      }
    }
  }
`

export const NodeDemoPageTeaser = `
  ... on NodeDemoPage {
    uuid
    title
    entityUrl {
      path
    }
    fieldCategories {
      entity {
        entityLabel
      }
    }
    fieldThumbnail {
      entity {
        ${MediaImage}
      }
    }
    demoInfo: fieldCustomAlert {
      entity {
        ${ParagraphDemoCenterInformation}
      }
    }
  }
`

export const NodeDemoPage = `
  ... on NodeDemoPage {
    nid
    title
    fieldSubtitle
    entityMetatags {
      ${Metatag}
    }
    body {
      processed
    }
    fieldUrl {
      title
      uri
      attribute(key: "trigger_event")
    }
    entityUrl {
      ... on EntityCanonicalUrl {
        pathAlias
        pathInternal
        breadcrumb {
          text
          url {
            path
            routed
          }
        }
      }
    }
    fieldKicker
    demoInfo: fieldCustomAlert {
      entity {
        ${ParagraphDemoCenterInformation}
      }
    }
     fieldRelatedContent {
      entity {
        ... on ParagraphLinkedEntityDemoPage {
          fieldKey
          fieldSolutionsIndustryPage {
            entity {
              ${NodeDemoPageTeaser}
            }
          }
        }
      }
    }
    fieldRelatedPosts {
      entity {
        ${NodeDemoPageTeaser}
      }
    }
    fieldGatedAssetForm {
      entity {
        ${ParagraphSlideUpForm}
      }
    }
    fieldCategories {
      entity {
        entityLabel
      }
    }
    fieldBottomContent {
      entity {
        __typename
        ${ParagraphAccordionList}
        ${ParagraphAccordionTable}
        ${ParagraphAnimatedLogoSlider}
        ${ParagraphBasicAccordion}
        ${ParagraphBasicQuoteSlider}
        ${ParagraphCardSlider}
        ${ParagraphColumns}
        ${ParagraphCtaHexImageList}
        ${ParagraphCtaImageBlock}
        ${ParagraphFeaturedCustomers}
        ${ParagraphGeneralCtaRow}
        ${ParagraphGeneralTextRow}
        ${ParagraphHero}
        ${ParagraphHeroWithColumns}
        ${ParagraphHorizontalTabs}
        ${ParagraphImageSlider}
        ${ParagraphLeadCombo}
        ${ParagraphModalMarketoForm}
        ${ParagraphMultiMedia}
        ${ParagraphQuoteCombo}
        ${ParagraphResourceList}
        ${ParagraphRichText}
        ${ParagraphSlider}
        ${ParagraphSwissContent}
        ${ParagraphTeamSlider}
        ${ParagraphTextSlider}
        ${ParagraphVideoRow}
        ${ParagraphWrapper}
        ${ParagraphVideoTranscript}
        ${ParagraphTrialBlade}
        ${ParagraphLabelRow}
      }
    }
    fieldComponents {
      entity {
        __typename
       ${ParagraphAccordionList}
       ${ParagraphAnimatedLogoSlider}
       ${ParagraphBasicAccordion}
       ${ParagraphCardSlider}
       ${ParagraphColumns}
       ${ParagraphCtaBlockList}
       ${ParagraphCtaHexImageList}
       ${ParagraphCtaImageBlock}
       ${ParagraphGeneralCtaRow}
       ${ParagraphGeneralTextRow}
       ${ParagraphHero}
       ${ParagraphHeroWithColumns}
       ${ParagraphImageSlider}
       ${ParagraphInPageNavigationSticky}
       ${ParagraphModalMarketoForm}
       ${ParagraphMultiMedia}
       ${ParagraphResourceList}
       ${ParagraphRichText}
       ${ParagraphSecondaryMenu}
       ${ParagraphSlider}
       ${ParagraphSpeakerList}
       ${ParagraphSwissContent}
       ${ParagraphTeamSlider}
       ${ParagraphTextSlider}
       ${ParagraphVideoPlaylist}
       ${ParagraphVideoRow}
       ${ParagraphVideoTranscript}
       ${ParagraphWrapper}
       ${ParagraphLabelRow}
      }
    }
  }
`

export const NodeSolutionAccelerator = `
  ... on NodeSolutionAccelerator {
    title
    entityMetatags {
      ${Metatag}
    }
    fieldDisplayBackgroundImage
    fieldHideGlobalAlert
    fieldHideCustomAlert
    fieldCustomAlert {
      entity {
        ${ParagraphAlert}
      }
    }
    fieldSpacings {
      entity {
        ${ParagraphSpacings}
      }
    }
    fieldComponents {
      entity {
        __typename
        ${ParagraphResourceList}
        ${ParagraphInnerMenu}
        ${ParagraphHero}
        ${ParagraphHeroWithColumns}
        ${ParagraphCalloutRow}
        ${ParagraphImage}
        ${ParagraphSpeakerList}
        ${ParagraphAccordionList}
        ${ParagraphCardList}
        ${ParagraphCta}
        ${ParagraphCtaBlockList}
        ${ParagraphLogoGrid}
        ${ParagraphSlider}
        ${ParagraphCtaImageBlock}
        ${ParagraphTabList}
        ${ParagraphCtaSection}
        ${ParagraphMarketoForm}
        ${ParagraphQuote}
        ${ParagraphRichText}
        ${ParagraphCtaCards}
        ${ParagraphVideoPlaylist}
        ${ParagraphCardSlider}
        ${ParagraphTeamSlider}
        ${ParagraphWrapper}
        ${ParagraphHeavyRichtext}
        ${ParagraphFeaturedCustomers}
        ${ParagraphCustomerHubCards}
        ${ParagraphFeatureList}
        ${ParagraphPricingCards}
        ${ParagraphPricingSection}
        ${ParagraphBigCombo}
        ${ParagraphLeadCombo}
        ${ParagraphFromLibrary}
        ${ParagraphFeaturedTextBox}
        ${ParagraphAssetPromoCard}
        ${ParagraphCustomComponent}
        ${ParagraphPricingTable}
        ${ParagraphAccordionTable}
        ${ParagraphImageSlider}
        ${ParagraphBigHero}
        ${ParagraphCtaHexImageList}
        ${ParagraphFloatingBox}
        ${ParagraphVideoRow}
        ${ParagraphGeneralCtaRow}
        ${ParagraphSwissContent}
        ${ParagraphBasicQuoteSlider}
        ${ParagraphLargePageHeader}
        ${ParagraphFeaturedIndustryCardList}
        ${ParagraphIndustryCardList}
        ${ParagraphAcceleratorCards}
        ${ParagraphColumns}
        ${ParagraphSecondaryMenu}
        ${ParagraphPartnerSearch}
        ${ParagraphLabelAndLinks}
        ${ParagraphInPageNavigationContainer}
        ${ParagraphInPageNavigationHorizontal}
        ${ParagraphBoxedQuoteSlider}
        ${ParagraphTextSlider}
        ${ParagraphBulletedList}
        ${ParagraphModalMarketoForm}
        ${ParagraphTrustCenterCertifications}
        ${ParagraphGeneralTextRow}
        ${ParagraphPartnerSolutionSearch}
      }
    }
  }
`

export const NodeCustomer = `
  ... on NodeCustomer {
    title
    entityMetatags {
      ${Metatag}
    }
    fieldDisplayBackgroundImage
    fieldBottomContent {
      entity {
        __typename
        ${ParagraphResourceList}
        ${ParagraphInnerMenu}
        ${ParagraphHero}
        ${ParagraphHeroWithColumns}
        ${ParagraphCalloutRow}
        ${ParagraphImage}
        ${ParagraphSpeakerList}
        ${ParagraphAccordionList}
        ${ParagraphCardList}
        ${ParagraphCta}
        ${ParagraphCtaBlockList}
        ${ParagraphLogoGrid}
        ${ParagraphSlider}
        ${ParagraphCtaImageBlock}
        ${ParagraphTabList}
        ${ParagraphCtaSection}
        ${ParagraphMarketoForm}
        ${ParagraphCtaHexImageList}
        ${ParagraphQuote}
        ${ParagraphQuoteCombo}
        ${ParagraphRichText}
        ${ParagraphBigCombo}
        ${ParagraphLeadCombo}
        ${ParagraphCtaCards}
        ${ParagraphVideoPlaylist}
        ${ParagraphCardSlider}
        ${ParagraphVideoTranscript}
        ${ParagraphTeamSlider}
        ${ParagraphHeavyRichtext}
        ${ParagraphWrapper}
        ${ParagraphLabelAndLinks}
      }
    }
    fieldTopContent {
      entity {
        __typename
        ${ParagraphHeroWithColumns}
      }
    }
    fieldHideCustomerPrefooter
    fieldCustomPrefooterCta {
      entity {
        ${ParagraphCalloutRow}
      }
    }
    fieldCloud {
      entity {
        uuid
        entityLabel
      }
    }
    fieldRegions {
      entity {
        uuid
        entityLabel
      }
    }
    fieldPlatform {
      entity {
        uuid
        entityLabel
      }
    }
    fieldIndustries {
      entity {
        uuid
        entityLabel
      }
    }
    fieldUseCase {
      entity {
        uuid
        entityLabel
      }
    }
  }
`

export const NodeTwoColumns = `
  ... on NodeTwoColumns {
    title
    fieldSubtitle
    entityMetatags {
      ${Metatag}
    }
    fieldComponents {
      entity {
        __typename
        ${ParagraphRichText}
        ${ParagraphLogoGrid}
      }
    }
    fieldSidebarComponents {
      entity {
        __typename
        ${ParagraphCustomBlock}
      }
    }
  }
`

export const NodePressRelease = `
  ... on NodePressRelease {
    uuid
    title
    created
    body {
      value
    }
    entityMetatags {
      ${Metatag}
    }
    fieldNewsDate {
      value
    }
  }
`

export const NodePartnerSolutionForm = `
  ... on NodePartnerSolution {
    title
    entityMetatags {
      ${Metatag}
    }
    fieldHideGlobalAlert
    fieldHideCustomAlert
    fieldCustomAlert {
      entity {
        ${ParagraphAlert}
      }
    }
    fieldSidebarComponents {
      entity {
        __typename
        ${ParagraphImage}
        ${ParagraphRichText}
      }
    }
    fieldRelatedContent {
      entity {
        __typename
        ${ParagraphMarketoForm}
      }
    }
  }
`

export const NodePartnerSolutionTy = `
  ... on NodePartnerSolution {
    title
    entityMetatags {
      ${Metatag}
    }
    fieldHideGlobalAlert
    fieldHideCustomAlert
    fieldCustomAlert {
      entity {
        ${ParagraphAlert}
      }
    }
    fieldSpacings {
      entity {
        ${ParagraphSpacings}
      }
    }
    fieldTopContent {
      entity {
        __typename
        ${ParagraphCardList}
        ${ParagraphRichText}
        ${ParagraphCtaBlockList}
        ${ParagraphCtaImageBlock}
        ${ParagraphGeneralCtaRow}
        ${ParagraphImage}
        ${ParagraphLargePageHeader}
        ${ParagraphResourceList}
      }
    }
  }
`

// Site Settings

export const SiteSettingEntityHeaderLogos = `
 ... on SiteSettingEntityHeaderLogos {
  mainCtas: fieldCtas {
    title
    url {
      path
    }
  }
  menuFooter: fieldLinks {
    title
    url {
      path
    }
  }
  fieldBottomSection {
    entity {
      ... on ParagraphTopnavLinks {
        fieldLink {
          title
          url {
            path
          }
        }
        fieldTopnavLinkStyle
      }
    }
  }
  fieldMobileImage {
    entity {
      url
      filename
    }
  }
  fieldDesktopImage {
    entity {
      url
      filename
    }
  }
 }
`

export const SiteSettingBlogSidebar = `
  ... on SiteSettingEntityBlogSidebar {
    contentTranslationStatus
    entityTranslations {
      ... on SiteSettingEntityBlogSidebar {
        fieldComponents {
          entity {
            __typename
          }
        }
      }
      entityLanguage {
        name
        id
      }
    }
    fieldComponents {
      entity {
        __typename
        ${ParagraphMarketoForm}
        ${ParagraphImage}
      }
    }
  }
`
export const SiteSettingFooter2023 = `
  ... on SiteSettingEntityFooter2023  {
    __typename
    fieldRichtext {
      processed
    }
    fieldFirstColumn {
      entity {
        ${ParagraphIconList}
      }
    }
    fieldSecondColumn {
      entity {
        ${ParagraphImage}
        ${ParagraphRichText}
      }
    }
    fieldItem {
      entity {
       ${ParagraphImage}
      }
    }
    fieldBottomSection {
      entity {
        ${ParagraphImage}
        ${ParagraphRichText}
      }
    }
  }
`

export const SiteSettingFooter = `
  ... on SiteSettingEntityFooter {
    __e
    ... on SiteSettingEntityFooter {
      fieldFirstColumn {
        entity {
          ${ParagraphCustomBlock}
          ${ParagraphIconList}
          ${ParagraphImage}
          ${ParagraphRichText}
        }
      }
      fieldSecondColumn {
        entity {
          ${ParagraphCustomBlock}
          ${ParagraphIconList}
          ${ParagraphImage}
          ${ParagraphRichText}
        }
      }
      fieldBottomSection {
        entity {
          ${ParagraphCustomBlock}
          ${ParagraphIconList}
          ${ParagraphImage}
          ${ParagraphRichText}
        }
      }
    }
  }
`

export const globalContextGlossary = (lang) => `
globalContext: nodeQuery(
  filter: {
    conditions: [
      { operator: EQUAL, field: "type", value: ["glossaries"] }
      { operator: EQUAL, field: "status", value: ["1"] }
    ]
  }
  sort: { field: "created", direction: DESC }
  limit: 100000
) {
  glossary: entities(language: ${lang}) {
    ... on NodeGlossaries {
      nid
      uuid
      title
      fieldHideFromGlossaryIndex
      status
      body {
        value
      }
      entityUrl {
        path
      }
    }
  }
}`
export { NodePost }
