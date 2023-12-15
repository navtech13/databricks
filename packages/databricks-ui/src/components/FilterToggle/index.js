import React, { useState, useEffect } from "react"
import RichText from "../RichText"
import IconResolver from "../IconResolver"

const FilterToggle = () => {
  const [toggle, setToggle] = useState(false)

  useEffect(() => {
    if (window.innerWidth <= 992) {
      setToggle(true)
    }
  }, [])

  return (
    <div
      data-cy='FilterToggle'
      className='bg-navy-06 flex items-center justify-between px-1.5 py-1 text-white hover:cursor-pointer'
      onClick={() => setToggle(!toggle)}
      onKeyDown={() => setToggle(!toggle)}
      role='checkbox'
      aria-checked={toggle}
      tabIndex='0'
      aria-labelledby='chk1-label'
    >
      <div>
        <RichText>
          <span>{toggle ? "Show " : "Hide "}</span>filters
        </RichText>
      </div>
      <IconResolver token='hourglass' />
    </div>
  )
}

export default FilterToggle
