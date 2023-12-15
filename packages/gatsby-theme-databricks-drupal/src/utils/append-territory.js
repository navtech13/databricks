const territories = {
  EN: "en-US",
  FR: "fr-FR",
  DE: "de-DE",
  IT: "it-IT",
  JA: "ja-JP",
  KO: "ko-KR",
  BR: "PT-BR",
  ZH_CN: "ZH-CN",
  ZH_HK: "ZH-HK",
  ZH_TW: "ZH-TW",
  ES_ES: "ES-ES",
  ES_MX: "ES-MX",
}

const appendTerritory = (langcode) => {
  let lang = langcode || "en"
  // e.g. convert ZH-CN to ZH_CN
  lang = lang.replace(/-/g, "_")
  return territories[lang.toUpperCase()]
}

export default appendTerritory
