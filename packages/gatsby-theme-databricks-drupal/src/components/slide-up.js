import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { MarketoForm, SlideUpForm } from "databricks-ui"
import resolveImage from "../utils/resolve-image"
import resolveSlideUp from "../utils/resolve-slide-up"
import skipFormEvents from "../helpers/skipFormEvents"
import removeColonsMkto from "databricks-ui/src/utils/removeColonsMkto"

export const SlideUpWrapper = ({
  url,
  form,
  urlOverwrite,
  eventInfo,
  isSkipForm,
  children,
}) => {
  const formElement = resolveSlideUp(url) || form
  const hasSlideUp = !formElement || (!url?.path && !urlOverwrite)
  if (hasSlideUp && isSkipForm && formElement?.fieldFormId === "1001") {
    const onClick = () => {
      skipFormEvents(formElement.fieldFormId)
    }
    // We do not need this validation, since the children will have appropriate information
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    return <div onClick={onClick}>{children}</div>
  }
  if (hasSlideUp) {
    return children
  }
  let mappedEvent = eventInfo
  if (!eventInfo && url?.associatedNode) {
    mappedEvent = {
      overlayId: url.associatedNode.nid,
      overlayName: formElement?.fieldLink?.url?.path,
      overlayContentType: "form",
      overlayContentName: formElement.__typename,
      overlayTriggerAction: "manual",
    }
  }
  return (
    <SlideUp
      url={url?.path || urlOverwrite}
      eventInfo={mappedEvent}
      entity={formElement}
    >
      {children}
    </SlideUp>
  )
}

SlideUpWrapper.propTypes = {
  url: PropTypes.shape({
    path: PropTypes.string,
    associatedNode: PropTypes.shape({
      nid: PropTypes.string,
      title: PropTypes.string,
    }),
  }),
  form: PropTypes.shape({}),
  eventInfo: PropTypes.shape({}),
  isSkipForm: PropTypes.bool,
  urlOverwrite: PropTypes.string,
  children: PropTypes.node.isRequired,
}

SlideUpWrapper.defaultProps = {
  url: undefined,
  form: undefined,
  eventInfo: undefined,
  isSkipForm: false,
  urlOverwrite: undefined,
}

const SlideUp = ({
  entity,
  url,
  isOpen,
  enableListener,
  onSubmit,
  isKnownLead,
  closeOnSubmit,
  eventInfo,
  children,
}) => {
  const [open, setOpen] = useState(isOpen)
  const [mappedUrl, setMappedUrl] = useState(url)
  const [onSubmitHandler, setOnSubmit] = useState(() => onSubmit)

  useEffect(() => {
    setOpen(isOpen)
  }, [isOpen])

  useEffect(() => {
    if (!enableListener) {
      return undefined
    }
    const eventHandler = (e) => {
      e.detail?.event.preventDefault()
      setOpen(true)
      if (e.detail?.to) {
        setMappedUrl(e.detail?.to)
      }
      if (e.detail?.onSubmit) {
        setOnSubmit(() => e.detail?.onSubmit)
      }
    }
    document.addEventListener("slide-up", eventHandler)
    return () => document.removeEventListener("slide-up", eventHandler)
  }, [setOpen, setOnSubmit, setMappedUrl, enableListener])

  useEffect(() => {
    if (!isKnownLead || !isOpen) {
      return
    }
    window.location = mappedUrl
    onSubmitHandler()
  }, [isKnownLead, mappedUrl, onSubmitHandler, isOpen])

  if (!entity?.fieldItem?.entity) {
    return <></>
  }

  const listItems = entity.fieldItems?.map(({ entity: item }) => ({
    headline: item?.fieldTitle,
    body: item?.fieldDescription?.processed,
  }))

  const slideUp = (
    <SlideUpForm
      key={entity.uuid}
      title={entity.fieldTitle}
      description={entity.fieldDescription?.processed}
      reversed={entity.fieldReversed}
      image={resolveImage(entity.fieldImage)}
      forceSubmission={entity.fieldForceSubmission}
      listItems={listItems}
      isOpen={open && !isKnownLead}
      handleClose={setOpen}
      eventInfo={eventInfo}
    >
      <MarketoForm
        campaignId={entity.fieldItem.entity.fieldCampaignId}
        formClassName='mktoSlideUpForm'
        cookieName={entity.fieldItem.entity.fieldKey}
        formId={entity.fieldItem.entity.fieldFormId}
        thankyou={mappedUrl}
        onLoad={removeColonsMkto}
        onSubmitSuccess={
          closeOnSubmit
            ? (e) => {
                onSubmitHandler(e)
                setOpen(false)
              }
            : onSubmitHandler
        }
      />
    </SlideUpForm>
  )

  if (!children) {
    return slideUp
  }

  return (
    <>
      <button
        type='button'
        className='block h-full text-left'
        onClick={() => setOpen(true)}
      >
        {children}
      </button>
      {slideUp}
    </>
  )
}

SlideUp.propTypes = {
  isOpen: PropTypes.bool,
  url: PropTypes.string.isRequired,
  children: PropTypes.node,
  enableListener: PropTypes.bool,
  onSubmit: PropTypes.func,
  isKnownLead: PropTypes.bool,
  closeOnSubmit: PropTypes.bool,
  eventInfo: PropTypes.shape({}),
  entity: PropTypes.shape({
    uuid: PropTypes.string,
    fieldTitle: PropTypes.string,
    fieldForceSubmission: PropTypes.bool,
    fieldItems: PropTypes.arrayOf({
      entity: PropTypes.shape({
        fieldTitle: PropTypes.string,
        fieldDescription: PropTypes.shape({
          processed: PropTypes.string,
        }),
      }),
    }),
    fieldDescription: PropTypes.shape({
      processed: PropTypes.string,
    }),
    fieldReversed: PropTypes.bool,
    fieldImage: PropTypes.shape({}),
    fieldItem: PropTypes.shape({
      entity: PropTypes.shape({
        fieldKey: PropTypes.string,
        fieldFormId: PropTypes.string,
        fieldCampaignId: PropTypes.string,
      }),
    }),
  }).isRequired,
}

SlideUp.defaultProps = {
  isOpen: false,
  children: undefined,
  enableListener: false,
  closeOnSubmit: false,
  onSubmit: undefined,
  eventInfo: undefined,
  isKnownLead: false,
}

export default SlideUp
