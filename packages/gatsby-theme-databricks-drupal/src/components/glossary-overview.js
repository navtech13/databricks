import React, { useState, useEffect, useContext } from "react"
import PropTypes from "prop-types"
import ReactHtmlParser from "react-html-parser"
import { Link } from "databricks-ui"
import IconResolver from "../../../databricks-ui/src/components/IconResolver"
import { useLanguageContext } from "./language-provider"
import { Image } from "../../../databricks-ui/src/components"
import { useBreakpoint } from "../../../databricks-ui/src/utils/use-breakpoint"
import backgroundImageDefault from "../../../databricks-ui/static/images/bg-glossary-overview.png"
import backgroundImageTabletDefault from "../../../databricks-ui/static/images/bg-landing-tablet.png"
import GlobalContext from "./global-context"
import useTranslate from "../utils/translate"

const GlossaryOverview = ({
  backgroundImage,
  backgroundImageTablet,
  hasBackgroundImage,
}) => {
  const glossaryInfo = useContext(GlobalContext)?.glossaryInfo

  const isDesktop = useBreakpoint("lg")

  const image = isDesktop
    ? backgroundImage
    : backgroundImageTablet || backgroundImage

  const { currentLanguage, defaultLanguage } = useLanguageContext()
  const { translate } = useTranslate()
  let selectedGlossary =
    glossaryInfo && glossaryInfo[`glossary${defaultLanguage.id}`]
  if (glossaryInfo) {
    if (currentLanguage && glossaryInfo[`glossary${currentLanguage.id}`]) {
      selectedGlossary = glossaryInfo[`glossary${currentLanguage.id}`]
    }
    if (!selectedGlossary?.entities && glossaryInfo?.glossary) {
      selectedGlossary = glossaryInfo?.glossary
    }
  }

  const entities = selectedGlossary?.entities
  const [glossaryOverview] = useState(
    entities.filter((item) => !item.fieldHideFromGlossaryIndex)
  )
  const [isOpen, setIsOpen] = useState(false)
  const [items, setItems] = useState(glossaryOverview)
  const [itemsLetter] = useState(glossaryOverview)
  const [searchVal, setSearchVal] = useState("")
  const [filterSearchVal, setFilterSearchVal] = useState([])
  const [searchedItem, setSearchedItem] = useState()
  const [othersChecked, setOthersChecked] = useState(false)
  const transOthers = translate("general.others")[0]

  const toggleClassAll = () => {
    document.getElementById("glossSearch").value = ""
  }
  const [checkedState, setCheckedState] = useState(
    new Array(items?.length).fill(false)
  )
  const [checkedStateselect] = useState(new Array(items?.length).fill(true))
  const [checkedStatedeselect] = useState(new Array(items?.length).fill(false))
  const [sFilter, setSFilter] = useState(true)
  const [selDesel, setSelDesel] = useState(true)

  const stripHtml = (data) => {
    const regex = /(<([^>]+)>)/gi
    return data.replace(regex, "")
  }

  const updateItemsFunc = (curElm) => {
    const otherVal =
      curElm?.body?.value
        .replace(/(<([^>]+)>)/gi, "")
        .substring(0, 250)
        .toLowerCase() ||
      curElm.fieldComponents[0].entity.fieldBody.value
        .replace(/(<([^>]+)>)/gi, "")
        .substring(0, 250)
        .toLowerCase()
    return (
      curElm.title.toLowerCase().includes(searchVal.toLowerCase()) ||
      stripHtml(otherVal).includes(searchVal.toLowerCase())
    )
  }

  const handleSearch = () => {
    const updateItems =
      filterSearchVal.length > 0
        ? filterSearchVal.filter(updateItemsFunc)
        : glossaryOverview.filter(updateItemsFunc)
    setSearchedItem(updateItems)
  }

  const ActiveLetters =
    itemsLetter &&
    itemsLetter
      .sort((a, b) => (a.title > b.title ? 1 : -1))
      .map((it) => {
        return it.title.substring(0, 1).toUpperCase()
      })

  const isAlphabeticChar = (char) => {
    const pattern = /^[a-zA-z]$/
    return pattern.test(char)
  }

  const newLetter = [...new Set(ActiveLetters)].filter((char) =>
    isAlphabeticChar(char)
  )
  const aZ = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ]
  const notintersectionArr = aZ.filter((curr) => {
    return !newLetter.includes(curr)
  })

  const setCollapse = () => {
    setIsOpen(!isOpen)
  }

  const nonAlphaCharArray = [...new Set(ActiveLetters)].filter(
    (char) => !isAlphabeticChar(char)
  )

  useEffect(() => {
    const list = document.getElementById("alignText")

    if (isOpen === true) {
      const aZitems = list.childNodes

      const itemsArr = []
      // eslint-disable-next-line no-restricted-syntax
      for (const i in aZitems) {
        if (aZitems[i].nodeType === 1) {
          // get rid of the whitespace text nodes
          itemsArr.push(aZitems[i])
        }
      }
      itemsArr.sort((a, b) => {
        return a.innerText === b.innerText ? 0 : a.innerText > b.innerText ? 1 : -1
      })

      for (let j = 0; j < itemsArr.length; j += 1) {
        list.appendChild(itemsArr[j])
      }
      // Collapse on click outside
      document.body.addEventListener("click", setCollapse)

      return function cleanup() {
        window.removeEventListener("click", setCollapse)
      }
    }
    return undefined
  }, [isOpen])

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch()
    }
  }

  const filterItem = (catg, event) => {
    if (event.target.checked) {
      setSearchedItem(undefined)
      setSearchVal("")
      if (sFilter) {
        setItems([])
        setSFilter(false)
      }
      const updateItems = glossaryOverview.filter((curElm) => {
        toggleClassAll()
        if (catg === transOthers) {
          return nonAlphaCharArray.some((letter) => curElm.title.startsWith(letter))
        }
        return curElm.title.toLowerCase().startsWith(catg.toLowerCase())
      })
      if (updateItems.length > 0) {
        setItems((prevItems) => [...prevItems, ...updateItems])
        setFilterSearchVal((prevItems) => [...prevItems, ...updateItems])
      } else {
        setItems("")
      }
    } else {
      setItems([])
      setSearchedItem(undefined)
      setFilterSearchVal([])
      setSearchVal("")
      const updateItems = items
        ? items.filter((curElm) => {
            toggleClassAll()
            if (catg === transOthers) {
              return !nonAlphaCharArray.some((letter) =>
                curElm.title.charAt(0).includes(letter)
              )
            }
            return !curElm.title.charAt(0).toLowerCase().includes(catg.toLowerCase())
          })
        : glossaryOverview
      if (updateItems.length > 0) {
        setItems((prevItems) => [...prevItems, ...updateItems])
        setFilterSearchVal((prevItems) => [...prevItems, ...updateItems])
        setSearchVal("")
      } else {
        toggleClassAll()
        setItems(glossaryOverview)
        setSearchVal("")
        setSFilter(true)
      }
    }
  }

  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    )
    setCheckedState(updatedCheckedState)
  }

  const selects = () => {
    setSelDesel(!selDesel)
    setCheckedState(checkedStateselect)
    setOthersChecked(true)
    setSearchedItem(undefined)
    toggleClassAll()
    setItems(glossaryOverview)
    setSFilter(false)
  }

  const deselects = () => {
    setSelDesel(!selDesel)
    setCheckedState(checkedStatedeselect)
    setOthersChecked(false)
    setSearchedItem(undefined)
    setItems(glossaryOverview)
    toggleClassAll()
    setSFilter(true)
  }

  const clickKeyDown = (e) => {
    if (e.key === "Enter" || e.key === "Spacebar") {
      e.target.click()
    }
  }

  const displayedItems = searchedItem || items

  return (
    <>
      <div className='overflow-hidden'>
        {hasBackgroundImage && backgroundImage && (
          <div className='page-background-image relative'>
            <Image
              className='absolute z-[-1] w-[768px] md:w-[1023px] lg:w-full'
              aria-hidden
              {...image}
            />
          </div>
        )}
        <div className='xxl:max-w-[1456px] mx-auto flex w-11/12 max-w-[508px] flex-col py-8 md:max-w-[704px] lg:max-w-[966px] xl:max-w-[1146px]'>
          <h2 className='mb-4'>Glossary</h2>
          <div className='mb-6 lg:flex'>
            <div
              onClick={(e) => {
                e.stopPropagation()
              }}
              onKeyDown={clickKeyDown}
              role='button'
              tabIndex={-1}
              className='relative mb-1  mr-2.5  w-full lg:w-4/12'
            >
              <div
                onClick={setCollapse}
                onKeyDown={clickKeyDown}
                role='button'
                tabIndex={-1}
                className='border-gray-lines flex w-full justify-between border py-1 px-1'
                data-cy='glossary-select'
              >
                <p>
                  <strong>A-Z</strong>
                </p>
                <IconResolver
                  className={`ml-1 mt-0.5 ${isOpen ? "rotate-180" : ""}`}
                  token='arrowDown'
                />
              </div>
              <span id='searchLetter'>
                {isOpen && (
                  <div className='border-gray-lines absolute z-10 mt-[-1px] h-[500px] w-full overflow-y-scroll border border-t-0 bg-white px-1 shadow-[0_25px_50px_-15px_rgba(0,0,0,0.2)]'>
                    <div className='text-1.75 flex justify-between py-1'>
                      <a
                        className='text-navy-06'
                        onClick={setCollapse}
                        onKeyDown={clickKeyDown}
                        role='button'
                        tabIndex={-1}
                      >
                        <p>Close</p>
                      </a>
                      {selDesel ? (
                        <a
                          className='text-navy-06'
                          onClick={selects}
                          onKeyDown={clickKeyDown}
                          role='button'
                          tabIndex={-1}
                        >
                          <p>Select All</p>
                        </a>
                      ) : (
                        <a
                          className='text-navy-06'
                          onClick={deselects}
                          onKeyDown={clickKeyDown}
                          role='button'
                          tabIndex={-1}
                        >
                          <p>Clear All</p>
                        </a>
                      )}
                    </div>
                    <div id='alignText'>
                      {newLetter.map((itemDetail, index) => (
                        <>
                          <div className='pb-1'>
                            <input
                              className='bg-nav-gray focus:ring-3 inline-block h-2.5 w-2.5 rounded border-gray-300 align-middle focus:ring-blue-300'
                              name='chk'
                              id={`flowbite-${itemDetail}`}
                              aria-describedby='flowbite'
                              checked={checkedState[index]}
                              onChange={() => handleOnChange(index)}
                              onClick={(e) => filterItem(itemDetail, e)}
                              type='checkbox'
                              role='button'
                            />
                            <label
                              className='pl-2'
                              htmlFor={`flowbite-${itemDetail}`}
                            >
                              {itemDetail}
                            </label>
                          </div>
                        </>
                      ))}
                      {notintersectionArr.map((itemDetail) => (
                        <>
                          <div className='pb-1'>
                            <input
                              className='bg-nav-gray focus:ring-3 inline-block h-2.5 w-2.5 rounded border-gray-300 align-middle focus:ring-blue-300'
                              disabled
                              id={`flowbite-${itemDetail}`}
                              aria-describedby='flowbite'
                              type='checkbox'
                            />
                            <label
                              className='pl-2'
                              htmlFor={`flowbite-${itemDetail}`}
                            >
                              {itemDetail}
                            </label>
                          </div>
                        </>
                      ))}
                    </div>
                    {nonAlphaCharArray.length > 0 && (
                      <div className='pb-1'>
                        <input
                          className='bg-nav-gray focus:ring-3 inline-block h-2.5 w-2.5 rounded border-gray-300 align-middle focus:ring-blue-300'
                          name='chk'
                          id={`flowbite-${transOthers}`}
                          aria-describedby='flowbite'
                          checked={othersChecked}
                          onChange={() => {
                            setOthersChecked((prevState) => !prevState)
                          }}
                          onClick={(e) => filterItem(transOthers, e)}
                          type='checkbox'
                        />
                        <label className='pl-2' htmlFor={`flowbite-${transOthers}`}>
                          {transOthers}
                        </label>
                      </div>
                    )}
                  </div>
                )}
              </span>
            </div>
            <div className='mb-1 flex w-full items-start lg:w-8/12'>
              <div className='group relative w-9/12 lg:w-11/12'>
                <IconResolver
                  className='t-1/2 text-navy-02 group-hover:text-navy-06 group-focus:text-navy-06 absolute left-1 h-[1.5rem] translate-y-1/2 pb-1 md:pb-0.5'
                  token='search'
                />
                <input
                  className='border-gray-lines w-full border-b-[1px] px-1 py-1 pl-4'
                  id='glossSearch'
                  type='text'
                  onChange={(e) => setSearchVal(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              </div>
              <button
                type='button'
                data-cy='search-btn'
                className='btn btn-secondary w-3/12 py-1 px-1 lg:w-2/12'
                onClick={handleSearch}
              >
                search
              </button>
            </div>
          </div>

          <div className='min-h-[500px]'>
            {displayedItems
              ?.sort((a, b) =>
                a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1
              )
              .map((item) => (
                <div
                  data-cy='glossary-item'
                  className='border-gray-lines flex flex-col justify-between  border-t lg:flex-row'
                >
                  <div className='text-2.5 p-2 pb-0 text-left lg:w-4/12 lg:p-3 lg:pr-0 lg:pl-0 '>
                    <Link className='text-almost-black' to={item.entityUrl.path}>
                      {item.title}
                    </Link>
                  </div>
                  <div className='p-2 lg:w-8/12 lg:px-2 lg:py-3'>
                    {/* eslint-disable-next-line react/no-unknown-property */}
                    <div variant='glossary'>
                      {ReactHtmlParser(
                        item?.body?.value
                          .replace(/(<style[\w\W]+style>)|(<([^>]+)>)/gi, "")
                          .replace(/\s\s+/g, " ")
                          .substring(0, 250) ||
                          item.fieldComponents[0].entity.fieldBody.value
                            .replace(/(<style[\w\W]+style>)|(<([^>]+)>)/gi, "")
                            .replace(/\s\s+/g, " ")
                            .substring(0, 250)
                      )}
                      <Link data-cy='glossary-link' to={item.entityUrl.path}>
                        {"{...}"}
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  )
}

GlossaryOverview.propTypes = {
  hasBackgroundImage: PropTypes.bool,
  backgroundImage: PropTypes.shape({}),
  backgroundImageTablet: PropTypes.shape({}),
}

GlossaryOverview.defaultProps = {
  backgroundImage: {
    src: backgroundImageDefault,
    alt: "",
  },
  backgroundImageTablet: {
    src: backgroundImageTabletDefault,
    alt: "",
  },
  hasBackgroundImage: true,
}

export default GlossaryOverview
