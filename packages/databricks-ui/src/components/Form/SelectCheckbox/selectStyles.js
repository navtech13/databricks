import { theme } from "../../../../tailwind.config"

export default (label) => {
  return {
    container: (provided) => {
      return {
        ...provided,
        width: "100%",
      }
    },
    menu: (provided) => {
      return {
        ...provided,
        margin: "0",
        borderRadius: "0",
        border: `1px solid ${theme.colors["gray-lines"]}`,
        borderTop: "none",
        boxShadow: `0px 30px 30px rgba(27, 49, 57, 0.10)`,
        paddingBottom: theme.spacing["1.6"],
      }
    },
    control: (provided, state) => {
      return {
        ...provided,
        borderRadius: "0",
        border: `1px solid ${theme.colors["gray-lines"]}`,
        borderBottom: state.menuIsOpen
          ? "1px solid transparent"
          : `1px solid ${theme.colors["gray-lines"]}`,
        minHeight: "auto",
        ":hover": {
          border: `1px solid ${theme.colors["gray-lines"]}`,
          borderBottom: state.menuIsOpen
            ? "1px solid transparent"
            : `1px solid ${theme.colors["gray-lines"]}`,
        },
      }
    },
    indicatorSeparator: () => {
      return {
        display: "none",
      }
    },
    option: (provided, state) => {
      const interactionStyles =
        state.data.value === "all"
          ? {
              position: "absolute",
              top: "0",
              width: "0",
              height: "0",
              pointerEvents: "none",
            }
          : {}
      return {
        ...provided,
        ...interactionStyles,
        padding: `${theme.spacing["0"]} ${theme.spacing["1.2"]}`,
        display: "inline-block",
        width: "auto",
        cursor: "pointer",
        backgroundColor: "none",
        svg: {
          backgroundColor: state.isFocused
            ? theme.colors["gray-warm-medium"]
            : "transparent",
        },
        ":active": {
          backgroundColor: "none",
        },
        ":hover": {
          svg: {
            backgroundColor: theme.colors["gray-warm-medium"],
          },
        },
      }
    },
    menuList: (provided) => {
      return {
        ...provided,
        padding: "0",
        display: "flex",
        flexDirection: "column",
        gap: theme.spacing["0.8"],
      }
    },
    dropdownIndicator: (provided, state) => {
      return {
        ...provided,
        transform: state.selectProps.menuIsOpen ? "rotate(-180deg)" : "none",
      }
    },
    valueContainer: (provided) => {
      return {
        ...provided,
        display: "block",
        padding: `${theme.spacing["0.8"]} ${theme.spacing["1.2"]}`,
        ":before": {
          fontWeight: theme.fontWeight.bold,
          content: `'${label}'`,
        },
      }
    },
    multiValue: () => {
      return {
        display: "none",
      }
    },
    placeholder: () => {
      return {
        display: "none",
      }
    },
    clearIndicator: () => {
      return {
        display: "none",
      }
    },
  }
}
