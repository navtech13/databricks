import React, { forwardRef, useRef } from "react"
import PropTypes from "prop-types"
import { debounce } from "lodash"
import Button from "../Button"
import IconResolver from "../IconResolver"
import useTranslate from "../../../../gatsby-theme-databricks-drupal/src/utils/translate"

const SearchBar = ({ className, setSearchTerms }, ref) => {
  const defaultRef = useRef()
  const inputRef = ref || defaultRef
  const { translate } = useTranslate()

  const handleSearch = () => {
    const { current } = inputRef
    setSearchTerms(current.value.toLowerCase())
  }

  const handleChange = ({ target }) => {
    const handleQuery = debounce((query) => {
      setSearchTerms(query.toLowerCase())
    }, 800)

    handleQuery(target.value)
  }

  return (
    <div className={`flex ${className}`}>
      <div className='group relative w-full'>
        <IconResolver
          className='t-1/2 text-navy-02 group-hover:text-navy-06 group-focus:text-navy-06 absolute left-1 h-[1.5rem] translate-y-1/2 pb-1 md:pb-0.5'
          token='search'
        />
        <input
          ref={inputRef}
          className='Search border-b-navy-02 focus:border-t-navy-06 focus:border-l-navy-06 focus:border-b-navy-0-6 h-full w-full border-b border-t-transparent border-l-transparent bg-white pl-4 focus:outline-none focus:ring'
          type='text'
          aria-label='Search'
          onChange={handleChange}
        />
      </div>
      <Button
        as='button'
        variant='secondary'
        className='px-1.5 py-1'
        onClick={handleSearch}
      >
        {translate("general.search")}
      </Button>
    </div>
  )
}

SearchBar.propTypes = {
  setSearchTerms: PropTypes.func,
  className: PropTypes.string,
}

SearchBar.defaultProps = {
  setSearchTerms: [],
  className: "",
}

export default forwardRef(SearchBar)
