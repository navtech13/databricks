import React, { useEffect, useRef, useState } from "react"

const Graphic = () => {
  const graphics = useRef()
  const rightCircle = useRef()
  const leftCircle = useRef()
  const intersectionLayer = useRef()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const element = graphics.current
      if (element) {
        const { top } = element.getBoundingClientRect()
        const windowHeight = window.innerHeight

        if (top < windowHeight) {
          setIsVisible(true)
        } else {
          setIsVisible(false)
        }
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  useEffect(() => {
    if (isVisible) {
      graphics.current.classList.add("hexagonal-graphic")
      rightCircle.current.style.transform = "scale(1)"
      leftCircle.current.style.transform = "scale(1)"
      intersectionLayer.current.style.transform = "scale(1)"
    }
  }, [isVisible])

  return (
    <svg
      className='content-graphic'
      width='879'
      height='554'
      viewBox='0 0 879 554'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <circle
        cx='604'
        cy='277'
        r='247'
        fill='#FABFBA'
        ref={rightCircle}
        style={{
          "transform-origin": "69% 50% ",
          transform: "scale(0.33)",
          transition: "transform 1s",
        }}
      />
      <circle cx='604' cy='277' r='109.5' stroke='#FF3621' />
      <circle cx='604' cy='277' r='81.5' stroke='#FF3621' />
      <circle
        cx='275'
        cy='277'
        r='109.5'
        transform='rotate(-180 275 277)'
        stroke='#FF3621'
      />
      <circle
        cx='275'
        cy='277'
        r='247'
        fill='#FFDB96'
        ref={leftCircle}
        style={{
          "transform-origin": "31% 50% ",
          transform: "scale(0.33)",
          transition: "transform 1s",
        }}
      />
      <circle cx='275' cy='277' r='109.5' stroke='#FFAB00' />
      <circle cx='275' cy='277' r='81.5' stroke='#FFAB00' />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M439.5 461.254C490.129 416.022 522 350.233 522 276.999C522 203.766 490.129 137.976 439.5 92.7441C388.871 137.976 357 203.766 357 276.999C357 350.233 388.871 416.022 439.5 461.254Z'
        fill='#1B3139'
        ref={intersectionLayer}
        style={{
          "transform-origin": "50% 50% ",
          transform: "scale(0.6)",
          transition: "transform 1s",
        }}
      />
      <path
        d='M513.5 215.5V215.5C477.797 267.737 400.539 267.849 365 215.5V215.5'
        stroke='white'
        strokeLinecap='round'
      />
      <path
        d='M365 339V339C400.703 286.763 477.961 286.651 513.5 339V339'
        stroke='white'
        strokeLinecap='round'
      />
      <rect x='576' y='2' width='56' height='56' fill='#FF3621' />
      <path d='M275 554L242.091 497L307.909 497L275 554Z' fill='#1B3139' />
      <rect
        x='879'
        y='249'
        width='56'
        height='56'
        transform='rotate(90 879 249)'
        fill='#FF3621'
      />
      <circle cx='30' cy='274' r='30' fill='#FF3621' />
      <path
        d='M843.889 138.501L810.98 195.501L778.071 138.501L843.889 138.501Z'
        fill='#1B3139'
      />
      <path
        d='M35.1108 415.499L68.0198 358.499L100.929 415.499L35.1108 415.499Z'
        fill='#1B3139'
      />
      <circle
        cx='727.5'
        cy='63.0921'
        r='30'
        transform='rotate(30 727.5 63.0921)'
        fill='#FFAB00'
      />
      <circle
        cx='151.5'
        cy='490.908'
        r='30'
        transform='rotate(-150 151.5 490.908)'
        fill='#FF3621'
      />
      <rect
        x='632'
        y='552'
        width='56'
        height='56'
        transform='rotate(-180 632 552)'
        fill='#FF3621'
      />
      <path
        d='M275 6.64413e-06L307.909 57L242.091 57L275 6.64413e-06Z'
        fill='#1B3139'
      />
      <path
        d='M843.89 415.501L778.072 415.501L810.981 358.501L843.89 415.501Z'
        fill='#1B3139'
      />
      <path
        d='M35.1108 138.499L100.929 138.499L68.0198 195.499L35.1108 138.499Z'
        fill='#1B3139'
      />
      <circle
        cx='727.5'
        cy='490.908'
        r='30'
        transform='rotate(150 727.5 490.908)'
        fill='#FFAB00'
      />
      <circle
        cx='151.5'
        cy='63.0921'
        r='30'
        transform='rotate(-30 151.5 63.0921)'
        fill='#FF3621'
      />
      <line x1='604.5' y1='58' x2='604.5' y2='167' stroke='#FF3621' />
      <line x1='274.5' y1='496' x2='274.5' y2='387' stroke='#FFAB00' />
      <line x1='823' y1='277.5' x2='714' y2='277.5' stroke='#FF3621' />
      <line x1='56' y1='276.5' x2='165' y2='276.5' stroke='#FFAB00' />
      <line x1='793.91' y1='167.933' x2='699.513' y2='222.433' stroke='#FF3621' />
      <line x1='85.0903' y1='386.067' x2='179.487' y2='331.567' stroke='#FFAB00' />
      <line x1='713.933' y1='87.5898' x2='659.433' y2='181.987' stroke='#FF3621' />
      <line x1='165.067' y1='466.41' x2='219.567' y2='372.013' stroke='#FFAB00' />
      <line x1='604.5' y1='387' x2='604.5' y2='496' stroke='#FF3621' />
      <line x1='274.5' y1='167' x2='274.5' y2='58' stroke='#FFAB00' />
      <line x1='699.513' y1='331.567' x2='793.909' y2='386.067' stroke='#FF3621' />
      <line x1='179.487' y1='222.433' x2='85.0905' y2='167.933' stroke='#FFAB00' />
      <line x1='659.433' y1='372.012' x2='713.933' y2='466.408' stroke='#FF3621' />
      <line x1='219.567' y1='181.988' x2='165.067' y2='87.5915' stroke='#FFAB00' />
      <path
        d='M489 280L464 323.301L414 323.301L389 280L414 236.699L464 236.699L489 280Z'
        fill='white'
        ref={graphics}
      />
    </svg>
  )
}

export default Graphic
