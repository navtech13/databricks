import React from "react"
import TextLink from "../TextLink"
import Image from "../Image"
import RichText from "../RichText"

const componentData = {
  items: [
    {
      title: "Reports",
      children: [
        <Image
          key={10}
          src='/static/images/2021-02-Databricks-Gartner-OG-1200x628-1.jpg'
          alt='alt'
        />,
        <TextLink
          key={20}
          variant='a'
          className='arrow-icon-tertiary tertiary-underline text-navy-06 hover:text-navy-03 block'
          to='/'
        >
          Learn more
        </TextLink>,
      ],
    },
    {
      title: "eBooks and blogs",
      children: [
        <Image
          key={1}
          src='/static/images/2021-02-Databricks-Gartner-OG-1200x628-1.jpg'
          alt='alt'
        />,
        <TextLink
          key={20}
          variant='a'
          className='arrow-icon-tertiary tertiary-underline text-navy-06 hover:text-navy-03 block'
          to='/'
        >
          Learn more
        </TextLink>,
        <TextLink
          key={30}
          variant='a'
          className='arrow-icon-tertiary tertiary-underline text-navy-06 hover:text-navy-03 block'
          to='/'
        >
          Big book of ML
        </TextLink>,
        <TextLink
          key={40}
          variant='a'
          className='arrow-icon-tertiary tertiary-underline text-navy-06 hover:text-navy-03 block'
          to='/'
        >
          Introducing MLflow: an Open Source Machine Learning Platform
        </TextLink>,
        <TextLink
          key={50}
          variant='a'
          className='arrow-icon-tertiary tertiary-underline text-navy-06 hover:text-navy-03 block'
          to='/'
        >
          Standardizing the ML Lifecycle
        </TextLink>,
        <TextLink
          key={60}
          variant='a'
          className='arrow-icon-tertiary tertiary-underline text-navy-06 hover:text-navy-03 block'
          to='/'
        >
          Definitive Guide to Delta Lake
        </TextLink>,
        <TextLink
          key={70}
          variant='a'
          className='arrow-icon-tertiary tertiary-underline text-navy-06 hover:text-navy-03 block'
          to='/'
        >
          Modern Cloud Data Platform
        </TextLink>,
        <TextLink
          key={80}
          variant='a'
          className='arrow-icon-tertiary tertiary-underline text-navy-06 hover:text-navy-03 block'
          to='/'
        >
          What Is a Lakehouse?
        </TextLink>,
      ],
    },
    {
      title: "Virtual events",
      children: [
        <Image
          key={10}
          src='/static/images/2021-02-Databricks-Gartner-OG-1200x628-1.jpg'
          alt='alt'
        />,
        <TextLink
          key={20}
          variant='a'
          className='arrow-icon-tertiary tertiary-underline text-navy-06 hover:text-navy-03 block'
          to='/'
        >
          Learn more
        </TextLink>,
        <TextLink
          key={30}
          variant='a'
          className='arrow-icon-tertiary tertiary-underline text-navy-06 hover:text-navy-03 block'
          to='/'
        >
          MLOps Virtual Event: Standardizing MLOps at Scale
        </TextLink>,
        <TextLink
          key={40}
          variant='a'
          className='arrow-icon-tertiary tertiary-underline text-navy-06 hover:text-navy-03 block'
          to='/'
        >
          Automating the ML Lifecycle With Databricks Machine Learning
        </TextLink>,
        <TextLink
          key={50}
          variant='a'
          className='arrow-icon-tertiary tertiary-underline text-navy-06 hover:text-navy-03 block'
          to='/'
        >
          MLOps Virtual Event “Operationalizing Machine Learning at Scale”
        </TextLink>,
        <TextLink
          key={60}
          variant='a'
          className='arrow-icon-tertiary tertiary-underline text-navy-06 hover:text-navy-03 block'
          to='/'
        >
          Building Machine Learning Platforms
        </TextLink>,
        <TextLink
          key={70}
          variant='a'
          className='arrow-icon-tertiary tertiary-underline text-navy-06 hover:text-navy-03 block'
          to='/'
        >
          Modern Cloud Data Platform
        </TextLink>,
        <TextLink
          key={80}
          variant='a'
          className='arrow-icon-tertiary tertiary-underline text-navy-06 hover:text-navy-03 block'
          to='/'
        >
          Delta Lake: The Foundation to Your Lakehouse
        </TextLink>,
      ],
    },
  ],
  noImages: [
    {
      title: "Whitepapers",
      children: [
        <TextLink
          key={1}
          variant='a'
          className='arrow-icon-tertiary tertiary-underline text-navy-06 hover:text-navy-03 block'
          to='/'
        >
          Malesuada aliquam, duis dapibus aliquam. Malesuada aliquam, duis dapibus
          aliquam.
        </TextLink>,
        <TextLink
          key={2}
          variant='a'
          className='arrow-icon-tertiary tertiary-underline text-navy-06 hover:text-navy-03 block'
          to='/'
        >
          Malesuada aliquam, duis dapibus aliquam. Malesuada aliquam, duis dapibus
          aliquam.
        </TextLink>,
        <TextLink
          key={3}
          variant='a'
          className='arrow-icon-tertiary tertiary-underline text-navy-06 hover:text-navy-03 block'
          to='/'
        >
          Malesuada aliquam, duis dapibus aliquam. Malesuada aliquam, duis dapibus
          aliquam.
        </TextLink>,
      ],
    },
    {
      title: "Whitepapers.",
      children: [
        <TextLink
          key={4}
          variant='a'
          className='arrow-icon-tertiary tertiary-underline text-navy-06 hover:text-navy-03 block'
          to='/'
        >
          Malesuada aliquam, duis dapibus aliquam. Malesuada aliquam, duis dapibus
          aliquam.
        </TextLink>,
        <TextLink
          key={5}
          variant='a'
          className='arrow-icon-tertiary tertiary-underline text-navy-06 hover:text-navy-03 block'
          to='/'
        >
          Malesuada aliquam, duis dapibus aliquam. Malesuada aliquam, duis dapibus
          aliquam.
        </TextLink>,
        <TextLink
          key={6}
          variant='a'
          className='arrow-icon-tertiary tertiary-underline text-navy-06 hover:text-navy-03 block'
          to='/'
        >
          Malesuada aliquam, duis dapibus aliquam. Malesuada aliquam, duis dapibus
          aliquam.
        </TextLink>,
      ],
    },
  ],
  itemResources: [
    {
      title: "Customer Story",
      children: [
        <Image
          key={100}
          src='/static/images/2021-02-Databricks-Gartner-OG-1200x628-1.jpg'
          alt='alt'
        />,
        <RichText key={110} variant='body' className='b4 mt-1 mb-4'>
          Learn how Databricks enables Condé Nast to deliver personalized content to
          its customers.
        </RichText>,
        <TextLink
          key={120}
          variant='a'
          className='arrow-icon-tertiary tertiary-underline text-navy-06 hover:text-navy-03 block'
          to='/'
        >
          Learn more
        </TextLink>,
      ],
    },
    {
      title: "Webinar",
      children: [
        <Image
          key={130}
          src='/static/images/2021-02-Databricks-Gartner-OG-1200x628-1.jpg'
          alt='alt'
        />,
        <RichText key={140} variant='body' className='b4 mt-1 mb-4'>
          Learn how Apple and Disney+ unified analytics and AI for success
        </RichText>,
        <TextLink
          key={150}
          variant='a'
          className='arrow-icon-tertiary tertiary-underline text-navy-06 hover:text-navy-03 block'
          to='/'
        >
          Learn more
        </TextLink>,
      ],
    },
    {
      title: "Podcast",
      children: [
        <Image
          key={160}
          src='/static/images/2021-02-Databricks-Gartner-OG-1200x628-1.jpg'
          alt='alt'
        />,
        <RichText key={170} variant='body' className='b4 mt-1 mb-4'>
          Hear about the role of data + AI in healthcare equity from Slawek Kierner,
          SVP, Chief Data and Analytics Officer at Humana
        </RichText>,
        <TextLink
          key={180}
          variant='a'
          className='arrow-icon-tertiary tertiary-underline text-navy-06 hover:text-navy-03 block'
          to='/'
        >
          Learn more
        </TextLink>,
      ],
    },
  ],
}

export default componentData
