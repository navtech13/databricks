import { theme } from "../../../tailwind.config"
export default () => {
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
      }
    },
    control: (provided) => {
      return {
        ...provided,
        borderRadius: "0",
        border: `1px solid ${theme.colors["navy-04"]}`,
        boxShadow: "none",
        minHeight: "auto",
      }
    },
    indicatorSeparator: () => {
      return {
        display: "none",
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
    multiValue: () => {
      return {
        display: "none",
      }
    },
    placeholder: (provided) => {
      return {
        ...provided,
        color: theme.colors["gray-text"],
        fontSize: "14px",
      }
    },

  }
}
