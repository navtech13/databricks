import React from "react"
import Grid from "../Grid"
import CtaBlock from "../CtaBlock"
import FeatureTextBox from "../FeatureTextBox"

const ctaBlocks = [
  {
    id: "1",
    image: {
      src: "/static/images/image-portrait-ali-ghodsi.jpg",
      alt: "Image",
    },
    description: `<p class="title">Kate Sullivan - 1</p><p>Technical Curriculum Developer</p><p class="accent">Databricks</p>`,
  },
  {
    id: "2",
    image: {
      src: "/static/images/image-portrait-ali-ghodsi.jpg",
      alt: "Image",
    },
    description: `<p class="title">Kate Sullivan - 2</p><p>Technical Curriculum Developer</p><p class="accent">Databricks</p>`,
  },
  {
    id: "3",
    image: {
      src: "/static/images/image-portrait-ali-ghodsi.jpg",
      alt: "Image",
    },
    description: `<p class="title">Kate Sullivan - 3</p><p>Technical Curriculum Developer</p><p class="accent">Databricks</p>`,
  },
  {
    id: "4",
    image: {
      src: "/static/images/image-portrait-ali-ghodsi.jpg",
      alt: "Image",
    },
    description: `<p class="title">Kate Sullivan - 3</p><p>Technical Curriculum Developer</p><p class="accent">Databricks</p>`,
  },
]
const logo = {
  src: "/static/images/logo-hyperloop.png",
  alt: "",
}

const description = `Hyperloop is pioneering the fifth mode of transportation. Before they even broke ground, Virgin Hyperloop’s data team built the whole thing out of data. See how.`

const cta = {
  to: "/",
  label: "Learn more",
}

const intro = (
  <FeatureTextBox cta={cta} image={logo}>
    {description}
  </FeatureTextBox>
)
const slides = [
  {
    id: "1",
    intro,
    items: ctaBlocks,
  },
  {
    id: "2",
    intro,
    items: ctaBlocks.slice(0, 1),
  },
  {
    id: "3",
    intro,
    items: ctaBlocks.slice(0, 2),
  },
  {
    id: "4",
    intro,
    items: ctaBlocks.slice(0, 3),
  },
]

const teamSlider = slides.map((item) => {
  return {
    id: item.id,
    content: (
      <>
        <div className='mb-4'>{item.intro}</div>
        <Grid
          columns={item.items.length <= 3 ? `${item.items.length}:4` : "2:4"}
          gap={6}
          className='gap-y-4 md:gap-2 lg:gap-4'
        >
          {item.items.map((ctaBlock) => (
            <CtaBlock
              variant='profileGray'
              key={ctaBlock.id}
              image={ctaBlock.image}
              description={ctaBlock.description}
            />
          ))}
        </Grid>
      </>
    ),
  }
})

export default teamSlider
