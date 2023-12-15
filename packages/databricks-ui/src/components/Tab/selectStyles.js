import { theme } from "../../../tailwind.config"

export default {
  menu: (provided) => {
    return {
      ...provided,
      margin: "0",
      borderRadius: "0",
    }
  },
  control: (provided) => {
    return {
      ...provided,
      borderRadius: "0",
      border: "none",
      backgroundColor: theme.colors["maroon-03"],
      cursor: "pointer",
    }
  },
  indicatorSeparator: () => {
    return {
      display: "none",
    }
  },
  option: (provided, state) => {
    return {
      ...provided,
      paddingTop: theme.spacing["3"],
      paddingBottom: theme.spacing["3"],
      paddingLeft: theme.spacing["3"],
      fontSize: "20px",
      backgroundColor: state.isFocused ? theme.colors["gray-lines"] : "transparent",
      color: theme.colors["navy-06"],
      ":hover": {
        background: theme.colors["gray-lines"],
        border: "none",
      },
      ":active": {
        background: theme.colors["gray-lines"],
        border: "none",
      },
      cursor: "pointer",
      borderTop: `1px solid ${theme.colors["gray-lines"]}`,
    }
  },
  menuList: (provided) => {
    return {
      ...provided,
      padding: "0",
    }
  },
  input: (provided) => {
    return {
      ...provided,
      paddingTop: theme.spacing["3"],
      paddingBottom: theme.spacing["3"],
      paddingLeft: theme.spacing["3"],
      margin: "0",
      color: theme.colors.white,
    }
  },
  singleValue: (provided) => {
    return {
      ...provided,
      paddingTop: theme.spacing["3"],
      paddingBottom: theme.spacing["3"],
      paddingLeft: theme.spacing["3"],
      color: theme.colors.white,
    }
  },
  indicatorsContainer: (provided) => {
    return {
      ...provided,
      marginRight: theme.spacing["3"],
    }
  },
  dropdownIndicator: (provided, state) => {
    return {
      ...provided,
      transition: "all .2s ease",
      transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : null,
      color: theme.colors.white,
      ":hover": {
        color: theme.colors.white,
      },
    }
  },
  valueContainer: (provided) => {
    return {
      ...provided,
      padding: "0",
      fontSize: "20px",
    }
  },
}
