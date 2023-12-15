import React from "react"
import PropTypes from "prop-types"
import { useBreakpoint } from "databricks-ui/src/utils/use-breakpoint"
import useTranslate from "../utils/translate"

function AssetCard({ resource, onClick, isActive }) {
  const isDesktop = useBreakpoint("xl")
  const { translate } = useTranslate()
  const imgSrc = `${process.env.GATSBY_DRUPAL_URL}${resource.image}`

  return (
    <div
      role='button'
      tabIndex='0'
      aria-label={resource.title}
      className={
        isActive && isDesktop
          ? "bg-navy-06 p-1.6 flex min-h-[110px] w-full cursor-pointer items-center text-white xl:items-start"
          : "hover:bg-gray-cool border-gray-lines xl:p-1.6 mx-auto flex min-h-[110px] w-[224px] min-w-[224px] cursor-pointer flex-col items-center bg-white xl:mx-0 xl:w-full xl:max-w-none xl:flex-row xl:items-start xl:first:border-t"
      }
      onClick={() => onClick(resource)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          onClick(resource)
        }
      }}
      key={resource.id}
    >
      <div className='shadow-card-normal h-[225px] border border-white xl:ml-1 xl:h-auto xl:w-1/4'>
        <img src={imgSrc} alt={resource.title} height={225} width={225} />
      </div>
      <div className='p-1.6 flex flex-col xl:w-2/3 xl:p-0 xl:pl-2'>
        <div className='pb-1.2 pt-0.4 flex w-full items-center justify-between xl:py-0'>
          <span
            className={`text-[10px] font-[600] uppercase leading-6 ${
              isActive ? "text-green-500" : "text-green-700"
            }`}
          >
            {resource.category}
          </span>
          {resource.featured && (
            <div
              className={`flex h-[20px] rounded-full px-1 text-[10px] font-medium uppercase leading-[20px] ${
                !isActive || !isDesktop
                  ? "bg-navy-200 text-navy-06"
                  : "border-navy-02 border"
              }`}
            >
              <span className='self-center'>
                ★ {translate("card.tag.recommended")}
              </span>
            </div>
          )}
        </div>
        <span>{resource.title}</span>
      </div>
    </div>
  )
}

AssetCard.propTypes = {
  resource: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    featured: PropTypes.bool,
  }).isRequired,
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default AssetCard
