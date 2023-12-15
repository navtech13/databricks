import React, { useState } from "react"
import PropTypes from "prop-types"
import Select, { components } from "react-select"
import useTranslate from "../../../../gatsby-theme-databricks-drupal/src/utils/translate"
import Grid from "../Grid"
import Card from "../Card"
import selectStyles from "./selectStyles"
import { useBreakpoint } from "../../utils/use-breakpoint"

const TrustCenterCertifications = ({ certifications, title }) => {
  const { translate } = useTranslate()
  const [filter, setFilter] = useState([])
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const isDesktop = useBreakpoint("xl")

  const options = certifications
    .reduce((array, element) => {
      const availableClouds = element.availableClouds.filter(
        (value) => !array.includes(value)
      )
      return [...array, ...availableClouds]
    }, [])
    .map((value) => ({ value, label: translate(`pricing.cloud.${value}`) }))
    .sort((a, b) => a.value.localeCompare(b.value))

  const filteredCertifications =
    filter.length > 0
      ? certifications.filter((certification) => {
          return filter.some((value) =>
            certification.availableClouds.includes(value)
          )
        })
      : certifications

  const handleChange = (e) => {
    setFilter(Array.isArray(e) ? e.map((x) => x.value) : [])
  }

  const Option = (props) => {
    // eslint-disable-next-line react/prop-types
    const { label, isSelected } = props

    return (
      <div>
        <components.Option {...props}>
          <input className='mr-1' type='checkbox' checked={isSelected} />
          <span>{label}</span>
        </components.Option>
      </div>
    )
  }

  return (
    <>
      <h2 className='mb-5'>{title}</h2>
      <div
        className='w-fit'
        onMouseEnter={() => setIsMenuOpen(true)}
        onMouseLeave={() => setIsMenuOpen(false)}
      >
        <Select
          className='w-fit'
          {...(isDesktop && { menuIsOpen: isMenuOpen })}
          placeholder='Clouds'
          isClearable={false}
          onChange={handleChange}
          isMulti
          options={options}
          components={{
            Option,
          }}
          openMenuOnClick
          hideSelectedOptions={false}
          styles={selectStyles()}
        />
      </div>

      <Grid className='mt-3 mb-8' columns={4}>
        {filteredCertifications?.map((element) => {
          return (
            <Card
              key={element.id}
              variant='trustCenter'
              cta={element.link}
              image={element.image}
              description={element.description}
            />
          )
        })}
      </Grid>
    </>
  )
}

TrustCenterCertifications.propTypes = {
  title: PropTypes.string,
  certifications: PropTypes.arrayOf(PropTypes.shape({})),
}

TrustCenterCertifications.defaultProps = {
  title: "",
  certifications: [],
}

export default TrustCenterCertifications
