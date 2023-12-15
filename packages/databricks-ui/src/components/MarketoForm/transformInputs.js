/* eslint-disable no-param-reassign */
import React, { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import PropTypes from "prop-types"
import ReactHtmlParser from "react-html-parser"
import TextInput from "../Form/TextInput"
import DropdownField from "../Form/DropdownField"
import CheckBox from "../Form/CheckBox"

const observerSetup = (originalElement, setError, wrapperElement) => {
  // Set error observer
  const observer = new MutationObserver(() => {
    if (originalElement.getAttribute("aria-invalid") === "true") {
      return setError(
        document.getElementById(`ValidMsg${originalElement.id}`)?.innerText
      )
    }
    return setError(null)
  })

  observer.observe(originalElement, {
    attributeFilter: ["aria-invalid"],
  })

  // Hide parent element
  wrapperElement.style.display = "none"
  wrapperElement.ariaHidden = true

  const label = wrapperElement.querySelector(":scope > label")

  if (
    !label ||
    document.getElementById(`${label.id}-react`) ||
    label.id === `Lbl${originalElement.id}`
  ) {
    return observer
  }
  const newLabel = label.cloneNode(true)
  newLabel.id = `${newLabel.id}-react`
  wrapperElement.insertAdjacentElement("afterend", newLabel)

  return observer
}

const propTypes = {
  attribs: PropTypes.shape({ id: PropTypes.string }).isRequired,
}

const InputWrapper = ({ attribs }) => {
  const originalElement = document.getElementById(`${attribs.id}`)
  const wrapperElement = originalElement.closest(".mktoFieldWrap")
  const label = document.getElementById(`Lbl${attribs.id}`).innerText

  const [error, setError] = useState(null)
  useEffect(() => {
    const observer = observerSetup(originalElement, setError, wrapperElement)

    return () => {
      observer.disconnect()
    }
  }, [])

  return createPortal(
    <TextInput
      onChange={(e) => {
        originalElement.value = e.target.value
      }}
      className='mb-0.5'
      label={label}
      id={`${attribs.id}-react`}
      error={error && true}
      errorMessage={error}
    />,
    wrapperElement.parentElement
  )
}

InputWrapper.propTypes = propTypes

const DropdownWrapper = ({ attribs }) => {
  const originalElement = document.getElementById(`${attribs.id}`)
  const wrapperElement = originalElement.closest(".mktoFieldWrap")
  const label = document.getElementById(`Lbl${attribs.id}`).innerText

  const [error, setError] = useState(null)
  const [value, setValue] = useState(originalElement.value)
  const options = Array.from(originalElement.options).map((option) => ({
    id: option.value,
    text: option.text,
  }))

  useEffect(() => {
    const observer = observerSetup(originalElement, setError, wrapperElement)

    return () => {
      observer.disconnect()
    }
  }, [])

  return createPortal(
    <DropdownField
      onChange={(e) => {
        setValue(e.target.value)
        originalElement.value = e.target.value
      }}
      value={value}
      className='mb-0.5'
      label={label}
      id={`${attribs.id}-react`}
      options={options}
      error={error}
      errorMessage={error}
    />,
    wrapperElement.parentElement
  )
}

DropdownWrapper.propTypes = propTypes

const CheckboxWrapper = ({ attribs }) => {
  const originalElement = document.getElementById(`${attribs.id}`)
  const wrapperElement = originalElement.closest(".mktoFieldWrap")
  const labelElement = document.getElementById(`Lbl${attribs.id}`)

  const [error, setError] = useState(null)
  const [active, setActive] = useState(originalElement.checked)
  const [hideInput, setHideInput] = useState(false)
  const [label, setLabel] = useState(labelElement.innerHTML)

  useEffect(() => {
    const observer = observerSetup(originalElement, setError, wrapperElement)

    const labelObserver = new MutationObserver(() => {
      setLabel(labelElement.innerHTML)
      if (typeof labelElement.dataset.hideInput === "undefined") {
        return
      }
      setHideInput(labelElement.dataset.hideInput === "true")
      if (labelElement.dataset.hideInput === "true") {
        setActive(true)
        originalElement.checked = true
        return
      }
      setActive(false)
      originalElement.checked = false
    })

    labelObserver.observe(document.getElementById(`Lbl${attribs.id}`), {
      childList: true,
    })

    return () => {
      observer.disconnect()
      labelObserver.disconnect()
    }
  }, [])

  return createPortal(
    <CheckBox
      handleClick={() => {
        if (hideInput) {
          return
        }
		 if (document.getElementById("checkbox4648Id")) {
          document.getElementById("checkbox4648Id").remove()
        }
        setActive(!active)
        originalElement.checked = !active
      }}
      changeLabel={(text) => {
        setLabel(text)
        originalElement.innerHTML = text
      }}
      active={active}
      hideInput={hideInput}
      text={label}
      id={`${attribs.id}-react`}
      error={error}
      errorMessage={error}
    />,
    wrapperElement.parentElement
  )
}

CheckboxWrapper.propTypes = propTypes

const HtmlParser = ({ innerHTML }, replaceAllFields) => {
  const elements = []

  const getFormElements = (htmlnode) => {
    if (htmlnode.attribs?.type === "hidden") {
      return
    }
    if (htmlnode.type === "tag" && htmlnode.name === "input") {
      elements.push(htmlnode)
    }

    if (htmlnode.type === "tag" && htmlnode.name === "select") {
      elements.push(htmlnode)
    }
  }

  const options = {
    decodeEntities: true,
    transform: getFormElements,
  }

  ReactHtmlParser(innerHTML, options)

  return (
    <>
      {elements.map((element) => {
        if (element.name === "input" && element.attribs?.type === "checkbox") {
          return <CheckboxWrapper key={element.id} attribs={element.attribs} />
        }
        if (element.name === "select" && replaceAllFields) {
          return <DropdownWrapper key={element.id} attribs={element.attribs} />
        }
        if (element.name === "input" && replaceAllFields) {
          return <InputWrapper key={element.id} attribs={element.attribs} />
        }
        return null
      })}
    </>
  )
}

HtmlParser.propTypes = {
  innerHTML: PropTypes.string.isRequired,
}

export default HtmlParser
