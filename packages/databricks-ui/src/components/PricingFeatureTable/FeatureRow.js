import React from "react"
import PropTypes from "prop-types"
import { Enabled } from "./Enabled"
import { Disabled } from "./Disabled"

const FeatureRow = ({
  name,
  computeTypesEnabled,
  cloud,
  show,
  mergeLastTwo,
  mergeAll,
}) => {
  if (show === cloud || show === cloud || show === "all") {
    return (
      <div className='odd:bg-navy-03/[0.09] flex items-center justify-between py-2.5 pl-8 even:bg-white'>
        <div className='w-1/4'>
          <p className='h5'>{name}</p>
        </div>
        {mergeAll ? (
          <div
            className='w-3/4 text-center'
            dangerouslySetInnerHTML={{ __html: computeTypesEnabled[0] }}
          />
        ) : (
          <div className='w-1/4 text-center'>
            <p className=''>{computeTypesEnabled[0] ? <Enabled /> : <Disabled />}</p>
          </div>
        )}
        {cloud !== "GCP" &&
          (mergeAll ? (
            <></>
          ) : mergeLastTwo ? (
            <div className='w-1/2 text-center'>
              <p>{computeTypesEnabled[1]}</p>
            </div>
          ) : (
            <>
              <div className='w-1/4 text-center'>
                <p className=''>
                  {computeTypesEnabled[1] === true ? (
                    <Enabled />
                  ) : computeTypesEnabled[1]?.length > 0 ? (
                    computeTypesEnabled[1]
                  ) : (
                    <Disabled />
                  )}
                </p>
              </div>
              <div className='w-1/4 text-center'>
                <p className=''>
                  {computeTypesEnabled[2] === true ? (
                    <Enabled />
                  ) : computeTypesEnabled[2]?.length > 0 ? (
                    computeTypesEnabled[2]
                  ) : (
                    <Disabled />
                  )}
                </p>
              </div>
            </>
          ))}
      </div>
    )
  }
  return null
}

FeatureRow.propTypes = {
  name: PropTypes.string.isRequired,
  computeTypesEnabled: PropTypes.instanceOf(Array).isRequired,
  cloud: PropTypes.string.isRequired,
  show: PropTypes.string.isRequired,
  mergeLastTwo: PropTypes.bool,
  mergeAll: PropTypes.bool,
}

FeatureRow.defaultProps = {
  mergeLastTwo: false,
  mergeAll: false,
}

export default FeatureRow
