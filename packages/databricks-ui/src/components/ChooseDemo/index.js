import React from "react"
import propTypes from "prop-types"
import Link from "../Link"
import RichText from "../RichText"
import "./choose-demo.css"

const ChooseDemo = ({ title, description, ctas }) => {
  const baseButton =
    "leading-none text-2 font-medium p-2 duration-200 ease-in-out transition hover:no-underline hover:border-navy-500 border border-white"

  const buttonMap = {
    primary: `${baseButton} text-navy-800 bg-white hover:btn-secondary`,
    secondary: `${baseButton} btn-secondary`,
  }

  return (
    <section className='bg-navy-800 px-1 text-center text-white'>
      <div className='xl:6/12 mx-auto w-full md:w-10/12 lg:w-8/12'>
        <RichText className='choose-demo text-oat-light mx-auto max-w-4xl md:px-0'>
          {title}
        </RichText>
        <p className='text-3 pt-3'>{description}</p>
        {ctas && ctas.length > 0 && (
          <div className='flex flex-wrap justify-center gap-2 pt-6 lg:gap-4'>
            {ctas.map((cta) => (
              <Link
                tabIndex='0'
                key={cta.id}
                to={cta.to}
                className={buttonMap[cta.variant]}
              >
                {cta.text}
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default ChooseDemo

ChooseDemo.propTypes = {
  title: propTypes.string,
  description: propTypes.string,
  ctas: propTypes.shape([
    {
      text: propTypes.string,
      link: propTypes.string,
      variant: propTypes.oneOf(["primary", "secondary"]),
    },
  ]),
}

ChooseDemo.defaultProps = {
  title: "",
  description: "",
  ctas: [],
}
