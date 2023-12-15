import React from "react"
import Image from "../Image"

const slider = [
  {
    id: "1",
    image: {
      src: "/static/images/imageSlider-1.png",
      alt: "Image",
    },
  },
  {
    id: "2",
    image: {
      src: "/static/images/imageSlider-2.png",
      alt: "Image",
    },
  },
  {
    id: "3",
    image: {
      src: "/static/images/imageSlider-3.png",
      alt: "Image",
    },
  },
]

const items = slider.map(({ image, id }) => {
  return {
    id,
    content: <Image key={id} {...image} />,
  }
})

export default items
