import React from "react"
import PropTypes from "prop-types"
import Select from "react-select"
import { languages } from "../../utils/supported-languages"
import selectStyles from "./selectStyles"
import Image from "../Image"
import useTranslate from "../../../../gatsby-theme-databricks-drupal/src/utils/translate"

const renderOption = (option) => {
  return (
    <button
      type='button'
      className='text flex flex-row items-center gap-1 p-1.5 pl-2 align-middle text-inherit hover:text-inherit '
    >
      <Image imageContainerOptions='min-w-[21px]' src={option.flag.src} />
      <span className='hover:no-underline'>{option.label}</span>
    </button>
  )
}

const LanguageSelect = ({ handleClick }) => {
  const { translate } = useTranslate()
  const options = Object.entries(languages).map(([_, language]) => language)
  return (
    <Select
      onChange={handleClick}
      noOptionsMessage={() => translate("select.no-options-message")}
      tabSelectsValue
      getOptionLabel={(option) => renderOption(option)}
      placeholder={translate("select.language-placeholder")}
      styles={selectStyles}
      options={options}
    />
  )
}

LanguageSelect.propTypes = {
  handleClick: PropTypes.func,
}
LanguageSelect.defaultProps = {
  handleClick: () => {},
}

export default LanguageSelect
