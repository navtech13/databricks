import React from "react"
import CtaImageBlock from "../CtaImageBlock"
import RichText from "../RichText"
import LinkComponent from "../Link"
import Wrapper from "../Wrapper"

const data = [
  {
    animationItem: "/static/images/sample-lottie.json",
    description: `
    <h3 class="mb-2.5">Data lakehouse: The best of both worlds in one platform</h3>
    <p class='b3'>A data lakehouse unifies the best of data warehouses and data lakes in one simple platform to handle all your data, analytics and AI use cases. It’s built on an open and reliable data foundation that efficiently handles all data types and applies one common security and governance approach across all of your data and cloud platforms.</p>
    `,
    cta: {
      label: "Learn more",
      to: "/",
    },
    id: "1",
  },
]

const items = data.map((item) => {
  return (
    <Wrapper>
      <CtaImageBlock
        spaceBetween={0}
        imageWidth={4}
        key={item.id}
        imagePosition='left'
        lottie={{ animationSrc: item.animationItem }}
      >
        <RichText className='mb-2'>{item.description}</RichText>
        {item.cta && (
          <LinkComponent className='arrow-icon' to={item.cta.to}>
            {item.cta.label}
          </LinkComponent>
        )}
      </CtaImageBlock>
    </Wrapper>
  )
})

export default items
