import addons from "@storybook/addons"
import themeDatabricks from "./themeDatabricks"

addons.setConfig({
  enableShortcuts: false,
  showPanel: true,
  theme: themeDatabricks,
  sidebar: {
    showRoots: true,
    collapsedRoots: [
      "navigation",
      "content",
      "container",
      "pages",
      "styles",
      "layouts",
      "elements",
      "custom-forms",
      "newsroom",
    ],
  },
})
