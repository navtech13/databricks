import React from "react"
import PropTypes from "prop-types"


const FeatureHeader = ({ name, column1, column2, column3, cloud, mergeAll }) => {
  
  return (
    <div className='flex justify-between items-center'>
      <div className='w-1/4'>
        <p className={`h5`}>{name}</p>
      </div>
      {mergeAll ? (
        <div class='w-3/4 text-center' dangerouslySetInnerHTML={{__html: column1}}>
        </div>
      ) : (
        <>
          <div className='w-1/4 text-center'>
            <p className=''>{column1}</p>
          </div>
          {cloud !== 'GCP' && (
            <>
              <div className='w-1/4 text-center'>
                <p className=''>{column2}</p>
              </div>
              <div className='w-1/4 text-center'>
                <p className=''>{column3}</p>
              </div>  
            </>
          )}
        </>
      )}
   
    </div>
  )
}

FeatureHeader.propTypes = {
  name: PropTypes.string,
  column1: PropTypes.string,
  column2: PropTypes.string,
  column3: PropTypes.string,
  cloud: PropTypes.string,
  mergeAll: PropTypes.string,
}

FeatureHeader.defaultProps = {
  name: "",
  column1: "",
  column2: "",
  column3: "",
  cloud: "",
  mergeAll: "",
}


export default FeatureHeader
