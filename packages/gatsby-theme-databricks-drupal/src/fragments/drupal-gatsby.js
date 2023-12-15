import { graphql } from "gatsby"

// Generic Fragments
export const InlineImage = graphql`
  fragment InlineImage on File {
    name
    childImageSharp {
      gatsbyImageData(placeholder: BLURRED, layout: CONSTRAINED, width: 1000)
    }
  }
`

export const MediaImage = graphql`
  fragment MediaImage on Drupal_MediaImage {
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
        optimizedImageData {
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
  }
`

export const AvatarMediaImage = graphql`
  fragment AvatarMediaImage on Drupal_MediaImage {
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
    fieldMediaImage {
      url
      alt
      width
      height
      ResponsiveImageStructured(style: logo)
    }
  }
`

export const BannerMediaImage = graphql`
  fragment BannerMediaImage on Drupal_MediaImage {
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
    fieldMediaImage {
      url
      alt
      width
      height
      ResponsiveImageStructured(style: small_banner)
    }
  }
`
export const MediaImageLogo = graphql`
  fragment MediaImageLogo on Drupal_MediaImage {
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
    fieldMediaImage {
      url
      alt
      width
      height
      ResponsiveImageStructured(style: logo)
    }
  }
`

export const MediaVideo = graphql`
  fragment MediaVideo on Drupal_MediaVideo {
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
    fieldMediaImage {
      url
      alt
      width
      height
      ResponsiveImageStructured(style: wide)
    }
    fieldMediaVideoFile {
      entity {
        url
      }
    }
  }
`

export const MediaRemoteVideo = graphql`
  fragment MediaRemoteVideo on Drupal_MediaRemoteVideo {
    thumbnail {
      url
    }
    fieldMediaOembedVideo
    videoEmbedSrc
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
    fieldMediaImage {
      url
      alt
      width
      height
      ResponsiveImageStructured(style: wide)
    }
  }
`

export const MediaLottieFile = graphql`
  fragment MediaLottieFile on Drupal_MediaLottieFile {
    name
    fieldLoopAnimation
    fieldMediaLottieFile {
      entity {
        url
      }
    }
    lottieFile {
      publicURL
    }
    placeholderRatio
  }
`
export const NodeGlossary = graphql`
  fragment NodeGlossaries on Drupal_NodeGlossaries {
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
    fieldComponents {
      entity {
        __typename
        ...ParagraphRichText
        ...ParagraphCardList
      }
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
      ...Metatag
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
        ...MediaImage
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
export const BannerImage = graphql`
  fragment BannerImage on Drupal_MediaImage {
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
    fieldMediaImage {
      url
      alt
      width
      height
      ResponsiveImageStructured(style: banner)
    }
  }
`

export const LocalImage = graphql`
  fragment LocalImage on File {
    src: publicURL
    alt: name
    childImageSharp {
      gatsbyImageData(placeholder: BLURRED, layout: FULL_WIDTH)
    }
  }
`

export const TaxonomyTermTags = graphql`
  fragment TaxonomyTermTags on Drupal_TaxonomyTermTags {
    tid
    name
  }
`

export const TaxonomyTermResourceCategories = graphql`
  fragment TaxonomyTermResourceCategories on Drupal_TaxonomyTermResourceCategory {
    tid
    name
  }
`

export const TaxonomyTermCategories = graphql`
  fragment TaxonomyTermCategories on Drupal_TaxonomyTermCategories {
    tid
    name
    entityUrl {
      path
    }
    fieldSlug
    fieldImage {
      entity {
        ...BannerImage
      }
    }
    parent {
      entity {
        ... on Drupal_TaxonomyTermCategories {
          fieldSlug
          fieldImage {
            entity {
              ...BannerImage
            }
          }
        }
      }
    }
  }
`

export const TaxonomyTermAcceleratorPartners = graphql`
  fragment TaxonomyTermAcceleratorPartners on Drupal_TaxonomyTermAcceleratorPartners {
    tid
    name
  }
`

export const TaxonomyTermIndustry = graphql`
  fragment TaxonomyTermIndustry on Drupal_TaxonomyTermIndustry {
    tid
    name
  }
`

export const MenuLink = graphql`
  fragment MenuLink on Drupal_MenuLink {
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

export const MainNavMegaMenu = graphql`
  fragment MainNavMegaMenu on Drupal_Menu {
    title: name
    links {
      ...MenuLink
      fieldParagraphs {
        __typename
        ...ParagraphPromotion
      }
      links {
        ...MenuLink
        fieldWidth
        fieldNumber
        links {
          fieldItemDescription
          ...MenuLink
          links {
            ...MenuLink
            fieldItemDescription
          }
        }
      }
    }
  }
`

export const Metatag = graphql`
  fragment Metatag on Drupal_Metatag {
    type: __typename
    key
    value
  }
`

// Paragraphs

export const ParagraphSpacings = graphql`
  fragment ParagraphSpacings on Drupal_ParagraphSpacings {
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

export const ParagraphImage = graphql`
  fragment ParagraphImage on Drupal_ParagraphImage {
    __typename
    uuid
    fieldImage {
      entity {
        __typename
        ...MediaImage
        ...MediaLottieFile
      }
    }
    fieldWidthColumns
    fieldDisplayShadow
    fieldImageModal
    fieldInitialColumn
    fieldLink {
      url {
        path
      }
      title
    }
    fieldSpacings {
      entity {
        ...ParagraphSpacings
      }
    }
  }
`

export const ParagraphImageBanner = graphql`
  fragment ParagraphImageBanner on Drupal_ParagraphImage {
    __typename
    uuid
    fieldImage {
      entity {
        __typename
        ...BannerMediaImage
        ...MediaLottieFile
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
        ...ParagraphSpacings
      }
    }
  }
`

export const ParagraphPricingVisibilityRule = graphql`
  fragment ParagraphPricingVisibilityRule on Drupal_ParagraphPricingVisibilityRule {
    __typename
    uuid
    fieldPricingVisibility
    fieldPricingPlans
    fieldPricingClouds
    fieldPricingRegions
  }
`

export const ParagraphRichText = graphql`
  fragment ParagraphRichText on Drupal_ParagraphRichtext {
    __typename
    uuid
    fieldTitle
    fieldBody {
      processed
    }
    fieldSpacings {
      entity {
        ...ParagraphSpacings
      }
    }
  }
`

export const ParagraphPricingCardItem = graphql`
  fragment ParagraphPricingCardItem on Drupal_ParagraphPricingCardItem {
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
        ...ParagraphPricingVisibilityRule
      }
    }
  }
`

export const ParagraphCustomBlock = graphql`
  fragment ParagraphCustomBlock on Drupal_ParagraphCustomBlock {
    __typename
    uuid
    fieldBlockType
  }
`

export const ParagraphIcon = graphql`
  fragment ParagraphIcon on Drupal_ParagraphIcon {
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

export const ParagraphIconList = graphql`
  fragment ParagraphIconList on Drupal_ParagraphIconList {
    __typename
    uuid
    fieldItems {
      entity {
        ...ParagraphIcon
      }
    }
  }
`
export const ParagraphBulletedList = graphql`
  fragment ParagraphBulletedList on Drupal_ParagraphBulletedList {
    __typename
    uuid
    fieldTitle
    fieldTextUnlimited
    fieldSpacings {
      entity {
        ...ParagraphSpacings
      }
    }
  }
`

export const ParagraphCtaImageBlock = graphql`
  fragment ParagraphCtaImageBlock on Drupal_ParagraphCtaImageBlock {
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
        ...MediaImage
        ...MediaVideo
        ...MediaLottieFile
        ...MediaRemoteVideo
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
        ...ParagraphSpacings
      }
    }
    fieldItems {
      entity {
        ...ParagraphGeneralCtaRowItem
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

export const ParagraphPromotion = graphql`
  fragment ParagraphPromotion on Drupal_ParagraphPromotion {
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
        ...MediaImage
      }
    }
    inlineImages {
      ...InlineImage
    }
  }
`

export const ParagraphMarketoForm = graphql`
  fragment ParagraphMarketoForm on Drupal_ParagraphMarketoForm {
    __typename
    fieldTitle
    fieldFormId
    fieldCampaignId
    fieldFormVariant
    fieldFormCta
    fieldBoolean
    fieldBody {
      processed
    }
    fieldDescription {
      processed
    }
    fieldEnabled
    fieldKey
    fieldDisableFormPrefill
    fieldThankYouUrl {
      url {
        path
      }
    }
    fieldSpacings {
      entity {
        ...ParagraphSpacings
      }
    }
  }
`

export const ParagraphMultiMedia = graphql`
  fragment ParagraphMultiMedia on Drupal_ParagraphMultiMedia {
    id
    fieldImage {
      entity {
        __typename
        ...MediaImage
        ...MediaVideo
        ...MediaLottieFile
        ...MediaRemoteVideo
      }
    }
    fieldBoolean
    fullWidth: fieldEnabled
    fieldSpacings {
      entity {
        ...ParagraphSpacings
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

export const ParagraphMediaPlayer = graphql`
  fragment ParagraphMediaPlayer on Drupal_ParagraphMediaPlayer {
    __typename
    uuid
    fieldTitle
    fieldImage {
      entity {
        __typename
        ...MediaVideo
        ...MediaRemoteVideo
      }
    }
    fieldHeaderImage {
      entity {
        ...MediaImage
      }
    }
    fieldBoolean
    fieldNew
    fullWidth: fieldEnabled
    fieldSpacings {
      entity {
        ...ParagraphSpacings
      }
    }
  }
`

export const ParagraphSpeakerList = graphql`
  fragment ParagraphSpeakerList on Drupal_ParagraphSpeakerList {
    __typename
    uuid
    fieldSpeakerVariant
    fieldBoolean
    fieldTitle
    fieldItems {
      entity {
        ...ParagraphSpeaker
      }
    }
    fieldSpacings {
      entity {
        ...ParagraphSpacings
      }
    }
  }
`

export const ParagraphCustomerHubCards = graphql`
  fragment ParagraphCustomerHubCards on Drupal_ParagraphCustomerHubCards {
    __typename
    uuid
    fieldTitle
    fieldDescription {
      processed
    }
    fieldSpacings {
      entity {
        ...ParagraphSpacings
      }
    }
  }
`

export const ParagraphSpeakerListAccordion = graphql`
  fragment ParagraphSpeakerListAccordion on Drupal_ParagraphSpeakerListAccordion {
    __typename
    uuid
    fieldTitle
    fieldItems {
      entity {
        ...ParagraphSpeaker
      }
    }
  }
`

export const ParagraphSpeaker = graphql`
  fragment ParagraphSpeaker on Drupal_ParagraphSpeaker {
    __typename
    uuid
    fieldRole
    fieldImage {
      entity {
        ...MediaImage
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

export const ParagraphCta = graphql`
  fragment ParagraphCta on Drupal_ParagraphCta {
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
    fieldSpacings {
      entity {
        ...ParagraphSpacings
      }
    }
  }
`

export const ParagraphAccordionList = graphql`
  fragment ParagraphAccordionList on Drupal_ParagraphAccordionList {
    __typename
    uuid
    fieldTitle
    fieldAccordionListVariant
    fieldItems {
      entity {
        ...ParagraphAccordion
      }
    }
    fieldSpacings {
      entity {
        ...ParagraphSpacings
      }
    }
  }
`

export const ParagraphBasicAccordion = graphql`
  fragment ParagraphBasicAccordion on Drupal_ParagraphBasicAccordion {
    __typename
    uuid
    fieldTitle
    fieldItemsDisplay
    fieldSectionTitle
    fieldAccordionListVariant
    fieldItems {
      entity {
        ...ParagraphAccordion
      }
    }
    fieldSpacings {
      entity {
        ...ParagraphSpacings
      }
    }
  }
`

export const ParagraphAccordion = graphql`
  fragment ParagraphAccordion on Drupal_ParagraphAccordion {
    __typename
    uuid
    fieldItems {
      entity {
        ...ParagraphCtaDownload
        ...ParagraphRichText
        ...ParagraphSpeakerListAccordion
      }
    }
    fieldDescription {
      processed
    }
  }
`

export const ParagraphCard = graphql`
  fragment ParagraphCard on Drupal_ParagraphCard {
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
        ...MediaImage
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

export const ParagraphLogoWheel = graphql`
  fragment ParagraphLogoWheel on Drupal_ParagraphLogoWheel {
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
        ...MediaImage
      }
    }
    fieldSpacings {
      entity {
        ...ParagraphSpacings
      }
    }
  }
`

export const ParagraphCardList = graphql`
  fragment ParagraphCardList on Drupal_ParagraphCardList {
    __typename
    uuid
    fieldTitle
    fieldItem {
      entity {
        ...ParagraphPersonalization
      }
    }
    fieldDescription {
      processed
    }
    fieldEnabled
    fieldCardVariant
    fieldColumnCount
    fieldItems {
      entity {
        ...ParagraphCard
      }
    }
    fieldSpacings {
      entity {
        ...ParagraphSpacings
      }
    }
  }
`

export const ParagraphResource = graphql`
  fragment ParagraphResource on Drupal_ParagraphResource {
    __typename
    uuid
    fieldTitle
    fieldImage {
      entity {
        ...MediaImage
      }
    }
    fieldRichTitle {
      processed
    }
    fieldDescription {
      processed
    }
    fieldBoolean
    fieldLinks {
      url {
        path
      }
      title
    }
  }
`

export const ParagraphResourceList = graphql`
  fragment ParagraphResourceList on Drupal_ParagraphResourceList {
    __typename
    uuid
    fieldTitle
    fieldColumnCount
    fieldResources {
      entity {
        ...ParagraphResource
      }
    }
    fieldSpacings {
      entity {
        ...ParagraphSpacings
      }
    }
  }
`

export const ParagraphCtaBlock = graphql`
  fragment ParagraphCtaBlock on Drupal_ParagraphCtablock {
    __typename
    uuid
    fieldTitle
    fieldSubtitle
    fieldImage {
      entity {
        ...MediaImage
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

export const ParagraphCtaBlockList = graphql`
  fragment ParagraphCtaBlockList on Drupal_ParagraphCtablockList {
    __typename
    uuid
    fieldTitle
    fieldColumnCount
    fieldCtaBlockVariant
    fieldEnabled
    fieldThankYouUrl {
      url {
        path
      }
      title
    }
    fieldItems {
      entity {
        ...ParagraphCtaBlock
      }
    }
    fieldSpacings {
      entity {
        ...ParagraphSpacings
      }
    }
  }
`

export const ParagraphTabbedContentItem = graphql`
  fragment ParagraphTabbedContentItem on Drupal_ParagraphTabbedContentItem {
    __typename
    uuid
    fieldTitle
    fieldItems {
      entity {
        __typename
        ...ParagraphResourceList
        ...ParagraphInnerMenu
        ...ParagraphHero
        ...ParagraphHeroWithColumns
        ...ParagraphCalloutRow
        ...ParagraphImage
        ...ParagraphSpeakerList
        ...ParagraphAccordionList
        ...ParagraphCardList
        ...ParagraphCta
        ...ParagraphCtaBlockList
        ...ParagraphLogoGrid
        ...ParagraphSlider
        ...ParagraphCtaImageBlock
        ...ParagraphTabList
        ...ParagraphCtaSection
        ...ParagraphMarketoForm
        ...ParagraphCtaHexImageList
        ...ParagraphQuote
        ...ParagraphQuoteCombo
        ...ParagraphRichText
        ...ParagraphBigCombo
        ...ParagraphLeadCombo
        ...ParagraphCtaCards
        ...ParagraphAccordionTable
        ...ParagraphBasicAccordion
        ...ParagraphPricingTable
        ...ParagraphVideoPlaylist
        ...ParagraphResourceAgenda
        ...ParagraphCardSlider
        ...ParagraphTeamSlider
        ...ParagraphFeaturedCustomers
        ...ParagraphCustomerHubCards
        ...ParagraphFeatureList
        ...ParagraphPricingCards
        ...ParagraphPricingSection
        ...ParagraphFromLibrary
        ...ParagraphCustomForm
        ...ParagraphFeaturedTextBox
        ...ParagraphAssetPromoCard
        ...ParagraphCustomComponent
        ...ParagraphHeavyRichtext
        ...ParagraphVideoTranscript
        ...ParagraphBigHero
        ...ParagraphGeneralTextRow
        ...ParagraphFloatingBox
        ...ParagraphVideoRow
        ...ParagraphImageSlider
        ...ParagraphGeneralCtaRow
        ...ParagraphSwissContent
        ...ParagraphBasicQuoteSlider
        ...ParagraphLargePageHeader
        ...ParagraphFeaturedIndustryCardList
        ...ParagraphIndustryCardList
        ...ParagraphAcceleratorCards
        ...ParagraphColumns
        ...ParagraphSecondaryMenu
        ...ParagraphPartnerSearch
        ...ParagraphPartnerSolutionSearch
        ...ParagraphInPageNavigationHorizontal
        ...ParagraphLabelAndLinks
        ...ParagraphBoxedQuoteSlider
        ...ParagraphTextSlider
        ...ParagraphHorizontalTabs
        ...ParagraphBulletedList
        ...ParagraphInPageNavigationSticky
        ...ParagraphModalMarketoForm
        ...ParagraphTrustCenterCertifications
        ...ParagraphCtaDownload
        ...ParagraphAnimatedLogoSlider
        ...ParagraphThreeCardCluster
        ...ParagraphGeneralTextRowRightCta
      }
    }
  }
`

export const ParagraphTabbedContent = graphql`
  fragment ParagraphTabbedContent on Drupal_ParagraphTabbedContent {
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
        ...ParagraphTabbedContentItem
      }
    }
    fieldSpacings {
      entity {
        ...ParagraphSpacings
      }
    }
  }
`

export const ParagraphCalloutRow = graphql`
  fragment ParagraphCalloutRow on Drupal_ParagraphCalloutRow {
    __typename
    uuid
    fieldTitle
    fieldDescription {
      processed
    }
    fieldImage {
      entity {
        ...MediaImage
      }
    }
    fieldImagePosition
    fieldOrientation
    fieldColorVariant
    fieldCtas {
      url {
        path
      }
      title
    }
    fieldSpacings {
      entity {
        ...ParagraphSpacings
      }
    }
  }
`

export const ParagraphInnerMenu = graphql`
  fragment ParagraphInnerMenu on Drupal_ParagraphInnerMenu {
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
        ...ParagraphSpacings
      }
    }
  }
`

export const ParagraphTableColumnPricing = graphql`
  fragment ParagraphTableColumnPricing on Drupal_ParagraphTableColumnPricing {
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

export const ParagraphTableRowPricing = graphql`
  fragment ParagraphTableRowPricing on Drupal_ParagraphTableRowPricing {
    __typename
    uuid
    fieldItems {
      entity {
        __typename
        ...ParagraphTableColumnPricing
      }
    }
  }
`

export const ParagraphPricingTable = graphql`
  fragment ParagraphPricingTable on Drupal_ParagraphPricingTable {
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
        ...ParagraphRichText
      }
    }
    fieldItems {
      entity {
        __typename
        ...ParagraphTableRowAccordion
        ...ParagraphTableRowPricing
      }
    }
    fieldSpacings {
      entity {
        ...ParagraphSpacings
      }
    }
  }
`

export const ParagraphTableColumn = graphql`
  fragment ParagraphTableColumn on Drupal_ParagraphTableColumn {
    __typename
    uuid
    fieldDescription {
      processed
    }
  }
`

export const ParagraphTableRowAccordion = graphql`
  fragment ParagraphTableRowAccordion on Drupal_ParagraphTableRowAccordion {
    __typename
    uuid
    fieldBoolean
    fieldItems {
      entity {
        __typename
        ...ParagraphTableColumn
      }
    }
  }
`

export const ParagraphAccordionTable = graphql`
  fragment ParagraphAccordionTable on Drupal_ParagraphAccordionTable {
    __typename
    uuid
    fieldTitle
    fieldColumnCount
    fieldItemsDisplay
    fieldItems {
      entity {
        __typename
        ...ParagraphTableRowAccordion
      }
    }
    fieldSpacings {
      entity {
        ...ParagraphSpacings
      }
    }
  }
`
export const ParagraphTechnicalTableHeaderColumn = graphql`
  fragment ParagraphTechnicalTableHeaderColumn on Drupal_ParagraphTechnicalTableHeaderColumn {
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

export const ParagraphTechnicalTableHeaderRow = graphql`
  fragment ParagraphTechnicalTableHeaderRow on Drupal_ParagraphTechnicalTableHeaderRow {
    fieldHorizontalAlignment
    fieldVerticalAlignment
    fieldItems {
      entity {
        ...ParagraphTechnicalTableHeaderColumn
      }
    }
  }
`

export const ParagraphTechnicalTableColumn = graphql`
  fragment ParagraphTechnicalTableColumn on Drupal_ParagraphTechnicalTableColumn {
    fieldDescription {
      processed
    }
    fieldIconType
    fieldOrientation
    fieldCount
    fieldColumnCount
    fieldBackgroundToken
    fieldVerticalAlignment
    fieldHorizontalAlignment
  }
`

export const FieldParagraphTechnicalTableSubRowFieldItems = graphql`
  fragment FieldParagraphTechnicalTableSubRowFieldItems on Drupal_FieldParagraphTechnicalTableSubRowFieldItems {
    entity {
      ...ParagraphTechnicalTableColumn
    }
  }
`

export const ParagraphTechnicalTableSubRow = graphql`
  fragment ParagraphTechnicalTableSubRow on Drupal_ParagraphTechnicalTableSubRow {
    fieldItems {
      ...FieldParagraphTechnicalTableSubRowFieldItems
    }
  }
`

export const ParagraphTechnicalTableRow = graphql`
  fragment ParagraphTechnicalTableRow on Drupal_ParagraphTechnicalTableRow {
    fieldBackgroundToken
    fieldVerticalAlignment
    fieldHorizontalAlignment
    fieldItems {
      entity {
        ...ParagraphTechnicalTableColumn
      }
    }
    fieldResources {
      entity {
        ...ParagraphTechnicalTableSubRow
      }
    }
  }
`

export const ParagraphTechnicalTable = graphql`
  fragment ParagraphTechnicalTable on Drupal_ParagraphTechnicalTable {
    __typename
    uuid
    fieldTechnicalTableVariant
    fieldTitle
    fieldAgendaItems {
      entity {
        ...ParagraphTechnicalTableHeaderRow
      }
    }
    fieldItems {
      entity {
        ...ParagraphTechnicalTableRow
      }
    }
  }
`

export const ParagraphHero = graphql`
  fragment ParagraphHero on Drupal_ParagraphHero {
    __typename
    uuid
    fieldIntro
    fieldTitle
    fieldVideoSource
    fieldDescription {
      processed
    }
    fieldImage {
      entity {
        __typename
        ...MediaImage
        ...MediaLottieFile
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
        ...ParagraphSpacings
      }
    }
  }
`

export const ParagraphHeroWithColumns = graphql`
  fragment ParagraphHeroWithColumns on Drupal_ParagraphHeroWithColumns {
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
        __typename
        ...MediaImage
        ...MediaVideo
        ...MediaRemoteVideo
      }
    }
    fieldHeaderImage {
      entity {
        ...MediaImage
      }
    }
    fieldItems {
      entity {
        ...ParagraphRichText
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
        ...ParagraphSpacings
      }
    }
  }
`

export const ParagraphBigCombo = graphql`
  fragment ParagraphBigCombo on Drupal_ParagraphBigCombo {
    __typename
    uuid
    fieldTitle
    fieldDescription {
      processed
    }
    fieldItems {
      entity {
        ...ParagraphRichText
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
        ...ParagraphSpacings
      }
    }
  }
`

export const ParagraphLabelAndLinks = graphql`
  fragment ParagraphLabelAndLinks on Drupal_ParagraphLabelAndLinks {
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

export const ParagraphLeadCombo = graphql`
  fragment ParagraphLeadCombo on Drupal_ParagraphLeadCombo {
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
        ...ParagraphSpacings
      }
    }
  }
`

export const ParagraphLogoGrid = graphql`
  fragment ParagraphLogoGrid on Drupal_ParagraphLogoGrid {
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
        ...MediaImage
      }
    }
    fieldSpacings {
      entity {
        ...ParagraphSpacings
      }
    }
    gridSpacings: fieldItem {
      entity {
        ...ParagraphGridSpacings
      }
    }
  }
`

export const ParagraphTab = graphql`
  fragment ParagraphTab on Drupal_ParagraphTab {
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
        ...MediaImage
        ...MediaVideo
        ...MediaRemoteVideo
      }
    }
    fieldItems {
      entity {
        ...ParagraphRichText
        ...ParagraphImage
        ...ParagraphCardList
        ...ParagraphPromoRow
      }
    }
  }
`

export const ParagraphTabList = graphql`
  fragment ParagraphTabList on Drupal_ParagraphTabList {
    __typename
    uuid
    fieldTitle
    fieldControlsPosition
    fieldItems {
      entity {
        ...ParagraphTab
        ...ParagraphPromoRow
      }
    }
    fieldSpacings {
      entity {
        ...ParagraphSpacings
      }
    }
  }
`

export const ParagraphCtaSection = graphql`
  fragment ParagraphCtaSection on Drupal_ParagraphCtaSection {
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
        ...ParagraphSpacings
      }
    }
  }
`
export const ParagraphCtaCards = graphql`
  fragment ParagraphCtaCards on Drupal_ParagraphCtaCards {
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
        ...ParagraphCard
      }
    }
    fieldSpacings {
      entity {
        ...ParagraphSpacings
      }
    }
  }
`

export const ParagraphIntegrationCarouselCard = graphql`
  fragment ParagraphIntegrationCarouselCard on Drupal_ParagraphIntegrationCarouselCard {
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
        ...MediaImage
      }
    }
  }
`

export const ParagraphIntegrationCarousel = graphql`
  fragment ParagraphIntegrationCarousel on Drupal_ParagraphIntegrationCarousel {
    __typename
    uuid
    fieldEnabled
    fieldItems {
      entity {
        ...ParagraphIntegrationCarouselCard
      }
    }
  }
`

export const ParagraphQuote = graphql`
  fragment ParagraphQuote on Drupal_ParagraphQuote {
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
        ...MediaImage
      }
    }
    fieldSpacings {
      entity {
        ...ParagraphSpacings
      }
    }
  }
`

export const ParagraphQuoteCombo = graphql`
  fragment ParagraphQuoteCombo on Drupal_ParagraphQuoteCombo {
    __typename
    uuid
    fieldAuthor: fieldTitle
    fieldImage {
      entity {
        ...MediaImage
      }
    }
    fieldGraphic: fieldRelatedImage {
      entity {
        ...MediaImage
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
        ...ParagraphSpacings
      }
    }
  }
`

export const ParagraphCtaHexImageList = graphql`
  fragment ParagraphCtaHexImageList on Drupal_ParagraphCtaHeximagelist {
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
        ...ParagraphCtaHexImage
      }
    }
    fieldSpacings {
      entity {
        ...ParagraphSpacings
      }
    }
  }
`

export const ParagraphCtaHexImage = graphql`
  fragment ParagraphCtaHexImage on Drupal_ParagraphCtaHeximage {
    __typename
    uuid
    fieldTitle
    fieldDescription {
      processed
    }
    fieldImage {
      entity {
        ...MediaImage
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

export const ParagraphSlide = graphql`
  fragment ParagraphSlide on Drupal_ParagraphSlide {
    __typename
    uuid
    fieldTitle
    fieldImage {
      entity {
        __typename
        ...MediaImage
        ...MediaVideo
        ...MediaRemoteVideo
      }
    }
    headerTitle: fieldIntro
    fieldHeaderImage {
      entity {
        ...MediaImage
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

export const ParagraphSlider = graphql`
  fragment ParagraphSlider on Drupal_ParagraphSlider {
    __typename
    uuid
    fieldTitle
    fieldImageSize
    fieldControlsPosition
    fieldItems {
      entity {
        ...ParagraphSlide
      }
    }
    fieldSpacings {
      entity {
        ...ParagraphSpacings
      }
    }
  }
`
export const ParagraphHorizontalTabItem = graphql`
  fragment ParagraphHorizontalTabItem on Drupal_ParagraphHorizontalTabItem {
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
        ...MediaImage
      }
    }
  }
`

export const ParagraphHorizontalTabs = graphql`
  fragment ParagraphHorizontalTabs on Drupal_ParagraphHorizontalTabs {
    __typename
    uuid
    fieldHeadlinesTag
    fieldItems {
      entity {
        ...ParagraphHorizontalTabItem
      }
    }
    fieldSpacings {
      entity {
        ...ParagraphSpacings
      }
    }
  }
`
export const ParagraphPersonalization = graphql`
  fragment ParagraphPersonalization on Drupal_ParagraphPersonalization {
    id
    fieldKey
    fieldBoolean
  }
`

export const ParagraphAlert = graphql`
  fragment ParagraphAlert on Drupal_ParagraphAlert {
    __typename
    uuid
    fieldTitle
    fieldItem {
      entity {
        ...ParagraphPersonalization
      }
    }
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
        ...MediaImage
      }
    }
    isHidden: fieldBoolean
  }
`

export const ParagraphCustomForm = graphql`
  fragment ParagraphCustomForm on Drupal_ParagraphCustomForm {
    __typename
    uuid
    fieldTitle
    fieldCloudType
    fieldFreeTrialDisplayType
    fieldBackgroundToken
    fieldLink {
      url {
        path
      }
      title
    }
    fieldThankYouUrl {
      url {
        path
      }
    }
    fieldSpacings {
      entity {
        ...ParagraphSpacings
      }
    }
  }
`

export const ParagraphImageSliderItem = graphql`
  fragment ParagraphImageSliderItem on Drupal_ParagraphImageSliderItem {
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
        ...MediaImage
      }
    }
  }
`

export const ParagraphImageSlider = graphql`
  fragment ParagraphImageSlider on Drupal_ParagraphImageSlider {
    __typename
    uuid
    fieldCount
    fieldColumnCount
    fieldItems {
      entity {
        ...ParagraphImageSliderItem
      }
    }
  }
`

export const ParagraphVideoItem = graphql`
  fragment ParagraphVideoItem on Drupal_ParagraphVideoItem {
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
        ...MediaImage
      }
    }
  }
`

export const ParagraphVideoPlaylist = graphql`
  fragment ParagraphVideoPlaylist on Drupal_ParagraphVideoPlaylist {
    __typename
    uuid
    fieldTitle
    fieldImagePosition
    fieldItems {
      entity {
        ...ParagraphVideoItem
      }
    }
    fieldSpacings {
      entity {
        ...ParagraphSpacings
      }
    }
  }
`

export const ParagraphCustomComponent = graphql`
  fragment ParagraphCustomComponent on Drupal_ParagraphCustomComponent {
    __typename
    uuid
    fieldTitle
    fieldBody {
      processed
    }
    fieldComponentName
    fieldSpacings {
      entity {
        ...ParagraphSpacings
      }
    }
  }
`

export const ParagraphIframeEmbed = graphql`
  fragment ParagraphIframeEmbed on Drupal_ParagraphIframeEmbed {
    __typename
    uuid
    fieldIframeComponent
    fieldIframeUrl
  }
`

export const ParagraphAgendaItem = graphql`
  fragment ParagraphAgendaItem on Drupal_ParagraphAgendaItem {
    __typename
    uuid
    fieldCompany
    fieldDescription {
      processed
    }
    fieldStartDate {
      date: viewModeFieldFormatter(mode: PREVIEW)
    }
    fieldEndDate {
      date: viewModeFieldFormatter(mode: PREVIEW)
    }
  }
`

export const ParagraphResourceAgenda = graphql`
  fragment ParagraphResourceAgenda on Drupal_ParagraphResourceAgenda {
    __typename
    uuid
    fieldTitle
    fieldAgendaItems {
      entity {
        ...ParagraphAgendaItem
      }
    }
  }
`
export const ParagraphCardItem = graphql`
  fragment ParagraphCardItem on Drupal_ParagraphCardItem {
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
        ...MediaImage
      }
    }
  }
`

export const ParagraphCardSlider = graphql`
  fragment ParagraphCardSlider on Drupal_ParagraphCardSlider {
    __typename
    uuid
    fieldTitle
    fieldCardSliderVariant
    fieldItems {
      entity {
        ...ParagraphCardItem
      }
    }
    fieldSpacings {
      entity {
        ...ParagraphSpacings
      }
    }
  }
`

export const ParagraphFeaturedTextBox = graphql`
  fragment ParagraphFeaturedTextBox on Drupal_ParagraphFeaturedTextBox {
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
        ...MediaImage
      }
    }
    fieldSpacings {
      entity {
        ...ParagraphSpacings
      }
    }
  }
`

export const ParagraphVideoTranscriptItem = graphql`
  fragment ParagraphVideoTranscriptItem on Drupal_ParagraphVideoTranscriptItem {
    __typename
    uuid
    fieldTitle
    fieldCount
    fieldDescription {
      processed
    }
  }
`

export const ParagraphVideoTranscript = graphql`
  fragment ParagraphVideoTranscript on Drupal_ParagraphVideoTranscript {
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
        ...ParagraphVideoTranscriptItem
      }
    }
    fieldSpacings {
      entity {
        ...ParagraphSpacings
      }
    }
  }
`

export const ParagraphTeamSliderItem = graphql`
  fragment ParagraphTeamSliderItem on Drupal_ParagraphTeamSliderItem {
    __typename
    uuid
    fieldItem {
      entity {
        ...ParagraphFeaturedTextBox
      }
    }
    fieldItems {
      entity {
        ...ParagraphSpeaker
      }
    }
  }
`

export const ParagraphTeamSlider = graphql`
  fragment ParagraphTeamSlider on Drupal_ParagraphTeamSlider {
    __typename
    uuid
    fieldTitle
    fieldDescription {
      processed
    }
    fieldItems {
      entity {
        ...ParagraphTeamSliderItem
      }
    }
    fieldSpacings {
      entity {
        ...ParagraphSpacings
      }
    }
  }
`
export const ParagraphSwissContent = graphql`
  fragment ParagraphSwissContent on Drupal_ParagraphSwissContent {
    uuid
    fieldTitle
    fieldDescription {
      value
    }
    fieldItems {
      entity {
        ...ParagraphSwissContentItem
      }
    }
  }
`

export const ParagraphSwissContentItem = graphql`
  fragment ParagraphSwissContentItem on Drupal_ParagraphSwissContentItem {
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
        ...MediaImage
      }
    }
  }
`
export const ParagraphSlideUpForm = graphql`
  fragment ParagraphSlideUpForm on Drupal_ParagraphSlideUpForm {
    __typename
    uuid
    fieldItem {
      entity {
        ...ParagraphModalMarketoForm
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
        ...MediaImage
      }
    }
    fieldItems {
      entity {
        ...ParagraphTrialBladeListItem
      }
    }
  }
`

export const ParagraphResourcesSection = graphql`
  fragment ParagraphResourcesSection on Drupal_ParagraphResourcesSection {
    __typename
    uuid
    fieldTitle
    fieldSubtitle
    fieldBackgroundResourceCard
    fieldItems {
      entity {
        ... on Drupal_ParagraphResourceCard {
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
        ...ParagraphSpacings
      }
    }
  }
`

export const ParagraphWrapper = graphql`
  fragment ParagraphWrapper on Drupal_ParagraphWrapper {
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
        ...ParagraphRichText
        ...ParagraphHeavyRichtext
        ...ParagraphCtaImageBlock
        ...ParagraphLogoGrid
        ...ParagraphCardList
        ...ParagraphResourceList
        ...ParagraphQuote
        ...ParagraphGeneralCtaRow
        ...ParagraphSwissContent
        ...ParagraphAssetPromoCard
        ...ParagraphVideoTranscript
        ...ParagraphAccordionList
        ...ParagraphBigCombo
        ...ParagraphSpeakerList
        ...ParagraphTrialBlade
        ...ParagraphIntegrationCarousel
        ...ParagraphBoxedQuoteSlider
        ...ParagraphAccordionTable
        ...ParagraphThreeCardCluster
        ...ParagraphCtaBlockList
        ...ParagraphPromoRow
        ...ParagraphTabbedContent
        ...ParagraphMediaPlayer
        ...ParagraphGeneralTextRowRightCta
        ...ParagraphTechnicalTable
        ...ParagraphMarketoForm
        ...ParagraphSectionId
        ...ParagraphSlider
        ...ParagraphVideoPlaylist
        ...ParagraphLargeStepSlider
        ...ParagraphTabList
        ...ParagraphTab
        ...ParagraphSpotlight
        ...ParagraphResourcesSection
        ...ParagraphFeaturedIndustryCardList
        ...ParagraphCardGrid
        ...ParagraphAcceleratorCards
        ...ParagraphLogoWheel
        ...ParagraphAnimatedLogoSlider
        ...ParagraphHeaderSection
        ...ParagraphImage
      }
    }
    fieldSpacings {
      entity {
        ...ParagraphSpacings
      }
    }
  }
`

export const ParagraphGeneralTextRow = graphql`
  fragment ParagraphGeneralTextRow on Drupal_ParagraphGeneralTextRow {
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
        ...MediaImage
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
        ...ParagraphSpacings
      }
    }
  }
`

export const ParagraphGeneralTextRowRightCta = graphql`
  fragment ParagraphGeneralTextRowRightCta on Drupal_ParagraphGeneralTextRowRightCta {
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
        ...ParagraphSpacings
      }
    }
  }
`

export const ParagraphColumnSpacing = graphql`
  fragment ParagraphColumnSpacing on Drupal_ParagraphColumnSpacing {
    id
    fieldBottomSpacing
    fieldBottomSpacingTablet
    fieldBottomSpacingDesktop
  }
`

export const ParagraphDemoCenterLibrary = graphql`
  fragment ParagraphDemoCenterLibrary on Drupal_ParagraphDemoCenterLibrary {
    __typename
    uuid
    fieldTitle
    fieldSpacings {
      entity {
        ...ParagraphSpacings
      }
    }
  }
`

export const ParagraphModalMarketoForm = graphql`
  fragment ParagraphModalMarketoForm on Drupal_ParagraphModalMarketoForm {
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
        ...ParagraphSpacings
      }
    }
  }
`

export const ParagraphHorizontalForm = graphql`
  fragment ParagraphHorizontalForm on Drupal_ParagraphHorizontalForm {
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
        ...MediaImage
      }
    }
    fieldBoolean
    fieldSpacings {
      entity {
        ...ParagraphSpacings
      }
    }
    fieldItem {
      entity {
        ...ParagraphCustomForm
        ...ParagraphMarketoForm
      }
    }
  }
`

export const ParagraphColumns = graphql`
  fragment ParagraphColumns on Drupal_ParagraphColumns {
    __typename
    uuid
    fieldTitle
    fieldBackgroundToken
    fieldColumns {
      entity {
        ... on Drupal_ParagraphColumn {
          uuid
          fieldSpacings {
            entity {
              ...ParagraphColumnSpacing
            }
          }
          fieldColumnWidthDesktop
          fieldColumnWidthMobile
          fieldColumnWidthTablet
          fieldItems {
            entity {
              ...ParagraphRichText
              ...ParagraphHeavyRichtext
              ...ParagraphCtaImageBlock
              ...ParagraphLogoGrid
              ...ParagraphSwissContent
              ...ParagraphMarketoForm
              ...ParagraphCardList
              ...ParagraphGeneralTextRow
              ...ParagraphGeneralTextRowRightCta
            }
          }
        }
      }
    }
    fieldSpacings {
      entity {
        ...ParagraphSpacings
      }
    }
  }
`

export const ParagraphHeavyRichtext = graphql`
  fragment ParagraphHeavyRichtext on Drupal_ParagraphHeavyRichtext {
    __typename
    uuid
    fieldBody {
      processed
    }
    fieldImages {
      entity {
        ...MediaImageLogo
      }
    }
    fieldSpacings {
      entity {
        ...ParagraphSpacings
      }
    }
  }
`
export const ParagraphFeaturedCustomers = graphql`
  fragment ParagraphFeaturedCustomers on Drupal_ParagraphFeaturedCustomers {
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
        ...NodeCustomerTeaser
      }
    }
    bottomCustomers: fieldCustomers {
      entity {
        ...NodeCustomerTeaser
      }
    }
    fieldSpacings {
      entity {
        ...ParagraphSpacings
      }
    }
  }
`

export const ParagraphFeatureItem = graphql`
  fragment ParagraphFeatureItem on Drupal_ParagraphFeatureItem {
    __typename
    uuid
    fieldSectionTitle
    fieldTitle
    fieldDescription {
      processed
    }
    fieldImage {
      entity {
        ...MediaImage
      }
    }
  }
`

export const ParagraphFeatureList = graphql`
  fragment ParagraphFeatureList on Drupal_ParagraphFeatureList {
    __typename
    uuid
    fieldTitle
    fieldItems {
      entity {
        ...ParagraphFeatureItem
      }
    }
    fieldSpacings {
      entity {
        ...ParagraphSpacings
      }
    }
  }
`

export const ParagraphPricingCards = graphql`
  fragment ParagraphPricingCards on Drupal_ParagraphPricingCards {
    __typename
    uuid
    fieldTitle
    fieldPricingCardVariant
    fieldItems {
      entity {
        ...ParagraphPricingCardItem
      }
    }
  }
`

export const ParagraphPricingCta = graphql`
  fragment ParagraphPricingCta on Drupal_ParagraphPricingCta {
    __typename
    uuid
    fieldCtas {
      url {
        path
      }
      title
    }
    fieldItem {
      entity {
        ...ParagraphPricingVisibilityRule
      }
    }
    fieldItems {
      entity {
        ...ParagraphRichText
      }
    }
    fieldTitle
    fieldDescription {
      processed
    }
  }
`

export const ParagraphPricingSection = graphql`
  fragment ParagraphPricingSection on Drupal_ParagraphPricingSection {
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
        ...ParagraphPricingCards
        ...ParagraphPricingFeatureTable
        ...ParagraphPricingAccordion
        ...ParagraphPricingCta
        ...ParagraphPricingRichtext
      }
    }
    fieldSpacings {
      entity {
        ...ParagraphSpacings
      }
    }
  }
`

export const ParagraphPricingTableVisibilityRules = graphql`
  fragment ParagraphPricingTableVisibilityRules on Drupal_ParagraphPricingTableVisibilityRules {
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

export const ParagraphPricingFeatureTable = graphql`
  fragment ParagraphPricingFeatureTable on Drupal_ParagraphPricingFeatureTable {
    __typename
    uuid
    fieldTitle
    fieldColumnCount
    fieldEnabled
    fieldResources {
      entity {
        __typename
        uuid
        ...ParagraphPricingTableVisibilityRules
      }
    }
    fieldItem {
      entity {
        __typename
        uuid
        ...ParagraphPricingVisibilityRule
      }
    }
    fieldItems {
      entity {
        __typename
        uuid
        ...ParagraphPricingFeatureItem
      }
    }
  }
`

export const ParagraphPricingFeatureItem = graphql`
  fragment ParagraphPricingFeatureItem on Drupal_ParagraphPricingFeatureItem {
    __typename
    uuid
    fieldEnabled
    fieldItems {
      entity {
        __typename
        uuid
        ...ParagraphColumnRichtext
        ...ParagraphBoolean
      }
    }
  }
`

export const ParagraphColumnRichtext = graphql`
  fragment ParagraphColumnRichtext on Drupal_ParagraphColumnRichtext {
    __typename
    uuid
    fieldCount
    fieldDescription {
      processed
    }
  }
`

export const ParagraphBoolean = graphql`
  fragment ParagraphBoolean on Drupal_ParagraphBoolean {
    __typename
    uuid
    fieldCount
    fieldBoolean
  }
`

export const ParagraphSecondaryMenu = graphql`
  fragment ParagraphSecondaryMenu on Drupal_ParagraphSecondaryMenu {
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

export const ParagraphAssetPromoCard = graphql`
  fragment ParagraphAssetPromoCard on Drupal_ParagraphAssetPromoCard {
    __typename
    uuid
    fieldItem {
      entity {
        ...ParagraphPersonalization
      }
    }
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
        ...MediaImage
      }
    }
    fieldSpacings {
      entity {
        ...ParagraphSpacings
      }
    }
  }
`
export const ParagraphPricingAccordionItem = graphql`
  fragment ParagraphPricingAccordionItem on Drupal_ParagraphPricingAccordionItem {
    __typename
    uuid
    fieldTitle
    fieldDescription {
      processed
    }
    fieldItem {
      entity {
        ...ParagraphPricingVisibilityRule
      }
    }
  }
`

export const ParagraphPricingRichtext = graphql`
  fragment ParagraphPricingRichtext on Drupal_ParagraphPricingRichtext {
    __typename
    uuid
    fieldTitle
    fieldDescription {
      processed
    }
    fieldItem {
      entity {
        ...ParagraphPricingVisibilityRule
      }
    }
  }
`

export const ParagraphPricingAccordion = graphql`
  fragment ParagraphPricingAccordion on Drupal_ParagraphPricingAccordion {
    __typename
    uuid
    fieldTitle
    fieldItems {
      entity {
        ...ParagraphPricingAccordionItem
      }
    }
  }
`

export const ParagraphBigHero = graphql`
  fragment ParagraphBigHero on Drupal_ParagraphBigHero {
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
        ...MediaImage
        ...MediaLottieFile
      }
    }
    fieldRelatedImage {
      entity {
        ...MediaImage
      }
    }
    fieldTypewriterMessages
    fieldSpacings {
      entity {
        ...ParagraphSpacings
      }
    }
    fieldLink {
      url {
        path
      }
    }
    fieldEnabled
    fieldHeaderImage {
      entity {
        ...MediaImage
      }
    }
  }
`

export const ParagraphFloatingBox = graphql`
  fragment ParagraphFloatingBox on Drupal_ParagraphFloatingBox {
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
        ...ParagraphCtaImageBlock
      }
    }
    fieldSpacings {
      entity {
        ...ParagraphSpacings
      }
    }
  }
`

export const ParagraphGeneralCtaRowItem = graphql`
  fragment ParagraphGeneralCtaRowItem on Drupal_ParagraphGeneralCtaRowItem {
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

export const ParagraphGeneralCtaRow = graphql`
  fragment ParagraphGeneralCtaRow on Drupal_ParagraphGeneralCtaRow {
    __typename
    uuid
    fieldAlignment
    fieldItems {
      entity {
        ...ParagraphGeneralCtaRowItem
      }
    }
    fieldSpacings {
      entity {
        ...ParagraphSpacings
      }
    }
  }
`

export const ParagraphQuoteSliderItem = graphql`
  fragment ParagraphQuoteSliderItem on Drupal_ParagraphQuoteSliderItem {
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
export const ParagraphBasicQuoteSlider = graphql`
  fragment ParagraphBasicQuoteSlider on Drupal_ParagraphBasicQuoteSlider {
    __typename
    uuid
    parentType
    fieldItems {
      entity {
        __typename
        ...ParagraphQuoteSliderItem
      }
    }
  }
`

export const ParagraphPartnerSearch = graphql`
  fragment ParagraphPartnerSearch on Drupal_ParagraphPartnerSearch {
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
        ...ParagraphSpacings
      }
    }
  }
`

export const ParagraphVideoRow = graphql`
  fragment ParagraphVideoRow on Drupal_ParagraphVideoRow {
    __typename
    uuid
    fieldTitle
    fieldDescription {
      processed
    }
    fieldImage {
      entity {
        ...MediaImage
      }
    }
    fieldVideoPlaceholderImage {
      entity {
        ...MediaImage
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

export const ParagraphFeaturedIndustryCard = graphql`
  fragment ParagraphFeaturedIndustryCard on Drupal_ParagraphFeaturedIndustryCard {
    __typename
    uuid
    fieldTitle
    fieldSubtitle
    fieldImage {
      entity {
        __typename
        ...MediaImage
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
        ...MediaImage
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

export const ParagraphFeaturedIndustryCardList = graphql`
  fragment ParagraphFeaturedIndustryCardList on Drupal_ParagraphFeaturedIndustryCardList {
    __typename
    uuid
    fieldTitle
    fieldItems {
      entity {
        ...ParagraphFeaturedIndustryCard
      }
    }
  }
`

export const ParagraphIndustryCardList = graphql`
  fragment ParagraphIndustryCardList on Drupal_ParagraphIndustryCardList {
    __typename
    uuid
    fieldTitle
    fieldItems {
      entity {
        ...ParagraphIndustryCard
      }
    }
  }
`

export const ParagraphIndustryCard = graphql`
  fragment ParagraphIndustryCard on Drupal_ParagraphIndustryCard {
    __typename
    uuid
    fieldTitle
    fieldCtaLabel
    fieldImage {
      entity {
        ...MediaImage
      }
    }
    fieldItems {
      entity {
        ...ParagraphRelatedLinks
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

export const ParagraphRelatedLinks = graphql`
  fragment ParagraphRelatedLinks on Drupal_ParagraphRelatedLinks {
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

export const ParagraphSectionId = graphql`
  fragment ParagraphSectionId on Drupal_ParagraphSectionId {
    __typename
    uuid
    fieldKey
  }
`

export const ParagraphAcceleratorCards = graphql`
  fragment ParagraphAcceleratorCards on Drupal_ParagraphAcceleratorCards {
    __typename
    uuid
    fieldTitle
    fieldItems {
      entity {
        ...ParagraphAcceleratorCard
      }
    }
  }
`

export const ParagraphAcceleratorCard = graphql`
  fragment ParagraphAcceleratorCard on Drupal_ParagraphAcceleratorCard {
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
    fieldBoolean
    fieldImage {
      entity {
        ...MediaImage
      }
    }
    fieldFeatured
    fieldHot
    fieldNew
    fieldAcceleratorPartnerTerm {
      entity {
        ...TaxonomyTermAcceleratorPartners
      }
    }
    fieldIndustry {
      entity {
        ...TaxonomyTermIndustry
      }
    }
  }
`

export const ParagraphLargePageHeader = graphql`
  fragment ParagraphLargePageHeader on Drupal_ParagraphLargePageHeader {
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
        ...MediaImage
        ...MediaVideo
        ...MediaRemoteVideo
      }
    }
    lottie: fieldImage {
      entity {
        ...MediaLottieFile
      }
    }
    imageHeightDesktop: fieldCompany
    imageHeightTablet: fieldCtaLabel
    spacingDesktop: fieldImageColumnWidth
    spacingTablet: fieldSpacingBetweenTablet
    fieldSpacings {
      entity {
        ...ParagraphSpacings
      }
    }
  }
`

export const ParagraphPartnerSolutionSearchInternal = graphql`
  fragment ParagraphPartnerSolutionSearchInternal on Drupal_ParagraphPartnerSolutionSearchInternal {
    __typename
    uuid
    fieldReference {
      entity {
        ...NodePartnerSolutionSearch
      }
    }
  }
`

export const ParagraphPartnerSolutionSearchCard = graphql`
  fragment ParagraphPartnerSolutionSearchCard on Drupal_ParagraphPartnerSolutionSearchCard {
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
        ... on Drupal_NodePartner {
          __typename
          partnerTitle: title
          fieldMedia {
            entity {
              ...MediaImage
            }
          }
        }
      }
    }
    fieldImage {
      entity {
        ...MediaImage
      }
    }
  }
`

export const ParagraphPartnerSolutionSearch = graphql`
  fragment ParagraphPartnerSolutionSearch on Drupal_ParagraphPartnerSolutionSearch {
    __typename
    uuid
    fieldTitle
    fieldSpacings {
      entity {
        ...ParagraphSpacings
      }
    }
    partnerSolutionsCards: fieldItems {
      entity {
        __typename
        uuid
        ...ParagraphPartnerSolutionSearchInternal
        ...ParagraphPartnerSolutionSearchCard
      }
    }
  }
`
export const ParagraphBoxedQuoteSliderItem = graphql`
  fragment ParagraphBoxedQuoteSliderItem on Drupal_ParagraphBoxedQuoteSliderItem {
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
        ...MediaImage
      }
    }
  }
`
export const ParagraphBoxedQuoteSlider = graphql`
  fragment ParagraphBoxedQuoteSlider on Drupal_ParagraphBoxedQuoteSlider {
    __typename
    uuid
    parentType
    fieldSpacings {
      entity {
        ...ParagraphSpacings
      }
    }
    fieldItems {
      entity {
        __typename
        ...ParagraphBoxedQuoteSliderItem
      }
    }
  }
`

export const ParagraphTextSliderItem = graphql`
  fragment ParagraphTextSliderItem on Drupal_ParagraphTextSliderItem {
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
export const ParagraphTextSlider = graphql`
  fragment ParagraphTextSlider on Drupal_ParagraphTextSlider {
    __typename
    uuid
    parentType
    fieldCount
    fieldBackgroundToken
    fieldSpacings {
      entity {
        ...ParagraphSpacings
      }
    }
    fieldItems {
      entity {
        __typename
        ...ParagraphTextSliderItem
      }
    }
  }
`
export const ParagraphCtaDownload = graphql`
  fragment ParagraphCtaDownload on Drupal_ParagraphCtaDownload {
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
        ...ParagraphSpacings
      }
    }
  }
`

export const ParagraphGridSpacings = graphql`
  fragment ParagraphGridSpacings on Drupal_ParagraphGridSpacings {
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
export const ParagraphLogos = graphql`
  fragment ParagraphLogos on Drupal_ParagraphLogos {
    __typename
    uuid
    fieldImage {
      entity {
        ...MediaImage
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

export const ParagraphTrialBladeListItem = graphql`
  fragment ParagraphTrialBladeListItem on Drupal_ParagraphTrialBladeListItem {
    __typename
    uuid
    fieldTitle
    fieldDescription {
      processed
    }
  }
`

export const ParagraphTrialBlade = graphql`
  fragment ParagraphTrialBlade on Drupal_ParagraphTrialBlade {
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
        ...ParagraphSpacings
      }
    }
    fieldItems {
      entity {
        __typename
        uuid
        ...ParagraphTrialBladeListItem
      }
    }
  }
`

export const ParagraphAnimatedLogoSlider = graphql`
  fragment ParagraphAnimatedLogoSlider on Drupal_ParagraphAnimatedLogoSlider {
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
        ...ParagraphLogos
      }
    }
    fieldSpacings {
      entity {
        ...ParagraphSpacings
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

export const ParagraphInPageNavigationItem = graphql`
  fragment ParagraphInPageNavigationItem on Drupal_ParagraphInPageNavigationItem {
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
        ... on Drupal_ParagraphInPageNavigationItem {
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

export const ParagraphInPageNavigation = graphql`
  fragment ParagraphInPageNavigation on Drupal_ParagraphInPageNavigation {
    __typename
    uuid
    fieldBoolean
    fieldItems {
      entity {
        ...ParagraphInPageNavigationItem
      }
    }
  }
`

export const ParagraphInPageNavigationHorizontal = graphql`
  fragment ParagraphInPageNavigationHorizontal on Drupal_ParagraphInPageNavigationHorizontal {
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

export const ParagraphInPageNavigationContainer = graphql`
  fragment ParagraphInPageNavigationContainer on Drupal_ParagraphInPageNavigationContainer {
    __typename
    uuid
    fieldItem {
      entity {
        ...ParagraphFromLibrary
        ...ParagraphInPageNavigation
      }
    }
    fieldItems {
      entity {
        __typename
        ...ParagraphAccordionList
        ...ParagraphCardList
        ...ParagraphCta
        ...ParagraphCtaBlockList
        ...ParagraphCtaImageBlock
        ...ParagraphGeneralCtaRow
        ...ParagraphGeneralTextRow
        ...ParagraphImage
        ...ParagraphResourceList
        ...ParagraphRichText
        ...ParagraphSlider
        ...ParagraphVideoPlaylist
        ...ParagraphVideoRow
        ...ParagraphVideoTranscript
        ...ParagraphWrapper
        ...ParagraphSwissContent
        ...ParagraphAssetPromoCard
        ...ParagraphSectionId
        ...ParagraphModalMarketoForm
        ...ParagraphBasicAccordion
        ...ParagraphColumns
        ...ParagraphAccordionTable
        ...ParagraphTrustCenterCertifications
        ...ParagraphTechnicalTable
        ...ParagraphImageSlider
        ...ParagraphLogoGrid
        ...ParagraphPricingSection
        ...ParagraphTabList
        ...ParagraphQuoteCombo
        ...ParagraphCustomComponent
      }
    }
  }
`

export const ParagraphInPageNavigationSticky = graphql`
  fragment ParagraphInPageNavigationSticky on Drupal_ParagraphInPageNavigationSticky {
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

export const ParagraphLargeCard = graphql`
  fragment ParagraphLargeCard on Drupal_ParagraphLargeCard {
    __typename
    uuid
    fieldHeaderImage {
      entity {
        ...MediaImage
      }
    }
    fieldImage {
      entity {
        ...MediaImage
        ...MediaVideo
        ...MediaRemoteVideo
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
export const ParagraphTransparentCard = graphql`
  fragment ParagraphTransparentCard on Drupal_ParagraphTransparentCard {
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
export const ParagraphPartnerSolutionCard = graphql`
  fragment ParagraphPartnerSolutionCard on Drupal_ParagraphPartnerSolutionCard {
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
        ...MediaImage
      }
    }
    fieldTitle
    fieldSectionTitle
  }
`
export const ParagraphSmallTileCard = graphql`
  fragment ParagraphSmallTileCard on Drupal_ParagraphSmallTileCard {
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
        ...MediaImage
      }
    }
    fieldTitle
    fieldKey
    fieldBoolean
    fieldBackgroundToken
    fieldRemoveHover
  }
`

export const ParagraphLargeStepSlider = graphql`
  fragment ParagraphLargeStepSlider on Drupal_ParagraphLargeStepSlider {
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
        ...ParagraphLargeCard
        ...ParagraphPartnerSolutionCard
      }
    }
    fieldSpacings {
      entity {
        ...ParagraphSpacings
      }
    }
  }
`

export const ParagraphSlideOutForm = graphql`
  fragment ParagraphSlideOutForm on Drupal_ParagraphSlideOutForm {
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

export const ParagraphCardGrid = graphql`
  fragment ParagraphCardGrid on Drupal_ParagraphCardGrid {
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
        ...ParagraphSpacings
      }
    }
    fieldItems {
      entity {
        __typename
        ...ParagraphFlatIconCard
        ...ParagraphTransparentCard
        ...ParagraphPartnerSolutionCard
        ...ParagraphSmallTileCard
        ...ParagraphAcceleratorCard
      }
    }
  }
`

export const ParagraphPromoRow = graphql`
  fragment ParagraphPromoRow on Drupal_ParagraphPromoRow {
    __typename
    fieldLink {
      url {
        path
      }
      title
    }
    fieldImage {
      entity {
        __typename
        ...MediaImage
        ...MediaVideo
        ...MediaLottieFile
        ...MediaRemoteVideo
      }
    }
    fieldTitle
    fieldSpacings {
      entity {
        ...ParagraphSpacings
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

export const ParagraphHeroEventSpeaker = graphql`
  fragment ParagraphHeroEventSpeaker on Drupal_ParagraphHeroEventSpeaker {
    fieldTitle
    fieldRole
    fieldImage {
      entity {
        __typename
        ...MediaImage
      }
    }
  }
`
export const ParagraphHeroEvent = graphql`
  fragment ParagraphHeroEvent on Drupal_ParagraphHeroEvent {
    fieldItems {
      entity {
        ...ParagraphHeroEventSpeaker
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
        ...MediaImage
      }
    }
    fieldHeaderImage {
      entity {
        __typename
        ...MediaImage
      }
    }
    fieldTitle
    fieldSectionTitle
    fieldDescription {
      processed
    }
    fieldSpacings {
      entity {
        ...ParagraphSpacings
      }
    }
  }
`

export const ParagraphFlatIconCard = graphql`
  fragment ParagraphFlatIconCard on Drupal_ParagraphFlatIconCard {
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
        ...MediaImage
      }
    }
  }
`

export const ParagraphDrawerCard = graphql`
  fragment ParagraphDrawerCard on Drupal_ParagraphDrawerCard {
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
          ... on Drupal_NodeDemoPage {
            nid
            title
            fieldGatedAssetForm {
              entity {
                ...ParagraphSlideUpForm
              }
            }
          }
        }
      }
      title
    }
    fieldImage {
      entity {
        ...MediaImage
      }
    }
  }
`
export const ParagraphListCardItem = graphql`
  fragment ParagraphListCardItem on Drupal_ParagraphListCardItem {
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
export const ParagraphListCard = graphql`
  fragment ParagraphListCard on Drupal_ParagraphListCard {
    __typename
    uuid
    fieldTitle
    fieldItems {
      entity {
        ...ParagraphListCardItem
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
        ...MediaImage
      }
    }
  }
`
export const ParagraphThreeCardCluster = graphql`
  fragment ParagraphThreeCardCluster on Drupal_ParagraphThreeCardCluster {
    __typename
    uuid
    fieldItem {
      entity {
        ...ParagraphDrawerCard
        ...ParagraphListCard
      }
    }
    fieldItems {
      entity {
        ...ParagraphDrawerCard
        ...ParagraphAcceleratorCard
      }
    }
    fieldSpacings {
      entity {
        ...ParagraphSpacings
      }
    }
  }
`

export const ParagraphSmallPromoBlock = graphql`
  fragment ParagraphSmallPromoBlock on Drupal_ParagraphSmallPromoBlock {
    __typename
    uuid
    fieldSpacings {
      entity {
        ...ParagraphSpacings
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
        ...MediaImage
      }
    }
  }
`

export const ParagraphHeaderSection = graphql`
  fragment ParagraphHeaderSection on Drupal_ParagraphHeaderSection {
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
        ...ParagraphSpacings
      }
    }
  }
`

// Library Paragraphs

export const ParagraphsLibraryItem = graphql`
  fragment ParagraphsLibraryItem on Drupal_ParagraphsLibraryItem {
    __typename
    uuid
    paragraphs {
      entity {
        ...ParagraphSecondaryMenu
        ...ParagraphHero
        ...ParagraphInPageNavigation
        ...ParagraphInPageNavigationHorizontal
      }
    }
  }
`

export const ParagraphFromLibrary = graphql`
  fragment ParagraphFromLibrary on Drupal_ParagraphFromLibrary {
    __typename
    uuid
    fieldReusableParagraph {
      entity {
        __typename
        ...ParagraphsLibraryItem
      }
    }
    fieldSpacings {
      entity {
        ...ParagraphSpacings
      }
    }
  }
`
export const ParagraphCertifications = graphql`
  fragment ParagraphCertifications on Drupal_ParagraphCertifications {
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
        ...MediaImage
      }
    }
  }
`

export const ParagraphTrustCenterCertifications = graphql`
  fragment ParagraphTrustCenterCertifications on Drupal_ParagraphTrustCenterCertifications {
    __typename
    uuid
    fieldTitle
    fieldItems {
      entity {
        ...ParagraphCertifications
      }
    }
  }
`

export const ParagraphCustomerStoryTabStat = graphql`
  fragment ParagraphCustomerStoryTabStat on Drupal_ParagraphCustomerStoryTabStat {
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

export const ParagraphCustomerStoryTabItem = graphql`
  fragment ParagraphCustomerStoryTabItem on Drupal_ParagraphCustomerStoryTabItem {
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
        ...MediaImage
        ...MediaVideo
        ...MediaLottieFile
        ...MediaRemoteVideo
      }
    }
    fieldCtasStyle
    tabImage: fieldRelatedImage {
      entity {
        ...MediaImage
      }
    }
    tabHeadline: fieldSectionTitle
    stats: fieldItems {
      entity {
        ...ParagraphCustomerStoryTabStat
      }
    }
  }
`

export const ParagraphCustomerStoryTabs = graphql`
  fragment ParagraphCustomerStoryTabs on Drupal_ParagraphCustomerStoryTabs {
    __typename
    uuid
    isSwipableVariant: fieldBoolean
    fieldSpacings {
      entity {
        ...ParagraphSpacings
      }
    }
    fieldItems {
      entity {
        ...ParagraphCustomerStoryTabItem
      }
    }
  }
`
export const ParagraphDemoCenterInformation = graphql`
  fragment ParagraphDemoCenterInformation on Drupal_ParagraphDemoCenterInformation {
    __typename
    uuid
    fieldHot
    fieldNew
    fieldImage {
      entity {
        ...MediaImage
      }
    }
    fieldBoolean
    fieldFeatured
    fieldDescription {
      processed
    }
  }
`

export const ParagraphCustomerStory = graphql`
  fragment ParagraphCustomerStory on Drupal_ParagraphCustomerStory {
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
        ...MediaImage
      }
    }
  }
`
export const ParagraphVerticalTabItem = graphql`
  fragment ParagraphVerticalTabItem on Drupal_ParagraphVerticalTabItem {
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
        __typename
        ...MediaImage
        ...MediaVideo
        ...MediaRemoteVideo
      }
    }
    fieldItem {
      entity {
        ...ParagraphCustomerStory
      }
    }
  }
`

export const ParagraphLabelRowColumn = graphql`
  fragment ParagraphLabelRowColumn on Drupal_ParagraphLabelRowColumn {
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

export const ParagraphLabelRow = graphql`
  fragment ParagraphLabelRow on Drupal_ParagraphLabelRow {
    __typename
    uuid
    fieldTitle
    fieldColumns {
      entity {
        ...ParagraphLabelRowColumn
      }
    }
    fieldItems {
      entity {
        ...ParagraphIcon
      }
    }
    fieldSpacings {
      entity {
        ...ParagraphSpacings
      }
    }
  }
`

export const ParagraphChooseDemo = graphql`
  fragment ParagraphChooseDemo on Drupal_ParagraphChooseDemo {
    uuid
    fieldRichTitle {
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
        ...ParagraphSpacings
      }
    }
  }
`

export const ParagraphVerticalTabs = graphql`
  fragment ParagraphVerticalTabs on Drupal_ParagraphVerticalTabs {
    __typename
    uuid
    fieldItems {
      entity {
        ...ParagraphVerticalTabItem
      }
    }
    fieldSpacings {
      entity {
        ...ParagraphSpacings
      }
    }
  }
`

export const ParagraphSpotlight = graphql`
  fragment ParagraphSpotlight on Drupal_ParagraphSpotlight {
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
        ...ParagraphCard
      }
    }
    fieldSpacings {
      entity {
        ...ParagraphSpacings
      }
    }
  }
`
export const ParagraphCloudRegion = graphql`
  fragment ParagraphCloudRegion on Drupal_ParagraphCloudRegion {
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
        ...MediaImage
      }
    }
  }
`

export const ParagraphRegionalCloudMapItem = graphql`
  fragment ParagraphRegionalCloudMapItem on Drupal_FieldParagraphRegionalCloudMapFieldItems {
    __typename
    entity {
      ...ParagraphCloudRegion
    }
  }
`

export const ParagraphRegionalCloudMap = graphql`
  fragment ParagraphRegionalCloudMap on Drupal_ParagraphRegionalCloudMap {
    __typename
    uuid
    fieldTitle
    fieldItems {
      ...ParagraphRegionalCloudMapItem
    }
  }
`

// Nodes

export const NodeCustomerTeaser = graphql`
  fragment NodeCustomerTeaser on Drupal_NodeCustomer {
    __typename
    uuid
    title
    fieldCustomerLogo {
      entity {
        ...MediaImage
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
        ... on Drupal_ParagraphCustomerFeaturedInformation {
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
          fieldImage {
            entity {
              ...MediaImage
            }
          }
        }
      }
    }
  }
`

export const NodeUser = graphql`
  fragment NodeUser on Drupal_NodeUser {
    entityId
    name: entityLabel
    entityUrl {
      path
    }
    fieldMedia {
      entity {
        ...AvatarMediaImage
      }
    }
    fieldSlug
    fieldAvatar
    avatarImage {
      childImageSharp {
        gatsbyImageData(placeholder: BLURRED, layout: CONSTRAINED, width: 50)
      }
    }
  }
`

export const NodePost = graphql`
  fragment NodePost on Drupal_NodePost {
    vid
    title
    fieldSubtitle
    entityCreated(format: "F j, Y")
    entityUrl {
      path
    }
    entityMetatags {
      ...Metatag
    }
    fieldTags {
      entity {
        ...TaxonomyTermTags
      }
    }
    fieldMedia {
      entity {
        ...MediaImage
      }
    }
    fieldAuthors {
      entity {
        ...NodeUser
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
        ...ParagraphSecondaryMenu
        ...ParagraphHero
        ...ParagraphInPageNavigationContainer
      }
    }
    fieldCategories {
      entity {
        ...TaxonomyTermCategories
      }
    }
    fieldRelatedPosts {
      entity {
        __typename
        ...NodePostTeaser
      }
    }
    fieldSidebarPromotion
    fieldSidebarOverride
    fieldSidebarComponents {
      entity {
        ... on Drupal_ParagraphImage {
          id
          uuid
          __typename
          fieldLink {
            title
            uri
            url {
              path
            }
          }
          fieldImage {
            entity {
              ...BannerMediaImage
            }
          }
        }
      }
    }
    inlineImages {
      ...InlineImage
    }
  }
`

export const NodePostTeaser = graphql`
  fragment NodePostTeaser on Drupal_NodePost {
    title
    vid
    entityCreated(format: "F j, Y")
    entityUrl {
      path
    }
    fieldAuthors {
      entity {
        ...NodeUser
      }
    }
    body {
      teaser: viewModeFieldFormatter(mode: TEASER)
    }
    fieldCategories {
      entity {
        ...TaxonomyTermCategories
      }
    }
  }
`

export const NodeLegal = graphql`
  fragment NodeLegal on Drupal_NodeLegal {
    title
    fieldShowSidebarNavigation
    entityMetatags {
      ...Metatag
    }
    fieldColumnWidth
    body {
      processed
    }
    fieldComponents {
      entity {
        __typename
        uuid
        ...ParagraphImage
        ...ParagraphRichText
        ...ParagraphMarketoForm
      }
    }
    fieldTopContent {
      entity {
        __typename
        uuid
        ...ParagraphHero
      }
    }
  }
`

export const NodeNews = graphql`
  fragment NodeNews on Drupal_NodeNews {
    entityLanguage{
      id
    }
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
        ...MediaImage
      }
    }
    fieldNewsFeaturedStory
  }
`
export const ResourceCard = graphql`
  fragment ResourceCard on Drupal_NodeResource {
    title
    fieldCustomerLogo {
      entity {
        ...MediaImage
      }
    }
  }
`

export const NodeResource = graphql`
  fragment NodeResource on Drupal_NodeResource {
    title
    fieldKicker
    fieldEnableSkipForm
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
    fieldHeroBackgroundVariant
    fieldHideDatabricksLogo
    fieldCustomHeaderLogos {
      description
      entity {
        ... on Drupal_File {
          url
        }
      }
      gatsbyFile {
        publicURL
      }
    }
    fieldLogos {
      entity {
        ...MediaImage
      }
    }
    fieldThumbnail {
      entity {
        ...MediaImage
      }
    }
    entityMetatags {
      ...Metatag
    }
    fieldMedia {
      entity {
        ...MediaImage
        ...MediaLottieFile
      }
    }
    fieldRelatedPosts {
      entity {
        ...ResourceCard
      }
    }
    fieldCustomAlert {
      entity {
        ...ParagraphAlert
      }
    }
    fieldHideGlobalAlert
    fieldHideCustomAlert
    fieldSubtitle
    fieldCategory {
      entity {
        ...TaxonomyTermResourceCategories
      }
    }
    body {
      processed
    }
    fieldComponents {
      entity {
        __typename
        ...ParagraphImage
        ...ParagraphSpeakerList
        ...ParagraphAccordionList
        ...ParagraphBasicAccordion
        ...ParagraphCardList
        ...ParagraphCta
        ...ParagraphCtaBlockList
        ...ParagraphVideoPlaylist
        ...ParagraphResourceAgenda
        ...ParagraphRichText
        ...ParagraphSectionId
      }
    }
    fieldSidebarComponents {
      entity {
        __typename
        ...ParagraphMarketoForm
      }
    }
    fieldLegalDisclaimer {
      processed
    }
    fieldKicker
    fieldHeroBackgroundVariant
  }
`
export const NodeThankYouPage = graphql`
  fragment NodeThankYou on Drupal_NodeResource {
    entityUrl {
      path
    }
    fieldBlurb
    fieldImage {
      url
    }
    fieldResourceOverviewImage {
      entity {
        ...MediaImage
      }
    }
    entityMetatags {
      ...Metatag
    }
    fieldMedia {
      entity {
        ...MediaImage
      }
    }
    fieldTopContent {
      entity {
        __typename
        uuid
        ...ParagraphRichText
        ...ParagraphHero
        ...ParagraphVideoPlaylist
        ...ParagraphCtaImageBlock
        ...ParagraphWrapper
      }
    }
    fieldRelatedContent {
      entity {
        ... on Drupal_ParagraphRelatedResource {
          id
          fieldTitle
          fieldRelatedPosts {
            entity {
              ...NodeResourceTeaser
            }
          }
          fieldResources {
            entity {
              ... on Drupal_ParagraphRelatedResources {
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
                    ...MediaImage
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
        __typename
        ...ParagraphAccordionList
        ...ParagraphAccordionTable
        ...ParagraphAnimatedLogoSlider
        ...ParagraphBasicAccordion
        ...ParagraphBasicQuoteSlider
        ...ParagraphCardSlider
        ...ParagraphColumns
        ...ParagraphCtaHexImageList
        ...ParagraphCtaImageBlock
        ...ParagraphFeaturedCustomers
        ...ParagraphGeneralCtaRow
        ...ParagraphGeneralTextRow
        ...ParagraphHero
        ...ParagraphHeroWithColumns
        ...ParagraphHorizontalTabs
        ...ParagraphImageSlider
        ...ParagraphLeadCombo
        ...ParagraphModalMarketoForm
        ...ParagraphMultiMedia
        ...ParagraphQuoteCombo
        ...ParagraphResourceList
        ...ParagraphRichText
        ...ParagraphSlider
        ...ParagraphSwissContent
        ...ParagraphTeamSlider
        ...ParagraphTextSlider
        ...ParagraphVideoRow
        ...ParagraphWrapper
        ...ParagraphVideoTranscript
        ...ParagraphTabList
        ...ParagraphTrialBlade
        ...ParagraphLabelRow
        ...ParagraphCalloutRow
      }
    }
  }
`

export const NodeResourceTeaser = graphql`
  fragment NodeResourceTeaser on Drupal_NodeResource {
    fieldCategory {
      entity {
        name
      }
    }
    fieldMedia {
      entity {
        ...MediaImage
      }
    }
    fieldBlurb
    fieldEnableSkipForm
    fieldSidebarComponents {
      entity {
        ... on Drupal_ParagraphMarketoForm {
          fieldFormId
        }
      }
    }
    fieldResourceOverviewImage {
      entity {
        ...MediaImage
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
export const NodePartnerPage = graphql`
  fragment NodePartner on Drupal_NodePartner {
    title
    fieldSubtitle
    entityMetatags {
      ...Metatag
    }
    fieldMedia {
      entity {
        ...MediaImage
      }
    }
    fieldDisplayBackgroundImage
    fieldHideGlobalAlert
    fieldHideCustomAlert
    fieldCustomAlert {
      entity {
        ...ParagraphAlert
      }
    }
    fieldSpacings {
      entity {
        ...ParagraphSpacings
      }
    }
    fieldComponents {
      entity {
        __typename
        ...ParagraphResourceList
        ...ParagraphInnerMenu
        ...ParagraphHero
        ...ParagraphHeroWithColumns
        ...ParagraphCalloutRow
        ...ParagraphImage
        ...ParagraphSpeakerList
        ...ParagraphAccordionList
        ...ParagraphCardList
        ...ParagraphCta
        ...ParagraphCtaBlockList
        ...ParagraphLogoGrid
        ...ParagraphSlider
        ...ParagraphCtaImageBlock
        ...ParagraphTabList
        ...ParagraphCtaSection
        ...ParagraphMarketoForm
        ...ParagraphCtaHexImageList
        ...ParagraphQuote
        ...ParagraphQuoteCombo
        ...ParagraphRichText
        ...ParagraphBigCombo
        ...ParagraphLeadCombo
        ...ParagraphCtaCards
        ...ParagraphAccordionTable
        ...ParagraphBasicAccordion
        ...ParagraphPricingTable
        ...ParagraphVideoPlaylist
        ...ParagraphResourceAgenda
        ...ParagraphCardSlider
        ...ParagraphTeamSlider
        ...ParagraphWrapper
        ...ParagraphFeaturedCustomers
        ...ParagraphCustomerHubCards
        ...ParagraphFeatureList
        ...ParagraphPricingCards
        ...ParagraphPricingSection
        ...ParagraphFromLibrary
        ...ParagraphCustomForm
        ...ParagraphFeaturedTextBox
        ...ParagraphAssetPromoCard
        ...ParagraphCustomComponent
        ...ParagraphHeavyRichtext
        ...ParagraphVideoTranscript
        ...ParagraphBigHero
        ...ParagraphGeneralTextRow
        ...ParagraphFloatingBox
        ...ParagraphVideoRow
        ...ParagraphImageSlider
        ...ParagraphGeneralCtaRow
        ...ParagraphSwissContent
        ...ParagraphBasicQuoteSlider
        ...ParagraphLargePageHeader
        ...ParagraphFeaturedIndustryCardList
        ...ParagraphIndustryCardList
        ...ParagraphAcceleratorCards
        ...ParagraphColumns
        ...ParagraphSecondaryMenu
        ...ParagraphPartnerSearch
        ...ParagraphPartnerSolutionSearch
        ...ParagraphLabelAndLinks
        ...ParagraphBoxedQuoteSlider
        ...ParagraphTextSlider
        ...ParagraphHorizontalTabs
        ...ParagraphBulletedList
      }
    }
  }
`

export const NodePages = graphql`
  fragment NodePages on Drupal_NodePages {
    title
    fieldSubtitle
    entityMetatags {
      ...Metatag
    }
    fieldTopBannerDisplay
    entityUrl {
      ... on Drupal_EntityCanonicalUrl {
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
    fieldCustomAlert {
      entity {
        ...ParagraphAlert
      }
    }
    fieldGated
    fieldUrl {
      url {
        path
      }
    }
    fieldBlurb
    fieldShowSidebarNavigation
    fieldSpacings {
      entity {
        ...ParagraphSpacings
      }
    }
    fieldComponents {
      entity {
        __typename
        ...ParagraphResourceList
        ...ParagraphInnerMenu
        ...ParagraphHero
        ...ParagraphHeroWithColumns
        ...ParagraphCalloutRow
        ...ParagraphImage
        ...ParagraphSpeakerList
        ...ParagraphAccordionList
        ...ParagraphCardList
        ...ParagraphCta
        ...ParagraphCtaBlockList
        ...ParagraphLogoGrid
        ...ParagraphSlider
        ...ParagraphCtaImageBlock
        ...ParagraphTabList
        ...ParagraphCtaSection
        ...ParagraphMarketoForm
        ...ParagraphCtaHexImageList
        ...ParagraphQuote
        ...ParagraphQuoteCombo
        ...ParagraphRichText
        ...ParagraphBigCombo
        ...ParagraphLeadCombo
        ...ParagraphCtaCards
        ...ParagraphAccordionTable
        ...ParagraphBasicAccordion
        ...ParagraphPricingTable
        ...ParagraphVideoPlaylist
        ...ParagraphResourceAgenda
        ...ParagraphCardSlider
        ...ParagraphTeamSlider
        ...ParagraphWrapper
        ...ParagraphFeaturedCustomers
        ...ParagraphCustomerHubCards
        ...ParagraphFeatureList
        ...ParagraphPricingCards
        ...ParagraphPricingSection
        ...ParagraphFromLibrary
        ...ParagraphCustomForm
        ...ParagraphFeaturedTextBox
        ...ParagraphAssetPromoCard
        ...ParagraphCustomComponent
        ...ParagraphHeavyRichtext
        ...ParagraphVideoTranscript
        ...ParagraphBigHero
        ...ParagraphGeneralTextRow
        ...ParagraphGeneralTextRowRightCta
        ...ParagraphFloatingBox
        ...ParagraphVideoRow
        ...ParagraphImageSlider
        ...ParagraphGeneralCtaRow
        ...ParagraphSwissContent
        ...ParagraphBasicQuoteSlider
        ...ParagraphLargePageHeader
        ...ParagraphFeaturedIndustryCardList
        ...ParagraphIndustryCardList
        ...ParagraphAcceleratorCards
        ...ParagraphColumns
        ...ParagraphSecondaryMenu
        ...ParagraphPartnerSearch
        ...ParagraphPartnerSolutionSearch
        ...ParagraphInPageNavigationContainer
        ...ParagraphInPageNavigationHorizontal
        ...ParagraphLabelAndLinks
        ...ParagraphBoxedQuoteSlider
        ...ParagraphTextSlider
        ...ParagraphHorizontalTabs
        ...ParagraphIntegrationCarousel
        ...ParagraphBulletedList
        ...ParagraphInPageNavigationSticky
        ...ParagraphModalMarketoForm
        ...ParagraphDemoCenterLibrary
        ...ParagraphTrustCenterCertifications
        ...ParagraphMultiMedia
        ...ParagraphTrialBlade
        ...ParagraphCtaDownload
        ...ParagraphSlideOutForm
        ...ParagraphVerticalTabs
        ...ParagraphTabbedContent
        ...ParagraphAnimatedLogoSlider
        ...ParagraphThreeCardCluster
        ...ParagraphPromoRow
        ...ParagraphCustomerStoryTabs
        ...ParagraphCardGrid
        ...ParagraphMediaPlayer
        ...ParagraphHeroEvent
        ...ParagraphLargeStepSlider
        ...ParagraphTechnicalTable
        ...ParagraphSectionId
        ...ParagraphChooseDemo
        ...ParagraphSpotlight
        ...ParagraphResourcesSection
        ...ParagraphHorizontalForm
        ...ParagraphAlert
        ...ParagraphSmallPromoBlock
        ...ParagraphHeaderSection
        ...ParagraphLogoWheel
        ...ParagraphRegionalCloudMap
        ...ParagraphIframeEmbed
      }
    }
  }
`

export const NodeDemoPageTeaser = graphql`
  fragment NodeDemoPageTeaser on Drupal_NodeDemoPage {
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
        ...MediaImage
      }
    }
    demoInfo: fieldCustomAlert {
      entity {
        ...ParagraphDemoCenterInformation
      }
    }
  }
`

export const NodeDemoPage = graphql`
  fragment NodeDemoPage on Drupal_NodeDemoPage {
    nid
    title
    created: entityCreated(format: "F j, Y g:i a")
    fieldSubtitle
    entityMetatags {
      ...Metatag
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
      ... on Drupal_EntityCanonicalUrl {
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
        ...ParagraphDemoCenterInformation
      }
    }
    fieldRelatedContent {
      entity {
        ... on Drupal_ParagraphLinkedEntityDemoPage {
          fieldKey
          fieldSolutionsIndustryPage {
            entity {
              ...NodeDemoPageTeaser
            }
          }
        }
      }
    }
    fieldRelatedPosts {
      entity {
        ...NodeDemoPageTeaser
      }
    }
    fieldGatedAssetForm {
      entity {
        ...ParagraphSlideUpForm
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
        ...ParagraphAccordionList
        ...ParagraphAccordionTable
        ...ParagraphAnimatedLogoSlider
        ...ParagraphBasicAccordion
        ...ParagraphBasicQuoteSlider
        ...ParagraphCardSlider
        ...ParagraphColumns
        ...ParagraphCtaHexImageList
        ...ParagraphCtaImageBlock
        ...ParagraphFeaturedCustomers
        ...ParagraphGeneralCtaRow
        ...ParagraphGeneralTextRow
        ...ParagraphHero
        ...ParagraphHeroWithColumns
        ...ParagraphHorizontalTabs
        ...ParagraphImageSlider
        ...ParagraphLeadCombo
        ...ParagraphModalMarketoForm
        ...ParagraphMultiMedia
        ...ParagraphQuoteCombo
        ...ParagraphResourceList
        ...ParagraphRichText
        ...ParagraphSlider
        ...ParagraphSwissContent
        ...ParagraphTeamSlider
        ...ParagraphTextSlider
        ...ParagraphVideoRow
        ...ParagraphWrapper
        ...ParagraphVideoTranscript
        ...ParagraphTabList
        ...ParagraphTrialBlade
        ...ParagraphLabelRow
      }
    }
    fieldComponents {
      entity {
        __typename
        ...ParagraphAccordionList
        ...ParagraphAnimatedLogoSlider
        ...ParagraphBasicAccordion
        ...ParagraphCardSlider
        ...ParagraphColumns
        ...ParagraphCtaBlockList
        ...ParagraphCtaHexImageList
        ...ParagraphCtaImageBlock
        ...ParagraphGeneralCtaRow
        ...ParagraphGeneralTextRow
        ...ParagraphHero
        ...ParagraphHeroWithColumns
        ...ParagraphImageSlider
        ...ParagraphInPageNavigationSticky
        ...ParagraphModalMarketoForm
        ...ParagraphMultiMedia
        ...ParagraphResourceList
        ...ParagraphRichText
        ...ParagraphSecondaryMenu
        ...ParagraphSlider
        ...ParagraphSpeakerList
        ...ParagraphSwissContent
        ...ParagraphTeamSlider
        ...ParagraphTextSlider
        ...ParagraphVideoPlaylist
        ...ParagraphVideoRow
        ...ParagraphVideoTranscript
        ...ParagraphWrapper
        ...ParagraphLabelRow
      }
    }
  }
`

export const NodeSolutionAccelerator = graphql`
  fragment NodeSolutionAccelerator on Drupal_NodeSolutionAccelerator {
    title
    entityMetatags {
      ...Metatag
    }
    fieldDisplayBackgroundImage
    fieldHideGlobalAlert
    fieldHideCustomAlert
    fieldCustomAlert {
      entity {
        ...ParagraphAlert
      }
    }
    fieldSpacings {
      entity {
        ...ParagraphSpacings
      }
    }
    fieldGatedAssetForm {
      entity {
        __typename
        ...ParagraphSlideUpForm
      }
    }
    fieldComponents {
      entity {
        __typename
        ...ParagraphResourceList
        ...ParagraphInnerMenu
        ...ParagraphHero
        ...ParagraphHeroWithColumns
        ...ParagraphCalloutRow
        ...ParagraphImage
        ...ParagraphSpeakerList
        ...ParagraphAccordionList
        ...ParagraphCardList
        ...ParagraphCta
        ...ParagraphCtaBlockList
        ...ParagraphLogoGrid
        ...ParagraphSlider
        ...ParagraphCtaImageBlock
        ...ParagraphTabList
        ...ParagraphCtaSection
        ...ParagraphMarketoForm
        ...ParagraphCtaHexImageList
        ...ParagraphQuote
        ...ParagraphQuoteCombo
        ...ParagraphRichText
        ...ParagraphBigCombo
        ...ParagraphLeadCombo
        ...ParagraphCtaCards
        ...ParagraphAccordionTable
        ...ParagraphBasicAccordion
        ...ParagraphPricingTable
        ...ParagraphVideoPlaylist
        ...ParagraphResourceAgenda
        ...ParagraphCardSlider
        ...ParagraphTeamSlider
        ...ParagraphWrapper
        ...ParagraphFeaturedCustomers
        ...ParagraphCustomerHubCards
        ...ParagraphFeatureList
        ...ParagraphPricingCards
        ...ParagraphPricingSection
        ...ParagraphFromLibrary
        ...ParagraphCustomForm
        ...ParagraphFeaturedTextBox
        ...ParagraphAssetPromoCard
        ...ParagraphCustomComponent
        ...ParagraphHeavyRichtext
        ...ParagraphVideoTranscript
        ...ParagraphBigHero
        ...ParagraphGeneralTextRow
        ...ParagraphFloatingBox
        ...ParagraphVideoRow
        ...ParagraphImageSlider
        ...ParagraphGeneralCtaRow
        ...ParagraphSwissContent
        ...ParagraphBasicQuoteSlider
        ...ParagraphLargePageHeader
        ...ParagraphFeaturedIndustryCardList
        ...ParagraphIndustryCardList
        ...ParagraphAcceleratorCards
        ...ParagraphColumns
        ...ParagraphSecondaryMenu
        ...ParagraphPartnerSearch
        ...ParagraphPartnerSolutionSearch
        ...ParagraphInPageNavigationContainer
        ...ParagraphInPageNavigationHorizontal
        ...ParagraphLabelAndLinks
        ...ParagraphBoxedQuoteSlider
        ...ParagraphTextSlider
        ...ParagraphBulletedList
        ...ParagraphModalMarketoForm
        ...ParagraphTrustCenterCertifications
      }
    }
  }
`
export const NodeCustomer = graphql`
  fragment NodeCustomer on Drupal_NodeCustomer {
    title
    entityMetatags {
      ...Metatag
    }
    fieldDisplayBackgroundImage
    fieldBottomContent {
      entity {
        __typename
        ...ParagraphResourceList
        ...ParagraphInnerMenu
        ...ParagraphHero
        ...ParagraphHeroWithColumns
        ...ParagraphCalloutRow
        ...ParagraphImage
        ...ParagraphSpeakerList
        ...ParagraphAccordionList
        ...ParagraphCardList
        ...ParagraphCta
        ...ParagraphCtaBlockList
        ...ParagraphLogoGrid
        ...ParagraphSlider
        ...ParagraphCtaImageBlock
        ...ParagraphTabList
        ...ParagraphCtaSection
        ...ParagraphMarketoForm
        ...ParagraphCtaHexImageList
        ...ParagraphQuote
        ...ParagraphQuoteCombo
        ...ParagraphRichText
        ...ParagraphBigCombo
        ...ParagraphLeadCombo
        ...ParagraphCtaCards
        ...ParagraphVideoPlaylist
        ...ParagraphResourceAgenda
        ...ParagraphCardSlider
        ...ParagraphTeamSlider
        ...ParagraphHeavyRichtext
        ...ParagraphWrapper
        ...ParagraphLabelAndLinks
        ...ParagraphMultiMedia
        ...ParagraphSectionId
      }
    }
    fieldTopContent {
      entity {
        __typename
        ...ParagraphHeroWithColumns
      }
    }
    fieldHideCustomerPrefooter
    fieldGatedAssetForm {
      entity {
        ...ParagraphSlideUpForm
      }
    }
    fieldCustomPrefooterCta {
      entity {
        ...ParagraphCalloutRow
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

export const NodeTwoColumns = graphql`
  fragment NodeTwoColumns on Drupal_NodeTwoColumns {
    title
    fieldSubtitle
    entityMetatags {
      ...Metatag
    }
    fieldComponents {
      entity {
        __typename
        ...ParagraphRichText
        ...ParagraphLogoGrid
      }
    }
    fieldSidebarComponents {
      entity {
        __typename
        ...ParagraphCustomForm
      }
    }
  }
`

export const NodePartnerSolutionSearch = graphql`
  fragment NodePartnerSolutionSearch on Drupal_NodePartnerSolution {
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
        ... on Drupal_NodePartner {
          __typename
          partnerTitle: title
          fieldMedia {
            entity {
              ...MediaImage
            }
          }
        }
      }
    }
    overrideData: fieldCustomPrefooterCta {
      entity {
        ... on Drupal_ParagraphPartnerSolutionOverview {
          fieldTitle
          fieldLink {
            url {
              path
            }
            title
          }
          fieldImage {
            entity {
              ...MediaImage
            }
          }
        }
      }
    }
  }
`

export const NodePressRelease = graphql`
  fragment NodePressRelease on Drupal_NodePressRelease {
    entityLanguage{
      id
    }
    uuid
    title
    created
    body {
      value
      processed
    }
    fieldTagline {
      value
      processed
    }
    entityMetatags {
      ...Metatag
    }
    entityUrl {
      path
    }
    fieldNewsDate {
      value
    }
  }
`
export const NodePartnerSolution = graphql`
  fragment NodePartnerSolution on Drupal_NodePartnerSolution {
    title
    entityMetatags {
      ...Metatag
    }
    fieldHideGlobalAlert
    fieldHideCustomAlert
    fieldCustomAlert {
      entity {
        ...ParagraphAlert
      }
    }
    fieldSpacings {
      entity {
        ...ParagraphSpacings
      }
    }
    fieldComponents {
      entity {
        __typename
        ...ParagraphCtaImageBlock
        ...ParagraphRichText
        ...ParagraphGeneralTextRow
        ...ParagraphGeneralCtaRow
        ...ParagraphLargePageHeader
        ...ParagraphResourceList
      }
    }
  }
`

export const NodePartnerSolutionForm = graphql`
  fragment NodePartnerSolutionForm on Drupal_NodePartnerSolution {
    title
    entityMetatags {
      ...Metatag
    }
    fieldHideGlobalAlert
    fieldHideCustomAlert
    fieldCustomAlert {
      entity {
        ...ParagraphAlert
      }
    }
    fieldSpacings {
      entity {
        ...ParagraphSpacings
      }
    }
    fieldSidebarComponents {
      entity {
        ...ParagraphImage
        ...ParagraphRichText
      }
    }
    fieldRelatedContent {
      entity {
        ...ParagraphMarketoForm
      }
    }
  }
`

export const NodePartnerSolutionTy = graphql`
  fragment NodePartnerSolutionTy on Drupal_NodePartnerSolution {
    title
    entityMetatags {
      ...Metatag
    }
    fieldHideGlobalAlert
    fieldHideCustomAlert
    fieldCustomAlert {
      entity {
        ...ParagraphAlert
      }
    }
    fieldSpacings {
      entity {
        ...ParagraphSpacings
      }
    }
    fieldTopContent {
      entity {
        __typename
        ...ParagraphCardList
        ...ParagraphRichText
        ...ParagraphCtaBlockList
        ...ParagraphCtaImageBlock
        ...ParagraphGeneralCtaRow
        ...ParagraphImage
        ...ParagraphLargePageHeader
        ...ParagraphResourceList
      }
    }
  }
`

// Site Settings
export const SiteSettingEntityHeaderLogos = graphql`
  fragment SiteSettingEntityHeaderLogos on Drupal_SiteSettingEntityHeaderLogos {
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
        ... on Drupal_ParagraphTopnavLinks {
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
`

export const SiteSettingBlogSidebar = graphql`
  fragment SiteSettingBlogSidebar on Drupal_SiteSettingEntityBlogSidebar {
    contentTranslationStatus
    entityTranslations {
      ... on Drupal_SiteSettingEntityBlogSidebar {
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
        ...ParagraphMarketoForm
        ...ParagraphImageBanner
      }
    }
  }
`

export const SiteSettingFooter2023 = graphql`
  fragment SiteSettingFooter2023 on Drupal_SiteSettingEntityFooter2023 {
    __typename
    ... on Drupal_SiteSettingEntityFooter2023 {
      # Address Section
      fieldRichtext {
        processed
      }
      # Social Section
      fieldFirstColumn {
        entity {
          ...ParagraphIconList
        }
      }
      # Career Section
      fieldSecondColumn {
        entity {
          # TODO: validate that the imaage is not needed
          ...ParagraphImage
          ...ParagraphRichText
        }
      }
      # Footer Image
      fieldItem {
        entity {
          ...ParagraphImage
        }
      }
      # Legal, Privacy, and Terms Section
      fieldBottomSection {
        entity {
          ...ParagraphImage
          ...ParagraphRichText
        }
      }
    }
  }
`

export const SiteSettingFooter = graphql`
  fragment SiteSettingFooter on Drupal_SiteSettingEntityFooter {
    __typename
    ... on Drupal_SiteSettingEntityFooter {
      fieldFirstColumn {
        entity {
          ...ParagraphCustomBlock
          ...ParagraphIconList
          ...ParagraphImage
          ...ParagraphRichText
        }
      }
      fieldSecondColumn {
        entity {
          ...ParagraphCustomBlock
          ...ParagraphIconList
          ...ParagraphImage
          ...ParagraphRichText
        }
      }
      fieldBottomSection {
        entity {
          ...ParagraphCustomBlock
          ...ParagraphIconList
          ...ParagraphImage
          ...ParagraphRichText
        }
      }
    }
  }
`

export const jobQueryFragment = graphql`
  fragment JobQueryFragment on GreenhouseJob {
    id
    title
    absolute_url
    internal_job_id
    updated_at
    offices {
      id
      name
    }
    location {
      name
    }
    departments {
      name
    }
  }
`

export const departmentQueryFragment = graphql`
  fragment DepartmentQueryFragment on GreenhouseDepartment {
    name
  }
`
