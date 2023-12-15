import { theme } from "../../../tailwind.config"

export default () => {
  return {
    menu: (provided) => {
      return {
        ...provided,
        margin: "0",
        borderRadius: "0",
        width: " 300px",
      }
    },
    control: (provided) => {
      return {
        ...provided,
        borderWidth: "1px",
        borderColor: "#dce0e2",
        borderRadius: 0,
        width: " 300px",
        backgroundColor: "transparent",
        cursor: "pointer",
        lineHeight: "24px",
        boxShadow: "none",
      }
    },
    option: (provided, state) => {
      const focusStyles = {
        background: "rgba(27, 49, 57, 0.05)",
        borderColor: theme.colors["gray-lines"],
      }
      return {
        ...provided,
        fontSize: "16px",
        backgroundColor: "transparent",
        color: " #1b3139",
        padding: "7px 10px",
        margin: "0",
        ...(state.isFocused && focusStyles),
        ":hover": {
          ...focusStyles,
        },
      }
    },
    indicatorSeparator: (provided) => {
      return {
        ...provided,
        display: "none",
      }
    },
    input: (provided) => {
      return {
        ...provided,
        fontSize: "16px",
        fontWeight: "700",
        color: "#1b3139",
        padding: "3px 0 4px",
      }
    },
    placeholder: (provided) => {
      return {
        ...provided,
        fontSize: "16px",
        fontWeight: "700",
        color: "#1b3139",
        padding: "3px 0 4px",
      }
    },
  }
}
