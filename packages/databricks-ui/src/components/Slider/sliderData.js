import React from "react"
import RichText from "../RichText"
import Button from "../Button"
import TextLink from "../TextLink"

const slider = [
  {
    text: "“At Databricks, the opportunity to work on such an innovative product is only outweighed by the people I get to work with. I’m constantly learning from people on all sides of the business — not only through work, but also at monthly board game nights and Women of Databricks events.”",
    author: "— Anna Shrestinian, Senior Product Manager",
    description:
      "Up to 12x better price/performance than other cloud data warehouses",
    ctaStyle: "arrow-icon",
    textLink: {
      to: "/",
      text: "Learn more",
    },
  },
  {
    text: "“Our customers use the Databricks platform to build cutting edge AI, Machine Learning and Analytical solutions that make the lives of people easier. The experience has been fantastic and the learning curve, exponential.”",
    author: "— Sohan Shah, Senior Customer Success Engineer",
    description:
      "Up to 13x better price/performance than other cloud data warehouses.",
    ctaStyle: "arrow-icon",
    cta: {
      to: "/",
      text: "Learn more",
    },
  },
  {
    text: "“The knowledge that I will be working alongside and challenged by an outstanding team of super bright and focused experts in their field, gets me excited. Being able to contribute to the creation of the Databricks EMEA business, has offered me an outstanding opportunity to develop further as a leader, for which I’m very thankful.”",
    author: "— Nick Cochran, VP Customer Success (LDN)",
    description:
      "Up to 14x better price/performance than other cloud data warehouses",
    ctaStyle: "arrow-icon",
    textLink: {
      to: "/",
      text: "Learn more",
    },
  },
  {
    text: "“To be given the opportunity to help scale the company internationally with the brightest people in the industry is incredible. I've learned from and built friendships with people across different teams globally.”",
    author: "— Yvette Ramirez, Jr. Recruiter (AMS)",
    description:
      "Up to 15x better price/performance than other cloud data warehouses",
    ctaStyle: "arrow-icon",
    cta: {
      to: "/",
      text: "Learn more",
    },
  },
  {
    text: "“I feel incredibly lucky to work with such driven and collaborative teammates to help organizations provide better service to their customers, optimize patient care, fight cyber bullying and more by getting them started on some of the best technology out there.”",
    author: "— Caryl Yuhas, Sr. Manager Field Engineering",
    description:
      "Up to 16x better price/performance than other cloud data warehouses",
    ctaStyle: "arrow-icon",
    textLink: {
      to: "/",
      text: "Learn more",
    },
  },
]

const generateItems = (includeVideoSrc, includeLogoSrc, includeCTA) => {
  return slider.map(({ text, author, description, cta, ctaStyle, textLink }) => {
    if (includeCTA) {
      return {
        key: text,
        headerTitle: "Customer story",
        content: (
          <>
            <RichText className='swiper-no-swiping h2 cursor-default'>
              {description}
            </RichText>
            {cta && (
              <Button variant='primary' to={cta.to}>
                {cta.text}
              </Button>
            )}
            {textLink && (
              <TextLink
                variant='A'
                className={`${ctaStyle}`}
                to={textLink.to}
                label={textLink.label}
              >
                {textLink.text}
              </TextLink>
            )}
          </>
        ),
      }
    }

    return {
      key: text,
      image: {
        src: "/static/images/Lakehouse-for-Financial-Services-Ad.jpg",
        alt: "Lakehouse for Financial Services Ad",
      },
      headerImage: { src: "/static/images/logo-gray-devon-energy.svg" },
      headerTitle: "Customer story",
      cta: { label: "Read more", to: "/" },
      ...(includeVideoSrc && {
        videoSrc: "https://www.youtube.com/embed/lKqro_1i3Zs",
      }),
      content: (
        <div className='flex flex-col gap-2'>
          <RichText className='swiper-no-swiping b2 cursor-default'>{text}</RichText>
          {includeLogoSrc ? (
            <RichText className='swiper-no-swiping b5 text-gray-dark-logo cursor-default'>
              {author}
            </RichText>
          ) : (
            <RichText className='swiper-no-swiping b5 text-gray-text cursor-default'>
              {author}
            </RichText>
          )}
          {includeLogoSrc && (
            <img
              src='https://i.ibb.co/KVDVM50/placeholder.png'
              className=' w-25 m-auto'
              alt=''
            />
          )}
        </div>
      ),
    }
  })
}

const customerStoryItems = [
  {
    key: 1,
    headerTitle: "Customer Story",
    image: {
      src: "/static/images/property-orange.png",
      alt: "Lakehouse for Financial Services Ad",
    },
    headerImage: { src: "/static/images/logo-gray-devon-energy.svg" },
    videoSrc: "https://vimeo.com/802662557",
    content: (
      <>
        <h2 className='swiper-no-swiping h2 cursor-default'>
          AI is transforming the drug industry
        </h2>
        <p>
          AstraZeneca leverages data and NLP to help scientists research novel drugs
        </p>
      </>
    ),
  },
  {
    key: 2,
    headerTitle: "Customer Story",
    image: {
      src: "/static/images/property-yellow.png",
      alt: "Lakehouse for Financial Services Ad",
    },
    headerImage: { src: "/static/images/logo-gray-devon-energy.svg" },
    cta: { label: "Learn more", to: "/" },
    content: (
      <>
        <h2 className=' cursor-default'>AI is transforming the drug industry</h2>
        <p>
          AstraZeneca leverages data and NLP to help scientists research novel drugs
        </p>
      </>
    ),
  },
  {
    key: 3,
    headerTitle: "Customer Story",
    image: {
      src: "/static/images/property-green.png",
      alt: "Lakehouse for Financial Services Ad",
    },
    headerImage: { src: "/static/images/logo-gray-devon-energy.svg" },
    videoSrc: "https://www.youtube.com/embed/8TDwdIsslVw",
    content: (
      <>
        <h2 className='swiper-no-swiping h2 cursor-default'>
          AI is transforming the drug industry
        </h2>
        <p>
          AstraZeneca leverages data and NLP to help scientists research novel drugs
        </p>
      </>
    ),
  },
]

const items = generateItems(false)

const logoItems = generateItems(false, true)

const itemsCTA = generateItems(false, false, true)

const videoItems = generateItems(true)

export { items, videoItems, logoItems, itemsCTA, customerStoryItems }
