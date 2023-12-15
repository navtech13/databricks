import Cookies from "js-cookie"
import eventTracking from "./eventTracking"
import useTranslate from "../utils/translate"

const skipFormEvents = (formId) => {
  const { currentLanguage } = useTranslate()
  let knownLocation = ""
  const userLocation = Cookies.get("db_country")
  if (typeof userLocation !== "undefined") {
    knownLocation = JSON.parse(userLocation)?.country_name || ""
  }
  const eventDataLoad = {
    event: "Form Loaded",
    formId,
    formValueCountry: knownLocation,
    formSource: "Marketo",
    formRegion: currentLanguage?.id,
    formFailReason: "",
    formFailCode: "",
  }
  const eventDataSubmit = {
    event: "Form Submit Success",
    formId,
    formValueCountry: knownLocation,
    formSource: "Marketo",
    formRegion: currentLanguage?.id,
    formFailReason: "",
    formFailCode: "",
  }
  eventTracking(eventDataLoad)
  eventTracking(eventDataSubmit)
}

export default skipFormEvents
