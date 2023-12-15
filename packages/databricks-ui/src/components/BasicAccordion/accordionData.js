import React from "react"
import RichText from "../RichText"

const description = `<p class="font-bold h5">Example of session title that is longer and possibly wraps to a second line</p><p class="font-bold b6">December 22, 10:00AM</p>`
const children = `<p>Consectetur dolor iste quia autem ut ducimus. Exercitationem iure suscipit est. Fugit cumque cupiditate molestias dolorem et asperiores tempora similique. Voluptatem sunt maiores cumque ea provident. Numquam libero repudiandae distinctio ad in ipsum placeat modi veniam. Et rerum cupiditate expedita distinctio voluptates.</p>
<br /><ul><li>List #1</li><li>List #2</li><li>List #3</li></ul>`
const childrenlarge = `<p class='b2'>Consectetur dolor iste quia autem ut ducimus. Exercitationem iure suscipit est. Fugit cumque cupiditate molestias dolorem et asperiores tempora similique. Voluptatem sunt maiores cumque ea provident. Numquam libero repudiandae distinctio ad in ipsum placeat modi veniam. Et rerum cupiditate expedita distinctio voluptates.</p>
<br /><ul><li>List #1</li><li>List #2</li><li>List #3</li></ul>`
const descriptionLarge = `Consectetur dolor iste quia autem ut ducimus`

const accordionList = [
  {
    descriptionLarge,
    description,
    children,
    childrenlarge,
    key: 1,
  },
  {
    descriptionLarge,
    description,
    children,
    childrenlarge,
    key: 2,
  },
  {
    descriptionLarge,
    description,
    children,
    childrenlarge,
    key: 3,
  },
  {
    descriptionLarge,
    description,
    children,
    childrenlarge,
    key: 4,
  },
  {
    descriptionLarge,
    description,
    children,
    childrenlarge,
    key: 5,
  },
]

const accordionData = accordionList.map((item) => {
  return {
    key: item.key,
    description: item.description,
    children: [<RichText>{item.children}</RichText>],
  }
})

const accordionLargeData = accordionList.map((item) => {
  return {
    key: item.key,
    description: item.descriptionLarge,
    children: [<RichText>{item.childrenlarge}</RichText>],
  }
})

export { accordionData, accordionLargeData }
