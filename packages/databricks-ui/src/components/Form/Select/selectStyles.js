import { theme } from "../../../../tailwind.config"

export default (error, variant) => {
  return {
    menu: (provided) => {
      return {
        ...provided,
        margin: "0",
        borderRadius: "0",
        boxShadow: "0px 20px 30px rgba(27, 49, 57, 0.15)",
      }
    },
    control: (provided, state) => {
      const getBorderColor = (hover, focused, errorValue, variantValue) => {
        if (errorValue && variantValue === "primary") {
          return theme.colors["orange-05"]
        }
        if (errorValue && variantValue === "secondary") {
          return theme.colors["orange-02"]
        }
        if ((hover || focused) && variantValue === "primary") {
          return theme.colors["navy-06"]
        }
        if (focused && variantValue === "secondary") {
          return theme.colors["navy-04"]
        }
        if (hover && variantValue === "secondary") {
          return theme.colors["navy-01"]
        }
        if (variantValue === "secondary") {
          return theme.colors["gray-lines"]
        }
        return theme.colors["navy-03"]
      }

      const variants = {
        primary: {
          paddingTop: "16px",
          paddingBottom: "9px",
          borderTop: "none",
          borderRight: "none",
          borderLeft: "none",
          borderColor: `${
            state.isFocused ? theme.colors["navy-06"] : "transparent"
          }`,

          borderBottom: `${
            !state.isFocused || error ? "1px" : "2px"
          } solid ${getBorderColor(false, state.isFocused, error, variant)}`,

          ":hover": {
            borderColor: `${
              state.isFocused ? theme.colors["navy-06"] : "transparent"
            }`,

            borderBottom: `${
              !state.isFocused || error ? "1px" : "2px"
            } solid ${getBorderColor(true, state.isFocused, error, variant)}`,
          },
        },
        secondary: {
          paddingLeft: "10px",
          minHeight: "35px",
          border: `1px solid ${getBorderColor(
            false,
            state.isFocused,
            error,
            variant
          )}`,

          ":hover": {
            border: `1px solid ${getBorderColor(
              true,
              state.isFocused,
              error,
              variant
            )}`,
          },
        },
      }

      return {
        ...provided,
        ...variants[variant],
        borderRadius: "0",
        backgroundColor: "transparent",
        cursor: "pointer",
        lineHeight: "24px",
        boxShadow: "none",
      }
    },
    indicatorSeparator: () => {
      return {
        display: "none",
      }
    },
    option: (provided, state) => {
      const focusStyles = {
        // navy-06 5% opacity
        background: "rgba(27, 49, 57, 0.05)",
        borderColor: theme.colors["gray-lines"],
      }
      const variants = {
        primary: {
          minHeight: "24px",
        },
        secondary: {},
      }
      return {
        ...provided,
        ...variants[variant],
        fontSize: "16px",
        backgroundColor: "transparent",
        color: theme.colors["gray-text"],
        paddingLeft: "10px",
        padding: "4px",
        margin: "0",
        borderTop: "1px solid transparent",
        ...(state.isFocused && focusStyles),
        ":hover": {
          ...focusStyles,
        },
      }
    },
    menuList: (provided) => {
      return {
        ...provided,
        padding: "0",
        margin: "0",
        maxHeight: "180px",
        "::-webkit-scrollbar": {
          width: "16px",
        },
        "::-webkit-scrollbar-track": {
          boxSizing: "border-box",
          borderLeft: `1px solid ${theme.colors["gray-lines"]}`,
        },
        "::-webkit-scrollbar-thumb": {
          border: "4px solid transparent",
          background: theme.colors["gray-lines"],
          borderRadius: "8px",
          height: "36px",
          backgroundClip: "padding-box",
        },
      }
    },
    input: (provided) => {
      return {
        ...provided,
      }
    },
    singleValue: (provided) => {
      return {
        ...provided,
        marginLeft: "0",
        fontSize: "16px",
        color: theme.colors["gray-text"],
      }
    },
    multiValueLabel: (provided) => {
      return {
        ...provided,
        marginLeft: "0",
        fontSize: "14px",
        color: theme.colors["gray-text"],
      }
    },
    indicatorsContainer: (provided) => {
      return {
        ...provided,
      }
    },
    dropdownIndicator: (provided) => {
      const variants = {
        primary: {
          marginRight: "19px",
          transform: "translateY(-8px)",
        },
        secondary: {
          marginRight: "14px",
        },
      }
      return {
        ...provided,
        ...variants[variant],
        padding: "0",
        svg: {
          width: "10px",
          height: "5px",
        },
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='10' height='5' viewBox='0 0 10 5' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0L5 5L10 0H0Z' fill='%231B5162'/%3E%3C/svg%3E")`,
        backgroundRepeat: "no-repeat",
        color: "transparent",
        ":hover": {
          color: "transparent",
        },
      }
    },
    valueContainer: (provided) => {
      return {
        ...provided,
        padding: "0",
      }
    },
  }
}
