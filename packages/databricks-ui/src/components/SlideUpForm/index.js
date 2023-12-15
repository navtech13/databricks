import React, { useEffect, useRef } from "react"
import PropTypes from "prop-types"
import Modal from "react-modal"
import eventTracking from "gatsby-theme-databricks-drupal/src/helpers/eventTracking"
import "./styles.css"
import SlideUpForm from "./SlideUpForm"
import IconResolver from "../IconResolver"

const ModalComponent = ({
  isOpen,
  handleClose,
  eventInfo,
  forceSubmission,
  ...props
}) => {
  const onRequestClose = () => handleClose(false)
  const hasBeenOpen = useRef(false)
  useEffect(() => {
    if (!isOpen && !hasBeenOpen.current) {
      return
    }
    const eventData = {
      overlayId: eventInfo?.overlayId,
      overlayName: eventInfo?.overlayName,
      overlayContentType: eventInfo?.overlayContentType || "form",
      overlayContentName: eventInfo?.overlayContentName,
    }
    if (isOpen) {
      eventData.event = "Content Overlay Viewed"
      eventData.overlayTriggerAction = eventInfo?.overlayTriggerAction
      hasBeenOpen.current = true
    }
    if (!isOpen) {
      eventData.event = "Content Overlay Dismissed"
    }
    eventTracking(eventData)
  }, [isOpen, hasBeenOpen, eventInfo])
  return (
    <Modal
      style={{
        content: {
          height: "auto",
        },
      }}
      data-cy='ModalComponent'
      closeTimeoutMS={450}
      isOpen={isOpen}
      className='slideUpForm'
      onRequestClose={forceSubmission ? () => {} : onRequestClose}
      overlayClassName='inslideOutForm margin-0 top-0 z-30 fixed w-full h-full z-3'
    >
      <div className='relative overflow-x-hidden py-[96px]'>
        {!forceSubmission && (
          <button
            onClick={onRequestClose}
            type='button'
            className='top-2.4 right-2.4 absolute'
          >
            <IconResolver token='close' />
          </button>
        )}
        <SlideUpForm {...props} />
      </div>
    </Modal>
  )
}

ModalComponent.propTypes = {
  isOpen: PropTypes.bool,
  forceSubmission: PropTypes.bool,
  handleClose: PropTypes.func,
  eventInfo: PropTypes.shape({
    overlayId: PropTypes.string,
    overlayName: PropTypes.string,
    overlayContentType: PropTypes.string,
    overlayContentName: PropTypes.string,
    overlayTriggerAction: PropTypes.string,
  }),
}

ModalComponent.defaultProps = {
  isOpen: false,
  forceSubmission: false,
  handleClose: () => {},
  eventInfo: undefined,
}

export default ModalComponent
