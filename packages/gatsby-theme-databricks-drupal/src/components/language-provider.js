import React, { createContext, useContext, useState } from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

export const LanguageContext = createContext({
  defaultLanguage: {},
  currentLanguage: {},
  availableLanguages: [],
  setCurrentLanguage: () => {},
})

export const LanguageContextProvider = ({ lang, children }) => {
  const { drupal } = useStaticQuery(graphql`
    query LanguageContextQuery {
      drupal {
        availableLanguages {
          id
          name
          prefix
          isDefault
        }
      }
    }
  `)

  const availableLanguages = drupal.availableLanguages.map((language) => ({
    ...language,
    id: language.id.toUpperCase().replace(/-/g, "_"),
  }))

  const [currentLanguage, setCurrentLanguage] = useState(
    availableLanguages.find((language) => language.id === lang)
  )

  const defaultLanguage = availableLanguages.find((el) => el.isDefault)

  return (
    <LanguageContext.Provider
      value={{
        currentLanguage,
        setCurrentLanguage,
        availableLanguages,
        defaultLanguage,
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

LanguageContextProvider.propTypes = {
  lang: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}

export const useLanguageContext = () => useContext(LanguageContext)
