import React from "react"
import RichText from "../RichText"
import TextLink from "../TextLink"
import Slider from "../PlaySlider"
import Card from "../Card"
import CtaImageBlock from "../CtaImageBlock"
import CtaHexImage from "../CtaHexImage"

const slider = [
  {
    id: "1",
    image: {
      src: "/static/images/2022-04-pf-track-target-mofu-demand-forecasting-ty-tn-362x190-2x.png",
      alt: "Image",
    },
    cta: {
      to: "https://www.databricks.com/solutions/industries/advertising-and-marketing",
      text: "Self-guided tour",
    },
    description: `<div class="h6 mb-2">Report</div>
      <div class="h4 mb-2 font-bold">Evaluating Data Science and Machine Learning Platforms</div>
      <div class="b4 mb-5 md:mb-10 lg:mb-12">Gartner names Databricks a leader in its 2021 Magic Quadrant for Data Science and Machine Learning Platforms.</div>`,
  },
  {
    id: "2",
    image: {
      src: "/static/images/2022-04-databricks-for-financial-services-ty-tn-362x190-2x.png",
      alt: "Image",
    },
    cta: {
      to: "https://www.databricks.com/solutions/industries/advertising-and-marketing",
      text: "Self-guided tour",
    },
    description: `<div class="h6 mb-2">Report</div>
      <div class="h4 mb-2 font-bold">Evaluating Data Science and Machine Learning Platforms</div>
      <div class="b4 mb-5 md:mb-10 lg:mb-12">Gartner names Databricks a leader in its 2021 Magic Quadrant for Data Science and Machine Learning Platforms.</div>
      `,
  },
  {
    id: "3",
    image: {
      src: "/static/images/manufacturing-leaders-forum-og-image.png",
      alt: "Image",
    },
    cta: {
      to: "https://www.databricks.com/solutions/industries/advertising-and-marketing",
      text: "Webinar",
    },
    description: `<div class="h6 mb-2">Report</div>
      <div class="h4 mb-2 font-bold">Evaluating Data Science and Machine Learning Platforms</div>
      <div class="b4 mb-5 md:mb-10 lg:mb-12">Gartner names Databricks a leader in its 2021 Magic Quadrant for Data Science and Machine Learning Platforms.</div>`,
  },
  {
    id: "4",
    image: {
      src: "/static/images/manufacturing-leaders-forum-og-image.png",
      alt: "Image",
    },
    cta: {
      to: "https://www.databricks.com/solutions/industries/advertising-and-marketing",
      text: "Webinar",
    },
    description: `<div class="h6 mb-2">Report</div>
      <div class="h4 mb-2 font-bold">Evaluating Data Science and Machine Learning Platforms</div>
      <div class="b4 mb-5 md:mb-10 lg:mb-12">Gartner names Databricks a leader in its 2021 Magic Quadrant for Data Science and Machine Learning Platforms.</div>`,
  },
  {
    id: "5",
    image: {
      src: "/static/images/manufacturing-leaders-forum-og-image.png",
      alt: "Image",
    },
    cta: {
      to: "https://www.databricks.com/solutions/industries/advertising-and-marketing",
      text: "Webinar",
    },
    description: `<div class="h6 mb-2">Report</div>
      <div class="h4 mb-2 font-bold">Evaluating Data Science and Machine Learning Platforms</div>
      <div class="b4 mb-5 md:mb-10 lg:mb-12">Gartner names Databricks a leader in its 2021 Magic Quadrant for Data Science and Machine Learning Platforms.</div>`,
  },
]

const items = slider.map(({ image, cta, description, id }) => {
  return {
    id,
    content: (
      <Card
        variant='resource'
        key={id}
        image={image}
        cta={cta}
        description={description}
      />
    ),
  }
})

const ctaHexImage = {
  title: "Ready to Learn More",
  items: [
    {
      image: {
        src: "/static/images/leading-edge-talent.jpg",
        alt: "",
      },
      title: "Future proof your data management architecture",
      children: `<p>Receive a Lakehouse architecture consultation and a personalized data and AI maturity assessment for your business.</p>`,
      cta: {
        to: "/",
        label: "Learn more",
      },
    },
    {
      image: {
        src: "/static/images/databricks-university-recruiting.jpg",
        alt: "",
      },
      title: "Get a tailored AI/ML plan for your business",
      children: `<p>Our industry experts will work with you to build a personalized framework to enable your enterprise wide AI/ML strategy.</p>`,
      cta: {
        to: "/",
        label: "Learn more",
      },
    },
  ],
  ctas: [
    { to: "/", label: "Personalized demo" },
    { to: "/", label: "Try for free" },
  ],
}

export const tabData = [
  {
    id: 1,
    label: "Tab One",
    children: (
      <div className='flex flex-col'>
        <RichText>
          <div className=' flex flex-col justify-between gap-6 md:flex-row'>
            <p>
              Ut culpa ex asperiores praesentium. Corrupti id similique vitae placeat
              modi fuga repudiandae fugiat voluptatibus. Eius laudantium dolores
              harum odit animi. Id reprehenderit et sed. Error nam minima ratione
              beatae voluptatem qui temporibus sit. Laudantium repellat ut sunt
              voluptatem nisi.
            </p>
            <TextLink variant='A' className='arrow-icon min-w-max' to='/'>
              See all stories
            </TextLink>
          </div>
        </RichText>
        <div className='xxl:max-w-[1456px] m-auto mx-auto w-full max-w-[80vw] md:max-w-[704px] lg:max-w-[966px] xl:max-w-[1146px]'>
          <Slider items={items} />
        </div>
      </div>
    ),
  },
  {
    id: 2,
    label: "Tab Two ",
    children: (
      <CtaImageBlock
        textLink={{
          to: "/",
          label: "Label",
        }}
        cta={{
          to: "/",
          label: "Label",
        }}
        image={{ src: "/static/images/image-container.png" }}
      >
        <div className=' '>
          <h3>Your H3 Title</h3>
          <p>Your optional lead sentence goes here, displayed slightly larger.</p>
          <p>
            Get trained and certified through Databricks Academy. Learn how to master
            data anayltics from the team that started the Spark research project at
            UC Berkeley.
          </p>
        </div>
      </CtaImageBlock>
    ),
  },
  {
    id: 3,
    label: "Tab Three ",
    children: (
      <div className='flex flex-col gap-5'>
        <RichText>
          <div className=' flex flex-col justify-between gap-6 md:flex-row'>
            <p>
              This is a basic text component, nesting inside a tab wrapper. Any
              element inside the wrapper should be subject to the tab-switching
              functionality.
            </p>
            <TextLink variant='A' className='arrow-icon min-w-max' to='/'>
              See all stories
            </TextLink>
          </div>
        </RichText>
        <div className='flex flex-col'>
          {ctaHexImage.items.map((item) => {
            return (
              <CtaHexImage
                className=' border-gray-lines mb-8 border-t pt-5'
                image={{
                  src: item.image.src,
                  alt: item.image.alt,
                }}
                cta={{
                  label: item.cta.label,
                  to: item.cta.to,
                }}
                title={item.title}
              >
                {item.children}
              </CtaHexImage>
            )
          })}
        </div>
      </div>
    ),
  },
  {
    id: 4,
    label: "Tab Four",
    children: (
      <div className='flex flex-col'>
        <RichText>
          <div className=' flex flex-col justify-between gap-6 md:flex-row'>
            <p>
              Ut culpa ex asperiores praesentium. Corrupti id similique vitae placeat
              modi fuga repudiandae fugiat voluptatibus. Eius laudantium dolores
              harum odit animi. Id reprehenderit et sed. Error nam minima ratione
              beatae voluptatem qui temporibus sit. Laudantium repellat ut sunt
              voluptatem nisi.
            </p>
            <TextLink variant='A' className='arrow-icon min-w-max' to='/'>
              See all stories
            </TextLink>
          </div>
        </RichText>
        <div className='xxl:max-w-[1456px] m-auto mx-auto w-full max-w-[80vw] md:max-w-[704px] lg:max-w-[966px] xl:max-w-[1146px]'>
          <Slider items={items} />
        </div>
      </div>
    ),
  },
  {
    id: 5,
    label: "Tab Five ",
    children: (
      <CtaImageBlock
        textLink={{
          to: "/",
          label: "Label",
        }}
        cta={{
          to: "/",
          label: "Label",
        }}
        image={{ src: "/static/images/image-container.png" }}
      >
        <div className=' '>
          <h3>Your H3 Title</h3>
          <p>Your optional lead sentence goes here, displayed slightly larger.</p>
          <p>
            Get trained and certified through Databricks Academy. Learn how to master
            data anayltics from the team that started the Spark research project at
            UC Berkeley.
          </p>
        </div>
      </CtaImageBlock>
    ),
  },
  {
    id: 6,
    label: "Tab Six ",
    children: (
      <div className='flex flex-col gap-5'>
        <RichText>
          <div className=' flex flex-col justify-between gap-6 md:flex-row'>
            <p>
              This is a basic text component, nesting inside a tab wrapper. Any
              element inside the wrapper should be subject to the tab-switching
              functionality.
            </p>
            <TextLink variant='A' className='arrow-icon min-w-max' to='/'>
              See all stories
            </TextLink>
          </div>
        </RichText>
        <div className='flex flex-col'>
          {ctaHexImage.items.map((item) => {
            return (
              <CtaHexImage
                className=' border-gray-lines mb-8 border-t pt-5'
                image={{
                  src: item.image.src,
                  alt: item.image.alt,
                }}
                cta={{
                  label: item.cta.label,
                  to: item.cta.to,
                }}
                title={item.title}
              >
                {item.children}
              </CtaHexImage>
            )
          })}
        </div>
      </div>
    ),
  },
  {
    id: 7,
    label: "Tab Seven ",
    children: (
      <CtaImageBlock
        textLink={{
          to: "/",
          label: "Label",
        }}
        cta={{
          to: "/",
          label: "Label",
        }}
        image={{ src: "/static/images/image-container.png" }}
      >
        <div className=' '>
          <h3>Your H3 Title</h3>
          <p>Your optional lead sentence goes here, displayed slightly larger.</p>
          <p>
            Get trained and certified through Databricks Academy. Learn how to master
            data anayltics from the team that started the Spark research project at
            UC Berkeley.
          </p>
        </div>
      </CtaImageBlock>
    ),
  },
]
