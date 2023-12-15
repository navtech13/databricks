import React from "react"
import { Language as LanguageComponent } from "databricks-ui"
import useTranslate from "../utils/translate"
import { useLanguageContext } from "./language-provider"

const Language = () => {
  const { translate } = useTranslate()
  const { availableLanguages } = useLanguageContext()

  const parsedLanguages = availableLanguages.map((language) => ({
    ...language,
    to: language.prefix,
    label: language.name,
  }))

  return (
    <LanguageComponent
      text={translate("footer.language.title")}
      items={parsedLanguages}
    />
  )
}

export default Language
