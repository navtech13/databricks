import React from "react"
import PropTypes from "prop-types"
import Modal from "react-modal"
import IconResolver from "../IconResolver"

const ModalComponent = ({
  isOpen,
  onRequestClose,
  children,
  closeLabel,
  className,
  innerClassName,
  ...props
}) => {
  return (
    <Modal
      data-cy='ModalComponent'
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={`absolute inset-x-4 top-1/2 -translate-y-1/2 border-none bg-none p-0 outline-none ${className}`}
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.2)",
          cursor: "zoom-out",
          zIndex: "100",
        },
      }}
      {...props}
    >
      {/* The following rules are disabled since we already have a button to handle accesibility */}
      {/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
      <div
        className={`${innerClassName} flex h-full cursor-default flex-col justify-center`}
      >
        <div className='relative max-h-[85vh]'>
          <button
            type='button'
            onClick={onRequestClose}
            className='bg-navy-06 text-orange-04 :text-white absolute bottom-full right-0 p-1 duration-200 hover:text-white'
            aria-label={closeLabel}
          >
            <IconResolver token='close' />
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
  className: PropTypes.string,
  innerClassName: PropTypes.string,
}

ModalComponent.defaultProps = {
  isOpen: false,
  onRequestClose: undefined,
  closeLabel: "Close",
  className: "inner-wrapper h-full",
  innerClassName: "",
}

ModalComponent.setRootElement = (rootElement) => {
  Modal.setAppElement(rootElement)
}

export default ModalComponent
