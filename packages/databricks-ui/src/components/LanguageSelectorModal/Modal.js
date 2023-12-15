import React from "react"
import PropTypes from "prop-types"
import Modal from "react-modal"
import IconResolver from "../IconResolver"

const ModalComponent = ({
  isOpen,
  onRequestClose,
  children,
  closeLabel,
  innerClassName,
  ...props
}) => {
  return (
    <Modal
      data-cy='ModalComponent'
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className='absolute top-[40%] -translate-y-1/2 border-none bg-none p-0 outline-none md:inset-x-4 md:w-max'
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          cursor: "zoom-out",
          zIndex: "100",
        },
        content: {
          margin: "0 auto",
        },
      }}
      {...props}
    >
      <div
        className={`${innerClassName} flex w-screen cursor-default flex-col md:max-w-[565px]`}
      >
        <div className='relative max-h-[85vh]'>
          <button
            type='button'
            onClick={onRequestClose}
            className='text-light-gray absolute right-0 pr-2.5 pt-2.5 '
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
  innerClassName: PropTypes.string,
}

ModalComponent.defaultProps = {
  isOpen: false,
  onRequestClose: undefined,
  closeLabel: "Close",
  innerClassName: "",
}

ModalComponent.setRootElement = (rootElement) => {
  Modal.setAppElement(rootElement)
}

export default ModalComponent
