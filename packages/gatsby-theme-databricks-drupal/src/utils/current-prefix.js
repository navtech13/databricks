import { useLanguageContext } from "../components/language-provider"

const calculatePrefix = (prefix) => {
  return prefix ? `/${prefix}` : ""
}

const useCurrentPrefix = () => {
  const { currentLanguage } = useLanguageContext()

  return calculatePrefix(currentLanguage?.prefix)
}

export { calculatePrefix, useCurrentPrefix }
