import React from "react"
import Card from "../Card"

const cardData = [
  {
    key: 1,
    description: "Faster, more accurate demand forecasting",
    image: {
      src: "/static/images/CategoryIcon-DataAI-3.png",
      alt: "icon",
    },
    cta: {
      to: "/",
    },
  },
  {
    key: 2,
    description: "Recommendation engines",
    image: {
      src: "/static/images/CategoryIcon-DataAI-3.png",
      alt: "icon",
    },
    cta: {
      to: "/",
    },
  },
  {
    key: 3,
    description: "Environmental, social, and governance insight",
    image: {
      src: "/static/images/CategoryIcon-DataAI-3.png",
      alt: "icon",
    },
    cta: {
      to: "/",
    },
  },
  {
    key: 4,
    description: "Sales forecasting and advertising attribution",
    image: {
      src: "/static/images/CategoryIcon-DataAI-3.png",
      alt: "icon",
    },
    cta: {
      to: "/",
    },
  },
]

const cardComponents = {
  items: cardData.map((card) => <Card {...card} variant='iconSmall' />),
  description:
    "Databricks on AWS allows you to store and manage all of your data on a simple, open lakehouse platform that combines the best of data warehouses and data lakes to unify all of your analytics and AI workloads.",
}

export default cardComponents
