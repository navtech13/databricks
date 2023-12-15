import englishFlag from "../../static/images/english-flag.svg"
import deutschFlag from "../../static/images/deutsch-flag.svg"
import fracaisFlag from "../../static/images/fracais-flag.svg"
import italianoFlag from "../../static/images/italiano-flag.svg"
import japaneseFlag from "../../static/images/japanese-flag.svg"
import koreanFlag from "../../static/images/korean-flag.svg"
import portuguesFlag from "../../static/images/portugues-flag.svg"

export const languages = {
  en: {
    label: "English",
    labelEN: "English",
    value: "en",
    path: "/",
    flag: {
      src: englishFlag,
    },
  },
  de: {
    label: "Deutsch",
    labelEN: "German",
    value: "de",
    path: "/de",
    flag: {
      src: deutschFlag,
    },
    message: "Klicken Sie unten für die deutsche Version unserer Website",
  },
  fr: {
    label: "Français",
    labelEN: "French",
    value: "fr",
    path: "/fr",
    flag: {
      src: fracaisFlag,
    },
    message: "Cliquez ci-dessous pour la version française de notre site web",
  },
  it: {
    label: "Italiano",
    labelEN: "Italian",
    value: "it",
    path: "/it",
    flag: {
      src: italianoFlag,
    },
    message: "Clicca qui sotto per la versione italiana del nostro sito web",
  },
  ja: {
    label: "日本語",
    labelEN: "Japanese",
    value: "ja",
    path: "/jp",
    flag: {
      src: japaneseFlag,
    },
    message: "当社ウェブサイトの日本語版は以下をクリックしてください",
  },
  ko: {
    label: "한국어",
    labelEN: "Korean",
    value: "ko",
    path: "/kr",
    flag: {
      src: koreanFlag,
    },
    message: "우리 웹 사이트의 한국어 버전을 보려면 아래를 클릭하십시오.",
  },
  br: {
    label: "Português",
    labelEN: "Portuguese",
    value: "br",
    path: "/br",
    flag: {
      src: portuguesFlag,
    },
    message: "Clique abaixo para a versão em português do Brasil do nosso site",
  },
}
