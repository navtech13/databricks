import React from "react"
import PropTypes from "prop-types"

const Row = ({
  width,
  selector,
  vcpu,
  memory,
  storage,
  dburate,
  hourrate,
  instance,
}) => {
  return (
    <div className='text-1.5 odd:bg-navy-03/[0.09] flex items-center justify-between p-1 py-2.5 even:bg-white md:pl-8'>
      <div className={width}>
        <p className='md:h5'>{selector?.split("|")[0].trim(" ") || instance}</p>
      </div>
      <div className='w-1/12 text-center md:w-2/12'>
        <p className='md:h5'>{vcpu}</p>
      </div>
      <div className='text-center md:w-2/12'>
        <p className='md:h5'>{memory}</p>
      </div>
      {storage && (
        <div className='text-center md:w-2/12'>
          <p className='md:h5'>{storage}</p>
        </div>
      )}
      {dburate && (
        <div className='hidden text-center md:block md:w-2/12'>
          <p className='md:h5'>{dburate}</p>
        </div>
      )}
      <div className='text-center md:w-2/12'>
        <p className='md:h5'>{hourrate}</p>
      </div>
    </div>
  )
}

Row.propTypes = {
  width: PropTypes.string.isRequired,
  memory: PropTypes.string.isRequired,
  selector: PropTypes.string.isRequired,
  vcpu: PropTypes.string.isRequired,
  storage: PropTypes.string.isRequired,
  dburate: PropTypes.string.isRequired,
  hourrate: PropTypes.string.isRequired,
  instance: PropTypes.string.isRequired,
}

export default Row
