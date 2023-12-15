import React, { useState, useEffect } from "react"
import Cookies from "js-cookie"
import { useLanguageContext } from "gatsby-theme-databricks-drupal/src/components/language-provider"
import Image from "../Image"
import Modal from "./Modal"
import Link from "../Link"
import LanguageSelect from "../LanguageSelect"
import map from "../../../static/images/Map.svg"
import { languages } from "../../utils/supported-languages"
import eventTracking, {
  checkCookieConsent,
} from "../../../../gatsby-theme-databricks-drupal/src/helpers/eventTracking"

const setCookie = (value) => {
  const expirationDate = 30
  Cookies.set("db_lang_pref", value, { expires: expirationDate })
}

const LanguageSelectorModalModal = () => {
  const { currentLanguage } = useLanguageContext()
  const [isOpen, setIsOpen] = useState(false)
  const [isSetCookie, setIsSetCookie] = useState(false)
  const [preferredLanguage, setPreferredLanguage] = useState("en")
  const [areFunctionalCookiesEnabled, setAreFunctionalCookiesEnabled] =
    useState(false)
  const [oneTrustCookieAlertBox, setOneTrustCookieAlertBox] = useState("")
  const browserLanguage = languages[preferredLanguage]

  const MODAL_VIEWED = "Modal Viewed"
  const MODAL_DISMISSED = "Modal Dismissed"
  const MODAL_ACTIONED = "Modal Actioned"

  useEffect(() => {
    const cookie = Cookies.get("db_lang_pref")
    setIsSetCookie(cookie)
    if (typeof window !== "undefined") {
      const { language } = window.navigator
      setAreFunctionalCookiesEnabled(navigator.cookieEnabled)
      setPreferredLanguage(resolveToBaseLanguageCode(language))
    }
  }, [])

  useEffect(() => {
    if (!isSetCookie) {
      const checkCookieChanges = () => {
        const isAlertBoxClosed = Cookies.get("OptanonAlertBoxClosed")
        if (isAlertBoxClosed !== oneTrustCookieAlertBox) {
          setOneTrustCookieAlertBox(isAlertBoxClosed)
        }
      }
      const intervalId = setInterval(checkCookieChanges, 1000)
      return () => {
        clearInterval(intervalId)
      }
    }
    return null
  }, [])

  useEffect(() => {
    if (
      preferredLanguage &&
      areFunctionalCookiesEnabled &&
      oneTrustCookieAlertBox &&
      !isSetCookie &&
      preferredLanguage !== "en" &&
      browserLanguage &&
      currentLanguage?.id === "EN" &&
      checkCookieConsent("C0003")
    ) {
      setIsOpen(true)
      trackEvent(MODAL_VIEWED)
    } else {
      setIsOpen(false)
    }
  }, [preferredLanguage, areFunctionalCookiesEnabled, oneTrustCookieAlertBox])

  const trackEvent = (event, language = "") => {
    const data = {
      event,
      modalId: "LocalizationModalSelector",
      modalCategory: "Language Selector",
      modalStepCurrent: 1,
      modalStepTotal: 1,
      modalActionRequired: 0,
    }

    if (event === MODAL_ACTIONED) {
      data.modalAction = "Form Submitted"
      data.modalValues = { language }
    }

    eventTracking(data)
  }

  const resolveToBaseLanguageCode = (language) => {
    const languageRegex = new RegExp(`^([a-z]{2})[_-]?([A-Z]{2})?`, "i")
    const match = language.match(languageRegex)

    let selectedLanguage = languages.en // Default to English if no match is found

    if (match) {
      const baseLanguageCode = match[1].toLowerCase()
      if (baseLanguageCode === "pt" && match[2]) {
        // For pt-BR use 'br'
        selectedLanguage = languages.br.value
      }
      // For other cases, use the base language code
      if (languages[baseLanguageCode]?.value) {
        selectedLanguage = languages[baseLanguageCode].value
      }
    }
    return selectedLanguage
  }

  const onClickLanguage = (option) => {
    const { value, path } = option
    setCookie(value)
    trackEvent(MODAL_ACTIONED, value)
    window.location.href = path
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => {
        setIsOpen(false)
        setCookie("en")
        trackEvent(MODAL_DISMISSED)
      }}
    >
      <div className='bg-oat-light flex flex-col items-center p-5 text-center'>
        <Image src={map} />
        <h4 className='mb-1 mt-2.5'>
          {`Click below for the ${browserLanguage?.labelEN} version of our site (or close this window if
          you prefer English)`}
        </h4>
        {browserLanguage?.message && <span>{browserLanguage?.message}</span>}
        <Link
          to={browserLanguage?.path}
          onClick={() => setCookie(browserLanguage?.value)}
          className='h4 mt-3 mb-4 flex flex-row items-center gap-1.5 align-middle text-blue-700 hover:text-blue-600 hover:no-underline'
          type='button'
        >
          <Image imageContainerOptions='h-2.5 w-4' src={browserLanguage?.flag.src} />
          {browserLanguage?.labelEN}
        </Link>
        <LanguageSelect handleClick={onClickLanguage} />
      </div>
    </Modal>
  )
}

export default LanguageSelectorModalModal
