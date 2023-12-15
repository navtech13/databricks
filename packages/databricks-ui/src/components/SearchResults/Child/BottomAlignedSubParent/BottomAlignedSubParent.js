import React from 'react'
import BottomAlignedCards from '../BottomAlignedCards/BottomAlignedCards'
function BottomAlignedSubParent() {
  let CardData = [
    {
      img: "https://cms.databricks.com/sites/default/files/styles/medium/public/2022-10/search-thumbnail-communityPromo.png",
	  type:"DATABRICKS COMMUNITY",
      title: "Looking for answers? Try the Community!",
      para: "Join now for access to expertise, advice and pro tips from people who use Databricks every day.",
	  linkLabel: "Join today",
	  hlink: "https://community.databricks.com/s/?_gl=1*wmhqlo*_ga*MTE5MTc3NjE3Mi4xNjQ5NzA2OTI0*_ga_PQS[…]a=2.70271504.1401421996.1666906051-1191776172.1649706924"
    }, {
      img: "https://cms.databricks.com/sites/default/files/styles/medium/public/2022-10/search-thumbnail-docsPromo.png",
	  type:"DOCUMENTATION",
      title: "Dive into the Databricks Docs",
      para: "The most in-depth source for Databricks technical information",
	  linkLabel: "Browse the docs",
	  hlink: "https://docs.databricks.com/"
    },

  ]
  return (
    <section className='flex mt-9 flex-col lg:flex-row '>
      {CardData.map((data) => <BottomAlignedCards data={data} />)}
    </section>
  )
}

export default BottomAlignedSubParent