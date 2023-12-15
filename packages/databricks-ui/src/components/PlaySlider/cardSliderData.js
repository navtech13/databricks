import React from "react"
import Card from "../Card"

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

export default items
