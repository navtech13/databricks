import { theme } from "../../../tailwind.config"

export default {
  indicatorSeparator: () => {
    return {
      display: "none",
    }
  },
  input: (provided) => {
    return {
      ...provided,
      padding: 0,
      margin: 0,
      fontSize: "14px",
    }
  },
  placeholder: (provided) => {
    return {
      ...provided,
      padding: 0,
      margin: 0,
      fontSize: "14px",
      textAlign: "left",
    }
  },
  valueContainer: (provided) => {
    return {
      ...provided,
      paddingLeft: "11px",
      paddingRight: "11px",
      paddingTop: "8px",
      paddingBottom: "8px",
    }
  },
  control: (provided) => {
    return {
      ...provided,
      borderRadius: "0",
      minWidth: "220px",
      paddingTop: 0,
      marginTop: 0,
      overflowY: "hidden",
    }
  },
  menuList: () => {
    return {
      overflowY: "scroll",
      overflowX: "hidden",
      height: "200px",
    }
  },
  menu: (provided) => {
    return {
      ...provided,
      borderRadius: "0",
      minWidth: "220px",
    }
  },
  option: (provided, state) => {
    const focusStyles = {
      color: "white",
      background: theme.colors["navy-800"],
    }
    return {
      ...provided,
      textAlign: "left",
      fontSize: "16px",
      backgroundColor: "transparent",
      padding: "0",
      margin: "0",
      borderTop: "1px solid transparent",
      ...(state.isFocused && focusStyles),
      ...(state.isSelected && focusStyles),
      ":hover": {
        ...focusStyles,
      },
    }
  },
  dropdownIndicator: (provided) => {
    return {
      ...provided,
      padding: "0",
      marginLeft: "0px",
      marginRight: "18px",
      svg: {
        width: "10px",
        height: "5px",
      },
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='10' height='5' viewBox='0 0 10 5' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0L5 5L10 0H0Z' fill='%23000'/%3E%3C/svg%3E")`,
      backgroundRepeat: "no-repeat",
      color: "transparent",
      ":hover": {
        color: "transparent",
      },
    }
  },
}
