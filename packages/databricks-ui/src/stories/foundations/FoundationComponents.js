import React from "react"
import PropTypes from "prop-types"
import tailwindConfig from "../../../tailwind.config"

const headings = [
  {
    tag: "h1",
    heading: "H1",
    headingStyle: "font-bold",
    text: "H1 Heading Bold (DM Sans 56px 700)",
    tokens: "text-5 md:text-6 lg:text-7 lg:tracking-t-1",
    key: "h1",
  },
  {
    tag: "h1",
    heading: "H1",
    headingStyle: "font-medium",
    text: "H1 Heading Medium (DM Sans 56px 500)",
    tokens: "text-5 md:text-6 lg:text-7 lg:tracking-t-1",
    key: "h1",
  },
  {
    tag: "h1",
    heading: "H1.5",
    headingStyle: "h1-5",
    text: "H1.5 Heading Regular (DM Sans 48px 400)",
    tokens: "text-4 md:text-5 lg:text-6 lg:tracking-t-1",
    key: "h-1.5",
  },
  {
    tag: "h2",
    heading: "H2",
    headingStyle: "",
    text: "H2 Heading Regular (DM Sans 40px 400)",
    tokens: "text-3.5 md:text-5 tracking-t-1 lg:tracking-normal",
    key: "h2",
  },
  {
    tag: "h3",
    heading: "H3",
    headingStyle: "",
    text: "H3 Heading Regular (DM Sans 28px 400)",
    tokens: "text-3 md:text-3.5 lg:tracking-t-1",
    key: "h3",
  },
  {
    tag: "h4",
    heading: "H4",
    headingStyle: "font-bold",
    text: "H4 Heading Bold (DM Sans 20px 700)",
    tokens: "text-2.5 font-bold",
    key: "h4",
  },
  {
    tag: "h4",
    heading: "H4",
    headingStyle: "",
    text: "H4 Heading Regular (DM Sans 20px 400)",
    tokens: "text-2.5",
    key: "h4",
  },
  {
    tag: "h5",
    heading: "H5",
    headingStyle: "font-bold",
    text: "H5 Heading Bold (DM Sans 16px 700)",
    tokens: "text-2 font-bold",
    key: "h5",
  },
  {
    tag: "h5",
    heading: "H5",
    headingStyle: "",
    text: "H5 Heading Regular (DM Sans 16px 400)",
    tokens: "text-2",
    key: "h5",
  },
  {
    tag: "h6",
    heading: "H6",
    headingStyle: "font-bold",
    text: "H6 Heading Bold (DM Sans 14px 700)",
    tokens: "text-1.75 font-bold",
    key: "h6",
  },
  {
    tag: "h6",
    heading: "H6",
    headingStyle: "",
    text: "H6 Heading Regular (DM Sans 14px 400)",
    tokens: "text-1.75",
    key: "h6",
  },
]

const bodyItems = [
  {
    heading: "B1",
    headingStyle: "b1",
    text: "B1 Body Regular (DM Sans 28px 400)",
    tokens: "text-3 md:text-3.5 md:tracking-t-1",
    key: "b1",
  },
  {
    heading: "B2",
    headingStyle: "b2",
    text: "B2 Body Regular (DM Sans 20px 400)",
    tokens: "text-2 md:text-2.5",
    key: "b2",
  },
  {
    heading: "B3",
    headingStyle: "b3",
    text: "B3 Body Regular (DM Sans 20px 400)",
    tokens: "text-2 md:text-2.5",
    key: "b3",
  },
  {
    heading: "B4",
    headingStyle: "b4 font-bold",
    text: "B4 Body Bold (DM Sans 16px 700)",
    tokens: "text-1.75 md:text-2",
    key: "b4",
  },
  {
    heading: "B4",
    headingStyle: "b4 font-medium",
    text: "B4 Body Medium (DM Sans 16px 500)",
    tokens: "text-1.75 md:text-2",
    key: "b4",
  },
  {
    heading: "B4",
    headingStyle: "b4",
    text: "B4 Body Regular (DM Sans 16px 400)",
    tokens: "text-1.75 md:text-2",
    key: "b4",
  },
  {
    heading: "B5",
    headingStyle: "b5 font-bold",
    text: "B5 Body Bold (DM Sans 14px 700)",
    tokens: "text-1.5 md:text-1.75",
    key: "b5",
  },
  {
    heading: "B5",
    headingStyle: "b5 font-medium",
    text: "B5 Body Medium (DM Sans 14px 500)",
    tokens: "text-1.5 md:text-1.75",
    key: "b5",
  },
  {
    heading: "B5",
    headingStyle: "b5",
    text: "B5 Body Regular (DM Sans 14px 400)",
    tokens: "text-1.5 md:text-1.75",
    key: "b5",
  },
  {
    heading: "B6",
    headingStyle: "b6 font-bold",
    text: "B6 Body Bold (DM Sans 12px 700)",
    tokens: "text-1.25 md:text-1.5 tracking-w-0.5 lg:tracking-normal",
    key: "b6",
  },
  {
    heading: "B6",
    headingStyle: "b6 font-medium",
    text: "B6 Body Medium (DM Sans 12px 500)",
    tokens: "text-1.25 md:text-1.5 tracking-w-0.5 lg:tracking-normal",
    key: "b6",
  },
  {
    heading: "B6",
    headingStyle: "b6",
    text: "B6 Body Regular (DM Sans 12px 400)",
    tokens: "text-1.25 md:text-1.5 tracking-w-0.5 lg:tracking-normal",
    key: "b6",
  },
  {
    heading: "B7",
    headingStyle: "b7 font-bold",
    text: "B7 Body Bold (DM Sans 9px, 10px 700)",
    tokens: "text-1.25 tracking-w-1 md:tracking-w-0.5",
    key: "b7",
  },
  {
    heading: "B7",
    headingStyle: "b7 font-medium",
    text: "B7 Body Medium (DM Sans 9px, 10px 500)",
    tokens: "text-1.25 tracking-w-1 md:tracking-w-0.5",
    key: "b7",
  },
  {
    heading: "B7",
    headingStyle: "b7",
    text: "B7 Body Regular (DM Sans 9px, 10px 400)",
    tokens: "text-1.25 tracking-w-1 md:tracking-w-0.5",
    key: "b7",
  },
]

const TypographyItem = ({ tag, headingStyle, heading, text, tokens, keyValue }) => {
  const HeadingItem = tag || "p"

  return (
    <li className='flex flex-col gap-2.5 md:flex-row'>
      <HeadingItem className={`${headingStyle} w-10`}>{heading}</HeadingItem>
      <div className='col-span-11 text-gray-700'>
        <p className='font-bold'>{text}</p>
        <p className='font-bold'>
          Tokens:&nbsp;
          <span className='font-medium'>{tokens}</span>
        </p>
        <p>
          <span className='font-bold'>Key:</span> {keyValue}
        </p>
      </div>
    </li>
  )
}

TypographyItem.propTypes = {
  tag: PropTypes.string,
  headingStyle: PropTypes.string,
  heading: PropTypes.string,
  text: PropTypes.string,
  tokens: PropTypes.string,
  keyValue: PropTypes.string,
}

TypographyItem.defaultProps = {
  tag: "p",
  headingStyle: "",
  heading: "",
  text: "",
  tokens: "",
  keyValue: "",
}

const ColorBox = ({ color }) => (
  <div className='border-gray-lines mb-2 flex min-w-0 flex-col items-center rounded-lg border pb-2'>
    <div
      className='border-gray-lines h-8 w-full rounded-t-lg border-b'
      style={{ backgroundColor: tailwindConfig.theme.colors[color] }}
    />
    <div className='mt-1 text-center'>
      <span className='text-navy-800 font-bold'>{color}</span>
      <br />
      <p className='text-gray-text'>{tailwindConfig.theme.colors[color]}</p>
    </div>
  </div>
)

ColorBox.propTypes = {
  color: PropTypes.oneOf([
    "orange-01",
    "orange-02",
    "orange-03",
    "orange-04",
    "orange-05",
    "orange-06",
    "navy-01",
    "navy-02",
    "navy-03",
    "navy-04",
    "navy-05",
    "navy-06",
    "green-01",
    "green-02",
    "green-03",
    "green-04",
    "green-05",
    "green-06",
    "maroon-01",
    "maroon-02",
    "maroon-03",
    "maroon-04",
    "maroon-05",
    "maroon-06",
    "yellow-01",
    "yellow-02",
    "yellow-03",
    "yellow-04",
    "yellow-05",
    "yellow-06",
  ]).isRequired,
}

const EffectBox = ({ effect, className }) => (
  <div
    className={`mb-2 flex h-8 w-full min-w-0 items-center justify-center rounded-sm ${className}`}
    style={{ boxShadow: tailwindConfig.theme.boxShadow[effect] }}
  >
    {effect}
  </div>
)

EffectBox.propTypes = {
  effect: PropTypes.string.isRequired,
  className: PropTypes.string,
}

EffectBox.defaultProps = {
  className: "",
}

const BorderBox = ({ className }) => (
  <div className={`bg-white pt-[100%] ${className}`} />
)

BorderBox.propTypes = {
  className: PropTypes.string.isRequired,
}

const SpacingBox = ({ spacing }) => (
  <div className='mb-2 flex min-w-0 flex-col items-center py-1 text-center font-medium'>
    <div
      className='h-4 bg-orange-700'
      style={{ width: tailwindConfig.theme.spacing[spacing] }}
    />
    Key: {spacing} <br />
    {tailwindConfig.theme.spacing[spacing]}
  </div>
)

SpacingBox.propTypes = {
  spacing: PropTypes.string.isRequired,
}

const Section = ({ title, children }) => (
  <div className='p-3'>
    <h2 className='h4 font-bold'>{title}</h2>
    <hr />
    {children}
  </div>
)

Section.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}

Section.Grid = (props) => (
  <div
    className='mt-2.5 grid grid-cols-1 gap-3 after:w-8 md:grid-cols-3 lg:grid-cols-6'
    {...props}
  />
)

export {
  Section,
  ColorBox,
  EffectBox,
  SpacingBox,
  BorderBox,
  TypographyItem,
  headings,
  bodyItems,
}
