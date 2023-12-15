import React from "react"
import PropTypes from "prop-types"

const Header = ({ width, name, cpu, memory, storage, dbu, rate }) => {
  return (
    <div className='text-1.5 flex items-center justify-between'>
      <div className={width}>
        <p className='md:h5 font-bold'>{name}</p>
      </div>
      <div className='w-2/12 text-center'>
        <p className='md:h5 font-bold'>{cpu}</p>
      </div>
      <div className='w-2/12 text-center'>
        <p className='md:h5 font-bold'>{memory}</p>
      </div>
      {storage && (
        <div className='w-2/12 text-center'>
          <p className='md:h5 font-bold'>{storage}</p>
        </div>
      )}
      {dbu && (
        <div className='hidden w-2/12 text-center md:block'>
          <p className='md:h5 font-bold'>{dbu}</p>
        </div>
      )}
      <div className='w-2/12 text-center'>
        <p className='md:h5 font-bold'>{rate}</p>
      </div>
    </div>
  )
}

Header.propTypes = {
  width: PropTypes.string,
  name: PropTypes.string,
  cpu: PropTypes.string,
  memory: PropTypes.string,
  storage: PropTypes.string,
  dbu: PropTypes.string,
  rate: PropTypes.string,
}

Header.defaultProps = {
  width: "",
  name: "",
  cpu: "",
  memory: "",
  storage: "",
  dbu: "",
  rate: "",
}

export default Header
