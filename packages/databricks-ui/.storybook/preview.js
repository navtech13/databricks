import React from "react"
import { action } from "@storybook/addon-actions"
import { mockServer } from "../mockServer"
import { LanguageContext } from "../../gatsby-theme-databricks-drupal/src/components/language-provider"
import "../static/css/output.css"
import { Modal } from "../src"
import { Wrapper } from "../src"

// Gatsby defines a global called ___loader to prevent its method calls from creating console errors you override it here
global.___loader = {
  enqueue: () => {},
  hovering: () => {},
}
// Gatsby internal mocking to prevent unnecessary errors in storybook testing environment
global.__PATH_PREFIX__ = ""
global.__BASE_PATH__ = ""

// This is to utilized to override the window.___navigate method Gatsby defines and uses to report what path a Link would be taking us to if it wasn't inside a storybook
window.___navigate = (pathname) => {
  action("NavigateTo:")(pathname)
}

Modal.setRootElement("#root")

export const parameters = {
  layout: "fullscreen",
  actions: { argTypesRegex: "^on[A-Z].*" },
  chromatic: {
    // viewports: [320, 768, 1280],  change viewports for responsive snapshots
    disable: true, // disable all stories for regulating snapshot amount. Override parameter in story to allow it to take snapshots
  },
  options: {
    storySort: {
      method: "alphabetical",
      order: [
        "STORYBOOK",
        "ELEMENTS",
        "COMPONENTS",
        "Pages",
        "Styles",
      ],
    },
  },
  viewport: {
    viewports: {
      dbMobile: { 
        name: "figma mobile",
        styles: {
          width: "360px",
          height: "860px",
        },
      },
      dbTablet: {
        name: "figma tablet",
        styles: {
          width: "768px",
          height: "860px",
        },
      },
    },
  },
  grid: {
    gridOn: true,
    columns: 12,
    gap: "30px",
    gutter: "0",
    maxWidth: "1146px",
    color: "rgba(255, 0, 0, 0.1)",
  },
}

export const decorators = [
  (Story) => (
    <LanguageContext.Provider
      value={{ currentLanguage: { id: "EN" }, defaultLanguage: { id: "EN" } }}
    >
      <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
        <Story />
      </div>
    </LanguageContext.Provider>
  ),
]
