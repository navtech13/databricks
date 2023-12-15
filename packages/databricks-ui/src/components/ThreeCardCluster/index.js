import React from "react"
import PropTypes from "prop-types"

const ThreeCardCluster = ({ children }) => {
  return (
    <>
      <div className='relative hidden md:block'>
        <div className='top-0 left-0 h-full md:pb-2 lg:absolute lg:w-8/12 lg:pb-0'>
          {children[0]}
        </div>
        <div className='lg:ml-[66.66%] lg:pl-4'>
          <div className='grid gap-2 md:grid-cols-2 lg:grid-cols-1 lg:grid-rows-2 lg:gap-4'>
            {React.Children.toArray(children)
              .slice(1, 3)
              .map((card) => (
                <div key={card.id} className='row-span-1 flex-shrink-0'>
                  {card}
                </div>
              ))}
          </div>
        </div>
      </div>

      <div className='scroll-bar-transparent flex gap-2 pb-2 md:hidden'>
        {React.Children.toArray(children)
          .slice(0, 3)
          .map((card) => (
            <div key={card.id} className='w-11/12 flex-shrink-0'>
              {card}
            </div>
          ))}
      </div>
    </>
  )
}

ThreeCardCluster.propTypes = {
  children: PropTypes.node.isRequired,
}

export default ThreeCardCluster
