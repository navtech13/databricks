import React, { useState } from "react"
import PropTypes from "prop-types"
import Modal from "react-modal"
import MarketoForm from "../MarketoForm"
import IconResolver from "../IconResolver"
import RichText from "../RichText"
import "./styles.css"

const ModalForm = ({
  campaignId,
  children,
  className,
  title,
  description,
  cookieName,
  formId,
  href,
  legalCopy,
  cta,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const onRequestClose = () => {
    setIsOpen(false)
  }
  return (
    <>
      <div
        role='button'
        tabIndex={0}
        className={className}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === "Spacebar") {
            setIsOpen(true)
          }
        }}
        onClick={() => setIsOpen(true)}
      >
        {children}
      </div>
      <Modal
        data-cy='ModalComponent'
        isOpen={isOpen}
        className='inner-wrapper demo-overlay pointer-events-none flex h-full w-full items-center justify-center outline-none '
        onRequestClose={onRequestClose}
        overlayClassName='m-0 top-0 fixed w-full h-full z-50 bg-almost-black bg-opacity-20 px-2 py-4'
      >
        <div className='shadow-shadow-2 accelerator-card-form pointer-events-auto relative flex max-h-full min-h-[75vh] w-full flex-col overflow-auto bg-white p-2 pt-6 md:max-h-[85vh] md:w-10/12 md:p-6 lg:w-6/12 lg:max-w-[560px]'>
          <button
            type='button'
            className=' absolute right-0 top-0 p-2 md:p-3'
            onClick={onRequestClose}
            aria-label='close'
          >
            <IconResolver className='text-navy-500 h-auto w-2' token='close' />
          </button>
          <div className='max-h-full w-full'>
            {title && <h2 className='mb-1 md:mb-3'>{title}</h2>}
            {description && (
              <RichText className='text-gray-text b2 mb-6'>{description}</RichText>
            )}
            <div className='mktoDemoGatedOverlayWrapper'>
              <MarketoForm
                campaignId={campaignId}
                formClassName='w-full mktoDemoGatedOverlay'
                title=''
                cookieName={cookieName}
                formId={formId}
                thankyou={href}
                cta={cta}
                legalCopy={legalCopy}
              />
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}

ModalForm.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  campaignId: PropTypes.string,
  title: PropTypes.string,
  cookieName: PropTypes.string,
  formId: PropTypes.string,
  legalCopy: PropTypes.string,
  href: PropTypes.string,
  description: PropTypes.string,
  cta: PropTypes.string,
}

ModalForm.defaultProps = {
  className: "",
  campaignId: undefined,
  title: "Contact Us",
  cookieName: undefined,
  formId: "1001",
  legalCopy: undefined,
  href: undefined,
  description: undefined,
  cta: undefined,
}

export default ModalForm
