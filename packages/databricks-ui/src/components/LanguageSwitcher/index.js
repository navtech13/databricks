import React, { useState, useEffect, useRef } from "react"
import PropTypes from "prop-types"
import { languages } from "../../utils/supported-languages"
import Image from "../Image"
import Link from "../Link"
import IconResolver from "../IconResolver"
import { useLanguageContext } from "gatsby-theme-databricks-drupal/src/components/language-provider"
import useTranslate from "gatsby-theme-databricks-drupal/src/utils/translate"

const LanguageSwitcher = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false)
  const { currentLanguage } = useLanguageContext()
  const { translate } = useTranslate()
  // eslint-disable-next-line no-unused-vars
  const options = Object.entries(languages).map(([_, language]) => language)
  const containerRef = useRef(null)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("click", handleClickOutside)
    return () => {
      document.removeEventListener("click", handleClickOutside)
    }
  }, [])
  const languageId = currentLanguage?.id || "en"
  const currentLabel =
    languages[languageId.toLowerCase()]?.label || languages.en.label
  return (
    <div
      ref={containerRef}
      className={`relative flex flex-col items-center ${className}`}
      style={{ zIndex: isOpen ? 1 : "auto" }}
    >
      {/* TODO: valudate that this resolve the problem with the color NO.16 */}
      {/* On mobile and tablet devices hover does not work is needed remove? */}
      <button
        className={`${
          isOpen
            ? "text-orange-600"
            : "text-navy-600 unsticky-link-hover active:text-orange-600"
        }`}
        type='button'
        aria-label={`${translate("general.language-switch")}${currentLabel}`}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <IconResolver token='language' />
      </button>
      {isOpen && (
        <div className='shadow-shadow-2 absolute top-full mt-1 flex flex-col bg-white text-left'>
          {options.map((option) => (
            <Link
              key={option.path}
              to={option.path}
              className={`  ${
                languageId.toUpperCase() === option.value.toUpperCase()
                  ? "bg-navy-800 hover:bg-navy-800 text-white hover:text-white"
                  : "hover:bg-oat-light hover:text-navy-800 text-inherit"
              } gap-0.8 p-1.2 pl-1.6 text-1.2 flex w-[130px] flex-row items-center align-middle  hover:no-underline`}
            >
              <Image src={option.flag.src} />
              <span className='hover:no-underline'>{option.label}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

LanguageSwitcher.propTypes = {
  className: PropTypes.string,
}
LanguageSwitcher.defaultProps = {
  className: "",
}

export default LanguageSwitcher
