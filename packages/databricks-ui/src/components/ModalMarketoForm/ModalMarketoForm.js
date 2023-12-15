import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import Modal from "../Modal"
import Button from "../Button"
import MarketoForm from "../MarketoForm"

const ModalMarketoForm = ({
  buttonAlignment,
  formId,
  campaignId,
  cta,
  cookieName,
  title,
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const alignmentMap = {
    right: "justify-end",
    center: "justify-center",
    left: "justify-start",
  }

  useEffect(() => {
    const cleanup = () => {
      document.documentElement.style.overflow = null
      document.documentElement.style.paddingRight = null
    }
    if (isOpen) {
      document.documentElement.style.paddingRight = `${
        window.innerWidth - document.documentElement.clientWidth
      }px`
      document.documentElement.style.overflow = "hidden"
      return cleanup
    }
    cleanup()
    return cleanup
  }, [isOpen])

  return (
    <div>
      <Modal
        className='m-auto flex max-h-[80vh] max-w-[498px] items-center justify-center focus-visible:outline-none'
        innerClassName='w-full'
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(!isOpen)}
      >
        <div className='bg-navy-06 h-full max-h-[85vh] min-h-[65vh] overflow-auto md:w-[498px]'>
          <MarketoForm
            cookieName={cookieName}
            title={title}
            formId={formId}
            campaignId={campaignId}
            formClassName='mktoLayoutAbove'
          />
        </div>
      </Modal>
      <div className={`flex ${alignmentMap[buttonAlignment] || alignmentMap.left}`}>
        <Button onClick={() => setIsOpen(!isOpen)}>{cta}</Button>
      </div>
    </div>
  )
}

ModalMarketoForm.propTypes = {
  buttonAlignment: PropTypes.string,
  formId: PropTypes.string,
  campaignId: PropTypes.string,
  cta: PropTypes.string,
  title: PropTypes.string,
  cookieName: PropTypes.string,
}
ModalMarketoForm.defaultProps = {
  buttonAlignment: "left",
  formId: "1001",
  campaignId: "",
  cta: "Submit",
  title: undefined,
  cookieName: undefined,
}

export default ModalMarketoForm
