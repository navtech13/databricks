import React from "react"
import PropTypes from "prop-types"
import Button from "../Button"
import IconResolver from "../IconResolver"

const SearchBar = ({
  setSearchTerms,
  value,
  onEnter,
  enterLabel,
  inputClassName,
}) => {
  return (
    <div className='flex' data-cy='SearchBar'>
      <div className='group relative w-full'>
        <IconResolver
          className='t-1/2 text-navy-02 group-hover:text-navy-06 group-focus:text-navy-06 absolute left-1 h-[1.5rem] translate-y-1/2 pb-1 md:pb-0.5'
          token='search'
        />
        <input
          className={`Search border-b-navy-02 focus:border-t-navy-06 focus:border-l-navy-06 focus:border-b-navy-0-6 h-full w-full  border-t-transparent border-l-transparent bg-white pl-4 focus:outline-none focus:ring ${inputClassName}`}
          onChange={(e) => setSearchTerms(e.target.value)}
          value={value}
          type='text'
          aria-label='Search'
          onKeyDown={(event) =>
            (event.key === "Enter" || event.key === " ") && onEnter(event)
          }
        />
      </div>
      <Button variant='secondary' className='px-1.5 py-1' onClick={onEnter}>
        {enterLabel}
      </Button>
    </div>
  )
}

SearchBar.propTypes = {
  setSearchTerms: PropTypes.func,
  value: PropTypes.string,
  inputClassName: PropTypes.string,
  enterLabel: PropTypes.string,
  onEnter: PropTypes.func,
}

SearchBar.defaultProps = {
  setSearchTerms: [],
  value: "",
  enterLabel: "search",
  inputClassName: "",
  onEnter: () => {},
}

export default SearchBar
