import React from "react"
import PropTypes from "prop-types"
import Modal from "react-modal"
import IconResolver from "../IconResolver"

const ModalComponent = ({
  isOpen,
  onRequestClose,
  children,
  closeLabel,
  ...props
}) => {
  return (
    <Modal
      data-cy='ModalComponent'
      isOpen={isOpen}
      style={{
        overlay: {
          backgroundColor: "#ffffff",
          cursor: "zoom-out",
          zIndex: "100",
        },
      }}
      {...props}
    >
      <div className='flex h-full flex-col justify-center'>
        <div className='relative max-h-[85%]'>
          <button
            onClick={onRequestClose}
            type='button'
            onRequestClose={onRequestClose}
            className='hover:text-navy-06 absolute right-0 bottom-auto z-50 mr-2 mt-5  p-0 text-[#5D7283] md:mt-8'
            aria-label={closeLabel}
          >
            <IconResolver
              className='h-auto w-2 text-[#5D7283] md:w-4'
              token='close'
            />
          </button>
          {children}
        </div>
      </div>
    </Modal>
  )
}

ModalComponent.propTypes = {
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool,
  onRequestClose: PropTypes.func,
  closeLabel: PropTypes.string,
}

ModalComponent.defaultProps = {
  isOpen: false,
  onRequestClose: undefined,
  closeLabel: "Close",
}

ModalComponent.setRootElement = (rootElement) => {
  Modal.setAppElement(rootElement)
}

export default ModalComponent
