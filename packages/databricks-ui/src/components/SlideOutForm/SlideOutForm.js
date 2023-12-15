import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import Modal from "react-modal"
import IconResolver from "../IconResolver"
import MarketoForm from "../MarketoForm"
import "./styles.css"

const SlideOutForm = ({
  formId,
  campaignId,
  cookieName,
  legalCopy,
  title,
  closeLabel,
  className,
  thankyou,
  useMarketoThankYouUrl,
  formVariant,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const checkHash = () => {
    const hash = window?.location?.hash
    const idHash = hash.replace(/#(\d+)/, "$1")
    if (idHash === `#slideout-${formId}`) {
      setIsOpen((prev) => !prev)
    }
  }
  useEffect(() => {
    checkHash()
    window.addEventListener("hashchange", checkHash)
    return () => {
      window.removeEventListener("hashchange", checkHash)
    }
  }, [])
  const onRequestClose = () => {
    setIsOpen((prev) => !prev)
    window.location.hash = ""
  }
  return (
    <div>
      <Modal
        style={{
          content: {
            height: "auto",
          },
        }}
        data-cy='ModalComponent'
        closeTimeoutMS={450}
        isOpen={isOpen}
        className={`inslideOutForm ${className}`}
        onRequestClose={onRequestClose}
        overlayClassName='inslideOutForm margin-0 top-0 z-30 fixed w-full h-full z-3'
        {...props}
      >
        <div className=' m-auto md:w-[640px] lg:w-[558px]'>
          <button
            type='button'
            className=' absolute right-0 pr-2.5 md:pr-4'
            onClick={onRequestClose}
            aria-label={closeLabel}
          >
            <IconResolver className='h-auto w-2.5' token='close' />
          </button>
          <div className='slide-out-form form-companyContact'>
            <MarketoForm
              variant='companyContact'
              formClassName='w-full'
              cookieName={cookieName}
              title={title}
              formId={formId}
              campaignId={campaignId}
              thankyou={thankyou}
              useMarketoThankYouUrl={useMarketoThankYouUrl}
              legalCopy={legalCopy}
              formVariant={formVariant}
            />
          </div>
        </div>
      </Modal>
    </div>
  )
}

SlideOutForm.propTypes = {
  closeLabel: PropTypes.string,
  className: PropTypes.string,
  title: PropTypes.string,
  cookieName: PropTypes.string,
  formId: PropTypes.string,
  campaignId: PropTypes.string,
  legalCopy: PropTypes.string,
  thankyou: PropTypes.string,
  useMarketoThankYouUrl: PropTypes.bool,
}

SlideOutForm.defaultProps = {
  closeLabel: "Close",
  title: "Contact Us",
  className: "w-full h-full focus-visible:outline-none",
  cookieName: undefined,
  formId: "1007",
  campaignId: "",
  legalCopy: `By Clicking "Get Started For Free", you agree to the Privacy Policy.`,
  thankyou: "",
  useMarketoThankYouUrl: "",
}

export default SlideOutForm
