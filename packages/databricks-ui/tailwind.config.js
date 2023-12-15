const lineClamp = require("@tailwindcss/line-clamp")

// Color docs: https://tailwindcss.com/docs/text-color#customizing-your-theme
const baseColors = {
  "gray-secondary": "#5D7283",
  "gray-lines-new": "#D4D9DB",
  "gray-warm-medium": "#EEEDE9",
  "gray-warm-light": "#F9F7F4",
  "gray-cool": "#F3F3F3",
  "gray-dark-logo": "#666666",
  "gray-dark": "#666666",
  "nav-gray": "#303F47",
  "light-gray": "#999999",
  "dark-gray": "#7F7F7F",
  "orange-01": "#FABFBA",
  "orange-02": "#FF9E94",
  "orange-03": "#FF5F46",
  "orange-04": "#FF3621", // Primary orange
  "orange-04-a11y": "#EB1600", // Primary orange
  "orange-05": "#BD2B26",
  "orange-06": "#801C17",
  "navy-01": "#C4CCD6",
  "navy-02": "#90A5B1",
  "navy-03": "#618794",
  "navy-04": "#1B5162",
  "navy-05": "#143D4A",
  "navy-06": "#1B3139", // Primary navy
  "navy-07": "#EBEFF1",
  "green-01": "#9ED6C4",
  "green-02": "#70C4AB",
  "green-03": "#42BA91",
  "green-04": "#00A972", // Secondary green
  "green-05": "#00875C",
  "green-06": "#095A35",
  "maroon-01": "#D69EA8",
  "maroon-02": "#BF7080",
  "maroon-03": "#AB4057",
  "maroon-04": "#98102A", // Secondary maroon
  "maroon-05": "#730D21",
  "maroon-06": "#4A121A",
  "yellow-01": "#FFDB96",
  "yellow-02": "#FFCC66",
  "yellow-03": "#FCBA33",
  "yellow-04": "#FFAB00", // Secondary yellow
  "yellow-05": "#BD802B",
  "yellow-06": "#7D5319",
  gray: "#556A75",
  current: "currentColor",
  "gray-back": "#F8F8F8",
  "almost-black": "#10121E",
  inherit: "inherit",
  // Color Palette Updates:
  // Gray supported
  "gray-nav": "#303F47",
  "gray-text": "#5A6F77",
  "gray-lines": "#DCE0E2",
  "grey-500": "#8196A7",
  white: "#FFFFFF",
  // Oat
  "oat-medium": "#EEEDE9",
  "oat-light": "#F9F7F4",
  // Maroon
  "maroon-100": "#F8D5DC",
  "maroon-200": "#EAC0C7",
  "maroon-300": "#D69EA8",
  "maroon-400": "#BF7080",
  "maroon-500": "#AB4057",
  "maroon-600": "#98102A",
  "maroon-700": "#730D21",
  "maroon-800": "#4A121A",
  // Orange
  "orange-100": "#FAECEB",
  "orange-200": "#F8DEDC",
  "orange-300": "#FABFBA",
  "orange-400": "#FF9E94",
  "orange-500": "#FF5F46",
  "orange-600": "#FF3621",
  "orange-700": "#BD2B26",
  "orange-800": "#801C17",
  // Yellow
  "yellow-100": "#FFF0D3",
  "yellow-200": "#FFE6B8",
  "yellow-300": "#FFDB96",
  "yellow-400": "#FFCC66",
  "yellow-500": "#FCBA33",
  "yellow-600": "#FFAB00",
  "yellow-700": "#BA7B23",
  "yellow-800": "#7D5319",
  // Green
  "green-100": "#DCF4ED",
  "green-200": "#BAE9DA",
  "green-300": "#9ED6C4",
  "green-400": "#70C4AB",
  "green-500": "#42BA91",
  "green-600": "#00A972",
  "green-700": "#00875C",
  "green-800": "#095A35",
  "green-900": "#85DDB5",
  // New blue range
  "blue-100": "#F0F8FF",
  "blue-200": "#D7EDFE",
  "blue-300": "#BAE1FC",
  "blue-400": "#8ACAFF",
  "blue-500": "#4299E0",
  "blue-600": "#2272B4",
  "blue-700": "#0E538B",
  "blue-800": "#04355D",
  // Navy
  "navy-100": "#EDF2F8",
  "navy-200": "#E5EAF1",
  "navy-300": "#C4CCD6",
  "navy-400": "#90A5B1",
  "navy-500": "#618794",
  "navy-600": "#1B5162",
  "navy-700": "#143D4A",
  "navy-800": "#1B3139",
  // new token defined in https://www.figma.com/file/6oQHeL93JXx95BhGORmNll/Home-(1)?type=design&node-id=4350-30439&t=a7vk3WhuIP43aoDj-0
  "DAIS23-black": "#10121E",
  "DAIS23-off-white": "#EDEEF1",
}

// Shadow docs: https://tailwindcss.com/docs/drop-shadow#customizing-your-theme
const baseShadows = {
  "act-text-field": "0px 4px 15px rgba(27, 49, 57, 0.07)",
  "card-normal": "0px 4px 15px 0px rgba(27,49,57,0.13)",
  "card-hover": "0px 4px 30px 0px rgba(27, 49, 57, 0.16)",
  "card-hover-accent": `0 20px 30px rgb(27 49 57 / 15%), inset 0 -2px 0 ${baseColors["orange-02"]}`,
  "legacy-card-normal": "0px 4px 30px rgba(27, 49, 57, 0.1)",
  "legacy-card-hover": "0px 20px 30px rgba(27, 49, 57, 0.15)",
  "legacy-card-hover-accent": `0px 20px 30px rgba(27, 49, 57, 0.15), inset 0 -2px 0 ${baseColors["orange-03"]}`,
  "rollover-card": "0px 9px 18px rgba(0, 0, 0, 0.25)",
  "horizontal-inline-menu": "0px 12px 15px rgba(0, 0, 0, 0.06)",
  "shadow-0": "none",
  "shadow-1":
    "0px 9px 13px rgba(27, 49, 57, 0.035), 0px 4px 8px rgba(27, 49, 57, 0.04)",
  "shadow-2":
    "0px 72px 104px rgba(27, 49, 57, 0.07), 0px 32px 40px rgba(27, 49, 57, 0.0503198), 0px 16px 24px rgba(27, 49, 57, 0.04), 0px 9px 13px rgba(27, 49, 57, 0.035), 0px 4px 8px rgba(27, 49, 57, 0.04), 0px 2px 3px rgba(27, 49, 57, 0.0196802)",
  //  shadow 2 without top shadow for main navigation
  "shadow-2-no-top":
    "0px 0px 0px rgba(255, 255, 255), 0px 0px 0px rgba(255, 255, 255), 0px 0px 0px rgba(255, 255, 255), 0px 9px 13px rgba(27, 49, 57, 0.035), 0px 4px 8px rgba(27, 49, 57, 0.04), 0px 2px 3px rgba(27, 49, 57, 0.0196802)",
}

const baseDropShadows = {
  "card-normal": "0px 4px 30px rgba(27, 49, 57, 0.1)",
}

// Screen docs: https://tailwindcss.com/docs/screens
const baseScreens = {
  sm: "580px",
  md: "768px",
  lg: "992px",
  // to be used with a 1146px content view
  xl: "1346px",
  // to be used with a 1456px content view
  xxl: "1648px",
  "design-sm": "360px",
  "design-md": "768px",
  "design-lg": "1280px",
  "design-xl": "1440px",
  "design-xxl": "1920px",
}

// Font Family docs: https://tailwindcss.com/docs/font-family#customizing-your-theme
const baseFontFamilies = {
  sans: ["DM Sans", "sans-serif"],
  barlow: ["Barlow", "Helvetica", "Arial", "sans-serif"],
  mono: ["DM Mono", "monospace"],
  inter: ["Inter", "sans-serif"],
}

// Font Size docs: https://tailwindcss.com/docs/font-size#customizing-your-theme
const baseFontSizes = {
  10: ["80px", "96px"],
  7: ["56px", "64px"],
  6: ["48px", "56px"],
  5: ["40px", "48px"],
  4: ["32px", "40px"],
  3.5: ["28px", "36px"],
  3: ["24px", "32px"],
  2.5: ["20px", "28px"],
  2: ["16px", "24px"],
  1.75: ["14px", "20px"],
  1.5: ["12px", "20px"],
  1.25: ["10px", "16px"],
  1: ["8px", "12px"],
}

// Letter Spacing docs: https://tailwindcss.com/docs/letter-spacing#customizing-your-theme
const baseLetterSpacings = {
  "t-1": "-0.01em",
  normal: "0",
  "w-0.5": "0.005em",
  "w-1": "0.01em",
}

// Spacing docs: https://tailwindcss.com/docs/customizing-spacing
const baseSpacings = {
  0: "0px",
  0.25: "2px",
  0.5: "4px",
  1: "8px",
  1.5: "12px",
  2: "16px",
  2.5: "20px",
  3: "24px",
  4: "32px",
  5: "40px",
  6: "48px",
  8: "64px",
  10: "80px",
  12: "96px",
  16: "128px",
  20: "160px",
  25: "200px",
  30: "240px",

  // @TODO: there are still some components that use them.
  // we need to do a second cleaning to completely remove them
  0.4: "4px",
  0.8: "8px",
  1.2: "12px",
  1.4: "16px",
  1.6: "16px",
  2.4: "24px",
  3.2: "32px",
  6.4: "64px",
  13: "128px",
  15: "160px",
}

const baseLineHeight = {
  11: "2.75em",
  12: "3em",
}

// Font Weight docs: https://tailwindcss.com/docs/font-weight#customizing-your-theme
const basefontWeights = {
  normal: 400,
  medium: 500,
  bold: 700,
}

const baseMinHeight = {
  inherit: "inherit",
}

// const baseBorderRadius = {
//   badge: "11px",
// }

// const baseOpacity = {
//   70: 0.7,
// }

const baseListStyleType = {
  none: "none",
  disc: "disc",
  decimal: "decimal",
  square: "square",
  roman: "lower-roman",
  alpha: "alpha",
}

module.exports = {
  content: [`./src/**/*.{js,jsx,ts,tsx${process.env.STORYBOOK ? ",mdx" : ""}}`],
  theme: {
    keyframes: {
      "tab-to-right-active": {
        "0%": { transform: "translate(8px)" },
        "100%": { transform: "translate(0px)", display: "block" },
      },
      "tab-to-right": {
        "0%": { transform: "translate(8px)", opacity: 0 },
        "100%": { transform: "translate(0px)", opacity: 0.75, display: "none" },
      },
      "tab-to-left-active": {
        "0%": { transform: "translate(-8px)" },
        "100%": { transform: "translate(0px)", opacity: 0.75, display: "block" },
      },
      "tab-to-left": {
        "0%": { transform: "translate(-8px)", opacity: 0 },
        "100%": { transform: "translate(0px)", opacity: 0.75, display: "none" },
      },
      "fade-in": {
        "0%": { opacity: 0 },
        "100%": { opacity: 1 },
      },
    },
    animation: {
      "arrow-link-fix": "arrow-link-fix 500ms ease-in",
      "tab-to-right": "tab-to-right 200ms ease-in",
      "tab-to-right-active": "tab-to-right 200ms ease-in",
      "tab-to-left": "tab-to-left 200ms ease-in",
      "tab-to-left-active": "tab-to-left 200ms ease-in",
      "fade-in": "fade-in 200ms cubic-bezier(0, .66, .34, 1)",
    },
    screens: baseScreens,
    spacing: baseSpacings,
    colors: baseColors,
    boxShadow: baseShadows,
    dropShadow: baseDropShadows,
    fontFamily: baseFontFamilies,
    fontSize: baseFontSizes,
    fontWeight: basefontWeights,
    letterSpacing: baseLetterSpacings,
    minHeight: baseMinHeight,
    extend: {
      lineHeight: baseLineHeight,
      transitionDuration: {
        250: "250ms",
      },
      transitionTimingFunction: {
        "curve-ease": "cubic-bezier(0.06, 0.17, 0.24, 1)",
        "ease-in": "cubic-bezier(0, 0.6, 0.4, 1)",
        "ease-in-ease": "cubic-bezier(0, 0.66, 0.34, 1)",
        hover: "cubic-bezier(0, 0.66, 0.34, 0)",
      },
    },
    // borderRadius: baseBorderRadius,
    // opacity: baseOpacity,
    listStyleType: baseListStyleType,
  },
  plugins: [lineClamp],
  safelist: [
    {
      pattern: /text-(gray|orange|green|maroon|yellow|navy)-.+/,
    },
    "text-gray",
    "ReactModal__Content",
    "ReactModal__Overlay",
    "circle-check",
    "accent-primary",
    "md:grid-cols-2",
    "md:grid-cols-3",
    "md:grid-cols-4",
    "md:grid-cols-5",
    "md:grid-cols-6",
    "grid-cols-2",
    "grid-cols-3",
    "grid-cols-4",
    "grid-cols-5",
    "pt-[56.25%]",
    "pt-[75%]",
    "pt-[62.5%]",
    "mt-1.6",
    "md:mt-1.2",
    "gap-8",
    "gap-6",
    "w-1/12",
    "w-2/12",
    "w-3/12",
    "w-4/12",
    "w-5/12",
    "w-6/12",
    "w-7/12",
    "w-8/12",
    "w-9/12",
    "w-10/12",
    "w-11/12",
    "w-12/12",
    "-translate-y-8",
    "-translate-y-3",
    "h-16",
    // TODO: search a way to avoid this for daiwt starter
    "h-[186px]",
    "opacity-75",
    "hover:text-blue-600",
    {
      pattern: /(pt|pb)-\d+(\.\d)?/,
      variants: ["lg", "md"],
    },
    { pattern: /(mb|mr)-\d+(\.\d)?/, variants: ["lg", "md"] },
    {
      pattern: /(gap-x)-\d+(\.\d)?/,
      variants: ["lg", "md"],
    },
    {
      pattern: /(py)-\d+(\.\d)?/,
      variants: ["lg", "md"],
    },
    {
      pattern: /(gap-y)-\d+(\.\d)?/,
      variants: ["lg", "md"],
    },
    {
      pattern: /(w)-\d+(\.\d)?/,
      variants: ["lg", "md"],
    },
    {
      pattern: /bg-(orange|navy|green|maroon|yellow|blue)-\d+/,
    },
    {
      pattern: /text-(orange|navy|green|maroon|yellow|blue)-\d+/,
    },
    {
      pattern: /border-(orange|navy|green|maroon|yellow|blue)-\d+/,
    },
    {
      pattern:
        /bg-(oat-medium|oat-light|gray-nav|gray-text|gray-lines-new|gray-lines|gray-warm-medium|gray-warm-light|gray-cool|gray-dark-logo|gray-dark|nav-gray|light-gray|dark-gray|white|gray-back|gray|current|almost-black)/,
    },
    {
      pattern: /grid-cols-\d+/g,
      variants: ["lg", "md"],
    },
    {
      pattern: /gap-\d+/g,
      variants: ["lg", "md"],
    },
    {
      pattern:
        /text-(oat-medium|oat-light|gray-nav|gray-text|gray-lines-new|gray-lines|gray-warm-medium|gray-warm-light|gray-cool|gray-dark-logo|gray-dark|nav-gray|light-gray|dark-gray|white|gray-back|gray|current|almost-black)/,
    },
    {
      pattern:
        /border-(oat-medium|oat-light|gray-nav|gray-text|gray-lines-new|gray-lines|gray-warm-medium|gray-warm-light|gray-cool|gray-dark-logo|gray-dark|nav-gray|light-gray|dark-gray|white|gray-back|gray|current|almost-black)/,
    },
  ],
}
