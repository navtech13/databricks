import PropTypes from "prop-types"
import React from "react"
import LinkImg from "../../../../../../../assets/global/images/link.svg"
import Image from "../../../Image"
import eventTracking from "../../../../../../gatsby-theme-databricks-drupal/src/helpers/eventTracking"

function SearchResultsList({ data, stringSearched }) {
  const WordLimiter = (word, limit) =>
    word.length > limit ? `${word.slice(0, limit + 1)}...` : word

  const handleClick = (clickedResult) => {
    const eventData = {
      event: `Search Result Selected`,
      searchContext: "searchPage",
      searchQuery: stringSearched,
      searchResultSelectedTitle: clickedResult?.highlight?.TitleToDisplayString[0],
      searchResultSelectedUrl: clickedResult?.href,
    }
    eventTracking(eventData)
  }
  return (
    <a
      href={data.href}
      target='_blank'
      style={{ textDecoration: "none" }}
      rel='noreferrer'
      className='search-result-item'
      data-cy='SearchResultsList'
      onClick={() => handleClick(data)}
    >
      <div className='search_result_post shadow-card-normal hover:border-b-orange-03 relative z-0 order-none mb-2.5 flex flex-none flex-col gap-2.5 self-stretch border-b border-solid border-white bg-white p-2 sm:flex-row sm:items-center md:ml-5'>
        <div className='bg-light-gray w-4/12 self-start md:w-1/5'>
          {data.imageSource ? (
            <Image src={data.imageSource} alt={data.sourceLabel} />
          ) : (
            <Image
              src='https://www.databricks.com/wp-content/uploads/2020/04/og-databricks.png'
              alt={data.sourceLabel}
            />
          )}
        </div>
        <div className='md-pr-2.5 w-full self-start sm:w-3/12 md:w-4/5'>
          <h4 className='text-navy-06 text-1.5 order-none flex flex-none items-center font-mono font-normal uppercase leading-4'>
            {data.sourceLabel}
          </h4>
          <h5 className='text-navy-06 order-1 mt-0.5 mb-0.5 flex flex-none items-center self-stretch text-base font-medium leading-5'>
            {WordLimiter(data.highlight.TitleToDisplayString[0], 80)}
          </h5>
          <p
            dangerouslySetInnerHTML={{
              __html: WordLimiter(data.highlight.SummaryToDisplay.join(","), 200),
            }}
            className='text-gray-text text-1.75 break-all font-normal sm:break-normal'
          />
          <h6 className='text-gray-text text-1.5 order-3 mt-1 flex flex-none items-center self-stretch break-all font-normal sm:break-normal'>
            {data.href}
          </h6>
        </div>
        <img
          className='arrow-img invisible absolute right-2 top-2 w-1.5'
          src={LinkImg}
          alt=''
        />
      </div>
    </a>
  )
}

SearchResultsList.propTypes = {
  stringSearched: PropTypes.string.isRequired,
  data: PropTypes.shape({
    highlight: PropTypes.shape({
      SummaryToDisplay: PropTypes.arrayOf({
        join: PropTypes.func,
      }),
      TitleToDisplayString: PropTypes.string,
    }),
    href: PropTypes.string,
    imageSource: PropTypes.string,
    sourceLabel: PropTypes.string,
  }).isRequired,
}

export default SearchResultsList
