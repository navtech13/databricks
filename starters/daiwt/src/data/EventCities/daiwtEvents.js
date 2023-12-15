import React from "react"
import {
  tokyoDis,
  tokyo,
  sydneyDis,
  sydney,
  sydneySoldOut,
  londonDis,
  london,
  londonSoldOut,
  newYorkDis,
  newYork,
  newYorkSoldOut,
  parisDis,
  paris,
  parisSoldOut,	   
  amerDis,
  amer,
  emeaDis,
  emea,
  apjDis,
  apj,
  kualaLumpurDis,
  kualaLumpur,
  saoPauloDis,
  saoPaulo,
  melbourneDis,
  melbourne,
  mumbaiDis,
  mumbai,
  singaporeDis,
  singapore,
  torontoDis,
  toronto,
  chicagoDis,
  chicago,
  stockholmDis,
  stockholm,
  aucklandDis,
  auckland,
  munichDis,
  munich,
  telAvivDis,
  telAviv,
  zurichDis,
  zurich,
  amsterdamDis,
  amsterdam,
  madridDis,
  madrid,
  milanDis,
  milan,
  brisbaneDis,
  brisbane,
  newDelhiDis,
  newDelhi,
} from "./images"

const formPage = "/dataaisummit/worldtour#sign-up"

const cards = [
  {
    city: ["Tokyo, Japan"],
    tier: 1,
    date: "14 September ",
    month: ["September 2023"],
    region: ["Asia-Pacific"],
    language: ["Japanese"],
    type: ["In-Person"],
    image: {
      src: tokyo,
      alt: "tokyo",
    },
    disableImage: {
      src: tokyoDis,
      alt: "tokyo",
    },
    cta: {
      text: "Register Now",
      to: "https://register.dataaisummit.com/flow/db/dawt23tky/mainevent/page/mainevent",
    },
  },
  {
    city: ["Sydney, Australia"],
    tier: 1,
    date: "19–20 September",
    month: ["September 2023"],
    region: ["Asia-Pacific"],
    language: ["English"],
    type: ["In-Person"],
    image: {
      src: sydneySoldOut,
      alt: "Sydney",
    },
    disableImage: {
      src: sydneyDis,
      alt: "Sydney",
    },
    cta: {
      text: "Learn More",
      to: "https://register.dataaisummit.com/flow/db/dawt23syd/mainevent/page/mainevent",
    },
  },
  {
    city: ["London, England"],
    tier: 1,
    date: "18 October",
    month: ["October 2023"],
    region: ["Europe, Middle East & Africa"],
    language: ["English"],
    type: ["In-Person"],
    image: {
      src: londonSoldOut,
      alt: "Image",
    },
    disableImage: {
      src: londonDis,
      alt: "Image",
    },
    cta: {
      text: "Learn More",
      to: "https://register.dataaisummit.com/flow/db/dawt23lon/mainevent/page/mainevent",
    },
  },
  {
    city: ["New York City, USA"],
    tier: 1,
    date: "8 November",
    month: ["November 2023"],
    region: ["Americas"],
    language: ["English"],
    type: ["In-Person"],
    image: {
      src: newYorkSoldOut,
      alt: "newYork",
    },
    disableImage: {
      src: newYorkDis,
      alt: "newYork",
    },
    cta: {
      text: "Learn more",
      to: "https://register.dataaisummit.com/flow/db/dawt23nyc/mainevent/page/mainevent",
    },
  },
  {
    city: ["Paris, France"],
    tier: 1,
    date: "9 November",
    month: ["November 2023"],
    region: ["Europe, Middle East & Africa"],
    language: ["French"],
    type: ["In-Person"],
    image: {
      src: parisSoldOut,
      alt: "Image",
    },
    disableImage: {
      src: parisDis,
      alt: "Image",
    },
    cta: {
      text: "Learn more",
      to: "https://register.dataaisummit.com/flow/db/dawt23par/mainevent/page/mainevent",
    },
  },
  {
    city: ["Virtual"],
    tier: 1,
    date: "18 January",
    month: ["January 2024"],
    region: ["Americas"],
    language: ["English"],
    type: ["Virtual"],
    image: {
      src: amer,
      alt: "Image",
    },
    disableImage: {
      src: amerDis,
      alt: "Image",
    },
    cta: {
      text: "Register Now",
      to: "https://register.dataaisummit.com/flow/db/dawt23vamer/mainevent/page/mainevent",
    },
  },
  {
    city: ["Virtual"],
    tier: 1,
    date: "18 January",
    month: ["January 2024"],
    region: ["Europe, Middle East & Africa"],
    language: ["English"],
    type: ["Virtual"],
    image: {
      src: emea,
      alt: "Image",
    },
    disableImage: {
      src: emeaDis,
      alt: "Image",
    },
    cta: {
      text: "Register Now",
      to: "https://register.dataaisummit.com/flow/db/dawt23vemea/mainevent/page/mainevent",
    },
  },
  {
    city: ["Virtual"],
    tier: 1,
    date: "18 January",
    month: ["January 2024"],
    region: ["Asia-Pacific"],
    language: ["English"],
    type: ["Virtual"],
    image: {
      src: apj,
      alt: "Image",
    },
    disableImage: {
      src: apjDis,
      alt: "Image",
    },
    cta: {
      text: "Register Now",
      to: "https://register.dataaisummit.com/flow/db/dawt23vapj/mainevent/page/mainevent",
    },
  },
  {
    city: ["Kuala Lumpur, Malaysia"],
    tier: 2,
    date: "15 August",
    month: ["August 2023"],
    region: ["Asia-Pacific"],
    language: ["English"],
    type: ["In-Person"],
    image: {
      src: kualaLumpur,
      alt: "Image",
    },
    disableImage: {
      src: kualaLumpurDis,
      alt: "Image",
    },
    cta: {
      to: "https://events.databricks.com/DataAI_World_Tour_Kuala_Lumpur",
      text: "Register Now",
    },
  },
  {
    city: ["São Paulo, Brazil"],
    tier: 2,
    date: "29 August",
    month: ["August 2023"],
    region: ["Americas"],
    language: ["Portuguese"],
    type: ["In-Person"],
    image: {
      src: saoPaulo,
      alt: "Image",
    },
    disableImage: {
      src: saoPauloDis,
      alt: "Image",
    },
    cta: {
      to: "https://events.databricks.com/DAIWT_SP",
      text: "Register Now",
    },
  },
  {
    city: ["Melbourne, Australia"],
    tier: 2,
    date: "31 August",
    month: ["August 2023"],
    region: ["Asia-Pacific"],
    language: ["English"],
    type: ["In-Person"],
    image: {
      src: melbourne,
      alt: "Image",
    },
    disableImage: {
      src: melbourneDis,
      alt: "Image",
    },
    cta: {
      text: "Register Now",
      to: "https://events.databricks.com/data_ai_world_tour_melbourne_2023",
    },
  },
  {
    city: ["Mumbai, India"],
    tier: 2,
    date: "15 September",
    month: ["September 2023"],
    region: ["Asia-Pacific"],
    language: ["English"],
    type: ["In-Person"],
    image: {
      src: mumbai,
      alt: "Image",
    },
    disableImage: {
      src: mumbaiDis,
      alt: "Image",
    },
    cta: {
      text: "Register Now",
      to: "https://events.databricks.com/DataAI_World_Tour_Mumbai_Practitioners_Track/waitlist",
    },
  },
  {
    city: ["Singapore, Republic of Singapore"],
    tier: 2,
    date: "22 September",
    month: ["September 2023"],
    region: ["Asia-Pacific"],
    language: ["English"],
    type: ["In-Person"],
    image: {
      src: singapore,
      alt: "Image",
    },
    disableImage: {
      src: singaporeDis,
      alt: "Image",
    },
    cta: {
      text: "Register Now",
      to: "https://events.databricks.com/DataAI_World_Tour_Singapore",
    },
  },
  {
    city: ["Toronto, Canada"],
    tier: 2,
    date: "21 September",
    month: ["September 2023"],
    region: ["Americas"],
    language: ["English"],
    type: ["In-Person"],
    image: {
      src: toronto,
      alt: "Image",
    },
    disableImage: {
      src: torontoDis,
      alt: "Image",
    },
    cta: {
      text: "Register Now",
      to: "https://events.databricks.com/dataai_world_tour_toronto",
    },
  },
  {
    city: ["Chicago, United States"],
    tier: 2,
    date: "3 October",
    month: ["October 2023"],
    region: ["Americas"],
    language: ["English"],
    type: ["In-Person"],
    image: {
      src: chicago,
      alt: "Image",
    },
    disableImage: {
      src: chicagoDis,
      alt: "Image",
    },
    cta: {
      text: "Register Now",
      to: "https://events.databricks.com/dataaiworldtourchicago",
    },
  },
  {
    city: ["Stockholm, Sweden"],
    tier: 2,
    date: "3 October",
    month: ["October 2023"],
    region: ["Europe, Middle East & Africa"],
    language: ["English"],
    type: ["In-Person"],
    image: {
      src: stockholm,
      alt: "Image",
    },
    disableImage: {
      src: stockholmDis,
      alt: "Image",
    },
    cta: {
      text: "Register Now",
      to: "https://events.databricks.com/DataAI_World_Tour_Stockholm",
    },
  },
  {
    city: ["Auckland, New Zealand"],
    tier: 2,
    date: "10 October",
    month: ["October 2023"],
    region: ["Asia-Pacific"],
    language: ["English"],
    type: ["In-Person"],
    image: {
      src: auckland,
      alt: "Image",
    },
    disableImage: {
      src: aucklandDis,
      alt: "Image",
    },
    cta: {
      text: "Register Now",
      to: "https://events.databricks.com/data_ai_world_tour_auckland_2023",
    },
  },
  {
    city: ["Munich, Germany"],
    tier: 2,
    date: "7 November",
    month: ["November 2023"],
    region: ["Europe, Middle East & Africa"],
    language: ["English"],
    type: ["In-Person"],
    image: {
      src: munich,
      alt: "Image",
    },
    disableImage: {
      src: munichDis,
      alt: "Image",
    },
    cta: {
      text: "Register Now",
      to: "https://events.databricks.com/DataAI_World_Tour_Munich",
    },
  },
  {
    city: ["Tel Aviv, Israel"],
    tier: 2,
    date: "Postponed",
    month: ["Postponed"],
    region: ["Europe, Middle East & Africa"],
    language: ["English"],
    type: ["In-Person"],
    image: {
      src: telAviv,
      alt: "Image",
    },
    disableImage: {
      src: telAvivDis,
      alt: "Image",
    },
    cta: {
      text: "Postponed",
      to: formPage,
    },
  },
  {
    city: ["Zurich, Switzerland"],
    tier: 2,
    date: "23 November",
    month: ["November 2023"],
    region: ["Europe, Middle East & Africa"],
    language: ["English"],
    type: ["In-Person"],
    image: {
      src: zurich,
      alt: "Image",
    },
    disableImage: {
      src: zurichDis,
      alt: "Image",
    },
    cta: {
      text: "Register Now",
      to: "https://events.databricks.com/DataAI_World_Tour_Zurich",
    },
  },
  {
    city: ["Amsterdam, Netherlands"],
    tier: 2,
    date: "23 November",
    month: ["November 2023"],
    region: ["Europe, Middle East & Africa"],
    language: ["English"],
    type: ["In-Person"],
    image: {
      src: amsterdam,
      alt: "Image",
    },
    disableImage: {
      src: amsterdamDis,
      alt: "Image",
    },
    cta: {
      text: "Register Now",
      to: "https://events.databricks.com/data_ai_world_tour_amsterdam_2023",
    },
  },
  {
    city: ["Madrid, Spain"],
    tier: 2,
    date: "28 November",
    month: ["November 2023"],
    region: ["Europe, Middle East & Africa"],
    language: ["Spanish"],
    type: ["In-Person"],
    image: {
      src: madrid,
      alt: "Image",
    },
    disableImage: {
      src: madridDis,
      alt: "Image",
    },
    cta: {
      text: "Register Now",
      to: "https://events.databricks.com/data_ai_world_tour_Madrid_2023",
    },
  },
  {
    city: ["Milan, Italy"],
    tier: 2,
    date: "30 November",
    month: ["November 2023"],
    region: ["Europe, Middle East & Africa"],
    language: ["English"],
    type: ["In-Person"],
    image: {
      src: milan,
      alt: "Image",
    },
    disableImage: {
      src: milanDis,
      alt: "Image",
    },
    cta: {
      text: "Register Now",
      to: "https://events.databricks.com/data_ai_world_tour_Milan_2023",
    },
  },
  {
    city: ["Brisbane, Australia"],
    tier: 2,
    date: "14 November",
    month: ["November 2023"],
    region: ["Asia-Pacific"],
    language: ["English"],
    type: ["In-Person"],
    image: {
      src: brisbane,
      alt: "Image",
    },
    disableImage: {
      src: brisbaneDis,
      alt: "Image",
    },
    cta: {
      text: "Register Now",
      to: "https://events.databricks.com/data_ai_world_tour_brisbane_2023",
    },
  },
]

const updatedCards = cards.map((card) => {
  const currentDate = new Date()
  currentDate.setHours(0, 0, 0, 0)
  const { date, month } = card
  const [day] = date.split(" ")
  const [monthName, year] = month[0].split(" ")
  let formattedDateString = ``
  let hasPassed = null
  let eventDate = null

  if (year && day !== "TBD" && monthName) {
    formattedDateString = `${monthName} ${day}, ${year}`
    eventDate = new Date(`${monthName}${day.split("–").pop()} ${year}`)
    const eventDateTime = eventDate.setHours(0, 0, 0, 0)
    hasPassed = eventDateTime <= currentDate.getTime()
  }
  if (year && day === "TBD" && monthName) {
    formattedDateString = `${monthName}, ${year}`
    eventDate = new Date(`${monthName} ${year}`)
    const eventDateTime = eventDate.setHours(0, 0, 0, 0)
    hasPassed = eventDateTime < currentDate.getTime()
  }
  const description = (
    <div className='text-navy-800 mb-0 flex flex-col'>
      <p className='text-1.75'>{card.type}</p>
      <p className='text-2.5 font-bold'>{card.city[0]}</p>
      {formattedDateString && <p className='text-2'>{formattedDateString}</p>}
    </div>
  )
  return {
    ...card,
    description,
    hasPassed,
    eventDate,
  }
})

export default updatedCards
