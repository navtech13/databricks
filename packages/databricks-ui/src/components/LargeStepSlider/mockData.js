import React from "react"
import LargeCustomerCard from "../LargeCustomerCard"
import PartnerSolutionCard from "../PartnerSolutionCard"
import Card from "../Card"

const MockCards = (variant = "largeCustomerCard") => {
  return fetch(`/cards/${variant}`)
    .then((res) => res.json())
    .then(({ data }) =>
      data.elements.map((item) => {
        if (variant === "largeCustomerCard") {
          return <LargeCustomerCard {...item} />
        }
        if (variant === "partnerSolutionCard") {
          return (
            <PartnerSolutionCard
              key={`${item.title}${item.eyebrow}${item.image.src}`}
              logo={item.image}
              {...item}
            />
          )
        }
        if (variant === "resource") {
          return (
            <Card
              key={item.description}
              className='h-full'
              variant={variant}
              image={item.image}
              link={item.link}
              description={item.description}
              cta={item.cta}
              summary={item.summary}
            />
          )
        }
        return <></>
      })
    )
}

export default MockCards
