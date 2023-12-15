import React, { useState } from "react"
import { StaticQuery, graphql } from "gatsby"
import PropTypes from "prop-types"
import {
  SelectCheckbox,
  GeneralSearchBar,
  Grid,
  Card,
  ClearFilters,
  IconResolver,
} from "databricks-ui"

import useTranslate from "../utils/translate"
import formatPartnerSolutions, {
  getUniqueArray,
} from "../helpers/formatPartnerSolutions"

const ITEMS_PER_LOAD = 18

const PartnerSolutionSearch = ({
  partnerSolutions: initialPartnerSolutions,
  regionFilters: initialRegionFilters,
  partnerFilters: initialpartnerFilters,
  industryFilters: initialindustryFilters,
}) => {
  return (
    <StaticQuery
      query={graphql`
        query PartnerSolution {
          drupal {
            nodeQuery(
              filter: {
                conditions: [
                  { operator: EQUAL, field: "type", value: ["partner_solution"] }
                  { operator: EQUAL, field: "field_featured", value: "1" }
                  { operator: EQUAL, field: "status", value: ["1"] }
                ]
              }
            ) {
              count
              entities {
                ...NodePartnerSolutionSearch
              }
            }
          }
        }
      `}
      render={(data) => {
        const staticPartnerSolutions =
          data.drupal?.nodeQuery?.entities.length > 0 &&
          formatPartnerSolutions({
            partnerSolutionsCards: data.drupal.nodeQuery.entities,
          })
        const partnerSolutions = getUniqueArray(
          [
            ...(initialPartnerSolutions || []),
            ...(staticPartnerSolutions?.items || []),
          ],
          "id"
        )
        const regionFilters = getUniqueArray([
          ...(initialRegionFilters || []),
          ...(staticPartnerSolutions?.regionFilters || []),
        ])
        const partnerFilters = getUniqueArray([
          ...(initialpartnerFilters || []),
          ...(staticPartnerSolutions?.partnerFilters || []),
        ])
        const industryFilters = getUniqueArray([
          ...(initialindustryFilters || []),
          ...(staticPartnerSolutions?.industryFilters || []),
        ])

        const { translate } = useTranslate()
        const [partnersAmount, setPartnersAmount] = useState(ITEMS_PER_LOAD)
        const [partnerSolutionsData, setPartnerSolutionsData] =
          useState(partnerSolutions)
        const [searchInput, setSearchInput] = useState("")
        const [activeFilters, setActiveFilters] = useState({
          industries: [],
          partners: [],
          regions: [],
        })

        const filterMap = {
          industries: "industries",
          partners: "partnerTitle",
          regions: "regions",
        }

        const filterCards = (filters, searchValue) => {
          if (
            !searchValue &&
            filters?.industries.length === 0 &&
            filters?.partners.length === 0 &&
            filters?.regions.length === 0
          ) {
            return partnerSolutions
          }
          const filteredCards = partnerSolutions.filter((partnerSolution) => {
            let isAvailable = true
            Object.entries(filterMap).forEach(([filterType, solutionKey]) => {
              if (filters?.[filterType].length && isAvailable) {
                const solutionValues = partnerSolution[solutionKey]
                const filterValues = filters[filterType].map((item) => item.value)
                isAvailable = filterValues.some((element) =>
                  solutionValues.includes(element)
                )
              }
            })
            if (partnerSolution && isAvailable) {
              return partnerSolution.solutionTitle
                .toLowerCase()
                .includes(searchValue.toLowerCase())
            }
            return isAvailable
          })
          return filteredCards
        }
        const handleSubmit = (event, filtersValue) => {
          const filteredData = filterCards(filtersValue, searchInput)
          setPartnerSolutionsData(filteredData)
        }

        const handleReset = () => {
          setPartnerSolutionsData(partnerSolutions)
          setActiveFilters({
            industries: [],
            partners: [],
            regions: [],
          })
          setSearchInput("")
        }

        const handleLoadMore = () => {
          const itemsAmount = partnersAmount + ITEMS_PER_LOAD
          setPartnersAmount(itemsAmount)
        }

        const handleIndustriesChange = (value) => {
          const filtersValue = { ...activeFilters, industries: value }
          setActiveFilters(filtersValue)
          handleSubmit(null, filtersValue)
        }
        const handlePartnersChange = (value) => {
          const filtersValue = { ...activeFilters, partners: value }
          setActiveFilters(filtersValue)
          handleSubmit(null, filtersValue)
        }
        const handleRegionsChange = (value) => {
          const filtersValue = { ...activeFilters, regions: value }
          setActiveFilters(filtersValue)
          handleSubmit(null, filtersValue)
        }
        const handleInputChange = (value) => {
          handleSubmit(value, activeFilters)
        }

        return (
          <section>
            <GeneralSearchBar
              onEnter={handleInputChange}
              setSearchTerms={setSearchInput}
              value={searchInput}
              inputClassName='border-b'
            />
            <div className='mb-16 mt-4 flex flex-col-reverse gap-1 md:flex-row md:gap-4'>
              <SelectCheckbox
                options={industryFilters}
                label={translate("partners.filters.industry")}
                onChange={handleIndustriesChange}
                value={activeFilters.industries}
              />
              <SelectCheckbox
                options={partnerFilters}
                label={translate("partners.filters.partner")}
                onChange={handlePartnersChange}
                value={activeFilters.partners}
              />
              <SelectCheckbox
                options={regionFilters}
                label={translate("partners.filters.region")}
                onChange={handleRegionsChange}
                value={activeFilters.regions}
              />
            </div>
            {partnerSolutionsData.length > 0 ? (
              <div className='flex flex-col'>
                <Grid columns={3} gap='1.6' className='lg:gap-x-4 lg:gap-y-4'>
                  {partnerSolutionsData.slice(0, partnersAmount).map((solution) => {
                    const description = (
                      <div className='flex flex-col gap-2'>
                        <span className='b4'>{solution.industries[0]}</span>
                        <h4 className='font-bold'>{solution.solutionTitle}</h4>
                      </div>
                    )
                    return (
                      <div key={solution.id} className='partner-solution-card '>
                        <Card
                          variant='simple'
                          image={solution.image}
                          cta={{
                            text:
                              solution.solutionUrlTitle ||
                              translate("general.learn-more"),
                            to: solution.solutionUrl,
                          }}
                          description={description}
                        />
                      </div>
                    )
                  })}
                </Grid>
                <button onClick={handleLoadMore} type='button'>
                  {partnerSolutionsData.length > partnersAmount && (
                    <span className='text-orange-04 b4 m-8 flex flex-col items-center gap-0.5 underline'>
                      {translate("partners.load-more")}
                      <IconResolver
                        aria-hidden
                        className='rotate-90'
                        token='arrowRight'
                      />
                    </span>
                  )}
                </button>
              </div>
            ) : (
              <section className='bg-gray-warm-light flex w-full flex-col items-center py-3 px-5'>
                <div className='mb-2'>🤔</div>
                <h5 className='w-30 mb-1.5 text-center md:w-[340px] lg:w-[329px]'>
                  {translate("general.no-results-filters")}
                </h5>
                <ClearFilters handleReset={handleReset}>
                  {translate("general.reset-list")}
                </ClearFilters>
              </section>
            )}
          </section>
        )
      }}
    />
  )
}

PartnerSolutionSearch.propTypes = {
  partnerSolutions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  regionFilters: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  partnerFilters: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  industryFilters: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
}

PartnerSolutionSearch.defaultProps = {}

export default PartnerSolutionSearch
