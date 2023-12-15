import React from 'react'
import PropTypes from "prop-types"
import FeatureRow from './FeatureRow'
import FeatureHeader from './FeatureHeader'
import AccordionList from '../AccordionList'

const PricingFeatureTable = ({ cloud }) => {
  const headersMap = {
    "GCP": {
      title: "Compare features",
      column1: "SQL Classic",
    },
    "Azure": {
      title: "Compare features",
      column1: "SQL Classic",
      column2: "SQL Pro",
      column3: "SQL Serverless"
    },
    "AWS": {
      title: "Compare features",
      column1: "SQL Classic",
      column2: "SQL Pro",
      column3: "SQL Serverless"
    }
  }

  const headerData = headersMap[cloud]
  const featureList = [  
    { 
      name: "Limited-Time Price Reduction",
      column1: "",
      column2: (cloud == 'AWS' ? "Promo Nov. 1, 2022 to Jan 31, 2024" : "Promo Dec. 1, 2022 to April 30, 2023"),
      column3: (cloud === 'AWS' ? "Promo Nov. 1, 2022 to Jan 31, 2024" : "Promo Dec. 1, 2022 to April 30, 2023"),
      features: [
        { 
          name: "Promo Nov. 1, 2022 to April 30, 2023", 
          show: 'AWS', 
          mergeLastTwo: true,
          computeTypesEnabled: [
            false,
            "40% reduction (North American data centers) 50% reduction (data centers outside North America", 
            "40% reduction (North American data centers) 50% reduction (data centers outside North America", 
          ]
        },
        { 
          name: "Promo May 1, 2023 to Jan. 31, 2024",
          show: 'AWS',
          mergeLastTwo: true, 
          computeTypesEnabled: [
            false,
            "20% reduction (North American data centers) 30% reduction (data centers outside North America", 
            "20% reduction (North American data centers) 30% reduction (data centers outside North America", 
          ]
        },
        { 
          name: "Promo Dec. 1, 2022 to April 30, 2023",
          show: 'Azure',
          mergeLastTwo: true,
          computeTypesEnabled: [
            false,
            "40% reduction (North American data centers) 50% reduction (data centers outside North America", 
            "40% reduction (North American data centers) 50% reduction (data centers outside North America", 
          ]
        },
      ]
    },
    {
      name: "Data Exploration and Connectivity",
      column1: "Intelligent auto complete, ANSI SQL & Rest API",
      column2: "Intelligent auto complete, ANSI SQL & Rest API",
      column3: "Intelligent auto complete, ANSI SQL & Rest API",
      features: [
        {
          name: "SQL Editor with intelligent auto complete",
          show: 'all',
          computeTypesEnabled: [
            true,
            true,
            true
          ]
        },
        {
          name: "ANSI SQL",
          show: 'all',
          computeTypesEnabled: [
            true,
            true,
            true
          ]
        },
        {
          name: "SQL REST API, Python, Node.js, Go*",
          show: 'all',
          computeTypesEnabled: [
            true,
            true,
            true
          ]
        },
        {
          name: "Partner Connect",
          show: 'all',
          computeTypesEnabled: [
            true,
            true,
            true
          ]
        },
      ]
    },
    {
      name: "Performance",
      column1: "Massively parallel processing",
      column2: "Massively parallel processing & Predictive I/O",
      column3: "Massively parallel processing & Predictive I/O",
      features: [
        {
          name: "Photon Engine (Massively Parallel Processing)",
          show: 'all',
          computeTypesEnabled: [
            true,
            true,
            true
          ]
        },
        {
          name: "Predictive I/O",
          show: 'all',
          computeTypesEnabled: [
            false,
            true,
            true
          ]
        },
      ]
    },
    {
      name: "SQL ETL/ELT",
      column1: "",
      column2: "Query federation, materialized views and workflow integration",
      column3: "Query federation, materialized views and workflow integration",
      features: [
        {
          name: "Query Federation*",
          show: 'all',
          computeTypesEnabled: [
            false,
            true,
            true
          ]
        },
        {
          name: "Materialized Views*",
          show: 'all',
          computeTypesEnabled: [
            false,
            true,
            true
          ]
        },
        {
          name: "Workflows Integration*",
          show: 'all',
          computeTypesEnabled: [
            false,
            true,
            true
          ]
        },
      ]
    },
    {
      name: "Data Science and ML",
      column1: "",
      column2: "Python UDF, notebooks integration & geospatial",
      column3: "Python UDF, notebooks integration & geospatial",
      features: [
        {
          name: "Python UDF*",
          show: 'all',
          computeTypesEnabled: [
            false,
            true,
            true
          ]
        },
        {
          name: "Notebooks Integration*",
          show: 'all',
          computeTypesEnabled: [
            false,
            true,
            true
          ]
        },
        {
          name: "Geospatial",
          show: 'all',
          computeTypesEnabled: [
            false,
            true,
            true
          ]
        },
      ]
    },
    {
      name: "High Concurrency BI",
      column1: "",
      column2: "",
      column3: "Fully managed compute, workload management & query result caching",
      features: [
        {
          name: 'Instant, Elastic, Fully Managed Compute*',
          show: 'all',
          computeTypesEnabled: [
            false,
            false,
            true
          ]
        },
        {
          name: 'Intelligent Workload Management*',
          show: 'all',
          computeTypesEnabled: [
            false,
            false,
            true
          ]
        },
        {
          name: 'Serverless Query Result Caching*',
          show: 'all',
          computeTypesEnabled: [
            false,
            false,
            true
          ]
        },
      ]
    },
    {
      name: "Governance and Manageability",
      column1: "Query profiling, unity catalog & platform manageability",
      column2: "Query profiling, unity catalog & platform manageability",
      column3: "Query profiling, unity catalog & platform manageability",
      features: [
        { 
          name: 'Query History and Profile',
          show: 'all',
          computeTypesEnabled: [
            true,
            true,
            true
          ]
        },
        { 
          name: 'Data Explorer (Unity Catalog Integration)',
          show: 'all',
          computeTypesEnabled: [
            true,
            true,
            true
          ]
        },
        { 
          name: 'Managed Data Sharing',
          show: 'all',
          computeTypesEnabled: [
            true,
            true,
            true
          ]
        },
        { 
          name: 'Platform Governance and Manageability',
          show: 'all',
          mergeAll: true,
          computeTypesEnabled: [
            `See <a href='https://www.databricks.com/product/pricing/platform-addons'>Platform Capabilities </a>for details`,
          ]
        },
      ]
    },
    {
      name: 'Enterprise Security',
      column1: `See <a href='https://www.databricks.com/product/pricing/platform-addons'>Add-Ons</a> for details`,
      mergeAll: true,
      features: [

      ]
    }
  ]

  const accordions = featureList.map((feature) => {
    return {
      description: (
        <FeatureHeader
          name={feature.name} 
          column1={feature.column1} 
          column2={feature.column2} 
          column3={feature.column3}
          cloud={cloud}
          mergeAll={feature.mergeAll}
        />
      ),
      children: feature.features.map((item) => <FeatureRow {...item} cloud={cloud} />)
    }
  })

  return (
    <div>
      <div className='flex justify-between items-center'>
        <div className='w-1/4'>
          <p className='h3'>
            {headerData?.title}
          </p>
        </div>
        <div className='w-1/4 text-center'>
          <p className='h4'>
            {headerData?.column1}
          </p>
        </div>
        {cloud !== 'GCP' && (
          <>
            <div className='w-1/4 text-center'>
              <p className='h4'>
                {headerData?.column2}
              </p>
            </div>
            <div className='w-1/4 text-center'>
              <p className='h4'>
                {headerData?.column3}
              </p>
            </div>
          </>
        )}
      </div>
      <AccordionList variant='alternate' accordions={accordions} />
    </div>
  )
}

PricingFeatureTable.propTypes = {
  cloud: PropTypes.string.isRequired,
}

export default PricingFeatureTable
