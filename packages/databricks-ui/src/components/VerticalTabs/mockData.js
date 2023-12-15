import React from "react"

const verticalTabs = [
  {
    title: "Customer engagement",
    subtitle: "Bring relevance and hyper-personalization to every touchpoint",
    subchildren:
      "With real-time, accurate 360° views of their customers, retailers have everything they need to create relationships on each customer’s terms: understanding sentiment across channels and personalizing recommendations. The result? Increased profitability and loyalty.",
    children: (
      <iframe
        width='100%'
        className='bg-gray-text aspect-video'
        src='https://www.youtube-nocookie.com/embed/U15lKkzLlTA'
        title='YouTube video player'
        frameborder='0'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
        allowfullscreen
      />
    ),
    customer: {
      eyebrow: "Customer Story",
      text: "80% Growth in email marketing from personalization",
      image: {
        label: "Pandora",
        src: "/static/images/logo-color-pandora-Jewelry.svg",
      },
      cta: {
        to: "/",
        label: "See how",
      },
    },
  },
  {
    title: "Operational efficiency",
    subtitle: "Optimize efficiency, maximize profitability across the supply chain",
    subchildren:
      "With real-time, accurate 360° views of their customers, retailers have everything they need to create relationships on each customer’s terms: understanding sentiment across channels and personalizing recommendations. The result? Increased profitability and loyalty.",
    customer: {
      eyebrow: "Customer Story",
      text: "80% Growth in email marketing from personalization",
      image: {
        label: "Walgreens",
        src: "/static/images/logo-color-walgreens.svg",
      },
      cta: {
        to: "/",
        label: "See how",
      },
    },
  },
  {
    title: "Employee productivity",
    subtitle: "Unlock productivity through access to real-time insights",
    subchildren:
      "With real-time, accurate 360° views of their customers, retailers have everything they need to create relationships on each customer’s terms: understanding sentiment across channels and personalizing recommendations. The result? Increased profitability and loyalty.",
    customer: {
      eyebrow: "Customer Story",
      text: "80% Growth in email marketing from personalization",
      image: {
        label: "",
        src: "/static/images/logo-color-burberry.svg",
      },
      cta: {
        to: "/",
        label: "See how",
      },
    },
  },
  {
    title: "Product performance",
    subtitle:
      "Apply predictability and precision to drive performance in every product and service",
    subchildren:
      "With real-time, accurate 360° views of their customers, retailers have everything they need to create relationships on each customer’s terms: understanding sentiment across channels and personalizing recommendations. The result? Increased profitability and loyalty.",
    children: (
      <iframe
        width='100%'
        className='bg-gray-text aspect-video'
        src='https://www.youtube-nocookie.com/embed/U15lKkzLlTA'
        title='YouTube video player'
        frameborder='0'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
        allowfullscreen
      />
    ),
    customer: {
      eyebrow: "Customer Story",
      text: "80% Growth in email marketing from personalization",
      image: {
        label: "",
        src: "/static/images/logo-color-8481.svg",
      },
      cta: {
        to: "/",
        label: "See how",
      },
    },
  },
]

export default verticalTabs
