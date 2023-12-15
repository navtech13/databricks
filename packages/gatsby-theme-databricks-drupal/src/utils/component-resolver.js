/* eslint-disable no-use-before-define */
import React from "react"
import {
  ThumbnailModal,
  MarketoForm,
  PromotionBlock,
  Image,
  AgendaItem,
  TextLink,
  RichText,
  IconList,
  Cta,
  Wrapper,
  AccordionList,
  Grid,
  CtaBlock,
  Card,
  InnerMenu,
  Resources,
  RowsCarousel,
  CalloutRow,
  Hero,
  HeroCustomer,
  Quote,
  QuoteCombo,
  Slider,
  CtaImageBlock,
  CtaCard,
  Tab,
  BigCombo,
  LeadCombo,
  CtaSection,
  CtaHexImageList,
  PlaylistVideo,
  Agenda,
  PlaySlider,
  SimpleSlider,
  FeatureTextBox,
  ContentWrapper,
  Button,
  Link,
  PricingCard,
  StickyNavigation,
  InPageNavigationVertical,
  InPageNavigationSticky,
  FormCustom,
  IconResolver,
  JobOpenings,
  PricingTable,
  AccordionTable,
  VideoTranscript,
  BigHero,
  FloatingBox,
  BasicAccordion,
  CtaVideoBlock,
  GeneralTextRow,
  TextRowRightCta,
  CtaRow,
  NewsroomResources,
  CtaHexImage,
  LargePageHeader,
  PromoRow,
  FeaturedIndustryCard,
  LabelAndLinks,
  BioSlider,
  ModalMarketoForm,
  TrustCenterCertifications,
  MultiMedia,
  CtaDownload,
  AnimatedLogoSlider,
  SlideOutForm,
  AcceleratorCard,
  TrialBlade,
  VerticalTabs,
  TabbedContent,
  CustomerStoryTabs,
  IntegrationCarousel,
  TextButton,
  CardGrid,
  PartnerSolutionCard,
  LabelRow,
  TransparentTextCard,
  SmallTileCard,
  MediaPlayer,
  HeroPromo,
  ChooseDemo,
  Spotlight,
  SectionResources,
  LargeCustomerCard,
  LargeStepSlider,
  HorizontalForm,
  TechnicalTable,
  RegionCloudMap,
  VideoTabsPlayer,
  PersonalizationWrapper,
  SmallPromoBlock,
  HeaderSection,
  LogoWheel,
  FlatIconCard,
} from "databricks-ui"

import FeatureList from "databricks-ui/src/components/FeatureList"
import AccordionWrapper from "databricks-ui/src/components/BasicAccordion/AccordionWrapper"
import HorizontalTab from "databricks-ui/src/components/HorizontalTab"
import BulletedList from "databricks-ui/src/components/BulletedList"
import { EmbedIframe } from "databricks-ui/src/components/EmbedIframe"
import FeaturedStories from "../components/featured-stories"
import Language from "../components/language"
import GlossaryOverview from "../components/glossary-overview"
import EventOverview from "../components/event-overview"
import CustomerHub from "../components/customer-hub"
import AlertMessage from "../components/alert-message"
import HtmlParser from "../helpers/htmlParser"
import resolveImage from "./resolve-image"
import calloutRowImages from "./callout-row-images"
import Headlines from "../components/headlines"
import PressReleases from "../components/press-releases-wrapper"
import resolveLottie from "./resolve-lottie"
import convertToTableNestedArray from "../helpers/tableNestedArray"
import PricingCalculatorWrapper from "../components/pricing-calculator-wrapper"
import PricingSection from "../components/pricing-section"
import PricingTiles from "../components/pricing-tiles"
import PricingFeatureTable from "../components/pricing-feature-table"
import PricingAccordions from "../components/pricing-accordions"
import PricingCta from "../components/pricing-cta"
import PricingRichtext from "../components/pricing-richtext"
import SpecificSpacing from "../components/SpecificSpacing"
import resolveSpacings from "../helpers/resolveSpacings"
import PartnerSearch from "../components/partner-search"
import InPageVertical from "../components/inpage-vertical"
import PartnerSolutionSearch from "../components/partner-solution-search"
import IndustryCardsWrapper from "../components/industry-cards-wrapper"
import AcceleratorsWrapper from "../components/accelerator-cards-wrapper"
import resolveGridSpacings from "../helpers/resolveGridSpacings"
import formatPartnerSolutions from "../helpers/formatPartnerSolutions"
import DemoCenter from "../components/demo-hub"
import ResearchPublications from "../components/research-publications"
import ThreeCardClusterWrapper from "../components/three-card-cluster"
import Resourcesoverview from "../components/resources-overview"
import InPageHorizontal from "../components/inpage-horizontal"

export const resolve = (entity, pageContext) => {
  if (!entity.__typename) {
    return <></>
  }

  if (entity.__typename.endsWith(`ParagraphAgendaItem`)) {
    return <AgendaItem key={entity.uuid}>AgendaItem</AgendaItem>
  }
  if (entity.__typename.endsWith(`ParagraphSmallPromoBlock`)) {
    const image = entity.fieldImage && resolveImage(entity.fieldImage)
    return (
      <SpecificSpacing {...resolveSpacings(entity.fieldSpacings)}>
        <SmallPromoBlock
          image={image}
          description={entity.fieldDescription?.processed}
          title={entity.fieldTitle}
          cta={{
            label: entity.fieldLink?.title,
            to: entity.fieldLink?.url?.path,
          }}
        />
      </SpecificSpacing>
    )
  }
  if (entity.__typename.endsWith(`ParagraphPromotion`)) {
    const item = entity.entityTranslation || entity
    const cta = {
      text: item.fieldLink.title,
      to: item.fieldLink.url?.path,
    }
    const image = item.fieldImage && resolveImage(item.fieldImage)
    const modifiedBodyValue = item.inlineImages
      ? HtmlParser(item.fieldBody?.processed, item.inlineImages)
      : item.fieldBody?.processed
    return (
      <PromotionBlock
        key={item.uuid}
        image={image}
        cta={cta}
        variant={item.fieldVariant}
        eyebrow={item.fieldSubtitle}
      >
        {modifiedBodyValue}
      </PromotionBlock>
    )
  }

  if (entity.__typename.endsWith(`ParagraphRichtext`)) {
    return (
      <SpecificSpacing {...resolveSpacings(entity.fieldSpacings)}>
        <Wrapper
          id={`${entity.__typename}-${entity.uuid}`}
          key={entity.uuid}
          title={entity.fieldTitle}
        >
          <RichText variant='body'>
            <HtmlParser content={entity.fieldBody?.processed} />
          </RichText>
        </Wrapper>
      </SpecificSpacing>
    )
  }

  if (entity.__typename.endsWith(`ParagraphTrustCenterCertifications`)) {
    const items = entity.fieldItems?.map((item) => {
      return {
        key: item.entity.uuid,
        availableClouds: item.entity?.fieldAvailableClouds,
        description: item.entity.fieldDescription?.processed,
        link: {
          to: item.entity.fieldLink?.url.path,
        },
        image: { ...resolveImage(item.entity?.fieldImage) },
      }
    })

    return (
      <SpecificSpacing key={entity.uuid} {...resolveSpacings(entity.fieldSpacings)}>
        <Wrapper>
          <TrustCenterCertifications
            title={entity.fieldTitle}
            certifications={items}
          />
        </Wrapper>
      </SpecificSpacing>
    )
  }

  if (entity.__typename.endsWith(`ParagraphSpeakerList`)) {
    const variantMap = {
      simple: { key: "profileSmall", columns: 3, gap: 2 },
      large: { key: "profileLarge", columns: 1, gap: 4 },
      largeGrid: { key: "profileLargeGrid", columns: 4, gap: 2 },
    }

    const currentVariant = variantMap[entity.fieldSpeakerVariant]
    const openInModal = entity.fieldBoolean

    const items = entity.fieldItems.map((item) => {
      return {
        image: item?.entity?.fieldImage && resolveImage(item.entity.fieldImage),
        description: item?.entity?.fieldBody?.processed,
        name: item?.entity?.fieldTitle,
        title: item?.entity?.fieldRole,
      }
    })

    const cards = entity.fieldItems.map(({ entity: speaker }, index) => {
      let description = ""

      if (speaker.fieldTitle && entity.fieldSpeakerVariant !== "largeGrid") {
        description += `<p class="title leading-5 text-2">${speaker.fieldTitle}</p>`
      }
      if (speaker.fieldTitle && entity.fieldSpeakerVariant === "largeGrid") {
        description += `<p class="h6 font-bold">${speaker.fieldTitle}</p>`
      }

      if (speaker.fieldRole) {
        description += `<p>${speaker.fieldRole}</p>`
      }

      if (speaker.fieldCompany) {
        description += `<p class="accent font-mono">${speaker.fieldCompany}</p>`
      }

      if (entity.fieldSpeakerVariant === "largeGrid" && openInModal) {
        return (
          <BioSlider key={speaker.uuid} childrenIndex={index} items={items}>
            <CtaBlock
              variant={currentVariant?.key}
              description={description}
              image={resolveImage(speaker.fieldImage)}
              summary={speaker.fieldDescription?.processed}
            />
          </BioSlider>
        )
      }
      return (
        <CtaBlock
          key={speaker.uuid}
          variant={currentVariant?.key}
          description={description}
          image={resolveImage(speaker.fieldImage)}
          summary={speaker.fieldDescription?.processed}
        />
      )
    })

    return (
      <SpecificSpacing {...resolveSpacings(entity.fieldSpacings)}>
        <Wrapper title={entity.fieldTitle}>
          <Grid columns={currentVariant?.columns} gap={currentVariant?.gap}>
            {cards}
          </Grid>
        </Wrapper>
      </SpecificSpacing>
    )
  }

  if (entity.__typename.endsWith(`ParagraphSpeakerListAccordion`)) {
    const cards = entity.fieldItems.map(({ entity: speaker }) => {
      let description = ""

      if (speaker.fieldTitle) {
        description += `<p class="font-bold mb-0">${speaker.fieldTitle}</p>`
      }

      if (speaker.fieldRole) {
        description += `<p class="mb-0">${speaker.fieldRole}</p>`
      }

      if (speaker.fieldCompany) {
        description += `<p class="accent">${speaker.fieldCompany}</p>`
      }

      return (
        <CtaBlock
          key={speaker.uuid}
          variant='profileExtraSmall'
          description={description}
          image={resolveImage(speaker.fieldImage)}
          summary={speaker.fieldDescription?.processed}
        />
      )
    })

    return (
      <Wrapper title={entity.fieldTitle}>
        <Grid columns={1} gap={1}>
          {cards}
        </Grid>
      </Wrapper>
    )
  }

  if (entity.__typename.endsWith(`ParagraphLabelAndLinks`)) {
    const ctas = entity.fieldCtas?.map((cta) => ({
      label: cta.title,
      to: cta.url.path,
    }))

    return (
      <SpecificSpacing {...resolveSpacings(entity.fieldSpacings)}>
        <div key={entity.uuid} className='inner-wrapper mb-0'>
          <LabelAndLinks title={entity.fieldTitle} ctas={ctas?.length > 0 && ctas} />
        </div>
      </SpecificSpacing>
    )
  }

  if (entity.__typename.endsWith(`ParagraphLeadCombo`)) {
    const ctas = entity.fieldCtas?.map((cta) => ({
      label: cta.title,
      to: cta.url.path,
    }))

    const link =
      entity?.fieldCtasStyle === "button" ? { ctas } : { textLink: ctas?.[0] }

    return (
      <SpecificSpacing {...resolveSpacings(entity.fieldSpacings)}>
        <Wrapper key={entity.uuid}>
          <LeadCombo
            title={entity.fieldTitle}
            description={entity.fieldDescription?.processed}
            {...(ctas?.length > 0 && link)}
          />
        </Wrapper>
      </SpecificSpacing>
    )
  }

  if (entity.__typename.endsWith(`ParagraphBigCombo`)) {
    const ctas = entity.fieldCtas?.map((cta) => ({
      text: cta.title,
      to: cta.url.path,
    }))
    const items = entity.fieldItems.map((item) => ({
      title: item.entity.fieldTitle,
      description: item.entity.fieldBody?.processed,
    }))

    return (
      <SpecificSpacing {...resolveSpacings(entity.fieldSpacings)}>
        <Wrapper key={entity.uuid}>
          <BigCombo
            title={entity.fieldTitle}
            description={entity.fieldDescription?.processed}
            ctas={ctas}
            items={items}
          />
        </Wrapper>
      </SpecificSpacing>
    )
  }

  if (entity.__typename.endsWith(`ParagraphHero`)) {
    const ctas = entity.fieldCtas?.map((cta) => ({
      label: cta.title,
      to: cta.url.path,
    }))
    const imageLink = {
      to: entity.fieldLink?.url?.path,
      label: entity.fieldLink?.title,
    }
    const isAnimation =
      entity.fieldImage?.entity?.__typename === `Drupal_MediaLottieFile`

    return (
      <SpecificSpacing {...resolveSpacings(entity.fieldSpacings)}>
        <Hero
          id={`${entity.__typename}-${entity.uuid}`}
          key={entity.uuid}
          title={entity.fieldTitle}
          topLabel={entity.fieldIntro}
          variant={entity.fieldHeroVariant}
          ctas={ctas}
          imageLink={entity.fieldLink && imageLink}
          videoSrc={entity.fieldVideoSource}
          image={entity.fieldImage ? resolveImage(entity.fieldImage) : false}
          {...(isAnimation
            ? {
                lottie: resolveLottie(entity.fieldImage),
              }
            : {
                image: entity.fieldImage ? resolveImage(entity.fieldImage) : false,
              })}
          hasVideo={!!(!entity.fieldImage && entity.fieldVideoSource)}
        >
          {entity.fieldDescription?.processed}
        </Hero>
      </SpecificSpacing>
    )
  }

  if (entity.__typename.endsWith(`ParagraphHeroWithColumns`)) {
    const ctas = entity.fieldCtas?.map((cta) => ({
      label: cta.title,
      to: cta.url.path,
    }))
    const items = entity.fieldItems.map((item) => ({
      title: item.entity.fieldTitle,
      description: item.entity.fieldBody?.processed,
    }))
    const isImage =
      entity.fieldImage?.entity.__typename === `Drupal_MediaImage`
        ? { image: resolveImage(entity.fieldImage) }
        : null

    const isVideo =
      entity.fieldImage?.entity.__typename === "Drupal_MediaVideo"
        ? {
            image: entity?.fieldImage?.entity?.gatsbyImageFile
              ? {
                  videoSrc:
                    entity.fieldImage?.entity.fieldMediaVideoFile?.entity?.url,
                  ...resolveImage(entity?.fieldImage),
                }
              : null,
          }
        : null

    const isRemoteVideo =
      entity.fieldImage?.entity.__typename === "Drupal_MediaRemoteVideo"
        ? {
            image: {
              videoSrc: entity.fieldImage?.entity.videoEmbedSrc,
              ...resolveImage(entity?.fieldImage),
            },
          }
        : null

    const image = isImage || isVideo || isRemoteVideo

    return (
      <SpecificSpacing {...resolveSpacings(entity.fieldSpacings)}>
        <Wrapper key={entity.uuid}>
          <HeroCustomer
            variant={entity.fieldVariant}
            title={entity.fieldTitle}
            eyebrow={entity.fieldSectionTitle}
            description={entity.fieldDescription?.processed}
            ctas={ctas}
            items={items}
            logo={
              entity.fieldHeaderImage ? resolveImage(entity.fieldHeaderImage) : false
            }
            {...image}
          />
        </Wrapper>
      </SpecificSpacing>
    )
  }

  if (entity.__typename.endsWith(`ParagraphImage`)) {
    if (!entity.fieldImage) {
      return <></>
    }

    const image = resolveImage(entity.fieldImage)
    const colSpan = entity.fieldWidthColumns || "12"
    const intialCol = entity.fieldInitialColumn || "1"

    if (!entity.fieldLink) {
      return (
        <SpecificSpacing {...resolveSpacings(entity.fieldSpacings)}>
          <Wrapper id={`${entity.__typename}-${entity.uuid}`} key={entity.uuid}>
            <Grid columns={12} gap={0}>
              <Image
                style={{ gridColumn: `${intialCol} / span ${colSpan}` }}
                imageModal={entity.fieldImageModal}
                imageOptions={{
                  className: "!overflow-visible",
                  imgClassName: entity.fieldDisplayShadow
                    ? "drop-shadow-[0_4px_30px_rgba(27,49,57,0.1)]"
                    : "",
                }}
                imageModalOptions={{
                  className: "h-full",
                  imgClassName: entity.fieldDisplayShadow
                    ? "drop-shadow-[0_4px_30px_rgba(27,49,57,0.1)] bg-white !object-contain"
                    : "",
                }}
                {...image}
              />
            </Grid>
          </Wrapper>
        </SpecificSpacing>
      )
    }

    const link = {
      text: entity.fieldLink.title,
      to: entity.fieldLink.url?.path,
    }
    if (image !== null) {
      return (
        <Wrapper key={entity.uuid}>
          <Grid columns={12} gap={0}>
            <TextLink
              variant='A'
              style={{ gridColumn: `${intialCol} / span ${colSpan}` }}
              to={link.to}
              label={image.alt}
            >
              <Image
                imageOptions={{
                  imgClassName: entity.fieldDisplayShadow
                    ? "drop-shadow-[0_4px_30px_rgba(27,49,57,0.1)]"
                    : "",
                }}
                {...image}
              />
            </TextLink>
          </Grid>
        </Wrapper>
      )
    }
  }

  if (entity.__typename.endsWith(`ParagraphIconList`)) {
    const icons = entity.fieldItems.map((icon) => ({
      icon: icon.entity.fieldIconName,
      to: icon.entity.fieldLink.url.path,
    }))
    // TODO: add variant to CMS
    return <IconList key={entity.uuid} items={icons} variant='B' />
  }
  if (entity.__typename.endsWith(`ParagraphBulletedList`)) {
    return (
      <SpecificSpacing {...resolveSpacings(entity.fieldSpacings)}>
        <Wrapper key={entity.uuid}>
          <BulletedList
            items={entity.fieldTextUnlimited}
            title={entity.fieldTitle}
          />
        </Wrapper>
      </SpecificSpacing>
    )
  }

  if (entity.__typename.endsWith(`ParagraphCustomBlock`)) {
    if (entity.fieldBlockType === "language") {
      return <Language key={entity.uuid} />
    }
  }

  if (entity.__typename.endsWith(`ParagraphMarketoForm`)) {
    // map form id to variant
    let variant = "secondary"
    switch (entity.fieldFormId) {
      case "1001": // special case until a better variant setup is determined
        if (
          entity.fieldThankYouUrl?.url?.path === "/databricks-vs-snowflake/thank-you"
        ) {
          variant = "secondaryWide"
        }
        break
      case "2462":
        variant = "primary"
        break
      case "1007": // en
      case "4645": // jp
      case "4667": // de
      case "4669": // fr
      case "4654": // kr
      case "4668": // it
      case "6348": // br
        variant = "companyContact"
        break
      case "3707":
      case "3717":
        variant = "twoColumnSubscription"
        break
      default:
        variant = "secondary"
    }

    return (
      <SpecificSpacing {...resolveSpacings(entity.fieldSpacings)}>
        <div
          key={entity.fieldTitle}
          className={`marketo-outer-wrapper form-${variant}`}
        >
          <div className='marketo-inner-wrapper'>
            <MarketoForm
              cookieName={entity.fieldEnabled?.[0] && entity.fieldKey}
              thankyou={entity.fieldThankYouUrl?.url?.path}
              useMarketoThankYouUrl={entity.fieldBoolean}
              formId={entity.fieldFormId}
              campaignId={entity.fieldCampaignId}
              gated={entity.fieldGated}
              disableAutoSubmit={entity.fieldDisableAutoSubmit}
              disableFormPrefill={entity?.fieldDisableFormPrefill}
              cta={entity.fieldFormCta}
              legalCopy={entity.fieldBody?.processed}
              variant={variant}
              formVariant={entity.fieldFormVariant}
              title={entity.fieldTitle}
              description={entity.fieldDescription?.processed}
            />
          </div>
        </div>
      </SpecificSpacing>
    )
  }

  if (entity.__typename.endsWith(`ParagraphAlert`)) {
    const variantMap = {
      dark: "secondary",
      light: "primary",
      secondary_small: "secondarySmall",
    }
    const cta = {
      label: entity.fieldLink?.title,
      to: entity.fieldLink?.url?.path,
    }
    const children = `${
      entity.fieldTitle
        ? `<p class='h5'><strong>${entity.fieldTitle}</strong></p>`
        : ""
    }${entity.fieldDescription?.processed}`

    return (
      <AlertMessage
        key={entity.uuid}
        cta={entity.fieldLink && cta}
        variant={variantMap[entity.fieldAlertVariant]}
        {...(entity.fieldImage && { image: resolveImage(entity.fieldImage) })}
      >
        {children}
      </AlertMessage>
    )
  }

  if (entity.__typename.endsWith(`ParagraphCalloutRow`)) {
    const ctas = entity.fieldCtas?.map((cta) => ({
      label: cta.title,
      to: cta.url.path,
    }))

    const variant = entity.fieldColorVariant

    // TODO: support Gatsby image
    const image = {
      src:
        entity.fieldImage?.entity?.gatsbyImageFile?.publicURL ||
        calloutRowImages.image[variant],
      alt: entity.fieldImage?.entity?.fieldMediaImage?.alt || "image",
    }

    return (
      <SpecificSpacing {...resolveSpacings(entity.fieldSpacings)}>
        <CalloutRow
          key={entity.uuid}
          variant={variant}
          imagePosition={entity.fieldImagePosition}
          verticalCtas={entity.fieldOrientation === "vertical"}
          title={entity.fieldTitle}
          description={entity.fieldDescription?.processed}
          ctas={ctas}
          graphic={{ src: calloutRowImages.graphic[variant], alt: "graphic" }}
          image={image}
        />
      </SpecificSpacing>
    )
  }

  if (entity.__typename.endsWith(`ParagraphCustomForm`)) {
    return (
      <SpecificSpacing {...resolveSpacings(entity.fieldSpacings)}>
        <FormCustom entity={entity} />
      </SpecificSpacing>
    )
  }
  if (entity.__typename.endsWith(`ParagraphModalMarketoForm`)) {
    return (
      <SpecificSpacing key={entity.uuid} {...resolveSpacings(entity.fieldSpacings)}>
        <Wrapper>
          <ModalMarketoForm
            cookieName={entity.fieldEnabled?.[0] && entity.fieldKey}
            title={entity.fieldTitle}
            formId={entity.fieldFormId}
            campaignId={entity.fieldCampaignId}
            cta={entity.fieldCtaLabel}
            buttonAlignment={entity.fieldAlignment}
          />
        </Wrapper>
      </SpecificSpacing>
    )
  }

  if (entity.__typename.endsWith(`ParagraphCta`)) {
    const ctas = entity.fieldCtas?.map((cta) => ({
      text: cta.title,
      to: cta.url.path,
    }))

    return (
      <SpecificSpacing {...resolveSpacings(entity.fieldSpacings)}>
        <Wrapper key={entity.uuid}>
          <Cta ctas={ctas} title={entity.fieldTitle}>
            {entity.fieldDescription?.processed}
          </Cta>
        </Wrapper>
      </SpecificSpacing>
    )
  }

  if (entity.__typename.endsWith(`ParagraphTrialBlade`)) {
    const items = entity.fieldItems?.map(({ entity: item }) => ({
      headline: item?.fieldTitle,
      body: item?.fieldDescription?.processed,
    }))
    return (
      <SpecificSpacing key={entity.uuid} {...resolveSpacings(entity.fieldSpacings)}>
        <TrialBlade
          title={entity.fieldTitle}
          subtitle={entity.fieldSubtitle}
          listItems={items}
          entity={entity}
        />
      </SpecificSpacing>
    )
  }

  if (entity.__typename.endsWith(`ParagraphResourceList`)) {
    const resources = entity.fieldResources.map(({ entity: resource }) => ({
      title: resource.fieldTitle,
      eyebrow: resource.fieldRichTitle?.processed,
      displayAsButton: resource.fieldBoolean,
      children: (
        <React.Fragment key={resource.uuid}>
          {resource.fieldImage?.entity && (
            <Image {...resolveImage(resource.fieldImage)} />
          )}
          {resource.fieldDescription?.processed && (
            <RichText variant='body' className='mb-4 mt-1'>
              <HtmlParser content={resource.fieldDescription?.processed} />
            </RichText>
          )}
          {resource.fieldBoolean
            ? resource.fieldLinks.map((link) => (
                <Button
                  as={Link}
                  variant='primary'
                  className='max-w-max'
                  to={link.url.path}
                >
                  {link.title}
                </Button>
              ))
            : resource.fieldLinks.map((link) => (
                <div>
                  <TextLink
                    key={link.url.path}
                    variant='a'
                    className='arrow-icon-tertiary tertiary-underline text-blue-700 after:inline-block after:content-["\e900"] hover:text-blue-700'
                    to={link.url.path}
                  >
                    {link.title}
                  </TextLink>
                </div>
              ))}
        </React.Fragment>
      ),
    }))

    return (
      <SpecificSpacing {...resolveSpacings(entity.fieldSpacings)}>
        <Wrapper key={entity.uuid} title={entity.fieldTitle}>
          <Resources
            items={resources}
            // use field column Count and fallback to resources length
            columns={entity.fieldColumnCount || resources?.length}
          />
        </Wrapper>
      </SpecificSpacing>
    )
  }

  if (entity.__typename.endsWith(`ParagraphQuote`)) {
    return (
      <SpecificSpacing {...resolveSpacings(entity.fieldSpacings)}>
        <Wrapper key={entity.uuid}>
          <Quote
            source={entity.fieldTitle}
            logoPosition={entity.fieldLogoPosition}
            variant={entity.fieldQuoteVariant}
            {...(entity.fieldImage && { image: resolveImage(entity.fieldImage) })}
          >
            {entity.fieldDescription?.processed}
          </Quote>
        </Wrapper>
      </SpecificSpacing>
    )
  }

  if (entity.__typename.endsWith(`ParagraphQuoteCombo`)) {
    const cta = entity.fieldLink && {
      text: entity.fieldLink.title,
      to: entity.fieldLink.url?.path,
    }
    const image = entity.fieldImage && resolveImage(entity.fieldImage)
    const graphic = entity.fieldGraphic && resolveImage(entity.fieldGraphic)
    return (
      <SpecificSpacing {...resolveSpacings(entity.fieldSpacings)}>
        <Wrapper key={entity.uuid}>
          <QuoteCombo
            attribution={entity.fieldAuthor}
            cta={cta}
            graphic={graphic}
            image={image}
          >
            {entity.fieldDescription?.processed}
          </QuoteCombo>
        </Wrapper>
      </SpecificSpacing>
    )
  }

  if (entity.__typename.endsWith(`ParagraphCtablockList`)) {
    const headingMap = {
      promo: "h5 mb-2.5",
      tile: "h4 mb-1",
      eyebrow: "h4 font-bold",
    }

    const ctaBlocks = entity.fieldItems?.map(({ entity: ctaBlock }) => {
      let description = ""

      if (ctaBlock.fieldTitle) {
        description += `<h3 class='${
          headingMap[entity.fieldCtaBlockVariant] || "h4"
        } mb-1'>${ctaBlock.fieldTitle}</h3>`
      }

      if (ctaBlock.fieldDescription?.processed) {
        description += `<div class="rich-text-body">${ctaBlock.fieldDescription?.processed}</div>`
      }

      return (
        <CtaBlock
          key={ctaBlock.uuid}
          eyebrow={ctaBlock?.fieldSubtitle}
          variant={entity.fieldCtaBlockVariant}
          description={description}
          image={
            entity.fieldEnabled[0]
              ? {
                  ...resolveImage(ctaBlock.fieldImage),
                  imageOptions: { className: "w-1/2" },
                }
              : resolveImage(ctaBlock.fieldImage)
          }
          cta={
            ctaBlock.fieldLink && {
              to: ctaBlock.fieldLink.url.path,
              text: ctaBlock.fieldLink.title,
            }
          }
        />
      )
    })

    const columnMap = {
      3: "1:3",
    }

    return (
      <SpecificSpacing {...resolveSpacings(entity.fieldSpacings)}>
        <Wrapper>
          <div className='pb-3 md:flex md:items-center md:justify-between md:pb-4'>
            <h2
              className={`text-navy-800 ${
                entity?.fieldThankYouUrl?.url ? "pb-1 md:w-9/12 md:pb-0" : ""
              }`}
            >
              {entity.fieldTitle}
            </h2>
            {entity?.fieldThankYouUrl?.url && (
              <TextButton
                to={entity?.fieldThankYouUrl?.url?.path}
                className='text-blue-700 hover:text-blue-700'
                variant='C'
              >
                {entity?.fieldThankYouUrl?.title}
              </TextButton>
            )}
          </div>
          <Grid
            columns={columnMap[entity.fieldColumnCount] || entity.fieldColumnCount}
            gap={entity?.fieldThankYouUrl?.url ? "3.2" : "5"}
            className={
              entity?.fieldThankYouUrl?.url
                ? "md:gap-2 lg:gap-4"
                : "md:gap-2 lg:gap-8 "
            }
          >
            {ctaBlocks}
          </Grid>
        </Wrapper>
      </SpecificSpacing>
    )
  }

  if (entity.__typename.endsWith(`ParagraphAccordionList`)) {
    const accordions = entity.fieldItems?.map((item) => {
      return {
        children: componentResolver(item.entity.fieldItems),
        description: item.entity.fieldDescription?.processed,
        key: item.entity.uuid,
      }
    })

    const variantMap = {
      basic: {
        type: undefined,
        allowAllOpen: false,
        showExpandAll: false,
      },
      large: { type: "large", allowAllOpen: true, showExpandAll: true },
      landing: { type: "default", allowAllOpen: false, showExpandAll: false },
      white: {
        type: "white",
        allowAllOpen: false,
        showExpandAll: false,
      },
    }

    return (
      <SpecificSpacing {...resolveSpacings(entity.fieldSpacings)}>
        <Wrapper title={entity.fieldTitle}>
          <AccordionList
            allowAllOpen={
              variantMap[entity?.fieldAccordionListVariant]?.allowAllOpen
            }
            showExpandAll={
              variantMap[entity?.fieldAccordionListVariant]?.showExpandAll
            }
            variant={variantMap[entity?.fieldAccordionListVariant]?.type}
            accordions={accordions}
          />
        </Wrapper>
      </SpecificSpacing>
    )
  }

  if (entity.__typename.endsWith(`ParagraphBasicAccordion`)) {
    const accordions = entity.fieldItems?.map((item) => {
      return {
        children: componentResolver(item.entity.fieldItems),
        description: item.entity.fieldDescription?.processed,
        key: item.entity.uuid,
      }
    })

    const variantMap = {
      basic: {
        type: undefined,
        allowAllOpen: false,
        showExpandAll: false,
      },
      large: { type: "large", allowAllOpen: true, showExpandAll: true },
      landing: { type: "default", allowAllOpen: false, showExpandAll: false },
    }

    return (
      <SpecificSpacing {...resolveSpacings(entity.fieldSpacings)}>
        <AccordionWrapper
          title={entity.fieldTitle}
          sectionTitle={entity.fieldSectionTitle}
        >
          <BasicAccordion
            itemsDisplay={entity?.fieldItemsDisplay}
            allowAllOpen={
              variantMap[entity?.fieldAccordionListVariant]?.allowAllOpen
            }
            showExpandAll={
              variantMap[entity?.fieldAccordionListVariant]?.showExpandAll
            }
            variant={variantMap[entity?.fieldAccordionListVariant]?.type}
            accordions={accordions}
          />
        </AccordionWrapper>
      </SpecificSpacing>
    )
  }

  if (entity.__typename.endsWith(`ParagraphCtaImageBlock`)) {
    const isAnimation = entity.fieldImage?.entity?.__typename.endsWith(
      "MediaLottieFile"
    )
      ? resolveLottie(entity.fieldImage)
      : null

    const isImage = entity.fieldImage?.entity?.__typename.endsWith("MediaImage")
      ? { image: resolveImage(entity.fieldImage) }
      : null

    const isVideo = entity.fieldImage?.entity?.__typename.endsWith("MediaVideo")
      ? {
          image: {
            videoSrc: entity.fieldImage?.entity.fieldMediaVideoFile?.entity?.url,
            ...resolveImage(entity?.fieldImage),
          },
        }
      : null

    const isRemoteVideo = entity.fieldImage?.entity?.__typename.endsWith(
      "MediaRemoteVideo"
    )
      ? {
          image: entity?.fieldImage?.entity?.gatsbyImageFile
            ? {
                videoSrc: entity.fieldImage?.entity.videoEmbedSrc,
                ...resolveImage(entity?.fieldImage),
              }
            : {
                videoSrc: entity?.fieldImage?.entity?.fieldMediaOembedVideo,
                imageOptions: resolveImage(entity?.fieldImage),
              },
        }
      : null

    const image = isImage || isVideo || isRemoteVideo
    const isTextLink = entity.fieldCtasStyle === "text_link"

    const link = entity.fieldLink && {
      to: entity.fieldLink.url?.path,
      label: entity.fieldLink.title,
    }

    return (
      <SpecificSpacing {...resolveSpacings(entity.fieldSpacings)}>
        <Wrapper
          id={`${entity.__typename}-${entity.uuid}`}
          key={entity.uuid}
          title={entity.fieldSectionTitle}
        >
          <CtaImageBlock
            imageLink={entity.fieldThankYouUrl?.url?.path}
            spaceBetween={entity.fieldInitialColumn}
            imageWidth={entity.fieldWidthColumns}
            imagePosition={entity.fieldImagePosition}
            cta={!isTextLink && link}
            ctaRow={entity.fieldItems}
            imageModal={entity.fieldImageModal}
            title={entity.fieldTitle}
            subtitle={entity.fieldIntro}
            verticalAlignment={entity.fieldVerticalAlignment}
            displayShadow={entity.fieldDisplayShadow}
            lottie={isAnimation}
            textLink={isTextLink && link}
            {...image}
          >
            <HtmlParser content={entity.fieldDescription?.processed} />
          </CtaImageBlock>
        </Wrapper>
      </SpecificSpacing>
    )
  }

  if (entity.__typename.endsWith(`ParagraphCardList`)) {
    const cards = entity.fieldItems?.map((item) => {
      const spacingMap = {
        resource: "mb-1.5",
      }

      const spacing = spacingMap[entity.fieldCardVariant] || "mb-2"

      let description = ""
      const link = {
        text: item.entity.fieldLink?.title,
        to: item.entity.fieldLink?.url.path,
      }
      if (item.entity.fieldIntro) {
        description += `<p class="h6 ${spacing}">${item.entity.fieldIntro}</p>`
      }
      if (item.entity.fieldTitle) {
        description += `<p class="h4 font-bold ${spacing}">${item.entity.fieldTitle}</p>`
      }
      if (item.entity.fieldDescription?.processed) {
        description += `<div class="b4">${item.entity.fieldDescription?.processed}</div>`
      }
      return (
        <Card
          key={item.entity.uuid}
          variant={entity.fieldCardVariant}
          image={
            entity.fieldEnabled[0]
              ? {
                  ...resolveImage(item.entity.fieldImage),
                  imageOptions: { className: "w-1/2 m-auto" },
                }
              : item.entity.fieldImage && resolveImage(item.entity.fieldImage)
          }
          cta={item.entity.fieldLink && link}
          description={description}
          additionalLinks={item.entity.fieldLinks}
          removeHover={item.entity.fieldRemoveHover}
        />
      )
    })
    return (
      <PersonalizationWrapper entity={entity?.fieldItem?.entity} key={entity.uuid}>
        <SpecificSpacing {...resolveSpacings(entity.fieldSpacings)}>
          <Wrapper
            key={entity.uuid}
            title={entity.fieldTitle}
            className='component-cardlist card-list'
          >
            {entity.fieldDescription?.processed && (
              <RichText className='mb-5'>
                <HtmlParser content={entity.fieldDescription?.processed} />
              </RichText>
            )}
            <Grid
              columns={entity.fieldColumnCount}
              gap='2'
              className='lg:gap-x-4 lg:gap-y-4'
            >
              {cards}
            </Grid>
          </Wrapper>
        </SpecificSpacing>
      </PersonalizationWrapper>
    )
  }

  if (entity.__typename.endsWith(`ParagraphInnerMenu`)) {
    const items = entity.fieldLinks.map((item) => {
      return {
        text: item.title,
        to: item.url.path,
        key: item.title,
      }
    })
    return (
      <SpecificSpacing {...resolveSpacings(entity.fieldSpacings)}>
        <Wrapper key={entity.uuid} title={entity.fieldTitle}>
          <InnerMenu items={items} />
        </Wrapper>
      </SpecificSpacing>
    )
  }

  if (entity.__typename.endsWith(`ParagraphVideoTranscript`)) {
    const transcripts = entity.fieldItems.map((item) => {
      const timeSeconds = item.entity.fieldCount
      return {
        title: item.entity.fieldTitle,
        startTime: `${String(Math.floor(timeSeconds / 60)).padStart(
          2,
          "0"
        )}:${String(timeSeconds % 60).padStart(2, "0")}
        `,
        timeSeconds,
        transcript: item.entity.fieldDescription?.processed,
        timestamps: entity.showTimestamps,
      }
    })

    return (
      <SpecificSpacing {...resolveSpacings(entity.fieldSpacings)}>
        <Wrapper>
          <VideoTranscript
            title={entity.fieldTitle}
            subTitle={entity.fieldSubtitle}
            description={entity.fieldDescription?.processed}
            transcripts={transcripts}
          />
        </Wrapper>
      </SpecificSpacing>
    )
  }

  if (entity.__typename.endsWith(`ParagraphCtaCards`)) {
    const ctaCards = entity.fieldItems.map(({ entity: ctaCard }) => {
      const link = ctaCard.fieldLink && {
        to: ctaCard.fieldLink.url.path,
        text: ctaCard.fieldLink.title,
      }

      return (
        <Card
          key={ctaCard.uuid}
          variant='iconSmall'
          image={resolveImage(ctaCard.fieldImage)}
          cta={link}
          description={ctaCard.fieldDescription?.processed}
        />
      )
    })
    const cta = entity.fieldLink && {
      to: entity.fieldLink.url.path,
      label: entity.fieldLink.title,
    }

    return (
      <SpecificSpacing {...resolveSpacings(entity.fieldSpacings)}>
        <Wrapper key={entity.uuid} title={entity.fieldTitle}>
          <CtaCard cta={cta} cards={ctaCards}>
            {entity.fieldDescription?.processed}
          </CtaCard>
        </Wrapper>
      </SpecificSpacing>
    )
  }

  if (entity.__typename.endsWith(`ParagraphCtaHeximagelist`)) {
    const ctas = entity.fieldCtas?.map((cta) => ({
      label: cta.title,
      to: cta.url.path,
    }))

    const hexImageList = entity.fieldItems.map((item) => {
      const image = resolveImage(item.entity.fieldImage)
      const cta = item.entity.fieldLink && {
        to: item.entity.fieldLink.url.path,
        label: item.entity.fieldLink.title,
      }
      return {
        image,
        cta,
        title: item.entity.fieldTitle,
        children: item.entity.fieldDescription?.processed,
      }
    })

    return (
      <SpecificSpacing {...resolveSpacings(entity.fieldSpacings)}>
        <CtaHexImageList
          key={entity.uuid}
          ctas={ctas}
          items={hexImageList}
          title={entity.fieldTitle}
        />
      </SpecificSpacing>
    )
  }

  if (entity.__typename.endsWith(`ParagraphLogoGrid`)) {
    const gridSpacings = resolveGridSpacings(entity)
    const defaultSharedGridSpacings = {
      wrapperGap: 2,
      imageClassName: "logo-grid-item max-w-25 w-auto max-h-6 mx-auto",
      imgStyle: {
        maxHeight: "60px",
        width: "auto",
        margin: "0 auto",
      },
    }
    const defaultGridSpacingsSingle = {
      wrapperClassName: "md:gap-8",
      imageWrapperClassname: "pb-4 md:pb-6",
      ...defaultSharedGridSpacings,
    }
    const defaultGridSpacingsMultiple = {
      wrapperClassName: "gap-y-4 md:gap-8 md:gap-y-12",
      imageWrapperClassname: "",
      ...defaultSharedGridSpacings,
    }
    const overrideGridSpacings = { wrapperClassName: gridSpacings }

    // TODO: add gridSpacings for single variant (slider)
    const variantMap = {
      single: {
        multipleRows: false,
        columns: entity.fieldColumnCount,
        ...defaultGridSpacingsSingle,
      },
      multiple: {
        multipleRows: true,
        columns: [entity.fieldCount || 3, entity.fieldColumnCount],
        ...(gridSpacings ? overrideGridSpacings : defaultGridSpacingsMultiple),
      },
    }
    const variant = variantMap[entity.fieldLogoGridVariant]
    return (
      <SpecificSpacing {...resolveSpacings(entity.fieldSpacings)}>
        <Wrapper key={entity.uuid} title={entity.fieldTitle} className='logo-grid'>
          <RowsCarousel
            style={{ overflow: "hidden" }}
            multipleRows={variant?.multipleRows}
            description={entity.fieldBody?.processed}
            footer={entity.fieldDescription?.processed}
            columns={variant?.columns}
            gap={variant?.wrapperGap}
            autoplay
            className={`logo-grid ${variant?.wrapperClassName}`}
          >
            {entity.fieldImages?.map((item) => {
              return (
                <div
                  className={`grid h-full items-center ${variant.imageWrapperClassname}`}
                  key={`carousuel-item-${item.entity.uuid}`}
                >
                  <Image
                    imageOptions={{
                      className: variant.imageClassName,
                      imgStyle: variant.imgStyle,
                    }}
                    {...resolveImage(item)}
                  />
                </div>
              )
            })}
          </RowsCarousel>
        </Wrapper>
      </SpecificSpacing>
    )
  }

  if (entity.__typename.endsWith(`ParagraphCtaSection`)) {
    return (
      <SpecificSpacing {...resolveSpacings(entity.fieldSpacings)}>
        <CtaSection
          variantType={entity.fieldCtasectionVariant}
          key={entity.uuid}
          cta={
            entity.fieldLink && {
              label: entity.fieldLink?.title,
              to: entity.fieldLink?.url.path,
            }
          }
        >
          {entity.fieldDescription?.processed}
        </CtaSection>
      </SpecificSpacing>
    )
  }

  if (entity.__typename.endsWith(`ParagraphTabList`)) {
    const tabContent = entity.fieldItems?.map((item) => {
      const image =
        item.entity.fieldImage &&
        (item.entity.fieldImage?.__typename === "Drupal_MediaImage"
          ? { image: resolveImage(item.entity.fieldImage) }
          : {
              videoSrc:
                item.entity.fieldImage?.entity.videoEmbedSrc ||
                item.entity.fieldImage?.entity.fieldMediaVideoFile?.entity?.url,
              image: { ...resolveImage(item?.entity?.fieldImage), alt: "video" },
            })

      const thankYouUrl = item?.entity?.fieldThankYouUrl

      // Wrap the image element if a link is available
      let imageElement = image?.image ? (
        <Image {...image.image} alt={thankYouUrl?.title || "img"} />
      ) : null

      if (thankYouUrl?.uri && image?.image) {
        imageElement = (
          <Link to={thankYouUrl?.uri}>
            <Image {...image?.image} alt={thankYouUrl?.title || "img"} />
          </Link>
        )
      }

      return {
        label: item.entity.fieldTitle,
        value: (
          <>
            {image &&
              (image.videoSrc ? (
                <ThumbnailModal videoSrc={image.videoSrc} {...image.image} />
              ) : (
                imageElement
              ))}

            {item.entity.fieldItems.length ? (
              <div className='flex flex-col gap-2 p-4'>
                {item.entity.fieldItems.map((value) => resolve(value.entity))}
                {item.entity.fieldLink && (
                  <Link
                    to={item.entity.fieldLink.url.path}
                    className='flex flex-row items-center gap-2'
                  >
                    {item.entity.fieldLink.title}
                    <IconResolver token='arrowRight' />
                  </Link>
                )}
              </div>
            ) : null}
          </>
        ),
      }
    })

    return (
      <SpecificSpacing {...resolveSpacings(entity.fieldSpacings)}>
        <Wrapper key={entity.uuid} title={entity.fieldTitle}>
          <Tab content={tabContent} tabPosition={entity.fieldControlsPosition} />
        </Wrapper>
      </SpecificSpacing>
    )
  }

  if (entity.__typename.endsWith(`ParagraphSlider`)) {
    const sliderItems = entity.fieldItems.map((item) => {
      const image =
        item.entity.fieldImage &&
        (item.entity.fieldImage.__typename === "Drupal_MediaImage" ||
        item.entity.fieldImage?.entity?.__typename === "MediaImage"
          ? { image: resolveImage(item.entity.fieldImage) }
          : {
              videoSrc:
                item.entity.fieldImage?.entity.videoEmbedSrc ||
                item.entity.fieldImage?.entity.fieldMediaVideoFile?.entity?.url,
              image: resolveImage(item.entity.fieldImage),
            })

      return {
        key: item.entity.uuid,
        headerImage:
          item.entity.fieldHeaderImage && resolveImage(item.entity.fieldHeaderImage),
        ...image,
        headerTitle: item.entity.headerTitle,
        cta: {
          label: item.entity.fieldLink?.title,
          to: item.entity.fieldLink?.url.path,
        },
        content: (
          <>
            {item.entity.fieldTitle && (
              <h2 className='swiper-no-swiping cursor-default'>
                {item.entity.fieldTitle}
              </h2>
            )}
            {item.entity.fieldBody?.processed && (
              <RichText className='swiper-no-swiping b4 cursor-default'>
                <HtmlParser content={item.entity.fieldBody?.processed} />
              </RichText>
            )}
            {item.entity.footerData?.processed && (
              <RichText className='swiper-no-swiping b5 text-dark-gray cursor-default'>
                <HtmlParser content={item.entity.footerData?.processed} />
              </RichText>
            )}
          </>
        ),
      }
    })
    return (
      <SpecificSpacing {...resolveSpacings(entity.fieldSpacings)}>
        <Wrapper key={entity.uuid} title={entity.fieldTitle}>
          <Slider
            enableControls={sliderItems?.length > 1}
            items={sliderItems}
            controlsPosition={entity.fieldControlsPosition}
            imageWidth={entity.fieldImageSize}
          />
        </Wrapper>
      </SpecificSpacing>
    )
  }

  if (entity.__typename.endsWith(`ParagraphCustomerHubCards`)) {
    return (
      <SpecificSpacing {...resolveSpacings(entity.fieldSpacings)}>
        <Wrapper
          className='bg-gray-warm-medium'
          style={{ padding: "64px 0" }}
          key={entity.uuid}
          title={entity.fieldTitle}
        >
          {entity.fieldDescription?.processed && (
            <RichText className='b2 mb-2.5'>
              <HtmlParser content={entity.fieldDescription?.processed} />
            </RichText>
          )}
          <CustomerHub />
        </Wrapper>
      </SpecificSpacing>
    )
  }

  if (entity.__typename.endsWith(`ParagraphDemoCenterLibrary`)) {
    return (
      <SpecificSpacing key={entity.uuid} {...resolveSpacings(entity.fieldSpacings)}>
        <Wrapper style={{ padding: "75px 0", margin: "0" }} className='bg-oat-light'>
          <DemoCenter />
        </Wrapper>
      </SpecificSpacing>
    )
  }

  if (entity.__typename.endsWith(`ParagraphVideoPlaylist`)) {
    const items = entity.fieldItems.map((item) => {
      return {
        id: item.entity.uuid,
        title: item.entity.fieldTitle,
        subtitle: item.entity.fieldIntro,
        description: item.entity.fieldSectionTitle,
        footer: item.entity.fieldRole,
        mediaButton: item.entity.fieldEnabled[0],
        video: {
          label: item.entity.fieldLink.title,
          to: item.entity.fieldLink.url.path,
        },
        image: item.entity.fieldImage && resolveImage(item.entity.fieldImage),
      }
    })
    return (
      <SpecificSpacing {...resolveSpacings(entity.fieldSpacings)}>
        <Wrapper key={entity.uuid} title={entity.fieldTitle}>
          <PlaylistVideo
            items={items}
            rightVideo={entity.fieldImagePosition === "right"}
          />
        </Wrapper>
      </SpecificSpacing>
    )
  }

  if (entity.__typename.endsWith(`ParagraphCustomComponent`)) {
    const ParagraphElement = () => {
      switch (entity.fieldComponentName) {
        case "featured_stories":
          return <FeaturedStories />
        case "resources":
          return (
            <Wrapper>
              <NewsroomResources />
            </Wrapper>
          )
        case "pricing_calculator":
          return <PricingCalculatorWrapper />

        case "press_releases":
          return (
            <Wrapper>
              <PressReleases />
            </Wrapper>
          )

        case "glossary":
          return <GlossaryOverview />

        case "event":
          return <EventOverview />

        case "resources_overview":
          return <Resourcesoverview />

        case "job_openings":
          return <JobOpenings data={pageContext?.data} />

        case "research_publications":
          return (
            <ResearchPublications
              title={entity?.fieldTitle}
              description={entity?.fieldBody?.processed}
            />
          )
        default:
          return <></>
      }
    }
    return (
      <SpecificSpacing {...resolveSpacings(entity.fieldSpacings)}>
        <ParagraphElement />
      </SpecificSpacing>
    )
  }

  if (entity.__typename.endsWith(`ParagraphResourceAgenda`)) {
    const items = entity.fieldAgendaItems.map((item) => {
      const getAgendaTimeRange = (startTime, endTime) => {
        if (
          startTime &&
          endTime &&
          startTime.includes(" AM") &&
          endTime.includes(" AM")
        ) {
          return `${startTime.replace(" AM", "")}-${endTime}`
        }
        if (
          startTime &&
          endTime &&
          startTime.includes(" PM") &&
          endTime.includes(" PM")
        ) {
          return `${startTime.replace(" PM", "")}-${endTime}`
        }
        if (startTime && endTime) {
          return `${startTime}-${endTime}`
        }
        return ""
      }

      return {
        key: item.entity.uuid,
        title: getAgendaTimeRange(
          item.entity.fieldStartDate?.date,
          item.entity.fieldEndDate?.date
        ),
        description: item.entity.fieldDescription?.processed,
        footer: item.entity.fieldCompany,
      }
    })
    return (
      <Wrapper key={entity.uuid} title={entity.fieldTitle}>
        <Agenda items={items} />
      </Wrapper>
    )
  }

  if (entity.__typename.endsWith(`ParagraphCardSlider`)) {
    const items = entity.fieldItems.map((item) => {
      const description = `
        ${
          item.entity.fieldIntro
            ? `<div class="h6 mb-2">${item.entity.fieldIntro}</div>`
            : ""
        }
        ${
          item.entity.fieldTitle
            ? `<div class="h4 mb-2 font-bold">${item.entity.fieldTitle}</div>`
            : ""
        }
        ${
          item.entity.fieldDescription?.processed
            ? `<div class="b4">${item.entity.fieldDescription?.processed}</div>`
            : ""
        }
        `

      return {
        id: item.entity.uuid,
        content: (
          <Card
            variant='resource'
            key={item.entity.uuid}
            image={resolveImage(item.entity.fieldImage)}
            cta={{
              to: item.entity.fieldLink?.url.path,
              text: item.entity.fieldLink?.title,
            }}
            description={description}
          />
        ),
      }
    })

    const variant =
      entity.fieldCardSliderVariant === "dots"
        ? { pagination: true, controls: false }
        : { controls: true }

    return (
      <SpecificSpacing {...resolveSpacings(entity.fieldSpacings)}>
        <Wrapper key={entity.uuid} title={entity.fieldTitle}>
          <PlaySlider columns={[1, 3]} {...variant} items={items} />
        </Wrapper>
      </SpecificSpacing>
    )
  }

  if (entity.__typename.endsWith(`ParagraphImageSlider`)) {
    const columns = [1, 2, entity.fieldColumnCount]
    const items = entity.fieldItems
      .map((item) => {
        if (!item?.entity) {
          return false
        }

        const image = resolveImage(item.entity.fieldImage)
        const ComponentWrapper = item.entity.fieldLink ? Link : React.Fragment

        return {
          id: item.entity.uuid,
          content: (
            <ComponentWrapper
              key={item.entity.uuid}
              {...(item.entity.fieldLink && {
                to: item.entity.fieldLink.url.path,
              })}
            >
              <Image {...image} />
            </ComponentWrapper>
          ),
        }
      })
      .filter(Boolean)

    return (
      <Wrapper key={entity.uuid}>
        <PlaySlider
          columns={
            entity.fieldColumnCount === 1
              ? entity.fieldColumnCount
              : columns.slice(0, entity.fieldColumnCount)
          }
          items={items}
        />
      </Wrapper>
    )
  }

  if (entity.__typename.endsWith(`ParagraphFeaturedTextBox`)) {
    return (
      <SpecificSpacing {...resolveSpacings(entity.fieldSpacings)}>
        <Wrapper key={entity.uuid}>
          <FeatureTextBox
            cta={
              entity.fieldLink && {
                label: entity.fieldLink?.title,
                to: entity.fieldLink?.url.path,
              }
            }
            {...(entity.fieldImage && { image: resolveImage(entity.fieldImage) })}
          >
            {entity.fieldDescription?.processed}
          </FeatureTextBox>
        </Wrapper>
      </SpecificSpacing>
    )
  }

  if (entity.__typename.endsWith(`ParagraphPromoRow`)) {
    const animationField = entity.fieldImage?.entity.__typename.endsWith(
      `MediaLottieFile`
    )
      ? resolveLottie(entity.fieldImage)
      : null

    const imageVideo = entity.fieldImage?.entity.__typename.endsWith(`MediaImage`)
      ? resolveImage(entity.fieldImage)
      : null

    const videoField = entity.fieldImage?.entity.__typename.endsWith(`MediaVideo`)
      ? entity.fieldImage?.entity.fieldMediaVideoFile?.entity?.url
      : null

    const remoteVideo = entity.fieldImage?.entity.__typename.endsWith(
      `MediaRemoteVideo`
    )
      ? entity.fieldImage?.entity.videoEmbedSrc
      : null

    const videoImage = resolveImage(entity?.fieldImage)

    return (
      <SpecificSpacing {...resolveSpacings(entity.fieldSpacings)}>
        <Wrapper key={entity.uuid}>
          <PromoRow
            eyebrow={entity.fieldTextUnlimited}
            body={entity.fieldDescription?.processed}
            cta={{
              label: entity.fieldLink?.title,
              to: entity.fieldLink?.url?.path,
            }}
            headline={entity.fieldTitle}
            border={entity.fieldBorderStyle}
            bgColor={entity.fieldTitleColorToken || "white"}
            borderColor={entity.fieldBorderColor}
            eyebrowColor={entity.fieldBackgroundToken}
            titleColor={entity.fieldBackgroundColor}
            headlineTag='h3'
            outerPaddingTop={entity.fieldTopSpacing || undefined}
            outerPaddingBottom={entity.fieldBottomSpacing || undefined}
            innerPaddingTop={entity.fieldTopSpacingDesktop || undefined}
            innerPaddingBottom={entity.fieldBottomSpacingDesktop || undefined}
            image={imageVideo}
            videoSrc={videoField || remoteVideo}
            lottie={animationField}
            videoImage={videoImage}
          />
        </Wrapper>
      </SpecificSpacing>
    )
  }

  if (entity.__typename.endsWith(`ParagraphLogoWheel`)) {
    const logoWheelCta = {
      to: entity.fieldLink.url.path,
      label: entity.fieldLink.title,
      variant: "secondary",
    }
    return (
      <SpecificSpacing {...resolveSpacings(entity.fieldSpacings)}>
        <Wrapper key={entity.uuid}>
          <LogoWheel
            title={entity.fieldTitle}
            content={entity.fieldBody.processed}
            wheelImg={entity.fieldImage.entity.gatsbyImageFile.publicURL}
            pauseAriaLabel='Pause tools and integrations animation'
            playArialLabel='Play tools and integrations animation'
            cta={logoWheelCta}
          />
        </Wrapper>
      </SpecificSpacing>
    )
  }

  if (entity.__typename.endsWith(`ParagraphTeamSlider`)) {
    const sliderData = entity.fieldItems.map((slide) => {
      return {
        id: slide.entity.uuid,
        content: (
          <>
            <div className='my-4'>
              <FeatureTextBox
                cta={{
                  label: slide.entity.fieldItem.entity.fieldLink?.title,
                  to: slide.entity.fieldItem.entity.fieldLink?.url.path,
                }}
                image={resolveImage(slide.entity.fieldItem.entity.fieldImage)}
              >
                {slide.entity.fieldItem.entity.fieldDescription?.processed}
              </FeatureTextBox>
            </div>
            <Grid
              columns={
                slide.entity.fieldItems.length <= 3
                  ? `${slide.entity.fieldItems.length}:4`
                  : "2:4"
              }
              gap={6}
              className='gap-y-4 md:gap-2 lg:gap-4'
            >
              {slide.entity.fieldItems.map((speaker) => {
                const description = `<p class="title h6">${speaker.entity.fieldTitle}</p><p class='h6'>${speaker.entity.fieldRole}</p>`
                return (
                  <CtaBlock
                    variant='profileGray'
                    key={speaker.entity.uuid}
                    image={resolveImage(speaker.entity.fieldImage)}
                    description={description}
                  />
                )
              })}
            </Grid>
          </>
        ),
      }
    })
    return (
      <SpecificSpacing {...resolveSpacings(entity.fieldSpacings)}>
        <Wrapper key={entity.uuid} title={entity.fieldTitle}>
          {entity.fieldDescription?.processed && (
            <RichText className='h4'>{entity.fieldDescription?.processed}</RichText>
          )}
          <SimpleSlider items={sliderData} />
        </Wrapper>
      </SpecificSpacing>
    )
  }

  if (entity.__typename.endsWith(`ParagraphAccordionTable`)) {
    const columns =
      // Generate n number of columns
      Array.from(Array(entity.fieldColumnCount).keys()).map((i) => {
        const individualWidth = Math.floor(12 / Math.max(4, entity.fieldColumnCount))
        return {
          Header: `column${i + 1}`,
          accessor: `column${i + 1}`,
          columnWidth:
            i === 0
              ? Math.floor(
                  Math.max(
                    individualWidth,
                    12 - (entity.fieldColumnCount - 1) * individualWidth
                  )
                )
              : individualWidth,
        }
      })

    // convert flat array to nested array
    const nestedArray = convertToTableNestedArray(entity.fieldItems)

    return (
      <SpecificSpacing {...resolveSpacings(entity.fieldSpacings)}>
        <Wrapper id={`${entity.__typename}-${entity.uuid}`} key={entity.uuid}>
          <AccordionTable
            title={entity.fieldTitle}
            columnsData={columns}
            data={nestedArray}
            expandedBehavior={entity.fieldItemsDisplay}
          />
        </Wrapper>
      </SpecificSpacing>
    )
  }

  if (entity.__typename.endsWith(`ParagraphPricingTable`)) {
    const columns =
      // Generate n number of columns
      Array.from(Array(entity.fieldColumnCount).keys()).map((i) => {
        return {
          header: entity.fieldResources?.[i].entity.fieldTitle,
          description: entity.fieldResources?.[i].entity.fieldBody?.processed,
          accessor: `column${i + 1}`,
          id: `column${i + 1}`,
          columnWidth: 12 / entity.fieldColumnCount,
        }
      })

    // convert flat array to nested array
    const nestedArray = convertToTableNestedArray(entity.fieldItems)

    return (
      <Wrapper className='pricing-table' key={entity.uuid}>
        {entity.fieldTitle && (
          <h1 className='mb-4 md:mb-1 md:w-8/12'>{entity.fieldTitle}</h1>
        )}
        {entity.fieldDescription?.processed && (
          <RichText className='b2 mb-5 md:mb-4 md:w-8/12'>
            {entity.fieldDescription?.processed}
          </RichText>
        )}
        <PricingTable columnsData={columns} data={nestedArray} />
      </Wrapper>
    )
  }

  if (entity.__typename.endsWith(`ParagraphTechnicalTable`)) {
    const rowsToFill = []

    const headerRows = entity?.fieldAgendaItems?.map((item) => {
      return {
        horizontalAlign: item.entity?.fieldHorizontalAlignment,
        verticalAlign: item.entity?.fieldVerticalAlignment,
        rows: item.entity?.fieldItems?.map((field) => {
          const fieldDescription = field.entity?.fieldDescription?.processed
          const rowspan = field.entity?.fieldCount
          const colspan = field.entity?.fieldColumnCount
          const cell = { content: fieldDescription }
          cell.horizontalAlign = field.entity?.fieldHorizontalAlignment
          cell.verticalAlign = field.entity?.fieldVerticalAlignment
          cell.columnHorizontalAlign = field.entity?.fieldColumnHorizontalAlignmen
          cell.columnVerticalAlign = field.entity?.fieldColumnVerticalAlignment
          if (rowspan !== null) {
            cell.rowspan = rowspan
          }

          if (colspan !== null) {
            cell.colspan = colspan
          }

          return cell
        }),
      }
    })

    const formatCell = (items, index, rowIndex) => {
      const values = items.entity
      const fieldDescription = values.fieldDescription?.processed
      const { fieldIconType, fieldOrientation, fieldBackgroundToken } = values

      const cell = { children: fieldDescription }
      cell.icon = values.fieldIconType
      cell.align = values.fieldVerticalAlignment || "top"
      cell.bgColor = fieldBackgroundToken || null
      cell.verticalAlign = values?.fieldVerticalAlignment
      cell.horizontalAlign = values.fieldHorizontalAlignment
      cell.columnHorizontalAlign = null
      cell.columnVerticalAlign = null
      if (fieldIconType) {
        cell.iconPosition = "top"
        cell.align = "center"
      }

      if (fieldOrientation === "vertical") {
        cell.iconPosition = "top"
      }

      if (fieldOrientation === "horizontal") {
        cell.iconPosition = "left"
      }

      cell.rowspan = values.fieldColumnCount
      cell.colspan = values.fieldCount

      if (cell.rowspan > 1) {
        rowsToFill.push({ rowspan: cell.rowspan - 1, position: index, rowIndex })
      }

      return cell
    }

    const bodyRows = entity?.fieldItems?.map((item, rowIndex) => {
      const row = {
        bgColor: item?.entity?.fieldBackgroundToken,
        verticalAlign: item?.entity?.fieldVerticalAlignment,
        horizontalAlign: item?.entity?.fieldHorizontalAlignment,
        row: item?.entity?.fieldItems?.map((field, index) =>
          formatCell(field, index, rowIndex)
        ),
        subRows: item?.entity?.fieldResources?.map((subRow) =>
          subRow.entity.fieldItems.map((field, index) =>
            formatCell(field, index, rowIndex)
          )
        ),
      }

      rowsToFill.forEach((element) => {
        if (element.rowIndex === rowIndex || element.rowspan === 0) return
        row.row.splice(element.position, 0, {
          isHidden: true,
        })
        element.rowspan--
      })
      return row
    })

    const firstHeader = typeof headerRows !== "undefined" ? headerRows[0] : null

    const applyColumnAligns = (rows, columnIndex) => {
      rows.forEach((row) => {
        const currentCell = row.row && row.row[columnIndex]
        if (currentCell) {
          currentCell.columnHorizontalAlign =
            firstHeader.rows[columnIndex]?.columnHorizontalAlign ||
            currentCell.columnHorizontalAlign
          currentCell.columnVerticalAlign =
            firstHeader.rows[columnIndex]?.columnVerticalAlign ||
            currentCell.columnVerticalAlign
        }

        if (row.subRows && row.subRows.length > 0) {
          applyColumnAligns(row.subRows, columnIndex)
        }
      })
    }

    if (typeof bodyRows === "undefined") {
      return <></>
    }

    bodyRows.forEach((bodyRow) => {
      bodyRow.row.forEach((cell, columnIndex) => {
        applyColumnAligns([bodyRow], columnIndex)
      })
    })

    const formattedData = { headerRows, bodyRows }
    return (
      <SpecificSpacing {...resolveSpacings(entity.fieldSpacings)} key={entity.uuid}>
        <Wrapper id={entity.uuid}>
          <TechnicalTable
            tableType={entity?.fieldTechnicalTableVariant || "guidance"}
            tableData={formattedData}
            caption={entity?.fieldTitle}
          />
        </Wrapper>
      </SpecificSpacing>
    )
  }

  if (entity.__typename.endsWith(`ParagraphFeatureList`)) {
    return (
      <SpecificSpacing {...resolveSpacings(entity.fieldSpacings)}>
        <FeatureList title={entity.fieldTitle} items={entity.fieldItems} />
      </SpecificSpacing>
    )
  }
  if (entity.__typename.endsWith(`ParagraphHorizontalForm`)) {
    const form = entity?.fieldItem?.entity
    const formCustom = {
      __typename: form?.__typename,
      uuid: form?.uuid,
      fieldTitle: form?.fieldTitle,
      fieldCloudType: form?.fieldCloudType,
      fieldFreeTrialDisplayType: "sidebar",
      fieldLink: {
        url: {
          path: form?.fieldLink?.url?.path,
        },
        title: form?.fieldLink?.title,
      },
      fieldThankYouUrl: {
        url: {
          path: form?.fieldThankYouUrl?.url?.path,
        },
      },
    }
    return (
      <SpecificSpacing key={entity?.uuid} {...resolveSpacings(entity.fieldSpacings)}>
        <HorizontalForm
          title={entity.fieldTitle}
          description={entity.fieldDescription?.processed}
          body={entity.fieldBody?.processed}
          image={entity.fieldImage && resolveImage(entity.fieldImage)}
          variant={entity.fieldBoolean ? "withBorderLine" : "fullBleed"}
          isMktoForm={entity.fieldItem?.entity?.__typename.endsWith(
            "ParagraphMarketoForm"
          )}
        >
          {form?.__typename?.endsWith("ParagraphCustomForm")
            ? formCustom && (
                <FormCustom hasOptionalFields={false} entity={formCustom} />
              )
            : form && (
                <MarketoForm
                  formClassName='mktoHorizontalForm'
                  cookieName={form?.fieldEnabled?.[0] && form?.fieldKey}
                  thankyou={form?.fieldThankYouUrl?.url?.path}
                  useMarketoThankYouUrl={form?.fieldBoolean}
                  formId={form?.fieldFormId}
                  gated={form?.fieldGated}
                  disableAutoSubmit={form?.fieldDisableAutoSubmit}
                  disableFormPrefill={form?.fieldDisableFormPrefill}
                  cta={form?.fieldFormCta}
                  legalCopy={form?.fieldBody?.processed}
                  title={form?.fieldTitle}
                />
              )}
        </HorizontalForm>
      </SpecificSpacing>
    )
  }

  if (entity.__typename.endsWith(`ParagraphPricingCards`)) {
    if (entity.fieldPricingCardVariant === "light") {
      const cards = entity.fieldItems?.map((item) => {
        const link = {
          title: item.entity.fieldLink?.title,
          url: item.entity.fieldLink?.url.path,
        }
        // TODO add dynamic price, right now hardcoded to key field

        return (
          <PricingCard
            key={item.entity.fieldKey}
            eyebrow={item.entity.fieldIntro}
            type={item.entity.fieldTitle}
            content={item.entity.fieldDescription?.processed}
            price={item.entity.fieldKey}
            disclaimer={item.entity.fieldDisclaimer}
            subtitle={item.entity.fieldSubtitle}
            cta={item.entity.fieldLink && link}
            variant={entity.fieldPricingCardVariant}
          />
        )
      })

      return (
        <Wrapper key={entity.uuid} title={entity.fieldTitle}>
          <Grid columns={3} gap={3}>
            {cards}
          </Grid>
        </Wrapper>
      )
    }
    // warm variant
    return <PricingTiles key={entity.uuid} items={entity.fieldItems} />
  }

  if (entity.__typename.endsWith(`ParagraphPricingSection`)) {
    const elements = componentResolver(entity.fieldItems)
    return (
      <SpecificSpacing {...resolveSpacings(entity.fieldSpacings)}>
        <PricingSection
          key={entity.uuid}
          title={entity.fieldTitle}
          filters={entity.fieldPricingFilters || []}
          availableClouds={entity.fieldAvailableClouds || []}
          availablePlans={entity.fieldAvailablePlans || []}
          regionList={entity.fieldRegionList}
        >
          {elements}
        </PricingSection>
      </SpecificSpacing>
    )
  }

  if (entity.__typename.endsWith(`ParagraphPricingFeatureTable`)) {
    return (
      <PricingFeatureTable
        key={entity.uuid}
        title={entity.fieldTitle}
        columnCount={entity.fieldColumnCount}
        filters={entity.fieldResources || []}
        wholeFilter={entity.fieldItem}
        items={entity.fieldItems}
        hideTopControls={!entity.fieldEnabled[0]}
      />
    )
  }

  if (entity.__typename.endsWith(`ParagraphPricingAccordion`)) {
    return (
      <PricingAccordions
        title={entity.fieldTitle}
        key={entity.uuid}
        items={entity.fieldItems}
      />
    )
  }

  if (entity.__typename.endsWith(`ParagraphSectionId`)) {
    let anchor = entity.fieldKey
    if (anchor.startsWith("#")) {
      anchor = anchor.substring(1)
    }

    return <div key={entity.uuid} id={anchor} />
  }

  if (entity.__typename.endsWith(`ParagraphPricingCta`)) {
    const ctas = entity.fieldCtas?.map((cta) => ({
      text: cta.title,
      to: cta.url.path,
    }))

    return (
      <PricingCta
        ctas={ctas}
        filter={entity?.fieldItem}
        key={entity?.uuid}
        title={entity?.fieldTitle}
        bottomText={entity?.fieldItems}
      >
        {entity?.fieldDescription?.processed}
      </PricingCta>
    )
  }

  if (entity.__typename.endsWith(`ParagraphPricingRichtext`)) {
    return (
      <PricingRichtext
        key={entity.uuid}
        title={entity.fieldTitle}
        body={
          entity.fieldDescription?.processed && (
            <HtmlParser content={entity.fieldDescription?.processed} />
          )
        }
        filter={entity.fieldItem}
      />
    )
  }

  if (entity.__typename.endsWith(`ParagraphSecondaryMenu`)) {
    const cta = entity?.fieldLink && {
      label: entity?.fieldLink.title,
      to: entity?.fieldLink.url.path,
    }
    const isCareersMenu =
      entity?.fieldLinks && entity.fieldLinks[0].url.path === "/company/careers"
    const items = entity.fieldLinks?.map((item) => {
      return {
        to: item.url?.path,
        label: item.title,
      }
    })
    return (
      <StickyNavigation
        key={entity.uuid}
        showBorder
        colorVariant={isCareersMenu ? "warmLight" : "white"}
        items={items}
        cta={cta}
        className='mb-8'
      />
    )
  }

  if (entity.__typename.endsWith(`ParagraphFromLibrary`)) {
    const paragraph = entity.fieldReusableParagraph?.entity?.paragraphs
    if (!paragraph) {
      return <></>
    }
    const items = componentResolver([paragraph])
    if (!items.length) {
      return <></>
    }
    return (
      <SpecificSpacing key={entity.uuid} {...resolveSpacings(entity.fieldSpacings)}>
        <>{items}</>
      </SpecificSpacing>
    )
  }

  if (entity.__typename.endsWith(`ParagraphAssetPromoCard`)) {
    const description = `
    ${entity.fieldTitle && `<p class='h4 font-bold mb-1'>${entity.fieldTitle}</p>`}
    ${entity.fieldDescription?.processed}
    `
    return (
      <PersonalizationWrapper entity={entity?.fieldItem?.entity} key={entity.uuid}>
        <SpecificSpacing {...resolveSpacings(entity.fieldSpacings)}>
          <Wrapper id={`${entity.__typename}-${entity.uuid}`} key={entity.uuid}>
            <Card
              variant='assetPromo'
              image={resolveImage(entity.fieldImage)}
              description={description}
              cta={{
                text: entity.fieldLink?.title,
                to: entity.fieldLink?.url.path,
              }}
            />
          </Wrapper>
        </SpecificSpacing>
      </PersonalizationWrapper>
    )
  }

  if (entity.__typename.endsWith(`ParagraphBigHero`)) {
    const ctas = entity.fieldCtas.map((item) => {
      if (!item) {
        return null
      }
      return {
        label: item.title,
        to: item.url?.path,
      }
    })
    const lottie = entity.fieldImage && resolveLottie(entity.fieldImage)
    const fallbackImage =
      entity.fieldRelatedImage && resolveImage(entity.fieldRelatedImage)

    const riveSrc = entity.fieldLink && entity.fieldLink.url.path
    const showRiveControls = entity.fieldEnabled && entity.fieldEnabled[0]
    const backgroundImage =
      entity.fieldHeaderImage && resolveImage(entity.fieldHeaderImage)

    return (
      <SpecificSpacing {...resolveSpacings(entity.fieldSpacings)}>
        <BigHero
          fallbackImage={fallbackImage}
          lottie={lottie}
          ctas={ctas}
          description={entity.fieldBody?.processed}
          typeWriterPauseTime={entity.fieldColumnCount}
          typeWriterDelayTime={entity.fieldCount}
          typeWriterTopText={entity.fieldCompany}
          typeWriterBottomText={entity.fieldFormCta}
          typeWriterMessages={entity.fieldTypewriterMessages}
          key={entity.uuid}
          riveSrc={riveSrc}
          showRiveControls={showRiveControls}
          backgroundImage={backgroundImage}
        />
      </SpecificSpacing>
    )
  }

  if (entity.__typename.endsWith(`ParagraphWrapper`)) {
    let hiddenOverflow = false
    entity.fieldItems?.forEach((item) => {
      if (item?.entity?.__typename?.endsWith("ParagraphLargeStepSlider")) {
        hiddenOverflow = true
      }
    })
    return (
      <SpecificSpacing {...resolveSpacings(entity.fieldSpacings)}>
        <ContentWrapper
          key={entity.uuid}
          width={entity.fieldWidthColumns}
          initialColumn={entity.fieldInitialColumn}
          title={entity.fieldTitle}
          backgroundColor={entity.fieldColor}
          className={hiddenOverflow ? "wrapper-overflow" : ""}
          bottomBackgroundColor={entity.fieldBackgroundToken}
        >
          {componentResolver(entity.fieldItems)}
        </ContentWrapper>
      </SpecificSpacing>
    )
  }

  if (entity.__typename.endsWith(`ParagraphHeavyRichtext`)) {
    const images = entity.fieldImages?.map((item) => {
      const image = resolveImage(item)
      return <Image imageOptions={{ className: "max-h-[70px]" }} {...image} />
    })
    return (
      <SpecificSpacing {...resolveSpacings(entity.fieldSpacings)}>
        <Wrapper key={entity.uuid}>
          {entity.fieldImages?.length > 0 && (
            <div className='mb-2 flex'>{images}</div>
          )}
          <RichText variant='body'>
            {entity.fieldBody?.processed && (
              <HtmlParser content={entity.fieldBody?.processed} />
            )}
          </RichText>
        </Wrapper>
      </SpecificSpacing>
    )
  }
  if (entity.__typename.endsWith(`ParagraphHorizontalTabs`)) {
    const headlineSize = entity.fieldHeadlinesTag
    const tabData = entity.fieldItems.map((item) => {
      const fieldImage = item.entity?.fieldImage
      const image = fieldImage ? resolveImage(fieldImage) : null

      return {
        id: item.entity.uuid,
        label: item.entity.fieldSectionTitle,
        content: {
          headline: item.entity.fieldTitle,
          body: item.entity.fieldDescription?.processed,
          cta: {
            label: item.entity.fieldLink?.title,
            to: item.entity.fieldLink?.url.path,
          },
          image,
        },
      }
    })

    return (
      <SpecificSpacing {...resolveSpacings(entity.fieldSpacings)}>
        <Wrapper key={entity.uuid}>
          <HorizontalTab headlineTag={headlineSize} tabData={tabData} />
        </Wrapper>
      </SpecificSpacing>
    )
  }

  if (entity.__typename.endsWith(`ParagraphFeaturedCustomers`)) {
    const cards = entity.highlightedCustomers?.map((item) => {
      const featuredInformation = item.entity.fieldAdminSettings?.entity
      const description = `
      <div class='rich-text-body pb-8'>
      ${
        featuredInformation?.fieldCompany
          ? `<p class="h6 mb-1">
           ${featuredInformation?.fieldCompany}
          </p>`
          : ""
      }
        ${
          featuredInformation
            ? `<p class="h4 font-bold mb-3">${featuredInformation?.fieldTitle}</p>`
            : `<p class="h4 font-bold mb-3">${item.entity.title}</p>`
        }
        ${
          featuredInformation?.fieldDescription?.processed ||
          item.entity.body?.summary ||
          ""
        }
      </div>
      `
      const image = featuredInformation?.fieldImage || item.entity.fieldCustomerLogo

      let ctaLink = item.entity.path.alias
      if (
        featuredInformation?.fieldLink?.url?.path &&
        !featuredInformation?.fieldLink?.url?.path.includes("/node/")
      ) {
        ctaLink = featuredInformation?.fieldLink?.url?.path
      }

      return (
        <Card
          key={item.entity.uuid}
          variant='resource'
          image={resolveImage(image)}
          cta={{
            text: featuredInformation?.fieldLink?.title || "Read more",
            to: ctaLink,
          }}
          description={description}
        />
      )
    })

    const images = entity.bottomCustomers?.map((item) => {
      const image = resolveImage(item.entity.fieldCustomerLogo)
      return (
        <Link key={item.entity.uuid} to={item.entity.path.alias}>
          <Image
            alt={item.entity.title}
            {...image}
            imageOptions={{
              className: "logo-grid-item max-w-25 w-auto max-h-8 mx-auto",
              imgStyle: {
                maxHeight: "60px",
                width: "auto",
                margin: "0 auto",
              },
            }}
          />
        </Link>
      )
    })
    return (
      <SpecificSpacing {...resolveSpacings(entity.fieldSpacings)}>
        <Wrapper key={entity.uuid} title={entity.fieldTitle}>
          <div className='flex flex-col items-center gap-8'>
            {cards.length > 0 && (
              <Grid
                className='w-full gap-4 md:gap-4'
                columns={entity.fieldColumnCount}
              >
                {cards}
              </Grid>
            )}

            {images.length > 0 && (
              <RowsCarousel gap={2} columns={6} className='md:gap-8'>
                {images}
              </RowsCarousel>
            )}

            {entity.fieldLink?.url && (
              <Button to={entity.fieldLink.url?.path} as={Link} variant='primary'>
                {entity.fieldLink.title}
              </Button>
            )}
          </div>
        </Wrapper>
      </SpecificSpacing>
    )
  }

  if (entity.__typename.endsWith(`ParagraphFloatingBox`)) {
    return (
      <SpecificSpacing {...resolveSpacings(entity.fieldSpacings)}>
        <FloatingBox
          key={entity.uuid}
          overlapSize={entity.fieldOverlapSize}
          topBackgroundColor={entity.fieldEnabled[0] && entity.fieldColor}
          bottomBackgroundColor={entity.fieldSecondaryColor}
        >
          {componentResolver(entity.fieldItems)}
        </FloatingBox>
      </SpecificSpacing>
    )
  }

  if (entity.__typename.endsWith(`ParagraphGeneralCtaRow`)) {
    const aligment = entity.fieldAlignment
    const items = entity.fieldItems?.map((item) => {
      return {
        isLink: item.entity.fieldBoolean,
        variantButton: item.entity.fieldCtasectionVariant,
        linkName: item.entity.fieldLink?.title,
        linkUrl: item.entity.fieldLink?.url.path,
        linkEvent: item.entity.fieldLink?.attribute,
        id: item.entity.uuid,
      }
    })
    return (
      <SpecificSpacing {...resolveSpacings(entity.fieldSpacings)}>
        <Wrapper key={entity.uuid}>
          <CtaRow position={aligment} items={items} />
        </Wrapper>
      </SpecificSpacing>
    )
  }
  if (entity.__typename.endsWith(`ParagraphBasicQuoteSlider`)) {
    const sliderItems = entity.fieldItems.map((item) => {
      return {
        key: item.entity.uuid,
        content: (
          <>
            {item.entity.fieldBody?.processed && (
              <RichText className='swiper-no-swiping b2 mb-2.5 cursor-default'>
                <HtmlParser content={item.entity.fieldBody?.processed} />
              </RichText>
            )}
            {item.entity.fieldDescription?.processed && (
              <RichText className='swiper-no-swiping b5 text-gray-text cursor-default'>
                <HtmlParser content={item.entity.fieldDescription?.processed} />
              </RichText>
            )}
          </>
        ),
      }
    })
    return (
      <SpecificSpacing {...resolveSpacings(entity.fieldSpacings)}>
        <Wrapper key={entity.uuid} title={entity.fieldTitle}>
          <Slider items={sliderItems} variant='simpleQuote' />
        </Wrapper>
      </SpecificSpacing>
    )
  }

  if (entity.__typename.endsWith(`ParagraphVideoRow`)) {
    const ctas = entity.fieldCtas?.map((item) => {
      if (!item) {
        return null
      }
      return {
        label: item.title,
        to: item.url?.path,
      }
    })
    return (
      <CtaVideoBlock
        title={entity.fieldTitle}
        image={{
          src: entity.fieldImage?.entity.fieldMediaImage.url,
          alt: entity.fieldImage?.entity.fieldMediaImage.alt,
        }}
        placeholderImage={{
          src: entity.fieldVideoPlaceholderImage?.entity.fieldMediaImage.url,
          alt: entity.fieldVideoPlaceholderImage?.entity.fieldMediaImage.alt,
        }}
        video={{
          title: entity.fieldTitle,
          src: entity.fieldVideoSource,
        }}
        cta={ctas}
        variant={entity.fieldVideoRowVariant}
      >
        {entity.fieldDescription?.processed}
      </CtaVideoBlock>
    )
  }
  if (entity.__typename.endsWith(`ParagraphGeneralTextRow`)) {
    const ctas = entity.fieldCtas?.map((cta) => ({
      label: cta.title,
      to: cta.url.path,
    }))
    const imageLink = {
      to: entity.fieldLink?.url?.path,
      label: entity.fieldLink?.title,
    }

    return (
      <SpecificSpacing key={entity.uuid} {...resolveSpacings(entity.fieldSpacings)}>
        <GeneralTextRow
          image={entity.fieldImage ? resolveImage(entity.fieldImage) : false}
          title={entity.fieldRichTitle?.processed}
          eyebrow={entity.fieldIntro}
          ctas={ctas}
          imageLink={entity.fieldLink && imageLink}
          videoSrc={entity.fieldVideoSource}
          background={entity.fieldBackgroundColor}
          widthColumns={entity.fieldWidthColumns}
          verticalPadding={entity.fieldVerticalPadding}
          horizontalAlignment={entity.fieldHorizontalAlignment}
          ctaStyle={entity.fieldCtasStyle}
          variant={entity.fieldTextRowVariant}
        >
          {entity.fieldDescription?.processed}
        </GeneralTextRow>
      </SpecificSpacing>
    )
  }

  if (entity.__typename.endsWith(`ParagraphGeneralTextRowRightCta`)) {
    const cta = {
      to: entity.fieldLink?.url?.path,
      textLink: entity.fieldLink?.title,
    }
    return (
      <SpecificSpacing key={entity.uuid} {...resolveSpacings(entity.fieldSpacings)}>
        <TextRowRightCta
          ctaAlignment={entity.fieldVerticalAlignment}
          description={entity.fieldDescription?.processed}
          title={entity.fieldRichTitle?.processed}
          cta={cta}
          columns={entity.fieldWidthColumns}
        />
      </SpecificSpacing>
    )
  }

  if (entity.__typename.endsWith("ParagraphSwissContent")) {
    const data = entity.fieldItems?.map((item) => {
      return (
        <CtaHexImage
          className='my-12'
          title={item.entity.fieldTitle}
          image={item.entity.fieldImage && resolveImage(item.entity.fieldImage)}
          cta={
            item.entity.fieldLink && {
              to: item.entity.fieldLink.url.path,
              label: item.entity.fieldLink.title,
            }
          }
        >
          {item.entity.fieldDescription?.value}
        </CtaHexImage>
      )
    })
    return <Wrapper>{data}</Wrapper>
  }

  if (entity.__typename.endsWith("ParagraphLargePageHeader")) {
    let description = ""
    if (entity.fieldSubtitle) {
      description += `<h4 class='text-orange-04'>${entity.fieldSubtitle}</h4>`
    }
    if (entity.fieldTitle) {
      description += `<h1>${entity.fieldTitle}</h1>`
    }
    if (entity.fieldBody?.processed) {
      description += entity.fieldBody.processed
    }
    const ctas = entity.fieldCtas?.map((cta) => ({
      label: cta.title,
      to: cta.url.path,
    }))
    const image = entity.fieldImage && resolveImage(entity.fieldImage)
    const lottie = entity.lottie && resolveLottie(entity.lottie)

    const videoField =
      entity.fieldImage?.entity.__typename === "Drupal_MediaVideo"
        ? {
            src: entity.fieldImage?.entity.fieldMediaVideoFile?.entity.url,
            image: resolveImage(entity.fieldImage),
          }
        : null

    const remoteVideoField =
      entity.fieldImage?.entity.__typename === "Drupal_MediaRemoteVideo"
        ? {
            src: entity.fieldImage?.entity.videoEmbedSrc,
            image: resolveImage(entity.fieldImage),
          }
        : null

    return (
      <SpecificSpacing key={entity.uuid} {...resolveSpacings(entity.fieldSpacings)}>
        <LargePageHeader
          image={image}
          ctas={ctas}
          backgroundToken={entity.fieldBackgroundToken}
          titleColorToken={entity.fieldTitleColorToken}
          lottie={lottie}
          imageHeightDesktop={entity.imageHeightDesktop}
          imageHeightTablet={entity.imageHeightTablet}
          spaceBetweenDesktop={entity.spacingDesktop}
          spaceBetweenTablet={entity.spacingTablet}
          contentWidthDesktop={entity.widthDesktop}
          contentWidthTablet={entity.widthTablet}
          video={videoField || remoteVideoField}
        >
          {description}
        </LargePageHeader>
      </SpecificSpacing>
    )
  }

  if (entity.__typename.endsWith("ParagraphFeaturedIndustryCardList")) {
    const cards = entity.fieldItems?.map((item) => {
      const link = {
        label: item.entity.fieldCtaLabel,
        link:
          item.entity?.fieldLink?.url?.path ||
          item.entity.fieldSolutionsIndustryPage?.entity?.entityUrl?.path,
      }
      const logos = item.entity.fieldImages?.map((logo) => {
        return resolveImage(logo)
      })
      return (
        <FeaturedIndustryCard
          key={item.entity.uuid}
          icon={resolveImage(item.entity.fieldImage)}
          title={item.entity.fieldTitle}
          content={item.entity.fieldSubtitle}
          cta={link}
          logos={logos}
        />
      )
    })

    return (
      <SpecificSpacing topSpacing={5} className='solutions-featured'>
        <Wrapper key={entity.uuid} title={entity?.fieldTitle}>
          <Grid columns={2} gap={3}>
            {cards}
          </Grid>
        </Wrapper>
      </SpecificSpacing>
    )
  }

  if (entity.__typename.endsWith("ParagraphInPageNavigationContainer")) {
    return (
      <SpecificSpacing key={entity.uuid} {...resolveSpacings(entity.fieldSpacings)}>
        <Wrapper>
          <InPageVertical entity={entity} pageContext={pageContext} />
        </Wrapper>
      </SpecificSpacing>
    )
  }

  if (entity.__typename.endsWith("ParagraphInPageNavigationHorizontal")) {
    return (
      <SpecificSpacing key={entity.uuid} {...resolveSpacings(entity.fieldSpacings)}>
        <InPageHorizontal entity={entity} />
      </SpecificSpacing>
    )
  }

  if (entity.__typename.endsWith("ParagraphPartnerSolutionSearch")) {
    const partnerSolutions = formatPartnerSolutions(entity)
    return (
      <SpecificSpacing key={entity.uuid} {...resolveSpacings(entity.fieldSpacings)}>
        <Wrapper title={entity.fieldTitle}>
          <PartnerSolutionSearch
            regionFilters={partnerSolutions?.regionFilters}
            industryFilters={partnerSolutions?.industryFilters}
            partnerFilters={partnerSolutions?.partnerFilters}
            partnerSolutions={partnerSolutions?.items}
          />
        </Wrapper>
      </SpecificSpacing>
    )
  }

  if (entity.__typename.endsWith("ParagraphIndustryCardList")) {
    return (
      <SpecificSpacing
        topSpacing={8}
        bottomSpacing={13}
        className='solutions-industry'
      >
        <Wrapper key={entity.uuid} title={entity.fieldTitle}>
          <IndustryCardsWrapper cards={entity.fieldItems} />
        </Wrapper>
      </SpecificSpacing>
    )
  }

  if (entity.__typename.endsWith("ParagraphAcceleratorCards")) {
    return (
      <div className='bg-gray-warm-medium pb-1 pt-1'>
        <Wrapper key={entity.uuid} title={entity.fieldTitle}>
          <AcceleratorsWrapper cards={entity.fieldItems} />
        </Wrapper>
      </div>
    )
  }

  if (entity.__typename.endsWith(`ParagraphColumns`)) {
    const columns = entity.fieldColumns?.map((column) => {
      const spacings = column?.entity?.fieldSpacings?.entity
      return (
        <div
          className={`last:mb-0 last:mr-0 md:mb-0 ${
            spacings?.fieldBottomSpacingDesktop
              ? `lg:mr-${spacings.fieldBottomSpacingDesktop}`
              : ""
          } ${
            spacings?.fieldBottomSpacingTablet
              ? `md:mr-${spacings.fieldBottomSpacingTablet}`
              : ""
          } ${
            spacings?.fieldBottomSpacing ? `mb-${spacings.fieldBottomSpacing}` : ""
          } ${
            column.entity.fieldColumnWidthDesktop
              ? `lg:w-${column.entity.fieldColumnWidthDesktop}/12`
              : ""
          } ${
            column.entity.fieldColumnWidthTablet
              ? `md:w-${column.entity.fieldColumnWidthTablet}/12`
              : ""
          } ${
            column.entity.fieldColumnWidthMobile
              ? `w-${column.entity.fieldColumnWidthMobile}/12`
              : ""
          }`}
        >
          {componentResolver(column.entity.fieldItems)}
        </div>
      )
    })

    const bgColor = entity.fieldBackgroundToken && {
      className: `bg-${entity.fieldBackgroundToken}`,
    }

    return (
      <div {...bgColor}>
        <SpecificSpacing {...resolveSpacings(entity.fieldSpacings)}>
          {columns && (
            <div className='component-columns inner-wrapper'>
              {entity.fieldTitle && <h2>{entity.fieldTitle}</h2>}
              <div className='flex flex-col md:flex-row md:justify-between'>
                {columns}
              </div>
            </div>
          )}
        </SpecificSpacing>
      </div>
    )
  }

  if (entity.__typename.endsWith("ParagraphPartnerSearch")) {
    const filterMap = {
      "C&SI Partner": "fieldRegions",
      "Cloud Partner": null,
      "ISVs Partner / Technology Partner": "fieldUseCase",
    }
    return (
      <SpecificSpacing key={entity.uuid} {...resolveSpacings(entity.fieldSpacings)}>
        <Wrapper>
          <PartnerSearch
            title={entity?.fieldTitle}
            partnerType={entity?.fieldPartnerType}
            filterField={filterMap[entity?.fieldPartnerType[0]?.entity.name]}
          />
        </Wrapper>
      </SpecificSpacing>
    )
  }

  if (entity.__typename.endsWith(`ParagraphMultiMedia`)) {
    const animationField = entity.fieldImage?.entity.__typename.endsWith(
      "MediaLottieFile"
    )
      ? resolveLottie(entity.fieldImage)
      : null

    const imageField = entity.fieldImage?.entity.__typename.endsWith("MediaImage")
      ? resolveImage(entity.fieldImage)
      : null

    const thumbnail = resolveImage(entity.fieldImage)

    const videoField = entity.fieldImage?.entity.__typename.endsWith("MediaVideo")
      ? {
          src: entity.fieldImage?.entity.fieldMediaVideoFile?.entity?.url,
          thumbnail,
        }
      : null

    const remoteVideoField = entity.fieldImage?.entity.__typename.endsWith(
      "MediaRemoteVideo"
    )
      ? {
          src: entity.fieldImage?.entity.videoEmbedSrc,
          thumbnail,
        }
      : null

    return (
      <SpecificSpacing {...resolveSpacings(entity.fieldSpacings)}>
        <MultiMedia
          alignment={entity.fieldAlignment}
          columns={entity.fieldColumnWidthDesktop || 12}
          backgroundToken={entity.fieldBackgroundToken}
          animationSrc={animationField?.animationSrc}
          animationStart={entity.fieldAnimation}
          motionControl={entity.fieldBoolean}
          alignmentMotionControl={entity.fieldHorizontalAlignment || undefined}
          paddingTop={entity.fieldTopSpacing}
          paddingBottom={entity.fieldBottomSpacing}
          dropShadow={entity.fieldDisplayShadow}
          videoSrc={videoField || remoteVideoField}
          image={imageField}
          fullWidth={entity.fullWidth && entity.fullWidth[0]}
        />
      </SpecificSpacing>
    )
  }

  if (entity.__typename.endsWith(`ParagraphMediaPlayer`)) {
    const videoField =
      entity.fieldImage?.entity.__typename === "Drupal_MediaVideo"
        ? entity.fieldImage?.entity.fieldMediaVideoFile?.entity?.url
        : null

    const remoteVideoField =
      entity.fieldImage?.entity.__typename === "Drupal_MediaRemoteVideo"
        ? entity.fieldImage?.entity.videoEmbedSrc
        : null
    const image =
      resolveImage(entity.fieldHeaderImage) || resolveImage(entity.fieldImage)
    return (
      <SpecificSpacing {...resolveSpacings(entity.fieldSpacings)}>
        <MediaPlayer
          autoplay={entity.fieldBoolean}
          controls={entity.fieldNew}
          image={image}
          videoSrc={videoField || remoteVideoField}
          fullWidth={entity.fullWidth && entity.fullWidth[0]}
        />
      </SpecificSpacing>
    )
  }

  if (entity.__typename.endsWith("ParagraphIntegrationCarousel")) {
    const cards = entity.fieldItems
      ?.map((item) => {
        if (!item?.entity) {
          return false
        }

        return {
          name: item.entity.fieldTitle,
          to: item.entity.fieldLink?.url?.path,
          variant: {
            bgColor: item.entity.fieldBackgroundToken,
            titleColor: item.entity.fieldTitleColorToken,
          },
          vendors: item.entity.fieldImages?.map((image) => ({
            ...(image && { image: resolveImage(image) }),
          })),
        }
      })
      .filter(Boolean)

    return (
      <SpecificSpacing key={entity.uuid} {...resolveSpacings(entity.fieldSpacings)}>
        <Wrapper className='overflow-x-hidden'>
          <IntegrationCarousel
            autoplay={entity.fieldEnabled?.[0]}
            integrations={cards}
          />
        </Wrapper>
      </SpecificSpacing>
    )
  }

  if (entity.__typename.endsWith(`ParagraphBoxedQuoteSlider`)) {
    const sliderItems = entity.fieldItems.map((item) => {
      const image = resolveImage(item.entity.fieldImage)
      return {
        key: item.entity.uuid,
        content: (
          <>
            {item.entity.fieldBody?.processed && (
              <RichText className='swiper-no-swiping b2 mb-2.5 cursor-default'>
                <HtmlParser content={item.entity.fieldBody?.processed} />
              </RichText>
            )}
            {item.entity.fieldDescription?.processed && (
              <RichText className='swiper-no-swiping b5 text-gray-dark-logo cursor-default'>
                <HtmlParser content={item.entity.fieldDescription?.processed} />
              </RichText>
            )}
            {image && (
              <Image
                alt=''
                {...image}
                imageOptions={{
                  className: "m-auto w-25",
                }}
              />
            )}
          </>
        ),
      }
    })
    return (
      <SpecificSpacing key={entity.uuid} {...resolveSpacings(entity.fieldSpacings)}>
        <Wrapper>
          <Slider items={sliderItems} variant='boxedQuote' />
        </Wrapper>
      </SpecificSpacing>
    )
  }

  if (entity.__typename.endsWith(`ParagraphTextSlider`)) {
    const delayInMillisecond = entity.fieldCount && entity.fieldCount * 1000
    const sliderItems = entity.fieldItems.map((item) => {
      return {
        key: item.entity.uuid,
        content: (
          <>
            {item.entity.fieldBody?.processed && (
              <RichText className='swiper-no-swiping b2 mb-2.5 cursor-default'>
                <HtmlParser content={item.entity.fieldBody?.processed} />
              </RichText>
            )}
            {item.entity.fieldBoolean ? (
              <Button variant='primary' to={item.entity.fieldLink?.url?.path}>
                {item.entity.fieldLink?.title}
              </Button>
            ) : (
              <TextLink
                className='arrow-icon'
                variant='A'
                to={item.entity.fieldLink?.url?.path}
                label={item.entity.fieldLink?.title}
              >
                {item.entity.fieldLink?.title}
              </TextLink>
            )}
          </>
        ),
      }
    })
    return (
      <SpecificSpacing key={entity.uuid} {...resolveSpacings(entity.fieldSpacings)}>
        <Slider
          items={sliderItems}
          backgroundColor={entity.fieldBackgroundToken}
          delayPerSlide={delayInMillisecond}
          variant='textQuote'
        />
      </SpecificSpacing>
    )
  }
  if (entity.__typename.endsWith(`ParagraphAnimatedLogoSlider`)) {
    const logos = entity.fieldItems.map((logo) => {
      return {
        link: logo.entity.fieldLink?.url.path,
        ...resolveImage(logo.entity.fieldImage),
      }
    })
    return (
      <SpecificSpacing
        key={entity.uuid}
        {...resolveSpacings(entity.fieldSpacings)}
        className={
          entity.fieldBackgroundToken ? `bg-${entity.fieldBackgroundToken}` : ""
        }
      >
        <AnimatedLogoSlider
          sliderLink={entity.fieldLink?.url?.path}
          variant={entity.fieldVariantAnimateSlider}
          logos={logos}
          footerLink={entity.fieldCta}
          speed={entity.speed}
          bgColor={entity.fieldBackgroundToken}
          pauseAriaLabel='Pause customer stories animation'
          playAriaLabel='Play customer stories animation'
        />
      </SpecificSpacing>
    )
  }

  if (entity.__typename.endsWith(`ParagraphVerticalTabs`)) {
    const items = entity.fieldItems?.map((item) => {
      const customer = item.entity.fieldItem?.entity
      const videoSrc =
        item.entity.fieldImage?.entity?.__typename === "Drupal_MediaVideo"
          ? item.entity.fieldImage?.entity?.fieldMediaVideoFile?.entity?.url
          : null

      const thumbnail = item.entity?.fieldImage?.entity?.fieldMediaImage?.url
      const thumbnailAlt = item.entity?.fieldImage?.entity?.fieldMediaImage?.alt

      const remoteVideoSrc =
        item.entity.fieldImage?.entity?.__typename === "Drupal_MediaRemoteVideo"
          ? item.entity.fieldImage?.entity.videoEmbedSrc
          : null

      const isImage =
        item.entity.fieldImage?.entity?.__typename === `Drupal_MediaImage`
          ? { image: resolveImage(item.entity?.fieldImage) }
          : null

      const mediaVideoSrc = videoSrc || remoteVideoSrc
      const video = {
        src: mediaVideoSrc,
        image: {
          src: thumbnail,
          alt: thumbnailAlt,
        },
      }
      const Media = () => {
        if (isImage) {
          return <Image {...isImage.image} />
        }
        return (
          <>
            <VideoTabsPlayer videoSrc={video.src} image={video.image} />
          </>
        )
      }
      return {
        mediaWidth: item.entity.fieldWidthColumns,
        title: item.entity.fieldTitle,
        subtitle: item.entity.fieldSubtitle,
        subchildren: item.entity.fieldDescription?.processed,
        children: mediaVideoSrc || isImage ? <Media /> : null,
        customer: {
          eyebrow: customer?.fieldIntro,
          text: customer?.fieldDescription?.processed,
          image: customer?.fieldImage && resolveImage(customer.fieldImage),
          cta: {
            to: customer?.fieldLink?.url.path,
            label: customer?.fieldLink?.title,
          },
        },
      }
    })
    return (
      <SpecificSpacing key={entity.uuid} {...resolveSpacings(entity.fieldSpacings)}>
        <Wrapper>
          <VerticalTabs items={items} />
        </Wrapper>
      </SpecificSpacing>
    )
  }

  if (entity.__typename.endsWith("ParagraphInPageNavigationSticky")) {
    const links = entity.fieldLinks.map((item, i) => ({
      text: item?.title,
      to: item?.url?.path,
      variant: i === 0 ? "secondary" : "primary",
    }))

    return <InPageNavigationSticky ctas={links} />
  }
  if (entity.__typename.endsWith("ParagraphSlideOutForm")) {
    return (
      <SlideOutForm
        key={entity.uuid}
        title={entity.fieldTitle}
        formId={entity.fieldFormId}
        campaignId={entity.fieldCampaignId}
        thankyou={entity.fieldThankYouUrl?.url?.path}
        useMarketoThankYouUrl={entity.fieldBoolean}
        legalCopy={entity.fieldBody?.processed}
        formVariant={entity.fieldFormVariant}
      />
    )
  }

  if (entity.__typename.endsWith("ParagraphTabbedContent")) {
    const items = entity.fieldItems?.map((item) => {
      if (!item?.entity) {
        return null
      }
      const childItems = componentResolver(item.entity.fieldItems)
      return {
        id: item.entity.uuid || "",
        label: item.entity.fieldTitle || "",
        children: childItems || null,
      }
    })
    return (
      <SpecificSpacing key={entity.uuid} {...resolveSpacings(entity.fieldSpacings)}>
        <TabbedContent
          eyebrow={entity.fieldIntro}
          title={entity.fieldRichTitle?.processed}
          tabData={items}
          variant={entity.fieldPillsVariant || "light"}
          tabAlignment={entity.fieldHorizontalAlignment || "left"}
        />
      </SpecificSpacing>
    )
  }

  if (entity.__typename.endsWith("ParagraphCtaDownload")) {
    return (
      <SpecificSpacing key={entity.uuid} {...resolveSpacings(entity.fieldSpacings)}>
        <Wrapper>
          <CtaDownload
            buttonLabel={entity?.fieldLink?.title}
            checksum={entity?.fieldKey}
            linkCopyLabel={entity?.fieldCtaLabel}
            message={entity?.fieldBody?.value}
            downloadLink={entity?.fieldLink.url?.path}
          />
        </Wrapper>
      </SpecificSpacing>
    )
  }
  if (entity.__typename.endsWith("ParagraphFlatIconCard")) {
    return (
      <FlatIconCard
        key={entity.uuid}
        eyebrow={entity.fieldEyebrow}
        image={resolveImage(entity.fieldImage)}
        title={entity.fieldRichTitle?.processed}
        description={entity.fieldDescription?.processed}
        bgColor={entity.fieldBackgroundToken}
        cta={
          entity.fieldCta && {
            to: entity.fieldCta.url?.path,
            label: entity.fieldCta?.title,
          }
        }
      />
    )
  }
  if (entity.__typename.endsWith("ParagraphPartnerSolutionCard")) {
    return (
      <PartnerSolutionCard
        eyebrow={entity.fieldSectionTitle}
        logo={resolveImage(entity.fieldImage)}
        title={entity.fieldTitle}
        cta={{
          to: entity.fieldLink?.url.path,
          text: entity.fieldLink?.title,
        }}
      />
    )
  }
  if (entity.__typename.endsWith("ParagraphHeroEvent")) {
    const bgImageSvg = resolveImage(entity.fieldImage)
    const bgImagePng = bgImageSvg.gatsbyData?.images?.fallback?.src
    const speakers = entity.fieldItems?.map((item) => ({
      image: resolveImage(item.entity.fieldImage),
      role: item.entity.fieldRole,
      name: item.entity.fieldTitle,
    }))
    return (
      <SpecificSpacing key={entity.uuid} {...resolveSpacings(entity.fieldSpacings)}>
        <HeroPromo
          items={speakers}
          cta={{
            to: entity.fieldLink?.url.path,
            label: entity.fieldLink?.title,
          }}
          title={entity.fieldTitle}
          description={entity.fieldDescription?.processed}
          variant={speakers.length > 0 ? "v2" : "v1"}
          datePlace={entity.fieldSectionTitle}
          backgroundImage={bgImageSvg.src || bgImagePng}
          logoImage={
            entity?.fieldHeaderImage && resolveImage(entity.fieldHeaderImage)
          }
        />
      </SpecificSpacing>
    )
  }
  if (entity.__typename.endsWith("ParagraphAcceleratorCard")) {
    return (
      <AcceleratorCard
        partner={entity.fieldAcceleratorPartnerTerm?.entity.name}
        content={entity.fieldTitle}
        href={entity.fieldLink?.url.path}
        badges={[
          entity.fieldFeatured ? "featured" : undefined,
          entity.fieldNew ? "new" : undefined,
          entity.fieldHot ? "hot" : undefined,
        ]}
      />
    )
  }

  if (entity.__typename.endsWith("ParagraphLargeCard")) {
    const cta = {
      label: entity.fieldLink.title,
      to: entity.fieldLink.url?.path,
    }
    return (
      <LargeCustomerCard
        key={entity.uuid}
        description={entity.fieldDescription?.processed}
        stat={entity.fieldIntro}
        context={entity.fieldSubtitle}
        cta={cta}
        headline={entity.fieldRichTitle?.processed}
        logo={entity.fieldHeaderImage && resolveImage(entity.fieldHeaderImage)}
        image={entity.fieldImage && resolveImage(entity.fieldImage)}
      />
    )
  }

  if (entity.__typename.endsWith("ParagraphLargeStepSlider")) {
    const cards = componentResolver(entity.fieldItems)
    const firstCard = entity.fieldItems?.[0]?.entity?.__typename
    let cardsPerView = 1
    if (firstCard.endsWith("PartnerSolutionCard")) {
      cardsPerView = 3
    }
    return (
      <SpecificSpacing key={entity.uuid} {...resolveSpacings(entity.fieldSpacings)}>
        <Wrapper className='large-step-overflow'>
          <LargeStepSlider
            eyebrow={entity.fieldIntro}
            title={entity.fieldBody?.processed}
            description={entity.fieldRichTitle?.processed}
            cards={cards}
            cardsPerView={cardsPerView}
            leftArrowAriaLabel='Scroll customer stories left'
            rightArrowAriaLabel='Scroll customer stories right'
          />
        </Wrapper>
      </SpecificSpacing>
    )
  }

  if (entity.__typename.endsWith("ParagraphTransparentCard")) {
    return (
      <TransparentTextCard
        description={entity.fieldDescription.processed}
        headline={entity.fieldTitle}
        textLink={{
          to: entity.fieldLink?.url.path,
          label: entity.fieldLink?.title,
        }}
        variant={entity.fieldBoolean ? "dark" : "light"}
      />
    )
  }
  if (entity.__typename.endsWith("ParagraphSmallTileCard")) {
    return (
      <SmallTileCard
        eyebrow={entity.fieldKey}
        img={resolveImage(entity.fieldImage)}
        title={entity.fieldTitle}
        to={entity.fieldLink?.url.path}
        backgroundColor={entity.fieldBackgroundToken}
        stroke={entity.fieldBoolean}
        removeHover={entity.fieldRemoveHover}
      />
    )
  }
  if (entity.__typename.endsWith("ParagraphCardGrid")) {
    return (
      <SpecificSpacing key={entity.uuid} {...resolveSpacings(entity.fieldSpacings)}>
        <Wrapper>
          <CardGrid
            gapMobile={entity.fieldBottomSpacing || "1.6"}
            gapTablet={entity.fieldBottomSpacingTablet || "3.2"}
            gapDesktop={entity.fieldBottomSpacingDesktop}
            columnsMobile={entity.fieldColumnWidthMobile || 1}
            columnsTablet={entity.fieldColumnWidthTablet || 3}
            columnsDesktop={entity.fieldColumnWidthDesktop || 4}
          >
            {componentResolver(entity.fieldItems)}
          </CardGrid>
        </Wrapper>
      </SpecificSpacing>
    )
  }

  if (entity.__typename.endsWith("ParagraphCustomerStoryTabs")) {
    let isTabImage = false

    const items = entity.fieldItems.map((item) => {
      const tabItem = item.entity
      const stats = tabItem.stats?.map((stat) => {
        const statItem = stat.entity
        return {
          id: statItem.uuid,
          title: statItem.fieldTitle,
          description: statItem.fieldDescription?.processed,
          columns: statItem.fieldColumnWidthMobile,
          columnsTablet: statItem.fieldColumnWidthTablet,
          columnscolumnsDesktop: statItem.fieldColumnWidthDesktop,
        }
      })

      const isAnimation =
        tabItem.fieldImage?.entity.__typename === `Drupal_MediaLottieFile`
          ? { lottie: resolveLottie(tabItem.fieldImage) }
          : null

      const isImage =
        tabItem.fieldImage?.entity.__typename === `Drupal_MediaImage`
          ? { image: resolveImage(tabItem.fieldImage) }
          : null

      const isVideo =
        tabItem.fieldImage?.entity.__typename === "Drupal_MediaVideo"
          ? {
              video: {
                src: tabItem.fieldImage?.entity.fieldMediaVideoFile?.entity.url,
                image: resolveImage(tabItem?.fieldImage),
              },
            }
          : null

      const isRemoteVideo =
        tabItem.fieldImage?.entity.__typename === "Drupal_MediaRemoteVideo"
          ? {
              video: {
                src: tabItem.fieldImage?.entity.videoEmbedSrc,
                image: resolveImage(tabItem?.fieldImage),
              },
            }
          : null

      const media = isImage || isVideo || isRemoteVideo || isAnimation

      if (tabItem.tabImage) {
        isTabImage = true
      }

      return {
        id: tabItem.uuid,
        title: tabItem.fieldTitle,
        body: tabItem.fieldBody?.processed,
        tabImage: tabItem.tabImage && resolveImage(tabItem.tabImage),
        stats,
        cta: {
          label: tabItem.fieldLink?.title,
          to: tabItem.fieldLink?.url.path,
        },
        headline: tabItem.tabHeadline,
        ...media,
      }
    })
    return (
      <SpecificSpacing key={entity.uuid} {...resolveSpacings(entity.fieldSpacings)}>
        <Wrapper>
          <CustomerStoryTabs
            alignment={entity.isSwipableVariant ? "top" : "bottom"}
            variant={isTabImage ? "image" : "text"}
            items={items}
          />
        </Wrapper>
      </SpecificSpacing>
    )
  }

  if (entity.__typename.endsWith("ParagraphThreeCardCluster")) {
    return (
      <SpecificSpacing key={entity.uuid} {...resolveSpacings(entity.fieldSpacings)}>
        <Wrapper>
          <ThreeCardClusterWrapper entity={entity} />
        </Wrapper>
      </SpecificSpacing>
    )
  }

  if (entity.__typename.endsWith("ParagraphLabelRow")) {
    const resolveColumnData = (item) => {
      if (!item?.entity) {
        return null
      }
      const mappedEntity = item.entity
      return {
        label: mappedEntity.fieldTitle,
        content: mappedEntity.fieldDescription?.processed,
        links: mappedEntity.fieldLinks.map((link) => {
          return {
            label: link.title,
            url: link.url?.path,
          }
        }),
      }
    }
    if (!entity.fieldColumns || entity.fieldColumns?.length < 1) {
      return <></>
    }
    const firstSection = resolveColumnData(entity.fieldColumns[0])
    const secondarySection = resolveColumnData(entity.fieldColumns[1])
    const contentLinks = resolveColumnData(entity.fieldColumns[2])
    const share = entity.fieldItems && {
      label: entity.fieldTitle,
      items: entity.fieldItems.map((item) => {
        const mappedEntity = item.entity
        return {
          type: mappedEntity.fieldIconName,
          url: mappedEntity.fieldLink?.url.path,
          id: mappedEntity.uuid,
        }
      }),
    }
    return (
      <SpecificSpacing key={entity.uuid} {...resolveSpacings(entity.fieldSpacings)}>
        <LabelRow
          firstSection={firstSection}
          secondarySection={secondarySection}
          contentLinks={contentLinks}
          share={share}
        />
      </SpecificSpacing>
    )
  }

  if (entity.__typename.endsWith("ParagraphSpotlight")) {
    const title = entity.fieldTitle
    const cta = {
      to: entity.fieldLink?.url.path,
      text: entity.fieldLink?.title,
    }
    const cards = entity.fieldItems?.map((item) => {
      const mappedEntity = item.entity
      return {
        uuid: mappedEntity.uuid,
        eyebrow: mappedEntity.fieldIntro,
        description: mappedEntity.fieldTitle,
        cta: {
          to: mappedEntity.fieldLink?.url.path,
          text: mappedEntity.fieldLink?.title,
        },
        image: {
          src: mappedEntity.fieldImage?.entity?.gatsbyImageFile?.publicURL,
          alt: mappedEntity.fieldImage?.entity?.fieldMediaImage?.alt,
        },
      }
    })

    return (
      <SpecificSpacing key={entity.uuid} {...resolveSpacings(entity.fieldSpacings)}>
        <Wrapper>
          <Spotlight title={title} cta={cta} cards={cards} />
        </Wrapper>
      </SpecificSpacing>
    )
  }

  if (entity.__typename.endsWith("ParagraphChooseDemo")) {
    const ctas = entity?.fieldCtas.map((cta, index) => {
      return {
        text: cta.title,
        to: cta.url?.path,
        variant: index === 0 ? "primary" : "secondary",
      }
    })

    return (
      <SpecificSpacing
        className='bg-navy-800 mb-[-1px]'
        key={entity.uuid}
        {...resolveSpacings(entity.fieldSpacings)}
      >
        <ChooseDemo
          title={entity.fieldRichTitle?.processed}
          description={entity.fieldSubtitle}
          ctas={ctas}
        />
      </SpecificSpacing>
    )
  }

  if (entity.__typename.endsWith("ParagraphResourcesSection")) {
    const cards = entity.fieldItems?.map((card) => {
      const mappedEntity = card?.entity
      if (!mappedEntity) {
        return {}
      }
      return {
        title: mappedEntity.fieldTitle,
        description: mappedEntity.fieldSubtitle,
        ctas: mappedEntity.fieldLinks?.map((cta) => {
          return {
            text: cta.title,
            to: cta?.url.path,
          }
        }),
      }
    })
    return (
      <SpecificSpacing key={entity.uuid} {...resolveSpacings(entity.fieldSpacings)}>
        <Wrapper>
          <SectionResources
            backgroundColor={entity.fieldBackgroundResourceCard}
            eyebrow={entity.fieldSubtitle}
            title={entity.fieldTitle}
            cards={cards}
          />
        </Wrapper>
      </SpecificSpacing>
    )
  }

  if (entity.__typename.endsWith("ParagraphHeaderSection")) {
    return (
      <SpecificSpacing key={entity.uuid} {...resolveSpacings(entity.fieldSpacings)}>
        <Wrapper>
          <HeaderSection
            eyebrow={entity.fieldIntro}
            title={entity.fieldTitle}
            subtitle={entity.fieldSubtitle}
            variant={entity.fieldHeaderColorVariant}
            mobileColumn={entity.fieldColumnWidthMobile}
            tabletColumn={entity.fieldColumnWidthTablet}
            desktopColumn={entity.fieldColumnWidthDesktop}
          />
        </Wrapper>
      </SpecificSpacing>
    )
  }
  if (entity.__typename.endsWith(`ParagraphRegionalCloudMap`)) {
    const title = entity.fieldTitle
    const regions = entity.fieldItems?.map((region) => {
      return {
        title: region.entity.fieldTitle,
        link: region.entity.fieldLink
          ? {
              title: region.entity.fieldLink?.title,
              url: region.entity.fieldLink?.url.path,
            }
          : null,
        image: {
          alt: region.entity.fieldImage?.entity.fieldMediaImage.alt,
          url: region.entity.fieldImage?.entity.fieldMediaImage.url,
        },
      }
    })

    return <RegionCloudMap title={title} regions={regions} />
  }

  if (entity.__typename.endsWith("ParagraphIframeEmbed")) {
    return (
      <EmbedIframe
        src={entity.fieldIframeUrl}
        customTemplate={entity.fieldIframeComponent}
      />
    )
  }

  return <></>
}

export const componentResolver = (data, pageContext) => {
  const components = []
  if (data) {
    data.forEach((item) => {
      const { entity } = item
      components.push(resolve(entity || item, pageContext))
    })
  }

  return components
}
